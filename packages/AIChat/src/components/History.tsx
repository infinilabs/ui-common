import { useCallback, useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import { message } from "antd";

import type { Chat } from "../types/chat";
import { useChatStore } from "../stores/chatStore";
import { Get, Put, Delete } from "../api/axiosRequest";
import HistoryList from "./HistoryList";
import i18n from "../i18n";

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
  const [renamingId, setRenamingId] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string>("");

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
        setRenamingId(chatId);
        const [err] = await Put(`/chat/${chatId}`, { title });
        if (err) {
          messageApi.open({
            key,
            type: "error",
            content: t("history_list.operate.rename_error"),
          });
          return;
        }
        await fetchChatHistory();
      } catch (e) {
        console.error(e);
      } finally {
        setRenamingId("");
      }
    },
    [messageApi, t, fetchChatHistory]
  );

  const onRemove = useCallback(
    async (chatId: string) => {
      const key = "delete_message";

      try {
        setDeletingId(chatId);

        const [err] = await Delete(`/chat/${chatId}`);
        if (err) {
          messageApi.open({
            key,
            type: "error",
            content: t("history_list.operate.delete_error"),
          });
          return;
        }

        // Fetch latest history after successful deletion
        await fetchChatHistory();

      } catch (e) {
        console.error(e);

        messageApi.open({
          key,
          type: "error",
          content: t("history_list.operate.delete_error"),
        });
      } finally {
        setDeletingId("");
      }
    },
    [messageApi, t, fetchChatHistory]
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
        renamingId={renamingId}
        deletingId={deletingId}
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
