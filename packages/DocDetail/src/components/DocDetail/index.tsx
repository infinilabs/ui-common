import { Typography } from "antd";
import { ChevronDown, ChevronRight, Dot, Minus } from "lucide-react";
import { motion } from "motion/react";

import { useState, type FC, type HTMLAttributes, type ReactNode } from "react";
import Preview from "./components/Preview";
import AIInterpretation from "./components/AIInterpretation";
import { cn } from "@/utils/cn";

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
    owner?: {
      type?: string;
      id?: string;
      icon?: string;
      title?: string;
      subtitle?: string;
      cover?: string;
    };
  };
  i18n?: {
    labels?: {
      type?: string;
      size?: string;
      createdBy?: string;
      createdAt?: string;
      updatedAt?: string;
      preview?: string;
      aiInterpretation?: string;
    };
  };
  actionButtons?: ReactNode[];
}

const DocDetail: FC<DocDetailProps> = (props) => {
  const { data, i18n, actionButtons, className, ...rest } = props;

  const [expandMore, setExpandMore] = useState(false);

  const moreInfo = [
    {
      label: i18n?.labels?.type ?? "Type",
      value: data?.type,
    },
    {
      label: i18n?.labels?.size ?? "Size",
      value: data?.size,
    },
    {
      label: i18n?.labels?.createdBy ?? "Created By",
      value: data?.owner?.title,
    },
    {
      label: i18n?.labels?.createdAt ?? "Created At",
      value: data?.created,
    },
    {
      label: i18n?.labels?.updatedAt ?? "Updated At",
      value: data?.updated,
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
          <div>{data?.source?.name ?? "-"}</div>
          <ChevronRight className="size-3" />
          <div>{data?.category ?? "-"}</div>
          <Minus className="size-3 rotate-90" />
          <div>{data?.owner?.title ?? "-"}</div>
          <Dot className="size-3" />
          <div>{data?.updated ?? "-"}</div>

          <ChevronDown
            className={cn(
              "ml-2 size-3 hover:text-primary transition cursor-pointer",
              {
                "-scale-y-100": expandMore,
              }
            )}
            onClick={() => {
              setExpandMore((prev) => !prev);
            }}
          />
        </Text>

        <div className="inline-flex gap-2">{actionButtons}</div>
      </div>

      <motion.div
        className="bg-black/3 dark:bg-white/4 rounded-lg overflow-hidden"
        initial={false}
        animate={{
          height: expandMore ? "auto" : 0,
          opacity: expandMore ? 1 : 0,
          marginBottom: expandMore ? "1rem" : 0,
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
