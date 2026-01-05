import { type FC } from "react";
import type { DocDetailProps } from "@/components/DocDetail";
import { Collapse } from "antd";
import Pdf from "./components/Pdf";
import Markdown from "./components/Markdown";

const Preview: FC<DocDetailProps> = (props) => {
  const { data, i18n } = props;

  const renderContent = () => {
    const contentType = data?.metadata?.content_type;
    const previewUrl = data?.metadata?.preview_url;

    if (!contentType || !previewUrl) return;

    if (contentType === "image") {
      return <img src={previewUrl} className="w-full" />;
    }

    if (contentType === "video") {
      return <video src={previewUrl} className="w-full" controls />;
    }

    return (
      <Collapse
        size="small"
        defaultActiveKey={["preview"]}
        classNames={{
          root: "bg-transparent",
        }}
        items={[
          {
            key: "preview",
            label: i18n?.labels?.preview ?? "Preview",
            children: (
              <>
                {contentType === "pdf" && <Pdf {...props} />}

                {contentType === "markdown" && <Markdown url={previewUrl} />}
              </>
            ),
          },
        ]}
      />
    );
  };

  return renderContent();
};

export default Preview;
