/* ©INFINI, All Rights Reserved. */

// InjectDialog — 向实例的运行管线注入测试样本。
// POST /pipeline/task/:id/_inject 经反向通道代理; 样本明文直传(双模式 raw)。

import { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// Data via props callback

export function InjectDialog({ pipeline, onInject, onClose }: {
  pipeline: string;
  onInject: (samples: string[], queue?: string) => Promise<number>;
  onClose: () => void;
}) {
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
      setResult(`注入 ${count} 条 → ${queue.trim() || "默认队列"}`);
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
          <h3 className="text-sm font-semibold">注入测试样本</h3>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          管线 <span className="font-mono font-semibold">{pipeline}</span> — 每行一条样本，直接进入输入队列。
        </p>
        <textarea
          className="w-full h-32 rounded border p-2 text-xs font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder={"192.168.1.100 - - [14/Oct/2026] \"GET /api HTTP/1.1\" 200 512\nERROR connection refused to database"}
          value={samples} onChange={(e) => setSamples(e.target.value)} />
        <input
          className="w-full rounded border px-2 py-1.5 text-xs font-mono mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder="目标队列 (可选 — 留空用管线默认)"
          value={queue} onChange={(e) => setQueue(e.target.value)} />
        {result && <p className="text-xs text-green-600 mt-2">{result}</p>}
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        <div className="flex justify-end gap-2 mt-3">
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onClose}>取消</Button>
          <Button size="sm" className="h-7 text-xs" disabled={busy || samples.trim().length === 0} onClick={inject}>
            <Send className="h-3 w-3 mr-1" />{busy ? "注入中…" : `注入 ${samples.split("\n").filter((l) => l.trim()).length} 条`}
          </Button>
        </div>
      </div>
    </div>
  );
}
