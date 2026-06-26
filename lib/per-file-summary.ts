import { generateClinicalSummaryFromAI } from "@/lib/clinical-summary-ai";
import { splitDocumentSections } from "@/lib/document-sections";
import type { Locale } from "@/lib/i18n";
import type { Report, ReportFileAnalysis, ReportResult } from "@/lib/types/api";

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  }

  const workers = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

export async function generatePerFileSummaries(params: {
  report: Report;
  reportId: string;
  locale: Locale;
  documentText: string;
  sizeByFilename: Map<string, number>;
}): Promise<ReportFileAnalysis[]> {
  const sections = splitDocumentSections(params.documentText);
  if (sections.length <= 1) {
    return [];
  }

  return mapWithConcurrency(sections, 2, async (section) => {
    const { summary } = await generateClinicalSummaryFromAI({
      report: params.report,
      reportId: params.reportId,
      locale: params.locale,
      documentText: section.text,
      result: {
        id: params.reportId,
        status: params.report.status,
        summary: null,
        doctor_summary: section.text,
        next_actions: [],
      } satisfies ReportResult,
    });

    return {
      filename: section.filename,
      size_bytes: params.sizeByFilename.get(section.filename) ?? 0,
      char_count: section.text.length,
      extract_preview: section.text.slice(0, 500),
      ocr_text: section.text.slice(0, 24_000),
      summary: { en: summary.en, id: summary.id },
      key_findings: [],
    };
  });
}
