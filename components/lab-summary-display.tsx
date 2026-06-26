"use client";

import type { Locale } from "@/hooks/use-locale";
import type { ParsedLabSummary } from "@/lib/format-lab-summary";

type LabSummaryDisplayProps = {
  summary: ParsedLabSummary;
  locale: Locale;
  compact?: boolean;
};

export function LabSummaryDisplay({
  summary,
  locale,
  compact = false,
}: LabSummaryDisplayProps) {
  const notableLabel = locale === "id" ? "Perlu perhatian" : "Notable";

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <p className="text-sm leading-relaxed text-slate-700">{summary.intro}</p>

      {summary.sectionHeading ? (
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {summary.sectionHeading}
        </p>
      ) : null}

      <ul className="space-y-3">
        {summary.panels.map((panel) => (
          <li
            key={panel.label}
            className="rounded-lg border border-slate-100 bg-slate-50/90 px-3 py-2.5"
          >
            <p className="text-sm font-medium text-slate-900">{panel.label}</p>
            {panel.placeholder ? (
              <p className="mt-1.5 text-sm italic text-slate-500">
                {locale === "id"
                  ? "Nilai lengkap di berkas sumber"
                  : "See full values in source file"}
              </p>
            ) : panel.metrics.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {panel.metrics.map((metric) => (
                  <li
                    key={`${panel.label}-${metric.text}`}
                    className={`flex items-start gap-2 text-sm leading-snug ${
                      metric.abnormal
                        ? "font-medium text-amber-800"
                        : "text-slate-700"
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        metric.abnormal ? "bg-amber-500" : "bg-slate-300"
                      }`}
                      aria-hidden
                    />
                    <span>{metric.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>

      {summary.notable ? (
        <p className="rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-2 text-sm text-amber-900">
          <span className="font-medium">{notableLabel}: </span>
          {summary.notable}
        </p>
      ) : null}

      {summary.footer ? (
        <p className="text-xs leading-relaxed text-slate-500">{summary.footer}</p>
      ) : null}
    </div>
  );
}
