import {
  hasAcceptableClinicalSummary,
  hasMeaningfulClinicalSummary,
} from "@/lib/clinical-summary";
import { isGenericHospitalClinicalOverview } from "@/lib/hospital-lab-narrative";
import { hasStructuredLabSummary } from "@/lib/format-lab-summary";

export { hasMeaningfulClinicalSummary };
import type { Locale } from "@/lib/i18n";
import type { BilingualStrings, Report, ReportResult } from "@/lib/types/api";

/** True when the API returned a real AI summary (not a placeholder). */
export function hasClinicalSummary(
  result: ReportResult | null | undefined,
): boolean {
  return hasMeaningfulClinicalSummary(result);
}

/** True when a readable AI clinical summary is available to show. */
export function hasDisplayableClinicalSummary(
  result: ReportResult | null | undefined,
): boolean {
  return (
    hasMeaningfulClinicalSummary(result) ||
    hasAcceptableClinicalSummary(result)
  );
}

export function hasDoctorSummaryContent(
  result: ReportResult | null | undefined,
): boolean {
  if (!result) return false;
  return Boolean(
    result.doctor_summary_bilingual?.en?.trim() ||
      result.doctor_summary_bilingual?.id?.trim() ||
      result.doctor_summary?.trim(),
  );
}

export function pickLocaleString(
  text: BilingualStrings | null | undefined,
  locale: Locale,
): string {
  if (!text) return "";
  const value = text[locale]?.trim();
  if (value) return value;
  return text.en?.trim() || text.id?.trim() || "";
}

export function getDoctorSummaryForAnalysis(
  result: ReportResult,
  locale: Locale,
): string {
  if (result.doctor_summary_bilingual) {
    return pickLocaleString(result.doctor_summary_bilingual, locale);
  }
  return result.doctor_summary?.trim() ?? "";
}

export function reportInputType(
  filename: string,
): "pdf" | "image" | "text" {
  if (/\.(jpe?g|png|gif|webp|heic|bmp)$/i.test(filename)) {
    return "image";
  }
  if (/\.(txt|csv|md|json)$/i.test(filename)) {
    return "text";
  }
  return "pdf";
}

export type AnalysisEngine = "ai" | "rule_based";

export function isRuleBasedAnalysis(
  result: ReportResult | null | undefined,
): boolean {
  if (!result) return false;
  const stored = result.analysis_engine ?? result.analysisEngine;
  if (stored === "rule_based") return true;
  if (stored === "ai") return false;

  const doctor =
    result.doctor_summary_bilingual?.en?.trim() ||
    result.doctor_summary?.trim() ||
    "";
  if (/\.jpe?g:\s/i.test(doctor) || /WhatsApp Image.*:\s/i.test(doctor)) {
    return true;
  }
  if ((doctor.match(/Review full values in the chart/gi) ?? []).length >= 2) {
    return true;
  }

  const en =
    result.summary_bilingual?.en?.trim() || result.summary?.trim() || "";
  if (/Combined summary across \d+ uploaded files/i.test(en)) return true;
  if (isGenericHospitalClinicalOverview(en)) return true;

  return false;
}

export function resolveAnalysisEngine(
  result: ReportResult | null | undefined,
): AnalysisEngine | null {
  if (!result) return null;
  const stored = result.analysis_engine ?? result.analysisEngine;
  if (stored === "ai" || stored === "rule_based") return stored;
  if (isRuleBasedAnalysis(result)) return "rule_based";
  if (isHospitalLabRuleBasedResult(result)) return "rule_based";
  if (hasMeaningfulClinicalSummary(result)) return "ai";
  return null;
}

function isHospitalLabRuleBasedResult(result: ReportResult): boolean {
  const doctor =
    result.doctor_summary_bilingual?.en?.trim() ||
    result.doctor_summary?.trim() ||
    "";
  const clinical =
    result.summary_bilingual?.en?.trim() || result.summary?.trim() || "";
  return (
    hasStructuredLabSummary(doctor) ||
    hasStructuredLabSummary(clinical) ||
    /\blaboratory report for\b/i.test(doctor) ||
    /\blaporan laboratorium untuk\b/i.test(doctor)
  );
}

export function reportNeedsAiClinicalSummary(
  report: Report | null | undefined,
  result: ReportResult | null | undefined,
): boolean {
  if (!report || report.status === "failed") return false;

  const ci = result?.clinical_intelligence ?? result?.clinicalIntelligence;
  if (ci) {
    const hasCiLabs = (ci.normalized_results ?? ci.normalizedResults ?? []).length > 0;
    const hasCiSummary =
      Boolean(
        ci.clinical_summary?.executive_summary ??
          ci.clinicalSummary?.executiveSummary ??
          ci.clinical_summary?.short_summary ??
          ci.clinicalSummary?.shortSummary,
      );
    if (hasCiLabs || hasCiSummary) return false;
  }

  const stored = result?.analysis_engine ?? result?.analysisEngine;
  if (stored === "ai" && ci) return false;
  if (
    stored === "ai" &&
    !ci &&
    (report.status === "completed" || report.status === "validated")
  ) {
    return true;
  }

  if (
    (report.status === "completed" || report.status === "validated") &&
    hasAcceptableClinicalSummary(result)
  ) {
    return false;
  }

  if (isRuleBasedAnalysis(result)) return true;
  if (hasAcceptableClinicalSummary(result)) return false;
  if (report.status === "completed" || report.status === "validated") {
    return !hasAcceptableClinicalSummary(result);
  }
  if (hasDoctorSummaryContent(result)) return true;
  if ((result?.key_findings?.length ?? 0) > 0) return true;
  return report.status === "uploaded" || report.status === "processing";
}

export function isReportAnalyzing(
  report: Report | null,
  result: ReportResult | null,
): boolean {
  return reportNeedsAiClinicalSummary(report, result);
}

export function reportAnalysisInputType(report: Report): "pdf" | "image" | "text" {
  return reportInputType(report.file_reference ?? report.title ?? "");
}
