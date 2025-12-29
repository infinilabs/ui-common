import clsx from "clsx";

import { ItemInteractive } from "./ItemInteractive";

import type { SearchResultImageItem, SearchResultsProps } from "../types";

export function ImageItem({
  item,
  onItemClick
}: {
  item: SearchResultImageItem;
  onItemClick?: SearchResultsProps["onItemClick"];
}) {
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
        <div className="relative aspect-video bg-slate-100">
          <img
            src={item.imageUrl}
            alt={item.imageAlt ?? item.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-2">
        <div className="truncate text-sm font-semibold text-[#333]">
          {item.title}
        </div>
        {item.subtitle ? (
          <div className="mt-1 truncate text-sm text-[#666]">{item.subtitle}</div>
        ) : null}
      </div>
    </ItemInteractive>
  );
}

