import { useRef, useEffect, useState } from "react";
import type { UIEvent } from "react";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import { ChatMessage, type ChatMessageRef } from "@infinilabs/chat-message";

import { Greetings } from "./Greetings";
import { useChatScroll } from "../hooks/useChatScroll";
import type { Chat, IChunkData } from "../types/chat";
import { useConnectStore } from "../stores/connectStore";
import ScrollToBottom from "../components/Common/ScrollToBottom";
import { useChatStore, type Assistant } from "../stores/chatStore";

export interface ActiveChatMessageProps {
  activeMessageRef?: React.RefObject<ChatMessageRef>;
  activeChat?: Chat;
  curChatEnd: boolean;
  Question: string;
  handleSendMessage: (content: string, newChat?: Chat) => void;
  formatUrl?: (data: IChunkData) => string;
  assistantList?: Assistant[];
  currentAssistant?: Assistant;
}

export const ActiveChatMessage = ({
  activeMessageRef,
  activeChat,
  curChatEnd,
  Question,
  handleSendMessage,
  formatUrl,
  assistantList,
  currentAssistant
}: ActiveChatMessageProps) => {
  const allMessages = activeChat?.messages || [];

  return (
    <ChatMessage
      key={"current"}
      ref={activeMessageRef}
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
      formatUrl={formatUrl}
      assistantList={assistantList}
      currentAssistant={currentAssistant}
    />
  );
};

interface ChatContentProps {
  activeChat?: Chat;
  activeMessageRef?: React.RefObject<ChatMessageRef>;
  timedoutShow: boolean;
  Question: string;
  handleSendMessage: (content: string, newChat?: Chat) => void;
  getFileUrl: (path: string) => string;
  formatUrl?: (data: IChunkData) => string;
  curIdRef: React.MutableRefObject<string>;
  t?: TFunction;
  currentAssistant?: Assistant;
}

export const ChatContent = ({
  activeChat,
  activeMessageRef,
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
  const assistantList = useChatStore((state) => state.assistantList);
  const currentAssistant = useChatStore((state) => state.currentAssistant);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { scrollToBottom, resetUserScrolling } = useChatScroll(scrollRef);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [prevChatId, setPrevChatId] = useState(activeChat?._id);

  if (activeChat?._id !== prevChatId) {
    setPrevChatId(activeChat?._id);
    setIsAtBottom(true);
    resetUserScrolling();
  }

  useEffect(() => {
    setCurrentSessionId(activeChat?._id);
  }, [activeChat?._id, setCurrentSessionId]);

  useEffect(() => {
    scrollToBottom(true);
  }, [activeChat?._id, activeChat?.messages?.length, scrollToBottom]);

  useEffect(() => {
    return () => {
      scrollToBottom.cancel();
    };
  }, [scrollToBottom]);

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
        className="flex-1 w-full overflow-x-hidden overflow-y-auto custom-scrollbar relative"
        onScroll={handleScroll}
      >
        <div className="max-w-4xl mx-auto">
          {(!activeChat || activeChat?.messages?.length === 0) && (
            <Greetings t={t} />
          )}

          {activeChat?.messages?.map((message) => (
            <ChatMessage
              key={message._id}
              message={message}
              isTyping={false}
              onResend={handleSendMessage}
              formatUrl={formatUrl}
              assistantList={assistantList}
            />
          ))}

          <ActiveChatMessage
            activeMessageRef={activeMessageRef}
            activeChat={activeChat}
            curChatEnd={curChatEnd}
            Question={Question}
            handleSendMessage={handleSendMessage}
            formatUrl={formatUrl}
            assistantList={assistantList}
            currentAssistant={currentAssistant}
          />

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

      </div>

      <ScrollToBottom scrollRef={scrollRef} isAtBottom={isAtBottom} />
    </div>
  );
};
