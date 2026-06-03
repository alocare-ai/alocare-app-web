export type ReportPipelineStep =
  | "uploaded"
  | "ocr"
  | "analyzing"
  | "completed";

/** Top-level upload/re-analysis steps (clinical summary + save run inside `analyzing`). */
export const REPORT_PIPELINE_ORDER: ReportPipelineStep[] = [
  "uploaded",
  "ocr",
  "analyzing",
  "completed",
];
