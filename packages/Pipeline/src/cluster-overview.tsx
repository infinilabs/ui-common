/* ©INFINI, All Rights Reserved. */

// ClusterOverview — fleet view: deployment matrix (desired vs reported per
// instance) plus cluster-wide stage totals. Data via props callbacks; the
// host binds GET /pipeline/cluster/overview and GET /pipeline/cluster/stages
// (both served by the framework pipeline module).

import { useCallback, useEffect, useState } from "react";
import { Gauge, Layers, RefreshCw } from "lucide-react";
import { Button } from "./primitives";
import { TContext, useT, identityTranslate, type Translate } from "./i18n";

// ── API mirror (framework modules/pipeline) ──────────────────────────────

export interface ClusterInstanceReport {
  instance_id: string;
  state: string; // running | stopped | failed | unknown
  version: number;
  last_seen: string;
  reason?: string;
  cordoned?: boolean;
}

export interface ClusterDeploymentStatus {
  deployment_id: string;
  version: number;
  instances: ClusterInstanceReport[];
  desired_count: number;
  ready_count: number;
  // staged-delivery progress (#125): present while a rollout is (or was)
  // active — rolled lists the instances already on the staged content
  rollout?: { active: boolean; digest?: string; rolled?: string[] } | null;
}

export interface ClusterDeploymentRow {
  deployment: string;
  pipeline: string;
  strategy: string;
  version: number;
  selector?: Record<string, string>;
  status?: ClusterDeploymentStatus | null;
}

export interface ClusterStageStatRow {
  pipeline: string;
  stage: string;
  carrier: string;
  count: number;
  errors: number;
  avg_latency_ns: number;
  // per-instance latest tick — the aggregate must equal the sum of these
  per_instance?: Record<string, { count: number; errors: number; avg_latency_ns: number }>;
}

export interface ClusterOverviewProps {
  fetchOverview: () => Promise<{ deployments: ClusterDeploymentRow[] }>;
  // optional: omit to render only the deployment matrix
  fetchStages?: (pipeline?: string) => Promise<{ stages: ClusterStageStatRow[] }>;
  // navigate to the pipeline's detail when a row is clicked
  onPipelineClick?: (pipelineId: string) => void;
  // auto-refresh interval; 0 disables (default 10s)
  refreshMs?: number;
  // i18n 注入 (缺省恒等)
  t?: Translate;
}

export function ClusterOverview(props: ClusterOverviewProps) {
  return (
    <TContext.Provider value={props.t ?? identityTranslate}>
      <ClusterOverviewInner {...props} />
    </TContext.Provider>
  );
}

