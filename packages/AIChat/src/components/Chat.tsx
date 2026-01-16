import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import i18n from "@/i18n";

import { useChatStore } from "@/stores/chatStore";
import useMessageChunkData from "@/hooks/useMessageChunkData";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import { ChatContent } from "./ChatContent";
import type { Chat, ChatMessageItem, IChunkData } from "@/types/chat";

interface ChatAIProps {
  BaseUrl: string;
  Token?: string;
  formatUrl?: (data: IChunkData) => string;
  locale?: string;
  t?: TFunction;
}

export interface SendMessageParams {
  message?: string;
  attachments?: string[];
}

export interface ChatAIRef {
  init: (params: SendMessageParams) => void;
  cancelChat: () => void;
  clearChat: () => void;
  onSelectChat: (chat: Chat) => void;
}

const ChatAI = memo(
  forwardRef<ChatAIRef, ChatAIProps>(({ BaseUrl, formatUrl, t: tProp }, ref) => {
    const { t: tOriginal } = useTranslation();
    const t = tProp || tOriginal;
    const baseUrl = BaseUrl;
    const curChatEnd = useChatStore((state) => state.curChatEnd);
    const setCurChatEnd = useChatStore((state) => state.setCurChatEnd);
    const activeChat = useChatStore((state) => state.activeChat);
    const setActiveChat = useChatStore((state) => state.setActiveChat);
    const setHasActiveChat = useChatStore((state) => state.setHasActiveChat);

    const [timedoutShow, setTimedoutShow] = useState(false);
    const [Question, setQuestion] = useState<string>("");

    const curIdRef = useRef("");
    const curSessionIdRef = useRef("");

    const {
      data: {
        query_intent,
        tools,
        fetch_source,
        pick_source,
        deep_read,
        think,
        response,
      },
      handlers,
      clearAllChunkData,
    } = useMessageChunkData();

    const [loadingStep, setLoadingStep] = useState<Record<string, boolean>>({
      query_intent: false,
      tools: false,
      fetch_source: false,
      pick_source: false,
      deep_read: false,
      think: false,
      response: false,
    });

    useEffect(() => {
      setHasActiveChat(Boolean(activeChat));
    }, [activeChat, setHasActiveChat]);

    const streamPost = useCallback(
      async (
        url: string,
        body: Record<string, unknown>,
        onMessage: (line: string) => void
      ) => {
        const headersStr = localStorage.getItem("headers") || "{}";
        const headersStorage = JSON.parse(headersStr) as Record<string, string>;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...headersStorage },
          credentials: "include",
          body: JSON.stringify(body),
        });
        const reader = res.body?.getReader();
        if (!reader) return;
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
          for (const line of lines) {
            onMessage(line);
          }
        }
      },
      []
    );

    type ChatStreamSingle = {
      _id?: string;
      _source?: {
        [key: string]: unknown;
      };
      payload?: {
        id?: string;
        session_id?: string;
        [key: string]: unknown;
      };
    };

    const handleStreamMessage = useCallback(
      (msg: string) => {
        if (msg.includes("\"user\"") && msg.includes("_source") && msg.includes("result")) {
          try {
            const parsed = JSON.parse(msg) as ChatMessageItem[] | ChatStreamSingle;
            let nextChat: Chat;

            if (Array.isArray(parsed)) {
              const hits = parsed as ChatMessageItem[];
              const first = hits[0];
              if (first) {
                curIdRef.current = first._id;
                const source = first._source as { [key: string]: unknown };
                const sessionId = source.session_id as string | undefined;
                if (sessionId) {
                  curSessionIdRef.current = sessionId;
                }
              }
              const baseChat: Chat =
                activeChat ||
                {
                  _id: first?._id ?? "",
                };
              nextChat = {
                ...baseChat,
                messages: [
                  ...(baseChat.messages || []),
                  ...hits,
                ],
              };
            } else {
              const withPayload = parsed as ChatStreamSingle;
              const payload = withPayload.payload ?? {};
              const id = payload.id;
              const sessionId = payload.session_id;

              if (typeof id === "string") {
                curIdRef.current = id;
              }
              if (typeof sessionId === "string") {
                curSessionIdRef.current = sessionId;
              }

              const messageItem: ChatMessageItem = {
                _id:
                  withPayload._id ??
                  (typeof id === "string" ? id : "") ??
                  activeChat?._id ??
                  "",
                _source: {
                  ...(withPayload._source || {}),
                  ...payload,
                } as ChatMessageItem["_source"],
              };

              const baseChat: Chat =
                activeChat || {
                  _id: messageItem._id,
                };

              nextChat = {
                ...baseChat,
                messages: [
                  ...(baseChat.messages || []),
                  messageItem,
                ],
              };
            }

            setActiveChat(nextChat);
            return;
          } catch (error) {
            console.error("Failed to parse chat message:", error);
            return;
          }
        }
      },
      [activeChat, setActiveChat]
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
    }, [setCurChatEnd]);

    const prepareChatSession = useCallback(
      async (value: string) => {
        await clearAllChunkData();
        setTimedoutShow(false);
        setQuestion(value);
        setCurChatEnd(false);
      },
      [clearAllChunkData, setCurChatEnd]
    );

    const createNewChat = useCallback(
      async (params: SendMessageParams) => {
        const text = params.message ?? "";
        const attachments = params.attachments;
        if (!text && (!attachments || attachments.length === 0)) {
          return;
        }
        await prepareChatSession(text);
        await streamPost(`${baseUrl}/chat`, { message: text, attachments }, handleStreamMessage);
      },
      [baseUrl, handleStreamMessage, prepareChatSession, streamPost]
    );

    const sendMessage = useCallback(
      async (chat: Chat, params?: SendMessageParams) => {
        if (!chat?._id || !params) return;
        const text = params.message ?? "";
        const attachments = params.attachments;
        if (!text && (!attachments || attachments.length === 0)) {
          return;
        }
        await prepareChatSession(text);
        await streamPost(
          `${baseUrl}/chat/${chat._id}/_continue`,
          { message: text, attachments },
          handleStreamMessage
        );
      },
      [baseUrl, handleStreamMessage, prepareChatSession, streamPost]
    );

    const handleSendMessage = useCallback(
      async (chat?: Chat, params?: SendMessageParams) => {
        if (!curChatEnd) return;
        if (!chat?._id) {
          await createNewChat(params || {});
        } else {
          await sendMessage(chat, params);
        }
      },
      [createNewChat, curChatEnd, sendMessage]
    );

    const cancelChat = useCallback(async () => {
      if (activeChat?._id) {
        try {
          const headersStr = localStorage.getItem("headers") || "{}";
          const headersStorage = JSON.parse(headersStr) as Record<string, string>;
          await fetch(`${baseUrl}/chat/${activeChat._id}/_cancel?message_id=${curIdRef.current}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...headersStorage },
            credentials: "include",
          });
        } catch (e) {
          console.error(e);
        }
      }
      resetChatState();
    }, [activeChat, baseUrl, resetChatState]);

    const clearChat = useCallback(() => {
      setTimedoutShow(false);
      if (activeChat?._id) {
        const headersStr = localStorage.getItem("headers") || "{}";
        const headersStorage = JSON.parse(headersStr) as Record<string, string>;
        fetch(`${baseUrl}/chat/${activeChat._id}/_close`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...headersStorage },
          credentials: "include",
        }).catch(() => {});
      }
      setActiveChat(undefined);
      setCurChatEnd(true);
    }, [activeChat, baseUrl, setActiveChat, setCurChatEnd]);

    const onSelectChat = useCallback(
      async (chat: Chat) => {
        setTimedoutShow(false);
        await clearAllChunkData();
        if (activeChat?._id) {
          const headersStr = localStorage.getItem("headers") || "{}";
          const headersStorage = JSON.parse(headersStr) as Record<string, string>;
          await fetch(`${baseUrl}/chat/${activeChat._id}/_close`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...headersStorage },
            credentials: "include",
          }).catch(() => {});
        }
        setActiveChat(chat);
        try {
          const headersStr = localStorage.getItem("headers") || "{}";
          const headersStorage = JSON.parse(headersStr) as Record<string, string>;
          const res = await fetch(`${baseUrl}/chat/${chat._id}/_history`, {
            method: "GET",
            headers: { "Content-Type": "application/json", ...headersStorage },
            credentials: "include",
          });
          const data = await res.json();
          const hits = (data?.hits?.hits ?? []) as ChatMessageItem[];
          setActiveChat({
            ...chat,
            messages: hits,
          });
        } catch (e) {
          console.error(e);
        }
      },
      [activeChat, baseUrl, clearAllChunkData, setActiveChat]
    );

    const { dealMsg } = useMessageHandler(
      curIdRef,
      curSessionIdRef,
      setCurChatEnd,
      setTimedoutShow,
      () => {
        if (activeChat?._id) {
          const headersStr = localStorage.getItem("headers") || "{}";
          const headersStorage = JSON.parse(headersStr) as Record<string, string>;
          fetch(`${baseUrl}/chat/${activeChat._id}/_cancel?message_id=${curIdRef.current}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...headersStorage },
            credentials: "include",
          }).catch(() => {});
        }
      },
      setLoadingStep,
      handlers
    );

    useEffect(() => {
      // no-op hook for future side effects tied to dealMsg
    }, [dealMsg]);

    useImperativeHandle(ref, () => ({
      init: (params: SendMessageParams) => {
        if (!activeChat?._id) {
          createNewChat(params);
        } else {
          handleSendMessage(activeChat, params);
        }
      },
      cancelChat: () => {
        cancelChat();
      },
      clearChat,
      onSelectChat,
    }));

    const getFileUrl = useCallback(
      (path: string) => `${baseUrl.replace(/\/$/, "")}/files/${encodeURIComponent(path)}`,
      [baseUrl]
    );

    return (
      <I18nextProvider i18n={i18n}>
        <div className="flex flex-col rounded-md h-full overflow-hidden relative">
          <ChatContent
            activeChat={activeChat}
            query_intent={query_intent}
            tools={tools}
            fetch_source={fetch_source}
            pick_source={pick_source}
            deep_read={deep_read}
            think={think}
            response={response}
            loadingStep={loadingStep}
            timedoutShow={timedoutShow}
            Question={Question}
            handleSendMessage={(message) => handleSendMessage(activeChat, { message })}
            getFileUrl={getFileUrl}
            formatUrl={formatUrl}
            curIdRef={curIdRef}
            t={t}
          />
        </div>
      </I18nextProvider>
    );
  })
);

export default ChatAI;
