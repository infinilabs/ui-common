import { Document, Page, pdfjs } from "react-pdf";
import { useState, type FC } from "react";
import { cn } from "@/utils/cn";
import type { DocDetailProps } from "@/components/DocDetail";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pdf: FC<DocDetailProps> = (props) => {
  const { data } = props;

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-text-secondary">搜索匹配结果</div>

      {numPages > 0 && (
        <div className="flex gap-1">
          {Array.from({ length: numPages }, (_, index) => {
            const page = index + 1;

            return (
              <div
                key={page}
                className={cn(
                  "inline-flex items-center h-6 px-3 rounded-lg cursor-pointer bg-bg-layout text-text-secondary",
                  {
                    "text-primary bg-primary-bg": pageNumber === page,
                  }
                )}
                onClick={() => {
                  setPageNumber(page);
                }}
              >
                第{page}页
              </div>
            );
          })}
        </div>
      )}

      <div className="border border-solid border-border rounded-lg overflow-hidden">
        <Document
          file={data?.metadata?.preview_url}
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
