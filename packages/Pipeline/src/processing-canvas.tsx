/* ©INFINI, All Rights Reserved. */

// ProcessingCanvas - 加工段画布 (console-design.md §4.2)。
//
// react-flow DAG: 来源/存储锚点 + 可自由拖拽的 processor 节点。执行顺序 =
// 数组顺序, 以节点左上角序号徽标呈现; 拖动仅改变画布布局 (位置按处理器
// 内容记忆, 不影响顺序), 调整执行顺序用节点上的 ↑/↓。节点库支持搜索与
// 拖放添加; 支持全屏编辑 (Esc 退出)、Delete 键删除选中节点。
//
// if 条件分支处理器: 节点带 满足/否则 双出边, 分支子链 (then/else) 以纵向
// 节点列展示在 if 节点下方, 分支执行完后汇入主链下一站。
//
// for_each 循环处理器: indigo 节点带 ⟳ 子链计数徽标, 内嵌 processor 子链以
// 纵向节点列展示在下方 (indigo 循环边), 跑完后汇入主链下一站。任意处理器
// 配置内嵌 when 条件时节点带 ⚡ 条件徽标 (仅条件命中才执行)。
//
// 节点为自定义 nodeTypes (v12 默认节点自带白底边框盒子, 内嵌卡片会溢出 —
// 自定义类型让卡片本身即节点盒, 宽高随内容自适应)。
//
// 共享包形态 (#102, 自 logpilot modules/streams/processing-canvas.tsx 迁入):
// 产品缝隙全部改注入 — t (i18n, context 下发)、fetchProcessorCatalog
// (处理器目录端点)、patternPicker (grok Pattern 库等选控件), UI 原语取自
// ./primitives, dry-run 报告类型与 ./pipeline-api 同源去重。

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import {
  ReactFlow, ReactFlowProvider, Background, Controls, MiniMap,
  MarkerType, Position, BackgroundVariant, Handle, applyNodeChanges,
  type Edge, type Node, type NodeChange, type NodeProps, type XYPosition, type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Braces, Clock, CloudUpload, Cpu, Database,
  FileSearch, FlaskConical, GitBranch, Maximize2, Minimize2, PenLine, Plus, Repeat2,
  RotateCcw, Scissors, Search, ShieldCheck, SlidersHorizontal, Tag, Trash2, X,
} from "lucide-react";
import { Button, Input, Badge, Label, Select, Textarea } from "./primitives";
import {
  SchemaForm, identityTranslate,
  type Translate, type PatternPickerProps, type ProcessorSchema, type ProcessorCatalog as CatalogType,
} from "./schema-form";
import type { DryRunReport, StepResult } from "./pipeline-api";

// i18n 注入: 产品在 <ProcessingCanvas t={...}> 上提供; 缺省恒等 (仅替换 vars
// 中存在的 {name} 占位符)。经 context 下发, 免去向每个节点组件逐层穿 prop;
// 组件内 `const __t = useT()` 与原产品形态的调用点同名, 迁移零改动。
const TContext = createContext<Translate>(identityTranslate);
const useT = (): Translate => useContext(TContext);

export interface CanvasProps {
  processors: Record<string, unknown>[];
  sourceLabel: string; // 如 "agent_file /var/log"
  sinkLabel: string;   // 如 "es://logs-pizza" 或 "未配置"
  // 锚点标题文案 (默认 来源/存储)。实例管线视图传 输入/输出: 主管线的
  // 出口是中转队列、merge 管线是内存 lane, 叫"存储"会误导。
  sourceTitle?: string;
  sinkTitle?: string;
  onChange: (processors: Record<string, unknown>[]) => void;
  // 只读模式: 隐藏编辑入口 (添加/排序/删除), 节点点击仍展开参数面板 —
  // 以只读 JSON 呈现。实例详情等查看场景使用。
  readOnly?: boolean;
  // 试跑覆盖层: 每个主链节点显示当前样本的字段变化徽标, 选中节点展开
  // 该步的输入/输出 diff (samples 为展示用原始行, sampleIdx 由外层切换)。
  run?: CanvasRunState | null;
  // 实时速率+延迟绑定 (按处理器名): 展示在每个节点的 ⚡ 徽标上。
  liveRates?: Record<string, { rate: number; avgMs: number }>;
  // 子链并行度 (for_each.parallel): 只读视图工具栏展示 ⚡ 并行 ×N 徽标。
  parallel?: number;
  // i18n 函数注入 (缺省恒等)。
  t?: Translate;
  // 处理器目录加载器 (logpilot 注入 GET /logpilot/processors 的适配;
  // 返回 {processors: {category: {name: meta}}})。缺省不加载 — 画布退化为
  // JSON 编辑, 节点库只剩已加载 schema 覆盖的项。
  fetchProcessorCatalog?: () => Promise<{ processors: CatalogType }>;
  // 模式选择控件注入 (grok patterns 等), 透传给 SchemaForm。
  patternPicker?: ComponentType<PatternPickerProps>;
  // 受控布局持久化 (#108/#109): layout 为位置记忆的初始种子 (键 = 节点
  // 内容指纹, 含字母/\u0000, 天然避开 ucfg 纯数字键丢弃), 拖动/重排后经
  // onLayoutChange 回吐全量布局 — 产品存入 PipelineConfigV2.canvas_layout。
  layout?: Record<string, { x: number; y: number }>;
  onLayoutChange?: (layout: Record<string, { x: number; y: number }>) => void;
}

// ── dry-run 报告类型: 与 pipeline-api 同源 (framework dryrun JSON), 保留
// DryRunStepResult 旧名作别名 — 画布消费方 (试跑覆盖层) 沿用。 ──
export type { DryRunReport };
export type DryRunStepResult = StepResult;
export interface CanvasRunState {
  report: DryRunReport;
  samples: string[]; // 每条样本的展示形态 (原始日志行)
  sampleIdx: number;
  onSampleIdx?: (i: number) => void;
}

type FlowData = Record<string, unknown>;

// ──────────────────────────────────────────────────────────────────────────
// 布局常量: 蛇形 (serpentine) 自动布局 — 序列 [src, p…, sink] 每行 PER_ROW
// 个槽位, 偶数行从左到右、奇数行反向回绕, 连线方向始终顺着数据流。
// 含 if / case / for_each 的行加高一个分支带 (子链节点纵向排在父节点下方;
// case 的多个分支并排成列)。
// ──────────────────────────────────────────────────────────────────────────
const PER_ROW = 6;
const COL_W = 235;
const ROW_H = 165;
const NODE_W = 178;
const BRANCH_TOP = 108;  // 子链首节点相对 if 节点顶部的纵向偏移
const BRANCH_GAP = 88;   // 子链节点纵向间距
const SUB_H = 60;        // 子链节点估高
const MAX_DISP = 3;      // 每分支最多展示的子链节点数, 超出折叠为 "+N" 芯片
const CASE_COL_W = 150;  // case 分支列横向间距 (子节点卡最小宽 130 + 间隙)
const MAX_CASE_COLS = 5; // case 最多展开的分支列数, 其余折叠为 "+N 个分支" 芯片

// if 条目判定不能用首键: spec 经 Go map 落库后键按字母序重排 (else/if/then),
// "if" 不保证排第一 — 用键存在性判断。
function isIf(p: Record<string, unknown>): boolean {
  return "if" in p;
}
function ifCfg(p: Record<string, unknown>): Record<string, unknown> {
  const v = p["if"];
  return v != null && typeof v === "object" ? (v as Record<string, unknown>) : {};
}
// 框架 if/then/else 语法 (processor.go NewPipeline 对 if 条目跳过单键检查,
// ifThenElseConfig 直接从条目顶层解包 if/then/else 三个同级键):
// {if: <条件体>, then: [...], else: [...]}。then 必填且须非空, else 可省略 —
// 空数组会让 NewPipeline 报 "invalid processor config", 所以 else 为空时省略键。
// 读取兼容旧嵌套写法 {if: {<cond>, then, else}}: 同级键优先, 回落 if 体内部。
function ifCond(p: Record<string, unknown>): Record<string, unknown> {
  const { then: _t, else: _e, ...cond } = ifCfg(p);
  void _t; void _e;
  return cond;
}
function ifBranch(p: Record<string, unknown>, br: "then" | "else"): Record<string, unknown>[] {
  const v = p[br] ?? ifCfg(p)[br];
  return Array.isArray(v) ? (v as Record<string, unknown>[]) : [];
}
// 组装原生 if 处理器对象: then 恒写 (空数组仅为待补占位, 面板会警示),
// else 仅在非空时写出 — 对齐运行时约束。
function buildIf(cond: Record<string, unknown>, thenItems: Record<string, unknown>[], elseItems: Record<string, unknown>[]): Record<string, unknown> {
  const p: Record<string, unknown> = { if: cond, then: thenItems };
  if (elseItems.length > 0) p.else = elseItems;
  return p;
}

// case 多分支条目: {case: {field?, branches: [{values?|when?, then}], default?}}。
function isCase(p: Record<string, unknown>): boolean {
  return !isIf(p) && "case" in p;
}
function caseCfg(p: Record<string, unknown>): Record<string, unknown> {
  const v = p["case"];
  return v != null && typeof v === "object" ? (v as Record<string, unknown>) : {};
}
function caseBranches(p: Record<string, unknown>): Record<string, unknown>[] {
  const v = caseCfg(p).branches;
  return Array.isArray(v) ? (v as Record<string, unknown>[]) : [];
}
function caseThen(b: Record<string, unknown>): Record<string, unknown>[] {
  return Array.isArray(b?.then) ? (b.then as Record<string, unknown>[]) : [];
}
// default 链: 键缺省返回 null (与空数组区分 — 缺省 = 全不命中原样直通)。
function caseDefault(p: Record<string, unknown>): Record<string, unknown>[] | null {
  const v = caseCfg(p).default;
  return Array.isArray(v) ? (v as Record<string, unknown>[]) : null;
}
// 单个分支的匹配摘要: values 枚举 → "field ∈ a,b", when 复用条件摘要, 同填用 且 连接。
function caseBranchMatcher(field: string, b: Record<string, unknown>, tt: Translate): string {
  const seg: string[] = [];
  if (Array.isArray(b.values) && b.values.length > 0) {
    seg.push(`${field || "?"} ∈ ${b.values.map((v) => String(v)).join(",")}`);
  }
  if (b.when != null && typeof b.when === "object") {
    const s = summarizeCondition(b.when, tt);
    if (s) seg.push(s);
  }
  return seg.join(tt(" 且 "));
}
// 分支摘要一行 (节点 tooltip): 各分支匹配器用 | 相连, 尾部标 默认。
function caseSummary(p: Record<string, unknown>, tt: Translate): { summary: string; count: number } {
  const field = typeof caseCfg(p).field === "string" ? (caseCfg(p).field as string) : "";
  const branches = caseBranches(p);
  const parts = branches.map((b) => caseBranchMatcher(field, b, tt) || tt("(空分支)"));
  if (caseDefault(p) != null) parts.push(tt("默认"));
  return { summary: parts.join(" | "), count: branches.length };
}
// 画布上 case 节点下方的子链列: 展开的分支 (最多 MAX_CASE_COLS, 每列一个
// 出向 handle b<k>) + 超出部分折叠成一个 "+N 个分支" 芯片列 (handle fold)
// + default 链列 (handle default)。列键同时是子节点 id/位置键的分段名。
interface CaseColumn {
  key: string;                       // b<k> | fold | default
  items: Record<string, unknown>[];  // 该列展示的子链 (fold 列为空)
  toneIdx: number;                   // 分支配色序号 (default/fold 不用)
  label: string;                     // 首卡角标: 匹配摘要 / 默认
  fold?: number;                     // 折叠的分支数 (仅 fold 列)
}
function caseColumns(p: Record<string, unknown>, tt: Translate): CaseColumn[] {
  const field = typeof caseCfg(p).field === "string" ? (caseCfg(p).field as string) : "";
  const branches = caseBranches(p);
  const shown = Math.min(branches.length, MAX_CASE_COLS);
  const cols: CaseColumn[] = [];
  for (let k = 0; k < shown; k++) {
    cols.push({ key: `b${k}`, items: caseThen(branches[k]), toneIdx: k, label: caseBranchMatcher(field, branches[k], tt) || tt("分支 {v0}", { v0: k + 1 }) });
  }
  if (branches.length > shown) {
    cols.push({ key: "fold", items: [], toneIdx: 0, label: tt("+{shown} 个分支", { shown: branches.length - shown }), fold: branches.length - shown });
  }
  const def = caseDefault(p);
  if (def != null) cols.push({ key: "default", items: def, toneIdx: 0, label: tt("默认") });
  return cols;
}
// 按分支键取子链 (子节点配置面板用): b<k> → branches[k].then, default → default 链。
function caseBranchItems(p: Record<string, unknown>, br: string): Record<string, unknown>[] | null {
  if (br === "default") return caseDefault(p) ?? [];
  const m = /^b(\d+)$/.exec(br);
  if (!m) return null;
  const b = caseBranches(p)[Number(m[1])];
  return b ? caseThen(b) : null;
}
// 分支列配色 (卡片/图标/角标 与 连线色一一对应), 按分支序号循环取;
// default 列统一灰色, 与 if 的 满足=绿/否则=橙 区分开。
const CASE_TONES = [
  { card: "border-emerald-300 bg-emerald-50/90", icon: "bg-emerald-100 text-emerald-600", badge: "bg-emerald-600", edge: "#059669" },
  { card: "border-sky-300 bg-sky-50/90", icon: "bg-sky-100 text-sky-600", badge: "bg-sky-600", edge: "#0284c7" },
  { card: "border-violet-300 bg-violet-50/90", icon: "bg-violet-100 text-violet-600", badge: "bg-violet-600", edge: "#7c3aed" },
  { card: "border-rose-300 bg-rose-50/90", icon: "bg-rose-100 text-rose-600", badge: "bg-rose-600", edge: "#e11d48" },
  { card: "border-teal-300 bg-teal-50/90", icon: "bg-teal-100 text-teal-600", badge: "bg-teal-600", edge: "#0d9488" },
];
const CASE_DEFAULT_TONE = { card: "border-slate-300 bg-slate-50/90", icon: "bg-slate-200 text-slate-600", badge: "bg-slate-500", edge: "#64748b" };
function caseTone(col: { key: string; toneIdx: number }) {
  return col.key === "default" || col.key === "fold" ? CASE_DEFAULT_TONE : CASE_TONES[col.toneIdx % CASE_TONES.length];
}

