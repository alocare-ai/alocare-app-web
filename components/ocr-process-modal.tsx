"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, Progress, Spinner } from "@alocare/design-system";
import { Check, Circle, X } from "lucide-react";
import type { AiAnalysisProgressState } from "@/lib/ai-analysis-progress";
import { getAiPhaseStatuses } from "@/lib/ai-analysis-progress";
import {
  REPORT_PIPELINE_ORDER,
  type ReportPipelineStep,
} from "@/lib/report-pipeline";

export type { ReportPipelineStep } from "@/lib/report-pipeline";
import type { OcrStreamEvent } from "@/lib/api/ocr-stream";
import {
  getOcrFileStatuses,
  type OcrFilesProgressState,
} from "@/lib/ocr-file-progress";
import type { Locale } from "@/hooks/use-locale";

const PIPELINE_ORDER = REPORT_PIPELINE_ORDER;

type OcrProcessModalProps = {
  open: boolean;
  locale: Locale;
  fileName?: string | null;
  step: ReportPipelineStep;
  ocrFilesProgress?: OcrFilesProgressState | null;
  ocrEvent?: OcrStreamEvent | null;
  aiProgress?: AiAnalysisProgressState | null;
  error?: string | null;
};

function stepLabels(locale: Locale): Record<
  ReportPipelineStep,
  { title: string; done: string }
> {
  return {
    uploaded: {
      title: locale === "id" ? "Unggah berkas" : "Upload files",
      done: locale === "id" ? "Berkas terunggah" : "Files uploaded",
    },
    ocr: {
      title: locale === "id" ? "Pemindaian OCR" : "OCR scanning",
      done: locale === "id" ? "Teks diekstrak" : "Text extracted",
    },
    analyzing: {
      title: locale === "id" ? "Analisis AI" : "AI analysis",
      done: locale === "id" ? "Konteks siap" : "Context prepared",
    },
    generating_summary: {
      title: locale === "id" ? "Ringkasan klinis" : "Clinical summary",
      done: locale === "id" ? "Ringkasan dihasilkan" : "Summary generated",
    },
    saving_results: {
      title: locale === "id" ? "Menyimpan hasil" : "Saving results",
      done: locale === "id" ? "Hasil tersimpan" : "Results saved",
    },
    completed: {
      title: locale === "id" ? "Selesai" : "Complete",
      done: locale === "id" ? "Siap ditinjau" : "Ready to review",
    },
  };
}

function activeDetail(
  locale: Locale,
  step: ReportPipelineStep,
  ocrFilesProgress: OcrFilesProgressState | null | undefined,
  ocrEvent: OcrStreamEvent | null | undefined,
  aiProgress: AiAnalysisProgressState | null | undefined,
): string {
  switch (step) {
    case "uploaded":
      return locale === "id"
        ? "Mengunggah ke server…"
        : "Uploading to server…";
    case "ocr": {
      if (ocrFilesProgress?.detail) return ocrFilesProgress.detail;
      if (ocrEvent?.message) return ocrEvent.message;
      const done = ocrFilesProgress?.files.filter((f) => f.status === "done").length ?? 0;
      const total = ocrFilesProgress?.files.length ?? 0;
      if (total > 1) {
        return locale === "id"
          ? `Memindai ${done} / ${total} berkas…`
          : `Scanning ${done} / ${total} files…`;
      }
      return locale === "id" ? "Memulai OCR…" : "Starting OCR…";
    }
    case "analyzing":
      return (
        aiProgress?.detail ??
        (locale === "id"
          ? "Memulai analisis AI…"
          : "Starting AI analysis…")
      );
    case "generating_summary":
      return (
        aiProgress?.detail ??
        (locale === "id"
          ? "Menghasilkan ringkasan klinis…"
          : "Generating clinical summary…")
      );
    case "saving_results":
      return (
        aiProgress?.detail ??
        (locale === "id"
          ? "Menyimpan hasil analisis…"
          : "Saving analysis results…")
      );
    case "completed":
      return locale === "id"
        ? "Membuka laporan…"
        : "Opening report…";
  }
}

