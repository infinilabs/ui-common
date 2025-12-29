import clsx from "clsx";

import { ActionLink } from "./ActionLink";

import type { SearchResultsAction } from "../types";

export function SectionFooter({ action }: { action?: SearchResultsAction }) {
  if (!action) return null;
  return (
    <div className="mt-3 flex w-full items-center">
      <span className="h-px flex-1 bg-[#E8E8E8]" aria-hidden="true" />
      <ActionLink
        action={action}
        className={clsx(
          "rounded-full border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-medium text-[#333] transition",
          "hover:border-[#E8E8E8] hover:bg-[#F5F5F5]"
        )}
      />
      <span className="h-px flex-1 bg-[#E8E8E8]" aria-hidden="true" />
    </div>
  );
}
