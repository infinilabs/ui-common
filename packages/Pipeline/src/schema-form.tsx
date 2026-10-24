/* ©INFINI, All Rights Reserved. */

// SchemaForm — render a processor's parameter form from catalog metadata
// (migrated from logpilot's schema-form.tsx, #103).
//
// FilterProperty: {type, sub_type, default_value}; the doc layer adds
// description/param_docs/example. Type-driven controls: bool -> checkbox,
// int/float -> number, string -> input (long/enum aware), array -> one
// item per line; unknown types fall back to a JSON editor so any new
// processor is configurable without frontend changes.
//
// Product injections (the package has zero product aliases):
//   t            — i18n function (identity default)
//   patternPicker — optional pattern-library browser (logpilot injects its
//                   GrokPatternPicker; without it the grok patterns field
//                   is a plain textarea)

import { useState, type ComponentType } from "react";
import { BookOpen, Trash2 } from "lucide-react";
import { Input, Label, Select, Textarea } from "./primitives";

export type Translate = (s: string, vars?: Record<string, unknown>) => string;
// 缺省翻译: 原文返回, 仅替换 vars 中存在的 {name} 占位符 (与 logpilot 的
// t 语义一致 — 未提供的键保持字面, 不产生空白)。
export const identityTranslate: Translate = (s, vars) =>
  vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : s;

export interface PatternPickerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onInsert: (snippet: string) => void;
}

export interface FilterProperty {
  type?: string;
  sub_type?: string;
  default_value?: unknown;
}

// 单个处理器的元数据: 框架 schema + 文档层。
export interface SchemaProcessorMeta {
  properties?: Record<string, FilterProperty>;
  category?: string;
  description?: string;
  param_docs?: Record<string, string>;
  example?: Record<string, unknown>;
  internal?: boolean;
}

export type ProcessorSchema = Record<string, SchemaProcessorMeta>;

// Category-grouped processor catalog (domain registration directory view):
// {category: {name: meta}}
export type ProcessorCatalog = Record<string, Record<string, SchemaProcessorMeta>>;

// 常见字段的呈现增强 (类型系统之外的人工知识, 缺省不影响功能):
const LONG_FIELDS = new Set(["pattern", "line_pattern", "timestamp_pattern", "query", "expression", "script", "condition", "mapping"]);
// 枚举候选: 先按 "处理器:字段" 精确匹配 (不同处理器的同名字段选项不同),
// 再退回全局字段名匹配。
const ENUM_FIELDS: Record<string, string[]> = {
  mode: ["underscore", "dotted", "nested"],
  match: ["after", "before"],
  action: ["tag", "drop"],
  metric_type: ["min", "max", "sum", "avg", "value_count"],
  "fingerprint:method": ["sha256", "sha1", "md5", "xxhash"],
  "web_log:format": ["apache_combined", "apache_common", "nginx_combined"],
  "add_locale:format": ["abbreviation", "offset"],
};

function enumFor(processorName: string, field: string): string[] | undefined {
  return ENUM_FIELDS[`${processorName}:${field}`] ?? ENUM_FIELDS[field];
}

