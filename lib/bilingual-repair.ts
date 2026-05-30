import { bilingual, type BilingualText } from "@/lib/i18n";
import {
  looksEnglish,
  looksIndonesian,
  needsLocalizationToId,
} from "@/lib/locale-detect";
import {
  isDoctorBriefWithOcrExcerpt,
  isGenericLabClinicalTemplate,
  localizeClinicalEnToId,
  localizeDoctorEnToId,
} from "@/lib/localize-summary";
import { isPlaceholderClinicalSummary } from "@/lib/clinical-summary";
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

function shouldUseEnClinicalForId(en: string, id: string): boolean {
  if (!en.trim()) return false;
  if (!id.trim()) return true;
  if (looksEnglish(id)) return true;
  if (en === id) return true;
  if (isGenericLabClinicalTemplate(id)) return true;
  if (isDoctorBriefWithOcrExcerpt(id)) return true;
  return false;
}

function shouldUseEnDoctorForId(en: string, id: string): boolean {
  if (!en.trim()) return false;
  if (!id.trim()) return true;
  if (en === id) return true;
  if (needsLocalizationToId(id)) return true;
  if (looksEnglish(id)) return true;
  if (isRawOcrDump(id)) return true;
  if (isDoctorBriefWithOcrExcerpt(id)) return true;
  if (isGenericLabClinicalTemplate(id)) return true;
  return false;
}

/** Fix ID slots that were assigned the wrong summary type. */
function fixSwappedIndonesianSlots(
  summary: BilingualText,
  doctor: BilingualText,
): { summary: BilingualText; doctor: BilingualText } {
  const idClinical = summary.id?.trim() ?? "";
  const idDoctor = doctor.id?.trim() ?? "";
  if (!idClinical || !idDoctor) {
    return { summary, doctor };
  }

  const clinicalLooksLikeDoctor =
    isDoctorBriefWithOcrExcerpt(idClinical) || isRawOcrDump(idClinical);
  const doctorLooksLikeClinical =
    isGenericLabClinicalTemplate(idDoctor) ||
    (idDoctor.length > 400 && !isDoctorBriefWithOcrExcerpt(idDoctor));

  if (clinicalLooksLikeDoctor && doctorLooksLikeClinical) {
    return {
      summary: bilingual(summary.en ?? "", idDoctor),
      doctor: bilingual(doctor.en ?? "", idClinical),
    };
  }
  return { summary, doctor };
}

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

  if (
    shouldUseEnClinicalForId(en, id) &&
    looksEnglish(en) &&
    !isPlaceholderClinicalSummary(en)
  ) {
    id = localizeClinicalEnToId(en);
  } else if (!id || looksEnglish(id) || (en && id === en)) {
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

  if (
    en &&
    looksEnglish(en) &&
    !isRawOcrDump(en) &&
    (!id || shouldUseEnDoctorForId(en, id))
  ) {
    return bilingual(en, localizeDoctorEnToId(en));
  }

  if (!document.trim()) {
    if (id && needsLocalizationToId(id)) {
      return bilingual(en || id, localizeDoctorEnToId(en || id));
    }
    return doctor;
  }

  const clinicalEn = clinical.en?.trim() ?? "";

  const fix = (value: string, locale: "en" | "id", clinicalText: string): string => {
    if (locale === "en") {
      if (
        !value ||
        isRawOcrDump(value) ||
        (clinicalText && isNearDuplicateSummary(value, clinicalText))
      ) {
        return buildDoctorSummaryFromDocument(document, "en");
      }
      return value;
    }

    const enDoctor = doctor.en?.trim() ?? "";
    if (
      shouldUseEnDoctorForId(enDoctor, value) &&
      enDoctor &&
      looksEnglish(enDoctor) &&
      !isRawOcrDump(enDoctor)
    ) {
      return localizeDoctorEnToId(enDoctor);
    }

    if (
      !value ||
      isRawOcrDump(value) ||
      isDoctorBriefWithOcrExcerpt(value) ||
      isGenericLabClinicalTemplate(value) ||
      (clinicalText && isNearDuplicateSummary(value, clinicalText))
    ) {
      if (
        clinicalEn &&
        looksEnglish(clinicalEn) &&
        !isNearDuplicateSummary(clinicalEn, clinicalText)
      ) {
        return buildDoctorSummaryFromDocument(document, "id");
      }
      return buildDoctorSummaryFromDocument(document, "id");
    }

    if (looksEnglish(value) || needsLocalizationToId(value)) {
      return localizeDoctorEnToId(enDoctor || value);
    }
    return value;
  };

  en = fix(en, "en", clinical.en?.trim() ?? "");
  id = fix(id, "id", clinical.id?.trim() ?? "");

  if (!en && id && looksIndonesian(id)) {
    en = buildDoctorSummaryFromDocument(document, "en");
  }
  if (!id && en && looksEnglish(en)) {
    id = localizeDoctorEnToId(en);
  }

  return bilingual(en, id);
}

export function repairAnalysisFromResult(
  summary: BilingualText,
  doctor: BilingualText,
  result: ReportResult,
): { summary: BilingualText; doctor: BilingualText } {
  const document = extractDocumentText(result);
  if (!document) {
    return fixSwappedIndonesianSlots(summary, doctor);
  }

  const swapped = fixSwappedIndonesianSlots(summary, doctor);
  const fixedSummary = repairClinicalSummary(swapped.summary, document);
  const fixedDoctor = repairDoctorSummary(swapped.doctor, fixedSummary, document);
  return fixSwappedIndonesianSlots(fixedSummary, fixedDoctor);
}
