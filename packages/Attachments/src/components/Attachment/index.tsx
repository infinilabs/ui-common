import { useEffect, useState, type FC } from "react";
import type { AttachmentsProps } from "../Attachments";
import AttachmentIcon from "../AttachmentIcon";
import clsx from "clsx";

export interface AttachmentProps extends Pick<AttachmentsProps, "i18n"> {
  id: string;
  name?: string;
  extname?: string;
  attachmentId?: string;
  size?: string;
}

const Attachment: FC<AttachmentProps> = (props) => {
  const { name, extname, size, attachmentId, i18n } = props;

  const [uploading, setUploading] = useState(!attachmentId);
  const [analyzing, setAnalyzing] = useState(false);
  const [failed, setFailed] = useState(true);

  useEffect(() => {
    if (!uploading) return;

    const randomDelay = () => 1000 + Math.floor(Math.random() * 2000);

    setTimeout(() => {
      setUploading(false);
      setAnalyzing(true);

      setTimeout(() => {
        setAnalyzing(false);
        setFailed(Math.random() > 0.7);
      }, randomDelay());
    }, randomDelay());
  }, [uploading]);

  const renderStatus = () => {
    if (uploading) {
      return i18n?.labels?.uploading || "Uploading...";
    }

    if (analyzing) {
      return i18n?.labels?.analyzing || "Analyzing...";
    }

    if (failed) {
      return i18n?.labels?.failed || "Upload failed";
    }

    return (
      <>
        <span>{extname}</span>

        <span className="pl-2">{size}</span>
      </>
    );
  };

  return (
    <div className="w-1/3 p-1.5 box-border">
      <div className="flex items-center gap-2 p-3 bg-black/4 dark:bg-white/8 rounded-xl">
        <AttachmentIcon className="min-w-10 size-10" extname={extname} />

        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="text-sm truncate">{name}</span>
          <span
            className={clsx("text-xs", [
              failed ? "text-[#ff4d4f]" : "text-[#999]",
            ])}
          >
            {renderStatus()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Attachment;
