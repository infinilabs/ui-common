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
import { streamPost } from "@/api/streamFetch";
import { Get, Post } from "@/api/axiosRequest";
import { useIconfontScript } from "@/hooks/useScript";

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

const InnerChatAI = memo(
  forwardRef<ChatAIRef, ChatAIProps>(({ BaseUrl, formatUrl, t: tProp }, ref) => {
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

    const { dealMsg } = useMessageHandler(
      curIdRef,
      curSessionIdRef,
      setCurChatEnd,
      setTimedoutShow,
      () => {
        if (activeChat?._id) {
          Post(
            `/chat/${activeChat._id}/_cancel?message_id=${curIdRef.current}`,
            undefined
          ).catch(() => {});
        }
      },
      setLoadingStep,
      handlers
    );

    useEffect(() => {
      // no-op hook for future side effects tied to dealMsg
    }, [dealMsg]);

    const handleStreamMessage = useCallback(
      (msg: string) => {
        try {
          // Attempt to parse the message, as it might be a JSON string
          if (msg.startsWith("{") && msg.endsWith("}")) {
              const chunkData = JSON.parse(msg);
              // Check if it's a message chunk handled by useMessageHandler
              if (chunkData.chunk_type && ["query_intent", "tools", "fetch_source", "pick_source", "deep_read", "think", "response", "reply_end"].includes(chunkData.chunk_type)) {
                  // It's a chunk, let dealMsg handle it
              }
          }
          
          // Delegate to useMessageHandler for streaming updates (thinking, response generation, etc.)
          dealMsg(msg);

          // Existing logic for updating the Chat List / History state
          if (msg.includes("\"user\"") && msg.includes("_source") && msg.includes("result")) {
            // ... (existing parsing logic)
            const parsed = JSON.parse(msg) as ChatMessageItem[] | ChatStreamSingle;
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
          }
        } catch (error) {
           // If JSON parse fails or other errors, just log and continue
           console.error("Failed to parse chat message:", error);
        }
      },
      [activeChat, setActiveChat, dealMsg]
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
        await streamPost({
          url: "/chat/_create",
          body: {
            message: text,
            attachments,
            assistant_id: currentAssistant?._id,
          },
          onMessage: handleStreamMessage,
        });
      },
      [handleStreamMessage, prepareChatSession, currentAssistant]
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
        await streamPost({
          url: `/chat/${chat._id}/_chat`,
          body: { message: text, attachments },
          onMessage: handleStreamMessage,
        });
      },
      [handleStreamMessage, prepareChatSession]
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
          await Post(
            `/chat/${activeChat._id}/_cancel?message_id=${curIdRef.current}`,
            undefined
          );
        } catch (e) {
          console.error(e);
        }
      }
      resetChatState();
    }, [activeChat, resetChatState]);

    const clearChat = useCallback(() => {
      setTimedoutShow(false);
      if (activeChat?._id) {
        Post(`/chat/${activeChat._id}/_close`, {}).catch(() => {});
      }
      setActiveChat(undefined);
      setCurChatEnd(true);
    }, [activeChat, setActiveChat, setCurChatEnd]);

    const prevActiveChatIdRef = useRef<string | undefined>(undefined);

    useEffect(() => {
      const currentChatId = activeChat?._id;
      
      // Only trigger if the chat ID has actually changed
      if (currentChatId !== prevActiveChatIdRef.current) {
        
        // 1. Close the previous chat if it existed
        if (prevActiveChatIdRef.current) {
          Post(`/chat/${prevActiveChatIdRef.current}/_close`, {}).catch(() => {});
        }

        // 2. Update the ref to the current ID
        prevActiveChatIdRef.current = currentChatId;

        // 3. If there is a new chat, prepare the environment and fetch history
        if (currentChatId) {
          // Perform async operations to avoid synchronous state updates in effect
          (async () => {
             setTimedoutShow(false);
             await clearAllChunkData();
             
             try {
               const [err, res] = await Get<{ hits: { hits: ChatMessageItem[] } }>(
                 `/chat/${currentChatId}/_history`,
                 {
                   from: 0,
                   size: 1000,
                 }
               );
               if (err || !res) return;
               const hits = (res?.hits?.hits ?? []) as ChatMessageItem[];
               
               // Get the latest state to ensure we are updating the correct chat
               const currentActive = useChatStore.getState().activeChat;
               if (currentActive?._id === currentChatId) {
                   setActiveChat({
                       ...currentActive,
                       messages: hits,
                   });
               }
             } catch (e) {
               console.error(e);
             }
          })();
        } else {
           // If currentChatId is undefined (chat cleared), just ensure state is clean
           // Wrap in timeout to avoid synchronous state update warning
           setTimeout(() => {
               setTimedoutShow(false);
               setCurChatEnd(true);
           }, 0);
        }
      }
    }, [activeChat?._id, clearAllChunkData, setActiveChat, setCurChatEnd]);

    const onSelectChat = useCallback(
      (chat: Chat) => {
        // Just set the active chat; the useEffect will handle closing previous, clearing data, and fetching new history
        setActiveChat(chat);
      },
      [setActiveChat]
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
      (path: string) => `${baseUrl.replace(/\/$/, "")}/files/${encodeURIComponent(path)}`,
      [baseUrl]
    );

    return (
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
          currentAssistant={currentAssistant}
        />
      </div>
    );
  })
);

const ChatAI = memo(
  forwardRef<ChatAIRef, ChatAIProps>((props, ref) => {
    return (
      <I18nextProvider i18n={i18n}>
        <InnerChatAI {...props} ref={ref} />
      </I18nextProvider>
    );
  })
);

export default ChatAI;
