"use client";

import { RiskIndicator } from "@alocare/design-system";
import type { Locale } from "@/hooks/use-locale";
import type {
  ClinicalIntelligenceNormalizedResult,
  ClinicalIntelligenceResult,
} from "@/lib/types/api";

type ClinicalIntelligencePanelProps = {
  data: ClinicalIntelligenceResult;
  locale: Locale;
};

function pick<T>(en: T | undefined, alt: T | undefined): T | undefined {
  return en ?? alt;
}

function riskFromLevel(level: string | undefined): "low" | "medium" | "high" {
  const v = (level ?? "").toLowerCase();
  if (v.includes("high")) return "high";
  if (v.includes("moderate") || v.includes("medium")) return "medium";
  return "low";
}

function statusClass(status: string | undefined): string {
  const v = (status ?? "").toLowerCase();
  if (v === "normal") return "text-emerald-700 dark:text-emerald-300";
  if (v === "low" || v === "high" || v === "abnormal") {
    return "text-amber-700 dark:text-amber-300";
  }
  return "text-slate-700 dark:text-slate-300";
}

function normalizedRows(
  data: ClinicalIntelligenceResult,
): ClinicalIntelligenceNormalizedResult[] {
  return data.normalized_results ?? data.normalizedResults ?? [];
}

function formatValue(row: ClinicalIntelligenceNormalizedResult): string {
  const value = row.value;
  if (value == null || value === "") return "—";
  const unit = row.unit;
  return unit ? `${value} ${unit}` : String(value);
}

