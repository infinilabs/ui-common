import { EuiIcon } from "@elastic/eui";
import { TableHeader } from "./table_header/table_header";
import { SortOrder } from "./table_header/helpers";
import "./_doc_table.scss";
import { TableRow } from "./table_row/table_row";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TableContext from "./table_context";
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

  const tableRef = React.useRef(null);

  useEffect(() => {
    // 获取滚动目标容器
    const scrollElement = scrollableTarget
      ? window.document.getElementById(scrollableTarget)
      : window.document.documentElement;

    if (!scrollElement) return;

    const checkHeightAndLoad = () => {
      // 核心逻辑：如果有更多数据，且当前内容高度 <= 容器可视高度（即没有滚动条）
      const hasMoreData = hasMore && hits.length < hitsTotal;
      const isNotScrollable = scrollElement.scrollHeight <= scrollElement.clientHeight;

      if (hasMoreData && isNotScrollable) {
        // 这里的 pageSize 建议与 props 保持一致
        setQueryFrom((prev: number) => prev + pageSize);
      }
    };

    // 1. 监听容器尺寸变化（解决窗口拉大、侧边栏收起等导致的滚动条消失）
    const resizeObserver = new ResizeObserver(() => {
      checkHeightAndLoad();
    });

    // 2. 监听内容变化（解决删除数据或初始数据不足）
    resizeObserver.observe(scrollElement);

    // 初始执行一次
    checkHeightAndLoad();

    return () => {
      resizeObserver.disconnect();
    };
  }, [hits.length, hitsTotal, hasMore, scrollableTarget, pageSize, setQueryFrom]);

  return (
    <InfiniteScroll
      ref={tableRef}
      dataLength={hits.length}
      next={() => {
        setQueryFrom(queryFrom + pageSize);
      }}
      hasMore={hasMore && hits.length < hitsTotal}
      loader={
        <h4 style={{ textAlign: "center", margin: "10px auto" }}><LoadingSpinner /></h4>
      }
      endMessage={null}
      scrollableTarget={scrollableTarget}
      scrollThreshold={scrollThreshold}
    >
      {hits.length ? (
        <TableContext.Provider value={{ tableRef: tableRef.current }}>
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
        </TableContext.Provider>
      ) : null}
    </InfiniteScroll>
  );
};

export default React.memo(Table);
