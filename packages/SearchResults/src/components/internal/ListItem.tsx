import { ExternalLink } from "lucide-react";

import { AuthorDate } from "./AuthorDate";
import { BreadcrumbsLine } from "./BreadcrumbsLine";
import { joinRel } from "./joinRel";
import { MetaLine } from "./MetaLine";
import { SectionHeader } from "./SectionHeader";
import { TitleInteractive } from "./TitleInteractive";
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

  return (
    <div className="w-full py-2">
      <div className="flex min-w-0 items-center gap-2">
        <TitleInteractive
          href={item.href}
          target={item.target}
          rel={item.rel}
          onClick={() => {
            item.onClick?.();
            onItemClick?.(item);
          }}
        >
          <SectionHeader
            className="mb-0 w-full"
            title={item.title}
            titleIcon={titleIcon}
            source={item.source}
            titleClassName="truncate text-[#1A0CAB]"
          />
        </TitleInteractive>
      </div>

      <div className="mt-2 flex gap-3">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.thumbnailAlt ?? item.title}
            className="h-[90px] w-[160px] flex-none rounded-lg object-cover ring-1 ring-slate-200"
            loading="lazy"
          />
        ) : (
          <div className="h-[90px] w-[160px] flex-none rounded-lg bg-slate-100 ring-1 ring-slate-200" />
        )}

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
                  <a
                    href={item.href}
                    target={item.target}
                    rel={joinRel(item.rel, item.target)}
                    className="flex-none text-[#007EFF] hover:text-[#007EFF]"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
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
}
