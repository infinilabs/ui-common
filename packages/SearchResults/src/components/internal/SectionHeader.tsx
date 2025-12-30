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
        <span
          className={clsx(
            "inline-flex h-6 w-6 flex-none items-center justify-center",
            titleIconBgColor && "rounded-md text-white"
          )}
          style={titleIconBgColor ? { backgroundColor: titleIconBgColor } : undefined}
        >
          {titleIcon}
        </span>
      ) : null}

      {title ? (
        <div
          className={clsx(
            "min-w-0 cursor-pointer text-xl font-semibold leading-6 hover:underline hover:underline-offset-2 group-hover:underline group-hover:underline-offset-2",
            titleClassName
          )}
        >
          {title}
        </div>
      ) : null}

      {source ? (
        <span
          className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          title={source}
        >
          {getSourceBadgeText(source)}
        </span>
      ) : null}
    </div>
  );
}
