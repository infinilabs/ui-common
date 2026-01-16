import { useCallback, useEffect, useState } from "react";
import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chatStore";
import { Get, Post } from "@/api/axiosRequest";
import HistoryList from "./HistoryList";
import { I18nextProvider, useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import i18n from "@/i18n";

interface HistoryProps {
  BaseUrl: string;
  Token?: string;
  locale?: string;
  t?: TFunction;
}

export function History({ BaseUrl, Token, locale = "en", t: tProp }: HistoryProps) {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);
  const active = useChatStore((state) => state.activeChat);
  const setActive = useChatStore((state) => state.setActiveChat);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  useEffect(() => {
    if (!BaseUrl) {
      return;
    }
    const store = { state: { endpoint_http: BaseUrl } };
    localStorage.setItem("app-store", JSON.stringify(store));

    if (Token) {
      const headers = { "X-API-TOKEN": Token };
      localStorage.setItem("headers", JSON.stringify(headers));
    }
  }, [BaseUrl, Token]);

  const fetchChatHistory = useCallback(async () => {
    try {
      const [err, res] = await Get<{
        hits?: { hits?: Chat[] };
      }>("/chat/_history", {
        from: 0,
        size: 100,
        keyword,
      });
      if (err) {
        return;
      }
      const hits = (res?.data?.hits?.hits as Chat[] | undefined) || [];
      setChats(hits);
    } catch (e) {
      console.error(e);
    }
  }, [keyword, setChats]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  const onSelect = useCallback(
    async (chat: Chat) => {
      setActive(chat);
    },
    [setActive]
  );

  const onRename = useCallback(
    async (chatId: string, title: string) => {
      try {
        const [err] = await Post(`/chat/${chatId}/_update`, { title });
        if (err) {
          return;
        }
        setChats(
          chats.map((c) =>
            c._id === chatId
              ? {
                  ...c,
                  _source: { ...(c._source || {}), title },
                }
              : c
          )
        );
        if (active?._id === chatId) {
          setActive({
            ...active,
            _source: { ...(active._source || {}), title },
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [active, chats, setActive, setChats]
  );

  const onRemove = useCallback(
    async (chatId: string) => {
      try {
        const [err] = await Post(`/chat/${chatId}/_delete`, {});
        if (err) {
          return;
        }
        const next = chats.filter((c) => c._id !== chatId);
        setChats(next);
        if (active?._id === chatId) {
          setActive(next[0]);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [active, chats, setActive, setChats]
  );

  return (
    <I18nextProvider i18n={i18n}>
      <HistoryList
        historyPanelId="history-panel"
        chats={chats}
        active={active}
        onSearch={setKeyword}
        onRefresh={fetchChatHistory}
        onSelect={onSelect}
        onRename={onRename}
        onRemove={onRemove}
        t={t}
      />
    </I18nextProvider>
  );
}
