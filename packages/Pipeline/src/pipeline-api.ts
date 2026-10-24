/* ©INFINI, All Rights Reserved. */

// pipeline-api — typed client + response models for the framework's
// unified pipeline endpoints. The package stays dependency-free: products
// inject their own fetchers (axios instance, wrapped fetch, ...), the
// client only owns paths, request shapes and types.
//
// Models mirror the Go sources of truth:
//   framework/modules/pipeline/dryrun/dryrun.go (Report/StepResult/...)
//   framework/modules/pipeline/ai_generate.go  (ChainGenerator)
//   framework/core/pipeline/stage_stats.go     (StageStats)

// ─── dry-run: POST /pipeline/dry-run ────────────────────────────────────────

/** one replay input: raw payload bytes + the codec that decodes them */
export interface DryRunSample {
  raw: string;
  codec?: string;
}

export interface DryRunOptions {
  /** compile with contract validation (mismatches surface in Report.compiled) */
  scope_check?: boolean;
  /** "capture" (default — writes collected in the report) | "passthrough" */
  side_effects?: "capture" | "passthrough";
  /** "real" (default) | "mock" */
  llm_policy?: "real" | "mock";
}

export interface FieldDiff {
  added?: Record<string, unknown>;
  removed?: Record<string, unknown>;
  changed?: Record<string, unknown>;
}

/** one processor's effect on one sample */
export interface StepResult {
  step: number;
  processor: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  diff: FieldDiff;
  duration_ms: number;
  outcome: "ok" | "error" | "dropped";
  err?: string;
}

/** compile-phase outcome per chain entry */
export interface StepDesc {
  step: number;
  processor: string;
  ok: boolean;
  note?: string;
}

/** a side effect intercepted during the run (queue/lane write) */
export interface CapturedWrite {
  kind?: string;
  target?: string;
  payload?: unknown;
}

/** the full dry-run result */
export interface DryRunReport {
  compiled: StepDesc[];
  /** per sample × per step */
  steps: StepResult[][];
  side_effects: CapturedWrite[];
}

// ─── ai-generate: POST /pipeline/ai-generate ────────────────────────────────

export type ChainEntry = Record<string, Record<string, unknown>>;

export interface AIGenerateRequest {
  /** generator name; empty resolves the single registered generator */
  generator?: string;
  /** raw sample-document JSON strings */
  documents: string[];
  requirements?: string;
  /** "generate" (default) | "refine" */
  mode?: "generate" | "refine";
  current_chain?: ChainEntry[];
}

export interface AIGenerateResponse {
  chain: ChainEntry[];
  generator: string;
}

// ─── discovery ──────────────────────────────────────────────────────────────

export interface CodecInfo {
  name: string;
  namespace: string;
}

export interface ProcessorMeta {
  name: string;
  category?: string;
  properties?: Record<string, unknown>;
}

// ─── client factory ─────────────────────────────────────────────────────────

/** the minimal fetch surface a product must inject */
export interface PipelineFetchers {
  post<T>(url: string, data: unknown): Promise<{ data: T }>;
  get<T>(url: string): Promise<{ data: T }>;
}

export interface PipelineClient {
  dryRun(chain: ChainEntry[], samples: DryRunSample[], options?: DryRunOptions): Promise<DryRunReport>;
  aiGenerate(req: AIGenerateRequest): Promise<AIGenerateResponse>;
  listCodecs(): Promise<CodecInfo[]>;
}

/** endpoint paths — shared so products and tests never drift */
export const PIPELINE_ENDPOINTS = {
  dryRun: "/pipeline/dry-run",
  aiGenerate: "/pipeline/ai-generate",
  codecs: "/pipeline/codecs"
} as const;

export function createPipelineClient(f: PipelineFetchers): PipelineClient {
  return {
    dryRun(chain, samples, options = {}) {
      return f
        .post<DryRunReport>(PIPELINE_ENDPOINTS.dryRun, { processor: chain, samples, options })
        .then((r) => r.data);
    },
    aiGenerate(req) {
      return f.post<AIGenerateResponse>(PIPELINE_ENDPOINTS.aiGenerate, req).then((r) => r.data);
    },
    listCodecs() {
      return f.get<{ codecs: CodecInfo[] }>(PIPELINE_ENDPOINTS.codecs).then((r) => r.data.codecs ?? []);
    }
  };
}
