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
import i18n from "../i18n";
import { type ChatMessageRef } from "@infinilabs/chat-message";

import { useChatStore } from "../stores/chatStore";
import { ChatContent } from "./ChatContent";
import type { Chat, ChatMessageItem, IChunkData } from "../types/chat";
import { streamPost } from "../api/streamFetch";
import { Get, Post } from "../api/axiosRequest";
import { useIconfontScript } from "../hooks/useScript";

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
  search?: boolean;
  deep_thinking?: boolean;
  mcp?: boolean;
  datasource?: string;
  mcp_servers?: string;
  assistant_id?: string;
}

export interface ChatAIRef {
  init: (params: SendMessageParams) => void;
  cancelChat: () => void;
  clearChat: () => void;
  onSelectChat: (chat: Chat) => void;
}

const InnerChatAI = memo(
  forwardRef<ChatAIRef, ChatAIProps>(
    ({ BaseUrl, formatUrl, t: tProp }, ref) => {
      useIconfontScript();

      const { t: tOriginal } = useTranslation();
      const t = tProp || tOriginal;
      const baseUrl = BaseUrl;

      const curChatEnd = useChatStore((state) => state.curChatEnd);
      const setCurChatEnd = useChatStore((state) => state.setCurChatEnd);
      const activeChat = useChatStore((state) => state.activeChat);
      const setActiveChat = useChatStore((state) => state.setActiveChat);
      const setHasActiveChat = useChatStore((state) => state.setHasActiveChat);
      const currentAssistant = useChatStore((state) => state.currentAssistant);

      const [timedoutShow, setTimedoutShow] = useState(false);
      const [Question, setQuestion] = useState<string>("");

      const curIdRef = useRef("");
      const curSessionIdRef = useRef("");
      const activeMessageRef = useRef<ChatMessageRef>(null);

      useEffect(() => {
        setHasActiveChat(Boolean(activeChat));
      }, [activeChat, setHasActiveChat]);

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
          try {
            // Attempt to parse the message, as it might be a JSON string
            if (msg.startsWith("{") && msg.endsWith("}")) {
              //
            }

            // Existing logic for updating the Chat List / History state
            if (
              msg.includes('"user"') &&
              msg.includes("_source") &&
              msg.includes("result")
            ) {
              // ... (existing parsing logic)
              const parsed = JSON.parse(msg) as
                | ChatMessageItem[]
                | ChatStreamSingle;
              // ... (rest of the existing logic)
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
                const baseChat: Chat = activeChat || {
                  _id: first?._id ?? "",
                };
                nextChat = {
                  ...baseChat,
                  messages: [...(baseChat.messages || []), ...hits],
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

                const baseChat: Chat = activeChat || {
                  _id: messageItem._id,
                };

                nextChat = {
                  ...baseChat,
                  messages: [...(baseChat.messages || []), messageItem],
                };
              }

              setActiveChat(nextChat);
            }

            const chunkData = JSON.parse(msg);

            if (chunkData.chunk_type) {
              console.log(
                11121212,
                chunkData,
                chunkData.chunk_type,
                activeMessageRef.current?.addChunk,
              );

              activeMessageRef.current?.addChunk(chunkData);

              if (chunkData.chunk_type === "reply_end") {
                setCurChatEnd(true);
              }
            }
          } catch (error) {
            // If JSON parse fails or other errors, just log and continue
            console.error("Failed to parse chat message:", error);
          }
        },
        [activeChat, setActiveChat, setCurChatEnd],
      );

      const resetChatState = useCallback(() => {
        setCurChatEnd(true);
        activeMessageRef.current?.reset();
      }, [setCurChatEnd]);

      const prepareChatSession = useCallback(
        async (value: string) => {
          activeMessageRef.current?.reset();
          setTimedoutShow(false);
          setQuestion(value);
          setCurChatEnd(false);
          // Wait for a tick to ensure React renders the ActiveChatMessage component (because curChatEnd becomes false)
          await new Promise((resolve) => setTimeout(resolve, 100));
        },
        [setCurChatEnd],
      );

      const fetchHistory = useCallback(
        async (chatId: string) => {
          try {
            const [err, res] = await Get<{
              hits: { hits: ChatMessageItem[] };
            }>(`/chat/${chatId}/_history`, {
              from: 0,
              size: 1000,
            });
            if (err || !res) return;
            const hits = (res?.hits?.hits ?? []) as ChatMessageItem[];

            // Get the latest state to ensure we are updating the correct chat
            const currentActive = useChatStore.getState().activeChat;
            if (currentActive?._id === chatId) {
              setActiveChat({
                ...currentActive,
                messages: hits,
              });
            }
          } catch (e) {
            console.error(e);
          }
        },
        [setActiveChat],
      );

      const createNewChat = useCallback(
        async (params: SendMessageParams) => {
          const text = params.message ?? "";
          const attachments = params.attachments;
          if (!text && (!attachments || attachments.length === 0)) {
            return;
          }
          await prepareChatSession(text);

          const queryParams = {
            search:
              params.search ??
              !!(currentAssistant?._source?.deep_research_enabled ?? true),
            deep_thinking:
              params.deep_thinking ??
              !!(currentAssistant?._source?.deep_think_enabled ?? true),
            mcp: params.mcp,
            datasource: params.datasource,
            mcp_servers: params.mcp_servers,
            assistant_id: params.assistant_id || currentAssistant?._id || "",
          };

          await streamPost({
            url: "/chat/_create",
            body: {
              message: text,
              attachments,
            },
            queryParams,
            onMessage: handleStreamMessage,
          });
        },
        [handleStreamMessage, prepareChatSession, currentAssistant],
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

          const queryParams = {
            search:
              params.search ??
              !!(currentAssistant?._source?.deep_research_enabled ?? true),
            deep_thinking:
              params.deep_thinking ??
              !!(currentAssistant?._source?.deep_think_enabled ?? true),
            mcp: params.mcp,
            datasource: params.datasource,
            mcp_servers: params.mcp_servers,
            assistant_id: params.assistant_id || currentAssistant?._id || "",
          };

          await streamPost({
            url: `/chat/${chat._id}/_chat`,
            body: { message: text, attachments },
            queryParams,
            onMessage: handleStreamMessage,
          });

          if (chat._id) {
            await fetchHistory(chat._id);
          }
        },
        [handleStreamMessage, prepareChatSession, currentAssistant, fetchHistory],
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
        [createNewChat, curChatEnd, sendMessage],
      );

      const cancelChat = useCallback(async () => {
        if (activeChat?._id) {
          try {
            await Post(
              `/chat/${activeChat._id}/_cancel?message_id=${curIdRef.current}`,
              undefined,
            );
          } catch (e) {
            console.error(e);
          }
        }
        resetChatState();
      }, [activeChat, resetChatState]);

      const clearChat = useCallback(() => {
        setTimedoutShow(false);
        setActiveChat(undefined);
        setCurChatEnd(true);
      }, [setActiveChat, setCurChatEnd]);

      const prevActiveChatIdRef = useRef<string | undefined>(undefined);

      useEffect(() => {
        const currentChatId = activeChat?._id;

        // Only trigger if the chat ID has actually changed
        if (currentChatId !== prevActiveChatIdRef.current) {
          // 1. Update the ref to the current ID
          prevActiveChatIdRef.current = currentChatId;

          // 2. If there is a new chat, prepare the environment and fetch history
          if (currentChatId) {
            // Perform async operations to avoid synchronous state updates in effect
            (async () => {
              setTimedoutShow(false);
              activeMessageRef.current?.reset();
              await fetchHistory(currentChatId);
            })();
          } else {
            // If currentChatId is undefined (chat cleared), just ensure state is clean
            // Wrap in timeout to avoid synchronous state update warning
            /*
            setTimeout(() => {
              setTimedoutShow(false);
              setCurChatEnd(true);
            }, 0);
            */
          }
        }
      }, [activeChat?._id, fetchHistory]);

      const onSelectChat = useCallback(
        (chat: Chat) => {
          // Just set the active chat; the useEffect will handle closing previous, clearing data, and fetching new history
          setActiveChat(chat);
        },
        [setActiveChat],
      );

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
        (path: string) =>
          `${baseUrl?.replace(/\/$/, "")}/files/${encodeURIComponent(path)}`,
        [baseUrl],
      );

      return (
        <div className="flex flex-col rounded-md h-full overflow-hidden relative">
          <ChatContent
            activeChat={activeChat}
            activeMessageRef={activeMessageRef}
            timedoutShow={timedoutShow}
            Question={Question}
            handleSendMessage={(message) =>
              handleSendMessage(activeChat, { message })
            }
            getFileUrl={getFileUrl}
            formatUrl={formatUrl}
            curIdRef={curIdRef}
            t={t}
            currentAssistant={currentAssistant}
          />
        </div>
      );
    },
  ),
);

const ChatAI = memo(
  forwardRef<ChatAIRef, ChatAIProps>((props, ref) => {
    return (
      <I18nextProvider i18n={i18n}>
        <InnerChatAI {...props} ref={ref} />
      </I18nextProvider>
    );
  }),
);

export default ChatAI;
