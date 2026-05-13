import type { DocDetailProps } from "@/components/DocDetail";
import { useEffect, useRef, type FC } from "react";
import { renderAsync } from "docx-preview";

interface DocxProps extends DocDetailProps {
  url: string;
}

const Docx: FC<DocxProps> = (props) => {
  const { url, requestHeaders } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const renderDocx = async () => {
    if (!containerRef.current) return;

    const response = await fetch(url, {
      headers: requestHeaders,
    });

    const arrayBuffer = await response.arrayBuffer();

    containerRef.current.innerHTML = "";

    renderAsync(arrayBuffer, containerRef.current!, void 0, {
      inWrapper: false,
      ignoreWidth: true,
      ignoreHeight: true,
    });
  };

  useEffect(() => {
    renderDocx();
  }, [url]);

  return <div ref={containerRef} className="[&>.docx]:p-0!" />;
};

export default Docx;
