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
