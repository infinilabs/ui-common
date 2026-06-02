import { useState, useEffect, useCallback, useRef } from "react";
import { Globe, Layers, Box, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useDebounce } from "ahooks";
import { Popover } from "antd";

import Checkbox from "./Common/Checkbox";
import NoDataImage from "./NoDataImage";
import Pagination from "./Common/Pagination";
import { Input, type InputRef } from "antd";
import type { TFunction } from "i18next";

export interface DataSource {
  id: string;
  name?: string;
  icon?: string;
  [key: string]: unknown;
}

interface SearchPopoverProps {
  datasource: { enabled?: boolean; visible?: boolean };
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  isSearchActive: boolean;
  setIsSearchActive: (val: boolean) => void;
  getDataSources: (query?: string) => Promise<DataSource[]>;
  shortcut?: string;
  t?: TFunction;
}

export default function SearchPopover({
  datasource,
  selectedIds,
  onSelectionChange,
  isSearchActive,
  setIsSearchActive,
  getDataSources,
  t: tProp,
}: SearchPopoverProps) {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [visibleList, setVisibleList] = useState<DataSource[]>([]);
  const searchInputRef = useRef<InputRef>(null);

  const [dataSourceList, setDataSourceList] = useState<DataSource[]>([]);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, { wait: 500 });

  const getDataSourceList = useCallback(async () => {
    try {
      setPage(1);
      const res: DataSource[] = await getDataSources(debouncedKeyword);

      if (!res || res.length === 0) {
        setDataSourceList([]);
        return;
      }
      const data = res.length
        ? [
          {
            id: "all",
            name: "search.input.searchPopover.allScope",
          },
          ...res,
        ]
        : [];

      setDataSourceList(data);
    } catch (err) {
      setDataSourceList([]);
      console.error("datasource_search", err);
    }
  }, [debouncedKeyword, getDataSources]);

  useEffect(() => {
    if (open) {
      getDataSourceList();
    }
  }, [debouncedKeyword, open, getDataSourceList]);

  useEffect(() => {
    setTotalPage(Math.max(Math.ceil(dataSourceList.length / 10), 1));
  }, [dataSourceList]);

  useEffect(() => {
    if (dataSourceList.length === 0) {
      return setVisibleList([]);
    }

    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;

    const list = [
      dataSourceList[0],
      ...dataSourceList.slice(1).slice(startIndex, endIndex),
    ];

    setVisibleList(list);
  }, [dataSourceList, page]);

  const onSelectDataSource = useCallback(
    (id: string, checked: boolean, isAll: boolean) => {
      const nextSourceDataIds = new Set(selectedIds);

      const ids = isAll ? visibleList.slice(1).map((item) => item.id) : [id];

      for (const id of ids) {
        if (checked) {
          nextSourceDataIds.add(id);
        } else {
          nextSourceDataIds.delete(id);
        }
      }

      onSelectionChange(Array.from(nextSourceDataIds));
    },
    [visibleList, selectedIds, onSelectionChange]
  );

  const handlePrev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page === totalPage) return;
    setPage(page + 1);
  };

  if (!datasource?.visible) {
    return null;
  }

  return (
    <div
      className={clsx(
        "flex justify-center items-center gap-1 h-6 px-2 rounded-full transition cursor-pointer hover:bg-[#EDEDED] dark:hover:bg-[#202126]"
      )}
      style={{
        backgroundColor: isSearchActive ? "rgba(1,138,229,0.21)" : undefined,
      }}
      onClick={() => {
        setIsSearchActive(!isSearchActive);
      }}
    >
      <Globe
        className={`size-4 ${isSearchActive
            ? "text-[#1784FC] dark:text-[#1784FC]"
            : "text-[#333] dark:text-[#999]"
          }`}
      />

      {isSearchActive && (
        <>
          <span className="text-[#1784FC] text-xs">
            {t("search.input.search") || "Search"}
          </span>

          <Popover
            open={open}
            trigger="click"
            onOpenChange={setOpen}
            placement="bottomLeft"
            getPopupContainer={(node) => {
              let el = node.parentElement;
              while (el && el !== document.body && el !== document.documentElement) {
                const { overflowY } = getComputedStyle(el);
                if (overflowY === "auto" || overflowY === "scroll") {
                  const parent = el.parentElement;
                  if (parent && parent !== document.documentElement) {
                    return parent;
                  }
                  return el;
                }
                el = el.parentElement;
              }
              return document.body;
            }}
            content={
              <div
                className="w-[300px] flex flex-col gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 px-2 py-1 border rounded-md border border-solid border-[#F0F0F0] dark:border-[#303030]">
                  <Input
                    autoFocus
                    autoCorrect="off"
                    value={keyword}
                    ref={searchInputRef}
                    className="h-6 p-0 border-0 shadow-none focus-visible:ring-0 focus:shadow-none"
                    variant="borderless"
                    placeholder={
                      t("search.input.searchPopover.placeholder") || "Search..."
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setKeyword(e.target.value);
                    }}
                  />
                </div>

                {visibleList.length > 0 ? (
                  <ul className="flex flex-col gap-1 p-0 m-0 list-none">
                    {visibleList.map((item, index) => {
                      const { id, name } = item;
                      const isAll = index === 0;

                      const isChecked = () => {
                        if (isAll) {
                          return visibleList.slice(1).every((vItem) => {
                            return selectedIds.includes(vItem.id);
                          });
                        } else {
                          return selectedIds.includes(id);
                        }
                      };

                      return (
                        <li
                          key={id}
                          className="flex justify-between items-center px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-sm cursor-pointer"
                          onClick={() => {
                            onSelectDataSource(id, !isChecked(), isAll);
                          }}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            {isAll ? (
                              <Layers className="size-4 text-[#0287FF]" />
                            ) : (
                              <Box className="size-4 text-muted-foreground" />
                            )}

                            <span className="truncate text-sm">
                              {isAll && name ? t(name) || "All" : name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <div className="flex justify-center items-center size-6">
                              <Checkbox
                                checked={isChecked()}
                                indeterminate={isAll}
                                onChange={(checked) =>
                                  onSelectDataSource(id, checked, isAll)
                                }
                              />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="flex items-center justify-center py-4">
                    <NoDataImage />
                  </div>
                )}

                {visibleList.length > 0 && (
                  <Pagination
                    current={page}
                    totalPage={totalPage}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    className="border-t-[#F0F0F0] dark:border-t-[#303030]"
                  />
                )}
              </div>
            }
          >
            <div
              role="button"
              tabIndex={0}
              className="flex items-center justify-center size-4 rounded-sm hover:bg-black/5 dark:hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ChevronDown className="size-3 opacity-50" />
            </div>
          </Popover>
        </>
      )}
    </div>
  );
}