export function ClinicalIntelligencePanel({
  data,
  locale,
}: ClinicalIntelligencePanelProps) {
  const isId = locale === "id";
  const patient = pick(data.patient_summary, data.patientSummary);
  const clinical = pick(data.clinical_summary, data.clinicalSummary);
  const findings = data.findings;
  const diagnosis = pick(data.diagnosis_support, data.diagnosisSupport);
  const risk = pick(data.risk_assessment, data.riskAssessment);
  const recommendations = data.recommendations;
  const patientFriendly = pick(data.patient_friendly, data.patientFriendly);
  const safety = data.safety_note ?? data.safetyNote;
  const labRows = normalizedRows(data);

  const executive =
    clinical?.executive_summary ??
    clinical?.executiveSummary ??
    clinical?.short_summary ??
    clinical?.shortSummary;

  const primaryImpression =
    diagnosis?.primary_impression ?? diagnosis?.primaryImpression ?? [];
  const differential =
    diagnosis?.differential_diagnosis ?? diagnosis?.differentialDiagnosis ?? [];
  const pending = diagnosis?.pending_results ?? diagnosis?.pendingResults ?? [];
  const interpretation =
    diagnosis?.clinical_interpretation ?? diagnosis?.clinicalInterpretation;
  const doctorActions =
    recommendations?.doctor_actions ?? recommendations?.doctorActions ?? [];
  const patientAdvice =
    recommendations?.patient_advice ?? recommendations?.patientAdvice ?? [];
  const alarmSymptoms = risk?.alarm_symptoms ?? risk?.alarmSymptoms ?? [];
  const chiefComplaint =
    patient?.chief_complaint ?? patient?.chiefComplaint ?? [];

  const hasFindings =
    (findings?.laboratory?.length ?? 0) > 0 ||
    (findings?.endoscopy?.length ?? 0) > 0 ||
    labRows.length > 0;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {isId ? "Ringkasan Klinis Eksekutif" : "Executive Clinical Summary"}
        </h2>
        {patient?.name ? (
          <p className="mt-1 text-sm text-slate-500">
            {patient.name}
            {patient.age ? ` · ${patient.age}` : ""}
            {patient.sex ? ` · ${patient.sex}` : ""}
          </p>
        ) : null}
        {chiefComplaint.length > 0 ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium">
              {isId ? "Keluhan: " : "Chief complaint: "}
            </span>
            {chiefComplaint.join("; ")}
          </p>
        ) : null}
        {executive ? (
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {executive}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <RiskIndicator
            level={riskFromLevel(
              clinical?.risk_level ?? clinical?.riskLevel ?? risk?.level,
            )}
            lang={locale}
          />
          {(clinical?.requires_doctor_review ?? clinical?.requiresDoctorReview) !==
            false && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
              {isId ? "Perlu tinjauan dokter" : "Requires doctor review"}
            </span>
          )}
        </div>
      </section>

      {labRows.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {isId ? "Hasil Laboratorium" : "Laboratory Results"}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {isId
              ? `${labRows.length} parameter diekstrak dari berkas sumber`
              : `${labRows.length} parameters extracted from source documents`}
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700">
                  <th className="py-2 pr-4 font-medium">
                    {isId ? "Pemeriksaan" : "Test"}
                  </th>
                  <th className="py-2 pr-4 font-medium">
                    {isId ? "Hasil" : "Result"}
                  </th>
                  <th className="py-2 pr-4 font-medium">
                    {isId ? "Nilai Normal" : "Reference"}
                  </th>
                  <th className="py-2 font-medium">
                    {isId ? "Status" : "Status"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {labRows.map((row) => (
                  <tr
                    key={row.test}
                    className="border-b border-slate-100 dark:border-slate-800"
                  >
                    <td className="py-2 pr-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.test}
                    </td>
                    <td className={`py-2 pr-4 ${statusClass(row.status)}`}>
                      {formatValue(row)}
                    </td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-slate-400">
                      {row.reference_range ?? row.referenceRange ?? "—"}
                    </td>
                    <td className={`py-2 capitalize ${statusClass(row.status)}`}>
                      {row.status ?? "unknown"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {hasFindings ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {isId ? "Temuan Klinis" : "Clinical Findings"}
          </h3>
          <div className="mt-4 space-y-4">
            {(findings?.laboratory ?? []).map((cat) => (
              <div key={cat.category}>
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {cat.category}
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  {cat.items.map((item) => (
                    <li key={`${cat.category}-${item.label}`} className="flex gap-2">
                      <span className={statusClass(item.status)}>•</span>
                      <span>
                        <strong>{item.label}</strong>{" "}
                        {item.status !== "unknown" ? `(${item.status})` : ""}
                        {item.detail ? ` — ${item.detail}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {(findings?.endoscopy?.length ?? 0) > 0 ? (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {isId ? "Endoskopi" : "Endoscopy"}
              </h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {findings?.endoscopy?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {(findings?.radiology?.length ?? 0) > 0 ? (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {isId ? "Radiologi" : "Radiology"}
              </h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {findings?.radiology?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {interpretation ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {isId ? "Interpretasi Klinis" : "Clinical Interpretation"}
          </h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {interpretation}
          </p>
        </section>
      ) : null}

      {primaryImpression.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {isId ? "Kemungkinan Diagnosis" : "Possible Diagnosis"}
          </h3>
          <div className="mt-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {isId ? "Impresi utama" : "Primary impression"}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
              {primaryImpression.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {differential.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {isId ? "Diagnosis banding" : "Differential considerations"}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {differential.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {pending.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {isId ? "Menunggu hasil" : "Pending results"}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-700 dark:text-amber-300">
                {pending.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {risk?.summary || alarmSymptoms.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {isId ? "Penilaian Risiko" : "Risk Assessment"}
          </h3>
          {risk?.summary ? (
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              {risk.summary}
            </p>
          ) : null}
          {alarmSymptoms.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-rose-700 dark:text-rose-300">
              {alarmSymptoms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {doctorActions.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {isId ? "Langkah yang Disarankan" : "Suggested Doctor Actions"}
          </h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
            {doctorActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {patientFriendly?.summary ? (
        <section className="rounded-xl border border-blue-100 bg-blue-50/60 p-5 dark:border-blue-900 dark:bg-blue-950/30">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">
            {isId ? "Penjelasan untuk Pasien" : "Patient-Friendly Explanation"}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-blue-900/90 dark:text-blue-100/90">
            {patientFriendly.summary}
          </p>
          {(patientAdvice.length > 0 || (patientFriendly.key_points?.length ?? 0) > 0) && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-blue-900/80 dark:text-blue-100/80">
              {(patientFriendly.key_points ?? patientFriendly.keyPoints ?? patientAdvice).map(
                (item) => (
                  <li key={item}>{item}</li>
                ),
              )}
            </ul>
          )}
        </section>
      ) : null}

      {safety ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{safety}</p>
      ) : null}
    </div>
  );
}
