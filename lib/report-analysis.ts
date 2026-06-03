import { bilingual, type BilingualText } from "@alocare/design-system";
import {
  hasMeaningfulClinicalSummary,
  resolveClinicalSummary,
} from "@/lib/clinical-summary";
import { repairAnalysisFromResult } from "@/lib/bilingual-repair";
import { enrichRecommendation } from "@/lib/recommendation-details";
import {
  looksEnglish,
  needsLocalizationToId,
} from "@/lib/locale-detect";
import type { Locale } from "@/hooks/use-locale";
import type { ReportResult } from "@/lib/types/api";

export type StoredKeyFinding = {
  name: string;
  value: string;
  status: string;
  referenceRange?: string | null;
};

export type ParsedReportAnalysis = {
  summary: BilingualText;
  doctorSummary: BilingualText;
  nextActions: { en: string[]; id: string[] };
  keyFindings: StoredKeyFinding[];
  confidenceScore: number | null;
  riskIndicator: "low" | "medium" | "high" | null;
  limitedAnalysis: boolean;
};

function asBilingual(
  en: string | null | undefined,
  id: string | null | undefined,
): BilingualText {
  return bilingual(en?.trim() || "", id?.trim() || en?.trim() || "");
}

function normalizeRisk(
  value: string | null | undefined,
): "low" | "medium" | "high" | null {
  if (!value) return null;
  const v = value.toLowerCase();
  if (v.includes("high") || v === "critical") return "high";
  if (v.includes("medium") || v.includes("review")) return "medium";
  if (v.includes("low")) return "low";
  return "medium";
}

export function parseReportResult(result: ReportResult): ParsedReportAnalysis {
  const progress = bilingual(
    "Analysis in progress…",
    "Analisis sedang berlangsung…",
  );

  if (result.summary_bilingual || result.summary?.trim()) {
    const summary = resolveClinicalSummary(result);
    const doctorSummary =
      result.doctor_summary_bilingual ?? bilingual("", "");
    const repaired = repairAnalysisFromResult(summary, doctorSummary, result);
    const limitedAnalysis =
      !hasMeaningfulClinicalSummary(result) &&
      (result.key_findings?.length ?? 0) > 0 &&
      (result.confidence_score ?? 1) <= 0.5;

    return {
      summary: repaired.summary,
      doctorSummary: repaired.doctor,
      nextActions: result.next_actions_bilingual ?? {
        en: result.next_actions,
        id: result.next_actions.map((a) => enrichRecommendation(a, "id").title),
      },
      keyFindings: (result.key_findings ?? []).map((f) => ({
        name: f.name,
        value: f.value,
        status: f.status,
        referenceRange: f.reference_range,
      })),
      confidenceScore:
        typeof result.confidence_score === "number"
          ? result.confidence_score
          : null,
      riskIndicator: normalizeRisk(result.risk_indicator),
      limitedAnalysis,
    };
  }

  const doctorText = result.doctor_summary?.trim();
  const resolved = resolveClinicalSummary(result);
  const hasResolvedText = Boolean(
    resolved.en?.trim() || resolved.id?.trim(),
  );

  return {
    summary: hasResolvedText ? resolved : progress,
    doctorSummary: doctorText
      ? asBilingual(doctorText, doctorText)
      : bilingual("", ""),
    nextActions: {
      en: result.next_actions,
      id: result.next_actions.map((a) => enrichRecommendation(a, "id").title),
    },
    keyFindings: (result.key_findings ?? []).map((f) => ({
      name: f.name,
      value: f.value,
      status: f.status,
      referenceRange: f.reference_range,
    })),
    confidenceScore: hasResolvedText ? 0.75 : null,
    riskIndicator: hasResolvedText ? "medium" : null,
    limitedAnalysis: false,
  };
}

export function confidenceDescription(
  locale: Locale,
  limited: boolean,
): string | undefined {
  if (limited) {
    return locale === "id"
      ? "Analisis terbatas — unggah laporan berbasis teks untuk hasil lengkap"
      : "Limited analysis — upload a text-based report for full results";
  }
  return undefined;
}

export function pickLocaleText(text: BilingualText, locale: Locale): string {
  const value = text[locale]?.trim();
  if (value) return value;
  return text.en?.trim() || text.id?.trim() || "";
}

export { pickDoctorSummaryText, resolveDoctorSummaryForLocale } from "@/lib/doctor-summary-locale";

export function mapKeyFindings(
  findings: StoredKeyFinding[],
): {
  label: string;
  value: string;
  status: "normal" | "low" | "high" | "critical";
}[] {
  if (findings.length === 0) return [];

  return findings.map((f) => ({
    label: f.name,
    value: f.value,
    status:
      f.status === "critical"
        ? "critical"
        : f.status === "low"
          ? "low"
          : f.status === "high"
            ? "high"
            : "normal",
  }));
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

export async function readReportFilesContent(files: File[]): Promise<string> {
  const parts = await Promise.all(
    files.map(async (file) => {
      const text = await readReportFileContent(file);
      return text.trim() ? `--- ${file.name} ---\n${text.trim()}` : "";
    }),
  );
  return parts.filter(Boolean).join("\n\n");
}

export async function readReportFileContent(file: File): Promise<string> {
  const textLike =
    file.type.startsWith("text/") ||
    /\.(txt|csv|json|md)$/i.test(file.name);

  if (textLike) {
    try {
      return await file.text();
    } catch {
      /* fall through */
    }
  }

  const isImage = file.type.startsWith("image/");

  const base = [
    `File name: ${file.name}`,
    `MIME type: ${file.type || "unknown"}`,
    `Size: ${file.size} bytes`,
    isImage ? "Content kind: image (OCR not applied)" : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!isImage && file.size > 0 && file.size <= 512_000) {
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer.slice(0, 4000));
      const preview = Array.from(bytes)
        .map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : " "))
        .join("")
        .replace(/\s+/g, " ")
        .trim();
      if (preview.length > 40) {
        return `${base}\n\nExtracted text preview:\n${preview}`;
      }
    } catch {
      /* ignore */
    }
  }

  return base;
}
