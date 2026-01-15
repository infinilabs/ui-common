import { memo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import clsx from "clsx";
import i18nInstance from "../i18n/config";
import { XMarkdown } from "@ant-design/x-markdown";

import logoImg from "@/assets/icon.svg";
import type { IChatMessage, IChunkData } from "@/types/chat";
export type { IChatMessage, IChunkData };
import { QueryIntent } from "./QueryIntent";
import { CallTools } from "./CallTools";
import { FetchSource } from "./FetchSource";
import { PickSource } from "./PickSource";
import { DeepRead } from "./DeepRead";
import { Think } from "./Think";
import { MessageActions } from "./MessageActions";
import { SuggestionList } from "./SuggestionList";
import { UserMessage } from "./UserMessage";
import FontIcon from "@/components/Common/Icons/FontIcon";
import useMessageChunkData from "../hooks/useMessageChunkData";

import "./index.css";

export interface ChatMessageProps {
  message: IChatMessage;
  isTyping?: boolean;
  onResend?: (value: string) => void;
  hide_assistant?: boolean;
  rootClassName?: string;
  actionClassName?: string;
  actionIconSize?: number;
  copyButtonId?: string;
  formatUrl?: (data: IChunkData) => string;
  theme?: "light" | "dark" | "system";
  locale?: string;
  query_intent?: IChunkData;
  tools?: IChunkData;
  fetch_source?: IChunkData;
  pick_source?: IChunkData;
  deep_read?: IChunkData;
  think?: IChunkData;
  response?: IChunkData;
  currentAssistant?: any;
  assistantList?: any[];
}

export interface ChatMessageRef {
  addChunk: (chunk: IChunkData) => void;
  reset: () => void;
}

function resolveTheme(theme: "light" | "dark" | "system" | undefined): "light" | "dark" | undefined {
  if (!theme) return undefined;
  if (theme === "light") return "light";
  if (theme === "dark") return "dark";
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

const InnerChatMessage = memo(forwardRef<ChatMessageRef, ChatMessageProps>(function InnerChatMessage({
  message,
  isTyping,
  onResend,
  hide_assistant = false,
  rootClassName,
  actionClassName,
  actionIconSize,
  copyButtonId,
  formatUrl,
  theme,
  locale,
  query_intent: prop_query_intent,
  tools: prop_tools,
  fetch_source: prop_fetch_source,
  pick_source: prop_pick_source,
  deep_read: prop_deep_read,
  think: prop_think,
  response: prop_response,
  currentAssistant,
  assistantList,
}, ref) {
  const { t, i18n } = useTranslation();
  const resolvedTheme = resolveTheme(theme);

  const [assistant, setAssistant] = useState<any>({});
  
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

  useEffect(() => {
    if (prop_query_intent) handlers.deal_query_intent(prop_query_intent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_query_intent]);

  useEffect(() => {
    if (prop_tools) handlers.deal_tools(prop_tools);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_tools]);

  useEffect(() => {
    if (prop_fetch_source) handlers.deal_fetch_source(prop_fetch_source);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_fetch_source]);

  useEffect(() => {
    if (prop_pick_source) handlers.deal_pick_source(prop_pick_source);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_pick_source]);

  useEffect(() => {
    if (prop_deep_read) handlers.deal_deep_read(prop_deep_read);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_deep_read]);

  useEffect(() => {
    if (prop_think) handlers.deal_think(prop_think);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_think]);

  useEffect(() => {
    if (prop_response) handlers.deal_response(prop_response);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_response]);

  const [loadingStep, setLoadingStep] = useState<Record<string, boolean>>({
    query_intent: false,
    tools: false,
    fetch_source: false,
    pick_source: false,
    deep_read: false,
    think: false,
    response: false,
  });

  const inThinkRef = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    addChunk: (chunkData: IChunkData) => {
      setLoadingStep(() => ({
        query_intent: false,
        tools: false,
        fetch_source: false,
        pick_source: false,
        deep_read: false,
        think: false,
        response: false,
        [chunkData.chunk_type || '']: true,
      }));

      if (chunkData.chunk_type === "query_intent") {
        handlers.deal_query_intent(chunkData);
      } else if (chunkData.chunk_type === "tools") {
        handlers.deal_tools(chunkData);
      } else if (chunkData.chunk_type === "fetch_source") {
        handlers.deal_fetch_source(chunkData);
      } else if (chunkData.chunk_type === "pick_source") {
        handlers.deal_pick_source(chunkData);
      } else if (chunkData.chunk_type === "deep_read") {
        handlers.deal_deep_read(chunkData);
      } else if (chunkData.chunk_type === "think") {
        handlers.deal_think(chunkData);
      } else if (chunkData.chunk_type === "response") {
        const message_chunk = chunkData.message_chunk;
        if (typeof message_chunk === "string") {
          if (
            message_chunk.includes("\u003cthink\u003e") ||
            message_chunk.includes("<think>")
          ) {
            inThinkRef.current = true;
            return;
          } else if (
            message_chunk.includes("\u003c/think\u003e") ||
            message_chunk.includes("</think>")
          ) {
            inThinkRef.current = false;
            return;
          }

          if (inThinkRef.current) {
            handlers.deal_think({ ...chunkData, chunk_type: "think" });
          } else {
            handlers.deal_response(chunkData);
          }
        }
      }
    },
    reset: () => {
      clearAllChunkData();
      setLoadingStep({
        query_intent: false,
        tools: false,
        fetch_source: false,
        pick_source: false,
        deep_read: false,
        think: false,
        response: false,
      });
      inThinkRef.current = false;
    }
  }));

  const isAssistant = message?._source?.type === "assistant";
  const assistant_id = message?._source?.assistant_id;
  const assistant_item = message?._source?.assistant_item;

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  useEffect(() => {
    if (assistant_item) {
      setAssistant(assistant_item);
      return;
    }

    if (isAssistant && assistant_id && Array.isArray(assistantList)) {
      setAssistant(
        assistantList.find((item) => item._id === assistant_id) ?? {}
      );
      return;
    }

    setAssistant(currentAssistant);
  }, [
    isAssistant,
    assistant_item,
    assistant_id,
    assistantList,
    currentAssistant,
  ]);

  const messageContent = message?._source?.message || "";
  const attachments = message?._source?.attachments ?? [];
  const details = message?._source?.details || [];
  const question = message?._source?.question || "";

  const showActions =
    isTyping === false && (messageContent || response?.message_chunk);

  const [suggestion, setSuggestion] = useState<string[]>([]);

  const getSuggestion = (suggestion: string[]) => {
    setSuggestion(suggestion);
  };

  const renderContent = () => {
    if (!isAssistant) {
      return <UserMessage message={messageContent} attachments={attachments} />;
    }

    return (
      <>
        <QueryIntent
          Detail={details.find((item) => item.type === "query_intent")}
          ChunkData={query_intent}
          getSuggestion={getSuggestion}
          loading={loadingStep?.query_intent}
        />

        <CallTools
          Detail={details.find((item) => item.type === "tools")}
          ChunkData={tools}
          loading={loadingStep?.tools}
        />

        <FetchSource
          Detail={details.find((item) => item.type === "fetch_source")}
          ChunkData={fetch_source}
          loading={loadingStep?.fetch_source}
          formatUrl={formatUrl}
        />
        <PickSource
          Detail={details.find((item) => item.type === "pick_source")}
          ChunkData={pick_source}
          loading={loadingStep?.pick_source}
        />
        <DeepRead
          Detail={details.find((item) => item.type === "deep_read")}
          ChunkData={deep_read}
          loading={loadingStep?.deep_read}
        />
        <Think
          Detail={details.find((item) => item.type === "think")}
          ChunkData={think}
          loading={loadingStep?.think}
        />
        <XMarkdown content={messageContent || response?.message_chunk || ""} />
        {isTyping && (
          <div className="inline-block w-1.5 h-5 ml-0.5 -mb-0.5 bg-[#666666] dark:bg-[#A3A3A3] rounded-sm animate-typing" />
        )}
        {showActions && (
          <MessageActions
            id={message._id ?? ""}
            content={messageContent || response?.message_chunk || ""}
            question={question}
            actionClassName={actionClassName}
            actionIconSize={actionIconSize}
            copyButtonId={copyButtonId}
            onResend={() => {
              if (onResend) {
                onResend(question);
              }
            }}
          />
        )}
        {!isTyping && (
          <SuggestionList
            suggestions={suggestion}
            onSelect={(text) => onResend && onResend(text)}
          />
        )}
      </>
    );
  };

  return (
    <div
      className={clsx(
        "w-full py-8 flex",
        [isAssistant ? "justify-start" : "justify-end"],
        resolvedTheme === "dark" && "dark",
        rootClassName
      )}
    >
      <div
        className={`w-full px-4 flex gap-4 ${
          isAssistant ? "w-full" : "flex-row-reverse"
        }`}
      >
        <div
          className={`w-full space-y-2 ${
            isAssistant ? "text-left" : "text-right"
          }`}
        >
          {!hide_assistant && (
            <div className="w-full flex items-center gap-1 font-semibold text-sm text-[#333] dark:text-white">
              {isAssistant ? (
                <div className="w-6 h-6 flex justify-center items-center rounded-full bg-white dark:bg-[#2A2A2A] border border-[#E6E6E6] dark:border-[#3A3A3A]">
                  {assistant?._source?.icon?.startsWith("font_") ? (
                    <FontIcon
                      name={assistant._source.icon}
                      className="w-4 h-4"
                    />
                  ) : (
                    <img
                      src={logoImg}
                      className="w-4 h-4"
                      alt={t("assistant.message.logo")}
                    />
                  )}
                </div>
              ) : null}
              {isAssistant ? assistant?._source?.name || "Coco AI" : ""}
            </div>
          )}
          <div className="w-full prose dark:prose-invert prose-sm max-w-none">
            <div className="w-full pl-7 text-[#333] dark:text-white leading-relaxed">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}));

export const ChatMessage = memo(forwardRef<ChatMessageRef, ChatMessageProps>((props, ref) => {
  return (
    <I18nextProvider i18n={i18nInstance}>
      <InnerChatMessage {...props} ref={ref} />
    </I18nextProvider>
  );
}));
