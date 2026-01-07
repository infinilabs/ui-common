import { useState } from "react";
import { AIAnswer } from "@infinilabs/ai-answer";
import clsx from "clsx";

export default function AIAnswerDemo() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [streamContent, setStreamContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const isDark = theme === "dark";

  const staticContent = `这是一个使用 @ant-design/x-markdown 渲染的 AI 解读区域。

支持 280 字自动收起、半透明遮盖、展开/收起按钮、底部操作（复制、点赞、点踩、朗读），以及继续追问按钮。

这是一些更长的内容以触发自动收起：当文本超过 280 字时，会显示“展开更多”按钮，并在最后一行出现半透明遮盖以提示还有内容可以展开查看。

为更好地展示折叠效果，这里补充一段更长的说明：在 AI 解读场景中，我们通常需要对长文本进行合理的分页或折叠，以保证信息密度与阅读体验的平衡。折叠区域在收起状态下仅展示指定高度，并通过半透明渐变提示用户仍有更多内容可供展开。点击“展开更多”后，全文内容将完全显示；再次点击可收起。

另外，底部的操作按钮提供复制、点赞、点踩与朗读等常用交互，适用于反馈质量、辅助阅读、与内容快速复用等场景。复制操作会显示对号反馈；朗读在未提供自定义方法时使用浏览器内置的 SpeechSynthesis 作为兜底能力（部分浏览器需要用户交互才能生效）。`;

  const startStreaming = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamContent("");
    let index = 0;
    const interval = setInterval(() => {
      index += 5;
      setStreamContent(staticContent.slice(0, index));
      if (index >= staticContent.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 50);
  };


  return (
    <div className={clsx(isDark && "dark")}>
      <div
        className={clsx(
          "space-y-6 rounded-xl border p-6 transition-colors",
          isDark ? "border-slate-800 bg-slate-950 text-slate-100" : "border-slate-200 bg-white text-slate-900"
        )}
      >
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={startStreaming}
          disabled={isStreaming}
          className={clsx(
            "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition",
            isStreaming
              ? "cursor-not-allowed opacity-50 bg-slate-100 text-slate-400 border-slate-200"
              : isDark
              ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 focus-visible:ring-slate-600"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300",
            "focus:outline-none focus-visible:ring-2"
          )}
        >
          {isStreaming ? "正在生成..." : "模拟流式输出"}
        </button>

        <button
          type="button"
          aria-pressed={isDark}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={clsx(
            "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition",
            isDark
              ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 focus-visible:ring-slate-600"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300",
            "focus:outline-none focus-visible:ring-2"
          )}
        >
          切换到{isDark ? "浅色" : "深色"}
        </button>
      </div>

      <AIAnswer
        title="智能解读"
        content={streamContent || staticContent}
        expandText="展开更多"
        collapseText="收起"
        continueLabel="继续追问"
        theme={theme}
        onContinue={() => window.alert("继续追问")}
      />
      </div>
    </div>
  );
}
