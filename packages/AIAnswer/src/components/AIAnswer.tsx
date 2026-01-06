import { useEffect, useMemo, useRef, useState } from "react";
import { XMarkdown } from "@ant-design/x-markdown";
import { Sparkles } from "lucide-react";

import { AIContinueButton } from "./AIContinueButton";
import { AIExpandToggle } from "./AIExpandToggle";
import { AIAnswerActions } from "./AIAnswerActions";

export type AIAnswerProps = {
  title?: string;
  content: string;
  maxHeight?: number;
  expandText?: string;
  collapseText?: string;
  continueLabel?: string;
  theme?: "light" | "dark" | "auto";
  onContinue?: () => void;
};

export function AIAnswer({
  title = "智能解读",
  content,
  maxHeight = 180,
  expandText = "展开更多",
  collapseText = "收起",
  continueLabel = "继续追问",
  theme = "auto",
  onContinue
}: AIAnswerProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(() => (content?.trim().length ?? 0) > 280);
  const showToggle = (content?.trim().length ?? 0) > 280;

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
  }, [content, maxHeight]);

  useMemo(() => {
    return collapsed ? expandText : collapseText;
  }, [collapsed, expandText, collapseText]);

  const isDark = theme === "dark";
  const isLight = theme === "light";
  const containerClass = isDark
    ? "p-6 rounded-xl border border-slate-700 bg-[#0b1220] text-slate-200"
    : isLight
    ? "p-6 rounded-xl border border-[#EBEBEB] bg-white text-[#333]"
    : "p-6 rounded-xl border border-[#EBEBEB] bg-white text-[#333] dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-200";
  const overlayClass = isDark
    ? "absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-[#0b1220]"
    : isLight
    ? "absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-white"
    : "absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-white dark:to-[#0b1220]";
  const titleClass = isDark
    ? "font-semibold text-base text-white"
    : isLight
    ? "font-semibold text-base text-[#19191A]"
    : "font-semibold text-base text-[#19191A] dark:text-white";
  return (
    <div>
      <div className={containerClass}>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="flex-none text-2xl text-[#1784FC]" />
        <span className={titleClass}>{title}</span>
      </div>
      <div
        ref={bodyRef}
        className="relative overflow-hidden"
        style={{ maxHeight: collapsed ? maxHeight : "none" }}
      >
        <XMarkdown content={content} />
        {collapsed && showToggle ? (
          <div className={overlayClass} />
        ) : null}
      </div>
      {showToggle ? (
        <AIExpandToggle
          collapsed={collapsed}
          expandText={expandText}
          collapseText={collapseText}
          onToggle={() => setCollapsed(!collapsed)}
        />
      ) : null}
      <div className="mt-3 flex items-center justify-between">
        <AIAnswerActions
          copyText={content}
          onCopy={() => {}}
          onLike={() => {}}
          onDislike={() => {}}
          onSpeak={() => {}}
          theme={theme}
        />
        <AIContinueButton label={continueLabel} onClick={onContinue} />
      </div>
      </div>
    </div>
  );
}
