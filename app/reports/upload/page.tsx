"use client";

import {
  UploadDropzone,
  UploadPreview,
  type UploadDropzoneState,
} from "@alocare/design-system";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  OcrProcessModal,
  type ReportPipelineStep,
} from "@/components/ocr-process-modal";
import { useLocale } from "@/hooks/use-locale";
import type { AiAnalysisProgressState } from "@/lib/ai-analysis-progress";
import { generateClinicalSummaryFromAI } from "@/lib/clinical-summary-ai";
import { ApiError } from "@/lib/api/client";
import { runOcrStream } from "@/lib/api/ocr-stream";
import {
  applyOcrStreamEvent,
  createOcrFilesProgress,
  type OcrFilesProgressState,
} from "@/lib/ocr-file-progress";
import {
  createReport,
  saveReportFileAnalyses,
  uploadReportFiles,
} from "@/lib/api/reports";
import { generatePerFileSummaries } from "@/lib/per-file-summary";
import type { ReportResult } from "@/lib/types/api";
import {
  readReportFileContent,
  readReportFilesContent,
} from "@/lib/report-analysis";

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

function formatFileLabel(files: File[], locale: "en" | "id"): string {
  if (files.length === 1) return files[0].name;
  const names = files.map((f) => f.name).join(", ");
  if (names.length <= 72) return names;
  return locale === "id"
    ? `${files.length} berkas dipilih`
    : `${files.length} files selected`;
}

export default function UploadReportPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const [dropState, setDropState] = useState<UploadDropzoneState>("empty");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [step, setStep] = useState<PipelineStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [ocrFilesProgress, setOcrFilesProgress] =
    useState<OcrFilesProgressState | null>(null);
  const [aiProgress, setAiProgress] = useState<AiAnalysisProgressState | null>(
    null,
  );

  const fileLabel =
    selectedFiles.length > 0
      ? formatFileLabel(selectedFiles, locale)
      : null;

  const handleFiles = useCallback(
    async (files: FileList) => {
      const fileList = Array.from(files);
      if (!fileList.length) return;

      setError(null);
      setOcrFilesProgress(null);
      setAiProgress(null);
      setSelectedFiles(fileList);
      setDropState("uploading");
      setStep("uploaded");
      setProcessModalOpen(true);

      try {
        const report = await createReport({
          title: buildReportTitle(fileList),
          file_reference: formatFileReference(fileList),
        });

        setDropState("success");

        const uploadResult = await uploadReportFiles(report.id, fileList);

        setStep("ocr");

        const initialOcr = createOcrFilesProgress(
          fileList.map((f) => f.name),
        );
        setOcrFilesProgress(initialOcr);

        const ocrText = await runOcrStream(report.id, (event) => {
          setOcrFilesProgress((prev) =>
            applyOcrStreamEvent(prev ?? initialOcr, event, locale),
          );
        });

        let fileContent = ocrText.trim();
        if (!fileContent) {
          fileContent =
            fileList.length === 1
              ? await readReportFileContent(fileList[0])
              : await readReportFilesContent(fileList);
        }

        setStep("analyzing");

        try {
          await generateClinicalSummaryFromAI({
            report,
            reportId: report.id,
            locale,
            documentText: fileContent,
            fileCount: fileList.length,
            onProgress: setAiProgress,
            result: {
              id: report.id,
              status: report.status,
              summary: null,
              doctor_summary: fileContent,
              next_actions: [],
            } satisfies ReportResult,
          });

          if (fileList.length > 1) {
            const sizeByFilename = new Map(
              uploadResult.files.map((f) => [f.filename, f.size]),
            );
            for (const file of fileList) {
              if (!sizeByFilename.has(file.name)) {
                sizeByFilename.set(file.name, file.size);
              }
            }
            const perFile = await generatePerFileSummaries({
              report,
              reportId: report.id,
              locale,
              documentText: fileContent,
              sizeByFilename,
            });
            if (perFile.length) {
              await saveReportFileAnalyses(report.id, perFile);
            }
          }
        } catch (analysisErr) {
          const message =
            analysisErr instanceof Error
              ? analysisErr.message
              : locale === "id"
                ? "Analisis AI gagal"
                : "AI analysis failed";
          setError(message);
          setDropState("error");
          return;
        }

        setStep("completed");
        router.push(`/reports/${report.id}`);
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
      }
    },
    [locale, router],
  );

  const pipelineStep = step === "idle" ? "uploaded" : step;

  return (
    <AppShell>
      <OcrProcessModal
        open={processModalOpen}
        locale={locale}
        fileName={fileLabel}
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
              ? "Unggah beberapa PDF atau gambar laporan medis — teks digabung untuk analisis yang lebih lengkap."
              : "Upload multiple PDFs or images of medical reports — text is combined for richer analysis."}
          </p>
        </div>

        <UploadDropzone
          lang={locale}
          state={dropState}
          multiple
          onFilesSelected={handleFiles}
          hideHeader
          className="[&>span]:hidden [&>h2]:hidden [&>p]:hidden"
        />

        {fileLabel && !processModalOpen ? (
          <div className="space-y-2">
            {selectedFiles.map((file) => (
              <UploadPreview
                key={`${file.name}-${file.size}-${file.lastModified}`}
                fileName={file.name}
                fileSize={formatFileSize(file.size)}
                lang={locale}
                uploaded={step !== "idle"}
              />
            ))}
          </div>
        ) : null}

        {error && !processModalOpen ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
