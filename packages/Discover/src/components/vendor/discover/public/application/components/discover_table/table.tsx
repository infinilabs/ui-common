import { TableHeader } from "./table_header/table_header";
import { SortOrder } from "./table_header/helpers";
import "./_doc_table.scss";
import { TableRow } from "./table_row/table_row";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { LoadingSpinner } from "@/components/vendor/discover/public/application/components/loading_spinner/loading_spinner";

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
  filterIconRender?: (children: any, params: { field: any, values: any, operation: any }) => any;
  theme?: string;
}

const pageCount = 20;

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const loadNextPage = useCallback(() => {
    const nextFrom = queryFrom + pageSize;
    if (nextFrom < hitsTotal && !loading) {
      setLoading(true);
      setQueryFrom(nextFrom);
    }
  }, [queryFrom, pageSize, hitsTotal, setQueryFrom, loading]);

  useEffect(() => {
    if (queryFrom === 0) {
      setLoading(false);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }
  }, [queryFrom]);

  useEffect(() => {
    setLoading(false);
  }, [hits.length]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const checkHeightAndLoad = () => {
      const hasMoreData = hasMore && hits.length < hitsTotal;
      const isNotScrollable = scrollElement.scrollHeight <= scrollElement.clientHeight + 2;

      if (hasMoreData && isNotScrollable && !loading) {
        loadNextPage();
      }
    };

    const resizeObserver = new ResizeObserver(checkHeightAndLoad);
    resizeObserver.observe(scrollElement);
    
    checkHeightAndLoad();

    return () => resizeObserver.disconnect();
  }, [hits.length, hitsTotal, hasMore, loadNextPage, loading]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const hasMoreData = hasMore && hits.length < hitsTotal;
    
    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;

    if (isBottom && hasMoreData && !loading) {
      loadNextPage();
    }
  };

  return (
    <div 
      ref={scrollRef} 
      onScroll={handleScroll}
      className="infini-discover-table flex-1 min-h-0 overflow-y-auto"
      style={{ position: 'relative' }} 
    >
      {hits.length > 0 ? (
        <table className="kbn-table table">
          <thead>
            <TableHeader
              columns={columns}
              defaultSortOrder={"desc"}
              hideTimeColumn={false}
              indexPattern={indexPattern}
              isShortDots={false}
              onChangeSortOrder={onChangeSortOrder}
              onMoveColumn={onMoveColumn}
              onRemoveColumn={onRemoveColumn}
              sortOrder={sortOrder || []}
              formatDisplayName={formatDisplayName}
            />
          </thead>
          <tbody>
            {hits.map((row) => (
              <TableRow
                key={"discover-table-row" + row._id}
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
              />
            ))}
          </tbody>
        </table>
      ) : null}

      {(loading || (hasMore && hits.length < hitsTotal)) && (
        <div style={{ padding: '12px 0', textAlign: 'center', width: '100%' }}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(Table);