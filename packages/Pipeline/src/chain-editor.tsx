/* ©INFINI, All Rights Reserved. */

// PipelineChainEditor — 轻量管道处理器链编辑器
// 双数据源: 实例代理提供可用处理器列表, Logpilot 本地文档层提供中文描述/参数说明。
// 支持从处理器面板点选添加 + JSON 手动编辑 + 悬停查看描述。

import { useEffect, useState } from "react";
import { Braces, ChevronDown, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// No API imports — all data via props

// Instance catalog: what processors are actually available on the target
type CatalogType = Record<string, Record<string, {
  properties?: Record<string, { type?: string; default_value?: unknown }>;
  scope?: string;
  record_contract?: { namespace?: string; granularity?: string };
}>>;

// Logpilot doc layer: human-readable descriptions (from processor_docs.go)
type DocType = Record<string, Record<string, {
  description?: string;
  param_docs?: Record<string, string>;
  example?: unknown;
  internal?: boolean;
}>>;

export function PipelineChainEditor({ value, onChange, catalog, docs: initialDocs }: {
  value: Record<string, unknown>[];
  onChange: (processors: Record<string, unknown>[]) => void;
  catalog: CatalogType;
  docs?: DocType;
}) {
  const [docs] = useState<DocType>(initialDocs ?? {});
  const [mode, setMode] = useState<"visual" | "json">("visual");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // docs come from the product's adapter (Logpilot: /logpilot/processors)

  useEffect(() => {
    if (mode === "json" && !jsonText) {
      setJsonText(JSON.stringify(value, null, 2));
    }
  }, [mode, value, jsonText]);

  const addProcessor = (name: string, properties?: Record<string, { type?: string; default_value?: unknown }>) => {
    const defaults: Record<string, unknown> = {};
    if (properties) {
      for (const [key, prop] of Object.entries(properties)) {
        if (prop.default_value !== undefined) defaults[key] = prop.default_value;
      }
    }
    onChange([...value, { [name]: defaults }]);
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...value];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const applyJSON = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) throw new Error("必须是数组");
      onChange(parsed);
      setJsonError(null);
    } catch (e) {
      setJsonError(e instanceof Error ? e.message : String(e));
    }
  };

  const entryName = (entry: Record<string, unknown>): string => {
    return Object.keys(entry)[0] ?? "?";
  };

  const entryConfig = (entry: Record<string, unknown>): Record<string, unknown> => {
    return (entry[entryName(entry)] as Record<string, unknown>) ?? {};
  };

  // Get description for a processor (from Logpilot doc layer)
  const getDescription = (name: string): string => {
    for (const cat of Object.values(docs)) {
      const info = cat?.[name];
      if (info?.description) return info.description;
    }
    return "";
  };

  // Check if a processor is internal (not recommended for manual chains)
  const isInternal = (name: string): boolean => {
    for (const cat of Object.values(docs)) {
      const info = cat?.[name];
      if (info?.internal) return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col gap-2">
      {/* mode toggle */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 rounded bg-muted p-0.5">
          <button className={`px-2 py-0.5 text-[10px] rounded ${mode === "visual" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            onClick={() => setMode("visual")}>可视化</button>
          <button className={`px-2 py-0.5 text-[10px] rounded ${mode === "json" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            onClick={() => { setMode("json"); setJsonText(JSON.stringify(value, null, 2)); }}>JSON</button>
        </div>
        <span className="text-[10px] text-muted-foreground">{value.length} 个处理器</span>
      </div>

      {/* visual mode */}
      {mode === "visual" && (
        <>
          {/* existing chain */}
          <div className="rounded border divide-y">
            {value.map((entry, i) => {
              const name = entryName(entry);
              const cfg = entryConfig(entry);
              const desc = getDescription(name);
              return (
                <div key={i} className="flex items-start gap-2 px-2 py-1.5 text-xs">
                  <span className="text-muted-foreground w-5 text-center font-mono pt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="font-mono text-[10px] shrink-0">{name}</Badge>
                      <span className="text-[10px] text-muted-foreground truncate">
                        {Object.keys(cfg).length > 0
                          ? Object.entries(cfg).slice(0, 2).map(([k, v]) => `${k}=${JSON.stringify(v).slice(0, 20)}`).join(" ")
                          : "{}"}
                      </span>
                    </div>
                    {desc && (
                      <p className="text-[9px] text-slate-400 truncate mt-0.5" title={desc}>{desc}</p>
                    )}
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={() => moveUp(i)} disabled={i === 0} title="上移">↑</Button>
                    <Button size="sm" variant="ghost" className="h-5 w-5 p-0 text-red-600" onClick={() => removeAt(i)} title="删除">
                      <Trash2 className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
            {value.length === 0 && (
              <p className="px-2 py-2 text-[10px] text-muted-foreground text-center">从下方面板添加处理器</p>
            )}
          </div>

          {/* processor palette */}
          <div className="rounded border">
            <button className="w-full flex items-center gap-1 px-2 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setOpenCategory(openCategory === "__all" ? null : "__all")}>
              <Plus className="h-3 w-3" /> 添加处理器
              <ChevronDown className={`h-3 w-3 ml-auto transition-transform ${openCategory === "__all" ? "rotate-180" : ""}`} />
            </button>
            {openCategory === "__all" && (
              <div className="border-t max-h-48 overflow-y-auto">
                {Object.entries(catalog).map(([cat, procs]) => {
                  const visible = Object.entries(procs).filter(([name]) => !isInternal(name));
                  if (visible.length === 0) return null;
                  return (
                    <div key={cat}>
                      <p className="px-2 py-0.5 text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">{cat}</p>
                      <div className="flex flex-wrap gap-1 px-2 pb-1.5">
                        {visible.map(([name, info]) => {
                          const desc = getDescription(name);
                          return (
                            <button key={name}
                              className="px-1.5 py-0.5 text-[10px] font-mono rounded border bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors"
                              title={desc || name}
                              onClick={() => addProcessor(name, info.properties)}>
                              {name}
                              {info.scope === "record" && <span className="ml-1 text-blue-500">●</span>}
                              {info.scope === "batch" && <span className="ml-1 text-purple-500">◆</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* JSON mode */}
      {mode === "json" && (
        <div className="flex flex-col gap-1">
          <textarea
            className="w-full h-48 rounded border p-2 text-[11px] font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder={'[{"grok": {"field": "message", "patterns": ["..."]}}, {"mutate": {"remove": ["field1"]}}]'}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
          {jsonError && <p className="text-[10px] text-red-600">{jsonError}</p>}
          <div className="flex justify-end">
            <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={applyJSON}>
              <Braces className="h-3 w-3 mr-1" />应用 JSON
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
