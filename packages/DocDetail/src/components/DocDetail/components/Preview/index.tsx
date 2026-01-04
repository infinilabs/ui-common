import type { FC } from "react";
import type { DocDetailProps } from "../..";
import { Collapse } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import pdfFile from "./test.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
              <Document file={pdfFile}>
                <Page
                  className="children:(w-full! h-unset!)"
                  pageNumber={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            ),
          },
        ]}
      />
    );
  };

  return renderContent();
};

export default Preview;
