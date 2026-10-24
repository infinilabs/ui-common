/* ©INFINI, All Rights Reserved. */

// AiGeneratePanel — the requirement box for chain generation (#104):
// generate/refine mode, busy state, failure surface. Fully dumb UI: the
// product binds the actual /pipeline/ai-generate call (pipeline-api) and
// the follow-up dry-run validation; this panel owns only the interaction.

import { Sparkles, Wand2 } from "lucide-react";
import { Button, Input } from "./primitives";
import type { Translate } from "./schema-form";

const identity: Translate = (s) => s;

export function AiGeneratePanel({ value, onChange, mode, onModeChange, onRun, busy, error, canRefine, t }: {
  /** requirement text (controlled) */
  value: string;
  onChange: (v: string) => void;
  mode: "generate" | "refine";
  onModeChange: (m: "generate" | "refine") => void;
  /** fire the generation; the product chains its own dry-run validation */
  onRun: () => void;
  busy?: boolean;
  error?: string | null;
  /** refine needs a current chain — products disable the mode without one */
  canRefine?: boolean;
  t?: Translate;
}) {
  t = t ?? identity;
  return (
    <div className="flex flex-col gap-1.5 text-xs">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-violet-500" />
        <span className="font-medium">{t("AI 生成规则链")}</span>
        <div className="flex-1" />
        <label className={"flex cursor-pointer items-center gap-1 " + (canRefine === false ? "opacity-40" : "")}>
          <input
            type="radio"
            checked={mode === "refine"}
            disabled={canRefine === false}
            onChange={() => onModeChange("refine")}
            className="h-3 w-3 accent-violet-500"
          />
          {t("修改当前链")}
        </label>
        <label className="flex cursor-pointer items-center gap-1">
          <input
            type="radio"
            checked={mode === "generate"}
            onChange={() => onModeChange("generate")}
            className="h-3 w-3 accent-violet-500"
          />
          {t("重新生成")}
        </label>
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !busy && value.trim()) onRun();
        }}
        placeholder={t("用自然语言描述处理要求, 如: 提取日志级别和服务名, 丢弃健康检查")}
      />
      <div className="flex items-center gap-2">
        <Button variant="default" size="sm" onClick={onRun} disabled={busy || !value.trim()}>
          <Wand2 className="h-3 w-3" />
          {busy ? t("生成中…") : mode === "refine" ? t("按要求修改") : t("生成规则链")}
        </Button>
        {error && <span className="truncate text-[10px] text-red-600" title={error}>{error}</span>}
      </div>
    </div>
  );
}
