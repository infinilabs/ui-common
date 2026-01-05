import { useEffect, type FC } from "react";
import type { DocDetailProps } from "@/components/DocDetail";
import { Collapse } from "antd";
import Pdf from "./components/Pdf";
import Markdown from "./components/Markdown";

const Preview: FC<DocDetailProps> = (props) => {
  const { data, i18n } = props;

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://192.168.3.181:9101/coco-server/README.md"
      );

      const text = await response.text();

      console.log("text", text);
    })();
  }, []);

  const renderContent = () => {
    const mimeType = data?.metadata?.mime_type;
    const previewUrl = data?.metadata?.preview_url;

    if (!mimeType || !previewUrl) return;

    if (mimeType.startsWith("image")) {
      return <img src={previewUrl} className="w-full" />;
    }

    if (mimeType.startsWith("video")) {
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
                {mimeType === "application/pdf" && <Pdf {...props} />}

                {mimeType === "text/markdown" && <Markdown url={previewUrl} />}
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
