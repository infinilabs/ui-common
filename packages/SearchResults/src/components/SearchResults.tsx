import React from "react";
import clsx from "clsx";

import { itemsToSections } from "./internal/itemsToSections";
import { recordsToItems } from "./internal/recordsToItems";
import { renderSection } from "./internal/renderSection";

import type { SearchResultsProps } from "./types";

export function SearchResults({
  sections,
  items,
  records,
  imageGridColumns,
  className,
  onItemClick
}: SearchResultsProps) {
  const resolvedItems = items ?? (records?.length ? recordsToItems(records) : undefined);
  const resolvedSections =
    sections ?? (resolvedItems?.length ? itemsToSections(resolvedItems, imageGridColumns) : []);

  return (
    <div className={clsx("space-y-5", className)}>
      {resolvedSections.map((section, index) => (
        <React.Fragment key={`${section.type}-${index}`}>
          {renderSection(section, onItemClick)}
        </React.Fragment>
      ))}
    </div>
  );
}

