import { TableHeader } from './table_header/table_header';
import { SortOrder, getDisplayedColumns } from './table_header/helpers';
import './_doc_table.scss';
import { TableRow } from './table_row/table_row';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react';
import { LoadingSpinner } from '@/components/vendor/discover/public/application/components/loading_spinner/loading_spinner';
import { List } from 'react-window';

interface TableProps {
  columns: string[];
  hits: any[];
  sortOrder?: SortOrder[];
  indexPattern: any;
  onFilter: (field: any, values: any, operation: any) => void;
  onChangeSortOrder?: (sortOrder: SortOrder[]) => void;
  onMoveColumn?: (name: string, index: number) => void;
  onRemoveColumn?: (name: string) => void;
  onAddColumn?: (name: string) => void;
  document: any;
  hitsTotal: number;
  queryFrom: number;
  setQueryFrom: (from: number) => void;
  formatDisplayName?: (name: string) => string;
  formatHit?: (name: string, hit: Record<string, any>) => Record<string, any>;
  pageSize?: number;
  hasMore?: boolean;
  filterIconRender?: (
    children: any,
    params: { field: any; values: any; operation: any }
  ) => any;
  theme?: string;
}

const pageCount = 20;
const ROW_HEIGHT = 36;
const EXPANDED_ROW_HEIGHT = 400;

interface VirtualRowProps {
  hits: any[];
  columns: string[];
  indexPattern: any;
  onFilter: (field: any, values: any, operation: any) => void;
  onAddColumn?: (name: string) => void;
  onRemoveColumn?: (name: string) => void;
  document: any;
  formatHit?: (name: string, hit: Record<string, any>) => Record<string, any>;
  filterIconRender?: (
    children: any,
    params: { field: any; values: any; operation: any }
  ) => any;
  theme?: string;
  expandedRows: Set<string>;
  toggleRowExpand: (rowId: string, index: number) => void;
  colWidths: number[];
  loading: boolean;
}

function VirtualRow({
  index,
  style,
  hits,
  columns,
  indexPattern,
  onFilter,
  onAddColumn,
  onRemoveColumn,
  document,
  formatHit,
  filterIconRender,
  theme,
  expandedRows,
  toggleRowExpand,
  colWidths,
  loading
}: {
  index: number;
  style: React.CSSProperties;
  ariaAttributes: any;
} & VirtualRowProps) {
  // Loading row at the end
  if (index === hits.length) {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }
  const row = hits[index];
  if (!row) return null;
  const isOpen = expandedRows.has(row._id);

  return (
    <div style={{ ...style, overflow: isOpen ? 'auto' : 'hidden' }}>
      <table
        className="kbn-table table"
        style={{ tableLayout: 'fixed', width: '100%' }}
      >
        {colWidths.length > 0 && (
          <colgroup>
            {colWidths.map((w, i) => (
              <col
                key={i}
                style={{ width: w }}
              />
            ))}
          </colgroup>
        )}
        <tbody>
          <TableRow
            onFilter={onFilter}
            columns={columns}
            hideTimeColumn={false}
            indexPattern={indexPattern}
            isShortDots={false}
            onAddColumn={onAddColumn}
            onRemoveColumn={onRemoveColumn}
            row={row}
            document={document}
            formatHit={formatHit}
            filterIconRender={filterIconRender}
            theme={theme}
            isOpen={isOpen}
            onToggle={() => toggleRowExpand(row._id, index)}
          />
        </tbody>
      </table>
    </div>
  );
}

