import type { DocDetailProps } from "@/components/DocDetail";
import { useEffect, useRef, type FC } from "react";
import { renderAsync } from "docx-preview";

const Docx: FC<DocDetailProps> = (props) => {
  const { data } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const renderDocx = async (url: string) => {
    if (!containerRef.current) return;

    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();

    containerRef.current.innerHTML = "";

    renderAsync(arrayBuffer, containerRef.current!, void 0, {
      inWrapper: false,
      ignoreWidth: true,
      ignoreHeight: true,
    });
  };

  useEffect(() => {
    const url = data?.metadata?.preview_url;

    if (!url) return;

    renderDocx(url);
  }, [data?.metadata?.preview_url]);

  return <div ref={containerRef} className="[&>.docx]:p-0!" />;
};

export default Docx;
