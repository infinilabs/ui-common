import clsx from "clsx";

import { BreadcrumbsLine } from "./BreadcrumbsLine";
import { ItemInteractive } from "./ItemInteractive";

import type { SearchResultImageItem, SearchResultsProps } from "../types";

export function ImageItem({
  item,
  onItemClick
}: {
  item: SearchResultImageItem;
  onItemClick?: SearchResultsProps["onItemClick"];
}) {
  const interactiveHref = item.onClick ? undefined : item.href;
  const breadcrumbs = item.breadcrumbs ?? [];
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
        <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
          <img
            src={item.imageUrl}
            alt={item.imageAlt ?? item.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-2">
        <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
          {item.title}
        </div>
        {item.subtitle ? (
          <div className="mt-1 truncate text-sm text-slate-600 dark:text-slate-300">
            {item.subtitle}
          </div>
        ) : null}

        {breadcrumbs.length ? (
          <div className="mt-2 text-slate-600 dark:text-slate-300">
            <BreadcrumbsLine breadcrumbs={breadcrumbs} />
          </div>
        ) : null}
      </div>
    </ItemInteractive>
  );
}