// 处理器条目的名字 (if 优先判定, 其余取首键; "when" 不参与 — 它嵌在配置内)。
function procNameOf(p: Record<string, unknown>): string {
  return isIf(p) ? "if" : Object.keys(p)[0] ?? "?";
}

// for_each 的内嵌子链: processor 字段单个对象或数组都合法 (框架 newProcessors
// 两种形态都收) — 统一归一成数组。
function subChainOf(p: Record<string, unknown>): Record<string, unknown>[] {
  const cfg = p[procNameOf(p)];
  if (cfg == null || typeof cfg !== "object") return [];
  const v = (cfg as Record<string, unknown>)["processor"];
  if (Array.isArray(v)) return v as Record<string, unknown>[];
  if (v != null && typeof v === "object") return [v as Record<string, unknown>];
  return [];
}
// for_each 循环视图判定: 有非空子链才展开 (空链运行时也会编译失败, 走普通
// 节点 + JSON 编辑兜底)。
function isForeach(p: Record<string, unknown>): boolean {
  return !isIf(p) && procNameOf(p) === "for_each" && subChainOf(p).length > 0;
}
// 配置内嵌的 when 条件体 (框架 addCondition 对所有注册处理器生效的条件包装)。
function whenCond(p: Record<string, unknown>): Record<string, unknown> | null {
  const cfg = p[procNameOf(p)];
  if (cfg == null || typeof cfg !== "object") return null;
  const w = (cfg as Record<string, unknown>)["when"];
  if (w == null || typeof w !== "object" || Object.keys(w as object).length === 0) return null;
  return w as Record<string, unknown>;
}

// 终点处理器: 事件在此被丢弃, 下游节点收不到数据 (for_each 对被标记记录
// 只是在子链跑完后清空 payload, 任何后续阶段都见不到它) — 画布不画它去往
// 后续节点/存储的连线。目前只有 drop_event 是无条件终点; throttle/sample/
// script 只按条件丢弃, 不算。带 when 条件的 drop_event 属条件丢弃, 事件
// 仍可能放行, 同样视作普通节点。
const TERMINAL_PROCESSORS = new Set(["drop_event"]);
function isTerminal(p: Record<string, unknown>): boolean {
  if (isIf(p)) return false;
  const n = procNameOf(p);
  if (!TERMINAL_PROCESSORS.has(n)) return false;
  const cfg = p[n];
  return !(cfg != null && typeof cfg === "object" && "when" in (cfg as Record<string, unknown>));
}

// 布局键: 内容指纹 (配置微调后仍视为同一节点, 更新时携带旧位置)。if 处理
// 器的指纹取 条件+分支长度 — 编辑分支内部配置不移动节点。
function stableStringify(v: unknown): string {
  if (v == null || typeof v !== "object") return JSON.stringify(v) ?? "null";
  if (Array.isArray(v)) return "[" + v.map((x) => stableStringify(x)).join(",") + "]";
  const o = v as Record<string, unknown>;
  return "{" + Object.keys(o).sort().map((k) => JSON.stringify(k) + ":" + stableStringify(o[k])).join(",") + "}";
}
function posKey(p: Record<string, unknown>): string {
  const name = isIf(p) ? "if" : Object.keys(p)[0] ?? "?";
  if (name === "if") {
    return `if\u0000${stableStringify(ifCond(p))}\u0000${ifBranch(p, "then").length}\u0000${ifBranch(p, "else").length}`;
  }
  if (name === "for_each") {
    // 指纹 = 子链外的配置 + 子链长度: 编辑子链内部不移动节点, 增删子处理器才重排。
    const cfg = (p[name] ?? {}) as Record<string, unknown>;
    const { processor: _sub, ...rest } = cfg;
    void _sub;
    return `for_each\u0000${stableStringify(rest)}\u0000${subChainOf(p).length}`;
  }
  if (name === "case") {
    // 指纹 = field + 各分支匹配器 (values/when) + 分支数 + 有无 default:
    // 编辑分支内子链不移动节点, 增删分支/改匹配条件才重排 (同 if 的策略)。
    const cfg = (p[name] ?? {}) as Record<string, unknown>;
    const branches = Array.isArray(cfg.branches) ? (cfg.branches as Record<string, unknown>[]) : [];
    const matchers = branches.map((b) => ({ values: b?.values ?? null, when: b?.when ?? null }));
    return `case\u0000${stableStringify(cfg.field ?? "")}\u0000${stableStringify(matchers)}\u0000${cfg.default != null}`;
  }
  return `${name}\u0000${stableStringify(p[name])}`;
}

// 条件摘要: 把 condition 对象压成一行人话 (画布 if 卡片标题下展示)。
// 操作符符号表随语言注入 (包含/前缀 等是可译词)。
const condSym = (tt: Translate): Record<string, string> =>
  ({ equals: "==", contains: tt("包含"), prefix: tt("前缀"), suffix: tt("后缀"), regexp: "~", in: "∈" });
function summarizeCondition(cond: unknown, tt: Translate): string {
  if (cond == null || typeof cond !== "object") return "";
  const c = cond as Record<string, unknown>;
  const SYM = condSym(tt);
  const val = (v: unknown) => (typeof v === "string" ? `"${v}"` : String(v));
  const parts: string[] = [];
  for (const [op, body] of Object.entries(c)) {
    if (op === "and" || op === "or") {
      const arr = Array.isArray(body) ? body : [];
      parts.push("(" + arr.map((x) => summarizeCondition(x, tt)).join(op === "and" ? tt(" 且 ") : tt(" 或 ")) + ")");
    } else if (op === "not") {
      parts.push(tt("非(") + summarizeCondition(body, tt) + ")");
    } else if (op === "exists") {
      parts.push(tt("存在(") + (Array.isArray(body) ? body.join(", ") : String(body)) + ")");
    } else if (body != null && typeof body === "object") {
      for (const [f, v] of Object.entries(body as Record<string, unknown>)) {
        if (op === "range" && v != null && typeof v === "object") {
          const r = v as Record<string, unknown>;
          parts.push(`${f} ∈ [${r.gte ?? r.gt ?? "-∞"}, ${r.lte ?? r.lt ?? "+∞"}]`);
        } else {
          parts.push(`${f} ${SYM[op] ?? op} ${val(v)}`);
        }
      }
    } else {
      parts.push(`${op} ${String(body)}`);
    }
  }
  return parts.join(tt(" 且 "));
}

// ──────────────────────────────────────────────────────────────────────────
// 处理器外观: 按名称/所属域映射图标与强调色 (未识别的一律 CPU 中性蓝灰)。
// ──────────────────────────────────────────────────────────────────────────
type Accent = "sky" | "indigo" | "violet" | "emerald" | "amber" | "rose" | "slate";
const ACCENT_CARD: Record<Accent, string> = {
  sky: "border-sky-300 bg-sky-50",
  indigo: "border-indigo-300 bg-indigo-50",
  violet: "border-violet-300 bg-violet-50",
  emerald: "border-emerald-300 bg-emerald-50",
  amber: "border-amber-300 bg-amber-50",
  rose: "border-rose-300 bg-rose-50",
  slate: "border-slate-300 bg-slate-50",
};
const ACCENT_ICON: Record<Accent, string> = {
  sky: "bg-sky-100 text-sky-600",
  indigo: "bg-indigo-100 text-indigo-600",
  violet: "bg-violet-100 text-violet-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
  rose: "bg-rose-100 text-rose-600",
  slate: "bg-slate-200 text-slate-600",
};
type IconCmp = React.ComponentType<{ className?: string }>;
function procMeta(name: string, cat?: string): { icon: IconCmp; accent: Accent } {
  const n = name.toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => n.includes(k));
  if (has("json", "dissect", "grok", "split", "csv")) return { icon: Braces, accent: "sky" };
  if (has("date", "time")) return { icon: Clock, accent: "sky" };
  if (has("mutate", "rename", "convert", "lowercase", "uppercase", "trim", "set")) return { icon: PenLine, accent: "slate" };
  if (has("script", "template")) return { icon: Cpu, accent: "slate" };
  if (has("enrich", "geoip", "lookup")) return { icon: CloudUpload, accent: "violet" };
  if (has("for_each", "foreach", "loop", "repeat")) return { icon: Repeat2, accent: "indigo" };
  if (has("pattern_tagger", "tag")) return { icon: Tag, accent: "emerald" };
  if (has("route", "switch") || n.includes("if") || n === "case") return { icon: GitBranch, accent: "amber" };
  if (has("throttle", "drop", "filter")) return { icon: Scissors, accent: "amber" };
  if (has("anomaly", "threat", "security", "alert")) return { icon: ShieldCheck, accent: "rose" };
  if (cat === "enrichment") return { icon: CloudUpload, accent: "violet" };
  return { icon: SlidersHorizontal, accent: "slate" };
}

// 处理器节点上的行内操作徽条 (上移/下移/删除), 通过 data 注入回调。
interface ProcData extends FlowData {
  step?: number; name?: string; cat?: string; desc?: string; internal?: boolean;
  selected?: boolean; canUp?: boolean; canDown?: boolean; readOnly?: boolean;
  onSelect?: () => void; onUp?: () => void; onDown?: () => void; onRemove?: () => void;
  cond?: string; thenCount?: number; elseCount?: number;
  // case 多分支节点: 摘要 (tooltip)/分支数/枚举字段/底部 handle 列表/有无 default
  caseSummary?: string; caseCount?: number; caseField?: string; caseHandles?: string[]; hasDefault?: boolean;
  when?: string; // 配置内嵌 when 条件摘要 (⚡ 条件执行)
  subCount?: number; fieldSummary?: string; // for_each: 子链长度与迭代字段
  terminal?: boolean;
  // 分支子链/锚点节点字段; branch = then|else|loop 或 case 列键 (b<k>|fold|default)
  chip?: number; chipText?: string; branch?: string; first?: boolean;
  // case 子链卡配色: subTone=case 按 toneIdx 取分支色, cased = default 灰; badgeText 为首卡角标文本
  subTone?: "case" | "cased"; toneIdx?: number; badgeText?: string;
  src?: boolean; tone?: string; label?: string; value?: string; runNote?: string;
  // 试跑徽标: 当前样本在该节点的结果 (outcome=ok|error|dropped|skip)
  runBadge?: { outcome: string; add: number; chg: number; del: number; dur?: number; err?: string };
  // 实时速率+延迟 (events/s 与单条平均 ms, 按处理器名聚合): /stats 差值算出
  liveStat?: { rate: number; avgMs: number };
  // 分支/循环子节点的选中态 (虚线环高亮)
  selectedSub?: boolean;
}

// 速率/延迟徽标 (同名处理器聚合)
function RateBadge({ v }: { v: { rate: number; avgMs: number } }) {
  const __t = useT();
  const rate = v.rate >= 1e6 ? `${(v.rate / 1e6).toFixed(1)}M/s` : v.rate >= 1000 ? `${(v.rate / 1000).toFixed(1)}k/s` : `${Math.round(v.rate * 10) / 10}/s`;
  const lat = v.avgMs >= 100 ? `${Math.round(v.avgMs)}ms` : v.avgMs > 0 ? `${v.avgMs.toFixed(2)}ms` : "";
  return (
    <p className="text-[9px] text-sky-700 bg-sky-50 border border-sky-100 rounded px-1 mt-1 text-center font-mono tabular-nums"
      title={__t("实时吞吐 (events/s) 与单条平均耗时 (3s 采样差值, 同名处理器聚合)")}>
      ⚡ {rate}{lat ? ` · ${lat}` : ""}
    </p>
  );
}

const HANDLE_CLS = "!h-1.5 !w-1.5 !bg-slate-400 !border-0";

// 试跑徽标: 该节点对当前样本的效果 — 字段变化计数 (+加 ~改 -删) /
// 丢弃 / 错误 / 未经过 (前置步骤已丢弃或出错)。
function RunBadge({ b }: { b: NonNullable<ProcData["runBadge"]> }) {
  const __t = useT();
  if (b.outcome === "dropped") {
    return <p className="text-[9px] text-rose-700 bg-rose-100 rounded px-1 mt-1 text-center font-medium"
      title={__t("该样本在此步被丢弃, 后续节点收不到它")}>{__t("丢弃 ✕")}</p>;
  }
  if (b.outcome === "error") {
    return <p className="text-[9px] text-amber-700 bg-amber-100 rounded px-1 mt-1 text-center font-medium truncate"
      title={b.err ?? __t("执行错误")}>{__t("错误")}{(b.err ?? "").slice(0, 26)}</p>;
  }
  if (b.outcome === "skip") {
    return <p className="text-[9px] text-slate-500 bg-slate-100 rounded px-1 mt-1 text-center"
      title={__t("该样本未经过此节点 (更早的步骤已丢弃/出错)")}>{__t("未经过")}</p>;
  }
  const parts: React.ReactNode[] = [];
  if (b.add) parts.push(<span key="a" className="text-green-700">+{b.add}</span>);
  if (b.chg) parts.push(<span key="c" className="text-blue-700">~{b.chg}</span>);
  if (b.del) parts.push(<span key="d" className="text-rose-500">-{b.del}</span>);
  return (
    <p className="text-[9px] mt-1 text-center rounded bg-slate-100/80 px-1 py-px font-mono"
      title={__t("该步字段变化: +{add} ~{chg} -{del}{v0}", { add: b.add, chg: b.chg, del: b.del, v0: b.dur ? __t(", 耗时 {dur}ms", { dur: b.dur }) : "" })}>
      {parts.length
        ? <span className="inline-flex gap-1.5">{parts}</span>
        : <span className="text-slate-500">{__t("无变化")}</span>}
      {b.dur != null && b.dur > 0 ? <span className="text-slate-400 ml-1">{b.dur}ms</span> : null}
    </p>
  );
}

