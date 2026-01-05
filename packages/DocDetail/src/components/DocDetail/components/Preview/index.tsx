import type { FC } from "react";
import type { DocDetailProps } from "@/components/DocDetail";
import { Collapse } from "antd";
import Pdf from "./components/Pdf";
import Markdown from "./components/Markdown";

const Preview: FC<DocDetailProps> = (props) => {
  const { data, i18n } = props;

  const renderContent = () => {
    const { type } = data;

    if (type === "image") {
      return <img src={data.url} className="w-full" />;
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
                {type === "pdf" && <Pdf />}

                <Markdown />
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
