"use client";

import {
  Button,
  UploadDropzone,
  type UploadDropzoneState,
} from "@alocare/design-system";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { UploadedFileRow } from "@/components/uploaded-file-row";
import {
  OcrProcessModal,
  type ReportPipelineStep,
} from "@/components/ocr-process-modal";
import { useLocale } from "@/hooks/use-locale";
import type { AiAnalysisProgressState } from "@/lib/ai-analysis-progress";
import { generateClinicalSummaryFromAI } from "@/lib/clinical-summary-ai";
import { mergeAnalyzeResponseIntoResult } from "@/lib/clinical-summary";
import { pipelineStepFromAiProgress } from "@/lib/ai-analysis-progress";
import { ApiError } from "@/lib/api/client";
import { runOcrStream } from "@/lib/api/ocr-stream";
import {
  applyOcrStreamEvent,
  createOcrFilesProgress,
  type OcrFilesProgressState,
} from "@/lib/ocr-file-progress";
import {
  createReport,
  deleteReportFile,
  getReportFiles,
  uploadReportFiles,
} from "@/lib/api/reports";
import type { Report, ReportResult, ReportUploadedFile } from "@/lib/types/api";

type PipelineStep = "idle" | ReportPipelineStep;

function buildReportTitle(files: File[]): string {
  const base = files[0].name.replace(/\.[^.]+$/, "");
  if (files.length === 1) return base;
  return `${base} (+${files.length - 1} more)`;
}

