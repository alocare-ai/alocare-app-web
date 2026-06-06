"use client";

import type { Locale } from "@/lib/i18n";
import {
  IMPACT_BENCHMARKS,
  MARKET_HIGHLIGHTS,
  PLATFORM_PILLARS,
} from "@/lib/alocare-presentation-metrics";
import { PatientIdentityPanel } from "@/components/patient-identity-panel";
import type { PatientDisplayField } from "@/lib/report-patient-identity";

export type ReportKeyFindingChartItem = {
  label: string;
  value: string;
  status: "normal" | "low" | "high" | "critical";
};

type ReportHeaderInsightsProps = {
  locale: Locale;
  keyFindings?: ReportKeyFindingChartItem[];
  patientFields?: PatientDisplayField[];
};

const STATUS_LABELS: Record<
  ReportKeyFindingChartItem["status"],
  { en: string; id: string }
> = {
  normal: { en: "Normal", id: "Normal" },
  low: { en: "Low", id: "Rendah" },
  high: { en: "High", id: "Tinggi" },
  critical: { en: "Critical", id: "Kritis" },
};

const STATUS_BAR: Record<ReportKeyFindingChartItem["status"], string> = {
  normal: "bg-teal-500",
  low: "bg-sky-500",
  high: "bg-amber-500",
  critical: "bg-red-500",
};

function parseScore0to100(value: string): number | null {
  const match = value.match(/\d{1,3}/);
  if (!match) return null;
  const n = Number.parseInt(match[0], 10);
  if (Number.isNaN(n) || n < 0 || n > 100) return null;
  return n;
}

function KeyFindingsChart({
  locale,
  findings,
}: {
  locale: Locale;
  findings: ReportKeyFindingChartItem[];
}) {
  const scored = findings
    .map((f) => ({ ...f, score: parseScore0to100(f.value) }))
    .filter((f) => f.score != null);

  if (scored.length === 0) return null;

  const heading = locale === "id" ? "Temuan Utama" : "Key Findings";
  const scaleHint = locale === "id" ? "Skala 0–100" : "0–100 scale";

  return (
    <div className="h-full">
      <p className="text-xs font-medium text-slate-700">{heading}</p>
      <ul className="mt-3 space-y-3" role="list">
        {scored.map((item) => {
          const statusLabel = STATUS_LABELS[item.status][locale];
          return (
            <li key={item.label}>
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 text-[10px] font-medium leading-snug text-slate-700">
                  {item.label}
                </p>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="text-sm font-bold tabular-nums text-teal-800">
                    {item.score}
                  </span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                      item.status === "critical"
                        ? "bg-red-100 text-red-800"
                        : item.status === "high"
                          ? "bg-amber-100 text-amber-900"
                          : item.status === "low"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-teal-100 text-teal-800"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${STATUS_BAR[item.status]}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <p className="mt-0.5 text-[9px] text-slate-400">{scaleHint}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ImpactBenchmarksChart({ locale }: { locale: Locale }) {
  const max = 100;
  return (
    <div className="h-full">
      <p className="text-xs font-medium text-slate-700">
        {locale === "id"
          ? "Dampak inteligensi kesehatan AI (%)"
          : "AI health intelligence impact (%)"}
      </p>
      <ul className="mt-3 space-y-2">
        {IMPACT_BENCHMARKS.map((item) => (
          <li key={item.key}>
            <div className="flex items-center justify-between gap-2 text-[10px] text-slate-600">
              <span className="min-w-0 truncate">
                {locale === "id" ? item.labelId : item.labelEn}
              </span>
              <span className="shrink-0 font-semibold tabular-nums text-teal-800">
                {item.value}%
              </span>
            </div>
            <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReportHeaderInsights({
  locale,
  keyFindings = [],
  patientFields = [],
}: ReportHeaderInsightsProps) {
  const pillars = PLATFORM_PILLARS[locale];
  const highlights = MARKET_HIGHLIGHTS[locale];
  const hasKeyFindingsChart = keyFindings.some(
    (f) => parseScore0to100(f.value) != null,
  );

  return (
    <section
      className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-teal-50/30"
      aria-label={
        locale === "id"
          ? "Ringkasan visual inteligensi kesehatan"
          : "Health intelligence visual summary"
      }
    >
      <div className="border-b border-slate-100 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
              {locale === "id"
                ? "Personal Health Operating System"
                : "Personal Health Operating System"}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {pillars.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-teal-200/80 bg-white px-2.5 py-0.5 text-[10px] font-medium text-teal-900"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-start justify-start gap-4 sm:justify-end sm:gap-5">
            {highlights.map((h) => (
              <div key={h.label} className="text-left sm:text-right">
                <p className="text-sm font-bold tabular-nums text-slate-900">
                  {h.value}
                </p>
                <p className="max-w-[8.5rem] text-[10px] leading-tight text-slate-500 sm:ml-auto">
                  {h.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`grid gap-4 p-4 ${
          hasKeyFindingsChart
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "md:grid-cols-2"
        }`}
      >
        <PatientIdentityPanel locale={locale} fields={patientFields} />
        <ImpactBenchmarksChart locale={locale} />
        {hasKeyFindingsChart ? (
          <KeyFindingsChart locale={locale} findings={keyFindings} />
        ) : null}
      </div>
    </section>
  );
}
