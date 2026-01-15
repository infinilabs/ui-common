import { useState } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { Attachments } from "@infinilabs/attachments";

import { CopyButton } from "@/components/Common/CopyButton";
import { useAsyncEffect } from "ahooks";

interface UserMessageProps {
  message: string;
  attachments: string[];
}

export const UserMessage: FC<UserMessageProps> = (props) => {
  const { message, attachments } = props;

  const [showCopyButton, setShowCopyButton] = useState(false);
  const [attachmentData, setAttachmentData] = useState<any[]>([]);

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

      // todo: 调用平台接口获取附件详情
      const result: any = {};

      setAttachmentData(result?.hits?.hits);
    } catch (error) {
      console.error("Get attachment failed:", String(error));
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
            className="max-w-[85%] overflow-auto text-left px-3 py-2 bg-white dark:bg-[#202126]! rounded-xl border border-black/12 dark:border-black/15 font-normal text-sm text-[#333333] dark:text-white cursor-pointer user-select-text whitespace-pre-wrap"
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
