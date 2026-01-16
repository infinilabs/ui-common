import React from "react";
import { Send, Square, Paperclip, Mic } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import VisibleKey from "./VisibleKey";

export interface SendMessageParams {
  message?: string;
  attachments?: string[];
}

interface ChatIconsProps {
  isChatMode: boolean;
  curChatEnd: boolean;
  inputValue: string;
  onSend: (params: SendMessageParams) => void;
  disabledChange?: () => void;
}

const ChatIcons: React.FC<ChatIconsProps> = ({
  isChatMode,
  curChatEnd,
  inputValue,
  onSend,
  disabledChange,
}) => {
  const { t } = useTranslation();

  const renderSendButton = () => {
    if (!isChatMode) return null;

    if (curChatEnd) {
      return (
        <div className="flex items-center gap-3">
          <button
            className="text-[#999] hover:text-[#666] dark:text-[#666] dark:hover:text-[#999] transition-colors"
            title={t("search.input.attachment") || "Attachment"}
          >
            <Paperclip size={20} />
          </button>
          <button
            className="text-[#999] hover:text-[#666] dark:text-[#666] dark:hover:text-[#999] transition-colors"
            title={t("search.input.voice") || "Voice"}
          >
            <Mic size={20} />
          </button>
          <button
            className={clsx(
              "flex items-center justify-center rounded-full transition-colors w-8 h-8 bg-[#E4E5F0] dark:bg-[rgb(84,84,84)]",
              {
                "!bg-[#0072FF]": inputValue,
              }
            )}
            type="submit"
            onClick={() => {
              onSend({
                message: inputValue.trim(),
              });
            }}
            title={t("search.input.send") || "Send"}
          >
            <VisibleKey shortcut="enter">
              <Send className="w-4 h-4 text-white ml-0.5" />
            </VisibleKey>
          </button>
        </div>
      );
    }

    return (
      <button
        className={`ml-1 px-1 bg-[#0072FF] rounded-full transition-colors`}
        type="submit"
        onClick={() => disabledChange?.()}
        title={t("search.input.stop") || "Stop"}
      >
        <Square
          size={16}
          className="w-4 h-4 text-white fill-white"
          aria-label="Stop message"
        />
      </button>
    );
  };

  return <>{renderSendButton()}</>;
};

export default ChatIcons;
