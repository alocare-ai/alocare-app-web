import { bilingual, type BilingualText } from "@/lib/i18n";
import { enrichRecommendation } from "@/lib/recommendation-details";
import { looksEnglish, looksIndonesian } from "@/lib/locale-detect";
import { localizeClinicalEnToId } from "@/lib/localize-summary";
import { resolveDoctorSummaryForLocale } from "@/lib/doctor-summary-locale";
import { extractDocumentText } from "@/lib/report-document";
import { effectiveReportFileCount } from "@/lib/report-summary-framing";
import type { ReportResult } from "@/lib/types/api";

const PLACEHOLDER_PATTERNS = [
  /^results are available for review\.?$/i,
  /^hasil (?:tersedia|siap) untuk ditinjau\.?$/i,
  /^analysis in progress[.…]*$/i,
  /^analisis sedang berlangsung[.…]*$/i,
  /^please review the (?:report|findings)\.?$/i,
];

const HEURISTIC_PATTERNS = [
  /^clinical summary:/i,
  /^ringkasan klinis:/i,
  /this report records/i,
  /laporan ini mencatat/i,
  /values should be interpreted alongside/i,
  /nilai perlu ditafsirkan bersama/i,
  /the report was processed successfully/i,
  /laporan berhasil diproses/i,
  /tinjauan\s+['"]/i,
  /berdasarkan dokumen yang diunggah/i,
  /^cuplikan\s*:\s*$/im,
  /^snippet\s*:\s*$/im,
  /weak below average above average/i,
  /gender[：:]\s*\w+/i,
  /id number[：:]/i,
];

/** Lenient check after a successful analyze stream (allow clinical terms from stress/lab reports). */
export function isUnusableStreamSummary(text: string | null | undefined): boolean {
  const value = text?.trim();
  if (!value) return true;
  if (value.length < 40) return true;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value));
}

export function isPlaceholderClinicalSummary(
  text: string | null | undefined,
): boolean {
  const value = text?.trim();
  if (!value) return true;
  if (value.length < 40) return true;
  if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value))) return true;
  if (HEURISTIC_PATTERNS.some((pattern) => pattern.test(value))) return true;
  if (isFindingsBulletDump(value)) return true;
  if (isGarbledSummary(value)) return true;
  return false;
}

function isFindingsBulletDump(text: string): boolean {
  const lines = text.split("\n").map((l) => l.trim());
  const bulletLines = lines.filter((l) => /^[•\-*]/.test(l));
  return bulletLines.length >= 3;
}

function isGarbledSummary(text: string): boolean {
  if (/:\s*,\s*\.?/.test(text)) return true;
  if (/\b\w\s+psychological stress/i.test(text)) return true;
  const labelCount = (text.match(/(?:Assessment|Resistance|More than|Above)/gi) ?? [])
    .length;
  if (labelCount >= 4 && text.length < 800) return true;
  const fieldColons = (text.match(/[：:]/g) ?? []).length;
  if (fieldColons >= 4 && /monitoring report|airdoc/i.test(text)) return true;
  return false;
}

export function hasMeaningfulClinicalSummary(
  result: ReportResult | null | undefined,
): boolean {
  if (!result) return false;

  const en =
    result.summary_bilingual?.en?.trim() ?? result.summary?.trim() ?? "";
  const id = result.summary_bilingual?.id?.trim() ?? "";

  const hasEn = Boolean(en) && !isPlaceholderClinicalSummary(en);
  const hasId = Boolean(id) && !isPlaceholderClinicalSummary(id);

  return hasEn || hasId;
}

/** Lenient gate after a finished analyze stream (avoids false rejects on rule-based multi-file copy). */
export function hasAcceptableClinicalSummary(
  result: ReportResult | null | undefined,
): boolean {
  if (!result) return false;
  const en =
    result.summary_bilingual?.en?.trim() ?? result.summary?.trim() ?? "";
  const id = result.summary_bilingual?.id?.trim() ?? "";
  return !isUnusableStreamSummary(en) || !isUnusableStreamSummary(id);
}

/** Only AI-backed summaries — no client-side synthesis. */
export function resolveClinicalSummary(result: ReportResult): BilingualText {
  let en =
    result.summary_bilingual?.en?.trim() ?? result.summary?.trim() ?? "";
  let id = result.summary_bilingual?.id?.trim() ?? "";

  if (isUnusableStreamSummary(en)) en = "";
  if (isUnusableStreamSummary(id)) id = "";

  return bilingual(en, id);
}

export function mergeAnalyzeResponseIntoResult(
  result: ReportResult,
  analyze: {
    summary?: string | null;
    summaryBilingual?: BilingualText | null;
    doctorSummary?: string | null;
    nextActions?: string[] | null;
  },
): ReportResult {
  const next = { ...result };

  if (analyze.summaryBilingual) {
    const en = analyze.summaryBilingual.en?.trim() ?? "";
    const id = analyze.summaryBilingual.id?.trim() ?? "";
    if (!isUnusableStreamSummary(en) || !isUnusableStreamSummary(id)) {
      next.summary = en || id;
      next.summary_bilingual = {
        en: isUnusableStreamSummary(en) ? id : en,
        id: isUnusableStreamSummary(id)
          ? looksEnglish(en)
            ? localizeClinicalEnToId(en)
            : en
          : looksEnglish(id) && looksEnglish(en)
            ? localizeClinicalEnToId(en)
            : id,
      };
    }
  } else {
    const summaryText = analyze.summary?.trim();
    if (summaryText && !isUnusableStreamSummary(summaryText)) {
      next.summary = summaryText;
      next.summary_bilingual = {
        en: summaryText,
        id: next.summary_bilingual?.id?.trim() || summaryText,
      };
    }
  }

  const doctorText = analyze.doctorSummary?.trim();
  if (doctorText) {
    const document = extractDocumentText(next);
    const fileCount = effectiveReportFileCount(
      document,
      next.uploaded_files?.length ?? 0,
    );
    const en = looksIndonesian(doctorText)
      ? resolveDoctorSummaryForLocale(
          bilingual("", doctorText),
          "en",
          { documentText: document, fileCount },
        )
      : doctorText;
    const id = resolveDoctorSummaryForLocale(bilingual(en, doctorText), "id", {
      documentText: document,
      fileCount,
    });
    next.doctor_summary = en || id;
    next.doctor_summary_bilingual = { en, id };
  }

  if (analyze.nextActions?.length) {
    next.next_actions = analyze.nextActions;
    next.next_actions_bilingual = {
      en: analyze.nextActions,
      id: analyze.nextActions.map((a) => enrichRecommendation(a, "id").title),
    };
  }

  return next;
}
