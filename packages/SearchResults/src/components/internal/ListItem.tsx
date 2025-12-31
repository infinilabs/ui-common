import clsx from "clsx";
import { ExternalLink } from "lucide-react";

import { AuthorDate } from "./AuthorDate";
import { BreadcrumbsLine } from "./BreadcrumbsLine";
import { ItemInteractive } from "./ItemInteractive";
import { MetaLine } from "./MetaLine";
import { SectionHeader } from "./SectionHeader";
import { TypeBadge } from "./TypeBadge";

import type { SearchResultListItem, SearchResultsProps } from "../types";

export function ListItem({
  item,
  onItemClick
}: {
  item: SearchResultListItem;
  onItemClick?: SearchResultsProps["onItemClick"];
}) {
  const titleIcon = item.typeIcon ? (
    <TypeBadge typeIcon={item.typeIcon} />
  ) : item.fileType ? (
    <TypeBadge fileType={item.fileType} />
  ) : null;

  const handleClick =
    item.onClick || onItemClick
      ? () => {
          item.onClick?.();
          onItemClick?.(item);
        }
      : undefined;

  const interactiveHref = item.onClick ? undefined : item.href;

  const content = (
    <div className="w-full py-2">
      <div className="flex min-w-0 items-center gap-2">
        <SectionHeader
          className="mb-0 w-full"
          title={item.title}
          titleIcon={titleIcon}
          source={item.source}
          titleClassName="truncate text-[#1A0CAB] dark:text-[#8AB4F8]"
        />
      </div>

      <div className="flex gap-3">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.thumbnailAlt ?? item.title}
            className="h-[90px] w-[160px] flex-none rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            loading="lazy"
          />
        ) : null}

        <div className="min-w-0 flex-1 flex flex-col justify-between">
          {item.description ? (
            <div className="line-clamp-2 text-sm text-[#666]">
              {item.description}
            </div>
          ) : null}

          {item.breadcrumbs?.length || item.author || item.date ? (
            <div className="mt-2 flex min-w-0 items-center gap-3 text-[#666]">
              <BreadcrumbsLine breadcrumbs={item.breadcrumbs} />
              <span className="h-3 w-px flex-none bg-[#666]" aria-hidden="true" />
              <div className="flex flex-none items-center gap-2">
                <AuthorDate author={item.author} date={item.date} />
                {item.href ? (
                  <span className="flex-none text-[#007EFF]">
                    <ExternalLink className="h-3 w-3" />
                  </span>
                ) : null}
              </div>
            </div>
          ) : (
            <MetaLine meta={item.meta} />
          )}
        </div>
      </div>
    </div>
  );

  if (!interactiveHref && !handleClick) return content;

  return (
    <ItemInteractive
      href={interactiveHref}
      target={item.target}
      rel={item.rel}
      onClick={handleClick}
      className={clsx(
        "group block w-full rounded-xl border border-transparent px-6 py-3 text-left no-underline transition-colors",
        "hover:border-slate-200 hover:bg-slate-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        "dark:hover:border-slate-700 dark:hover:bg-slate-800/60 dark:focus-visible:ring-slate-600"
      )}
    >
      {content}
    </ItemInteractive>
  );
}
