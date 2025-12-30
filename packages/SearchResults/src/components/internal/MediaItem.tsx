import clsx from "clsx";
import { Play } from "lucide-react";

import { BreadcrumbsLine } from "./BreadcrumbsLine";
import { ItemInteractive } from "./ItemInteractive";

import type { SearchResultMediaItem, SearchResultsProps } from "../types";

export function MediaItem({
  item,
  onItemClick,
}: {
  item: SearchResultMediaItem;
  onItemClick?: SearchResultsProps["onItemClick"];
}) {
  const breadcrumbs =
    item.breadcrumbs ??
    ([item.sourceLabel, item.categoryLabel].filter(Boolean) as string[]);
  const interactiveHref = item.onClick ? undefined : item.href;
  return (
    <ItemInteractive
      href={interactiveHref}
      target={item.target}
      rel={item.rel}
      onClick={() => {
        item.onClick?.();
        onItemClick?.(item);
      }}
      className={clsx(
        "group block w-full rounded-xl border border-transparent p-2 text-left no-underline transition-colors",
        "hover:border-slate-200 hover:bg-slate-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        "dark:hover:border-slate-700 dark:hover:bg-slate-800/60 dark:focus-visible:ring-slate-600"
      )}
    >
      <div className="overflow-hidden rounded-lg ring-1 ring-slate-200 dark:ring-slate-700">
        <div className="relative aspect-4/3 bg-slate-100 dark:bg-slate-800">
          <img
            src={item.thumbnailUrl}
            alt={item.thumbnailAlt ?? item.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {item.mediaType === "video" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30">
                <Play className="h-5 w-5 translate-x-px" />
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-2">
        <div className="mb-1 truncate text-sm font-medium text-[#333] dark:text-slate-100">
          {item.title}
        </div>

        {item.matchCountText ? (
          <div className="mb-1 truncate text-xs text-[#666] dark:text-slate-400">
            {item.matchCountText}
          </div>
        ) : null}

        {breadcrumbs.length ? (
          <div className="text-[#666] dark:text-slate-400">
            <BreadcrumbsLine breadcrumbs={breadcrumbs} />{" "}
          </div>
        ) : null}
      </div>
    </ItemInteractive>
  );
}
