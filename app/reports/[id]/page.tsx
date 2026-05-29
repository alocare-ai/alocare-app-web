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
  UploadPreview,
  type ReviewFormData,
} from "@alocare/design-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { AppShell } from "@/components/app-shell";
import { useLocale } from "@/hooks/use-locale";
import { getReport, getReportResult, validateReport } from "@/lib/api/reports";
import {
  confidenceDescription,
  mapKeyFindings,
  parseReportResult,
  pickLocaleText,
} from "@/lib/report-analysis";

export default function ReportDetailPage() {
  const { locale } = useLocale();
  const params = useParams();
  const reportId = params.id as string;
  const queryClient = useQueryClient();

  const { data: report, isLoading: reportLoading } = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReport(reportId),
  });

  const { data: result, isLoading: resultLoading } = useQuery({
    queryKey: ["report-result", reportId],
    queryFn: () => getReportResult(reportId),
    enabled: Boolean(reportId),
  });

  const analysis = useMemo(
    () => (result ? parseReportResult(result) : null),
    [result],
  );

  const validateMutation = useMutation({
    mutationFn: (data: ReviewFormData) =>
      validateReport(reportId, data.comments),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      queryClient.invalidateQueries({ queryKey: ["report-result", reportId] });
    },
  });

  if (reportLoading || resultLoading) {
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

  const summary = analysis?.summary ?? {
    en: "Analysis in progress…",
    id: "Analisis sedang berlangsung…",
  };
  const hasSummary =
    report.status === "completed" || Boolean(result?.summary_bilingual);
  const doctorText = analysis
    ? pickLocaleText(analysis.doctorSummary, locale)
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

  const recommendations = nextActions.map((action, i) => ({
    id: String(i),
    title: action,
    icon: "default" as const,
  }));

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

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-4">
            <UploadPreview
              fileName={report.file_reference ?? report.title}
              lang={locale}
              uploaded
            />
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
              <p className="font-medium text-slate-900">
                {locale === "id" ? "Info file" : "File info"}
              </p>
              <dl className="mt-2 space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <dt>ID</dt>
                  <dd className="font-mono text-xs">{report.id.slice(0, 8)}…</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{locale === "id" ? "Status" : "Status"}</dt>
                  <dd className="capitalize">{report.status}</dd>
                </div>
              </dl>
            </div>
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
              loading={!hasSummary}
            />
            {findings.length > 0 ? (
              <KeyFindingCard findings={findings} lang={locale} />
            ) : hasSummary && !limitedAnalysis ? (
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
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {locale === "id" ? "Ringkasan dokter" : "Doctor summary"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {doctorText}
                </p>
              </div>
            ) : null}
            <RecommendationList items={recommendations} lang={locale} />
            <DoctorReviewPanel
              lang={locale}
              confidenceScore={hasSummary ? confidencePercent : 0}
              onSubmit={(data) => validateMutation.mutate(data)}
            />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
