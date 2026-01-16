import { useCallback, useEffect, useState } from "react";
import type { MutableRefObject } from "react";

import type { Chat, ChatMessageItem } from "@/types/chat";
import { Get, Post } from "@/api/axiosRequest";
import { streamPost } from "@/api/streamFetch";
import { isEmpty } from "lodash-es";
import { useConnectStore } from "@/stores/connectStore";

interface SendMessageParams {
  message?: string;
  attachments?: string[];
}

interface UseChatActionsResult {
  chatClose: (activeChat?: Chat) => Promise<void>;
  cancelChat: (activeChat?: Chat) => Promise<void>;
  chatHistory: (chat: Chat, callback?: (chat: Chat) => void) => Promise<void>;
  createNewChat: (params?: SendMessageParams) => Promise<void>;
  sendMessage: (newChat: Chat, params?: SendMessageParams) => Promise<void>;
  handleSendMessage: (activeChat?: Chat, params?: SendMessageParams) => Promise<void>;
  openSessionChat: (chat: Chat) => Promise<unknown>;
  getChatHistory: () => Promise<void>;
  createChatWindow: (createWin?: () => void) => Promise<void>;
  handleSearch: (keyword: string) => void;
  handleRename: (chatId: string, title: string) => Promise<void>;
  handleDelete: (chatId: string) => Promise<void>;
}

