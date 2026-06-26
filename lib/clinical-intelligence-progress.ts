import type { ClinicalIntelligenceStreamEvent } from "@/lib/api/clinical-intelligence-stream";
import {
  CLINICAL_INTELLIGENCE_STEPS,
  clinicalStepLabel,
} from "@/lib/api/clinical-intelligence";
import type { Locale } from "@/hooks/use-locale";
import type { ReportPipelineStep } from "@/lib/report-pipeline";
import type {
  CiPhaseItem,
  OcrFilesProgressState,
} from "@/lib/ocr-file-progress";

function initCiPhases(locale: Locale): CiPhaseItem[] {
  return CLINICAL_INTELLIGENCE_STEPS.map((id) => ({
    id,
    label: clinicalStepLabel(id, locale),
    status: "pending" as const,
    detail: "",
  }));
}

function ciStepIndex(step: string): number {
  return CLINICAL_INTELLIGENCE_STEPS.indexOf(
    step as (typeof CLINICAL_INTELLIGENCE_STEPS)[number],
  );
}

function updateCiPhases(
  phases: CiPhaseItem[],
  event: ClinicalIntelligenceStreamEvent,
  locale: Locale,
): CiPhaseItem[] {
  if (event.step === "error") {
    const activeIdx = phases.findIndex((p) => p.status === "active");
    const idx = activeIdx >= 0 ? activeIdx : 0;
    return phases.map((phase, i) =>
      i === idx
        ? {
            ...phase,
            status: "error" as const,
            detail: event.message ?? phase.detail,
          }
        : phase,
    );
  }

  if (event.step === "file_complete") {
    return phases;
  }

  const index = ciStepIndex(event.step);
  if (index < 0) {
    return phases;
  }

  const detail =
    event.message?.trim() ||
    clinicalStepLabel(event.step, locale);

  return phases.map((phase, i) => {
    if (i < index) {
      return { ...phase, status: "done" as const };
    }
    if (i === index) {
      return {
        ...phase,
        status:
          event.step === "clinical_report_generated"
            ? ("done" as const)
            : ("active" as const),
        detail,
      };
    }
    if (event.step === "clinical_report_generated") {
      return { ...phase, status: "done" as const };
    }
    return { ...phase, status: "pending" as const };
  });
}

export function createCiFilesProgress(
  fileNames: string[],
  locale: Locale,
): OcrFilesProgressState {
  return {
    files: fileNames.map((name) => ({
      name,
      status: "pending",
      detail: "",
      progress: 0,
    })),
    overallProgress: 5,
    detail: clinicalStepLabel("upload_received", locale),
    ciPhases: initCiPhases(locale),
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
    ciPhases: (state.ciPhases ?? initCiPhases(locale)).map((p) => ({ ...p })),
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

  next.ciPhases = updateCiPhases(next.ciPhases ?? initCiPhases(locale), event, locale);
  next.overallProgress = event.progress ?? next.overallProgress;
  next.detail =
    event.message?.trim() || clinicalStepLabel(event.step, locale);
  if (event.file && event.step !== "clinical_report_generated") {
    next.detail = `${event.file}: ${next.detail}`;
  }

  return next;
}

export function getCiPhaseStatuses(
  phases: CiPhaseItem[],
): { label: string; status: CiPhaseItem["status"]; detail?: string }[] {
  return phases.map((phase) => ({
    label: phase.label,
    status: phase.status,
    detail: phase.detail,
  }));
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

export function isClinicalIntelligenceProgress(
  state: OcrFilesProgressState | null | undefined,
): boolean {
  return Boolean(state?.ciPhases?.length);
}
