import type { Locale } from "@/hooks/use-locale";
import type { ReportFileAnalysis } from "@/lib/types/api";

export type ClinicalSummaryFileSection = {
  id: string;
  title: string;
  body: string;
};

export type ClinicalSummaryDisplay = {
  overview: string;
  fileSections: ClinicalSummaryFileSection[];
};

/** Split combined clinical text into overview prose and `**title**` file blocks. */
export function parseClinicalSummaryParts(text: string): {
  overview: string;
  sections: Array<{ title: string; body: string }>;
} {
  const trimmed = text.trim();
  if (!trimmed) {
    return { overview: "", sections: [] };
  }

  const blockPattern = /(?:^|\n\n)\*\*([^*]+)\*\*\n/g;
  const matches = [...trimmed.matchAll(blockPattern)];
  if (matches.length === 0) {
    return { overview: trimmed, sections: [] };
  }

  const firstIndex = matches[0].index ?? 0;
  const overview = trimmed.slice(0, firstIndex).trim();

  const sections: Array<{ title: string; body: string }> = [];
  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim();
    const bodyStart = (matches[i].index ?? 0) + matches[i][0].length;
    const bodyEnd =
      i + 1 < matches.length
        ? (matches[i + 1].index ?? trimmed.length)
        : trimmed.length;
    const body = trimmed.slice(bodyStart, bodyEnd).trim();
    if (title && body) {
      sections.push({ title, body });
    }
  }

  return { overview, sections };
}

function pickFileAnalysisSummary(
  entry: ReportFileAnalysis,
  locale: Locale,
): string {
  const text =
    locale === "id"
      ? entry.summary.id?.trim() || entry.summary.en?.trim()
      : entry.summary.en?.trim() || entry.summary.id?.trim();
  return text ?? "";
}

function defaultMultiFileOverview(fileCount: number, locale: Locale): string {
  return locale === "id"
    ? `Ringkasan gabungan dari ${fileCount} berkas yang diunggah (lab, wellness, dan dokumen lainnya).`
    : `Combined summary across ${fileCount} uploaded files (labs, wellness screening, and other documents).`;
}

export function buildClinicalSummaryDisplay(
  summaryText: string,
  fileAnalyses: ReportFileAnalysis[] | undefined,
  locale: Locale,
): ClinicalSummaryDisplay {
  const parsed = parseClinicalSummaryParts(summaryText);
  const analyses = fileAnalyses ?? [];

  if (analyses.length > 1) {
    const fileSections: ClinicalSummaryFileSection[] = analyses
      .map((entry) => ({
        id: entry.filename,
        title: entry.filename,
        body: pickFileAnalysisSummary(entry, locale),
      }))
      .filter((section) => section.body.length > 0);

    let overview = parsed.overview;
    if (!overview.trim()) {
      overview = defaultMultiFileOverview(analyses.length, locale);
    }

    return { overview, fileSections };
  }

  if (parsed.sections.length > 1) {
    let overview = parsed.overview;
    if (!overview.trim()) {
      overview =
        locale === "id"
          ? `Ringkasan gabungan dari ${parsed.sections.length} bagian dokumen.`
          : `Combined summary across ${parsed.sections.length} document sections.`;
    }
    return {
      overview,
      fileSections: parsed.sections.map((section, index) => ({
        id: `section-${index}-${section.title}`,
        title: section.title,
        body: section.body,
      })),
    };
  }

  if (parsed.sections.length === 1 && parsed.overview) {
    return {
      overview: parsed.overview,
      fileSections: [
        {
          id: `section-0-${parsed.sections[0].title}`,
          title: parsed.sections[0].title,
          body: parsed.sections[0].body,
        },
      ],
    };
  }

  return {
    overview: parsed.overview || summaryText,
    fileSections: [],
  };
}

/** Whether to show collapsible per-file (or per-section) details below the overview. */
export function shouldShowClinicalFileDetails(
  display: ClinicalSummaryDisplay,
): boolean {
  return display.fileSections.length > 1;
}