function overallProgress(
  step: ReportPipelineStep,
  ocrFilesProgress: OcrFilesProgressState | null | undefined,
  ocrEvent: OcrStreamEvent | null | undefined,
  aiProgress: AiAnalysisProgressState | null | undefined,
): number {
  if (step === "ocr") {
    if (ocrFilesProgress) return ocrFilesProgress.overallProgress;
    const ocrPct = ocrEvent?.progress ?? 0;
    return Math.min(58, 12 + ocrPct * 0.46);
  }
  if (step === "analyzing") {
    return aiProgress?.progress ?? 60;
  }
  if (step === "generating_summary") {
    return aiProgress?.progress ?? 75;
  }
  if (step === "saving_results") {
    return aiProgress?.progress ?? 90;
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

type AiSubstepItem = {
  label: string;
  status: "done" | "active" | "pending";
  detail?: string;
};

function AiAnalysisSubsteps({
  ariaLabel,
  phases,
  activeIndex,
  items,
  statusDetail,
}: {
  ariaLabel: string;
  phases: { id: string }[];
  activeIndex: number;
  items: AiSubstepItem[];
  statusDetail?: string;
}) {
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const node = activeItemRef.current;
    if (!node) return;
    node.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [activeIndex, statusDetail, items.length]);

  return (
    <ul
      className="max-h-44 space-y-1 overflow-y-auto scroll-smooth border-l-2 border-teal-200 py-0.5 pl-2.5 pr-1"
      aria-label={ariaLabel}
    >
      {items.map((sub, i) => (
        <li
          key={phases[i]?.id ?? `${sub.label}-${i}`}
          ref={sub.status === "active" ? activeItemRef : undefined}
          className={`flex items-start gap-1.5 text-xs ${
            sub.status === "done"
              ? "text-emerald-700"
              : sub.status === "active"
                ? "font-medium text-teal-800"
                : "text-slate-400"
          }`}
        >
          <SubstepMarker status={sub.status} />
          <span className="min-w-0 flex-1">
            <span className="block leading-snug">{sub.label}</span>
            {sub.status === "active" && sub.detail ? (
              <span
                className="mt-0.5 block font-normal text-slate-600"
                role="status"
                aria-live="polite"
              >
                {sub.detail}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function OcrFileSubsteps({
  locale,
  ocrFilesProgress,
}: {
  locale: Locale;
  ocrFilesProgress: OcrFilesProgressState;
}) {
  const items = getOcrFileStatuses(ocrFilesProgress.files, locale);
  if (items.length <= 1) return null;

  return (
    <ul
      className="space-y-1 border-l-2 border-teal-200 pl-2.5"
      aria-label={locale === "id" ? "Pemindaian per berkas" : "Per-file scanning"}
    >
      {items.map((sub) => (
        <li
          key={sub.label}
          className={`flex items-start gap-1.5 text-xs ${
            sub.status === "done"
              ? "text-emerald-700"
              : sub.status === "active"
                ? "font-medium text-teal-800"
                : sub.status === "error"
                  ? "text-red-600"
                  : "text-slate-400"
          }`}
        >
          <SubstepMarker
            status={
              sub.status === "error"
                ? "error"
                : sub.status === "done"
                  ? "done"
                  : sub.status === "active"
                    ? "active"
                    : "pending"
            }
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate" title={sub.label}>
              {sub.label}
            </span>
            {sub.status === "active" && sub.detail ? (
              <span className="block font-normal text-slate-600">{sub.detail}</span>
            ) : null}
            {sub.status === "done" && sub.detail ? (
              <span className="block font-normal text-emerald-600/90">
                {sub.detail}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function OcrProcessModal({
  open,
  locale,
  fileName,
  step,
  ocrFilesProgress,
  ocrEvent = null,
  aiProgress,
  error,
}: OcrProcessModalProps) {
  if (!open) return null;

  const labels = stepLabels(locale);
  const hasError =
    Boolean(error) ||
    ocrEvent?.step === "error" ||
    Boolean(ocrFilesProgress?.files.some((f) => f.status === "error"));
  const progress = overallProgress(step, ocrFilesProgress, ocrEvent, aiProgress);
  const isFinished = step === "completed" && !hasError;
  const aiSubstepSteps: ReportPipelineStep[] = [
    "analyzing",
    "generating_summary",
    "saving_results",
  ];
  const showAiSubsteps =
    aiSubstepSteps.includes(step) &&
    aiProgress &&
    !hasError &&
    ((step === "analyzing" && aiProgress.stage === "prep") ||
      (step === "generating_summary" && aiProgress.stage === "generating") ||
      (step === "saving_results" && aiProgress.stage === "saving"));
  const aiSubsteps = showAiSubsteps
    ? getAiPhaseStatuses(
        aiProgress.phases,
        aiProgress.phaseIndex,
        locale,
        { statusDetail: aiProgress.detail },
      )
    : null;
  const showOcrSubsteps =
    step === "ocr" &&
    ocrFilesProgress &&
    ocrFilesProgress.files.length > 1 &&
    !hasError;

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-process-modal-title"
    >
      <Card className="w-full max-w-lg shadow-xl">
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
              const ocrCollapsed =
                key === "ocr" &&
                state === "done" &&
                ocrFilesProgress &&
                ocrFilesProgress.files.length > 0;
              const ocrDoneSummary =
                ocrCollapsed &&
                (locale === "id"
                  ? `${ocrFilesProgress.files.length} berkas — teks digabung`
                  : `${ocrFilesProgress.files.length} files — text combined`);

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
                        {!showOcrSubsteps && !aiSubsteps ? (
                          <p
                            className={`text-xs ${
                              hasError ? "text-red-600" : "text-slate-600"
                            }`}
                            role="status"
                            aria-live="polite"
                          >
                            {error ??
                              activeDetail(
                                locale,
                                key,
                                ocrFilesProgress,
                                ocrEvent,
                                aiProgress,
                              )}
                          </p>
                        ) : null}
                        {showOcrSubsteps ? (
                          <OcrFileSubsteps
                            locale={locale}
                            ocrFilesProgress={ocrFilesProgress}
                          />
                        ) : null}
                        {showAiSubsteps &&
                        key === step &&
                        aiProgress &&
                        aiSubsteps ? (
                          <AiAnalysisSubsteps
                            ariaLabel={
                              key === "generating_summary"
                                ? locale === "id"
                                  ? "Langkah ringkasan klinis"
                                  : "Clinical summary steps"
                                : key === "saving_results"
                                  ? locale === "id"
                                    ? "Langkah menyimpan hasil"
                                    : "Saving results steps"
                                  : locale === "id"
                                    ? "Langkah analisis AI"
                                    : "AI analysis steps"
                            }
                            phases={aiProgress.phases}
                            activeIndex={aiProgress.phaseIndex}
                            items={aiSubsteps}
                            statusDetail={aiProgress.detail}
                          />
                        ) : null}
                      </div>
                    ) : state === "done" ? (
                      <p className="mt-0.5 text-xs text-emerald-700">
                        {ocrDoneSummary || label.done}
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
  status: "done" | "active" | "pending" | "error";
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
      <span className="mt-1 flex h-3 w-3 shrink-0 items-center justify-center">
        <Spinner size="sm" className="h-2.5 w-2.5" />
      </span>
    );
  }
  if (status === "error") {
    return (
      <X
        className="mt-0.5 h-3 w-3 shrink-0 text-red-600"
        strokeWidth={3}
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
