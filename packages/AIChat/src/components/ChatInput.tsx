import { useCallback, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resources } from "../i18n";
import { useSize } from "ahooks";
import clsx from "clsx";

import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import AutoResizeTextarea from "./AutoResizeTextarea";
import ChatIcons, { type SendMessageParams } from "./ChatIcons";
import InputControls from "./InputControls";
import { useChatStore } from "@/stores/chatStore";

interface ChatInputProps {
  onSend: (params: SendMessageParams) => void;
  disabled: boolean;
  inputValue: string;
  changeInput: (val: string) => void;
  isDeepThinkActive: boolean;
  setIsDeepThinkActive: (val: boolean) => void;
  isDeepResearchActive?: boolean;
  setIsDeepResearchActive?: (val: boolean) => void;
  chatPlaceholder?: string;
  searchPlaceholder?: string;
  returnToInputShortcut?: string;
}

export default function ChatInput({
  onSend,
  disabled,
  inputValue,
  changeInput,
  isDeepThinkActive,
  setIsDeepThinkActive,
  isDeepResearchActive,
  setIsDeepResearchActive,
  chatPlaceholder,
}: ChatInputProps) {
  const { i18n } = useTranslation("ai_chat");

  const [internalDeepResearchActive, setInternalDeepResearchActive] = useState(
    isDeepResearchActive || false
  );

  const deepResearchActive =
    typeof setIsDeepResearchActive === "function"
      ? (isDeepResearchActive ?? false)
      : internalDeepResearchActive;

  const handleDeepResearchChange = (val: boolean) => {
    if (typeof setIsDeepResearchActive === "function") {
      setIsDeepResearchActive(val);
    } else {
      setInternalDeepResearchActive(val);
    }
  };

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

  const { curChatEnd } = useChatStore();
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
      onSend({ message: trimmedValue });
    }
  }, [inputValue, onSend, changeInput]);

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
      onSend(params);
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
          setIsDeepThinkActive={setIsDeepThinkActive}
          isDeepResearchActive={deepResearchActive}
          setIsDeepResearchActive={handleDeepResearchChange}
        />
      </div>
    </div>
  );
}
