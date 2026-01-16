import { Input, type InputRef } from "@/components/ui/input";
import { debounce } from "lodash-es";
import { type FC, useMemo, useRef, useState, type ChangeEvent } from "react";
import clsx from "clsx";
import { RefreshCcw, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";

import type { Chat } from "@/types/chat";
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
  const [keyword, setKeyword] = useState("");

  const filteredChats = useMemo(() => {
    if (!keyword) return chats;
    
    return chats.filter(chat => {
      const title = (chat._source?.title || "") as string;
      return title.toLowerCase().includes(keyword.toLowerCase());
    });
  }, [chats, keyword]);

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setKeyword(value);
      onSearch(value);
    }, 300);
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
      className={clsx("flex flex-col h-screen text-sm bg-transparent")}
    >
      <div className="flex gap-1 p-2">
        <div className="flex-1">
          <Input
            autoFocus
            ref={searchInputRef}
            prefix={
             <Search className="size-4 text-muted-foreground" />
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
          <RefreshCcw
            className={clsx("size-4 text-[#0287FF]", {
              "animate-spin": isRefresh,
            })}
          />
        </Button>
      </div>

      <div className="flex-1 px-2 overflow-auto custom-scrollbar">
        <HistoryListContent
          chats={filteredChats}
          active={active}
          onSelect={onSelect}
          onRename={onRename}
          onRemove={onRemove}
          t={t}
        />
      </div>
    </div>
  );
};

export default HistoryList;