function str(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

function FieldControl({ processorName, name, prop, value, onChange, t, picker }: {
  processorName: string; name: string; prop: FilterProperty; value: unknown; onChange: (v: unknown) => void;
  t: Translate; picker?: ComponentType<PatternPickerProps>;
}) {
  const typeStr = (prop.type ?? "string").toLowerCase();
  const commonCls = "mt-1 h-8 text-xs";

  if (typeStr === "bool") {
    return (
      <label className="mt-1 flex items-center gap-2 text-xs cursor-pointer">
        <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)}
          className="h-3.5 w-3.5 accent-primary" />
        <span className="text-muted-foreground">{t("启用")}</span>
      </label>
    );
  }
  if (typeStr === "int" || typeStr === "int64" || typeStr === "float" || typeStr === "float64") {
    return <Input type="number" className={commonCls} value={value == null ? "" : String(value)}
      onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))} />;
  }
  if (typeStr === "array" || typeStr === "slice") {
    // grok 的 patterns 数组: 附带内置 Pattern 库浏览器, 插入 %{NAME} 行。
    if (processorName === "grok" && name === "patterns") {
      return <GrokPatternsField value={value} onChange={onChange} t={t} picker={picker} />;
    }
    return (
      <Textarea className="mt-1 text-xs font-mono" rows={2}
        placeholder={t("每行一个{v0}", { v0: prop.sub_type ? ` (${prop.sub_type})` : "" })}
        value={Array.isArray(value) ? value.map((x) => (typeof x === "string" ? x : JSON.stringify(x))).join("\n") : ""}
        onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim() !== "").map((l) => {
          if (prop.sub_type === "int" || prop.sub_type === "int64") return Number(l);
          return l;
        }))} />
    );
  }
  const enumOpts = enumFor(processorName, name);
  if (enumOpts) {
    return (
      <Select className={commonCls} value={str(value)} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {enumOpts.map((o) => <option key={o} value={o}>{o}</option>)}
      </Select>
    );
  }
  if (LONG_FIELDS.has(name)) {
    return <Textarea className="mt-1 text-xs font-mono" rows={2} value={str(value)}
      onChange={(e) => onChange(e.target.value)} />;
  }
  return <Input className={commonCls} value={str(value)} placeholder={prop.default_value != null ? t("默认: {v0}", { v0: str(prop.default_value) }) : ""}
    onChange={(e) => onChange(e.target.value)} />;
}

// grok patterns 专用控件: 多行表达式 + 「Pattern 库」浏览器 (搜索/学习/插入)。
function GrokPatternsField({ value, onChange, t, picker }: {
  value: unknown; onChange: (v: unknown) => void; t: Translate;
  picker?: ComponentType<PatternPickerProps>;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const lines = Array.isArray(value) ? value.map((x) => (typeof x === "string" ? x : JSON.stringify(x))) : [];
  const insert = (snippet: string) => {
    onChange([...lines, snippet]);
  };
  const Picker = picker;
  return (
    <div>
      <Textarea className="mt-1 text-xs font-mono" rows={2} placeholder={t("每行一条表达式, 如 %{COMBINEDAPACHELOG}")}
        value={lines.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))} />
      {Picker && (
        <>
          <button type="button" className="mt-1 flex items-center gap-1 text-[10px] text-primary hover:underline"
            onClick={() => setPickerOpen(true)}>
            <BookOpen className="h-3 w-3" />{t("Pattern 库 (350+, 搜索/学习/点击插入)")}</button>
          <Picker open={pickerOpen} onOpenChange={setPickerOpen} onInsert={insert} />
        </>
      )}
    </div>
  );
}

// 值类型自适应控件 — schema 未覆盖的字段 (param_docs 补充文档的参数等)
// 没有类型信息, 按当前值的形态挑选控件。
function AutoControl({ name, value, onChange, t }: {
  name: string; value: unknown; onChange: (v: unknown) => void; t: Translate;
}) {
  const commonCls = "mt-1 text-xs";
  if (typeof value === "boolean") {
    return (
      <label className="mt-1 flex items-center gap-2 text-xs cursor-pointer">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-3.5 w-3.5 accent-primary" />
        <span className="text-muted-foreground">{t("启用")}</span>
      </label>
    );
  }
  if (typeof value === "number") {
    return <Input type="number" className={`${commonCls} h-8`} value={value} onChange={(e) => onChange(Number(e.target.value))} />;
  }
  if (Array.isArray(value)) {
    return (
      <Textarea className={`${commonCls} font-mono`} rows={2} placeholder={t("每行一项")}
        value={value.map((x) => (typeof x === "string" ? x : JSON.stringify(x))).join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim() !== "").map((l) => {
          const n = Number(l);
          return l !== "" && !Number.isNaN(n) && /^-?\d+(\.\d+)?$/.test(l.trim()) ? n : l;
        }))} />
    );
  }
  if (value != null && typeof value === "object") {
    return <ObjectField name={name} value={value} onChange={onChange} t={t} />;
  }
  if (LONG_FIELDS.has(name)) {
    return <Textarea className={`${commonCls} font-mono`} rows={2} value={str(value)} onChange={(e) => onChange(e.target.value)} />;
  }
  return <Input className={`${commonCls} h-8`} value={str(value)} onChange={(e) => onChange(e.target.value)} />;
}

