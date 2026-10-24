/* ©INFINI, All Rights Reserved. */

// InjectDialog — 向实例的运行管线注入测试样本。
// POST /pipeline/task/:id/_inject 经反向通道代理; 样本明文直传(双模式 raw)。

import { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "./primitives";
import { TContext, useT, identityTranslate, type Translate } from "./i18n";
// Data via props callback

export interface InjectDialogProps {
  pipeline: string;
  onInject: (samples: string[], queue?: string) => Promise<number>;
  onClose: () => void;
  // i18n 注入 (缺省恒等): 键与 logpilot 本地版 inject-dialog 完全一致,
  // 产品切换到包版本时现有词条直接命中。
  t?: Translate;
}

export function InjectDialog(props: InjectDialogProps) {
  return (
    <TContext.Provider value={props.t ?? identityTranslate}>
      <InjectDialogInner {...props} />
    </TContext.Provider>
  );
}

function InjectDialogInner({ pipeline, onInject, onClose }: InjectDialogProps) {
  const __t = useT();
  const [samples, setSamples] = useState("");
  const [queue, setQueue] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inject = async () => {
    const lines = samples.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return;
    setBusy(true); setError(null); setResult(null);
    try {
      // wrap each line as an otel envelope (same as dry-run samples)
      const samplePayload = lines.map((line) => ({
        raw: JSON.stringify({ payload: { message: line } }),
        codec: "otel",
      }));
      const body = queue.trim()
        ? { queue: queue.trim(), samples: samplePayload }
        : { samples: samplePayload };
      const count = await onInject(lines, queue.trim() || undefined);
      setResult(__t("注入 {v0} 条 → {v1}", { v0: count, v1: queue.trim() || __t("默认队列") }));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl border max-w-lg w-full mx-4 p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">{__t("注入测试样本")}</h3>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          {__t("管线")}<span className="font-mono font-semibold">{pipeline}</span> {__t("— 每行一条样本，直接进入输入队列。")}
        </p>
        <textarea
          className="w-full h-32 rounded border p-2 text-xs font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder={"192.168.1.100 - - [14/Oct/2026] \"GET /api HTTP/1.1\" 200 512\nERROR connection refused to database"}
          value={samples} onChange={(e) => setSamples(e.target.value)} />
        <input
          className="w-full rounded border px-2 py-1.5 text-xs font-mono mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder={__t("目标队列 (可选 — 留空用管线默认)")}
          value={queue} onChange={(e) => setQueue(e.target.value)} />
        {result && <p className="text-xs text-green-600 mt-2">{result}</p>}
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        <div className="flex justify-end gap-2 mt-3">
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onClose}>{__t("取消")}</Button>
          <Button size="sm" className="h-7 text-xs" disabled={busy || samples.trim().length === 0} onClick={inject}>
            <Send className="h-3 w-3 mr-1" />{busy ? __t("注入中…") : __t("注入 {length} 条", { length: samples.split("\n").filter((l) => l.trim()).length })}
          </Button>
        </div>
      </div>
    </div>
  );
}
