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
import { resolveDoctorSummaryForLocale } from "@/lib/doctor-summary-locale";
import {
  buildClinicalFromPatientIdentity,
  buildHospitalLabNarrative,
  buildUnifiedHospitalClinicalOverview,
  buildUnifiedHospitalDoctorSummary,
  isGenericDoctorSummaryPlaceholder,
  isGenericHospitalClinicalOverview,
  isHospitalLabReport,
  isMessyMultiFileDoctorSummary,
  isWeakDoctorSummary,
} from "@/lib/hospital-lab-narrative";
import { splitDocumentSections } from "@/lib/document-sections";
import {
  buildClinicalNarrativeFromDocument,
  buildDoctorSummaryFromDocument,
} from "@/lib/report-narrative-fallback";
import {
  buildClinicalNarrativeFromFileAnalyses,
  countUploadedFilesFromResult,
  effectiveReportFileCount,
  shouldRebuildMultiFileClinicalSummary,
} from "@/lib/report-summary-framing";
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

function rebuildClinicalForLocale(
  locale: "en" | "id",
  document: string,
  fileCount: number,
  result?: ReportResult,
): string {
  const identity = result?.patient_identity ?? result?.patientIdentity ?? null;
  const fromAnalyses =
    result?.file_analyses?.length &&
    fileCount > 1 &&
    !(document.trim() && isHospitalLabReport(document))
      ? buildClinicalNarrativeFromFileAnalyses(result.file_analyses, locale)
      : null;
  if (fromAnalyses) return fromAnalyses;
  if (document.trim() && isHospitalLabReport(document)) {
    if (splitDocumentSections(document).length > 1) {
      return buildUnifiedHospitalClinicalOverview(document, locale, identity);
    }
    return buildHospitalLabNarrative(document, locale, identity);
  }
  if (document.trim()) {
    return buildClinicalNarrativeFromDocument(document, locale, fileCount, identity);
  }
  if (identity?.name?.trim()) {
    return buildClinicalFromPatientIdentity(identity, locale) ?? "";
  }
  return "";
}

export function repairClinicalSummary(
  summary: BilingualText,
  document: string,
  result?: ReportResult,
): BilingualText {
  let en = summary.en?.trim() ?? "";
  let id = summary.id?.trim() ?? "";

  if (!document.trim() && !result?.file_analyses?.length) {
    const identity = result?.patient_identity ?? result?.patientIdentity ?? null;
    if (identity?.name?.trim()) {
      const fromIdentityEn =
        buildClinicalFromPatientIdentity(identity, "en") ?? "";
      const fromIdentityId =
        buildClinicalFromPatientIdentity(identity, "id") ?? "";
      if (
        isPlaceholderClinicalSummary(en) ||
        isPlaceholderClinicalSummary(id)
      ) {
        return bilingual(
          isPlaceholderClinicalSummary(en) ? fromIdentityEn || en : en,
          isPlaceholderClinicalSummary(id) ? fromIdentityId || id : id,
        );
      }
    }
    if (en && !id && looksIndonesian(en)) return bilingual("", en);
    if (id && !en && looksEnglish(id)) return bilingual(id, "");
    return summary;
  }

  const uploadedCount = countUploadedFilesFromResult(result);
  const fileCount = effectiveReportFileCount(document, uploadedCount);
  const needsMultiRebuild =
    fileCount > 1 &&
    (shouldRebuildMultiFileClinicalSummary(en, document, uploadedCount) ||
      shouldRebuildMultiFileClinicalSummary(id, document, uploadedCount));

  if (
    !en ||
    looksIndonesian(en) ||
    needsMultiRebuild ||
    isPlaceholderClinicalSummary(en) ||
    isGenericHospitalClinicalOverview(en)
  ) {
    en = rebuildClinicalForLocale("en", document, fileCount, result);
  }

  if (
    shouldUseEnClinicalForId(en, id) &&
    looksEnglish(en) &&
    !isPlaceholderClinicalSummary(en) &&
    !needsMultiRebuild &&
    !isGenericHospitalClinicalOverview(en)
  ) {
    id = localizeClinicalEnToId(en);
  } else if (
    !id ||
    looksEnglish(id) ||
    (en && id === en) ||
    needsMultiRebuild ||
    isPlaceholderClinicalSummary(id) ||
    isGenericHospitalClinicalOverview(id)
  ) {
    id = rebuildClinicalForLocale("id", document, fileCount, result);
  }

  if (isPlaceholderClinicalSummary(en) && result?.patient_identity?.name) {
    en =
      buildClinicalFromPatientIdentity(result.patient_identity, "en") ?? en;
  }
  if (isPlaceholderClinicalSummary(id) && result?.patient_identity?.name) {
    id =
      buildClinicalFromPatientIdentity(result.patient_identity, "id") ?? id;
  }

  if (isGenericHospitalClinicalOverview(en) && document.trim()) {
    en = rebuildClinicalForLocale("en", document, fileCount, result);
  }
  if (isGenericHospitalClinicalOverview(id) && document.trim()) {
    id = rebuildClinicalForLocale("id", document, fileCount, result);
  }

  return bilingual(en, id);
}

export function repairDoctorSummary(
  doctor: BilingualText,
  clinical: BilingualText,
  document: string,
  result?: ReportResult,
): BilingualText {
  let en = doctor.en?.trim() ?? "";
  let id = doctor.id?.trim() ?? "";
  const fileCount = effectiveReportFileCount(
    document,
    result?.uploaded_files?.length ?? 0,
  );
  const identity = result?.patient_identity ?? result?.patientIdentity ?? null;
  const storedEngine = result?.analysis_engine ?? result?.analysisEngine;
  const hasGoodAiDoctor =
    storedEngine === "ai" &&
    en &&
    !isWeakDoctorSummary(en) &&
    !isGenericDoctorSummaryPlaceholder(en) &&
    !isMessyMultiFileDoctorSummary(en);

  if (!document.trim()) {
    if (en && looksEnglish(en)) {
      id = resolveDoctorSummaryForLocale(bilingual(en, id), "id");
    } else if (id && needsLocalizationToId(id)) {
      id = localizeDoctorEnToId(en || id);
    }
    return bilingual(en || id, id || localizeDoctorEnToId(en));
  }

  if (hasGoodAiDoctor) {
    id = resolveDoctorSummaryForLocale(bilingual(en, id), "id", {
      documentText: document,
      fileCount,
    });
    return bilingual(en, id);
  }

  const shouldRebuild =
    !en ||
    isRawOcrDump(en) ||
    isGenericDoctorSummaryPlaceholder(en) ||
    isWeakDoctorSummary(en) ||
    isMessyMultiFileDoctorSummary(en) ||
    (clinical.en?.trim() && isNearDuplicateSummary(en, clinical.en.trim()));

  if (shouldRebuild) {
    if (document.trim() && isHospitalLabReport(document)) {
      en = buildUnifiedHospitalDoctorSummary(document, "en", identity);
    } else {
      en = buildDoctorSummaryFromDocument(document, "en", fileCount);
    }
  }

  id = resolveDoctorSummaryForLocale(bilingual(en, id), "id", {
    documentText: document,
    fileCount,
  });

  if (!en && id) {
    en = resolveDoctorSummaryForLocale(bilingual("", id), "en", {
      documentText: document,
      fileCount,
    });
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
  const fixedSummary = repairClinicalSummary(swapped.summary, document, result);
  const fixedDoctor = repairDoctorSummary(
    swapped.doctor,
    fixedSummary,
    document,
    result,
  );
  return fixSwappedIndonesianSlots(fixedSummary, fixedDoctor);
}
