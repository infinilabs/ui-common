import { useMemo, useRef, useState, type FC } from "react";
import { Image as AntdImage, Skeleton } from "antd";
import { useSize } from "ahooks";

import type { DocDetailProps } from "@/components/DocDetail";

const Image: FC<DocDetailProps> = (props) => {
  const { data } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);
  const [failed, setFailed] = useState(false);

  const calcHeight = useMemo(() => {
    const { width, height } = data.metadata ?? {};

    if (!containerSize || !width || !height) {
      return 0;
    }

    return Math.round((containerSize.width * height) / width);
  }, [containerSize?.width, data?.metadata?.width, data?.metadata?.height]);

  return (
    <div ref={containerRef}>
      <AntdImage
        preview={false}
        width={containerSize?.width}
        height={calcHeight}
        placeholder={
          <Skeleton.Node
            active
            classNames={{
              root: "size-full!",
              content: "size-full!",
            }}
          />
        }
        src={failed ? data?.thumbnail : data?.url}
        onError={() => {
          setFailed(true);
        }}
      />
    </div>
  );
};

export default Image;
