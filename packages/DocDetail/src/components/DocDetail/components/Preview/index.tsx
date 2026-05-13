import { type FC } from "react";
import type {
  DocDetailProps,
  MetadataContentType,
} from "@/components/DocDetail";
import { Collapse } from "antd";
import Markdown from "@infinilabs/markdown";

import Pdf from "./components/Pdf";
import Docx from "./components/Docx";
import Pptx from "./components/Pptx";
import Image from "./components/Image";
import Video from "./components/Video";

const Preview: FC<DocDetailProps> = (props) => {
  const { data, i18n } = props;

  const renderFile = (type: MetadataContentType, url: string) => {
    if (type === "markdown") {
      return <Markdown url={url} requestHeaders={props.requestHeaders} />;
    }

    if (type === "pdf") {
      return <Pdf url={url} {...props} />;
    }

    if (type === "docx") {
      return <Docx url={url} {...props} />;
    }

    if (type === "pptx") {
      return <Pptx url={url} {...props} />;
    }

    return null;
  };

  const renderContent = () => {
    const { url } = data;
    const type = data?.metadata?.content_type;

    if (!type || !url) return;

    if (type === "image") {
      return <Image {...props} />;
    }

    if (type === "video") {
      return <Video url={url} requestHeaders={props.requestHeaders} />;
    }

    return (
      <Collapse
        size="small"
        defaultActiveKey={["preview"]}
        classNames={{
          root: "bg-transparent",
          body: "p-4!",
        }}
        items={[
          {
            key: "preview",
            label: i18n?.labels?.preview ?? "Preview",
            children: renderFile(type, url),
          },
        ]}
      />
    );
  };

  return renderContent();
};

export default Preview;
