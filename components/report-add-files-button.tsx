"use client";

import { Sparkles, Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import {
  OcrProcessModal,
  type ReportPipelineStep,
} from "@/components/ocr-process-modal";
import type { Locale } from "@/hooks/use-locale";
import { runClinicalIntelligenceStream } from "@/lib/api/clinical-intelligence-stream";
import {
  applyCiStreamEvent,
  createCiFilesProgress,
  pipelineStepFromCiEvent,
} from "@/lib/clinical-intelligence-progress";
import type { OcrFilesProgressState } from "@/lib/ocr-file-progress";
import { getReportFiles, uploadReportFiles } from "@/lib/api/reports";
import type { Report, ReportResult } from "@/lib/types/api";

/** Matches design-system UploadDropzone default. */
import { REPORT_FILE_ACCEPT } from "@/lib/report-file-accept";

type ReportAddFilesButtonProps = {
  reportId: string;
  report: Report;
  result: ReportResult | null | undefined;
  locale: Locale;
  disabled?: boolean;
};

export function ReportAddFilesButton({
  reportId,
  report,
  locale,
  disabled = false,
}: ReportAddFilesButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<ReportPipelineStep>("uploaded");
  const [error, setError] = useState<string | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [ciFilesProgress, setCiFilesProgress] =
    useState<OcrFilesProgressState | null>(null);

  const busy = uploading || analyzing;

  const handleUploadOnly = useCallback(
    async (fileList: File[]) => {
      if (!fileList.length || busy) return;

      setUploading(true);
      setError(null);

      try {
        await uploadReportFiles(reportId, fileList);
        setPendingAnalysis(true);
        await queryClient.invalidateQueries({ queryKey: ["report", reportId] });
        await queryClient.invalidateQueries({
          queryKey: ["report-result", reportId],
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : locale === "id"
              ? "Gagal mengunggah berkas"
              : "Failed to upload files";
        setError(message);
      } finally {
        setUploading(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [busy, locale, queryClient, reportId],
  );

  const handleRunAnalysis = useCallback(async () => {
    if (busy) return;

    setAnalyzing(true);
    setError(null);
    setCiFilesProgress(null);
    setStep("uploaded");
    setModalOpen(true);

    try {
      const allFiles = await getReportFiles(reportId);
      if (!allFiles.length) {
        throw new Error(
          locale === "id"
            ? "Tidak ada berkas pada laporan ini."
            : "No files on this report.",
        );
      }

      setFileLabel(
        allFiles.length === 1
          ? allFiles[0].filename
          : locale === "id"
            ? `${allFiles.length} berkas`
            : `${allFiles.length} files`,
      );

      setStep("analyzing");

      const initialProgress = createCiFilesProgress(
        allFiles.map((f) => f.filename),
      );
      setCiFilesProgress(initialProgress);

      await runClinicalIntelligenceStream(
        reportId,
        locale,
        (event) => {
          setStep(pipelineStepFromCiEvent(event));
          setCiFilesProgress((prev) =>
            applyCiStreamEvent(prev ?? initialProgress, event, locale),
          );
        },
      );

      setPendingAnalysis(false);
      setStep("completed");

      await queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      await queryClient.invalidateQueries({
        queryKey: ["report-result", reportId],
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : locale === "id"
            ? "Gagal menjalankan analisis"
            : "Failed to run analysis";
      setError(message);
    } finally {
      setAnalyzing(false);
    }
  }, [busy, locale, queryClient, reportId]);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const list = event.target.files;
      if (!list?.length) return;
      void handleUploadOnly(Array.from(list));
    },
    [handleUploadOnly],
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
        ocrFilesProgress={ciFilesProgress}
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
      <div className="flex flex-wrap items-center justify-end gap-2">
        {pendingAnalysis ? (
          <span className="text-xs text-amber-800">
            {locale === "id"
              ? "Berkas baru terunggah — jalankan analisis"
              : "New files uploaded — run analysis"}
          </span>
        ) : null}
        {error && !modalOpen ? (
          <span className="text-xs text-red-600" role="alert">
            {error}
          </span>
        ) : null}
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {uploading
            ? locale === "id"
              ? "Mengunggah…"
              : "Uploading…"
            : locale === "id"
              ? "Unggah berkas lagi"
              : "Upload more files"}
        </button>
        {pendingAnalysis ? (
          <button
            type="button"
            disabled={disabled || busy}
            onClick={() => void handleRunAnalysis()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-teal-600 bg-teal-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {analyzing
              ? locale === "id"
                ? "Menganalisis…"
                : "Analyzing…"
              : locale === "id"
                ? "Jalankan analisis"
                : "Run analysis"}
          </button>
        ) : null}
      </div>
    </>
  );
}
