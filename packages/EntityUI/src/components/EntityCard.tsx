import React, { useRef, useState } from "react";
import { Popover, Button, Skeleton } from "antd";

import { EntityContent } from "./EntityContent";
import type { EntityCardData } from "./types";

import styles from "./Entity.module.css";

export interface EntityCardAction {
  label: string;
  onClick?: () => void;
}

export interface EntityCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  actions?: EntityCardAction[];
  footer?: string;

  triggerType?: "click" | "hover";
  popupMode?: "modal";
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modalTitle?: string;
  width?: number;
  placement?: "left" | "right" | "top" | "bottom";
  hoverOpenDelay?: number;
  closeDelay?: number;
  autoPlacement?: boolean;
  hoverAutoClose?: boolean;
  hoverAutoCloseDelay?: number;
  data?: EntityCardData;
}

const EntityCard = ({
  title,
  subtitle,
  description,
  imageUrl,
  actions = [],
  footer,
  triggerType = "hover",
  popupMode = "modal",
  trigger,
  open,
  onOpenChange,
  modalTitle,
  width,
  placement = "right",
  data,
  hoverOpenDelay = 500,
  closeDelay = 200,
  autoPlacement = false,
  hoverAutoClose = false,
  hoverAutoCloseDelay = 2000,
}: EntityCardProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const actualOpen = isControlled ? (open as boolean) : internalOpen;

  const setOpen = (next: boolean) => {
    if (isControlled) {
      onOpenChange?.(next);
    } else {
      setInternalOpen(next);
    }
  };

  const card = data;

  const triggerRef = useRef<HTMLSpanElement | null>(null);

  const [internalPlacement, setInternalPlacement] = useState<
    "left" | "right" | "top" | "bottom"
  >(placement);

  const computeAutoPlacement = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const desiredWidthPx = (() => {
      const w =
        (typeof width === "number" ? width : undefined) ?? card?.style?.width;
      if (!w) return 376;
      return typeof w === "string" ? parseInt(w, 10) || 376 : w;
    })();
    const desiredHeightPx = 300;

    const rightSpace = vw - rect.right;
    const leftSpace = rect.left;
    const bottomSpace = vh - rect.bottom;
    const topSpace = rect.top;

    let next: "left" | "right" | "top" | "bottom" = placement;
    if (rightSpace >= desiredWidthPx) next = "right";
    else if (leftSpace >= desiredWidthPx) next = "left";
    else if (bottomSpace >= desiredHeightPx) next = "bottom";
    else next = "top";

    setInternalPlacement(next);
  };

  const defaultTrigger = (
    <Button type="default">{`打开：${card?.title ?? title ?? "详情"}`}</Button>
  );

  const triggerNode = (
    <span ref={triggerRef} style={{ display: "inline-block" }}>
      {trigger ?? defaultTrigger}
    </span>
  );

  const popup = (
    <Popover
      content={
        <div
          className={styles.entityCard}
          style={{
            width: card?.style?.width,
            height: card?.style?.height,
            maxWidth: card?.style?.max_width,
            maxHeight: card?.style?.max_height,
          }}
        >
          {card?.id ? (
            <EntityContent data={card} />
          ) : (
            <Skeleton
              active
              title={false}
              avatar={{ shape: "circle", size: 24 }}
              paragraph={{ rows: 3 }}
            />
          )}
        </div>
      }
      open={actualOpen}
      onOpenChange={(next) => {
        if (next && autoPlacement) computeAutoPlacement();
        setOpen(!!next);
      }}
      trigger={triggerType}
      placement={autoPlacement ? internalPlacement : placement}
      mouseEnterDelay={triggerType === "hover" ? hoverOpenDelay / 1000 : 0}
      mouseLeaveDelay={triggerType === "hover" ? closeDelay / 1000 : 0}
      autoAdjustOverflow
      getPopupContainer={() => triggerRef.current || document.body}
      overlayInnerStyle={{ padding: 0 }}
    >
      {triggerNode}
    </Popover>
  );

  return <>{popup}</>;
};

export default EntityCard;
