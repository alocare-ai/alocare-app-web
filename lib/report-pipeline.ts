export type ReportPipelineStep =
  | "uploaded"
  | "ocr"
  | "analyzing"
  | "generating_summary"
  | "saving_results"
  | "completed";

export const REPORT_PIPELINE_ORDER: ReportPipelineStep[] = [
  "uploaded",
  "ocr",
  "analyzing",
  "generating_summary",
  "saving_results",
  "completed",
];
