"use client";

import {
  AIStatusBadge,
  RecommendationList,
  RiskIndicator,
  Spinner,
} from "@alocare/design-system";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, type ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { DoctorSummaryCard } from "@/components/doctor-summary-card";
import { ClinicalSummarySection } from "@/components/clinical-summary-section";
import { ClinicalIntelligencePanel } from "@/components/clinical-intelligence-panel";
import { ReportDoctorReview } from "@/components/report-doctor-review";
import { ReportFilesSection } from "@/components/report-files-section";
import { ReportHeaderInsights } from "@/components/report-header-insights";
import { ReportAddFilesButton } from "@/components/report-add-files-button";
import { ReportAiChatFab } from "@/components/report-ai-chat-fab";
import { useLocale } from "@/hooks/use-locale";
import { useAuth } from "@/hooks/use-auth";
import { useReportAiAnalysis } from "@/hooks/use-report-ai-analysis";
import { useReportFullDocumentText } from "@/hooks/use-report-full-document-text";
import { getReport, getReportResult } from "@/lib/api/reports";
import { hasDisplayableClinicalSummary } from "@/lib/report-result-utils";
import { bilingual } from "@/lib/i18n";
import { repairClinicalSummary, repairDoctorSummary } from "@/lib/bilingual-repair";
import { ReportAnalysisEngineBadge } from "@/components/report-analysis-engine-badge";
import { resolveAnalysisEngine } from "@/lib/report-result-utils";
import { enrichRecommendation } from "@/lib/recommendation-details";
import {
  mapKeyFindings,
  parseReportResult,
  pickLocaleText,
} from "@/lib/report-analysis";
import {
  resolveReportKeyFindings,
  resolveReportRiskIndicator,
} from "@/lib/report-key-findings";
import {
  patientIdentityDisplayFields,
  patientIdentityPageHeading,
} from "@/lib/report-patient-identity";
import type { ReportPatientIdentity } from "@/lib/types/api";
import {
  buildReportChatMeta,
  hasReportChatContext,
  type ReportChatMeta,
} from "@/lib/report-chat-context";
import type {
  ClinicalIntelligenceResult,
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

function resolvePatientIdentity(
  result: ReportResult | null | undefined,
): ReportPatientIdentity | null {
  if (!result) return null;
  return result.patient_identity ?? result.patientIdentity ?? null;
}

export function ReportDetailClient({
  reportId,
  initialReport,
  initialResult,
  initialAnalyzing,
  chatMeta,
  analyzingBanner = null,
}: ReportDetailClientProps) {
  const { locale } = useLocale();
  const { data: user } = useAuth();
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

  const { data: result, isLoading: resultLoading } = useQuery({
    queryKey: ["report-result", reportId],
    queryFn: () => getReportResult(reportId),
    initialData:
      cachedResult && hasDisplayableClinicalSummary(cachedResult)
        ? cachedResult
        : initialResult ?? undefined,
    refetchOnMount: (query) =>
      !hasDisplayableClinicalSummary(query.state.data) ||
      !resolvePatientIdentity(query.state.data),
    refetchInterval: (query) => {
      if (hasDisplayableClinicalSummary(query.state.data)) {
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

  const documentText = useReportFullDocumentText(reportId, report, result);

  const analysisRepaired = useMemo(() => {
    if (!result || !analysis) return null;
    const doctor = repairDoctorSummary(
      analysis.doctorSummary,
      analysis.summary,
      documentText,
      result,
    );
    const summary = repairClinicalSummary(analysis.summary, documentText, result);
    return { ...analysis, doctorSummary: doctor, summary };
  }, [analysis, documentText, result]);

  const analysisEngine = useMemo(
    () => resolveAnalysisEngine(result),
    [result],
  );

  const {
    isAnalyzing: aiAnalysisRunning,
    isRunning: aiSummaryGenerating,
    error: aiAnalysisError,
    retry: retryAiAnalysis,
  } = useReportAiAnalysis({
    reportId,
    report,
    result,
    locale,
  });

  const hasSummary = hasDisplayableClinicalSummary(result);

  const isAnalyzing =
    aiAnalysisRunning ||
    (!hasSummary &&
      (report?.status === "uploaded" ||
        report?.status === "processing" ||
        initialAnalyzing));

  const engineBadgeLoading =
    (isAnalyzing || aiSummaryGenerating) && !analysisEngine;

  const summary = useMemo(() => {
    const inProgress = bilingual(
      "Analysis in progress…",
      "Analisis sedang berlangsung…",
    );
    let base: typeof inProgress;
    if (hasSummary && analysis?.summary) {
      base = analysis.summary;
    } else if (isAnalyzing) {
      base = inProgress;
    } else {
      base = bilingual("", "");
    }
    if (!result) return base;
    return repairClinicalSummary(base, documentText, result);
  }, [analysis?.summary, documentText, hasSummary, isAnalyzing, result]);

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
    if (!analysisRepaired) return "";
    return pickLocaleText(analysisRepaired.doctorSummary, locale);
  }, [analysisRepaired, locale]);

  const chatMetaResolved = useMemo(
    () =>
      report
        ? buildReportChatMeta(report, result ?? null, locale)
        : chatMeta,
    [report, result, locale, chatMeta],
  );

  const chatReady = useMemo(
    () => hasReportChatContext(report, result, documentText),
    [report, result, documentText],
  );

  const resolvedKeyFindings = useMemo(
    () => resolveReportKeyFindings(result ?? null, documentText),
    [result, documentText],
  );
  const resolvedRisk = useMemo(
    () =>
      resolveReportRiskIndicator(
        result?.risk_indicator ?? analysis?.riskIndicator ?? null,
        resolvedKeyFindings,
      ),
    [result?.risk_indicator, analysis?.riskIndicator, resolvedKeyFindings],
  );
  const findings = useMemo(
    () => mapKeyFindings(resolvedKeyFindings),
    [resolvedKeyFindings],
  );

  const persistedIdentity = useMemo(
    () => resolvePatientIdentity(result),
    [result],
  );

  const pageHeading = useMemo(
    () =>
      patientIdentityPageHeading(
        persistedIdentity,
        locale,
        report?.title ?? "",
      ),
    [persistedIdentity, locale, report?.title],
  );

  const clinicalSummaryPatientFields = useMemo(
    () => patientIdentityDisplayFields(persistedIdentity, locale),
    [persistedIdentity, locale],
  );

  const clinicalIntelligence = useMemo((): ClinicalIntelligenceResult | null => {
    if (!result) return null;
    return result.clinical_intelligence ?? result.clinicalIntelligence ?? null;
  }, [result]);

  const isClinician =
    user?.role === "DOCTOR" ||
    user?.role === "CLINICIAN" ||
    user?.role === "TENANT_ADMIN" ||
    user?.role === "SUPER_ADMIN";

  const requiresReview =
    result?.requires_clinical_review ??
    result?.requiresClinicalReview ??
    clinicalIntelligence?.clinical_summary?.requires_doctor_review ??
    clinicalIntelligence?.clinicalSummary?.requiresDoctorReview ??
    false;

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
  const isImageReport = /\.(jpe?g|png|gif|webp|heic|bmp)$/i.test(
    report.file_reference ?? report.title ?? "",
  );
  const limitedAnalysis =
    !clinicalIntelligence &&
    (analysis?.limitedAnalysis ??
      (isImageReport && findings.length === 0 && hasSummary));

  const showLegacySummaries = !clinicalIntelligence;

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
        <ReportHeaderInsights
          locale={locale}
          keyFindings={findings}
          patientFields={clinicalSummaryPatientFields}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-heading text-2xl font-bold text-slate-900">
              {pageHeading.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{pageHeading.subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {resolvedRisk && hasSummary && !limitedAnalysis ? (
                <RiskIndicator
                  level={resolvedRisk}
                  lang={locale}
                  percentage={
                    analysis?.confidenceScore != null
                      ? Math.round(analysis.confidenceScore * 100)
                      : undefined
                  }
                />
              ) : null}
              <ReportAnalysisEngineBadge
                engine={analysisEngine}
                locale={locale}
                loading={engineBadgeLoading}
              />
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
            </div>
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

        {clinicalIntelligence ? (
          <ClinicalIntelligencePanel data={clinicalIntelligence} locale={locale} />
        ) : null}

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

        <div
          className={`grid gap-6 ${showLegacySummaries ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
        >
          <section className="space-y-4">
            <ReportFilesSection
              report={report}
              reportId={reportId}
              locale={locale}
              uploadedFiles={uploadedFiles}
              fileAnalyses={fileAnalyses}
            />
          </section>

          {showLegacySummaries ? (
            <>
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
            </>
          ) : (
            <section className="space-y-4">
              {recommendations.length > 0 ? (
                <RecommendationList items={recommendations} lang={locale} />
              ) : null}
            </section>
          )}

          <section className="space-y-4">
            {isClinician && report.status === "completed" && (requiresReview || clinicalIntelligence) ? (
              <ReportDoctorReview reportId={reportId} locale={locale} />
            ) : null}
            {isClinician && report.status === "validated" ? (
              <ReportDoctorReview reportId={reportId} locale={locale} disabled />
            ) : null}
          </section>
        </div>
      </div>

      <ReportAiChatFab
        reportId={reportId}
        locale={locale}
        sessionId={report.ai_session_id}
        chatMeta={chatMetaResolved}
        disabled={!chatReady}
      />
    </AppShell>
  );
}
