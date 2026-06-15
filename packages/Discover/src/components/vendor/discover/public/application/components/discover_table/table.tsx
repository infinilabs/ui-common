import { TableHeader } from './table_header/table_header';
import { SortOrder, getDisplayedColumns } from './table_header/helpers';
import './_doc_table.scss';
import { TableRow } from './table_row/table_row';
import React, {
  useEffect,
  useLayoutEffect,
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
const TOGGLE_COLUMN_WIDTH = 36;
const DEFAULT_FIELD_COLUMN_WIDTH = 180;
const TIME_COLUMN_SAMPLE_LIMIT = 200;
type ColumnWidth = number | undefined;

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
  colWidths: ColumnWidth[];
  loading: boolean;
}

function ColumnGroup({ colWidths }: { colWidths: ColumnWidth[] }) {
  if (colWidths.length === 0) return null;

  return (
    <colgroup>
      {colWidths.map((width, i) => (
        <col
          key={i}
          style={width === undefined ? undefined : { width: `${width}px` }}
        />
      ))}
    </colgroup>
  );
}

function normalizeFormattedValue(value: unknown) {
  return value === undefined || value === null ? '' : String(value);
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
        <ColumnGroup colWidths={colWidths} />
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
  const timeColumnSizerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [autoTimeColumnWidth, setAutoTimeColumnWidth] = useState<
    number | undefined
  >();
  const [timeColumnMinWidth, setTimeColumnMinWidth] = useState<
    number | undefined
  >();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [userColWidths, setUserColWidths] = useState<Record<string, number>>(
    {}
  );

  const timeFieldName = indexPattern?.timeFieldName;

  const timeColumnSamples = useMemo(() => {
    if (!timeFieldName || !indexPattern?.formatField) return [];

    return hits.slice(0, TIME_COLUMN_SAMPLE_LIMIT).map((row) => {
      try {
        return normalizeFormattedValue(
          indexPattern.formatField(row, timeFieldName)
        );
      } catch {
        return normalizeFormattedValue(
          row?._source?.[timeFieldName] ?? row?.fields?.[timeFieldName]
        );
      }
    });
  }, [hits, indexPattern, timeFieldName]);

  useLayoutEffect(() => {
    const sizer = timeColumnSizerRef.current;
    if (!sizer || !timeFieldName) return;

    const header = sizer.querySelector<HTMLElement>(
      '[data-time-column-header]'
    );
    const cells = Array.from(
      sizer.querySelectorAll<HTMLElement>('[data-time-column-cell]')
    );
    const headerWidth = header
      ? Math.ceil(header.getBoundingClientRect().width)
      : 0;
    const cellWidth = Math.ceil(
      cells.reduce(
        (maxWidth, cell) =>
          Math.max(maxWidth, cell.getBoundingClientRect().width),
        0
      )
    );
    const nextMinWidth = headerWidth || undefined;
    const nextAutoWidth = Math.max(headerWidth, cellWidth) || undefined;

    setTimeColumnMinWidth((current) =>
      current === nextMinWidth ? current : nextMinWidth
    );
    setAutoTimeColumnWidth((current) =>
      current === nextAutoWidth ? current : nextAutoWidth
    );
  }, [timeFieldName, timeColumnSamples]);

  const handleColumnResize = useCallback(
    (colName: string, width: number) => {
      const minWidth =
        colName === timeFieldName && timeColumnMinWidth
          ? timeColumnMinWidth
          : 50;
      setUserColWidths((prev) => ({
        ...prev,
        [colName]: Math.max(minWidth, width)
      }));
    },
    [timeColumnMinWidth, timeFieldName]
  );

  const effectiveColWidths = useMemo<ColumnWidth[]>(() => {
    const displayedCols = getDisplayedColumns(
      columns,
      indexPattern,
      false,
      false
    );
    const flexColumnName =
      displayedCols.find((col) => col.name === '_source')?.name ||
      displayedCols[displayedCols.length - 1]?.name;

    return [
      TOGGLE_COLUMN_WIDTH,
      ...displayedCols.map((col) => {
        if (col.name in userColWidths) {
          return col.name === timeFieldName && timeColumnMinWidth
            ? Math.max(userColWidths[col.name], timeColumnMinWidth)
            : userColWidths[col.name];
        }
        if (col.name === timeFieldName) {
          return autoTimeColumnWidth;
        }
        if (col.name === flexColumnName) {
          return undefined;
        }
        return DEFAULT_FIELD_COLUMN_WIDTH;
      })
    ];
  }, [
    columns,
    userColWidths,
    indexPattern,
    timeFieldName,
    autoTimeColumnWidth,
    timeColumnMinWidth
  ]);

  const measureHeader = useCallback(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
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

  // Re-measure header height when columns or user widths change
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
      {timeFieldName ? (
        <div
          ref={timeColumnSizerRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            visibility: 'hidden',
            height: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: -1
          }}
        >
          <span
            data-time-column-header
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: 700,
              paddingLeft: 6,
              paddingRight: 6,
              whiteSpace: 'nowrap'
            }}
          >
            <span>Time</span>
            <span
              style={{
                display: 'inline-block',
                marginLeft: 4,
                width: 20,
                height: 20
              }}
            />
          </span>
          {timeColumnSamples.map((sample, index) => (
            <span
              key={index}
              data-time-column-cell
              style={{
                display: 'inline-block',
                fontFamily:
                  "'Roboto Mono', Consolas, Menlo, Courier, monospace",
                fontSize: 12,
                lineHeight: '2em',
                paddingLeft: 6,
                paddingRight: 6,
                whiteSpace: 'nowrap'
              }}
              dangerouslySetInnerHTML={{ __html: sample }}
            />
          ))}
        </div>
      ) : null}
      {hits.length > 0 ? (
        <>
          <div
            ref={headerRef}
            style={{ flexShrink: 0 }}
          >
            <table
              className="kbn-table table"
              style={{ tableLayout: 'fixed', width: '100%' }}
            >
              <ColumnGroup colWidths={effectiveColWidths} />
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
