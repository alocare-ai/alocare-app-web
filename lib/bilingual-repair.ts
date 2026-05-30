import { bilingual, type BilingualText } from "@/lib/i18n";
import { looksEnglish, looksIndonesian } from "@/lib/locale-detect";
import {
  buildClinicalNarrativeFromDocument,
  buildDoctorSummaryFromDocument,
} from "@/lib/report-narrative-fallback";
import {
  extractDocumentText,
  isNearDuplicateSummary,
  isRawOcrDump,
} from "@/lib/report-document";
import type { ReportResult } from "@/lib/types/api";

export function repairClinicalSummary(
  summary: BilingualText,
  document: string,
): BilingualText {
  let en = summary.en?.trim() ?? "";
  let id = summary.id?.trim() ?? "";

  if (!document.trim()) {
    if (en && !id && looksIndonesian(en)) return bilingual("", en);
    if (id && !en && looksEnglish(id)) return bilingual(id, "");
    return summary;
  }

  if (!en || looksIndonesian(en)) {
    en = buildClinicalNarrativeFromDocument(document, "en");
  }
  if (!id || looksEnglish(id) || (en && id === en)) {
    id = buildClinicalNarrativeFromDocument(document, "id");
  }

  return bilingual(en, id);
}

export function repairDoctorSummary(
  doctor: BilingualText,
  clinical: BilingualText,
  document: string,
): BilingualText {
  let en = doctor.en?.trim() ?? "";
  let id = doctor.id?.trim() ?? "";

  if (!document.trim()) {
    return doctor;
  }

  const fix = (value: string, locale: "en" | "id", clinicalText: string): string => {
    if (
      !value ||
      isRawOcrDump(value) ||
      isNearDuplicateSummary(value, clinicalText)
    ) {
      return buildDoctorSummaryFromDocument(document, locale);
    }
    if (locale === "id" && looksEnglish(value)) {
      return buildDoctorSummaryFromDocument(document, "id");
    }
    if (locale === "en" && looksIndonesian(value) && !looksEnglish(value)) {
      return buildDoctorSummaryFromDocument(document, "en");
    }
    return value;
  };

  en = fix(en, "en", clinical.en?.trim() ?? "");
  id = fix(id, "id", clinical.id?.trim() ?? "");

  if (!en && id) en = buildDoctorSummaryFromDocument(document, "en");
  if (!id && en) id = buildDoctorSummaryFromDocument(document, "id");

  return bilingual(en, id);
}

export function repairAnalysisFromResult(
  summary: BilingualText,
  doctor: BilingualText,
  result: ReportResult,
): { summary: BilingualText; doctor: BilingualText } {
  const document = extractDocumentText(result);
  if (!document) {
    return { summary, doctor };
  }
  const fixedSummary = repairClinicalSummary(summary, document);
  const fixedDoctor = repairDoctorSummary(doctor, fixedSummary, document);
  return { summary: fixedSummary, doctor: fixedDoctor };
}
