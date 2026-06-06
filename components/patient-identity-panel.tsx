"use client";

import { User } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { PatientDisplayField } from "@/lib/report-patient-identity";

type PatientIdentityPanelProps = {
  locale: Locale;
  fields: PatientDisplayField[];
};

export function PatientIdentityPanel({
  locale,
  fields,
}: PatientIdentityPanelProps) {
  if (fields.length === 0) {
    return (
      <div className="h-full rounded-lg border border-dashed border-slate-200 bg-white/60 px-3 py-4">
        <p className="text-xs font-medium text-slate-700">
          {locale === "id" ? "Identitas pasien" : "Patient identity"}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          {locale === "id"
            ? "Identitas pasien akan muncul setelah unggahan dan analisis dokumen selesai."
            : "Patient identity appears after upload and document analysis complete."}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-700">
        <User className="h-3.5 w-3.5 text-teal-700" aria-hidden />
        {locale === "id" ? "Identitas pasien" : "Patient identity"}
      </div>
      <dl className="grid gap-2 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="min-w-0 rounded-md bg-white/70 px-2 py-1.5">
            <dt className="text-[10px] uppercase tracking-wide text-slate-500">
              {field.label}
            </dt>
            <dd className="text-sm font-semibold text-slate-900">{field.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
