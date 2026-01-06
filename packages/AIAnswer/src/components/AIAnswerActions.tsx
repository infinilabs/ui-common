import { useEffect, useState } from "react";
import { Copy, Check, ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";

export type AIAnswerActionsProps = {
  copyText?: string;
  onCopy?: (text: string) => void;
  onLike?: (liked: boolean) => void;
  onDislike?: (disliked: boolean) => void;
  onSpeak?: () => void;
  theme?: "light" | "dark" | "auto";
};

export function AIAnswerActions({
  copyText = "",
  onCopy,
  onLike,
  onDislike,
  onSpeak,
  theme = "auto"
}: AIAnswerActionsProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likePulse, setLikePulse] = useState(false);
  const [dislikePulse, setDislikePulse] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseBtnClass = "inline-flex p-1 items-center justify-center rounded bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300";
  const defaultBtnClass = theme === "dark"
    ? "text-slate-300 hover:bg-slate-800 focus-visible:ring-slate-600"
    : theme === "light"
    ? "text-[#666] hover:bg-slate-50"
    : "text-[#666] hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-600";
  
  const activeBtnClass = "text-[#1677ff]";

  useEffect(() => {
    if (likePulse) {
      const t = setTimeout(() => setLikePulse(false), 220);
      return () => clearTimeout(t);
    }
  }, [likePulse]);

  useEffect(() => {
    if (dislikePulse) {
      const t = setTimeout(() => setDislikePulse(false), 220);
      return () => clearTimeout(t);
    }
  }, [dislikePulse]);
  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 1200);
      return () => clearTimeout(t);
    }
  }, [copied]);

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className={`${baseBtnClass} ${defaultBtnClass}`}
        onClick={async () => {
          try {
            if (copyText) await navigator.clipboard.writeText(copyText);
            onCopy?.(copyText);
          } catch {
            onCopy?.(copyText);
          }
          setCopied(true);
        }}
      >
        {copied ? <Check className="h-4 w-4 text-[#1677ff]" /> : <Copy className="h-4 w-4" />}
      </button>

      <button
        type="button"
        className={`${baseBtnClass} ${
          liked ? activeBtnClass : defaultBtnClass
        } transition-transform ${
          likePulse ? "scale-110" : "scale-100"
        }`}
        onClick={() => {
          const next = !liked;
          setLiked(next);
          setDisliked(false);
          setLikePulse(true);
          onLike?.(next);
        }}
      >
        <ThumbsUp className="h-4 w-4" />
      </button>

      <button
        type="button"
        className={`${baseBtnClass} ${
          disliked ? activeBtnClass : defaultBtnClass
        } transition-transform ${
          dislikePulse ? "scale-110" : "scale-100"
        }`}
        onClick={() => {
          const next = !disliked;
          setDisliked(next);
          setLiked(false);
          setDislikePulse(true);
          onDislike?.(next);
        }}
      >
        <ThumbsDown className="h-4 w-4" />
      </button>

      <button
        type="button"
        className={`${baseBtnClass} ${defaultBtnClass}`}
        onClick={() => {
          if (onSpeak) {
            onSpeak();
            return;
          }
          const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
          if (synth) {
            try {
              const utter = new SpeechSynthesisUtterance(copyText || "");
              synth.cancel();
              synth.speak(utter);
            } catch {
              // ignore
            }
          }
        }}
      >
        <Volume2 className="h-4 w-4" />
      </button>
    </div>
  );
}
