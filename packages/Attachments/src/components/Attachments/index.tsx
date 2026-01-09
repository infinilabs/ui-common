import { Helmet } from "react-helmet";
import Attachment, { type AttachmentProps } from "../Attachment";
import type { FC, HTMLAttributes } from "react";
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

const Attachments: FC<AttachmentsProps> = (props) => {
  const { data, i18n, className, onItemPress, onItemRemove, ...rest } = props;
  return (
    <>
      <Helmet>
        <script src="https://at.alicdn.com/t/c/font_4934333_0u00aavw7iob.js"></script>
      </Helmet>

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
