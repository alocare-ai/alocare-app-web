import type { Locale } from "@/hooks/use-locale";
import {
  localizeClinicalPhrase,
  translateCategoryName,
  translateTestName,
} from "@/lib/lab-test-localization";
import type { ClinicalIntelligenceResult } from "@/lib/types/api";

function localizeStringList(items: string[], locale: Locale): string[] {
  return items.map((item) => localizeClinicalPhrase(item, locale));
}

/** Apply locale-aware labels to stored clinical intelligence (works on old blobs). */
export function localizeClinicalIntelligenceForDisplay(
  data: ClinicalIntelligenceResult,
  locale: Locale,
): ClinicalIntelligenceResult {
  const normalized = (data.normalized_results ?? data.normalizedResults ?? []).map(
    (row) => ({
      ...row,
      test: translateTestName(row.test ?? "", locale),
      clinical_meaning: localizeClinicalPhrase(
        row.clinical_meaning ?? row.clinicalMeaning ?? "",
        locale,
      ),
      clinicalMeaning: localizeClinicalPhrase(
        row.clinicalMeaning ?? row.clinical_meaning ?? "",
        locale,
      ),
    }),
  );

  const mapFindingItem = (item: {
    label: string;
    status?: string;
    detail?: string;
    category?: string;
  }) => ({
    label: translateTestName(item.label, locale),
    status: item.status ?? "unknown",
    detail: localizeClinicalPhrase(item.detail ?? "", locale),
    category: item.category
      ? translateCategoryName(item.category, locale)
      : item.category,
  });

  const findings = data.findings
    ? {
        ...data.findings,
        laboratory: (data.findings.laboratory ?? []).map((cat) => ({
          ...cat,
          category: translateCategoryName(cat.category, locale),
          items: cat.items.map(mapFindingItem),
        })),
        abnormal: (data.findings.abnormal ?? []).map(mapFindingItem),
        normal: (data.findings.normal ?? []).map(mapFindingItem),
        endoscopy: localizeStringList(data.findings.endoscopy ?? [], locale),
        radiology: localizeStringList(data.findings.radiology ?? [], locale),
        other: localizeStringList(data.findings.other ?? [], locale),
      }
    : data.findings;

  const clinical = data.clinical_summary ?? data.clinicalSummary;
  const diagnosis = data.diagnosis_support ?? data.diagnosisSupport;
  const risk = data.risk_assessment ?? data.riskAssessment;
  const recommendations = data.recommendations;
  const patientFriendly = data.patient_friendly ?? data.patientFriendly;

  return {
    ...data,
    normalized_results: normalized,
    normalizedResults: normalized,
    findings,
    clinical_summary: clinical
      ? {
          ...clinical,
          executive_summary: localizeClinicalPhrase(
            clinical.executive_summary ?? clinical.executiveSummary ?? "",
            locale,
          ),
          executiveSummary: localizeClinicalPhrase(
            clinical.executiveSummary ?? clinical.executive_summary ?? "",
            locale,
          ),
          short_summary: localizeClinicalPhrase(
            clinical.short_summary ?? clinical.shortSummary ?? "",
            locale,
          ),
          shortSummary: localizeClinicalPhrase(
            clinical.shortSummary ?? clinical.short_summary ?? "",
            locale,
          ),
        }
      : clinical,
    diagnosis_support: diagnosis
      ? {
          ...diagnosis,
          clinical_interpretation: localizeClinicalPhrase(
            diagnosis.clinical_interpretation ??
              diagnosis.clinicalInterpretation ??
              "",
            locale,
          ),
          clinicalInterpretation: localizeClinicalPhrase(
            diagnosis.clinicalInterpretation ??
              diagnosis.clinical_interpretation ??
              "",
            locale,
          ),
          primary_impression: localizeStringList(
            diagnosis.primary_impression ?? diagnosis.primaryImpression ?? [],
            locale,
          ),
          primaryImpression: localizeStringList(
            diagnosis.primaryImpression ?? diagnosis.primary_impression ?? [],
            locale,
          ),
          differential_diagnosis: localizeStringList(
            diagnosis.differential_diagnosis ??
              diagnosis.differentialDiagnosis ??
              [],
            locale,
          ),
          differentialDiagnosis: localizeStringList(
            diagnosis.differentialDiagnosis ??
              diagnosis.differential_diagnosis ??
              [],
            locale,
          ),
          pending_results: localizeStringList(
            diagnosis.pending_results ?? diagnosis.pendingResults ?? [],
            locale,
          ),
          pendingResults: localizeStringList(
            diagnosis.pendingResults ?? diagnosis.pending_results ?? [],
            locale,
          ),
          supporting_evidence: localizeStringList(
            diagnosis.supporting_evidence ?? diagnosis.supportingEvidence ?? [],
            locale,
          ),
          supportingEvidence: localizeStringList(
            diagnosis.supportingEvidence ?? diagnosis.supporting_evidence ?? [],
            locale,
          ),
        }
      : diagnosis,
    risk_assessment: risk
      ? {
          ...risk,
          summary: localizeClinicalPhrase(risk.summary ?? "", locale),
          red_flags: localizeStringList(risk.red_flags ?? risk.redFlags ?? [], locale),
          redFlags: localizeStringList(risk.redFlags ?? risk.red_flags ?? [], locale),
          alarm_symptoms: localizeStringList(
            risk.alarm_symptoms ?? risk.alarmSymptoms ?? [],
            locale,
          ),
          alarmSymptoms: localizeStringList(
            risk.alarmSymptoms ?? risk.alarm_symptoms ?? [],
            locale,
          ),
        }
      : risk,
    recommendations: recommendations
      ? {
          ...recommendations,
          doctor_actions: localizeStringList(
            recommendations.doctor_actions ?? recommendations.doctorActions ?? [],
            locale,
          ),
          doctorActions: localizeStringList(
            recommendations.doctorActions ?? recommendations.doctor_actions ?? [],
            locale,
          ),
          patient_advice: localizeStringList(
            recommendations.patient_advice ?? recommendations.patientAdvice ?? [],
            locale,
          ),
          patientAdvice: localizeStringList(
            recommendations.patientAdvice ?? recommendations.patient_advice ?? [],
            locale,
          ),
        }
      : recommendations,
    patient_friendly: patientFriendly
      ? {
          ...patientFriendly,
          summary: localizeClinicalPhrase(patientFriendly.summary ?? "", locale),
          key_points: localizeStringList(
            patientFriendly.key_points ?? patientFriendly.keyPoints ?? [],
            locale,
          ),
          keyPoints: localizeStringList(
            patientFriendly.keyPoints ?? patientFriendly.key_points ?? [],
            locale,
          ),
        }
      : patientFriendly,
  };
}
