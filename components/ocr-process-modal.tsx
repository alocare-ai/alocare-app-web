"use client";

import { Card, CardContent, Progress, Spinner } from "@alocare/design-system";
import { Check, Circle, X } from "lucide-react";
import type { AiAnalysisProgressState } from "@/lib/ai-analysis-progress";
import { getAiPhaseStatuses } from "@/lib/ai-analysis-progress";
import type { OcrStreamEvent } from "@/lib/api/ocr-stream";
import type { Locale } from "@/hooks/use-locale";

export type ReportPipelineStep =
  | "uploaded"
  | "ocr"
  | "analyzing"
  | "completed";

const PIPELINE_ORDER: ReportPipelineStep[] = [
  "uploaded",
  "ocr",
  "analyzing",
  "completed",
];

type OcrProcessModalProps = {
  open: boolean;
  locale: Locale;
  fileName?: string | null;
  step: ReportPipelineStep;
  ocrEvent: OcrStreamEvent | null;
  aiProgress?: AiAnalysisProgressState | null;
  error?: string | null;
};

function stepLabels(locale: Locale): Record<
  ReportPipelineStep,
  { title: string; done: string }
> {
  return {
    uploaded: {
      title: locale === "id" ? "Unggah berkas" : "Upload file",
      done: locale === "id" ? "Berkas terunggah" : "File uploaded",
    },
    ocr: {
      title: locale === "id" ? "Pemindaian OCR" : "OCR scanning",
      done: locale === "id" ? "Teks diekstrak" : "Text extracted",
    },
    analyzing: {
      title: locale === "id" ? "Analisis AI" : "AI analysis",
      done: locale === "id" ? "Ringkasan dibuat" : "Summary generated",
    },
    completed: {
      title: locale === "id" ? "Selesai" : "Complete",
      done: locale === "id" ? "Siap ditinjau" : "Ready to review",
    },
  };
}

function ocrDetail(locale: Locale, event: OcrStreamEvent | null): string {
  if (!event) {
    return locale === "id" ? "Memulai OCR…" : "Starting OCR…";
  }
  if (event.message) return event.message;

  switch (event.step) {
    case "started":
      return locale === "id" ? "Menyiapkan dokumen…" : "Preparing document…";
    case "loading":
      return locale === "id" ? "Memuat PDF…" : "Loading PDF…";
    case "extracting":
      return locale === "id" ? "Membaca berkas teks…" : "Reading text file…";
    case "page":
      return locale === "id"
        ? `Halaman ${event.page ?? 1} dari ${event.totalPages ?? "?"}`
        : `Page ${event.page ?? 1} of ${event.totalPages ?? "?"}`;
    case "ocr":
      return locale === "id"
        ? `OCR halaman ${event.page ?? 1}…`
        : `OCR on page ${event.page ?? 1}…`;
    case "complete":
      return event.charCount != null
        ? locale === "id"
          ? `${event.charCount.toLocaleString()} karakter`
          : `${event.charCount.toLocaleString()} characters`
        : locale === "id"
          ? "OCR selesai"
          : "OCR complete";
    default:
      return locale === "id" ? "Memindai dokumen…" : "Scanning document…";
  }
}

function activeDetail(
  locale: Locale,
  step: ReportPipelineStep,
  ocrEvent: OcrStreamEvent | null,
  aiProgress: AiAnalysisProgressState | null | undefined,
): string {
  switch (step) {
    case "uploaded":
      return locale === "id"
        ? "Mengunggah ke server…"
        : "Uploading to server…";
    case "ocr":
      return ocrDetail(locale, ocrEvent);
    case "analyzing":
      return (
        aiProgress?.detail ??
        (locale === "id"
          ? "Memulai analisis AI…"
          : "Starting AI analysis…")
      );
    case "completed":
      return locale === "id"
        ? "Membuka laporan…"
        : "Opening report…";
  }
}

function overallProgress(
  step: ReportPipelineStep,
  ocrEvent: OcrStreamEvent | null,
  aiProgress: AiAnalysisProgressState | null | undefined,
): number {
  if (step === "ocr") {
    const ocrPct = ocrEvent?.progress ?? 0;
    return Math.min(58, 12 + ocrPct * 0.46);
  }
  if (step === "analyzing") {
    return aiProgress?.progress ?? 65;
  }
  if (step === "completed") return 100;
  if (step === "uploaded") return 10;
  return 0;
}

