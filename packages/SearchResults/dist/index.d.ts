import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare function itemsToSections(items: SearchResultsItem[], imageGridColumns?: 2 | 3 | 4): SearchResultsSection[];

export declare function recordsToItems(records: SearchResultsRecord[]): SearchResultsItem[];

declare type SearchResultCommon = {
    id: string;
    title: string;
    href?: string;
    target?: string;
    rel?: string;
};

export declare type SearchResultFileType = "pdf" | "doc" | "ppt" | "xls" | "link" | "word" | "text" | "unknown";

export declare type SearchResultImageGroupItem = {
    type: "imageGroup";
    id: string;
    title?: string;
    items: Array<SearchResultImageItem | SearchResultMediaItem>;
    columns?: 2 | 3 | 4;
    footerAction?: SearchResultsAction;
    className?: string;
};

export declare type SearchResultImageItem = SearchResultCommon & {
    type: "image";
    imageUrl: string;
    imageAlt?: string;
    subtitle?: string;
    breadcrumbs?: string[];
    onClick?: () => void;
};

export declare type SearchResultListItem = SearchResultCommon & {
    type: "result";
    description?: string;
    meta?: string[];
    breadcrumbs?: string[];
    author?: string;
    date?: string;
    thumbnailUrl?: string;
    thumbnailAlt?: string;
    fileType?: SearchResultFileType;
    typeIcon?: default_2.ReactNode;
    source?: string;
    leading?: default_2.ReactNode;
    trailing?: default_2.ReactNode;
    onClick?: () => void;
};

export declare type SearchResultMediaItem = SearchResultCommon & {
    type: "media";
    mediaType: "image" | "video";
    thumbnailUrl: string;
    thumbnailAlt?: string;
    matchCountText?: string;
    sourceLabel?: string;
    categoryLabel?: string;
    breadcrumbs?: string[];
    onClick?: () => void;
};

declare function SearchResults({ section, className, theme, footerAction, onRecordClick, onItemClick }: SearchResultsProps): JSX_2.Element;
export default SearchResults;

export declare type SearchResultsAction = {
    label: string;
    href?: string;
    target?: string;
    rel?: string;
    onClick?: () => void;
};

export declare function SearchResultsImageGroup(props: SearchResultsImageGroupProps): JSX_2.Element;

export declare type SearchResultsImageGroupProps = Omit<SearchResultsProps, "section"> & {
    section: SearchResultImageGroupItem | SearchResultsRecord[] | SearchResultsSection;
};

export declare type SearchResultsItem = SearchResultListItem | SearchResultImageItem | SearchResultMediaItem | SearchResultImageGroupItem | SearchResultVideoGroupItem;

export declare type SearchResultsProps = {
    section: SearchResultsSection | SearchResultsItem | SearchResultsRecord | Array<SearchResultsItem | SearchResultsRecord>;
    className?: string;
    theme?: SearchResultsTheme;
    footerAction?: SearchResultsAction;
    onRecordClick?: (record: SearchResultsRecord, index: number) => void;
    onItemClick?: (item: SearchResultsItem) => void;
};

export declare type SearchResultsRecord = {
    source?: {
        type?: string;
        name?: string;
        id?: string;
    };
    category?: string;
    categories?: string[];
    cover?: string;
    title: string;
    summary?: string;
    type?: string;
    lang?: string;
    content?: string;
    icon?: string;
    thumbnail?: string;
    tags?: string[];
    url?: string;
    size?: number;
    owner?: {
        avatar?: string;
        username?: string;
        userid?: string;
    };
    metadata?: {
        last_reviewed?: string;
        file_extension?: string;
        icon_link?: string;
        has_thumbnail?: boolean;
        thumbnail_link?: string;
        image_media_metadata?: {
            width?: number;
            height?: number;
        };
        video_media_metadata?: {
            durationMillis?: string;
            width?: number;
            height?: number;
        };
    } & Record<string, unknown>;
    last_updated_by?: {
        user?: {
            avatar?: string;
            username?: string;
            userid?: string;
        };
        timestamp?: string;
    };
} & Record<string, unknown>;

export declare type SearchResultsSection = {
    type: "section";
    title?: string;
    titleIcon?: default_2.ReactNode;
    titleIconBgColor?: string;
    titleClassName?: string;
    layout: "list";
    items: SearchResultListItem[];
    footerAction?: SearchResultsAction;
    className?: string;
} | {
    type: "section";
    title?: string;
    titleIcon?: default_2.ReactNode;
    titleIconBgColor?: string;
    titleClassName?: string;
    layout: "imageGrid";
    items: SearchResultImageItem[];
    columns?: 2 | 3 | 4;
    footerAction?: SearchResultsAction;
    className?: string;
} | {
    type: "section";
    title?: string;
    titleIcon?: default_2.ReactNode;
    titleIconBgColor?: string;
    titleClassName?: string;
    layout: "mediaGrid";
    items: SearchResultMediaItem[];
    columns?: 2 | 3 | 4;
    footerAction?: SearchResultsAction;
    className?: string;
};

export declare type SearchResultsTheme = "light" | "dark" | "auto";

export declare function SearchResultsVideoGroup(props: SearchResultsVideoGroupProps): JSX_2.Element;

export declare type SearchResultsVideoGroupProps = Omit<SearchResultsProps, "section"> & {
    section: SearchResultVideoGroupItem | SearchResultsRecord[] | SearchResultsSection;
};

export declare type SearchResultVideoGroupItem = {
    type: "videoGroup";
    id: string;
    title?: string;
    items: SearchResultMediaItem[];
    columns?: 2 | 3 | 4;
    footerAction?: SearchResultsAction;
    className?: string;
};

export { }
