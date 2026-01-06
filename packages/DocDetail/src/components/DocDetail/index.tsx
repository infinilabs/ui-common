import { Typography } from "antd";
import {
  ChevronRight,
  Dot,
  Ellipsis,
  Minus,
  SquareArrowOutUpRight,
} from "lucide-react";
import { motion } from "motion/react";

import { useState, type FC, type HTMLAttributes, type ReactNode } from "react";
import Preview from "./components/Preview";
import AIInterpretation from "./components/AIInterpretation";
import { cn } from "@/utils/cn";
import ActionButton from "../ActionButton";

const { Text } = Typography;

export type MetadataContentType =
  | "image"
  | "video"
  | "markdown"
  | "pdf"
  | "docx"
  | "pptx"
  | "xlsx";

export interface DocDetailProps extends HTMLAttributes<HTMLDivElement> {
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
      content_type: MetadataContentType;
      mime_type: string;
      preview_url: string;
      ai_insights: string;
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
  extraButtons?: ReactNode[];
}

const DocDetail: FC<DocDetailProps> = (props) => {
  const { data, i18n, extraButtons, className, ...rest } = props;

  const [visibleMore, setVisibleMore] = useState(false);

  const moreInfo = [
    {
      label: i18n?.labels?.updatedAt ?? "Updated At",
      value: data?.last_updated_by?.timestamp,
    },
    {
      label: i18n?.labels?.type ?? "Type",
      value: data?.type,
    },
    {
      label: i18n?.labels?.createdBy ?? "Created By",
      value: data?.owner?.username,
    },
    {
      label: i18n?.labels?.size ?? "Size",
      value: data?.size,
    },
    {
      label: i18n?.labels?.updatedBy ?? "Updated By",
      value: data?.last_updated_by?.user.username,
    },
  ];

  return (
    <div
      className={cn("flex flex-col h-full overflow-hidden", className)}
      {...rest}
    >
      <div>
        <img src={data?.icon} className="size-6 mr-3 float-left" />

        <div className="text-4.5/6 text-primary">{data?.title}</div>
      </div>

      <div className="flex items-center justify-between my-2">
        <Text
          type="secondary"
          className="inline-flex items-center gap-0.5 text-3"
        >
          <span>{data?.source?.name}</span>
          <ChevronRight className="size-3" />
          <span>{data?.category}</span>
          <Minus className="size-3 rotate-90" />
          <span>{data?.owner?.username}</span>
          <Dot className="size-3" />
          <span>{data?.last_updated_by?.timestamp}</span>

          <Ellipsis
            className="pl-2 size-3 hover:text-primary transition cursor-pointer"
            onClick={() => {
              setVisibleMore((prev) => !prev);
            }}
          />
        </Text>

        <div className="inline-flex gap-2">
          {extraButtons}

          <ActionButton
            icon={<SquareArrowOutUpRight />}
            onClick={() => {
              window.open(data.url);
            }}
          >
            {i18n?.buttons?.openSource ?? "Open Source"}
          </ActionButton>
        </div>
      </div>

      <motion.div
        className="bg-black/3 dark:bg-white/4 rounded-lg overflow-hidden"
        initial={false}
        animate={{
          height: visibleMore ? "auto" : 0,
          opacity: visibleMore ? 1 : 0,
          marginBottom: visibleMore ? "1rem" : 0,
        }}
      >
        <div className="flex flex-wrap gap-row-2 p-4">
          {moreInfo.map((item) => {
            const { label, value } = item;

            return (
              <div
                key={label}
                className="w-1/2 inline-flex items-center <sm:w-full"
              >
                <Text type="secondary" className="w-24">
                  {label}
                </Text>

                <span className="text-3.5">{value ?? "-"}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="flex flex-col gap-4 flex-1 overflow-auto">
        <Preview {...props} />

        <AIInterpretation {...props} />
      </div>
    </div>
  );
};

export default DocDetail;
