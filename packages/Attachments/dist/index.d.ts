import { FC } from 'react';
import { HTMLAttributes } from 'react';

export declare const Attachment: FC<AttachmentProps>;

export declare const AttachmentIcon: FC<AttachmentIconProps>;

declare interface AttachmentIconProps extends HTMLAttributes<SVGElement> {
    extname?: string;
}

declare interface AttachmentProps extends Pick<AttachmentsProps, "i18n" | "onItemPress" | "onItemRemove"> {
    id: string;
    status?: AttachmentStatus;
    filename?: string;
    extname?: string;
    size?: string;
    failedMessage?: string;
}

export declare const Attachments: FC<AttachmentsProps>;

declare interface AttachmentsProps extends HTMLAttributes<HTMLDivElement> {
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

declare type AttachmentStatus = "uploading" | "analyzing" | "failed" | "uploaded";

export { }
