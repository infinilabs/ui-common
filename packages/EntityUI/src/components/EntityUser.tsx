import React from "react";
import * as LucideIcons from "lucide-react";
import { Avatar } from "antd";

export interface EntityUserData {
  type?: string;
  id?: string;
  icon?: string; // http/https 图片或 lucide 名称
  title?: string; // 姓名
  color?: string; // 底行颜色圆点
  subtitle?: string; // 底行副标题，如“在线”
  url?: string; // 支持 mailto: 或 http/https
  properties?: Array<{ icon?: string; label?: string; value?: any }>;
}

export interface EntityUserProps {
  data?: EntityUserData;
}

const getLucideIcon = (name?: string) => {
  if (!name) return null;
  const raw = name.trim();
  const alias: Record<string, string> = {
    user: "User",
    email: "Mail",
    mail: "Mail",
    phone: "Phone",
    datetime: "Calendar",
    date: "Calendar",
    time: "Clock",
    tags: "Tag",
  };
  const pascal =
    alias[raw] ??
    raw.replace(/(^\w|-\w)/g, (s) => s.replace("-", "").toUpperCase());
  const IconComp = (LucideIcons as any)[pascal];
  return IconComp || null;
};

const parseMailtoText = (url?: string) => {
  if (!url) return undefined;
  if (/^mailto:/i.test(url)) {
    try {
      return decodeURIComponent(url.slice(7));
    } catch {
      return url.slice(7);
    }
  }
  return url;
};

const SkeletonInline: React.FC = () => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      verticalAlign: "middle",
    }}
    aria-label="entity user skeleton"
  >
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: "#e9e9e9",
        flex: "0 0 auto",
      }}
    />
    <span
      style={{
        width: 160,
        height: 20,
        borderRadius: 6,
        backgroundColor: "#e9e9e9",
        flex: "0 0 auto",
      }}
    />
  </span>
);

export const EntityUser: React.FC<EntityUserProps> = ({ data }) => {
  const showSkeleton =
    !data ||
    (!data.title && !data.icon && !data.subtitle && !data.color && !data.url);

  if (showSkeleton) return <SkeletonInline />;

  const icon = data?.icon?.trim();
  const title = data?.title?.trim();
  const urlText = parseMailtoText(data?.url);
  const hasIcon = !!icon;
  const hasTitle = !!title;
  const hasUrl = !!urlText;
  const hasColorOrSubtitle = !!data?.color || !!data?.subtitle;

  // antd Avatar（支持图片或图标）
  const avatarNode = (size: number = 20) => {
    if (icon && /^https?:\/\//i.test(icon)) {
      return <Avatar size={size} src={icon} />;
    }
    const IconComp = getLucideIcon(icon || "user");
    const iconSize = Math.max(8, size - 4);
    return <Avatar size={size} icon={IconComp ? <IconComp size={iconSize} /> : undefined} />;
  };

  // 1) icon + title → 一行展示
  if (hasIcon && hasTitle && !hasUrl && !hasColorOrSubtitle) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        {avatarNode()}
        <span style={{ color: "#027FFE", fontWeight: 500, lineHeight: "20px" }} title={title}>
          {title}
        </span>
      </span>
    );
  }

  // 2) 仅 icon
  if (hasIcon && !hasTitle && !hasUrl && !hasColorOrSubtitle) {
    return <span style={{ display: "inline-flex" }}>{avatarNode()}</span>;
  }

  // 3) 仅 title
  if (!hasIcon && hasTitle && !hasUrl && !hasColorOrSubtitle) {
    return (
      <span
        style={{ display: "inline-block", color: "#027FFE", fontWeight: 500 }}
        title={title}
      >
        {title}
      </span>
    );
  }

  // 4) icon + title + url → 左 icon，右上下（上：title，下：url）
  if (hasIcon && hasTitle && hasUrl) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        {avatarNode(40)}
        <span style={{ display: "inline-flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span style={{ color: "#027FFE", fontWeight: 500 }} title={title}>
            {title}
          </span>
          <span style={{ color: "#888", fontSize: 12 }} title={urlText}>
            {urlText}
          </span>
        </span>
      </span>
    );
  }

  // 5) icon + title + color + subtitle → 左 icon，右上下（上：title，下：颜色圆点 + subtitle）
  if (hasIcon && hasTitle && hasColorOrSubtitle) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        {avatarNode(40)}
        <span style={{ display: "inline-flex", flexDirection: "column", justifyContent: "space-between"}}>
          <span style={{ color: "#027FFE", fontWeight: 500 }} title={title}>
            {title}
          </span>
          <span
            style={{
              marginTop: 4,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "#666",
            }}
            title={data?.subtitle}
          >
            {data?.color && (
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: data.color,
                }}
              />
            )}
            {data?.subtitle}
          </span>
        </span>
      </span>
    );
  }

  // 兜底：仅标题或骨架
  return hasTitle ? (
    <span style={{ color: "#027FFE", fontWeight: 500 }} title={title}>
      {title}
    </span>
  ) : (
    <SkeletonInline />
  );
};

export default EntityUser;
