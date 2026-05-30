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
import type { OcrStreamEvent } from "@/lib/api/ocr-stream";
import { runOcrStream } from "@/lib/api/ocr-stream";
import { createReport, uploadReportFile } from "@/lib/api/reports";
import type { ReportResult } from "@/lib/types/api";
import { readReportFileContent } from "@/lib/report-analysis";

type PipelineStep = "idle" | ReportPipelineStep;

export default function UploadReportPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const [dropState, setDropState] = useState<UploadDropzoneState>("empty");
  const [fileName, setFileName] = useState<string | null>(null);
  const [step, setStep] = useState<PipelineStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [ocrEvent, setOcrEvent] = useState<OcrStreamEvent | null>(null);
  const [aiProgress, setAiProgress] = useState<AiAnalysisProgressState | null>(
    null,
  );

  const handleFiles = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;

      setError(null);
      setOcrEvent(null);
      setAiProgress(null);
      setFileName(file.name);
      setDropState("uploading");
      setStep("uploaded");
      setProcessModalOpen(true);

      try {
        const report = await createReport({
          title: file.name.replace(/\.[^.]+$/, ""),
          file_reference: file.name,
        });

        setDropState("success");

        await uploadReportFile(report.id, file);

        setStep("ocr");

        let ocrText = "";
        ocrText = await runOcrStream(report.id, setOcrEvent);

        const fileContent =
          ocrText.trim() || (await readReportFileContent(file));

        setStep("analyzing");

        try {
          await generateClinicalSummaryFromAI({
            report,
            reportId: report.id,
            locale,
            documentText: fileContent,
            onProgress: setAiProgress,
            result: {
              id: report.id,
              status: report.status,
              summary: null,
              doctor_summary: fileContent,
              next_actions: [],
            } satisfies ReportResult,
          });
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
        fileName={fileName}
        step={pipelineStep}
        ocrEvent={ocrEvent}
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
              ? "Unggah PDF atau gambar laporan medis."
              : "Upload PDFs or images of medical reports."}
          </p>
        </div>

        <UploadDropzone
          lang={locale}
          state={dropState}
          onFilesSelected={handleFiles}
          hideHeader
          className="[&>span]:hidden [&>h2]:hidden [&>p]:hidden"
        />

        {fileName && !processModalOpen ? (
          <UploadPreview
            fileName={fileName}
            lang={locale}
            uploaded={step !== "idle"}
          />
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