function ClusterOverviewInner({ fetchOverview, fetchStages, onPipelineClick, refreshMs = 10000 }: ClusterOverviewProps) {
  const __t = useT();
  const [deployments, setDeployments] = useState<ClusterDeploymentRow[] | null>(null);
  const [stages, setStages] = useState<ClusterStageStatRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true); setError(null);
    const jobs: Promise<void>[] = [
      fetchOverview()
        .then((d) => setDeployments(d.deployments ?? []))
        .catch((e) => { throw e; }),
    ];
    if (fetchStages) {
      jobs.push(
        fetchStages()
          .then((s) => setStages(s.stages ?? []))
          .catch(() => setStages([])), // stage totals are supplementary
      );
    }
    Promise.all(jobs)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [fetchOverview, fetchStages]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!refreshMs) return;
    const timer = setInterval(load, refreshMs);
    return () => clearInterval(timer);
  }, [load, refreshMs]);

  const stateCls = (s: string) =>
    s === "running" ? "bg-emerald-100 text-emerald-700"
      : s === "failed" ? "bg-red-100 text-red-700"
        : s === "stopped" ? "bg-slate-200 text-slate-600"
          : "bg-amber-100 text-amber-700";

  const fmtNs = (ns: number) => {
    if (!ns || ns <= 0) return "—";
    if (ns < 1_000_000) return `${(ns / 1000).toFixed(1)}µs`;
    if (ns < 1_000_000_000) return `${(ns / 1_000_000).toFixed(1)}ms`;
    return `${(ns / 1_000_000_000).toFixed(2)}s`;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h4 className="text-xs font-semibold flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" />{__t("集群总览")}</h4>
        <div className="flex-1" />
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={load} disabled={loading} title={__t("刷新")}>
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {error && <p className="text-xs text-red-600">{__t("加载失败")}: {error}</p>}

      {/* deployment matrix */}
      <div className="rounded border divide-y">
        <div className="px-2 py-1.5 flex items-center gap-2 text-[10px] font-semibold text-muted-foreground">
          <span className="flex-1">{__t("部署")}</span>
          <span className="w-28">{__t("策略")}</span>
          <span className="w-14 text-right">{__t("版本")}</span>
          <span className="w-20 text-right">{__t("就绪")}</span>
          <span className="w-64">{__t("实例")}</span>
        </div>
        {deployments && deployments.map((d) => {
          const ready = d.status?.ready_count ?? 0;
          const desired = d.status?.desired_count ?? 0;
          const rollout = d.status?.rollout;
          const rolled = rollout?.rolled?.length ?? 0;
          return (
            <div key={d.deployment} className="px-2 py-1.5 flex items-center gap-2 text-xs">
              <span className="flex-1 min-w-0 flex items-center gap-1">
                <button
                  className={`truncate text-left font-mono ${onPipelineClick ? "text-blue-600 hover:underline" : ""}`}
                  title={d.pipeline}
                  onClick={() => onPipelineClick?.(d.pipeline)}>
                  {d.pipeline}
                </button>
                <span className="text-[9px] text-muted-foreground truncate">{d.deployment}</span>
                {rollout?.active && (
                  <span
                    className="rounded bg-violet-100 px-1 text-[9px] font-mono text-violet-700"
                    title={__t("灰度发布进行中 — 已推送到部分实例，等待其确认运行新内容后继续推进（canary → 批次）")}>
                    {__t("灰度")} {rolled}/{desired}
                  </span>
                )}
              </span>
              <span className="w-28 text-[10px] font-mono text-slate-500">{d.strategy || "all"}</span>
              <span className="w-14 text-right text-[10px] font-mono text-slate-500" title={`${d.status?.version ?? d.version}`}>v{d.status?.version ?? d.version}</span>
              <span className={`w-20 text-right text-[10px] font-mono ${ready > 0 && ready < desired ? "text-amber-600" : ready === 0 ? "text-red-600" : "text-emerald-600"}`}>
                {ready}/{desired}
              </span>
              <span className="w-64 flex flex-wrap gap-1">
                {(d.status?.instances ?? []).map((i) => (
                  <span
                    key={i.instance_id}
                    className={`rounded px-1 text-[9px] font-mono ${stateCls(i.state)}`}
                    title={`${i.instance_id} · v${i.version} · ${i.last_seen}${i.cordoned ? `\n${__t("已封闸 (cordon): 在跑任务排空后停, 不再启动新任务")}` : ""}${i.reason ? `\n${i.reason}` : ""}`}>
                    {i.instance_id}{i.cordoned ? " ⊘" : ""}{i.state !== "running" ? ` (${i.state})` : ""}
                  </span>
                ))}
                {(d.status?.instances?.length ?? 0) === 0 && (
                  <span className="text-[9px] text-muted-foreground">{__t("暂无实例上报")}</span>
                )}
              </span>
            </div>
          );
        })}
        {deployments && deployments.length === 0 && (
          <p className="px-2 py-2 text-xs text-muted-foreground">{__t("暂无部署")}</p>
        )}
        {!deployments && <p className="px-2 py-2 text-xs text-muted-foreground">…</p>}
      </div>

      {/* cluster stage totals */}
      {fetchStages && (
        <div className="rounded border divide-y">
          <div className="px-2 py-1.5 flex items-center gap-2 text-[10px] font-semibold text-muted-foreground">
            <Gauge className="h-3 w-3" />{__t("阶段指标 (集群)")}
          </div>
          {stages && stages.map((s, idx) => (
            <div key={`${s.pipeline}/${s.stage}`} className={`px-2 py-1 flex items-center gap-2 text-[10px] font-mono ${idx % 2 ? "bg-slate-50/60" : ""}`}>
              <span className="w-40 truncate" title={`${s.pipeline} / ${s.stage}`}>{s.pipeline} / {s.stage}</span>
              <span className="w-20 text-right text-slate-500">{s.count} {__t("次")}</span>
              <span className={`w-16 text-right ${s.errors > 0 ? "text-red-600 font-semibold" : "text-slate-400"}`}>{s.errors} {__t("错")}</span>
              <span className="w-16 text-right text-slate-500" title={__t("平均耗时 (调用加权)")}>{fmtNs(s.avg_latency_ns)}</span>
              <span
                className="flex-1 min-w-0 truncate text-[9px] text-muted-foreground"
                title={__t("各实例最新一拍 — 集群合计应等于各实例之和")}>
                {Object.entries(s.per_instance ?? {})
                  .map(([inst, v]) => `${inst}: ${v.count}`)
                  .join(" · ")}
              </span>
            </div>
          ))}
          {stages && stages.length === 0 && (
            <p className="px-2 py-2 text-xs text-muted-foreground">{__t("暂无阶段指标")}</p>
          )}
          {!stages && <p className="px-2 py-2 text-xs text-muted-foreground">…</p>}
        </div>
      )}
    </div>
  );
}
