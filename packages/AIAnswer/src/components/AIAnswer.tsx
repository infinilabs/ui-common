import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { XMarkdown } from "@ant-design/x-markdown";
import { Sparkles } from "lucide-react";
import clsx from "clsx";

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
  containerClass?: string;
  headerClass?: string;
  titleClass?: string;
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
};

export function AIAnswer({
  title = "智能解读",
  content,
  maxHeight = 180,
  expandText = "展开更多",
  collapseText = "收起",
  continueLabel = "继续追问",
  theme = "auto",
  onContinue,
  containerClass,
  headerClass,
  titleClass,
  containerStyle,
  headerStyle,
  titleStyle,
}: AIAnswerProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const contentLen = useMemo(() => content?.trim().length ?? 0, [content]);
  const showToggle = contentLen > 280;
  const [collapsedState, setCollapsedState] = useState(() => showToggle);
  const [userInteracted, setUserInteracted] = useState(false);
  const collapsed = userInteracted ? collapsedState : showToggle;

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
  }, [content, maxHeight]);

  useMemo(() => {
    return collapsed ? expandText : collapseText;
  }, [collapsed, expandText, collapseText]);

  return (
    <div className={theme === "dark" ? "dark" : undefined}>
      <div
        className={clsx(
          "p-6 rounded-xl border border-[#EBEBEB] bg-white text-[#333] dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-200",
          containerClass
        )}
        style={containerStyle}
      >
        <div
          className={clsx("mb-4 flex items-center gap-2", headerClass)}
          style={headerStyle}
        >
          <Sparkles
            className="flex-none text-2xl text-[#1784FC]"
            fill="currentColor"
          />
          <span
            className={clsx(
              "font-semibold text-base text-[#19191A] dark:text-white",
              titleClass
            )}
            style={titleStyle}
          >
            {title}
          </span>
        </div>
        <div
          ref={bodyRef}
          className="relative overflow-hidden"
          style={{ maxHeight: collapsed ? maxHeight : "none" }}
        >
          <XMarkdown content={content} />
          {collapsed && showToggle ? (
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-white dark:to-[#0b1220]" />
          ) : null}
        </div>
        {showToggle ? (
          <AIExpandToggle
            collapsed={collapsed}
            expandText={expandText}
            collapseText={collapseText}
            onToggle={() => {
              setUserInteracted(true);
              setCollapsedState(!collapsed);
            }}
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
