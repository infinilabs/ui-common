import { useCallback, useRef, useState } from "react";
import { useSize } from "ahooks";
import clsx from "clsx";
import AutoResizeTextarea from "./AutoResizeTextarea";
import ChatIcons, { type SendMessageParams } from "./ChatIcons";
import InputControls from "./InputControls";
import VisibleKey from "./VisibleKey";
import { useChatStore } from "@/stores/chatStore";

interface ChatInputProps {
  onSend: (params: SendMessageParams) => void;
  disabled: boolean;
  isChatMode: boolean;
  inputValue: string;
  changeInput: (val: string) => void;
  isDeepThinkActive: boolean;
  setIsDeepThinkActive: () => void;
  chatPlaceholder?: string;
  searchPlaceholder?: string;
  returnToInputShortcut?: string;
}

export default function ChatInput({
  onSend,
  disabled,
  isChatMode,
  inputValue,
  changeInput,
  isDeepThinkActive,
  setIsDeepThinkActive,
  chatPlaceholder,
  returnToInputShortcut = "i",
}: ChatInputProps) {
  const textareaRef = useRef<{ reset: () => void; focus: () => void }>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);
  
  const { curChatEnd } = useChatStore();
  const [lineCount, setLineCount] = useState(1);

  const handleToggleFocus = useCallback(() => {
    textareaRef.current?.focus();
  }, [textareaRef]);

  const handleSubmit = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !disabled) {
      changeInput("");
      onSend({ message: trimmedValue });
    }
  }, [inputValue, disabled, onSend, changeInput]);

  const handleInputChange = useCallback(
    (value: string) => {
      changeInput(value);
      if (!isChatMode) {
        onSend({ message: value });
      }
    },
    [changeInput, isChatMode, onSend]
  );
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
     if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSubmit();
     }
  };

  const renderTextarea = () => {
    return (
      <VisibleKey
        shortcut={returnToInputShortcut}
        rootClassName="flex-1 flex items-center justify-center w-full"
        shortcutClassName="!left-auto !right-2 !translate-x-0"
        onKeyPress={handleToggleFocus}
      >
        <AutoResizeTextarea
          ref={textareaRef}
          isChatMode={isChatMode}
          input={inputValue}
          setInput={handleInputChange}
          handleKeyDown={handleKeyDown}
          chatPlaceholder={chatPlaceholder}
          lineCount={lineCount}
          onLineCountChange={setLineCount}
          firstLineMaxWidth={containerSize?.width ?? 0}
          disabled={disabled}
        />
      </VisibleKey>
    );
  };

  const renderExtraIcon = () => (
      <div className="flex items-center gap-2 w-fit">
        {isChatMode && (
            <ChatIcons
            isChatMode={isChatMode}
            curChatEnd={curChatEnd}
            inputValue={inputValue}
            onSend={onSend}
            />
        )}
      </div>
  );

  return (
    <div className={`w-full relative rounded-xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden bg-white dark:bg-transparent`}>
      <div
        ref={containerRef}
        className={`flex items-center dark:text-[#D8D8D8] transition-all relative bg-[#F9F9F9] dark:bg-[#202126]`}
      >
          <div
            className={clsx(
              "min-h-[52px] w-full p-3 bg-transparent",
              {
                "flex items-center gap-2": lineCount === 1,
              }
            )}
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

      <div className="px-3 pb-3">
        <InputControls
          isChatMode={isChatMode}
          isDeepThinkActive={isDeepThinkActive}
          setIsDeepThinkActive={setIsDeepThinkActive}
        />
      </div>
    </div>
  );
}
