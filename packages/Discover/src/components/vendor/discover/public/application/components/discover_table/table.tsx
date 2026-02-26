import { TableHeader } from "./table_header/table_header";
import { SortOrder } from "./table_header/helpers";
import "./_doc_table.scss";
import { TableRow } from "./table_row/table_row";
import React, { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  queryFrom: any;
  setQueryFrom: any;
  formatDisplayName?: (name: string) => string;
  formatHit?: (name: string, hit: Record<string, any>) => Record<string, any>
  pageSize?: number;
  scrollableTarget?: string;
  scrollThreshold?: number;
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
  scrollableTarget,
  scrollThreshold,
  hasMore = true,
  filterIconRender,
  theme
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = containerRef.current
      ? containerRef.current
      : window.document.documentElement;

    if (!scrollElement) return;

    const checkHeightAndLoad = () => {
      const hasMoreData = hasMore && hits.length < hitsTotal;
      const isNotScrollable = scrollElement.scrollHeight <= scrollElement.clientHeight;

      if (hasMoreData && isNotScrollable) {
        setQueryFrom(queryFrom + pageSize);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      checkHeightAndLoad();
    });

    resizeObserver.observe(scrollElement);
    checkHeightAndLoad();

    return () => {
      resizeObserver.disconnect();
    };
  }, [hits.length, hitsTotal, hasMore, queryFrom, pageSize, setQueryFrom]);

  return (
    <div ref={containerRef} className={"infini-discover-table flex-1 overflow-auto"}>
      {
        containerRef.current && (
          <InfiniteScroll
            dataLength={hits.length}
            next={() => {
              setQueryFrom(queryFrom + pageSize);
            }}
            hasMore={hasMore && hits.length < hitsTotal}
            loader={
              <h4 style={{ textAlign: "center", margin: "10px auto" }}><LoadingSpinner /></h4>
            }
            endMessage={null}
            scrollableTarget={containerRef.current}
            scrollThreshold={scrollThreshold}
          >
            {hits.length ? (
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
                  {hits.map((row, idx) => {
                    return (
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
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </InfiniteScroll>
        )
      }
    </div>
  );
};

export default React.memo(Table);