import { ButtonProps } from 'antd';
import { FC } from 'react';
import { HTMLAttributes } from 'react';
import { ReactNode } from 'react';

export declare const ActionButton: FC<ActionButtonProps>;

declare type ActionButtonProps = ButtonProps;

export declare const DocDetail: FC<DocDetailProps>;

declare interface DocDetailProps extends HTMLAttributes<HTMLDivElement> {
    data: {
        id?: string;
        created?: ReactNode;
        updated?: ReactNode;
        _system?: {
            owner_id?: string;
            parent_path?: string;
            tenant_id?: string;
        };
        metadata?: {
            ai_insights?: string;
            colors?: string[];
            content_type?: MetadataContentType;
            height?: number;
            mime_type?: string;
            users?: null | unknown;
            width?: number;
        };
        source?: {
            type?: string;
            name?: string;
            id?: string;
        };
        type?: string;
        category?: string;
        title?: string;
        summary?: string;
        icon?: string;
        thumbnail?: string;
        cover?: string;
        tags?: string[];
        url?: string;
        size?: ReactNode;
        owner: {
            type?: string;
            id?: string;
            icon?: string;
            title?: string;
            subtitle?: string;
            cover?: string;
        };
    };
    i18n?: {
        buttons?: {
            openSource?: string;
        };
        labels?: {
            preview?: string;
            aiInterpretation?: string;
            createdBy?: string;
            updatedAt?: string;
            updatedBy?: string;
            type?: string;
            size?: string;
        };
    };
    extraButtons?: ReactNode[];
    openSourceButtonProps?: ActionButtonProps;
}

declare type MetadataContentType = "image" | "video" | "markdown" | "pdf" | "docx" | "pptx" | "xlsx";

export { }
