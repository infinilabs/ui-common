import clsx from "clsx";

import { joinRel } from "./joinRel";

import type { SearchResultsAction } from "../types";

export function ActionLink({
  action,
  className
}: {
  action: SearchResultsAction;
  className?: string;
}) {
  const actionClassName = clsx(
    "flex-none inline-flex items-center justify-center rounded-full border border-slate-200 bg-white",
    "h-9 px-12 text-sm font-medium text-slate-700 no-underline transition",
    "cursor-pointer hover:border-slate-300 hover:bg-slate-50 hover:no-underline",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
    "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-600",
    className
  );

  if (action.href) {
    return (
      <a
        className={actionClassName}
        href={action.href}
        target={action.target}
        rel={joinRel(action.rel, action.target)}
        onClick={() => action.onClick?.()}
      >
        {action.label}
      </a>
    );
  }

  return (
    <button className={actionClassName} type="button" onClick={action.onClick}>
      {action.label}
    </button>
  );
}
