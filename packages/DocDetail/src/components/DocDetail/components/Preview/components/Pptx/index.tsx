import { useEffect, useRef, type FC } from "react";
import { init } from "pptx-preview";

import type { DocDetailProps } from "@/components/DocDetail";

interface PptxProps extends DocDetailProps {
  url: string;
}

const Pptx: FC<PptxProps> = (props) => {
  const { url } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const renderPdf = async () => {
    if (!containerRef.current) return;

    const pptx = init(containerRef.current, {
      width: 960,
      height: 540,
    });

    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();

    pptx.preview(arrayBuffer);
  };

  useEffect(() => {
    renderPdf();
  }, [url]);

  return <div ref={containerRef} />;
};

export default Pptx;
