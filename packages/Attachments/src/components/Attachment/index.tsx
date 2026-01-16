import { useMemo, type FC, type HTMLAttributes, type ReactNode } from "react";
import type { AttachmentsProps } from "../Attachments";
import AttachmentIcon from "../AttachmentIcon";
import { Tooltip, Typography } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import clsx from "clsx";

const { Text } = Typography;

export type AttachmentStatus =
  | "uploading"
  | "analyzing"
  | "failed"
  | "uploaded";

export interface AttachmentProps
  extends Pick<AttachmentsProps, "i18n" | "onItemPress" | "onItemRemove">,
    HTMLAttributes<HTMLDivElement> {
  id: string;
  status?: AttachmentStatus;
  filename?: string;
  extname?: string;
  size?: string;
  failedMessage?: string;
  extra?: ReactNode;
}

const Attachment: FC<AttachmentProps> = (props) => {
  const {
    status = "uploaded",
    filename,
    extname,
    size,
    i18n,
    failedMessage,
    className,
    extra,
    onClick,
    onItemPress,
    onItemRemove,
    ...rest
  } = props;

  const removable = useMemo(() => {
    return (status === "uploaded" || status === "failed") && onItemRemove;
  }, [status, onItemRemove]);

  const renderStatus = () => {
    if (status === "uploading") {
      return i18n?.labels?.uploading || "Uploading...";
    }

    if (status === "analyzing") {
      return i18n?.labels?.analyzing || "Analyzing...";
    }

    if (status === "failed") {
      return (
        <Tooltip title={failedMessage}>
          <Text type="danger" className="text-xs">
            {i18n?.labels?.failed || "Upload failed"}
          </Text>
        </Tooltip>
      );
    }

    return (
      <>
        <span>{extname}</span>

        <span className="pl-2">{size}</span>
      </>
    );
  };

  return (
    <div
      className={clsx("group relative w-1/3 p-1.5 box-border", className)}
      onClick={(event) => {
        onItemPress?.(props);

        onClick?.(event);
      }}
      {...rest}
    >
      {removable && (
        <Text
          type="danger"
          className="absolute top-2.5 right-2.5 inline-flex items-center cursor-pointer opacity-0 transition group-hover:opacity-100"
          onClick={() => {
            onItemRemove?.(props);
          }}
        >
          <CloseCircleFilled />
        </Text>
      )}

      <div className="flex items-center justify-between gap-4 p-3 bg-black/4 dark:bg-white/8 rounded-xl">
        <div className="flex-1 flex items-center gap-2 overflow-hidden">
          <AttachmentIcon className="min-w-10 size-10" extname={extname} />

          <div className="flex flex-col gap-1 overflow-hidden">
            <span className="text-sm truncate">{filename}</span>

            <Text type="secondary" className="text-xs">
              {renderStatus()}
            </Text>
          </div>
        </div>

        {extra}
      </div>
    </div>
  );
};

export default Attachment;
