"use client";

import { useMemo } from "react";
import type { Locale } from "@/hooks/use-locale";
import {
  formatDoctorSummaryPlain,
  parseDoctorSummary,
} from "@/lib/format-doctor-summary";

type DoctorSummaryCardProps = {
  text: string;
  locale: Locale;
};

export function DoctorSummaryCard({ text, locale }: DoctorSummaryCardProps) {
  const parsed = useMemo(() => parseDoctorSummary(text), [text]);
  const plainFormatted = useMemo(() => formatDoctorSummaryPlain(text), [text]);

  const heading = locale === "id" ? "Ringkasan dokter" : "Doctor summary";

  if (!parsed) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">{heading}</h3>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {plainFormatted || text}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">{heading}</h3>

      <div className="mt-3 space-y-4">
        {parsed.reportTitle ? (
          <p className="text-sm font-medium text-slate-900">{parsed.reportTitle}</p>
        ) : null}

        {parsed.patientFields.length > 0 ? (
          <dl className="grid gap-2 sm:grid-cols-2">
            {parsed.patientFields.map((field) => (
              <div key={field.label} className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {field.label}
                </dt>
                <dd className="mt-0.5 text-sm text-slate-800">{field.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {parsed.sections.length > 0 ? (
          <ul className="space-y-3 border-t border-slate-100 pt-3">
            {parsed.sections.map((section) => (
              <li
                key={`${section.title}-${section.score ?? ""}`}
                className="rounded-lg bg-slate-50 px-3 py-2.5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{section.title}</p>
                  {section.score ? (
                    <span className="text-lg font-semibold tabular-nums text-teal-700">
                      {section.score}
                    </span>
                  ) : null}
                </div>
                {section.description ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {section.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
