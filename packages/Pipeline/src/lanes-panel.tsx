/* ©INFINI, All Rights Reserved. */

// LanesPanel — 实例的进程内通道 (lane) 总览: 深度/投递/丢弃/溢写/阻塞等待。
// GET /pipeline/lanes 经反向通道代理。

import { useCallback, useEffect } from "react";
import { Waves, RefreshCw } from "lucide-react";
import { Button } from "./primitives";
// Data via props

export interface LaneStat {
  name?: string; namespace?: string; owner?: string;
  capacity?: number; depth?: number;
  emitted?: number; delivered?: number;
  drops?: number; spills?: number; blocked_waits?: number; closed?: boolean;
}

export function LanesPanel({ lanes, onRefresh }: {
  lanes: LaneStat[] | null;
  onRefresh?: () => void;
}) {

  const load = useCallback(() => {
    if (onRefresh) onRefresh();
  }, [onRefresh]);

  useEffect(() => { load(); }, [load]);

  const depthPct = (l: LaneStat) => {
    const cap = l.capacity ?? 1;
    return Math.min(100, Math.round(((l.depth ?? 0) / cap) * 100));
  };
  const barColor = (pct: number) => (pct >= 85 ? "bg-red-500" : pct >= 60 ? "bg-amber-400" : "bg-green-500");

  return (
    <div className="h-full min-h-0 flex flex-col gap-2">
      <div className="flex items-center gap-2 shrink-0">
        <h4 className="text-xs font-semibold flex items-center gap-1.5"><Waves className="h-3.5 w-3.5" />内存通道</h4>
        <span className="text-[10px] text-muted-foreground">(lane · 深度/背压)</span>
        <div className="flex-1" />
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={load} title="刷新">
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
      {lanes && (
        <div className="rounded border divide-y">
          {lanes.map((l, i) => {
            const pct = depthPct(l);
            return (
              <div key={i} className="px-2 py-1.5 flex items-center gap-2 text-xs">
                <span className="font-mono w-36 truncate" title={l.name}>{l.name}</span>
                <span className="text-[9px] text-muted-foreground w-16 truncate hidden md:inline">{l.namespace || "通用"}</span>
                <div className="flex-1 h-1.5 rounded bg-slate-100 overflow-hidden min-w-16" title={`${l.depth}/${l.capacity}`}>
                  <div className={`h-full ${barColor(pct)}`} style={{ width: `${Math.max(2, pct)}%` }} />
                </div>
                <span className="text-[9px] text-slate-500 w-20 text-right">{l.depth}/{l.capacity}</span>
                <span className="text-[9px] text-slate-500 w-16 text-right hidden lg:inline" title="已投递">{l.delivered ?? 0} 递</span>
                {(l.drops ?? 0) > 0 && <span className="text-[9px] text-amber-600" title="丢弃">{l.drops}丢</span>}
                {(l.spills ?? 0) > 0 && <span className="text-[9px] text-amber-600" title="溢写降级">{l.spills}溢</span>}
                {(l.blocked_waits ?? 0) > 0 && <span className="text-[9px] text-blue-600" title="阻塞等待次数">{l.blocked_waits}阻</span>}
              </div>
            );
          })}
          {lanes.length === 0 && <p className="px-2 py-2 text-xs text-muted-foreground">实例暂无 lane (未配置通道或旧版网关)</p>}
        </div>
      )}
      {!lanes && <p className="text-xs text-muted-foreground py-2 text-center">无 lane 数据</p>}
    </div>
  );
}
