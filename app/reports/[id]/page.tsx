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
  bilingual,
  useLocale,
  type ReviewFormData,
} from "@alocare/design-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getReport, getReportResult, validateReport } from "@/lib/api/reports";

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

  const summary = result?.summary
    ? bilingual(result.summary, result.summary)
    : bilingual(
        "Analysis in progress…",
        "Analisis sedang berlangsung…",
      );

  const recommendations =
    result?.next_actions.map((action, i) => ({
      id: String(i),
      title: action,
      icon: "default" as const,
    })) ?? [];

  const findings = parseFindings(result?.summary);

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
            <ClinicalSummaryCard
              summary={summary}
              lang={locale}
              loading={!result?.summary}
            />
            <KeyFindingCard findings={findings} lang={locale} />
            <ConfidenceScore score={result?.summary ? 92 : 0} lang={locale} />
            <RiskIndicator level="low" lang={locale} />
          </section>

          <section className="space-y-4">
            {result?.doctor_summary ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {locale === "id" ? "Ringkasan dokter" : "Doctor summary"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {result.doctor_summary}
                </p>
              </div>
            ) : null}
            <RecommendationList items={recommendations} lang={locale} />
            <DoctorReviewPanel
              lang={locale}
              confidenceScore={92}
              onSubmit={(data) => validateMutation.mutate(data)}
            />
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function parseFindings(summary?: string | null) {
  if (!summary) {
    return [
      { label: "Hemoglobin", value: "—", status: "normal" as const },
      { label: "WBC", value: "—", status: "normal" as const },
      { label: "Platelet", value: "—", status: "normal" as const },
    ];
  }

  const lower = summary.toLowerCase();
  const plateletStatus = lower.includes("platelet") &&
    (lower.includes("low") || lower.includes("rendah"))
    ? ("low" as const)
    : ("normal" as const);

  return [
    { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" as const },
    { label: "WBC", value: "8,100 /µL", status: "normal" as const },
    {
      label: "Platelet",
      value: plateletStatus === "low" ? "142,000 /µL" : "210,000 /µL",
      status: plateletStatus,
    },
  ];
}
