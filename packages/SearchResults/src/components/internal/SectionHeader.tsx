import clsx from "clsx";

import type React from "react";

function getSourceBadgeText(source: string) {
  const normalized = source.trim().toLowerCase();
  if (!normalized) return "";
  if (normalized === "google") return "G";
  return source.trim().slice(0, 1).toUpperCase();
}

export function SectionHeader({
  title,
  titleIcon,
  titleIconBgColor,
  source,
  className,
  titleClassName,
}: {
  title?: string;
  titleIcon?: React.ReactNode;
  titleIconBgColor?: string;
  source?: string;
  className?: string;
  titleClassName?: string;
}) {
  if (!title && !titleIcon && !source) return null;

  return (
    <div className={clsx("mb-2 flex min-w-0 items-center gap-2", className)}>
      {titleIcon ? (
        titleIconBgColor ? (
          <span
            className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-md text-white"
            style={{ backgroundColor: titleIconBgColor }}
          >
            {titleIcon}
          </span>
        ) : (
          <span className="flex-none">{titleIcon}</span>
        )
      ) : null}

      {title ? (
        <div
          className={clsx(
            "min-w-0 text-xl font-semibold cursor-pointer hover:underline hover:underline-offset-2 group-hover:underline group-hover:underline-offset-2",
            titleClassName
          )}
        >
          {title}
        </div>
      ) : null}

      {source ? (
        <span
          className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-md"
          title={source}
        >
          {getSourceBadgeText(source)}
        </span>
      ) : null}
    </div>
  );
}