function stepState(
  key: ReportPipelineStep,
  current: ReportPipelineStep,
  hasError: boolean,
): "done" | "active" | "pending" | "error" {
  if (hasError && key === current) return "error";
  const keyIdx = PIPELINE_ORDER.indexOf(key);
  const currentIdx = PIPELINE_ORDER.indexOf(current);
  if (keyIdx < currentIdx) return "done";
  if (keyIdx === currentIdx) return "active";
  return "pending";
}

export function OcrProcessModal({
  open,
  locale,
  fileName,
  step,
  ocrEvent,
  aiProgress,
  error,
}: OcrProcessModalProps) {
  if (!open) return null;

  const labels = stepLabels(locale);
  const hasError = Boolean(error) || ocrEvent?.step === "error";
  const progress = overallProgress(step, ocrEvent, aiProgress);
  const isFinished = step === "completed" && !hasError;
  const aiSubsteps =
    step === "analyzing" && aiProgress
      ? getAiPhaseStatuses(
          aiProgress.phases,
          aiProgress.phaseIndex,
          locale,
        )
      : null;

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-process-modal-title"
    >
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-5 pt-6">
          <div className="min-w-0">
            <h2
              id="report-process-modal-title"
              className="font-heading text-lg font-semibold text-slate-900"
            >
              {locale === "id" ? "Memproses laporan" : "Processing report"}
            </h2>
            {fileName ? (
              <p className="mt-0.5 truncate text-sm text-slate-500">{fileName}</p>
            ) : null}
          </div>

          <Progress value={progress} showLabel />

          <ol className="space-y-3" aria-label={locale === "id" ? "Langkah" : "Steps"}>
            {PIPELINE_ORDER.map((key) => {
              const state = stepState(key, step, hasError);
              const label = labels[key];

              return (
                <li
                  key={key}
                  className={`flex gap-3 rounded-lg px-2 py-1.5 ${
                    state === "active" ? "bg-teal-50" : ""
                  }`}
                >
                  <StepIcon state={state} />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium ${
                        state === "pending"
                          ? "text-slate-400"
                          : state === "error"
                            ? "text-red-700"
                            : "text-slate-900"
                      }`}
                    >
                      {label.title}
                    </p>
                    {state === "active" ? (
                      <div className="mt-1 space-y-2">
                        <p
                          className={`text-xs ${
                            hasError ? "text-red-600" : "text-slate-600"
                          }`}
                          role="status"
                          aria-live="polite"
                        >
                          {error ??
                            activeDetail(locale, key, ocrEvent, aiProgress)}
                        </p>
                        {key === "analyzing" && aiProgress && aiSubsteps && !hasError ? (
                          <ul
                            className="space-y-1 border-l-2 border-teal-200 pl-2.5"
                            aria-label={
                              locale === "id"
                                ? "Langkah analisis AI"
                                : "AI analysis steps"
                            }
                          >
                            {aiSubsteps.map((sub, i) => (
                              <li
                                key={aiProgress.phases[i]?.id ?? sub.label}
                                className={`flex items-start gap-1.5 text-xs ${
                                  sub.status === "done"
                                    ? "text-emerald-700"
                                    : sub.status === "active"
                                      ? "font-medium text-teal-800"
                                      : "text-slate-400"
                                }`}
                              >
                                <SubstepMarker status={sub.status} />
                                <span>{sub.label}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ) : state === "done" ? (
                      <p className="mt-0.5 text-xs text-emerald-700">
                        {label.done}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>

          {isFinished ? (
            <p className="text-center text-xs text-slate-500" role="status">
              {locale === "id"
                ? "Mengalihkan ke halaman laporan…"
                : "Redirecting to report…"}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function SubstepMarker({
  status,
}: {
  status: "done" | "active" | "pending";
}) {
  if (status === "done") {
    return (
      <Check
        className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
        strokeWidth={3}
        aria-hidden
      />
    );
  }
  if (status === "active") {
    return (
      <span
        className="mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-teal-600"
        aria-hidden
      />
    );
  }
  return (
    <Circle className="mt-0.5 h-3 w-3 shrink-0 text-slate-300" aria-hidden />
  );
}

function StepIcon({
  state,
}: {
  state: "done" | "active" | "pending" | "error";
}) {
  if (state === "done") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-teal-600">
        <Spinner size="sm" />
      </span>
    );
  }
  if (state === "error") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
        <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-300">
      <Circle className="h-5 w-5" aria-hidden />
    </span>
  );
}