const Table: React.FC<TableProps> = ({
  columns,
  hits,
  sortOrder,
  indexPattern,
  onFilter,
  onMoveColumn,
  onAddColumn,
  onRemoveColumn,
  onChangeSortOrder,
  document,
  hitsTotal,
  queryFrom,
  setQueryFrom,
  formatDisplayName,
  formatHit,
  pageSize = pageCount,
  hasMore = true,
  filterIconRender,
  theme
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<any>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [colWidths, setColWidths] = useState<number[]>([]);
  const [userColWidths, setUserColWidths] = useState<Record<string, number>>(
    {}
  );

  const handleColumnResize = useCallback((colName: string, width: number) => {
    setUserColWidths((prev) => ({ ...prev, [colName]: width }));
  }, []);

  const effectiveColWidths = useMemo(() => {
    if (colWidths.length === 0) return [];
    const displayedCols = getDisplayedColumns(
      columns,
      indexPattern,
      false,
      false
    );
    return colWidths.map((w, i) => {
      if (i === 0) return w; // toggle column, keep as-is
      const colName = displayedCols[i - 1]?.name;
      if (colName && colName in userColWidths) {
        return userColWidths[colName];
      }
      return w;
    });
  }, [colWidths, userColWidths, columns, indexPattern]);

  const measureHeader = useCallback(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
      const ths = headerRef.current.querySelectorAll('th');
      if (ths.length > 0) {
        setColWidths(Array.from(ths).map((th) => th.offsetWidth));
      }
    }
  }, []);

  // Measure container height
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
      measureHeader();
    });
    ro.observe(el);
    if (headerRef.current) ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, [measureHeader]);

  // Re-measure column widths when columns or user widths change
  useEffect(() => {
    requestAnimationFrame(measureHeader);
  }, [columns, indexPattern?.timeFieldName, userColWidths, measureHeader]);

  const getRowHeight = useCallback(
    (index: number) => {
      if (index === hits.length) return ROW_HEIGHT;
      const rowId = hits[index]?._id;
      return expandedRows.has(rowId) ? EXPANDED_ROW_HEIGHT : ROW_HEIGHT;
    },
    [hits, expandedRows]
  );

  const toggleRowExpand = useCallback((rowId: string, _index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  }, []);

  const loadNextPage = useCallback(() => {
    const nextFrom = queryFrom + pageSize;
    if (nextFrom < hitsTotal && !loading) {
      setLoading(true);
      setQueryFrom(nextFrom);
    }
  }, [queryFrom, pageSize, hitsTotal, setQueryFrom, loading]);

  // Reset on new search
  useEffect(() => {
    if (queryFrom === 0) {
      setLoading(false);
      setExpandedRows(new Set());
      listRef.current?.scrollToRow({ index: 0 });
    }
  }, [queryFrom]);

  // Reset loading when hits change
  useEffect(() => {
    setLoading(false);
  }, [hits.length]);

  const handleRowsRendered = useCallback(
    (
      _visibleRows: { startIndex: number; stopIndex: number },
      allRows: { startIndex: number; stopIndex: number }
    ) => {
      const hasMoreData = hasMore && hits.length < hitsTotal;
      if (allRows.stopIndex >= hits.length - 5 && hasMoreData && !loading) {
        loadNextPage();
      }
    },
    [hits.length, hitsTotal, hasMore, loading, loadNextPage]
  );

  const rowProps = useMemo<VirtualRowProps>(
    () => ({
      hits,
      columns,
      indexPattern,
      onFilter,
      onAddColumn,
      onRemoveColumn,
      document,
      formatHit,
      filterIconRender,
      theme,
      expandedRows,
      toggleRowExpand,
      colWidths: effectiveColWidths,
      loading
    }),
    [
      hits,
      columns,
      indexPattern,
      onFilter,
      onAddColumn,
      onRemoveColumn,
      document,
      formatHit,
      filterIconRender,
      theme,
      expandedRows,
      toggleRowExpand,
      effectiveColWidths,
      loading
    ]
  );

  const listHeight = Math.max(containerHeight - headerHeight, 100);

  return (
    <div
      ref={containerRef}
      className="infini-discover-table flex-1 min-h-0"
      style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
    >
      {hits.length > 0 ? (
        <>
          <div
            ref={headerRef}
            style={{ flexShrink: 0, overflowY: 'scroll' }}
          >
            <table className="kbn-table table">
              <thead>
                <TableHeader
                  columns={columns}
                  defaultSortOrder={'desc'}
                  hideTimeColumn={false}
                  indexPattern={indexPattern}
                  isShortDots={false}
                  onChangeSortOrder={onChangeSortOrder}
                  onMoveColumn={onMoveColumn}
                  onRemoveColumn={onRemoveColumn}
                  sortOrder={sortOrder || []}
                  formatDisplayName={formatDisplayName}
                  userColWidths={userColWidths}
                  onColumnResize={handleColumnResize}
                />
              </thead>
            </table>
          </div>

          {containerHeight > 0 && (
            <List<VirtualRowProps>
              listRef={listRef}
              style={{ height: listHeight }}
              rowCount={loading ? hits.length + 1 : hits.length}
              rowHeight={getRowHeight}
              rowComponent={VirtualRow}
              rowProps={rowProps}
              onRowsRendered={handleRowsRendered}
              overscanCount={5}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default React.memo(Table);
