"use client";

import { Spinner } from "@alocare/design-system";
import { ChevronDown, ClipboardList, User } from "lucide-react";
import { useMemo, useState } from "react";
import type { BilingualText } from "@alocare/design-system";
import type { Locale } from "@/hooks/use-locale";
import { pickLocaleText } from "@/lib/report-analysis";
import {
  buildClinicalSummaryDisplay,
  shouldShowClinicalFileDetails,
} from "@/lib/clinical-summary-display";
import type { PatientDisplayField } from "@/lib/report-patient-heading";
import type { ReportFileAnalysis } from "@/lib/types/api";

type ClinicalSummarySectionProps = {
  summary: BilingualText;
  locale: Locale;
  loading?: boolean;
  className?: string;
  fileAnalyses?: ReportFileAnalysis[];
  patientFields?: PatientDisplayField[];
};

export function ClinicalSummarySection({
  summary,
  locale,
  loading = false,
  className,
  fileAnalyses = [],
  patientFields = [],
}: ClinicalSummarySectionProps) {
  const sectionTitle =
    locale === "id" ? "Ringkasan Klinis" : "Clinical Summary";
  const summaryText = pickLocaleText(summary, locale);
  const [fileDetailsOpen, setFileDetailsOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const display = useMemo(
    () => buildClinicalSummaryDisplay(summaryText, fileAnalyses, locale),
    [summaryText, fileAnalyses, locale],
  );

  const showFileDetails = shouldShowClinicalFileDetails(display);
  const fileCount = display.fileSections.length;
  const patientPanelLabel =
    locale === "id" ? "Identitas pasien" : "Patient identity";
  const detailsLabel =
    locale === "id" ? "Detail per berkas" : "Details by file";
  const detailsToggleLabel = fileDetailsOpen
    ? locale === "id"
      ? "Sembunyikan detail per berkas"
      : "Hide details by file"
    : locale === "id"
      ? `Tampilkan detail per berkas (${fileCount})`
      : `Show details by file (${fileCount})`;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${className ?? ""}`}
    >
      <div className="border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700"
            aria-hidden
          >
            <ClipboardList className="h-4 w-4" />
          </span>
          <h3 className="text-sm font-semibold text-slate-900">{sectionTitle}</h3>
        </div>

        {!loading && patientFields.length > 0 ? (
          <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              <User className="h-3.5 w-3.5" aria-hidden />
              {patientPanelLabel}
            </div>
            <dl className="grid gap-2 sm:grid-cols-2">
              {patientFields.map((field) => (
                <div key={field.label} className="min-w-0">
                  <dt className="text-xs text-slate-500">{field.label}</dt>
                  <dd className="text-sm font-medium text-slate-900">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <div className="mt-3">
          {loading ? (
            <div className="flex items-center gap-2 py-4">
              <Spinner />
              <span className="text-sm text-slate-500">
                {locale === "id"
                  ? "Menghasilkan ringkasan…"
                  : "Generating summary…"}
              </span>
            </div>
          ) : (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {locale === "id" ? "Ringkasan klinis" : "Clinical overview"}
              </p>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {display.overview}
              </p>
            </>
          )}
        </div>
      </div>

      {!loading && showFileDetails ? (
        <div className="border-t border-slate-100">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-50/80"
            onClick={() => setFileDetailsOpen((open) => !open)}
            aria-expanded={fileDetailsOpen}
            aria-label={detailsToggleLabel}
          >
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {detailsLabel}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                fileDetailsOpen ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>

          {fileDetailsOpen ? (
            <ul className="divide-y divide-slate-100 border-t border-slate-100">
              {display.fileSections.map((section) => {
                const isOpen = expanded[section.id] ?? false;
                const preview =
                  section.body.length > 120
                    ? `${section.body.slice(0, 120).trim()}…`
                    : section.body;

                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-slate-50/80"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [section.id]: !isOpen,
                        }))
                      }
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="break-all text-sm font-medium text-slate-900 sm:break-words">
                          {section.title}
                        </p>
                        {!isOpen && preview ? (
                          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-slate-500">
                            {preview}
                          </p>
                        ) : null}
                      </div>
                      <ChevronDown
                        className={`mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    {isOpen ? (
                      <div className="border-t border-slate-50 bg-slate-50/60 px-4 py-3">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                          {section.body}
                        </p>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
