"use client";

import {
  AIStatusBadge,
  ClinicalSummaryCard,
  ConfidenceScore,
  DoctorReviewPanel,
  KeyFindingCard,
  RecommendationList,
  RiskIndicator,
  Spinner,
  type ReviewFormData,
} from "@alocare/design-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, type ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { DoctorSummaryCard } from "@/components/doctor-summary-card";
import { ReportAssessmentPanel } from "@/components/report-assessment-panel";
import { ReportFileCard } from "@/components/report-file-card";
import { useLocale } from "@/hooks/use-locale";
import { useReportAiAnalysis } from "@/hooks/use-report-ai-analysis";
import { getReport, getReportResult, validateReport } from "@/lib/api/reports";
import {
  hasDisplayableClinicalSummary,
  hasMeaningfulClinicalSummary,
} from "@/lib/report-result-utils";
import { repairClinicalSummary } from "@/lib/bilingual-repair";
import { enrichRecommendation } from "@/lib/recommendation-details";
import { extractDocumentText } from "@/lib/report-document";
import { buildReportAssessments } from "@/lib/report-assessments";
import {
  confidenceDescription,
  mapKeyFindings,
  parseReportResult,
  pickDoctorSummaryText,
} from "@/lib/report-analysis";
import type { Report, ReportResult } from "@/lib/types/api";

type ReportDetailClientProps = {
  reportId: string;
  initialReport: Report | null;
  initialResult: ReportResult | null;
  initialAnalyzing: boolean;
  analyzingBanner?: ReactNode;
};

export function ReportDetailClient({
  reportId,
  initialReport,
  initialResult,
  initialAnalyzing,
  analyzingBanner = null,
}: ReportDetailClientProps) {
  const { locale } = useLocale();
  const queryClient = useQueryClient();

  const { data: report, isLoading: reportLoading } = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReport(reportId),
    initialData: initialReport ?? undefined,
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
    initialData: initialResult ?? undefined,
    refetchInterval: (query) => {
      const status = report?.status;
      if (status === "processing" || status === "uploaded") {
        return 3000;
      }
      if (!hasMeaningfulClinicalSummary(query.state.data)) {
        return 3000;
      }
      return false;
    },
  });

  const analysis = useMemo(
    () => (result ? parseReportResult(result) : null),
    [result],
  );

  const assessments = useMemo(
    () =>
      buildReportAssessments(
        analysis?.keyFindings ?? [],
        analysis ? pickDoctorSummaryText(analysis.doctorSummary, locale) : "",
      ),
    [analysis, locale],
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

  const validateMutation = useMutation({
    mutationFn: (data: ReviewFormData) =>
      validateReport(reportId, data.comments),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      queryClient.invalidateQueries({ queryKey: ["report-result", reportId] });
    },
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
    const base =
      aiSummary ??
      (hasMeaningfulSummary && analysis?.summary
        ? analysis.summary
        : {
            en: "Analysis in progress…",
            id: "Analisis sedang berlangsung…",
          });
    if (!result) return base;
    return repairClinicalSummary(base, extractDocumentText(result));
  }, [aiSummary, analysis?.summary, hasMeaningfulSummary, result]);

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

  const doctorText = analysis
    ? pickDoctorSummaryText(analysis.doctorSummary, locale)
    : "";
  const nextActions =
    analysis?.nextActions[locale] ?? analysis?.nextActions.en ?? [];
  const findings = mapKeyFindings(analysis?.keyFindings ?? []);
  const confidencePercent =
    analysis?.confidenceScore != null
      ? Math.round(
          analysis.confidenceScore <= 1
            ? analysis.confidenceScore * 100
            : analysis.confidenceScore,
        )
      : 0;
  const riskLevel = analysis?.riskIndicator ?? "medium";
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">
              {report.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {locale === "id" ? "Hasil analisis AI" : "AI analysis result"}
            </p>
          </div>
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
            <ReportFileCard report={report} locale={locale} />
            <ReportAssessmentPanel items={assessments} locale={locale} />
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
            <ClinicalSummaryCard
              summary={summary}
              lang={locale}
              loading={!hasSummary || aiSummaryGenerating}
              className="[&_p]:whitespace-pre-wrap"
            />
            {findings.length > 0 && assessments.length === 0 ? (
              <KeyFindingCard findings={findings} lang={locale} />
            ) : hasSummary && !limitedAnalysis && findings.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                {locale === "id"
                  ? "Tidak ada temuan terstruktur pada dokumen ini."
                  : "No structured findings were detected in this document."}
              </div>
            ) : null}
            <ConfidenceScore
              score={hasSummary ? confidencePercent : 0}
              lang={locale}
              description={confidenceDescription(locale, limitedAnalysis)}
            />
            {hasSummary && analysis?.riskIndicator ? (
              <RiskIndicator level={riskLevel} lang={locale} />
            ) : null}
          </section>

          <section className="space-y-4">
            {doctorText ? (
              <DoctorSummaryCard text={doctorText} locale={locale} />
            ) : null}
            <RecommendationList items={recommendations} lang={locale} />
            <DoctorReviewPanel
              lang={locale}
              onSubmit={(data) => validateMutation.mutate(data)}
            />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
