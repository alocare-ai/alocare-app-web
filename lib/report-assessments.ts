import {
  parseDoctorSummary,
  type DoctorSummarySection,
} from "@/lib/format-doctor-summary";
import type { StoredKeyFinding } from "@/lib/report-analysis";

export type ReportAssessmentItem = {
  id: string;
  title: string;
  score?: string;
  detail?: string;
};

const ASSESSMENT_NAME_RE =
  /assessment|resilience|resistance|stress|autonomic|balance|activity|score|index/i;

function isUsefulFinding(f: StoredKeyFinding): boolean {
  const name = String(f.name ?? "").trim();
  const value = String(f.value ?? "").trim();
  if (!name || !value || value === ".") return false;
  if (name.length < 8 || name.length > 80) return false;
  if (/^(above|below|more than|of the|moderately)$/i.test(name)) return false;
  if (/^[a-z]/.test(name) && !ASSESSMENT_NAME_RE.test(name)) return false;
  return ASSESSMENT_NAME_RE.test(name) || /^\d{1,3}$/.test(value);
}

function sectionToItem(section: DoctorSummarySection): ReportAssessmentItem | null {
  const title = section.title.trim();
  if (!title) return null;
  return {
    id: `${title}-${section.score ?? ""}`,
    title,
    score: section.score,
    detail: section.description?.trim() || undefined,
  };
}

function findingToItem(f: StoredKeyFinding): ReportAssessmentItem {
  const title = String(f.name ?? "").trim();
  const value = String(f.value ?? "").trim();
  const numericScore = /^\d{1,3}$/.test(value) ? value : undefined;
  return {
    id: title.toLowerCase(),
    title,
    score: numericScore,
    detail: f.referenceRange?.trim() || undefined,
  };
}

export function buildReportAssessments(
  keyFindings: StoredKeyFinding[],
  doctorSummaryText: string,
): ReportAssessmentItem[] {
  const items: ReportAssessmentItem[] = [];
  const seen = new Set<string>();

  for (const f of keyFindings) {
    if (!isUsefulFinding(f)) continue;
    const item = findingToItem(f);
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
  }

  const parsed = parseDoctorSummary(doctorSummaryText);
  if (parsed?.sections.length) {
    for (const section of parsed.sections) {
      const item = sectionToItem(section);
      if (!item) continue;
      const key = item.title.toLowerCase();
      if (seen.has(key)) {
        const existing = items.find((i) => i.title.toLowerCase() === key);
        if (existing && !existing.score && item.score) {
          existing.score = item.score;
        }
        if (existing && !existing.detail && item.detail) {
          existing.detail = item.detail;
        }
        continue;
      }
      seen.add(key);
      items.push(item);
    }
  }

  return items;
}
