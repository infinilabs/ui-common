import Attachment, { type AttachmentProps } from "../Attachment";
import { useEffect, type FC, type HTMLAttributes } from "react";
import clsx from "clsx";

export interface AttachmentsProps extends HTMLAttributes<HTMLDivElement> {
  data: AttachmentProps[];
  i18n?: {
    labels?: {
      uploading?: string;
      analyzing?: string;
      failed?: string;
    };
  };
  onItemPress?: (item: AttachmentProps) => void;
  onItemRemove?: (item: AttachmentProps) => void;
}

const ICONFONT_SCRIPT_SRC =
  "https://at.alicdn.com/t/c/font_4934333_0u00aavw7iob.js";

const Attachments: FC<AttachmentsProps> = (props) => {
  const { data, i18n, className, onItemPress, onItemRemove, ...rest } = props;

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector(`script[src="${ICONFONT_SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = ICONFONT_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <div className={clsx("flex flex-wrap -m-1.5", className)} {...rest}>
        {data.map((item) => (
          <Attachment
            key={item.id}
            {...item}
            i18n={i18n}
            onItemPress={onItemPress}
            onItemRemove={onItemRemove}
          />
        ))}
      </div>
    </>
  );
};

export default Attachments;