export function useChatActions(
  setActiveChat: (chat: Chat | undefined) => void,
  setCurChatEnd: (value: boolean) => void,
  setTimedoutShow: (value: boolean) => void,
  clearAllChunkData: () => Promise<void>,
  setQuestion: (value: string) => void,
  curIdRef: MutableRefObject<string>,
  curSessionIdRef: MutableRefObject<string>,
  setChats: (chats: Chat[]) => void,
  dealMsgRef: React.MutableRefObject<((msg: string) => void) | null>,
  setLoadingStep: (loading: Record<string, boolean>) => void,
  _isChatPage?: boolean,
  isSearchActive?: boolean,
  isDeepThinkActive?: boolean,
  isMCPActive?: boolean,
  changeInput?: (val: string) => void,
  showChatHistory?: boolean,
  getChatHistoryChatPage?: () => void,
): UseChatActionsResult {
  const [keyword, setKeyword] = useState("");

  const setVisibleStartPage = useConnectStore(
    (state) => state.setVisibleStartPage
  );

  const chatClose = useCallback(
    async (activeChat?: Chat) => {
      if (!activeChat?._id) return;

      await Post(`/chat/${activeChat._id}/_close`, {});
    },
    []
  );

  const resetChatState = useCallback(() => {
    setCurChatEnd(true);

    setLoadingStep({
      query_intent: false,
      tools: false,
      fetch_source: false,
      pick_source: false,
      deep_read: false,
      think: false,
      response: false,
    });
  }, [setCurChatEnd, setLoadingStep]);

  // 1. onSelectChat
  // 2. dealMsg setTimedoutShow
  // 3. disabledChange Manual shutdown
  const cancelChat = useCallback(
    async (activeChat?: Chat) => {
      resetChatState();

      if (!activeChat?._id) return;
      await Post(
        `/chat/${activeChat._id}/_cancel?message_id=${curIdRef.current}`,
        undefined
      );
    },
    [curIdRef, resetChatState]
  );

  // 1. handleSendMessage callback
  // 2. onSelectChat no callback
  const chatHistory = useCallback(
    async (chat: Chat, callback?: (chat: Chat) => void) => {
      if (!chat?._id) return;

      curSessionIdRef.current = chat._id;
      const [, res] = await Get<{
        hits?: { hits?: ChatMessageItem[] };
      }>(`/chat/${chat._id}/_history`, {
        from: 0,
        size: 1000,
      });
      const hits =
        (res?.hits?.hits as ChatMessageItem[] | undefined) || [];
      const updatedChat: Chat = {
        ...chat,
        messages: hits,
      };
      setActiveChat(updatedChat);
      if (callback) {
        callback(updatedChat);
      }
    },
    [curSessionIdRef, setActiveChat]
  );

  const handleChatCreateStreamMessage = useCallback(
    (msg: string) => {
      dealMsgRef.current?.(msg);
    },
    [dealMsgRef]
  );

  const prepareChatSession = useCallback(
    async (value: string) => {
      await clearAllChunkData();

      await new Promise<void>((resolve) => {
        if (changeInput) {
          changeInput("");
        }
        setTimedoutShow(false);
        setQuestion(value);
        setCurChatEnd(false);
        setTimeout(resolve, 0);
      });
    },
    [changeInput, clearAllChunkData, setCurChatEnd, setQuestion, setTimedoutShow]
  );

  const getChatHistory = useCallback(async () => {
    try {
      const [, res] = await Get<{
        hits?: { hits?: Chat[] };
      }>(`/chat/_history`, {
        from: 0,
        size: 100,
        keyword,
      });
      const hits = (res?.hits?.hits as Chat[] | undefined) || [];
      setChats(hits);
    } catch (error) {
      console.error("getChatHistory error:", error);
    }
  }, [keyword, setChats]);

  const createNewChat = useCallback(
    async (params?: SendMessageParams) => {
      const { message, attachments } = params || {};

      // console.log("message", message);
      // console.log("attachments", attachments);

      if (!message && isEmpty(attachments)) return;

      await prepareChatSession(message ?? "");

      const queryParams = {
        search: isSearchActive,
        deep_thinking: isDeepThinkActive,
        mcp: isMCPActive,
      };

      await streamPost({
        url: "/chat/_create",
        body: { message },
        queryParams,
        onMessage: (line) => {
          handleChatCreateStreamMessage(line);
        },
      });
      // console.log("showChatHistory", showChatHistory);

      if (showChatHistory) {
        if (getChatHistoryChatPage) {
          getChatHistoryChatPage();
        } else {
          getChatHistory();
        }
      }
    },
    [isSearchActive, isDeepThinkActive, isMCPActive, prepareChatSession, handleChatCreateStreamMessage, showChatHistory, getChatHistory, getChatHistoryChatPage]
  );

  const sendMessage = useCallback(
    async (newChat: Chat, params?: SendMessageParams) => {
      if (!newChat?._id || !params) return;

      const { message, attachments } = params;

      if (!message && isEmpty(attachments)) return;

      await prepareChatSession(message ?? "");

      const queryParams = {
        search: isSearchActive,
        deep_thinking: isDeepThinkActive,
        mcp: isMCPActive,
      };

      await streamPost({
        url: `/chat/${newChat._id}/_chat`,
        body: { message },
        queryParams,
        onMessage: (line) => {
          handleChatCreateStreamMessage(line);
        },
      });
    },
    [isSearchActive, isDeepThinkActive, isMCPActive, prepareChatSession, handleChatCreateStreamMessage]
  );

  const handleSendMessage = useCallback(
    async (activeChat?: Chat, params?: SendMessageParams) => {
      if (!activeChat?._id) return;

      const { message, attachments } = params ?? {};

      if (!message && isEmpty(attachments)) return;

      await chatHistory(activeChat, (chat) => sendMessage(chat, params));
    },
    [chatHistory, sendMessage]
  );

  const openSessionChat = useCallback(
    async (chat: Chat) => {
      if (!chat?._id) return;
      setVisibleStartPage(false);

      const [, res] = await Post(`/chat/${chat._id}/_open`, {});
      return res;
    },
    [setVisibleStartPage]
  );

  useEffect(() => {
    if (showChatHistory) {
      getChatHistory();
    }
  }, [showChatHistory, getChatHistory]);

  const createChatWindow = useCallback(async (createWin?: () => void) => {
    if (createWin) {
      createWin();
    }
  }, []);

  const handleSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleRename = useCallback(
    async (chatId: string, title: string) => {
      await Post(`/chat/${chatId}/_update`, { title });
    },
    []
  );

  const handleDelete = useCallback(
    async (chatId: string) => {
      await Post(`/chat/${chatId}/_delete`, {});
    },
    []
  );

  return {
    chatClose,
    cancelChat,
    chatHistory,
    createNewChat,
    sendMessage,
    handleSendMessage,
    openSessionChat,
    getChatHistory,
    createChatWindow,
    handleSearch,
    handleRename,
    handleDelete,
  };
}
