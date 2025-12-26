import type React from "react";

export type SearchResultFileType =
  | "pdf"
  | "doc"
  | "ppt"
  | "xls"
  | "word"
  | "text"
  | "unknown";

export type SearchResultsAction = {
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export type SearchResultCommon = {
  id: string;
  title: string;
  href?: string;
  target?: string;
  rel?: string;
};

export type SearchResultListItem = SearchResultCommon & {
  type: "result";
  description?: string;
  meta?: string[];
  breadcrumbs?: string[];
  author?: string;
  date?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  fileType?: SearchResultFileType;
  typeIcon?: React.ReactNode;
  source?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
};

export type SearchResultImageItem = SearchResultCommon & {
  type: "image";
  imageUrl: string;
  imageAlt?: string;
  subtitle?: string;
  onClick?: () => void;
};

export type SearchResultMediaItem = SearchResultCommon & {
  type: "media";
  mediaType: "image" | "video";
  thumbnailUrl: string;
  thumbnailAlt?: string;
  matchCountText?: string;
  sourceLabel?: string;
  categoryLabel?: string;
  onClick?: () => void;
};

export type SearchResultImageGroupItem = {
  type: "imageGroup";
  id: string;
  title?: string;
  items: Array<SearchResultImageItem | SearchResultMediaItem>;
  columns?: 2 | 3 | 4;
  footerAction?: SearchResultsAction;
  className?: string;
};

export type SearchResultVideoGroupItem = {
  type: "videoGroup";
  id: string;
  title?: string;
  items: SearchResultMediaItem[];
  columns?: 2 | 3 | 4;
  footerAction?: SearchResultsAction;
  className?: string;
};

export type SearchResultsRecord = {
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
    image_media_metadata?: { width?: number; height?: number };
    video_media_metadata?: { durationMillis?: string; width?: number; height?: number };
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

export type SearchResultsItem =
  | SearchResultListItem
  | SearchResultImageItem
  | SearchResultMediaItem
  | SearchResultImageGroupItem
  | SearchResultVideoGroupItem;

export type SearchResultsSection =
  | {
      type: "section";
      title?: string;
      titleIcon?: React.ReactNode;
      titleIconBgColor?: string;
      titleClassName?: string;
      layout: "list";
      items: SearchResultListItem[];
      footerAction?: SearchResultsAction;
      className?: string;
    }
  | {
      type: "section";
      title?: string;
      titleIcon?: React.ReactNode;
      titleIconBgColor?: string;
      titleClassName?: string;
      layout: "imageGrid";
      items: SearchResultImageItem[];
      columns?: 2 | 3 | 4;
      footerAction?: SearchResultsAction;
      className?: string;
    }
  | {
      type: "section";
      title?: string;
      titleIcon?: React.ReactNode;
      titleIconBgColor?: string;
      titleClassName?: string;
      layout: "mediaGrid";
      items: SearchResultMediaItem[];
      columns?: 2 | 3 | 4;
      footerAction?: SearchResultsAction;
      className?: string;
    };

export type SearchResultsProps = {
  sections?: SearchResultsSection[];
  items?: SearchResultsItem[];
  records?: SearchResultsRecord[];
  imageGridColumns?: 2 | 3 | 4;
  className?: string;
  onItemClick?: (item: SearchResultsItem) => void;
};