function formatFileReference(files: File[]): string {
  return files
    .map((f) => f.name)
    .join(", ")
    .slice(0, 500);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadReportPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [dropState, setDropState] = useState<UploadDropzoneState>("empty");
  const [report, setReport] = useState<Report | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<ReportUploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<PipelineStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [ocrFilesProgress, setOcrFilesProgress] =
    useState<OcrFilesProgressState | null>(null);
  const [aiProgress, setAiProgress] = useState<AiAnalysisProgressState | null>(
    null,
  );

  const reportId = report?.id ?? null;
  const canSubmit = Boolean(reportId && uploadedFiles.length > 0 && !isUploading);
  const isBusy = isUploading || isSubmitting;

  const refreshUploadedFiles = useCallback(async (id: string) => {
    const list = await getReportFiles(id);
    setUploadedFiles(list);
    return list;
  }, []);

  const handleFiles = useCallback(
    async (files: FileList) => {
      const fileList = Array.from(files);
      if (!fileList.length || isBusy) return;

      setError(null);
      setIsUploading(true);
      setDropState("uploading");

      try {
        let activeReport = report;
        if (!activeReport) {
          activeReport = await createReport({
            title: buildReportTitle(fileList),
            file_reference: formatFileReference(fileList),
          });
          setReport(activeReport);
        }

        await uploadReportFiles(activeReport.id, fileList);
        await refreshUploadedFiles(activeReport.id);
        setDropState("empty");
      } catch (err) {
        setDropState("error");
        const detail =
          err instanceof ApiError || err instanceof Error ? err.message : null;
        setError(
          detail ??
            (locale === "id"
              ? "Unggah gagal. Periksa koneksi API."
              : "Upload failed. Check API connection."),
        );
      } finally {
        setIsUploading(false);
      }
    },
    [isBusy, locale, refreshUploadedFiles, report],
  );

  const handleRemoveFile = useCallback(
    async (filename: string) => {
      if (!reportId || isBusy) return;
      setError(null);
      setIsRemoving(filename);
      try {
        await deleteReportFile(reportId, filename);
        const remaining = await refreshUploadedFiles(reportId);
        if (remaining.length === 0) {
          setReport(null);
          setDropState("empty");
        }
      } catch (err) {
        const detail =
          err instanceof ApiError || err instanceof Error ? err.message : null;
        setError(
          detail ??
            (locale === "id" ? "Gagal menghapus berkas" : "Failed to remove file"),
        );
      } finally {
        setIsRemoving(null);
      }
    },
    [isBusy, locale, refreshUploadedFiles, reportId],
  );

  const handleSubmit = useCallback(async () => {
    if (!report || !reportId || uploadedFiles.length === 0 || isBusy) return;

    setError(null);
    setIsSubmitting(true);
    setOcrFilesProgress(null);
    setAiProgress(null);
    setStep("uploaded");
    setProcessModalOpen(true);

    const fileNames = uploadedFiles.map((f) => f.filename);
    const fileCount = uploadedFiles.length;

    try {
      setStep("ocr");

      const initialOcr = createOcrFilesProgress(fileNames);
      setOcrFilesProgress(initialOcr);

      const ocrText = await runOcrStream(reportId, (event) => {
        setOcrFilesProgress((prev) =>
          applyOcrStreamEvent(prev ?? initialOcr, event, locale),
        );
      });

      const fileContent = ocrText.trim();
      if (!fileContent) {
        throw new Error(
          locale === "id"
            ? "Tidak ada teks yang diekstrak dari berkas. Coba berkas PDF berbasis teks."
            : "No text could be extracted from the files. Try text-based PDFs.",
        );
      }

      setStep("analyzing");

      const handleAiProgress = (state: AiAnalysisProgressState) => {
        setAiProgress(state);
        setStep(pipelineStepFromAiProgress(state));
      };

      const resultForAnalysis: ReportResult = {
        id: report.id,
        status: report.status,
        summary: null,
        doctor_summary: fileContent,
        next_actions: [],
      };

      try {
        const { summary, analyzeExtras } = await generateClinicalSummaryFromAI({
          report,
          reportId,
          locale,
          documentText: fileContent,
          fileCount,
          onProgress: handleAiProgress,
          result: resultForAnalysis,
        });

        const merged = mergeAnalyzeResponseIntoResult(resultForAnalysis, {
          summaryBilingual: summary,
          doctorSummary: analyzeExtras?.doctorSummary,
          nextActions: analyzeExtras?.nextActions,
        });

        queryClient.setQueryData(["report-result", reportId], merged);
        queryClient.setQueryData(["report", reportId], {
          ...report,
          status: "completed",
        });
      } catch (analysisErr) {
        const message =
          analysisErr instanceof Error
            ? analysisErr.message
            : locale === "id"
              ? "Analisis AI gagal"
              : "AI analysis failed";
        setError(message);
        return;
      }

      setStep("completed");
      router.push(`/reports/${reportId}`);
    } catch (err) {
      const detail =
        err instanceof ApiError || err instanceof Error ? err.message : null;
      setError(
        detail ??
          (locale === "id"
            ? "Pemrosesan gagal. Periksa koneksi API."
            : "Processing failed. Check API connection."),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [isBusy, locale, queryClient, report, reportId, router, uploadedFiles]);

  const pipelineStep = step === "idle" ? "uploaded" : step;

  const submitLabel =
    locale === "id"
      ? `Mulai analisis (${uploadedFiles.length} berkas)`
      : `Start analysis (${uploadedFiles.length} file${uploadedFiles.length === 1 ? "" : "s"})`;

  return (
    <AppShell>
      <OcrProcessModal
        open={processModalOpen}
        locale={locale}
        fileName={
          uploadedFiles.length === 1
            ? uploadedFiles[0].filename
            : locale === "id"
              ? `${uploadedFiles.length} berkas`
              : `${uploadedFiles.length} files`
        }
        step={pipelineStep}
        ocrFilesProgress={ocrFilesProgress}
        aiProgress={aiProgress}
        error={error}
      />

      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Unggah Laporan" : "Upload Report"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {locale === "id"
              ? "Unggah berkas satu per satu atau beberapa sekaligus. Setelah semua berkas siap, mulai analisis."
              : "Add files one at a time or in batches. When everything is uploaded, start analysis."}
          </p>
        </div>

        <UploadDropzone
          lang={locale}
          state={isUploading ? "uploading" : dropState}
          multiple
          onFilesSelected={handleFiles}
          hideHeader
          className="[&>span]:hidden [&>h2]:hidden [&>p]:hidden"
        />

        {uploadedFiles.length > 0 ? (
          <section className="space-y-3" aria-label={locale === "id" ? "Berkas terunggah" : "Uploaded files"}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                {locale === "id"
                  ? `Berkas terunggah (${uploadedFiles.length})`
                  : `Uploaded files (${uploadedFiles.length})`}
              </h2>
              <p className="text-xs text-slate-500">
                {locale === "id"
                  ? "Tambah berkas lagi di atas jika perlu"
                  : "Add more files above if needed"}
              </p>
            </div>
            <ul className="space-y-2">
              {uploadedFiles.map((file) => (
                <li key={file.filename}>
                  <UploadedFileRow
                    fileName={file.filename}
                    fileSize={formatFileSize(file.size_bytes ?? 0)}
                    locale={locale}
                    onRemove={
                      isSubmitting
                        ? undefined
                        : () => void handleRemoveFile(file.filename)
                    }
                    removeDisabled={isBusy}
                    removing={isRemoving === file.filename}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {error && !processModalOpen ? (
          <p className="whitespace-pre-line text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            {uploadedFiles.length === 0
              ? locale === "id"
                ? "Unggah minimal satu berkas untuk melanjutkan."
                : "Upload at least one file to continue."
              : locale === "id"
                ? "Semua berkas sudah di server. Mulai OCR dan analisis AI saat siap."
                : "All files are on the server. Start OCR and AI analysis when ready."}
          </p>
          <Button
            type="button"
            variant="primary"
            size="lg"
            disabled={!canSubmit || isSubmitting}
            loading={isSubmitting}
            onClick={() => void handleSubmit()}
            className="shrink-0 sm:min-w-[12rem]"
          >
            {uploadedFiles.length === 0
              ? locale === "id"
                ? "Mulai analisis"
                : "Start analysis"
              : submitLabel}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
