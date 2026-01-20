import { useMemo, useRef, useState, type FC } from "react";
import { Image as AntdImage, Skeleton } from "antd";
import { useSize } from "ahooks";

import type { DocDetailProps } from "@/components/DocDetail";

const Image: FC<DocDetailProps> = (props) => {
  const { data } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);
  const [errored, setErrored] = useState(false);

  const calcHeight = useMemo(() => {
    const containerWidth = containerSize?.width;
    const originalWidth = data?.metadata?.width;
    const originalHeight = data?.metadata?.height;

    if (!containerWidth || !originalWidth || !originalHeight) {
      return void 0;
    }

    return containerWidth * (originalHeight / originalWidth);
  }, [containerSize?.width, data?.metadata?.width, data?.metadata?.height]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{
        height: calcHeight,
      }}
    >
      <AntdImage
        preview={false}
        rootClassName="size-full"
        placeholder={
          <Skeleton.Node
            active
            classNames={{
              root: "size-full!",
              content: "size-full!",
            }}
          />
        }
        src={errored ? data?.thumbnail : data?.url}
        onError={() => {
          setErrored(true);
        }}
      />
    </div>
  );
};

export default Image;
