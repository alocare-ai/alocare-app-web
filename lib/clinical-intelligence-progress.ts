import type { ClinicalIntelligenceStreamEvent } from "@/lib/api/clinical-intelligence-stream";
import { clinicalStepLabel } from "@/lib/api/clinical-intelligence";
import type { Locale } from "@/hooks/use-locale";
import type { ReportPipelineStep } from "@/lib/report-pipeline";
import type { OcrFilesProgressState } from "@/lib/ocr-file-progress";

export function createCiFilesProgress(fileNames: string[]): OcrFilesProgressState {
  return {
    files: fileNames.map((name) => ({
      name,
      status: "pending",
      detail: "",
      progress: 0,
    })),
    overallProgress: 5,
    detail: "",
  };
}

export function applyCiStreamEvent(
  state: OcrFilesProgressState,
  event: ClinicalIntelligenceStreamEvent,
  locale: Locale,
): OcrFilesProgressState {
  const next: OcrFilesProgressState = {
    ...state,
    files: state.files.map((f) => ({ ...f })),
  };

  if (event.file) {
    const index = next.files.findIndex((f) => f.name === event.file);
    if (index >= 0) {
      const current = next.files[index];
      if (event.step === "file_complete" || event.step === "clinical_report_generated") {
        next.files[index] = {
          ...current,
          status: "done",
          progress: 100,
          detail: event.message ?? current.detail,
        };
      } else if (event.step === "error") {
        next.files[index] = {
          ...current,
          status: "error",
          detail: event.message ?? current.detail,
        };
      } else {
        next.files[index] = {
          ...current,
          status: "active",
          progress: event.progress ?? current.progress,
          detail: event.message ?? current.detail,
        };
      }
    }
  }

  next.overallProgress = event.progress ?? next.overallProgress;
  next.detail = clinicalStepLabel(event.step, locale);
  if (event.file) {
    next.detail = `${event.file}: ${next.detail}`;
  }
  if (event.message) {
    next.detail = event.message;
  }

  return next;
}

export function pipelineStepFromCiEvent(
  event: ClinicalIntelligenceStreamEvent,
): ReportPipelineStep {
  const step = event.step;
  if (step === "upload_received" || step === "ocr_processing") {
    return "ocr";
  }
  if (
    step === "document_classification" ||
    step === "medical_extraction" ||
    step === "clinical_interpretation" ||
    step === "file_complete"
  ) {
    return "analyzing";
  }
  if (step === "clinical_report_generated") {
    return "completed";
  }
  return "analyzing";
}
