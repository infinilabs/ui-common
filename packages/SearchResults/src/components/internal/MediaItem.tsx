import clsx from "clsx";
import { Play } from "lucide-react";

import { ItemInteractive } from "./ItemInteractive";
import { TagPill } from "./TagPill";

import type { SearchResultMediaItem, SearchResultsProps } from "../types";

export function MediaItem({
  item,
  onItemClick
}: {
  item: SearchResultMediaItem;
  onItemClick?: SearchResultsProps["onItemClick"];
}) {
  const metaTags = [item.sourceLabel, item.categoryLabel].filter(Boolean) as string[];
  return (
    <ItemInteractive
      href={item.href}
      target={item.target}
      rel={item.rel}
      onClick={() => {
        item.onClick?.();
        onItemClick?.(item);
      }}
      className={clsx(
        "group w-full rounded-xl bg-white text-left transition",
        "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      )}
    >
      <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
        <div className="relative aspect-4/3 bg-slate-100">
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
        <div className="truncate text-sm font-medium">
          {item.title}
        </div>

        {item.matchCountText ? (
          <div className="mt-1 truncate text-xs text-[#666]">{item.matchCountText}</div>
        ) : null}

        {metaTags.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {metaTags.map((text) => (
              <TagPill key={text} text={text} />
            ))}
          </div>
        ) : null}
      </div>
    </ItemInteractive>
  );
}

