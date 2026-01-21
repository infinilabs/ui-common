import React from "react";
import {
  Send,
  Square,
  Paperclip,
  //Mic
} from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useChatStore } from "../stores/chatStore";

export interface SendMessageParams {
  message?: string;
  attachments?: string[];
  search?: boolean;
  deep_thinking?: boolean;
}

interface ChatIconsProps {
  curChatEnd: boolean;
  inputValue: string;
  onSend: (params: SendMessageParams) => void;
  disabledChange?: () => void;
  speechSupported?: boolean;
  listening?: boolean;
  onVoiceToggle?: () => void;
}

const ChatIcons: React.FC<ChatIconsProps> = ({
  curChatEnd,
  inputValue = "",
  onSend,
  disabledChange,
  // speechSupported = false,
  // listening = false,
  // onVoiceToggle,
}) => {
  const { t } = useTranslation("ai_chat");
  const setCurChatEnd = useChatStore((state) => state.setCurChatEnd);

  const renderSendButton = () => {
    if (curChatEnd) {
      return (
        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center rounded-full shrink-0 text-[#999] hover:text-[#666] dark:text-[#666] dark:hover:text-[#999] transition-colors"
            style={{ width: "32px", height: "32px" }}
            title={t("search.input.attachment") || "Attachment"}
          >
            <Paperclip size={20} />
          </button>
          {/* {speechSupported && (
            <button
              className={clsx(
                "flex items-center justify-center rounded-full shrink-0 transition-colors",
                {
                  "text-[#027FFE] bg-[#027FFE]/10": listening,
                  "text-[#999] hover:text-[#666] dark:text-[#666] dark:hover:text-[#999]":
                    !listening,
                }
              )}
              style={{ width: "32px", height: "32px" }}
              title={
                listening
                  ? t("search.input.stop_voice") || "Stop Voice"
                  : t("search.input.voice") || "Voice"
              }
              onClick={onVoiceToggle}
            >
              <Mic size={20} className={clsx({ "animate-pulse": listening })} />
            </button>
          )} */}
          <button
            className={clsx(
              "flex items-center justify-center rounded-full transition-colors p-0 shrink-0 aspect-square cursor-pointer",
              {
                "bg-[#027FFE] text-white": inputValue,
                "text-[#999] hover:text-[#666] dark:text-[#666] dark:hover:text-[#999]":
                  !inputValue,
              }
            )}
            style={{ width: "32px", height: "32px" }}
            type="submit"
            onClick={() => {
              onSend({
                message: inputValue?.trim() || "",
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSend({
                  message: inputValue?.trim() || "",
                });
              }
            }}
            disabled={!inputValue?.trim()}
            title={`${t("search.input.send") || "Send"} (Enter)`}
          >
            <Send size={20} />
          </button>
        </div>
      );
    }

    return (
      <button
        className={`ml-1 p-2 bg-[#0072FF] rounded-full transition-colors`}
        type="submit"
        onClick={() => {
          disabledChange?.();
          setCurChatEnd(true);
        }}
        title={t("search.input.stop") || "Stop"}
      >
        <Square
          size={12}
          strokeWidth={2}
          className="w-3 h-3 text-white fill-white"
          aria-label={t("search.input.stop") || "Stop"}
        />
      </button>
    );
  };

  return <>{renderSendButton()}</>;
};

export default ChatIcons;