// 试跑字段 diff 行: 新增 (绿) / 修改 (蓝, 显示改后值) / 删除 (红, 划线)。
function DiffRows({ diff }: { diff?: DryRunStepResult["diff"] }) {
  const __t = useT();
  if (!diff) return null;
  const entries: { k: string; v: unknown; kind: "add" | "chg" | "del" }[] = [];
  for (const [k, v] of Object.entries(diff.added ?? {})) entries.push({ k, v, kind: "add" });
  for (const [k, v] of Object.entries(diff.changed ?? {})) {
    const to = v != null && typeof v === "object" && "to" in (v as Record<string, unknown>)
      ? (v as Record<string, unknown>).to : v;
    entries.push({ k, v: to, kind: "chg" });
  }
  for (const [k, v] of Object.entries(diff.removed ?? {})) entries.push({ k, v, kind: "del" });
  if (entries.length === 0) {
    return <p className="text-[10px] text-muted-foreground pl-0.5">{__t("该步无字段变化")}</p>;
  }
  entries.sort((a, b) => a.k.localeCompare(b.k));
  return (
    <div className="pl-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
      {entries.map((e) => (
        <span key={`${e.kind}:${e.k}`}
          className={`text-[10px] font-mono ${e.kind === "add" ? "text-green-700" : e.kind === "chg" ? "text-blue-700" : "text-rose-500 line-through"}`}
          title={`${e.k}: ${JSON.stringify(e.v)}`}>
          {e.k}: {JSON.stringify(e.v)}
        </span>
      ))}
    </div>
  );
}

function MoveButtons({ d }: { d: ProcData }) {
  const __t = useT();
  if (d.readOnly) return null; // 只读视图无编辑入口
  return (
    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 rounded-full border bg-background shadow-sm px-0.5 nodrag z-10">
      <button
        className="h-[18px] w-[18px] p-0.5 leading-none text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground"
        disabled={!d.canUp} title={__t("上移 (提前执行)")}
        onClick={(e) => { e.stopPropagation(); d.onUp?.(); }}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
      <button
        className="h-[18px] w-[18px] p-0.5 leading-none text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground"
        disabled={!d.canDown} title={__t("下移 (延后执行)")}
        onClick={(e) => { e.stopPropagation(); d.onDown?.(); }}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <button className="h-[18px] w-[18px] p-0.5 leading-none text-muted-foreground hover:text-red-600" title={__t("删除")}
        onClick={(e) => { e.stopPropagation(); d.onRemove?.(); }}>
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}

// 普通处理器节点 — 卡片即节点盒 (自定义类型, 无默认包装)。
function ProcNode({ data }: NodeProps) {
  const __t = useT();
  const d = data as ProcData;
  const meta = procMeta(d.name ?? "", d.cat);
  const Icon = meta.icon;
  return (
    <div title={d.desc} onClick={(e) => { e.stopPropagation(); d.onSelect?.(); }}
      className={`relative px-3 py-2 rounded-xl border-2 shadow-sm min-w-[160px] cursor-pointer ${ACCENT_CARD[meta.accent]} ${d.selected ? "ring-2 ring-primary ring-offset-1" : ""}`}>
      <Handle type="target" position={Position.Left} className={HANDLE_CLS} />
      <span className="absolute -left-2 -top-2 z-10 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-slate-800 text-white text-[10px] font-semibold shadow">
        {d.step}
      </span>
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-md shrink-0 ${ACCENT_ICON[meta.accent]}`}><Icon className="h-3 w-3" /></span>
        <p className="text-xs font-semibold font-mono truncate">{d.name}</p>
        {d.terminal && <span className="text-[8px] text-rose-700 bg-rose-100 rounded px-1 shrink-0" title={__t("事件在此被丢弃, 不会传给后续处理器")}>{__t("终点")}</span>}
        {d.internal && <span className="text-[8px] text-muted-foreground border rounded px-0.5 shrink-0">{__t("内部")}</span>}
      </div>
      {(d.cat && d.cat !== d.name) && <p className="text-[9px] text-muted-foreground mt-0.5">{d.cat}</p>}
      {d.liveStat && <RateBadge v={d.liveStat} />}
      {d.runBadge && <RunBadge b={d.runBadge} />}
      {d.when && (
        <p className="text-[9px] text-amber-700 bg-amber-100/70 rounded px-1 mt-1 truncate"
          title={__t("⚡ 条件执行 (when): {when}", { when: d.when })}>
          ⚡ {d.when}
        </p>
      )}
      <MoveButtons d={d} />
      {/* 终点处理器没有出向数据流, 不渲染右侧连接点 */}
      {!d.terminal && <Handle type="source" position={Position.Right} className={HANDLE_CLS} />}
    </div>
  );
}

// if 条件分支节点: 左入; 底部 满足/否则 两个出向 handle (分支子链)。
function IfNode({ data }: NodeProps) {
  const __t = useT();
  const d = data as ProcData;
  const Icon = GitBranch;
  return (
    <div title={d.desc} onClick={(e) => { e.stopPropagation(); d.onSelect?.(); }}
      className={`relative px-3 py-2 rounded-xl border-2 shadow-sm min-w-[160px] cursor-pointer ${ACCENT_CARD.amber} ${d.selected ? "ring-2 ring-primary ring-offset-1" : ""}`}>
      <Handle type="target" position={Position.Left} className={HANDLE_CLS} />
      <span className="absolute -left-2 -top-2 z-10 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-slate-800 text-white text-[10px] font-semibold shadow">
        {d.step}
      </span>
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-md shrink-0 ${ACCENT_ICON.amber}`}><Icon className="h-3 w-3" /></span>
        <p className="text-xs font-semibold font-mono">if</p>
        <span className="text-[9px] text-emerald-700 bg-emerald-100 rounded px-1">{__t("满足")}{d.thenCount ?? 0}</span>
        <span className="text-[9px] text-orange-700 bg-orange-100 rounded px-1">{__t("否则")}{d.elseCount ?? 0}</span>
      </div>
      <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate" title={d.cond}>
        {d.cond || __t("(无条件)")}
      </p>
      {d.runBadge && <RunBadge b={d.runBadge} />}
      {(d.thenCount ?? 0) === 0 && (
        <p className="text-[9px] text-amber-600 mt-0.5" title={__t("then 分支为空, 发布后编译会失败")}>{__t("⚠ then 为空")}</p>
      )}
      <MoveButtons d={d} />
      {/* 分支出向: 满足 (左下) / 否则 (右下) */}
      <Handle type="source" position={Position.Bottom} id="then" style={{ left: "28%" }} className={HANDLE_CLS} />
      <Handle type="source" position={Position.Bottom} id="else" style={{ left: "72%" }} className={HANDLE_CLS} />
    </div>
  );
}

// case 多分支节点: 左入; 底部每个展开的分支列一个出向 handle (b<k>), 折叠芯片
// 与 default 列各一个 (fold/default), 均匀分布。没配 default 时全不命中的事件
// 原样流向下一步 — 右侧再给一个 "未命中" 直通出向 (miss)。
function CaseNode({ data }: NodeProps) {
  const __t = useT();
  const d = data as ProcData;
  const Icon = GitBranch;
  const handles = d.caseHandles ?? [];
  return (
    <div title={d.caseSummary || d.desc} onClick={(e) => { e.stopPropagation(); d.onSelect?.(); }}
      className={`relative px-3 py-2 rounded-xl border-2 shadow-sm min-w-[160px] cursor-pointer ${ACCENT_CARD.amber} ${d.selected ? "ring-2 ring-primary ring-offset-1" : ""}`}>
      <Handle type="target" position={Position.Left} className={HANDLE_CLS} />
      <span className="absolute -left-2 -top-2 z-10 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-slate-800 text-white text-[10px] font-semibold shadow">
        {d.step}
      </span>
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-md shrink-0 ${ACCENT_ICON.amber}`}><Icon className="h-3 w-3" /></span>
        <p className="text-xs font-semibold font-mono">case</p>
        <span className="text-[9px] text-amber-700 bg-amber-100 rounded px-1" title={__t("分支数 (按序匹配, 首个命中执行)")}>⑂ {d.caseCount ?? 0}</span>
        {d.hasDefault
          ? <span className="text-[9px] text-slate-600 bg-slate-200 rounded px-1" title={__t("配置了 default: 全部未命中走兜底链")}>{__t("默认")}</span>
          : <span className="text-[9px] text-slate-500 border border-slate-300 rounded px-1" title={__t("未配置 default: 全部未命中的事件原样流向下一步")}>{__t("直通")}</span>}
      </div>
      <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate"
        title={d.caseField ? __t("枚举字段 {caseField} (values 分支按此字段取值)", { caseField: d.caseField }) : __t("未声明 field — 分支全部走 when 条件")}>
        {d.caseField ? `⊞ ${d.caseField}` : __t("(纯条件分支)")}
      </p>
      {d.runBadge && <RunBadge b={d.runBadge} />}
      {(d.caseCount ?? 0) === 0 && (
        <p className="text-[9px] text-amber-600 mt-0.5" title={__t("至少需要一个分支, 发布后编译会失败")}>{__t("⚠ 无分支")}</p>
      )}
      <MoveButtons d={d} />
      {handles.map((h, k) => (
        <Handle key={h} type="source" position={Position.Bottom} id={h}
          style={{ left: `${((k + 0.5) / handles.length) * 100}%` }} className={HANDLE_CLS} />
      ))}
      {!d.hasDefault && <Handle type="source" position={Position.Right} id="miss" className={HANDLE_CLS} />}
    </div>
  );
}

// for_each 循环节点: 对数组字段逐元素执行内嵌 processor 子链 (indigo 纵向
// 子节点列), 子链跑完丢弃被标记元素后, 事件继续走主链 — 底部循环出向 handle。
function ForEachNode({ data }: NodeProps) {
  const __t = useT();
  const d = data as ProcData;
  const Icon = Repeat2;
  return (
    <div title={d.desc} onClick={(e) => { e.stopPropagation(); d.onSelect?.(); }}
      className={`relative px-3 py-2 rounded-xl border-2 shadow-sm min-w-[160px] cursor-pointer ${ACCENT_CARD.indigo} ${d.selected ? "ring-2 ring-primary ring-offset-1" : ""}`}>
      <Handle type="target" position={Position.Left} className={HANDLE_CLS} />
      <span className="absolute -left-2 -top-2 z-10 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-slate-800 text-white text-[10px] font-semibold shadow">
        {d.step}
      </span>
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-md shrink-0 ${ACCENT_ICON.indigo}`}><Icon className="h-3 w-3" /></span>
        <p className="text-xs font-semibold font-mono">for_each</p>
        <span className="text-[9px] text-indigo-700 bg-indigo-100 rounded px-1" title={__t("内嵌子链处理器数")}>⟳ {d.subCount ?? 0}</span>
      </div>
      <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate" title={d.fieldSummary}>
        {d.fieldSummary ? `↻ ${d.fieldSummary}` : __t("(未指定迭代字段)")}
      </p>
      {d.runBadge && <RunBadge b={d.runBadge} />}
      {d.when && (
        <p className="text-[9px] text-amber-700 bg-amber-100/70 rounded px-1 mt-1 truncate"
          title={__t("⚡ 条件执行 (when): {when}", { when: d.when })}>
          ⚡ {d.when}
        </p>
      )}
      <MoveButtons d={d} />
      {/* 循环子链出向 */}
      <Handle type="source" position={Position.Bottom} id="loop" className={HANDLE_CLS} />
    </div>
  );
}

