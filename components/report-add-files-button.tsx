"use client";

import { Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import {
  OcrProcessModal,
  type ReportPipelineStep,
} from "@/components/ocr-process-modal";
import type { Locale } from "@/hooks/use-locale";
import type { AiAnalysisProgressState } from "@/lib/ai-analysis-progress";
import { mergeAnalyzeResponseIntoResult } from "@/lib/clinical-summary";
import { generateClinicalSummaryFromAI } from "@/lib/clinical-summary-ai";
import { runOcrStream } from "@/lib/api/ocr-stream";
import {
  applyOcrStreamEvent,
  createOcrFilesProgress,
  type OcrFilesProgressState,
} from "@/lib/ocr-file-progress";
import {
  buildReportFileAnalyses,
  getReportFiles,
  getReportResult,
  uploadReportFiles,
} from "@/lib/api/reports";
import type { Report, ReportResult } from "@/lib/types/api";

/** Matches design-system UploadDropzone default. */
const REPORT_FILE_ACCEPT = ".pdf,.jpg,.jpeg,.png";

type ReportAddFilesButtonProps = {
  reportId: string;
  report: Report;
  result: ReportResult | null | undefined;
  locale: Locale;
  disabled?: boolean;
};

function formatAddedFilesLabel(files: File[], locale: Locale): string {
  if (files.length === 1) return files[0].name;
  return locale === "id"
    ? `${files.length} berkas baru`
    : `${files.length} new files`;
}

export function ReportAddFilesButton({
  reportId,
  report,
  result,
  locale,
  disabled = false,
}: ReportAddFilesButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<ReportPipelineStep>("uploaded");
  const [error, setError] = useState<string | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [ocrFilesProgress, setOcrFilesProgress] =
    useState<OcrFilesProgressState | null>(null);
  const [aiProgress, setAiProgress] = useState<AiAnalysisProgressState | null>(
    null,
  );

  const handleFiles = useCallback(
    async (fileList: File[]) => {
      if (!fileList.length || busy) return;

      setBusy(true);
      setError(null);
      setAiProgress(null);
      setOcrFilesProgress(null);
      setFileLabel(formatAddedFilesLabel(fileList, locale));
      setStep("uploaded");
      setModalOpen(true);

      try {
        await uploadReportFiles(reportId, fileList);

        setStep("ocr");

        const allFiles = await getReportFiles(reportId);
        const initialOcr = createOcrFilesProgress(
          allFiles.map((f) => f.filename),
        );
        setOcrFilesProgress(initialOcr);

        const ocrText = await runOcrStream(reportId, (event) => {
          setOcrFilesProgress((prev) =>
            applyOcrStreamEvent(prev ?? initialOcr, event, locale),
          );
        });

        const documentText = ocrText.trim();
        if (!documentText) {
          throw new Error(
            locale === "id"
              ? "Tidak ada teks yang diekstrak dari berkas."
              : "No text could be extracted from the files.",
          );
        }

        setStep("analyzing");

        const workingResult =
          result ?? (await getReportResult(reportId));
        const resultForAnalysis: ReportResult = {
          ...workingResult,
          doctor_summary: documentText,
        };

        const fileCount = allFiles.length;

        const { summary, analyzeExtras } = await generateClinicalSummaryFromAI({
          report,
          result: resultForAnalysis,
          reportId,
          locale,
          documentText,
          fileCount,
          onProgress: setAiProgress,
        });

        const merged = mergeAnalyzeResponseIntoResult(resultForAnalysis, {
          summaryBilingual: summary,
          doctorSummary: analyzeExtras?.doctorSummary,
          nextActions: analyzeExtras?.nextActions,
        });

        queryClient.setQueryData(["report-result", reportId], merged);

        if (fileCount > 1) {
          await buildReportFileAnalyses(reportId);
        }

        await queryClient.invalidateQueries({ queryKey: ["report", reportId] });
        await queryClient.invalidateQueries({
          queryKey: ["report-result", reportId],
        });

        setStep("completed");
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : locale === "id"
              ? "Gagal menambahkan berkas"
              : "Failed to add files";
        setError(message);
      } finally {
        setBusy(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [busy, locale, queryClient, report, reportId, result],
  );

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const list = event.target.files;
      if (!list?.length) return;
      void handleFiles(Array.from(list));
    },
    [handleFiles],
  );

  const showUploadMore =
    report.status === "completed" || report.status === "validated";

  if (!showUploadMore) return null;

  return (
    <>
      <OcrProcessModal
        open={modalOpen}
        locale={locale}
        fileName={fileLabel}
        step={step}
        ocrFilesProgress={ocrFilesProgress}
        aiProgress={aiProgress}
        error={error}
      />
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={REPORT_FILE_ACCEPT}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={onInputChange}
      />
      <button
        type="button"
        disabled={disabled || busy}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Upload className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {locale === "id" ? "Unggah berkas lagi" : "Upload more files"}
      </button>
    </>
  );
}
