import {
  hasAcceptableClinicalSummary,
  hasMeaningfulClinicalSummary,
} from "@/lib/clinical-summary";

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

export function reportNeedsAiClinicalSummary(
  report: Report | null | undefined,
  result: ReportResult | null | undefined,
): boolean {
  if (!report || report.status === "failed") return false;
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
