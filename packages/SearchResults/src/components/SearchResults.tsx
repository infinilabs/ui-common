import clsx from "clsx";

import { renderSection } from "./internal/renderSection";

import type { SearchResultsProps } from "./types";

export function SearchResults({ section, className, onItemClick }: SearchResultsProps) {
  return <div className={clsx(className)}>{renderSection(section, onItemClick)}</div>;
}
