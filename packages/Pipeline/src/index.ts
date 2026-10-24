// @infinilabs/pipeline-ui — shared pipeline UI components
//
// Source of truth for the unified pipeline architecture's UI layer.
// Logpilot is the reference consumer; Coco consumes the same package.
//
// Design principle: components receive ALL data via props (fetch in the
// product's adapter layer) — the package has zero API dependencies.

export { PipelineChainEditor } from "./chain-editor";
export type { CatalogType, DocType } from "./chain-editor";

export { PipelineRuntime } from "./runtime-detail";
export type { StageRow, FlightEvent } from "./runtime-detail";

export { LanesPanel } from "./lanes-panel";
export type { LaneStat } from "./lanes-panel";

export { InjectDialog } from "./inject-dialog";

export {
  createPipelineClient,
  PIPELINE_ENDPOINTS
} from "./pipeline-api";
export type {
  DryRunSample,
  DryRunOptions,
  FieldDiff,
  StepResult,
  StepDesc,
  CapturedWrite,
  DryRunReport,
  ChainEntry,
  AIGenerateRequest,
  AIGenerateResponse,
  CodecInfo,
  ProcessorMeta,
  PipelineFetchers,
  PipelineClient
} from "./pipeline-api";

export { SchemaForm, identityTranslate } from "./schema-form";
export type {
  FilterProperty,
  SchemaProcessorMeta,
  ProcessorSchema,
  ProcessorCatalog,
  Translate,
  PatternPickerProps
} from "./schema-form";

export { DryRunDrawer } from "./dryrun-drawer";
export { AiGeneratePanel } from "./ai-generate-panel";

export { ProcessingCanvas } from "./processing-canvas";
export type { CanvasProps, CanvasRunState, DryRunStepResult } from "./processing-canvas";
