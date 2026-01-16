import { useRef, useEffect, useState } from "react";
import type { UIEvent } from "react";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import { ChatMessage } from "@infinilabs/chat-message";

import { Greetings } from "./Greetings";
import { useChatScroll } from "@/hooks/useChatScroll";
import type { Chat, IChunkData } from "@/types/chat";
import { useConnectStore } from "@/stores/connectStore";
import ScrollToBottom from "@/components/Common/ScrollToBottom";
import { useChatStore } from "@/stores/chatStore";

interface ChatContentProps {
  activeChat?: Chat;
  query_intent?: IChunkData;
  tools?: IChunkData;
  fetch_source?: IChunkData;
  pick_source?: IChunkData;
  deep_read?: IChunkData;
  think?: IChunkData;
  response?: IChunkData;
  loadingStep?: Record<string, boolean>;
  timedoutShow: boolean;
  Question: string;
  handleSendMessage: (content: string, newChat?: Chat) => void;
  getFileUrl: (path: string) => string;
  formatUrl?: (data: IChunkData) => string;
  curIdRef: React.MutableRefObject<string>;
  t?: TFunction;
}

export const ChatContent = ({
  activeChat,
  query_intent,
  tools,
  fetch_source,
  pick_source,
  deep_read,
  think,
  response,
  timedoutShow,
  Question,
  handleSendMessage,
  formatUrl,
  t: tProp,
}: ChatContentProps) => {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;

  const setCurrentSessionId = useConnectStore(
    (state) => state.setCurrentSessionId
  );
  
  const curChatEnd = useChatStore((state) => state.curChatEnd);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { scrollToBottom } = useChatScroll(messagesEndRef);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [prevChatId, setPrevChatId] = useState(activeChat?._id);

  if (activeChat?._id !== prevChatId) {
    setPrevChatId(activeChat?._id);
    setIsAtBottom(true);
  }

  useEffect(() => {
    setCurrentSessionId(activeChat?._id);
  }, [activeChat?._id, setCurrentSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [
    activeChat?._id,
    query_intent?.message_chunk,
    fetch_source?.message_chunk,
    pick_source?.message_chunk,
    deep_read?.message_chunk,
    think?.message_chunk,
    response?.message_chunk,
    curChatEnd,
    scrollToBottom,
  ]);

  useEffect(() => {
    return () => {
      scrollToBottom.cancel();
    };
  }, [scrollToBottom]);

  const allMessages = activeChat?.messages || [];

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } =
      event.currentTarget as HTMLDivElement;

    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    setIsAtBottom(isAtBottom);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col justify-between relative user-select-text">
      <div
        ref={scrollRef}
        className="flex-1 w-full overflow-x-hidden overflow-y-auto border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.15)] custom-scrollbar relative"
        onScroll={handleScroll}
      >
        {(!activeChat || activeChat?.messages?.length === 0) && (
          <Greetings t={t} />
        )}

        {activeChat?.messages?.map((message, index) => (
          <ChatMessage
            key={message._id + index}
            message={message}
            isTyping={false}
            onResend={handleSendMessage}
          />
        ))}

        {(!curChatEnd ||
          query_intent ||
          tools ||
          fetch_source ||
          pick_source ||
          deep_read ||
          think ||
          response) &&
        activeChat?._source?.id ? (
          <ChatMessage
            key={"current"}
            message={{
              _id: "current",
              _source: {
                type: "assistant",
                assistant_id:
                  allMessages[allMessages.length - 1]?._source?.assistant_id,
                message: "",
                question: Question,
              },
            }}
            onResend={handleSendMessage}
            isTyping={!curChatEnd}
            query_intent={query_intent}
            tools={tools}
            fetch_source={fetch_source}
            pick_source={pick_source}
            deep_read={deep_read}
            think={think}
            response={response}
            formatUrl={formatUrl}
          />
        ) : null}

        {timedoutShow ? (
          <ChatMessage
            key={"timedout"}
            message={{
              _id: "timedout",
              _source: {
                type: "assistant",
                message: t("assistant.chat.timedout"),
                question: Question,
              },
            }}
            onResend={handleSendMessage}
            isTyping={false}
          />
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      <ScrollToBottom scrollRef={scrollRef} isAtBottom={isAtBottom} />
    </div>
  );
};
