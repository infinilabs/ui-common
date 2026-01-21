import { useCallback, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSize } from "ahooks";
import clsx from "clsx";

import { resources } from "../i18n";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import AutoResizeTextarea from "./AutoResizeTextarea";
import ChatIcons, { type SendMessageParams } from "./ChatIcons";
import InputControls from "./InputControls";
import { useChatStore } from "../stores/chatStore";

interface ChatInputProps {
  onSend: (params: SendMessageParams) => void;
  disabled: boolean;
  inputValue: string;
  changeInput: (val: string) => void;
  chatPlaceholder?: string;
}

export default function ChatInput({
  onSend,
  disabled = false,
  inputValue,
  changeInput,
  chatPlaceholder,
}: ChatInputProps) {
  const { i18n } = useTranslation("ai_chat");

  const curChatEnd = useChatStore((state) => state.curChatEnd);
  const currentAssistant = useChatStore((state) => state.currentAssistant);

  // TODO: Check if the assistant supports deep thinking and deep research
  // Currently defaulting to true as per requirements
  const isDeepThinkActive = !!(currentAssistant?._source?.deep_think_enabled ?? true);
  const deepResearchActive = !!(currentAssistant?._source?.deep_research_enabled ?? true);

  useEffect(() => {
    (Object.keys(resources) as Array<keyof typeof resources>).forEach((lng) => {
      if (resources[lng]?.translation) {
        i18n.addResourceBundle(
          lng as string,
          "ai_chat",
          resources[lng].translation,
          true,
          true
        );
      }
    });
  }, [i18n]);

const textareaRef = useRef<{ reset: () => void; focus: () => void }>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);

  const [lineCount, setLineCount] = useState(1);
  const committedRef = useRef("");
  const {
    supported: speechSupported,
    listening,
    start,
    stop,
  } = useSpeechRecognition({
    lang: i18n.language || "zh-CN",
    autoRestart: true,
    onInterim: (interim) => {
      const composed =
        committedRef.current +
        (interim ? (committedRef.current ? " " : "") + interim : "");
      changeInput(composed);
    },
    onFinal: (finalText) => {
      if (finalText) {
        committedRef.current =
          (committedRef.current ? committedRef.current + " " : "") + finalText;
        changeInput(committedRef.current);
      }
    },
  });

  const handleVoiceToggle = () => {
    if (listening) {
      stop();
      changeInput(committedRef.current);
    } else {
      committedRef.current = inputValue;
      start();
    }
  };

  const handleSubmit = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      changeInput("");
      onSend({
        message: trimmedValue,
        deep_thinking: isDeepThinkActive,
        search: deepResearchActive,
      });
    }
  }, [inputValue, onSend, changeInput, isDeepThinkActive, deepResearchActive]);

  const handleInputChange = useCallback(
    (value: string) => {
      changeInput(value);
      if (listening) {
        committedRef.current = value;
      }
    },
    [changeInput, listening]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderTextarea = () => {
    return (
      <AutoResizeTextarea
        ref={textareaRef}
        input={inputValue}
        setInput={handleInputChange}
        handleKeyDown={handleKeyDown}
        chatPlaceholder={chatPlaceholder}
        lineCount={lineCount}
        onLineCountChange={setLineCount}
        firstLineMaxWidth={containerSize?.width ?? 0}
        disabled={disabled}
      />
    );
  };

  const handleIconSend = (params: SendMessageParams) => {
    if (params.message) {
      changeInput("");
      onSend({
        ...params,
        deep_thinking: isDeepThinkActive,
        search: deepResearchActive,
      });
    }
  };

  const renderExtraIcon = () => (
    <div className="flex items-center gap-2 w-fit">
      <ChatIcons
        curChatEnd={curChatEnd}
        inputValue={inputValue}
        onSend={handleIconSend}
        speechSupported={speechSupported}
        listening={listening}
        onVoiceToggle={handleVoiceToggle}
      />
    </div>
  );

  return (
    <div
      className={`w-full p-1 relative rounded-xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden bg-white dark:bg-transparent`}
    >
      <div
        ref={containerRef}
        className={`rounded-sm flex items-center dark:text-[#D8D8D8] transition-all relative bg-[#F3F4F6] dark:bg-[#202126]`}
      >
        <div
          className={clsx("min-h-[48px] w-full p-2 bg-transparent", {
            "flex items-center gap-2": lineCount === 1,
          })}
        >
          {renderTextarea()}

          {lineCount === 1 && renderExtraIcon()}

          {lineCount > 1 && (
            <div className="flex items-center mt-2">
              <div className="flex-1"></div>
              <div className="self-end">{renderExtraIcon()}</div>
            </div>
          )}
        </div>
      </div>

      <div className="pb-3">
        <InputControls
          isDeepThinkActive={isDeepThinkActive}
          isDeepResearchActive={deepResearchActive}
        />
      </div>
    </div>
  );
}
