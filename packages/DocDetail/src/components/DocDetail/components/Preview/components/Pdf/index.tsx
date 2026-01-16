import { Document, Page, pdfjs } from "react-pdf";
import { useState, type FC } from "react";
import type { DocDetailProps } from "@/components/DocDetail";
import { Pagination } from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfProps extends DocDetailProps {
  url: string;
}

const Pdf: FC<PdfProps> = (props) => {
  const { url } = props;

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Pagination
          size="small"
          pageSize={1}
          total={numPages}
          current={pageNumber}
          onChange={(page) => setPageNumber(page)}
        />
      </div>

      <div className="border border-solid border-border rounded-lg overflow-hidden">
        <Document
          file={url}
          onLoadSuccess={(pdf) => {
            setNumPages(pdf.numPages);
          }}
        >
          <Page
            className="children:(w-full! h-unset!)"
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};

export default Pdf;
