import { useCallback, useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import { message } from "antd";

import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chatStore";
import { Get, Put, Delete } from "@/api/axiosRequest";
import HistoryList from "./HistoryList";
import i18n from "@/i18n";

interface HistoryProps {
  BaseUrl: string;
  Token?: string;
  locale?: string;
  t?: TFunction;
}

function InnerHistory({ BaseUrl, Token, locale = "en", t: tProp }: HistoryProps) {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;

  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);
  const active = useChatStore((state) => state.activeChat);
  const setActive = useChatStore((state) => state.setActiveChat);
  
  const [messageApi, contextHolder] = message.useMessage();

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
      const hits = (res?.hits?.hits as Chat[] | undefined) || [];
      setChats(hits);

      if (hits.length > 0) {
        const currentActive = useChatStore.getState().activeChat;
        if (!currentActive) {
          setActive(hits[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [keyword, setChats, setActive]);

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
      const key = "rename_message";
      try {
        messageApi.open({
          key,
          type: "loading",
          content: t("history_list.operate.renaming"),
        });
        const [err] = await Put(`/chat/${chatId}`, { title });
        if (err) {
          messageApi.open({
            key,
            type: "error",
            content: t("history_list.operate.rename_error"),
          });
          return;
        }
        messageApi.open({
          key,
          type: "success",
          content: t("history_list.operate.rename_success"),
        });
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
        messageApi.open({
          key,
          type: "error",
          content: t("history_list.operate.rename_error"),
        });
      }
    },
    [active, chats, setActive, setChats, messageApi, t]
  );

  const onRemove = useCallback(
    async (chatId: string) => {
      const key = "delete_message";
      try {
        messageApi.open({
          key,
          type: "loading",
          content: t("history_list.operate.deleting"),
        });
        const [err] = await Delete(`/chat/${chatId}`);
        if (err) {
          messageApi.open({
            key,
            type: "error",
            content: t("history_list.operate.delete_error"),
          });
          return;
        }
        messageApi.open({
          key,
          type: "success",
          content: t("history_list.operate.delete_success"),
        });
        const next = chats.filter((c) => c._id !== chatId);
        setChats(next);
        if (active?._id === chatId) {
          setActive(next[0]);
        }
      } catch (e) {
        console.error(e);
        messageApi.open({
          key,
          type: "error",
          content: t("history_list.operate.delete_error"),
        });
      }
    },
    [active, chats, setActive, setChats, messageApi, t]
  );

  return (
    <>
      {contextHolder}
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
    </>
  );
}

export function History(props: HistoryProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <InnerHistory {...props} />
    </I18nextProvider>
  );
}