// schema 未覆盖、但值是对象的字段: 折叠的 JSON 编辑行。
function ObjectField({ value, onChange, t }: { name: string; value: unknown; onChange: (v: unknown) => void; t: Translate }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  return (
    <div>
      <button type="button" className="text-[10px] text-muted-foreground hover:text-primary" onClick={() => setOpen((v) => !v)}>
        {open ? t("▾ 收起") : t("▸ 展开")} {t("JSON 编辑")}</button>
      {open && (
        <Textarea className="mt-1 text-[11px] font-mono" rows={4}
          value={draft || JSON.stringify(value ?? {}, null, 2)}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            try { onChange(draft.trim() ? JSON.parse(draft) : undefined); } catch { /* 草稿中 */ }
          }} />
      )}
    </div>
  );
}

export function SchemaForm({ schema, processorName, cfg, onChange, t, patternPicker }: {
  schema: ProcessorSchema;
  processorName: string;
  cfg: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  /** i18n; identity default keeps the zh source strings */
  t?: Translate;
  /** optional pattern-library browser for grok patterns (logpilot injects) */
  patternPicker?: ComponentType<PatternPickerProps>;
}) {
  t = t ?? identityTranslate;
  const meta = schema[processorName];
  const props = meta?.properties;

  // 字段台账: schema 列出的 + 文档补充的 + 已设置值里的 (schema 外)。
  const known = new Set<string>(props ? Object.keys(props) : []);
  for (const k of Object.keys(meta?.param_docs ?? {})) known.add(k);
  for (const k of Object.keys(cfg)) known.add(k);
  const docOnly = Object.keys(meta?.param_docs ?? {}).filter((k) => !props?.[k]);

  // 内嵌 when 条件包装 (框架对所有注册处理器生效): 顶部提示条件执行语义,
  // when 字段本体仍按普通字段编辑 (未知字段走 JSON 控件)。
  const whenBody = cfg["when"];
  const whenHint = whenBody != null && typeof whenBody === "object" && Object.keys(whenBody as object).length > 0 ? (
    <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
      {t("⚡ 条件执行 (when):")}<code className="font-mono">{JSON.stringify(whenBody)}</code> {t("— 仅条件命中时本处理器才生效")}</p>
  ) : null;

  if (!props || Object.keys(props).length === 0) {
    // schema 未覆盖的处理器: 描述 + 示例 + 整体 JSON 编辑兜底。
    return (
      <div className="space-y-1.5">
        {meta?.description && <p className="text-[11px] text-muted-foreground leading-relaxed">{meta.description}</p>}
        {whenHint}
        {meta?.example && (
          <button className="text-[10px] text-primary hover:underline"
            onClick={() => onChange(JSON.parse(JSON.stringify(meta.example)))}>
            {t("插入示例配置")}</button>
        )}
        <Textarea className="text-[11px] font-mono" rows={6} value={JSON.stringify(cfg, null, 2)}
          onChange={(e) => {
            try { onChange(JSON.parse(e.target.value || "{}")); } catch { /* 草稿中 */ }
          }} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {meta?.description && (
        <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted-foreground/20 pl-2">
          {meta.description}
        </p>
      )}
      {whenHint}
      {meta?.example && (
        <div className="flex items-center gap-2 min-w-0">
          <button className="text-[10px] text-primary hover:underline shrink-0"
            onClick={() => onChange(JSON.parse(JSON.stringify(meta.example)))}>
            {t("插入示例")}</button>
          <code className="text-[10px] text-muted-foreground truncate font-mono" title={JSON.stringify(meta.example)}>
            {JSON.stringify(meta.example)}
          </code>
        </div>
      )}

      {[...known].map((name) => {
        const prop = props?.[name];
        const help = meta?.param_docs?.[name];
        const inExtras = !prop && !help;
        return (
          <div key={name} className={inExtras ? "rounded border border-dashed p-1.5 bg-background/60" : ""}>
            <div className="flex items-center gap-1.5">
              <Label className="text-xs font-mono">
                {name}
                {prop?.default_value != null && prop.default_value !== "" && prop.default_value !== false && (
                  <span className="ml-1.5 font-sans text-[10px] text-muted-foreground">{t("默认 {v0}", { v0: str(prop.default_value) })}</span>
                )}
              </Label>
              {inExtras && (
                <button className="text-muted-foreground/50 hover:text-red-600" title={t("移除该字段")}
                  onClick={() => { const n = { ...cfg }; delete n[name]; onChange(n); }}>
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
            {prop ? (
              <FieldControl processorName={processorName} name={name} prop={prop} value={cfg[name]} t={t} picker={patternPicker} onChange={(v) => {
                const next = { ...cfg };
                if (v === undefined || v === "") delete next[name];
                else next[name] = v;
                onChange(next);
              }} />
            ) : name in cfg ? (
              <AutoControl name={name} value={cfg[name]} t={t} onChange={(v) => {
                const next = { ...cfg };
                if (v === undefined || v === "") delete next[name];
                else next[name] = v;
                onChange(next);
              }} />
            ) : null}
            {/* 参数说明: 有文档的字段一律展示 (schema 内/外都算) */}
            {help ? (
              <p className="text-[10px] text-muted-foreground/80 mt-0.5 leading-snug">{help}</p>
            ) : !prop && !(name in cfg) ? (
              <p className="text-[10px] text-muted-foreground/70">{t("未在 schema 中登记, 按原样下发。")}</p>
            ) : null}
          </div>
        );
      })}

      {/* 补充文档但尚未设置的参数 */}
      {docOnly.filter((k) => !(k in cfg)).length > 0 && (
        <Select className="h-7 text-xs" value=""
          onChange={(e) => {
            if (!e.target.value) return;
            // when 是条件对象, 种子给 equals 骨架而非空串 (空串无法表达条件)。
            const seed = e.target.value === "when" ? { equals: { "": "" } } : "";
            onChange({ ...cfg, [e.target.value]: seed });
          }}>
          <option value="">{t("+ 添加参数 (文档)")}</option>
          {docOnly.filter((k) => !(k in cfg)).map((k) => <option key={k} value={k}>{k}</option>)}
        </Select>
      )}
      <CustomFieldAdd t={t} onAdd={(k) => onChange({ ...cfg, [k]: "" })} />
    </div>
  );
}

// 手动添加任意字段名。
function CustomFieldAdd({ onAdd, t }: { onAdd: (name: string) => void; t: Translate }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  if (!open) {
    return <button className="text-[10px] text-muted-foreground hover:text-primary" onClick={() => setOpen(true)}>{t("+ 自定义字段")}</button>;
  }
  return (
    <div className="flex items-center gap-1">
      <Input className="h-7 text-xs font-mono" autoFocus placeholder={t("字段名")} value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) { onAdd(name.trim()); setName(""); setOpen(false); }
          if (e.key === "Escape") setOpen(false);
        }} />
      <button className="text-[10px] text-primary hover:underline shrink-0"
        onClick={() => { if (name.trim()) { onAdd(name.trim()); setName(""); setOpen(false); } }}>{t("确定")}</button>
    </div>
  );
}