// 分支子链节点 (then/else/循环/case 分支处理器, 或 "+N" 折叠芯片)。
function SubNode({ data }: NodeProps) {
  const __t = useT();
  const d = data as ProcData;
  if (d.chip != null) {
    return (
      <div className="px-2.5 py-1.5 rounded-lg border border-dashed bg-white/90 text-[10px] text-muted-foreground text-center">
        <Handle type="target" position={Position.Top} className={HANDLE_CLS} />
        {d.chipText ?? __t("+{chip} 个处理器", { chip: d.chip })}
        <Handle type="source" position={Position.Bottom} className={HANDLE_CLS} />
      </div>
    );
  }
  // case 列按分支序号取色 (default 灰); if/for_each 沿用 满足=绿 / 否则=橙 / 循环=indigo。
  const caseT = d.subTone === "case" ? CASE_TONES[(d.toneIdx ?? 0) % CASE_TONES.length]
    : d.subTone === "cased" ? CASE_DEFAULT_TONE : null;
  const isThen = d.branch === "then";
  const isLoop = d.branch === "loop";
  const card = caseT ? caseT.card
    : isThen ? "border-emerald-300 bg-emerald-50/90"
    : isLoop ? "border-indigo-300 bg-indigo-50/90"
    : "border-orange-300 bg-orange-50/90";
  const icon = caseT ? caseT.icon
    : isThen ? "bg-emerald-100 text-emerald-600"
    : isLoop ? "bg-indigo-100 text-indigo-600"
    : "bg-orange-100 text-orange-600";
  const badge = caseT ? caseT.badge : isThen ? "bg-emerald-600" : isLoop ? "bg-indigo-600" : "bg-orange-500";
  const badgeText = caseT ? (d.badgeText ?? __t("分支")) : isThen ? __t("满足") : isLoop ? __t("循环") : __t("否则");
  const Icon = procMeta(d.name ?? "", d.cat).icon;
  return (
    <div onClick={(e) => { e.stopPropagation(); d.onSelect?.(); }}
      className={`relative px-2.5 py-1.5 rounded-lg border shadow-sm min-w-[130px] cursor-pointer ${card} ${d.selectedSub ? "ring-2 ring-sky-400 ring-offset-1" : ""}`}>
      <Handle type="target" position={Position.Top} className={HANDLE_CLS} />
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center justify-center h-4 w-4 rounded shrink-0 ${icon}`}>
          <Icon className="h-2.5 w-2.5" />
        </span>
        <p className="text-[11px] font-semibold font-mono truncate">{d.name}</p>
        {d.terminal && <span className="text-[8px] text-rose-700 bg-rose-100 rounded px-0.5 shrink-0" title={__t("事件在此被丢弃, 不会传回主链")}>{__t("终点")}</span>}
        {d.internal && <span className="text-[8px] text-muted-foreground border rounded px-0.5 shrink-0">{__t("内部")}</span>}
      </div>
      {d.liveStat && <RateBadge v={d.liveStat} />}
      {d.when && (
        <p className="text-[9px] text-amber-700 mt-0.5 truncate" title={__t("⚡ 条件执行 (when): {when}", { when: d.when })}>⚡ {d.when}</p>
      )}
      {d.first && (
        <span className={`absolute -left-1.5 -top-1.5 inline-block max-w-[150px] truncate text-[8px] rounded px-1 text-white ${badge}`}
          title={badgeText}>
          {badgeText}
        </span>
      )}
      {/* 终点处理器没有出向数据流, 不渲染下方连接点 */}
      {!d.terminal && <Handle type="source" position={Position.Bottom} className={HANDLE_CLS} />}
    </div>
  );
}

// 来源/存储锚点。
function AnchorNode({ data }: NodeProps) {
  const __t = useT();
  const d = data as ProcData;
  const Icon = d.src ? FileSearch : Database;
  return (
    <div className={`px-3 py-2.5 rounded-xl border-2 shadow-sm min-w-[150px] max-w-[190px] ${d.tone}`}>
      {d.src ? <Handle type="source" position={Position.Right} className={HANDLE_CLS} /> : <Handle type="target" position={Position.Left} className={HANDLE_CLS} />}
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-md bg-white/70"><Icon className="h-3 w-3" /></span>
        <p className="text-[10px] font-semibold opacity-70">{d.label}</p>
        {d.runNote && (
          <span className="text-[9px] bg-white/80 border rounded px-1 text-violet-700 shrink-0"
            title={__t("试跑统计: 到达存储的样本条数 (其余在链中被丢弃)")}>⟶ {d.runNote}</span>
        )}
      </div>
      <p className="text-[11px] font-mono truncate mt-0.5" title={String(d.value ?? "")}>{String(d.value ?? "")}</p>
    </div>
  );
}

const nodeTypes = { proc: ProcNode, ifn: IfNode, casen: CaseNode, foreachn: ForEachNode, sub: SubNode, anchor: AnchorNode };

function CanvasInner({ processors, sourceLabel, sinkLabel, sourceTitle, sinkTitle, onChange, readOnly, run, liveRates, parallel, fetchProcessorCatalog, patternPicker, layout: layoutSeed, onLayoutChange }: CanvasProps) {
  const __t = useT();
  const [selected, setSelected] = useState<number | null>(null);
  // 分支/循环子节点的选中态: 子节点点击查看配置 + 实时指标。br = then|else|loop
  // 或 case 列键 (b<k>|default)。
  const [selSub, setSelSub] = useState<{ i: number; br: string; j: number } | null>(null);
  const configPanelRef = useRef<HTMLDivElement | null>(null);

  // 嵌入场景 (滚动容器内) 选中节点后参数面板落在画布下方首屏之外 —
  // 主动滚到可见, 避免「点了没反应」。
  useEffect(() => {
    if (selected != null && configPanelRef.current) {
      configPanelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selected]);
  const [showLib, setShowLib] = useState(false);
  const [libQuery, setLibQuery] = useState("");
  const [full, setFull] = useState(false);
  // 布局版本号: 触发 fitView 的轻量信号 (添加/删除/重置/进全屏时)。
  const [fitTick, setFitTick] = useState(0);
  const [schema, setSchema] = useState<ProcessorSchema>({});
  const [catalog, setCatalog] = useState<CatalogType>({});
  const rfRef = useRef<ReactFlowInstance | null>(null);
  // 画布位置记忆: 布局键 -> 坐标。种子取受控 layout (产品持久化的
  // canvas_layout), 会话内的增量 (拖动/迁移/重置) 仍由内部 state 承载。
  const [posMap, setPosMap] = useState<Map<string, XYPosition>>(() => {
    const m = new Map<string, XYPosition>();
    for (const [k, v] of Object.entries(layoutSeed ?? {})) {
      if (v && typeof v.x === "number" && typeof v.y === "number") m.set(k, v);
    }
    return m;
  });
  // 布局回吐: posMap 每次变化发全量 (映射小, 拖动每帧回调可接受);
  // 产品侧 setLoading 语义的节流由调用方决定。
  useEffect(() => {
    if (!onLayoutChange) return;
    const out: Record<string, { x: number; y: number }> = {};
    for (const [k, v] of posMap) out[k] = v;
    onLayoutChange(out);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posMap]);

  // 节点库 schema 从后端元数据加载 (与 Gateway 注册中心同源, 含文档层);
  // 失败时画布仍可用 (配置退化为 JSON 编辑, 节点库只剩 schema 覆盖的项)。
  useEffect(() => {
    fetchProcessorCatalog?.()
      .then((r) => {
        setCatalog(r.processors ?? {});
        const flat: ProcessorSchema = {};
        for (const names of Object.values(r.processors ?? {})) {
          Object.assign(flat, names);
        }
        // 链里会出现域限定写法 (parsing:dissect), 目录只列裸名 —
        // 按条目自带的 category 补出 "category:name" 别名, 两种写法都能可视化。
        for (const [name, meta] of Object.entries(flat)) {
          const cat = meta?.category;
          if (cat && !flat[`${cat}:${name}`]) flat[`${cat}:${name}`] = meta;
        }
        setSchema(flat);
      })
      .catch(() => {});
  }, []);

  const procName = useCallback((p: Record<string, unknown>) => procNameOf(p), []);

  // 试跑徽标: 当前样本在链位置 i 的执行结果 (step 字段与链位置一一对
  // 应 — if 编译为单个处理器, 分支内部不单独呈现)。
  const badgeFor = useCallback((i: number): ProcData["runBadge"] => {
    if (!run) return undefined;
    const s = (run.report.steps?.[run.sampleIdx] ?? []).find((x) => x.step === i);
    if (!s) return { outcome: "skip", add: 0, chg: 0, del: 0 };
    return {
      outcome: s.outcome ?? "ok",
      add: Object.keys(s.diff?.added ?? {}).length,
      chg: Object.keys(s.diff?.changed ?? {}).length,
      del: Object.keys(s.diff?.removed ?? {}).length,
      dur: s.duration_ms,
      err: s.err,
    };
  }, [run]);

  // 存储锚点上的试跑统计: N 条样本中到达 (未被丢弃) 的条数。
  const sinkRunNote = run && run.samples.length > 0
    ? (() => {
      const dropped = (run.report.steps ?? []).filter((steps) => steps.some((s) => s.outcome === "dropped")).length;
      return __t("{dropped}/{length} 条到达", { dropped: run.samples.length - dropped, length: run.samples.length });
    })()
    : undefined;

  // 更新处理器配置时把旧内容键的位置迁移到新键 (拖过的位置不因编辑跳走);
  // 同时清理已不存在处理器的位置记忆。
  const withPositionsSynced = useCallback((nextProcs: Record<string, unknown>[], migrated?: { from: string; to: string }) => {
    setPosMap((prev) => {
      const next = new Map<string, XYPosition>();
      const keep = (k: string) => {
        const v = (migrated && k === migrated.to ? prev.get(migrated.from) : undefined) ?? prev.get(k);
        if (v) next.set(k, v);
      };
      for (const p of nextProcs) {
        keep(posKey(p));
        if (isIf(p)) {
          for (const br of ["then", "else"] as const) {
            const items = ifBranch(p, br);
            items.slice(0, MAX_DISP).forEach((_, j) => keep(`${posKey(p)}#${br}#${j}`));
            if (items.length > MAX_DISP) keep(`${posKey(p)}#${br}#${MAX_DISP}`);
          }
        } else if (isForeach(p)) {
          const items = subChainOf(p);
          items.slice(0, MAX_DISP).forEach((_, j) => keep(`${posKey(p)}#loop#${j}`));
          if (items.length > MAX_DISP) keep(`${posKey(p)}#loop#${MAX_DISP}`);
        } else if (isCase(p)) {
          for (const col of caseColumns(p, __t)) {
            if (col.fold != null) { keep(`${posKey(p)}#fold#0`); continue; }
            col.items.slice(0, MAX_DISP).forEach((_, j) => keep(`${posKey(p)}#${col.key}#${j}`));
            if (col.items.length > MAX_DISP) keep(`${posKey(p)}#${col.key}#${MAX_DISP}`);
          }
        }
      }
      keep("@src"); keep("@sink");
      return next;
    });
  }, []);

  const setProcessors = useCallback((next: Record<string, unknown>[]) => {
    withPositionsSynced(next);
    onChange(next);
  }, [onChange, withPositionsSynced]);

  // 蛇形行高: 含 if / for_each / case 的行加高分支带, 行 y 坐标前缀和。
  const layout = useMemo(() => {
    const total = processors.length + 2;
    const rows = Math.max(1, Math.ceil(total / PER_ROW));
    const heights = new Array<number>(rows).fill(ROW_H);
    processors.forEach((p, i) => {
      const maxSub = isIf(p)
        ? Math.max(
          Math.min(ifBranch(p, "then").length, MAX_DISP),
          Math.min(ifBranch(p, "else").length, MAX_DISP),
        )
        : isForeach(p) ? Math.min(subChainOf(p).length, MAX_DISP)
        : isCase(p) ? Math.max(0, ...caseColumns(p, __t).map((c) => (c.fold != null ? 1 : Math.min(c.items.length, MAX_DISP))))
        : 0;
      if (maxSub <= 0) return;
      const row = Math.floor((i + 1) / PER_ROW);
      heights[row] = Math.max(heights[row], BRANCH_TOP + Math.max(0, maxSub - 1) * BRANCH_GAP + SUB_H + 26);
    });
    const ys = new Array<number>(rows + 1).fill(0);
    for (let r = 0; r < rows; r++) ys[r + 1] = ys[r] + heights[r];
    return {
      autoPos(seqIdx: number): XYPosition {
        const row = Math.floor(seqIdx / PER_ROW);
        const col = seqIdx % PER_ROW;
        const visualCol = row % 2 === 0 ? col : PER_ROW - 1 - col;
        return { x: visualCol * COL_W + (row % 2 === 0 ? 0 : (COL_W - NODE_W)), y: ys[Math.min(row, rows - 1)] };
      },
    };
  }, [processors]);

  // ── 节点 ──
  // 受控节点的正确姿势: 节点数组放 state, onNodesChange 用 applyNodeChanges
  // 回写 (位置与尺寸测量都由 React Flow 增量维护)。此前节点按 useMemo 整体重建、
  // 拖动的每一帧都换成全新未测量对象, React Flow 的可见性门 (未测量即
  // visibility:hidden) 无法收敛, 表现为"一拖全隐藏"。
  const buildNodes = (): Node[] => {
    const total = processors.length + 2;
    const list: Node[] = [];
    const pushAnchor = (id: string, seqIdx: number, tone: string, label: string, value: string) => {
      list.push({
        id, type: "anchor", position: posMap.get(`@${id}`) ?? layout.autoPos(seqIdx),
        draggable: true, selectable: false,
        data: { src: id === "src", tone, label, value } as FlowData,
      });
    };
    pushAnchor("src", 0, "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700", sourceTitle ?? __t("来源"), sourceLabel);
    processors.forEach((p, i) => {
      const n = procName(p);
      const meta = schema[n];
      const wc = whenCond(p);
      const base: ProcData = {
        step: i + 1, name: n, cat: schema[n]?.category ?? "",
        desc: meta?.description, internal: meta?.internal,
        when: wc ? summarizeCondition(wc, __t) : undefined,
        terminal: isTerminal(p),
        runBadge: badgeFor(i),
        liveStat: liveRates?.[n],
        selected: selected === i,
        readOnly,
        canUp: i > 0, canDown: i < processors.length - 1,
        onSelect: () => { setSelSub(null); setSelected(i); },
        onUp: () => moveProcessor(i, i - 1),
        onDown: () => moveProcessor(i, i + 1),
        onRemove: () => removeProcessor(i),
      };
      if (isIf(p)) {
        list.push({
          id: `p${i}`, type: "ifn", position: posMap.get(posKey(p)) ?? layout.autoPos(i + 1),
          sourcePosition: Position.Bottom, targetPosition: Position.Left,
          data: {
            ...base,
            cond: summarizeCondition(ifCond(p), __t),
            thenCount: ifBranch(p, "then").length,
            elseCount: ifBranch(p, "else").length,
          } as FlowData,
        } as Node);
        // 分支子链节点 (超出 MAX_DISP 折叠为芯片); 点击子节点查看其配置与指标
        for (const br of ["then", "else"] as const) {
          const items = ifBranch(p, br);
          const disp = Math.min(items.length, MAX_DISP);
          const ifPos = posMap.get(posKey(p)) ?? layout.autoPos(i + 1);
          const xoff = br === "then" ? -24 : 108;
          for (let j = 0; j < disp; j++) {
            const sub = items[j];
            const sn = procName(sub);
            const subSel = selSub && selSub.i === i && selSub.br === br && selSub.j === j;
            list.push({
              id: `p${i}#${br}#${j}`, type: "sub",
              position: posMap.get(`${posKey(p)}#${br}#${j}`) ?? { x: ifPos.x + xoff, y: ifPos.y + BRANCH_TOP + j * BRANCH_GAP },
              selectable: false,
              data: {
                name: sn, branch: br, first: j === 0,
                cat: schema[sn]?.category ?? "", internal: schema[sn]?.internal,
                terminal: isTerminal(sub),
                when: summarizeCondition(whenCond(sub), __t) || undefined,
                liveStat: liveRates?.[sn],
                selectedSub: !!subSel,
                onSelect: () => { setSelected(null); setSelSub({ i, br, j }); },
              } as FlowData,
            } as Node);
          }
          if (items.length > MAX_DISP) {
            list.push({
              id: `p${i}#${br}#${MAX_DISP}`, type: "sub",
              position: posMap.get(`${posKey(p)}#${br}#${MAX_DISP}`) ?? { x: ifPos.x + xoff, y: ifPos.y + BRANCH_TOP + disp * BRANCH_GAP },
              selectable: false,
              data: { chip: items.length - MAX_DISP, branch: br } as FlowData,
            } as Node);
          }
        }
      } else if (isForeach(p)) {
        // for_each: 循环节点 + 纵向 indigo 子链列 (超出 MAX_DISP 折叠为芯片)。
        const feCfg = (p["for_each"] ?? {}) as Record<string, unknown>;
        const items = subChainOf(p);
        const disp = Math.min(items.length, MAX_DISP);
        const selfPos = posMap.get(posKey(p)) ?? layout.autoPos(i + 1);
        list.push({
          id: `p${i}`, type: "foreachn", position: selfPos,
          sourcePosition: Position.Bottom, targetPosition: Position.Left,
          data: {
            ...base,
            subCount: items.length,
            fieldSummary: typeof feCfg.message_field === "string" ? feCfg.message_field : "",
          } as FlowData,
        } as Node);
        for (let j = 0; j < disp; j++) {
          const sub = items[j];
          const sn = procName(sub);
          const loopSel = selSub && selSub.i === i && selSub.br === "loop" && selSub.j === j;
          list.push({
            id: `p${i}#loop#${j}`, type: "sub",
            position: posMap.get(`${posKey(p)}#loop#${j}`) ?? { x: selfPos.x + 24, y: selfPos.y + BRANCH_TOP + j * BRANCH_GAP },
            selectable: false,
            data: {
              name: sn, branch: "loop", first: j === 0,
              cat: schema[sn]?.category ?? "", internal: schema[sn]?.internal,
              terminal: isTerminal(sub),
              when: summarizeCondition(whenCond(sub), __t) || undefined,
              liveStat: liveRates?.[sn],
              selectedSub: !!loopSel,
              onSelect: () => { setSelected(null); setSelSub({ i, br: "loop", j }); },
            } as FlowData,
          } as Node);
        }
        if (items.length > MAX_DISP) {
          list.push({
            id: `p${i}#loop#${MAX_DISP}`, type: "sub",
            position: posMap.get(`${posKey(p)}#loop#${MAX_DISP}`) ?? { x: selfPos.x + 24, y: selfPos.y + BRANCH_TOP + disp * BRANCH_GAP },
            selectable: false,
            data: { chip: items.length - MAX_DISP, branch: "loop" } as FlowData,
          } as Node);
        }
      } else if (isCase(p)) {
        // case: 多分支节点 + 下方按分支一列的子链 (列居中铺开, 每列同样最多
        // MAX_DISP 个、超出折 "+N"; 分支列超过 MAX_CASE_COLS 的尾部折成一个
        // "+N 个分支" 芯片列; default 链排最右一列)。
        const cols = caseColumns(p, __t);
        const selfPos = posMap.get(posKey(p)) ?? layout.autoPos(i + 1);
        const cs = caseSummary(p, __t);
        const cfgField = caseCfg(p).field;
        list.push({
          id: `p${i}`, type: "casen", position: selfPos,
          sourcePosition: Position.Bottom, targetPosition: Position.Left,
          data: {
            ...base,
            caseSummary: cs.summary, caseCount: cs.count,
            caseField: typeof cfgField === "string" ? cfgField : "",
            caseHandles: cols.map((c) => c.key),
            hasDefault: caseDefault(p) != null,
          } as FlowData,
        } as Node);
        cols.forEach((col, c) => {
          // 列中心对齐节点中心 (节点估宽 NODE_W, 子卡约 140)
          const colX = selfPos.x + 19 + (c - (cols.length - 1) / 2) * CASE_COL_W;
          if (col.fold != null) {
            list.push({
              id: `p${i}#fold#0`, type: "sub",
              position: posMap.get(`${posKey(p)}#fold#0`) ?? { x: colX, y: selfPos.y + BRANCH_TOP },
              selectable: false,
              data: { chip: col.fold, chipText: col.label, branch: "fold" } as FlowData,
            } as Node);
            return;
          }
          const disp = Math.min(col.items.length, MAX_DISP);
          for (let j = 0; j < disp; j++) {
            const sub = col.items[j];
            const sn = procName(sub);
            const subSel = selSub && selSub.i === i && selSub.br === col.key && selSub.j === j;
            list.push({
              id: `p${i}#${col.key}#${j}`, type: "sub",
              position: posMap.get(`${posKey(p)}#${col.key}#${j}`) ?? { x: colX, y: selfPos.y + BRANCH_TOP + j * BRANCH_GAP },
              selectable: false,
              data: {
                name: sn, branch: col.key, first: j === 0,
                subTone: col.key === "default" ? "cased" : "case", toneIdx: col.toneIdx, badgeText: col.label,
                cat: schema[sn]?.category ?? "", internal: schema[sn]?.internal,
                terminal: isTerminal(sub),
                when: summarizeCondition(whenCond(sub), __t) || undefined,
                liveStat: liveRates?.[sn],
                selectedSub: !!subSel,
                onSelect: () => { setSelected(null); setSelSub({ i, br: col.key, j }); },
              } as FlowData,
            } as Node);
          }
          if (col.items.length > MAX_DISP) {
            list.push({
              id: `p${i}#${col.key}#${MAX_DISP}`, type: "sub",
              position: posMap.get(`${posKey(p)}#${col.key}#${MAX_DISP}`) ?? { x: colX, y: selfPos.y + BRANCH_TOP + disp * BRANCH_GAP },
              selectable: false,
              data: { chip: col.items.length - MAX_DISP, branch: col.key } as FlowData,
            } as Node);
          }
        });
      } else {
        list.push({
          id: `p${i}`, type: "proc", position: posMap.get(posKey(p)) ?? layout.autoPos(i + 1),
          sourcePosition: Position.Right, targetPosition: Position.Left,
          data: base as FlowData,
        } as Node);
      }
    });
    pushAnchor("sink", total - 1, "border-violet-300 bg-gradient-to-br from-violet-50 to-purple-50 text-violet-700", sinkTitle ?? __t("存储"), sinkLabel);
    if (sinkRunNote) {
      const sinkNode = list[list.length - 1];
      (sinkNode.data as FlowData).runNote = sinkRunNote;
    }
    return list;
  };

  // 节点 state: 仅在结构变化时整体重建 (链/选中/试跑覆盖层/schema/重置布局
  // 信号)。拖动产生的位置与测量变化走 onNodesChange 增量回写, 不触发重建;
  // posMap 只是重建时的位置种子, 不作为重建依赖。
  const [nodes, setNodes] = useState<Node[]>(() => buildNodes());
  useEffect(() => {
    setNodes(buildNodes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processors, selected, selSub, sourceLabel, sinkLabel, sourceTitle, sinkTitle, schema, layout, badgeFor, sinkRunNote, fitTick, liveRates]);

  // ── 连线: 主链蛇形 + if 分支 (满足=绿 / 否则=橙) + case 分支列 (按列配色,
  // default 灰, 无 default 时 "未命中" 直通) + for_each 循环子链 (indigo),
  // 子链尾汇入主链下一站; 终点处理器之后不画连线 ──
  const edges: Edge[] = useMemo(() => {
    const list: Edge[] = [];
    const mk = (source: string, target: string, opts?: { sourceHandle?: string; color?: string; label?: string; width?: number }): Edge => {
      const color = opts?.color ?? "#94a3b8";
      return {
        id: `e-${source}-${opts?.sourceHandle ?? "out"}-${target}`,
        source, target, sourceHandle: opts?.sourceHandle,
        type: "smoothstep", animated: true,
        style: { strokeWidth: opts?.width ?? 1.8, stroke: color },
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color },
        ...(opts?.label ? {
          label: opts.label,
          labelStyle: { fill: color, fontWeight: 700, fontSize: 10 },
          labelBgStyle: { fill: "rgba(255,255,255,0.92)" },
          labelBgPadding: [4, 2] as [number, number],
          labelBgBorderRadius: 4,
        } : {}),
      };
    };
    const hl = selected != null ? `p${selected}` : "";
    const path = ["src", ...processors.map((_, i) => `p${i}`), "sink"];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const pi = a !== "src" && a !== "sink" ? processors[Number(a.slice(1))] : null;
      if (pi && (isIf(pi) || isCase(pi))) continue; // if/case 的出边走分支段
      // 终点处理器 (如 drop_event): 事件被丢弃, 不再连向后续节点/存储
      if (pi && isTerminal(pi)) continue;
      list.push(mk(a, path[i + 1], { width: a === hl || path[i + 1] === hl ? 2.4 : 1.8, color: a === hl || path[i + 1] === hl ? "#2563eb" : undefined }));
    }
    // 子链边段: src(handle) -> 首 -> … -> 汇入主链下一站 (或 sink)。
    // 分支内同样遵循终点规则: 源头是终点处理器的边不画 (含 +N 折叠芯片的出边)。
    const pushSubChain = (srcId: string, items: Record<string, unknown>[], merge: string, color: string, opts?: { sourceHandle?: string; label?: string; on?: boolean }) => {
      const on = opts?.on ?? false;
      const segKey = opts?.sourceHandle ?? "loop";
      const shown = Math.min(items.length, MAX_DISP);
      const folded = items.length > MAX_DISP;
      if (shown === 0) {
        list.push(mk(srcId, merge, { sourceHandle: opts?.sourceHandle, color, width: on ? 2.4 : 1.8, label: opts?.label }));
        return;
      }
      // 末位为 "+N" 芯片 (超出 MAX_DISP 折叠)
      const ids = Array.from({ length: shown + (folded ? 1 : 0) }, (_, j) => `${srcId}#${segKey}#${j < shown ? j : MAX_DISP}`);
      list.push(mk(srcId, ids[0], { sourceHandle: opts?.sourceHandle, color, width: on ? 2.4 : 1.8, label: opts?.label }));
      for (let j = 1; j < ids.length; j++) {
        if (isTerminal(items[j - 1])) continue;
        list.push(mk(ids[j - 1], ids[j], { color, width: on ? 2.2 : 1.6 }));
      }
      if (folded) {
        // 芯片 → merge: 折叠区里只要出现终点, 流就断在折叠里
        if (!items.slice(shown).some(isTerminal)) list.push(mk(ids[ids.length - 1], merge, { color, width: on ? 2.2 : 1.6 }));
      } else if (!isTerminal(items[shown - 1])) {
        list.push(mk(ids[ids.length - 1], merge, { color, width: on ? 2.2 : 1.6 }));
      }
    };
    // if 分支 (满足=绿 / 否则=橙), case 分支列, for_each 循环子链 (indigo)。
    processors.forEach((p, i) => {
      if (isIf(p)) {
        const merge = i + 1 < processors.length ? `p${i + 1}` : "sink";
        const on = selected === i;
        for (const br of ["then", "else"] as const) {
          pushSubChain(`p${i}`, ifBranch(p, br), merge, br === "then" ? "#059669" : "#ea580c", {
            sourceHandle: br, label: br === "then" ? __t("满足") : __t("否则"), on,
          });
        }
      } else if (isCase(p)) {
        const merge = i + 1 < processors.length ? `p${i + 1}` : "sink";
        const on = selected === i;
        for (const col of caseColumns(p, __t)) {
          const color = caseTone(col).edge;
          if (col.fold != null) {
            // 折叠分支芯片: case → 芯片 → 汇入; 折叠里只要有一条分支不以终点
            // 收尾 (或 then 为空), 流就能汇出
            const chipId = `p${i}#fold#0`;
            list.push(mk(`p${i}`, chipId, { sourceHandle: "fold", color, width: on ? 2.4 : 1.8 }));
            const folded = caseBranches(p).slice(MAX_CASE_COLS);
            const passes = folded.some((b) => { const t = caseThen(b); return t.length === 0 || !isTerminal(t[t.length - 1]); });
            if (passes) list.push(mk(chipId, merge, { color, width: on ? 2.2 : 1.6 }));
            continue;
          }
          // 匹配摘要落在首卡角标上, 连线不再标注; then 为空 (待补) 时没有子卡,
          // 直通边上补标该分支的匹配摘要以免信息丢失
          pushSubChain(`p${i}`, col.items, merge, color, {
            sourceHandle: col.key, on, label: col.items.length === 0 ? col.label : undefined,
          });
        }
        // 无 default: 全部未命中的事件原样流向下一步 — 右侧 "未命中" 直通边
        if (caseDefault(p) == null) {
          list.push(mk(`p${i}`, merge, { sourceHandle: "miss", label: __t("未命中"), width: on ? 2.4 : 1.8, color: on ? "#2563eb" : undefined }));
        }
      } else if (isForeach(p)) {
        pushSubChain(`p${i}`, subChainOf(p), i + 1 < processors.length ? `p${i + 1}` : "sink", "#4f46e5", {
          sourceHandle: "loop", on: selected === i,
        });
      }
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processors, selected]);

  // 拖动 = 纯布局调整 (含拖动中的连续事件, 实时跟手)。执行顺序只能用
  // ↑/↓ 徽标按钮调整, 二者职责分离避免误拖改序。位置/尺寸变更先经
  // applyNodeChanges 增量回写节点 state (受控模式的标准接线, 尺寸测量
  // 得以保留), 再把落点记入位置记忆供下次重建作种子。
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
    const moved = changes.filter((c): c is Extract<NodeChange, { type: "position" }> => c.type === "position" && !!c.position);
    if (moved.length === 0) return;
    setPosMap((prev) => {
      const next = new Map(prev);
      for (const c of moved) {
        const key = nodePosKey(c.id);
        if (key) next.set(key, c.position as XYPosition);
      }
      return next;
    });
  }, [processors]);

  // 节点 id -> 布局键 (与 posMap/withPositionsSynced 同一套键); 子节点分段为
  // then|else|loop 或 case 列键 b<k>|fold|default。
  const nodePosKey = (id: string): string | null => {
    if (id === "src" || id === "sink") return `@${id}`;
    const m = id.match(/^p(\d+)(?:#(then|else|loop|fold|default|b\d+)#(\d+))?$/);
    if (!m) return null;
    const p = processors[Number(m[1])];
    if (!p) return null;
    return m[2] ? `${posKey(p)}#${m[2]}#${m[3]}` : posKey(p);
  };

  // 进出全屏 / 数量变化 / 重置布局后自适应缩放。
  useEffect(() => {
    const t = setTimeout(() => rfRef.current?.fitView({ padding: 0.12, duration: 350 }), 60);
    return () => clearTimeout(t);
  }, [full, fitTick, processors.length]);

  // 全屏时 Esc 退出; Delete/Backspace 删除选中处理器 (输入框内除外)。
  useEffect(() => {
    if (!full) return;
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
      if (e.key === "Escape" && !typing) setFull(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [full]);
  useEffect(() => {
    if (selected == null || readOnly) return;
    const h = (e: KeyboardEvent) => {
      if (e.key !== "Delete" && e.key !== "Backspace") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      e.preventDefault();
      removeProcessor(selected);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, processors, readOnly]);

  const addProcessor = (name: string, at?: XYPosition) => {
    // 有示例的处理器以示例为初始配置 (可直接改成业务值); if 兜底条件骨架。
    let p: Record<string, unknown>;
    if (name === "if") {
      const ex = schema[name]?.example as Record<string, unknown> | undefined;
      // 示例 = 完整 {if, then, else} 对象; 无示例时把种子当条件体补全结构
      // (buildIf: else 为空时省略键, 避免空数组在运行时编译失败)。
      p = ex && ("if" in ex || "then" in ex)
        ? JSON.parse(JSON.stringify(ex))
        : buildIf(JSON.parse(JSON.stringify(ex ?? { equals: { level: "error" } })), [], []);
    } else {
      const seedSrc = schema[name]?.example ?? null;
      const seed = seedSrc ? JSON.parse(JSON.stringify(seedSrc)) : {};
      p = { [name]: seed };
    }
    if (at) setPosMap((prev) => new Map(prev).set(posKey(p), at));
    setProcessors([...processors, p]);
    setSelected(processors.length);
    setFitTick((t) => t + 1);
  };

  const removeProcessor = (idx: number) => {
    setProcessors(processors.filter((_, i) => i !== idx));
    setSelected(null);
    setFitTick((t) => t + 1);
  };

  // 交换两个位置的处理器并互换其画布坐标 (视觉上两节点对调位置)。
  const moveProcessor = (from: number, to: number) => {
    if (to < 0 || to >= processors.length || from === to) return;
    const next = [...processors];
    const ka = posKey(next[from]);
    const kb = posKey(next[to]);
    [next[from], next[to]] = [next[to], next[from]];
    setPosMap((prev) => {
      const m = new Map(prev);
      const pa = m.get(ka);
      const pb = m.get(kb);
      if (pa) m.set(kb, pa);
      if (pb) m.set(ka, pb);
      return m;
    });
    onChange(next);
    setSelected(to);
  };

  const resetLayout = () => {
    setPosMap(new Map());
    setFitTick((t) => t + 1);
  };

  // 配置变更版: 迁移旧键位置到新键后再落盘。
  const setProcessorsWithMigration = (next: Record<string, unknown>[], from: string, to: string) => {
    withPositionsSynced(next, { from, to });
    onChange(next);
  };

  // 节点库条目过滤 (名称或分类匹配)。
  const filteredCatalog = useMemo(() => {
    const q = libQuery.trim().toLowerCase();
    const out: CatalogType = {};
    for (const [cat, names] of Object.entries(catalog)) {
      const hit = Object.keys(names).filter(
        (name) => !q || name.toLowerCase().includes(q) || cat.toLowerCase().includes(q),
      );
      if (hit.length > 0) out[cat] = Object.fromEntries(hit.map((h) => [h, names[h]]));
    }
    return out;
  }, [catalog, libQuery]);

  const DND_TYPE = "application/x-logpilot-proc";

  const chartArea = (
    <div
      className={`${full ? "flex-1 min-h-0" : "h-[380px]"} relative rounded-lg border bg-slate-50 overflow-hidden`}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes(DND_TYPE)) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }
      }}
      onDrop={(e) => {
        const name = e.dataTransfer.getData(DND_TYPE);
        if (!name) return;
        e.preventDefault();
        const at = rfRef.current?.screenToFlowPosition({ x: e.clientX, y: e.clientY });
        addProcessor(name, at);
        setShowLib(false);
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeClick={(_, node) => {
          const m = node.id.match(/^p(\d+)/);
          if (!m) return;
          setSelected(Number(m[1]));
        }}
        onPaneClick={() => setSelected(null)}
        onInit={(inst) => { rfRef.current = inst; }}
        minZoom={0.25}
        maxZoom={1.75}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1.6} color="#cbd5e1" />
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap pannable zoomable bgColor="#f8fafc" style={{ width: full ? 150 : 120, height: full ? 100 : 80 }} />
      </ReactFlow>

      {/* 试跑样本切换器: 丢弃样本标红, 点击切换画布呈现的样本 */}
      {run && run.samples.length > 0 && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 rounded-md border bg-background/95 shadow-sm px-1.5 py-1 max-w-[92%] overflow-x-auto">
          <span className="text-[10px] text-muted-foreground shrink-0">{__t("样本")}</span>
          {run.samples.map((s, i) => {
            const dropped = (run.report.steps?.[i] ?? []).some((st) => st.outcome === "dropped");
            return (
              <button key={i} title={s}
                className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                  i === run.sampleIdx ? "bg-primary text-primary-foreground border-primary"
                    : dropped ? "border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100"
                    : "hover:bg-muted"}`}
                onClick={() => run.onSampleIdx?.(i)}>
                #{i + 1}{dropped ? " ✕" : ""}
              </button>
            );
          })}
        </div>
      )}

      {/* 空态提示 */}
      {processors.length === 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="rounded-lg border border-dashed bg-white/80 backdrop-blur px-4 py-3 text-xs text-muted-foreground">
            {__t("尚无处理器 — 从上方「添加处理器」点击或")}<strong className="font-semibold">{__t("拖入")}</strong>{__t("画布")}</div>
        </div>
      )}
    </div>
  );

  // 节点库经 Portal 挂到 body 并以按钮坐标 fixed 定位 — 嵌入对话框
  // (overflow 容器) 时绝对定位会被裁剪/错位, portal 不受祖先裁剪影响。
  const libBtnRef = useRef<HTMLButtonElement | null>(null);
  const [libPos, setLibPos] = useState<{ top: number; left: number } | null>(null);
  useEffect(() => {
    if (!showLib || !libBtnRef.current) return;
    const r = libBtnRef.current.getBoundingClientRect();
    setLibPos({ top: r.bottom + 4, left: r.left });
    const onScroll = () => {
      if (!libBtnRef.current) return;
      const rr = libBtnRef.current.getBoundingClientRect();
      setLibPos({ top: rr.bottom + 4, left: rr.left });
    };
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [showLib]);
  const libPanel = showLib && (
    <div className="w-80 rounded-lg border bg-background shadow-lg p-2 max-h-80 overflow-y-auto">
      <div className="relative mb-1.5">
        <Search className="h-3.5 w-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input autoFocus className="h-7 pl-7 text-xs" placeholder={__t("搜索处理器…")} value={libQuery} onChange={(e) => setLibQuery(e.target.value)} />
      </div>
      {Object.keys(filteredCatalog).length === 0 && (
        <p className="text-xs text-muted-foreground p-2">{__t("无匹配处理器")}</p>
      )}
      {Object.entries(filteredCatalog).map(([cat, names]) => (
        <div key={cat} className="mb-1.5">
          <p className="text-[10px] font-semibold text-muted-foreground px-1 mb-0.5">{cat}</p>
          {Object.entries(names).map(([name, meta]) => (
            <button
              key={name}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(DND_TYPE, name);
                e.dataTransfer.effectAllowed = "copy";
              }}
              className="w-full px-2 py-1 rounded hover:bg-muted text-left cursor-grab active:cursor-grabbing"
              title={meta?.description ?? name}
              onClick={() => addProcessor(name)}
            >
              <span className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="truncate">{name}</span>
                <span className="flex items-center gap-1 shrink-0">
                  {meta?.internal && <span className="text-[8px] text-muted-foreground border rounded px-0.5">{__t("内部")}</span>}
                  {meta?.properties && Object.keys(meta.properties).length > 0 && <span className="text-[8px] text-green-600" title={__t("可视化表单支持")}>✓</span>}
                  <Plus className="h-3 w-3 text-muted-foreground/60" />
                </span>
              </span>
              {meta?.description && <p className="text-[9px] text-muted-foreground/80 truncate">{meta.description}</p>}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
  const libPortal = libPanel && libPos ? createPortal(
    <div className="fixed z-[200]" style={{ top: libPos.top, left: libPos.left }}
      onClick={(e) => e.stopPropagation()}>
      {libPanel}
    </div>,
    document.body,
  ) : null;

  // if 分支子链编辑器: 纵向列表, 每个子处理器一张 SchemaForm。
  function SubChainEditor({ title, tone, items, onItems, emptyHint }: {
    title: string; tone: string;
    items: Record<string, unknown>[];
    onItems: (next: Record<string, unknown>[]) => void;
    emptyHint?: string;
  }) {
    const allNames = useMemo(() =>
      Object.entries(catalog).flatMap(([, names]) => Object.keys(names)).sort(),
    [catalog]);
    const updateItem = (j: number, next: Record<string, unknown>) => {
      const arr = [...items];
      arr[j] = next;
      onItems(arr);
    };
    return (
      <div className="rounded border p-1.5 bg-background/60">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`text-[9px] rounded px-1 text-white ${tone}`}>{title}</span>
          <span className="text-[10px] text-muted-foreground">{__t("{length}  个处理器", { length: items.length })}</span>
          <div className="flex-1" />
          <Select className="h-6 text-[11px] w-40" value=""
            onChange={(e) => {
              const name = e.target.value;
              if (!name) return;
              const seedSrc = schema[name]?.example;
              const seed = seedSrc ? JSON.parse(JSON.stringify(seedSrc)) : {};
              onItems([...items, { [name]: seed }]);
            }}>
            <option value="">{__t("+ 添加子处理器")}</option>
            {allNames.map((n) => <option key={n} value={n}>{n}</option>)}
          </Select>
        </div>
        {items.length === 0 && (
          <p className={`text-[10px] px-1 py-0.5 ${emptyHint ? "text-amber-600" : "text-muted-foreground/70"}`}>
            {emptyHint ?? __t("空 — 命中后不做任何处理, 直接汇回主链")}
          </p>
        )}
        {items.map((item, j) => {
          const n = isIf(item) ? "if" : Object.keys(item)[0] ?? "?";
          return (
            <div key={j} className="mb-1 rounded border bg-muted/20 p-1.5">
              <div className="flex items-center gap-1 mb-1">
                <Badge variant="outline" className="font-mono text-[9px] px-1">{j + 1} {n}</Badge>
                <div className="flex-1" />
                <button className="h-5 w-5 text-muted-foreground hover:text-primary disabled:opacity-30" disabled={j === 0}
                  title={__t("上移")} onClick={() => { const a = [...items]; [a[j - 1], a[j]] = [a[j], a[j - 1]]; onItems(a); }}>
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M18 15l-6-6-6 6" /></svg>
                </button>
                <button className="h-5 w-5 text-muted-foreground hover:text-primary disabled:opacity-30" disabled={j === items.length - 1}
                  title={__t("下移")} onClick={() => { const a = [...items]; [a[j + 1], a[j]] = [a[j], a[j + 1]]; onItems(a); }}>
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <button className="h-5 w-5 text-muted-foreground hover:text-red-600" title={__t("删除")}
                  onClick={() => onItems(items.filter((_, x) => x !== j))}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              {/* 嵌套 case (if 分支/for_each 子链里): 单层 SchemaForm 装不下
                  branches 结构, 换专用编辑器直接写回该条目。 */}
              {n === "case" ? (
                <CaseConfigEditor
                  cfg={(item[n] as Record<string, unknown>) ?? {}}
                  onCfg={(next) => updateItem(j, { case: next })} />
              ) : (
                <SchemaForm
                  t={__t}
                  patternPicker={patternPicker}
                  schema={schema}
                  processorName={n}
                  cfg={(item[n] as Record<string, unknown>) ?? {}}
                  onChange={(next) => updateItem(j, { [n]: next })}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // if 条件编辑器: 常用操作符结构化编辑, and/or/not 与复杂形态走 JSON。
  function ConditionEditor({ cond, onChange: onCond }: {
    cond: Record<string, unknown>;
    onChange: (next: Record<string, unknown>) => void;
  }) {
    const OPS = ["equals", "contains", "range", "exists", "and", "or", "not"] as const;
    const op = OPS.find((o) => o in cond) ?? "adv";
    const [draft, setDraft] = useState("");
    const setOp = (next: string) => {
      if (next === op) return;
      const out: Record<string, unknown> = {};
      if (next === "equals" || next === "contains") out[next] = { "": "" };
      else if (next === "range") out[next] = { "": {} };
      else if (next === "exists") out[next] = [""];
      else if (next === "and" || next === "or") out[next] = [{ equals: { "": "" } }];
      else if (next === "not") out[next] = { equals: { "": "" } };
      onCond(out); // 切换操作符即重置条件 (避免跨形态的脏字段)
    };
    if (op === "adv") {
      return (
        <div>
          <div className="flex items-center gap-1.5">
            <Select className="h-7 text-xs w-36" value="adv" onChange={(e) => setOp(e.target.value)}>
              <option value="adv">{__t("高级 JSON")}</option>
              {OPS.map((o) => <option key={o} value={o}>{o}</option>)}
            </Select>
            <span className="text-[10px] text-muted-foreground">{__t("支持 and / or / not / regexp / network / prefix… 嵌套组合")}</span>
          </div>
          <Textarea className="mt-1 text-[11px] font-mono" rows={3}
            value={draft || (Object.keys(cond).length ? JSON.stringify(cond, null, 2) : "")}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              try { onCond(draft.trim() ? JSON.parse(draft) : {}); setDraft(""); } catch { /* 草稿中 */ }
            }} />
        </div>
      );
    }
    if (op === "equals" || op === "contains") {
      const pairs = Object.entries((cond[op] as Record<string, unknown>) ?? {});
      const setPairs = (next: [string, unknown][]) => {
        const o: Record<string, unknown> = {};
        for (const [k, v] of next) o[k] = v;
        onCond({ [op]: o });
      };
      return (
        <EditorShell op={op} setOp={setOp} hint={__t("事件字段 {v0}给定值", { v0: op === "equals" ? __t("等于") : __t("包含") })}>
          {pairs.map(([f, v], j) => (
            <div key={j} className="flex items-center gap-1">
              <Input className="h-7 flex-1 text-xs font-mono" placeholder={__t("字段名 (如 level)")} value={f}
                onChange={(e) => { const a: [string, unknown][] = [...pairs]; a[j] = [e.target.value, v]; setPairs(a); }} />
              <span className="text-[10px] text-muted-foreground">{op === "equals" ? "==" : __t("包含")}</span>
              <Input className="h-7 flex-1 text-xs font-mono" placeholder={__t("值")} value={typeof v === "string" ? v : JSON.stringify(v ?? "")}
                onChange={(e) => { const a: [string, unknown][] = [...pairs]; const raw = e.target.value; a[j] = [f, /^-?\d+(\.\d+)?$/.test(raw) ? Number(raw) : raw]; setPairs(a); }} />
              <button className="text-muted-foreground/60 hover:text-red-600" onClick={() => setPairs(pairs.filter((_, x) => x !== j))}><X className="h-3 w-3" /></button>
            </div>
          ))}
          <button className="text-[10px] text-muted-foreground hover:text-primary" onClick={() => setPairs([...pairs, ["", ""]])}>{__t("+ 条件")}</button>
        </EditorShell>
      );
    }
    if (op === "range") {
      const entries = Object.entries((cond[op] as Record<string, unknown>) ?? {});
      const f = entries[0]?.[0] ?? "";
      const r = (entries[0]?.[1] ?? {}) as Record<string, unknown>;
      const setRange = (nf: string, nr: Record<string, unknown>) => onCond({ range: nf ? { [nf]: nr } : {} });
      return (
        <EditorShell op={op} setOp={setOp} hint={__t("字段值落在 [下限, 上限] 区间")}>
          <div className="flex items-center gap-1">
            <Input className="h-7 flex-1 text-xs font-mono" placeholder={__t("字段名")} value={f}
              onChange={(e) => setRange(e.target.value, r)} />
            <Input className="h-7 w-20 text-xs" type="number" placeholder="≥" value={r.gte != null ? String(r.gte) : ""}
              onChange={(e) => setRange(f, { ...r, gte: e.target.value === "" ? undefined : Number(e.target.value) })} />
            <Input className="h-7 w-20 text-xs" type="number" placeholder="≤" value={r.lte != null ? String(r.lte) : ""}
              onChange={(e) => setRange(f, { ...r, lte: e.target.value === "" ? undefined : Number(e.target.value) })} />
          </div>
        </EditorShell>
      );
    }
    if (op === "exists") {
      const arr = Array.isArray(cond[op]) ? (cond[op] as unknown[]) : [];
      return (
        <EditorShell op={op} setOp={setOp} hint={__t("这些字段存在 (任一判断)")}>
          <Textarea className="text-[11px] font-mono" rows={2} placeholder={__t("每行一个字段名")}
            value={arr.map((x) => String(x)).join("\n")}
            onChange={(e) => onCond({ exists: e.target.value.split("\n").filter((l) => l.trim() !== "") })} />
        </EditorShell>
      );
    }
    // and / or / not: JSON 编辑
    return (
      <EditorShell op={op} setOp={setOp} hint={op === "not" ? __t("取反") : __t("子条件数组, 全部/任一满足")}>
        <Textarea className="text-[11px] font-mono" rows={3}
          value={draft || JSON.stringify(cond, null, 2)}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            try { onCond(draft.trim() ? JSON.parse(draft) : {}); setDraft(""); } catch { /* 草稿中 */ }
          }} />
      </EditorShell>
    );
  }

  function EditorShell({ op, setOp, hint, children }: {
    op: string; setOp: (o: string) => void; hint: string; children: React.ReactNode;
  }) {
    return (
      <div>
        <div className="flex items-center gap-2">
          <Select className="h-7 text-xs w-36" value={op} onChange={(e) => setOp(e.target.value)}>
            {["equals", "contains", "range", "exists", "and", "or", "not"].map((o) => <option key={o} value={o}>{o}</option>)}
            <option value="adv">{__t("高级 JSON")}</option>
          </Select>
          <span className="text-[10px] text-muted-foreground">{hint}</span>
        </div>
        <div className="mt-1.5 space-y-1">{children}</div>
      </div>
    );
  }

  // case 多分支编辑器: field + 分支列表 (values 枚举 / when 条件 / then 子链)
  // + 可选 default 兜底链。分支卡可排序/删除; values 与 when 可同填 (= AND),
  // 两者皆空时给出发布会编译失败的警示 (与框架校验一致)。
  function CaseConfigEditor({ cfg, onCfg }: {
    cfg: Record<string, unknown>;
    onCfg: (next: Record<string, unknown>) => void;
  }) {
    const field = typeof cfg.field === "string" ? cfg.field : "";
    const branches = Array.isArray(cfg.branches) ? (cfg.branches as Record<string, unknown>[]) : [];
    const defaultItems = Array.isArray(cfg.default) ? (cfg.default as Record<string, unknown>[]) : null;
    const dropDefault = () => {
      const { default: _d, ...rest } = cfg;
      void _d;
      onCfg(rest); // 不用时整个省略键, 避免空链形态
    };
    return (
      <div className="space-y-2">
        <div>
          <Label className="text-xs">{__t("枚举字段 (field)")}</Label>
          <Input className="mt-1 h-7 text-xs font-mono" placeholder={__t("如 level — values 分支的取值字段, 纯 when 条件分支可留空")}
            value={field}
            onChange={(e) => onCfg({ ...cfg, field: e.target.value })} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <Label className="text-xs">{__t("分支 (branches) — 按序匹配, 首个命中执行")}</Label>
            <div className="flex-1" />
            <Button size="sm" variant="outline" className="h-6 text-[11px] px-2"
              onClick={() => onCfg({ ...cfg, branches: [...branches, { values: [], then: [] }] })}>
              <Plus className="h-3 w-3 mr-0.5" />{__t("添加分支")}</Button>
          </div>
          {branches.length === 0 && (
            <p className="text-[10px] text-amber-600 mt-1">{__t("至少需要一个分支 — 只有两种走向时用 if 即可")}</p>
          )}
          {branches.map((b, j) => {
            const values = Array.isArray(b.values) ? (b.values as unknown[]) : [];
            const when = b.when != null && typeof b.when === "object" && Object.keys(b.when as object).length > 0
              ? (b.when as Record<string, unknown>) : null;
            const thenItems = Array.isArray(b.then) ? (b.then as Record<string, unknown>[]) : [];
            const brUpdate = (next: Record<string, unknown>) => {
              onCfg({ ...cfg, branches: branches.map((x, k) => (k === j ? next : x)) });
            };
            const matcherText = [
              values.length > 0 ? `${field || "?"} ∈ ${values.map(String).join(",")}` : "",
              when ? summarizeCondition(when, __t) : "",
            ].filter(Boolean).join(__t(" 且 "));
            return (
              <div key={j} className="mt-1.5 rounded border bg-muted/20 p-1.5">
                <div className="flex items-center gap-1 mb-1">
                  <Badge variant="outline" className="font-mono text-[9px] px-1 shrink-0">{__t("分支")}{j + 1}</Badge>
                  <span className="text-[9px] text-muted-foreground truncate flex-1" title={matcherText}>
                    {matcherText || __t("未配置匹配")}
                  </span>
                  <button className="h-5 w-5 text-muted-foreground hover:text-primary disabled:opacity-30" disabled={j === 0}
                    title={__t("上移 (提前匹配)")} onClick={() => { const a = [...branches]; [a[j - 1], a[j]] = [a[j], a[j - 1]]; onCfg({ ...cfg, branches: a }); }}>
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M18 15l-6-6-6 6" /></svg>
                  </button>
                  <button className="h-5 w-5 text-muted-foreground hover:text-primary disabled:opacity-30" disabled={j === branches.length - 1}
                    title={__t("下移 (靠后匹配)")} onClick={() => { const a = [...branches]; [a[j + 1], a[j]] = [a[j], a[j + 1]]; onCfg({ ...cfg, branches: a }); }}>
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  <button className="h-5 w-5 text-muted-foreground hover:text-red-600" title={__t("删除分支")}
                    onClick={() => onCfg({ ...cfg, branches: branches.filter((_, x) => x !== j) })}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  <div className="rounded border p-1.5 bg-background/60">
                    <p className="text-[10px] text-muted-foreground mb-1">
                      {__t("枚举匹配 (values)")}{field ? "" : <span className="text-amber-600"> {__t("— 需先填 field")}</span>}
                    </p>
                    <Input className="h-7 text-xs font-mono" placeholder={__t("逗号分隔多值, 如 error, fatal")}
                      value={values.map(String).join(",")}
                      onChange={(e) => brUpdate({ ...b, values: e.target.value.split(/[,，]/).map((s) => s.trim()).filter((s) => s !== "") })} />
                  </div>
                  <div className="rounded border p-1.5 bg-background/60">
                    <p className="text-[10px] text-muted-foreground mb-1">
                      {__t("条件匹配 (when) — 与 values 同填 = 同时满足")}{when == null && (
                        <button className="text-primary hover:underline ml-1"
                          onClick={() => brUpdate({ ...b, when: { equals: { "": "" } } })}>{__t("+ 启用")}</button>
                      )}
                    </p>
                    {when != null ? (
                      <>
                        <ConditionEditor cond={when} onChange={(w) => brUpdate({ ...b, when: w })} />
                        <button className="text-[10px] text-muted-foreground hover:text-red-600 mt-0.5"
                          onClick={() => { const { when: _w, ...rest } = b; void _w; brUpdate(rest); }}>{__t("移除条件")}</button>
                      </>
                    ) : (
                      <p className="text-[10px] text-muted-foreground/60 py-1">{__t("未启用 — 仅按 values 匹配")}</p>
                    )}
                  </div>
                </div>
                {values.length === 0 && when == null && (
                  <p className="text-[10px] text-amber-600 mt-1" title={__t("框架编译要求每个分支声明 values 或 when 之一")}>
                    {__t("⚠ values 与 when 至少配置其一 (发布编译会失败)")}</p>
                )}
                {values.length > 0 && !field && (
                  <p className="text-[10px] text-amber-600 mt-1" title={__t("values 分支的枚举依赖 case 块的 field 声明")}>
                    {__t("⚠ values 需要 case 块声明 field")}</p>
                )}
                <div className="mt-1.5">
                  <SubChainEditor title={__t("命中")} tone="bg-amber-500" items={thenItems}
                    emptyHint={__t("必填 — 命中后需至少一个处理器 (空链会编译失败)")}
                    onItems={(items) => brUpdate({ ...b, then: items })} />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <Label className="text-xs">{__t("兜底分支 (default) — 全部未命中时执行")}</Label>
            <div className="flex-1" />
            {defaultItems == null ? (
              <Button size="sm" variant="outline" className="h-6 text-[11px] px-2"
                onClick={() => onCfg({ ...cfg, default: [] })}>
                <Plus className="h-3 w-3 mr-0.5" />{__t("启用 default")}</Button>
            ) : (
              <button className="text-[10px] text-muted-foreground hover:text-red-600"
                title={__t("不用时整个省略键 (与空链等价)")} onClick={dropDefault}>{__t("移除 default")}</button>
            )}
          </div>
          {defaultItems != null && (
            <div className="mt-1">
              <SubChainEditor title={__t("默认")} tone="bg-slate-500" items={defaultItems}
                emptyHint={__t("空链时保存自动省略 default 键 (全部未命中 = 本步不做任何事) — 添加处理器后生效")}
                onItems={(items) => {
                  if (items.length === 0) { dropDefault(); return; }
                  onCfg({ ...cfg, default: items });
                }} />
            </div>
          )}
        </div>
      </div>
    );
  }

  const selectedProc = selected != null ? processors[selected] : null;
  const selectedName = selectedProc ? procName(selectedProc) : "";
  const selectedMeta = schema[selectedName];

  // 子节点 (if 分支 / case 分支列 / for_each 循环) 的配置面板 + 速率指标
  const subInfo = (() => {
    if (!selSub) return null;
    const p = processors[selSub.i];
    if (!p) return null;
    let items: Record<string, unknown>[] = [];
    if (isIf(p)) {
      if (selSub.br !== "then" && selSub.br !== "else") return null;
      items = ifBranch(p, selSub.br);
    } else if (isCase(p)) {
      const it = caseBranchItems(p, selSub.br);
      if (!it) return null;
      items = it;
    } else {
      items = subChainOf(p);
    }
    return items[selSub.j] ?? null;
  })();
  const subName = subInfo ? procName(subInfo) : "";
  const subParams = subInfo ? ((subInfo[subName] ?? {}) as Record<string, unknown>) : {};
  const subRate = subName ? liveRates?.[subName] : undefined;
  // 面板标题里的分支定位: then/else/loop 原样; case 列 → branches[k].then / default
  const subBrLabel = !selSub ? ""
    : selSub.br === "default" ? "default"
    : /^b\d+$/.test(selSub.br) ? `branches[${Number(selSub.br.slice(1)) + 1}].then`
    : selSub.br;
  const subParentKind = !selSub ? "" : selSub.br === "loop" ? __t("循环子链") : isCase(processors[selSub.i] ?? {}) ? __t("case 节点") : __t("if 节点");

  // 分支/循环子处理器的就地编辑: 直接写回父条目 (if 分支 → buildIf 重组,
  // case → 对应分支 then / default 链替换, for_each → processor 子链替换)。
  // 复合结构 (嵌套 if/case/for_each) 保持只读 — SchemaForm 的单层 cfg 视图
  // 装不下子链, 结构化编辑走父节点专用编辑器。
  const subCompound = subInfo != null && (subName === "if" || isForeach(subInfo) || isCase(subInfo));
  const subEditable = subInfo != null && !readOnly && !subCompound;
  const updateSubItem = (next: Record<string, unknown>) => {
    if (!selSub) return;
    const { i, j, br } = selSub;
    const p = [...processors];
    const parent = p[i];
    const rebuild = (items: Record<string, unknown>[]) => items.map((x, k) => (k === j ? next : x));
    if (isIf(parent)) {
      p[i] = buildIf(
        ifCond(parent),
        br === "then" ? rebuild(ifBranch(parent, "then")) : ifBranch(parent, "then"),
        br === "else" ? rebuild(ifBranch(parent, "else")) : ifBranch(parent, "else"),
      );
    } else if (isCase(parent)) {
      const cfg = caseCfg(parent);
      if (br === "default") {
        p[i] = { case: { ...cfg, default: rebuild(caseDefault(parent) ?? []) } };
      } else {
        const k0 = Number(br.slice(1));
        p[i] = { case: { ...cfg, branches: caseBranches(parent).map((b, k) => (k === k0 ? { ...b, then: rebuild(caseThen(b)) } : b)) } };
      }
    } else {
      const feCfg = (parent["for_each"] ?? {}) as Record<string, unknown>;
      p[i] = { for_each: { ...feCfg, processor: rebuild(subChainOf(parent)) } };
    }
    setProcessors(p);
  };

  const subPanel = subInfo != null && (
    <div className="mt-2 rounded-lg border p-2.5 bg-muted/30">
      <div className="flex items-center gap-2 mb-1.5">
        <Badge variant="outline" className="font-mono text-[10px]">
          #{(selSub?.i ?? 0) + 1}.{subBrLabel}[{(selSub?.j ?? 0) + 1}] {subName}
        </Badge>
        {schema[subName]?.internal && <span className="text-[9px] text-muted-foreground border rounded px-1">{__t("内部处理器")}</span>}
        <span className="text-[10px] text-muted-foreground">
          {readOnly ? __t("配置 (只读)")
            : subCompound ? __t("配置 (只读 — 编辑请展开 {subParentKind})", { subParentKind: subParentKind })
            : __t("参数")}
        </span>
        <div className="flex-1" />
        {subRate && (
          <span className="text-[10px] font-mono text-sky-700 bg-sky-50 border border-sky-100 rounded px-1.5 py-0.5 tabular-nums"
            title={__t("实时吞吐与单条平均耗时 (3s 采样差值, 同名处理器聚合)")}>
            ⚡ {subRate.rate >= 1000 ? `${(subRate.rate / 1000).toFixed(1)}k/s` : `${Math.round(subRate.rate * 10) / 10}/s`}{subRate.avgMs > 0 ? ` · ${subRate.avgMs.toFixed(2)}ms` : ""}
          </span>
        )}
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setSelSub(null)}><X className="h-3 w-3" /></Button>
      </div>
      {schema[subName]?.description && (
        <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted-foreground/20 pl-2 mb-1.5">
          {schema[subName]?.description}
        </p>
      )}
      {subEditable ? (
        <SchemaForm
          t={__t}
          patternPicker={patternPicker}
          schema={schema}
          processorName={subName}
          cfg={subParams}
          onChange={(next) => updateSubItem({ [subName]: next })}
        />
      ) : (
        <pre className="text-[10px] font-mono bg-background/70 rounded border p-2 overflow-auto max-h-56 whitespace-pre-wrap">
          {Object.keys(subParams).length > 0 ? JSON.stringify(subParams, null, 2) : __t("// 无参数")}
        </pre>
      )}
    </div>
  );


  const configPanel = selectedProc != null && (
    <div className="mt-2 rounded-lg border p-2.5 bg-muted/30">
      <div className="flex items-center gap-2 mb-1.5">
        <Badge variant="outline" className="font-mono text-[10px]">#{selected! + 1} {selectedName}</Badge>
        {selectedMeta?.internal && <span className="text-[9px] text-muted-foreground border rounded px-1">{__t("内部处理器")}</span>}
        <span className="text-[10px] text-muted-foreground">{readOnly ? __t("参数 (只读)") : __t("配置")}</span>
        <div className="flex-1" />
        {!readOnly && (
          <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]" onClick={() => removeProcessor(selected!)}>
            <Trash2 className="h-3 w-3 mr-0.5" />{__t("删除")}</Button>
        )}
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setSelected(null)}><X className="h-3 w-3" /></Button>
      </div>
      {/* 试跑详情: 当前样本在该节点的输入/输出变化 (跑过试跑才显示) */}
      {run && (() => {
        const s = (run.report.steps?.[run.sampleIdx] ?? []).find((x) => x.step === selected);
        const outcomeText = !s ? __t("未经过")
          : s.outcome === "dropped" ? __t("丢弃")
          : s.outcome === "error" ? __t("错误") : __t("通过");
        const outcomeCls = !s ? "text-slate-500 bg-slate-100"
          : s.outcome === "dropped" ? "text-rose-700 bg-rose-100"
          : s.outcome === "error" ? "text-amber-700 bg-amber-100"
          : "text-emerald-700 bg-emerald-100";
        return (
          <div className="rounded border border-sky-200 bg-sky-50/60 p-2 space-y-1 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <FlaskConical className="h-3 w-3 text-sky-600" />
              <span className="text-[10px] font-semibold text-sky-800">
                {__t("试跑 · 样本 #")}{(run.sampleIdx ?? 0) + 1}
              </span>
              <span className={`text-[9px] rounded px-1 font-medium ${outcomeCls}`}>{outcomeText}</span>
              {s?.duration_ms != null && <span className="text-[9px] text-slate-400">{s.duration_ms}ms</span>}
            </div>
            <p className="text-[10px] font-mono text-muted-foreground border rounded px-1.5 py-1 bg-white/70 break-all line-clamp-2"
              title={run.samples[run.sampleIdx]}>
              {run.samples[run.sampleIdx]}
            </p>
            {s?.err && <p className="text-[10px] text-amber-700 break-all">{s.err}</p>}
            {s && <DiffRows diff={s.diff} />}
          </div>
        );
      })()}
      {readOnly ? (
        (() => {
          // 只读参数视图: 描述 + 完整参数 JSON。选中条目原样呈现 (if/for_each
          // 等复合结构不拆编辑器), 点击节点即所见。
          const params = selectedProc[selectedName];
          return (
            <div className="space-y-1.5">
              {selectedMeta?.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted-foreground/20 pl-2">
                  {selectedMeta.description}
                </p>
              )}
              <pre className={`text-[10px] font-mono bg-background/70 rounded border p-2 overflow-auto whitespace-pre-wrap ${full ? "max-h-[46vh]" : "max-h-56"}`}>
                {params == null ? __t("// 无参数") : JSON.stringify(params, null, 2)}
              </pre>
            </div>
          );
        })()
      ) : selectedName === "if" ? (
        (() => {
          const cond = ifCond(selectedProc);
          const thenItems = ifBranch(selectedProc, "then");
          const elseItems = ifBranch(selectedProc, "else");
          const update = (nextCond: Record<string, unknown>, nextThen = thenItems, nextElse = elseItems) => {
            const p = [...processors];
            const oldKey = posKey(p[selected!]);
            p[selected!] = buildIf(nextCond, nextThen, nextElse);
            setProcessorsWithMigration(p, oldKey, posKey(p[selected!]));
          };
          const setCond = (c: Record<string, unknown>) => update(c);
          const setBranch = (br: "then" | "else", items: Record<string, unknown>[]) =>
            update(cond, br === "then" ? items : thenItems, br === "else" ? items : elseItems);
          return (
            <div className={`space-y-2 ${full ? "max-h-[52vh] overflow-y-auto pr-1" : ""}`}>
              {selectedMeta?.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted-foreground/20 pl-2">
                  {selectedMeta.description}
                </p>
              )}
              <div>
                <Label className="text-xs">{__t("条件 (condition)")}</Label>
                <div className="mt-1 rounded border p-1.5 bg-background/60">
                  <ConditionEditor cond={cond} onChange={setCond} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">{__t("满足分支 (then)")}</Label>
                  <SubChainEditor title={__t("满足")} tone="bg-emerald-600"
                    items={thenItems}
                    emptyHint={__t("必填 — 发布前需至少一个处理器 (空链会编译失败)")}
                    onItems={(items) => setBranch("then", items)} />
                </div>
                <div>
                  <Label className="text-xs">{__t("否则分支 (else)")}</Label>
                  <SubChainEditor title={__t("否则")} tone="bg-orange-500"
                    items={elseItems}
                    emptyHint={__t("可省略 — 留空时不写 else 键")}
                    onItems={(items) => setBranch("else", items)} />
                </div>
              </div>
            </div>
          );
        })()
      ) : selectedName === "case" ? (
        (() => {
          const cfg = (selectedProc["case"] ?? {}) as Record<string, unknown>;
          const update = (next: Record<string, unknown>) => {
            const p = [...processors];
            const oldKey = posKey(p[selected!]);
            p[selected!] = { case: next };
            setProcessorsWithMigration(p, oldKey, posKey(p[selected!]));
          };
          return (
            <div className={`space-y-2 ${full ? "max-h-[52vh] overflow-y-auto pr-1" : ""}`}>
              {selectedMeta?.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted-foreground/20 pl-2">
                  {selectedMeta.description}
                </p>
              )}
              <CaseConfigEditor cfg={cfg} onCfg={update} />
            </div>
          );
        })()
      ) : isForeach(selectedProc) ? (
        (() => {
          const feCfg = (selectedProc["for_each"] ?? {}) as Record<string, unknown>;
          const items = subChainOf(selectedProc);
          const update = (nextCfg: Record<string, unknown>) => {
            const p = [...processors];
            const oldKey = posKey(p[selected!]);
            p[selected!] = { for_each: nextCfg };
            setProcessorsWithMigration(p, oldKey, posKey(p[selected!]));
          };
          // processor 子链由上方 SubChainEditor 专用编辑, SchemaForm 里剔除,
          // 其余字段 (message_field / codec / 内嵌 when 等) 仍走可视化表单。
          const fm = schema["for_each"];
          const feSchema: ProcessorSchema = fm?.properties
            ? {
              ...schema,
              for_each: {
                ...fm,
                properties: Object.fromEntries(Object.entries(fm.properties).filter(([k]) => k !== "processor")),
                param_docs: Object.fromEntries(Object.entries(fm.param_docs ?? {}).filter(([k]) => k !== "processor")),
              },
            }
            : schema;
          const restCfg = { ...feCfg };
          delete restCfg.processor;
          return (
            <div className={`space-y-2 ${full ? "max-h-[52vh] overflow-y-auto pr-1" : ""}`}>
              {fm?.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted-foreground/20 pl-2">
                  {fm.description}
                </p>
              )}
              <div>
                <Label className="text-xs">{__t("循环子链 (processor) — 对数组的每个元素依次执行")}</Label>
                <div className="mt-1">
                  <SubChainEditor title={__t("循环")} tone="bg-indigo-600"
                    items={items}
                    emptyHint={__t("必填 — for_each 需要至少一个子处理器 (空链会编译失败)")}
                    onItems={(next) => update({ ...feCfg, processor: next })} />
                </div>
              </div>
              <div>
                <Label className="text-xs">{__t("其他字段 (message_field / codec / 内嵌 when 等)")}</Label>
                <div className="mt-1 rounded border p-1.5 bg-background/60">
                  <SchemaForm t={__t} patternPicker={patternPicker} schema={feSchema} processorName="for_each" cfg={restCfg}
                    onChange={(next) => update({ ...next, processor: items })} />
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <div className={full ? "max-h-[38vh] overflow-y-auto pr-1" : ""}>
          <SchemaForm
            t={__t}
            patternPicker={patternPicker}
            schema={schema}
            processorName={selectedName}
            cfg={(selectedProc[selectedName] as Record<string, unknown>) ?? {}}
            onChange={(next) => {
              const p = [...processors];
              const oldKey = posKey(p[selected!]);
              p[selected!] = { [selectedName]: next } as Record<string, unknown>;
              setProcessorsWithMigration(p, oldKey, posKey(p[selected!]));
            }}
          />
        </div>
      )}
    </div>
  );

  const ui = (
    <>
      {/* 工具栏 — 只读模式隐藏编辑入口 (添加/重置), 保留全屏 */}
      <div className={`flex items-center gap-1.5 mb-1.5 ${full ? "shrink-0" : ""}`}>
        {!readOnly && (
          <div className="relative flex gap-1.5">
            <Button ref={libBtnRef} size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setShowLib((v) => !v); setLibQuery(""); }}>
              <Plus className="h-3 w-3 mr-1" />{__t("添加处理器")}</Button>
            {libPortal}
          </div>
        )}
        {!readOnly && (
          <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" onClick={resetLayout} title={__t("忽略已保存的自定义坐标, 回到蛇形自动布局")}>
            <RotateCcw className="h-3 w-3 mr-1" />{__t("重置布局")}</Button>
        )}
        {readOnly && <span className="text-[10px] text-muted-foreground/70">{__t("只读视图 · 点击节点查看参数")}</span>}
        {readOnly && parallel != null && parallel > 1 && (
          <span className="text-[9px] text-sky-700 bg-sky-50 border border-sky-200 rounded px-1.5 py-0.5 font-medium"
            title={__t("该子链 {parallel} 路并行处理记录 (日志场景无序, 怎么快怎么来)", { parallel: parallel })}>
            {__t("⚡ 并行 ×{parallel}", { parallel: parallel })}</span>
        )}
        <div className="flex-1" />
        {!readOnly && (
        <span className="hidden sm:inline text-[10px] text-muted-foreground/70 flex items-center gap-2">
          <span>{__t("序号 = 执行顺序 · 自由拖拽 · ↑↓ 调整顺序 · Delete 删除")}</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-emerald-500 inline-block" />{__t("满足分支")}</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-orange-500 inline-block" />{__t("否则分支")}</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-indigo-500 inline-block" />{__t("循环子链")}</span>
          <span className="inline-flex items-center gap-1" title={__t("case: 每个分支一列一色, 灰色为 default 列; 没有 default 时未命中的事件直通下一节点")}>
            <span className="inline-flex h-1.5 w-4 rounded overflow-hidden">
              <span className="w-1 bg-emerald-500 inline-block" /><span className="w-1 bg-sky-500 inline-block" /><span className="w-1 bg-violet-500 inline-block" /><span className="w-1 bg-slate-400 inline-block" />
            </span>
            {__t("case 分支/默认")}</span>
          <span className="inline-flex items-center gap-1"><span className="text-[8px] text-amber-700 bg-amber-100 rounded px-1">⚡ when</span>{__t("条件执行")}</span>
          <span className="inline-flex items-center gap-1"><span className="text-[8px] text-rose-700 bg-rose-100 rounded px-1">{__t("终点")}</span>{__t("丢弃事件, 不再向后连线")}</span>
        </span>
        )}
        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setFull((v) => !v)} title={full ? __t("退出全屏 (Esc)") : __t("全屏")}>
          {full ? <Minimize2 className="h-3 w-3 mr-1" /> : <Maximize2 className="h-3 w-3 mr-1" />}
          {full ? __t("退出全屏") : __t("全屏")}
        </Button>
      </div>

      {chartArea}

      <div ref={configPanelRef}>{configPanel}{subPanel}</div>
    </>
  );

  // 全屏时通过 Portal 挂到 body — 规避祖先 transform 造成的 fixed 失效。
  if (full) {
    return createPortal(
      <div className="fixed inset-0 z-[130] bg-background p-4 flex flex-col">{ui}</div>,
      document.body,
    );
  }
  return <div className="relative">{ui}</div>;
}

export function ProcessingCanvas(props: CanvasProps) {
  return (
    <ReactFlowProvider>
      <TContext.Provider value={props.t ?? identityTranslate}>
        <CanvasInner {...props} />
      </TContext.Provider>
    </ReactFlowProvider>
  );
}
