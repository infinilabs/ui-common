import React from "react";

import { IconConfig } from "./types";
import { resolveLucideIcon } from "./utils";

export interface ConfigurableIconProps extends Omit<IconConfig, "label"> {
  className?: string;
  style?: React.CSSProperties;
}

const ConfigurableIcon = ({
  type,
  name,
  color = "#0287FF",
  size = 24,
  dataUrl,
  className,
  style,
}: ConfigurableIconProps) => {
  if (type === "lucide") {
    const Comp = resolveLucideIcon(name || "");
    if (!Comp) return (
      <div
        className={className}
        style={{ width: size, height: size, borderRadius: 6, background: "#e5e7eb", ...style }}
      />
    );
    return <Comp className={className} style={{ color, ...style }} size={size} />;
  }

  // custom image icon
  if (dataUrl) {
    return (
      <img
        src={dataUrl}
        alt={name || "icon"}
        className={className}
        style={{ width: size, height: size, borderRadius: 6, objectFit: "cover", ...style }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{ width: size, height: size, borderRadius: 6, background: "#e5e7eb", ...style }}
    />
  );
};

export default ConfigurableIcon;
