import { FC } from 'react';
import { HTMLAttributes } from 'react';

export declare const Attachment: FC<AttachmentProps>;

export declare const AttachmentIcon: FC<AttachmentIconProps>;

declare interface AttachmentIconProps extends HTMLAttributes<SVGElement> {
    extname?: string;
}

declare interface AttachmentProps extends Pick<AttachmentsProps, "i18n"> {
    id: string;
    name?: string;
    extname?: string;
    attachmentId?: string;
    size?: string;
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
}

export { }
