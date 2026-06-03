import type { BilingualText } from "@/lib/i18n";
import type { Locale } from "@/hooks/use-locale";
import {
  looksEnglish,
  looksIndonesian,
  needsLocalizationToId,
} from "@/lib/locale-detect";
import { localizeDoctorEnToId } from "@/lib/localize-summary";
import { buildDoctorSummaryFromDocument } from "@/lib/report-narrative-fallback";

/** Resolve doctor summary for UI — builds Indonesian from OCR when stored ID is English. */
export function resolveDoctorSummaryForLocale(
  text: BilingualText,
  locale: Locale,
  options?: { documentText?: string; fileCount?: number },
): string {
  const en = text.en?.trim() ?? "";
  const id = text.id?.trim() ?? "";
  const document = options?.documentText?.trim() ?? "";
  const fileCount = Math.max(options?.fileCount ?? 1, 1);

  if (locale === "en") {
    return en || id;
  }

  const idLooksIndonesian =
    Boolean(id) &&
    !looksEnglish(id) &&
    !needsLocalizationToId(id) &&
    (looksIndonesian(id) || (en && id !== en && !looksEnglish(id)));

  if (idLooksIndonesian) {
    return id;
  }

  if (document) {
    const built = buildDoctorSummaryFromDocument(document, "id", fileCount);
    if (built.trim() && (!en || looksEnglish(en) || needsLocalizationToId(id))) {
      return built;
    }
  }

  const source = en || id;
  if (!source) return "";

  const localized = localizeDoctorEnToId(source);
  if (
    document &&
    (looksEnglish(localized) || needsLocalizationToId(localized))
  ) {
    const built = buildDoctorSummaryFromDocument(document, "id", fileCount);
    if (built.trim()) return built;
  }
  return localized;
}

export function pickDoctorSummaryText(
  text: BilingualText,
  locale: Locale,
  documentText?: string,
  fileCount?: number,
): string {
  return resolveDoctorSummaryForLocale(text, locale, {
    documentText,
    fileCount,
  });
}
