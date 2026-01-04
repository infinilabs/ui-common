import { FC } from 'react';

export declare const DocDetail: FC<DocDetailProps>;

declare interface DocDetailProps {
    data: {
        source: {
            type: string;
            name: string;
            id: string;
        };
        category: string;
        categories: string[];
        cover: string;
        title: string;
        summary: string;
        type: string;
        lang: string;
        content: string;
        icon: string;
        thumbnail: string;
        tags: string[];
        url: string;
        size: number;
        owner: {
            avatar: string;
            username: string;
            userid: string;
        };
        metadata: {
            version: string;
            department: string;
            last_reviewed: string;
            file_extension: string;
            icon_link: string;
            has_thumbnail: boolean;
            kind: string;
            parents: string[];
            properties: Record<string, string>;
            spaces: string[];
            starred: boolean;
            driveId: string;
            thumbnail_link: string;
            video_media_metadata?: {
                durationMillis: string;
                width: number;
                height: number;
            };
            image_media_metadata?: {
                width: number;
                height: number;
            };
        };
        last_updated_by: {
            user: {
                avatar: string;
                username: string;
                userid: string;
            };
            timestamp: string;
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
}

export { }
