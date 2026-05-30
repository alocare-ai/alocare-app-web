"use client";

import type { Locale } from "@/hooks/use-locale";
import type { ReportAssessmentItem } from "@/lib/report-assessments";

type ReportAssessmentPanelProps = {
  items: ReportAssessmentItem[];
  locale: Locale;
};

export function ReportAssessmentPanel({
  items,
  locale,
}: ReportAssessmentPanelProps) {
  const heading = locale === "id" ? "Penilaian" : "Assessment";

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">{heading}</h3>
        <p className="mt-2 text-sm text-slate-500">
          {locale === "id"
            ? "Belum ada skor penilaian terstruktur."
            : "No structured assessment scores yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">{heading}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="min-w-0 text-sm font-medium leading-snug text-slate-900">
                {item.title}
              </p>
              {item.score ? (
                <span className="shrink-0 text-xl font-semibold tabular-nums text-teal-700">
                  {item.score}
                </span>
              ) : null}
            </div>
            {item.detail ? (
              <p className="mt-1.5 line-clamp-4 text-xs leading-relaxed text-slate-600">
                {item.detail}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
