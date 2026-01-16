import { Input, type InputRef } from "@/components/ui/input";
import { debounce } from "lodash-es";
import { type FC, useMemo, useRef, useState, type ChangeEvent } from "react";
import clsx from "clsx";
import { PanelLeftClose, RefreshCcw, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";

import VisibleKey from "@/components/VisibleKey";
import type { Chat } from "@/types/chat";
import { closeHistoryPanel } from "@/utils";
import HistoryListContent from "./HistoryListContent";
import { Button } from "../ui/button";

interface HistoryListProps {
  historyPanelId?: string;
  chats: Chat[];
  active?: Chat;
  onSearch: (keyword: string) => void;
  onRefresh: () => void;
  onSelect: (chat: Chat) => void;
  onRename: (chatId: string, title: string) => void;
  onRemove: (chatId: string) => void;
  t?: TFunction;
}

const HistoryList: FC<HistoryListProps> = (props) => {
  const {
    historyPanelId,
    chats,
    active,
    onSearch,
    onRefresh,
    onSelect,
    onRename,
    onRemove,
    t: tProp,
  } = props;
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;
  const searchInputRef = useRef<InputRef>(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => onSearch(value), 300);
  }, [onSearch]);

  const handleRefresh = async () => {
    setIsRefresh(true);

    onRefresh();

    setTimeout(() => {
      setIsRefresh(false);
    }, 1000);
  };

  return (
    <div
      id={historyPanelId}
      className={clsx(
        "flex flex-col h-screen text-sm bg-transparent"
      )}
    >
      <div className="flex gap-1 p-2 border-b border-input">
        <div className="flex-1">
          <Input
            autoFocus
            ref={searchInputRef}
            prefix={
              <VisibleKey
                shortcut="F"
                onKeyPress={() => {
                  searchInputRef.current?.focus();
                }}
              >
                <Search className="size-4 text-muted-foreground" />
              </VisibleKey>
            }
            className="w-full"
            placeholder={t("history_list.search.placeholder")}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              debouncedSearch(event.target.value);
            }}
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={handleRefresh}
        >
          <VisibleKey shortcut="R" onKeyPress={handleRefresh}>
            <RefreshCcw
              className={clsx("size-4 text-[#0287FF]", {
                "animate-spin": isRefresh,
              })}
            />
          </VisibleKey>
        </Button>
      </div>

      <div className="flex-1 px-2 overflow-auto custom-scrollbar">
        <HistoryListContent
          chats={chats}
          active={active}
          onSelect={onSelect}
          onRename={onRename}
          onRemove={onRemove}
          t={t}
        />
      </div>

      {historyPanelId && (
        <div className="flex justify-end p-2 border-t border-input">
          <VisibleKey shortcut="Esc" shortcutClassName="w-7">
            <PanelLeftClose
              className="size-4 text-muted-foreground cursor-pointer"
              onClick={closeHistoryPanel}
            />
          </VisibleKey>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
