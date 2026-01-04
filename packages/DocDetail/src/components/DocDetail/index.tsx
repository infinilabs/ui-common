import { Button, Card, Typography } from "antd";
import { SquareArrowOutUpRight } from "lucide-react";
import type { FC } from "react";
import Preview from "./components/Preview";
import AIInterpretation from "./components/AIInterpretation";

const { Text } = Typography;

export interface DocDetailProps {
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

const DocDetail: FC<DocDetailProps> = (props) => {
  const { data, i18n } = props;

  const extraInfo = [
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
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 mb-6 overflow-hidden">
        <div>
          <img src={data?.icon} className="size-6 mr-3 float-left" />

          <div className="text-4.5/6 text-primary">{data?.title}</div>
        </div>

        <Text type="secondary" className="block my-3 text-3">
          <span>{data?.source?.name}</span>
          <span> &gt; </span>
          <span>{data?.category}</span>
          <span> | </span>
          <span>{data?.owner?.username}</span>
          <span> · </span>
          <span>{data?.last_updated_by?.timestamp}</span>
        </Text>

        <div className="flex gap-2 mb-6">
          <Button
            color="primary"
            variant="filled"
            shape="round"
            icon={<SquareArrowOutUpRight className="size-4" />}
            onClick={() => {
              window.open(data.url);
            }}
          >
            {i18n?.buttons?.openSource ?? "Open Source"}
          </Button>
        </div>

        <div className="flex flex-col gap-6 flex-1 overflow-auto">
          <Preview {...props} />

          <AIInterpretation {...props} />
        </div>
      </div>

      <Card
        size="small"
        classNames={{
          body: "flex flex-wrap gap-row-2",
        }}
      >
        {extraInfo.map((item) => {
          const { label, value } = item;

          return (
            <div
              key={label}
              className="w-1/2 inline-flex items-center <sm:w-full"
            >
              <Text type="secondary" className="w-24">
                {label}
              </Text>

              <span>{value ?? "-"}</span>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default DocDetail;
