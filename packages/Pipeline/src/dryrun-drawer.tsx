/* ©INFINI, All Rights Reserved. */

// DryRunDrawer — render the unified dry-run Report (#104): compile phase,
// per-sample × per-step outcomes with field diffs, and captured side
// effects. Data via props (the product fetched it through pipeline-api);
// zero product dependencies.

import { useState } from "react";
import { AlertTriangle, CheckCircle2, CircleSlash, Clock, X } from "lucide-react";
import type { DryRunReport, StepResult } from "./pipeline-api";
import { Badge } from "./primitives";
import type { Translate } from "./schema-form";

const identity: Translate = (s) => s;

function DiffKeys({ diff }: { diff: StepResult["diff"] }) {
  const parts: { mark: string; cls: string; keys: string[] }[] = [
    { mark: "+", cls: "text-green-600", keys: Object.keys(diff.added ?? {}) },
    { mark: "-", cls: "text-red-600", keys: Object.keys(diff.removed ?? {}) },
    { mark: "~", cls: "text-amber-600", keys: Object.keys(diff.changed ?? {}) }
  ].filter((p) => p.keys.length > 0);
  if (parts.length === 0) return <span className="text-[10px] text-gray-400">no field changes</span>;
  return (
    <span className="flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[10px]">
      {parts.map((p) => (
        <span key={p.mark} className={p.cls}>
          {p.keys.map((k) => (
            <span key={k} className="mr-1">
              {p.mark}
              {k}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function OutcomeIcon({ outcome }: { outcome: StepResult["outcome"] }) {
  if (outcome === "ok") return <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />;
  if (outcome === "dropped") return <CircleSlash className="h-3.5 w-3.5 text-gray-400" />;
  return <AlertTriangle className="h-3.5 w-3.5 text-red-600" />;
}

export function DryRunDrawer({ report, onClose, t }: {
  report: DryRunReport | null;
  onClose?: () => void;
  t?: Translate;
}) {
  t = t ?? identity;
  const [sampleIdx, setSampleIdx] = useState(0);
  if (!report) return null;

  const badCompile = (report.compiled ?? []).filter((c) => !c.ok);
  const samples = report.steps ?? [];
  const current = samples[Math.min(sampleIdx, Math.max(0, samples.length - 1))] ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 text-xs">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold">Dry-run</h4>
        {badCompile.length === 0 ? (
          <Badge className="border-green-200 text-green-700">{t("编译通过")} · {(report.compiled ?? []).length}</Badge>
        ) : (
          <Badge className="border-red-200 text-red-700">{t("编译失败")} · {badCompile.length}</Badge>
        )}
        <div className="flex-1" />
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700" title={t("关闭")}>
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {badCompile.map((c) => (
        <div key={c.step} className="rounded border border-red-200 bg-red-50 px-2 py-1 font-mono text-[10px] text-red-700">
          {c.processor}: {c.note}
        </div>
      ))}

      {samples.length > 1 && (
        <div className="flex flex-wrap gap-1">
          {samples.map((_, i) => (
            <button
              key={i}
              onClick={() => setSampleIdx(i)}
              className={
                "rounded border px-1.5 py-0.5 text-[10px] " +
                (i === sampleIdx ? "border-gray-800 bg-gray-800 text-white" : "border-gray-200 text-gray-600 hover:bg-gray-50")
              }
            >
              sample {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-1 overflow-auto">
        {current.length === 0 && <p className="py-2 text-center text-gray-400">{t("无执行步骤")}</p>}
        {current.map((s) => (
          <div key={s.step} className="rounded border px-2 py-1.5">
            <div className="flex items-center gap-1.5">
              <OutcomeIcon outcome={s.outcome} />
              <span className="font-mono font-medium">{s.processor}</span>
              <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                <Clock className="h-3 w-3" />
                {s.duration_ms}ms
              </span>
              <div className="flex-1" />
              <DiffKeys diff={s.diff} />
            </div>
            {s.err && <p className="mt-1 font-mono text-[10px] text-red-600">{s.err}</p>}
          </div>
        ))}
      </div>

      {(report.side_effects ?? []).length > 0 && (
        <div className="shrink-0 rounded border border-amber-200 bg-amber-50 px-2 py-1">
          <p className="text-[10px] text-amber-700">
            {t("已捕获副作用(未真实投递)")} · {report.side_effects.length}
          </p>
          <ul className="mt-0.5 font-mono text-[10px] text-amber-800">
            {report.side_effects.slice(0, 5).map((w, i) => (
              <li key={i}>
                {w.kind ?? "write"} → {w.target ?? "?"}
              </li>
            ))}
            {report.side_effects.length > 5 && <li>…</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
