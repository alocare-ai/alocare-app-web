"use client";

import {
  AIStatusBadge,
  RecommendationList,
  Spinner,
} from "@alocare/design-system";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatient } from "@/lib/api/patients";
import { useMemo, type ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { DoctorSummaryCard } from "@/components/doctor-summary-card";
import { ClinicalSummarySection } from "@/components/clinical-summary-section";
import { ReportFilesSection } from "@/components/report-files-section";
import { ReportHeaderInsights } from "@/components/report-header-insights";
import { ReportAddFilesButton } from "@/components/report-add-files-button";
import { ReportAiChatFab } from "@/components/report-ai-chat-fab";
import { useLocale } from "@/hooks/use-locale";
import { useReportAiAnalysis } from "@/hooks/use-report-ai-analysis";
import { getReport, getReportResult } from "@/lib/api/reports";
import {
  hasDisplayableClinicalSummary,
  hasMeaningfulClinicalSummary,
} from "@/lib/report-result-utils";
import { bilingual } from "@/lib/i18n";
import { repairClinicalSummary } from "@/lib/bilingual-repair";
import { enrichRecommendation } from "@/lib/recommendation-details";
import { extractDocumentText } from "@/lib/report-document";
import {
  mapKeyFindings,
  parseReportResult,
  resolveDoctorSummaryForLocale,
  pickLocaleText,
} from "@/lib/report-analysis";
import { parseClinicalSummaryParts } from "@/lib/clinical-summary-display";
import {
  ageFromDateOfBirth,
  buildReportPageHeading,
  extractReportSubject,
  patientDisplayFields,
} from "@/lib/report-patient-heading";
import {
  buildReportChatMeta,
  type ReportChatMeta,
} from "@/lib/report-chat-context";
import type {
  Report,
  ReportResult,
  ReportUploadedFile,
} from "@/lib/types/api";

type ReportDetailClientProps = {
  reportId: string;
  initialReport: Report | null;
  initialResult: ReportResult | null;
  initialAnalyzing: boolean;
  chatMeta: ReportChatMeta;
  analyzingBanner?: ReactNode;
};

export function ReportDetailClient({
  reportId,
  initialReport,
  initialResult,
  initialAnalyzing,
  chatMeta,
  analyzingBanner = null,
}: ReportDetailClientProps) {
  const { locale } = useLocale();
  const queryClient = useQueryClient();

  const cachedResult = queryClient.getQueryData<ReportResult>([
    "report-result",
    reportId,
  ]);
  const cachedReport = queryClient.getQueryData<Report>(["report", reportId]);

  const { data: report, isLoading: reportLoading } = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReport(reportId),
    initialData:
      cachedReport ??
      initialReport ??
      undefined,
    refetchOnMount: (query) =>
      query.state.data?.status === "uploaded" ||
      query.state.data?.status === "processing",
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "processing" || status === "uploaded") {
        return 3000;
      }
      return false;
    },
  });

  const { data: linkedPatient } = useQuery({
    queryKey: ["patient", report?.patient_id],
    queryFn: () => getPatient(report!.patient_id!),
    enabled: Boolean(report?.patient_id),
  });

  const { data: result, isLoading: resultLoading } = useQuery({
    queryKey: ["report-result", reportId],
    queryFn: () => getReportResult(reportId),
    initialData:
      cachedResult && hasMeaningfulClinicalSummary(cachedResult)
        ? cachedResult
        : initialResult ?? undefined,
    refetchOnMount: (query) =>
      !hasMeaningfulClinicalSummary(query.state.data),
    refetchInterval: (query) => {
      if (hasMeaningfulClinicalSummary(query.state.data)) {
        return false;
      }
      const status = report?.status;
      if (status === "processing" || status === "uploaded") {
        return 3000;
      }
      return false;
    },
  });

  const analysis = useMemo(
    () => (result ? parseReportResult(result) : null),
    [result],
  );

  const {
    isAnalyzing: aiAnalysisRunning,
    isRunning: aiSummaryGenerating,
    error: aiAnalysisError,
    aiSummary,
    retry: retryAiAnalysis,
  } = useReportAiAnalysis({
    reportId,
    report,
    result,
    locale,
  });

  const hasMeaningfulSummary = hasMeaningfulClinicalSummary(result);
  const hasSummary = hasDisplayableClinicalSummary(result);

  const isAnalyzing =
    aiAnalysisRunning ||
    (!hasMeaningfulSummary &&
      (report?.status === "uploaded" ||
        report?.status === "processing" ||
        initialAnalyzing));

  const summary = useMemo(() => {
    const inProgress = bilingual(
      "Analysis in progress…",
      "Analisis sedang berlangsung…",
    );
    let base: typeof inProgress;
    if (aiSummary) {
      base = aiSummary;
    } else if (hasMeaningfulSummary && analysis?.summary) {
      base = analysis.summary;
    } else if (isAnalyzing) {
      base = inProgress;
    } else {
      base = bilingual("", "");
    }
    if (!result) return base;
    return repairClinicalSummary(base, extractDocumentText(result), result);
  }, [aiSummary, analysis?.summary, hasMeaningfulSummary, isAnalyzing, result]);

  const uploadedFiles = useMemo((): ReportUploadedFile[] => {
    if (!report) return [];
    if (result?.uploaded_files?.length) {
      return result.uploaded_files;
    }
    const ref = report.file_reference?.trim();
    if (!ref) {
      return [{ filename: report.title, size_bytes: 0 }];
    }
    if (ref.includes(",")) {
      return ref.split(",").map((name) => ({
        filename: name.trim(),
        size_bytes: 0,
      }));
    }
    return [{ filename: ref, size_bytes: 0 }];
  }, [report, result?.uploaded_files]);

  const fileAnalyses = useMemo(
    () => result?.file_analyses ?? [],
    [result?.file_analyses],
  );

  const doctorText = useMemo(() => {
    if (!analysis) return "";
    return resolveDoctorSummaryForLocale(analysis.doctorSummary, locale, {
      documentText: result ? extractDocumentText(result) : "",
      fileCount: uploadedFiles.length,
    });
  }, [analysis, locale, result, uploadedFiles.length]);

  const chatMetaResolved = useMemo(
    () =>
      report
        ? buildReportChatMeta(report, result ?? null, locale)
        : chatMeta,
    [report, result, locale, chatMeta],
  );

  const reportSubject = useMemo(() => {
    const clinicalText = summary ? pickLocaleText(summary, locale) : "";
    const clinicalOverview = clinicalText
      ? parseClinicalSummaryParts(clinicalText).overview
      : "";
    return extractReportSubject({
      clinicalSummary: clinicalOverview || clinicalText,
      doctorSummary: doctorText,
      documentText: result ? extractDocumentText(result) : "",
      fileAnalyses,
      uploadedFilenames: uploadedFiles.map((f) => f.filename),
      fileCount: uploadedFiles.length,
      linkedPatient: linkedPatient
        ? {
            fullName: linkedPatient.full_name,
            age: ageFromDateOfBirth(linkedPatient.date_of_birth),
            gender: linkedPatient.gender,
          }
        : null,
    });
  }, [
    summary,
    locale,
    doctorText,
    result,
    uploadedFiles,
    fileAnalyses,
    linkedPatient,
  ]);

  const pageHeading = useMemo(
    () =>
      buildReportPageHeading(reportSubject, locale, report?.title ?? "", {
        fileCount: uploadedFiles.length,
      }),
    [reportSubject, locale, report?.title, uploadedFiles.length],
  );

  const clinicalSummaryPatientFields = useMemo(
    () =>
      patientDisplayFields(reportSubject, locale, {
        fileCount: uploadedFiles.length,
        mrn: linkedPatient?.mrn ?? null,
        dateOfBirth: linkedPatient?.date_of_birth ?? null,
      }),
    [reportSubject, locale, uploadedFiles.length, linkedPatient],
  );

  if ((reportLoading || resultLoading) && !report) {
    return (
      <AppShell>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (!report) {
    return (
      <AppShell>
        <p className="text-slate-600">
          {locale === "id" ? "Laporan tidak ditemukan." : "Report not found."}
        </p>
      </AppShell>
    );
  }

  const nextActions =
    analysis?.nextActions?.[locale] ?? analysis?.nextActions?.en ?? [];
  const findings = mapKeyFindings(analysis?.keyFindings ?? []);
  const isImageReport = /\.(jpe?g|png|gif|webp|heic|bmp)$/i.test(
    report.file_reference ?? report.title ?? "",
  );
  const limitedAnalysis =
    analysis?.limitedAnalysis ??
    (isImageReport && findings.length === 0 && hasSummary);

  const recommendations = nextActions.map((action, i) => {
    const enriched = enrichRecommendation(action, locale);
    return {
      id: String(i),
      title: enriched.title,
      description: enriched.description,
      icon: "default" as const,
    };
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <ReportHeaderInsights locale={locale} keyFindings={findings} />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-heading text-2xl font-bold text-slate-900">
              {pageHeading.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{pageHeading.subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <AIStatusBadge
              status={
                report.status === "validated"
                  ? "review"
                  : report.status === "completed"
                    ? "complete"
                    : "processing"
              }
              lang={locale}
            />
            <ReportAddFilesButton
              reportId={reportId}
              report={report}
              result={result ?? null}
              locale={locale}
              disabled={isAnalyzing || aiSummaryGenerating}
            />
          </div>
        </div>

        {isAnalyzing ? analyzingBanner : null}

        {aiAnalysisError ? (
          <div
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
            role="alert"
          >
            <p>
              {locale === "id"
                ? "Ringkasan klinis AI gagal dibuat."
                : "AI clinical summary could not be generated."}{" "}
              {aiAnalysisError}
            </p>
            <button
              type="button"
              onClick={() => retryAiAnalysis()}
              className="rounded-lg bg-red-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800"
            >
              {locale === "id" ? "Coba lagi" : "Retry"}
            </button>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-4">
            <ReportFilesSection
              report={report}
              reportId={reportId}
              locale={locale}
              uploadedFiles={uploadedFiles}
              fileAnalyses={fileAnalyses}
            />
          </section>

          <section className="space-y-4">
            {limitedAnalysis ? (
              <div
                className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                role="status"
              >
                {locale === "id"
                  ? "Unggahan gambar tidak menghasilkan nilai lab terstruktur. Gunakan PDF/teks untuk analisis lengkap."
                  : "Image uploads cannot produce structured lab values yet. Use a text-based PDF or .txt for full analysis."}
              </div>
            ) : null}
            <ClinicalSummarySection
              summary={summary}
              locale={locale}
              loading={
                !hasSummary && (isAnalyzing || aiSummaryGenerating)
              }
              fileAnalyses={fileAnalyses}
              patientFields={clinicalSummaryPatientFields}
            />
            {hasSummary && !limitedAnalysis && findings.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                {locale === "id"
                  ? "Tidak ada temuan terstruktur pada dokumen ini."
                  : "No structured findings were detected in this document."}
              </div>
            ) : null}
          </section>

          <section className="space-y-4">
            {doctorText ? (
              <DoctorSummaryCard text={doctorText} locale={locale} />
            ) : null}
            {recommendations.length > 0 ? (
              <RecommendationList items={recommendations} lang={locale} />
            ) : null}
          </section>
        </div>
      </div>

      <ReportAiChatFab
        reportId={reportId}
        locale={locale}
        sessionId={report.ai_session_id}
        chatMeta={chatMetaResolved}
        disabled={isAnalyzing || !hasSummary}
      />
    </AppShell>
  );
}
