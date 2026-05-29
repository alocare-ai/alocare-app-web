"use client";

import {
  OCRStatusCard,
  Spinner,
  UploadDropzone,
  UploadPreview,
  type UploadDropzoneState,
} from "@alocare/design-system";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useLocale } from "@/hooks/use-locale";
import { analyzeReport, createAISession } from "@/lib/api/chat";
import { createReport, uploadReportFile } from "@/lib/api/reports";

type PipelineStep = "idle" | "uploaded" | "ocr" | "analyzing" | "completed";

export default function UploadReportPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const [dropState, setDropState] = useState<UploadDropzoneState>("empty");
  const [fileName, setFileName] = useState<string | null>(null);
  const [step, setStep] = useState<PipelineStep>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;

      setError(null);
      setFileName(file.name);
      setDropState("uploading");
      setStep("uploaded");

      try {
        const report = await createReport({
          title: file.name.replace(/\.[^.]+$/, ""),
          file_reference: file.name,
        });

        setDropState("success");
        setStep("ocr");

        await new Promise((r) => setTimeout(r, 800));
        setStep("analyzing");

        await uploadReportFile(report.id, file);

        const session = await createAISession({
          preferred_language: locale,
        });

        await analyzeReport({
          sessionId: session.id,
          reportId: report.id,
          content: "",
          preferredLanguage: locale,
        });

        setStep("completed");
        router.push(`/reports/${report.id}`);
      } catch {
        setDropState("error");
        setError(
          locale === "id"
            ? "Unggah gagal. Periksa koneksi API."
            : "Upload failed. Check API connection.",
        );
      }
    },
    [locale, router],
  );

  const ocrStatus =
    step === "idle" || step === "uploaded"
      ? "pending"
      : step === "ocr"
        ? "processing"
        : "complete";

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Unggah Laporan" : "Upload Report"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {locale === "id"
              ? "PDF, JPG, atau PNG — seret dan lepas atau pilih file"
              : "PDF, JPG, or PNG — drag and drop or choose a file"}
          </p>
        </div>

        <UploadDropzone
          lang={locale}
          state={dropState}
          onFilesSelected={handleFiles}
        />

        {fileName ? (
          <UploadPreview
            fileName={fileName}
            lang={locale}
            uploaded={step !== "idle"}
          />
        ) : null}

        <OCRStatusCard lang={locale} status={ocrStatus} />

        {step === "analyzing" ? (
          <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm text-blue-800">
            <Spinner size="sm" />
            {locale === "id"
              ? "AI sedang menganalisis laporan…"
              : "AI is analyzing your report…"}
          </div>
        ) : null}

        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <PipelineProgress step={step} locale={locale} />
      </div>
    </AppShell>
  );
}

function PipelineProgress({
  step,
  locale,
}: {
  step: PipelineStep;
  locale: "en" | "id";
}) {
  const steps = [
    { key: "uploaded", en: "Uploaded", id: "Terunggah" },
    { key: "ocr", en: "OCR", id: "OCR" },
    { key: "analyzing", en: "AI analyzing", id: "Analisis AI" },
    { key: "completed", en: "Completed", id: "Selesai" },
  ] as const;

  const order = ["uploaded", "ocr", "analyzing", "completed"] as const;
  const currentIdx = order.indexOf(step as (typeof order)[number]);

  return (
    <ol className="flex flex-wrap gap-4 text-sm">
      {steps.map((s, i) => {
        const done = step === "completed" || i <= currentIdx;
        return (
          <li
            key={s.key}
            className={`flex items-center gap-2 ${done ? "text-emerald-700" : "text-slate-400"}`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                done ? "bg-emerald-600 text-white" : "bg-slate-200"
              }`}
            >
              {i + 1}
            </span>
            {locale === "id" ? s.id : s.en}
          </li>
        );
      })}
    </ol>
  );
}
