import { useState } from "react";
import type { FC } from "react";
import clsx from "clsx";

import { CopyButton } from "@/components/Common/CopyButton";
import { useAsyncEffect } from "ahooks";
import platformAdapter from "@/utils/platformAdapter";
import { useConnectStore } from "@/stores/connectStore";
import { Attachments } from "@infinilabs/attachments";
import { useAppStore } from "@/stores/appStore";

interface UserMessageProps {
  message: string;
  attachments: string[];
}

export const UserMessage: FC<UserMessageProps> = (props) => {
  const { message, attachments } = props;

  const [showCopyButton, setShowCopyButton] = useState(false);
  const { currentService } = useConnectStore();
  const [attachmentData, setAttachmentData] = useState<any[]>([]);
  const { addError } = useAppStore();

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const selection = window.getSelection();
      const range = document.createRange();

      if (e.currentTarget && selection && range) {
        try {
          range.selectNodeContents(e.currentTarget);
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (error) {
          console.error("Selection failed:", error);
        }
      }
    }
  };

  useAsyncEffect(async () => {
    try {
      if (attachments.length === 0) return;

      const result: any = await platformAdapter.commands(
        "get_attachment_by_ids",
        {
          serverId: currentService.id,
          attachments,
        }
      );

      setAttachmentData(result?.hits?.hits);
    } catch (error) {
      addError(String(error));
    }
  }, [attachments]);

  return (
    <>
      {message && (
        <div
          className="flex gap-1 items-center justify-end"
          onMouseEnter={() => setShowCopyButton(true)}
          onMouseLeave={() => setShowCopyButton(false)}
        >
          <div
            className={clsx("size-6 transition", {
              "opacity-0": !showCopyButton,
            })}
          >
            <CopyButton textToCopy={message} />
          </div>
          <div
            className="max-w-[85%] overflow-auto text-left px-3 py-2 bg-white dark:bg-[#202126] rounded-xl border border-black/12 dark:border-black/15 font-normal text-sm text-[#333333] dark:text-[#D8D8D8] cursor-pointer user-select-text whitespace-pre-wrap"
            onDoubleClick={handleDoubleClick}
          >
            {message}
          </div>
        </div>
      )}

      {attachmentData && attachmentData.length > 0 && (
        <div
          className={clsx("w-full", {
            "mt-3": message,
          })}
        >
          <Attachments
            data={attachmentData.map((item) => ({
              id: item._source.id,
              filename: item._source.name,
              extname: item._source.icon,
              size: item._source.size,
              status: "uploaded",
            }))}
            className="text-left"
          />
        </div>
      )}
    </>
  );
};
