/* ©INFINI, All Rights Reserved. */

// PipelineRuntime — 单条运行管线的运行时详情: 阶段指标 (stages) + 失败轨迹 (flight)。
// 经反向通道代理到实例的新观测端点 (framework 统一能力, 网关重建即得)。

import { useCallback, useEffect, useState } from "react";
import { Gauge, RefreshCw, Zap } from "lucide-react";
import { Button } from "./primitives";
import { TContext, useT, identityTranslate, type Translate } from "./i18n";
// Data via props callback — product adapter fetches

export interface StageRow {
  stage?: string;
  carrier?: string;
  count?: number;
  errors?: number;
  avg_latency_ns?: number;
}

export interface FlightEvent {
  trace_id?: string;
  step?: number;
  processor?: string;
  outcome?: string;
  err?: string;
  duration?: number;
}

export interface PipelineRuntimeProps {
  fetchData: () => Promise<{ stages: StageRow[]; flight: FlightEvent[] }>;
  pipeline: string;
  // lets the host navigate to the logs tab filtered by trace_id
  onTraceClick?: (traceId: string) => void;
  // i18n 注入 (缺省恒等): 共享键与 logpilot 本地版 pipeline-runtime 一致,
  // 产品切换到包版本时现有词条直接命中。
  t?: Translate;
}

export function PipelineRuntime(props: PipelineRuntimeProps) {
  return (
    <TContext.Provider value={props.t ?? identityTranslate}>
      <PipelineRuntimeInner {...props} />
    </TContext.Provider>
  );
}

function PipelineRuntimeInner({ fetchData, pipeline, onTraceClick }: PipelineRuntimeProps) {
  const __t = useT();
  const [stages, setStages] = useState<StageRow[] | null>(null);
  const [flight, setFlight] = useState<FlightEvent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true); setError(null);
    fetchData()
      .then((data) => {
        setStages(data.stages ?? []);
        setFlight(data.flight ?? []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [fetchData]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const t = setInterval(load, 10000); // 10s 自动刷新
    return () => clearInterval(t);
  }, [load]);

  const fmtNs = (ns?: number) => {
    if (!ns || ns <= 0) return "—";
    if (ns < 1_000_000) return `${(ns / 1000).toFixed(1)}µs`;
    if (ns < 1_000_000_000) return `${(ns / 1_000_000).toFixed(1)}ms`;
    return `${(ns / 1_000_000_000).toFixed(2)}s`;
  };

  const procStages = (stages ?? []).filter((s) => s.carrier === "processor");
  const laneStages = (stages ?? []).filter((s) => s.carrier !== "processor");

  return (
    <div className="rounded border bg-slate-50/50 px-2 py-2 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h5 className="text-[10px] font-semibold flex items-center gap-1"><Gauge className="h-3 w-3" />{__t("运行时 · {pipeline}", { pipeline })}</h5>
        <div className="flex-1" />
        <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={load} disabled={loading} title={__t("刷新")}>
          <RefreshCw className={`h-2.5 w-2.5 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>
      {error && <p className="text-[10px] text-red-600">{error}</p>}
      {stages && (
        <div className="grid gap-1">
          {procStages.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
              <span className="w-32 truncate" title={s.stage}>{s.stage}</span>
              <span className="w-14 text-right text-slate-500">{s.count ?? 0} {__t("次")}</span>
              <span className="w-14 text-right text-slate-500">{fmtNs(s.avg_latency_ns)}</span>
              <span className={`w-10 text-right ${(s.errors ?? 0) > 0 ? "text-red-600 font-semibold" : "text-slate-400"}`}>{s.errors ?? 0} {__t("错")}</span>
            </div>
          ))}
          {laneStages.length > 0 && (
            <div className="text-[10px] text-slate-500 pt-1 border-t">
              {__t("通道:")}{laneStages.map((s) => `${s.stage}(${s.count ?? 0})`).join(", ")}
            </div>
          )}
          {procStages.length === 0 && laneStages.length === 0 && <p className="text-[10px] text-muted-foreground">{__t("暂无指标")}</p>}
        </div>
      )}
      {flight && flight.length > 0 && (
        <div className="flex flex-col gap-0.5 border-t pt-1">
          <h6 className="text-[10px] font-semibold flex items-center gap-1 text-red-700"><Zap className="h-3 w-3" />{__t("近期失败")} ({flight.length})</h6>
          {flight.slice(0, 5).map((e, i) => (
            <div key={i} className="text-[10px] font-mono text-red-600 truncate flex items-center gap-1">
              {e.trace_id && onTraceClick && (
                <button
                  className="text-blue-600 hover:underline font-semibold shrink-0"
                  onClick={() => onTraceClick(e.trace_id!)}
                  title={__t("查看此记录的日志")}>
                  [tr]
                </button>
              )}
              <span className="truncate" title={e.err}>#{e.step} {e.processor}: {e.err}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
