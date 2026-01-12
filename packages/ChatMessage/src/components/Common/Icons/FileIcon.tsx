import platformAdapter from "@/utils/platformAdapter";
import { useEffect, useState } from "react";
import type { FC } from "react";
import FontIcon from "./FontIcon";
import { twMerge } from "tailwind-merge";

interface FileIconProps {
  path: string;
  className?: string;
}

const FileIcon: FC<FileIconProps> = (props) => {
  const { path, className } = props;
  const [iconName, setIconName] = useState("");

  useEffect(() => {
    platformAdapter
      .invokeBackend<string>("get_file_icon", { path })
      .then((icon) => {
        if (icon) setIconName(icon);
      });
  }, [path]);

  return (
    <FontIcon name={iconName} className={twMerge("min-w-8 h-8", className)} />
  );
};

export default FileIcon;
