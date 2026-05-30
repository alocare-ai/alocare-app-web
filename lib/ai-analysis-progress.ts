import type { Locale } from "@/lib/i18n";

export type AiAnalysisPhaseId =
  | "session"
  | "context"
  | "findings"
  | "summary"
  | "doctor"
  | "bilingual"
  | "scoring"
  | "saving";

export type AiAnalysisPhase = {
  id: AiAnalysisPhaseId;
  en: string;
  idLabel: string;
};

export const BASE_AI_PHASES: AiAnalysisPhase[] = [
  {
    id: "session",
    en: "Creating secure AI session",
    idLabel: "Membuat sesi AI yang aman",
  },
  {
    id: "context",
    en: "Reviewing extracted report text",
    idLabel: "Meninjau teks laporan yang diekstrak",
  },
  {
    id: "findings",
    en: "Identifying key clinical findings",
    idLabel: "Mengidentifikasi temuan klinis utama",
  },
  {
    id: "summary",
    en: "Drafting clinical summary for clinicians",
    idLabel: "Menyusun ringkasan klinis untuk klinisi",
  },
  {
    id: "doctor",
    en: "Preparing doctor summary and care recommendations",
    idLabel: "Menyiapkan ringkasan dokter dan rekomendasi perawatan",
  },
  {
    id: "bilingual",
    en: "Generating English and Indonesian summaries",
    idLabel: "Menghasilkan ringkasan bahasa Inggris dan Indonesia",
  },
  {
    id: "scoring",
    en: "Calculating confidence score and risk indicator",
    idLabel: "Menghitung skor kepercayaan dan indikator risiko",
  },
  {
    id: "saving",
    en: "Saving analysis results to your report",
    idLabel: "Menyimpan hasil analisis ke laporan Anda",
  },
];

export type AiAnalysisProgressState = {
  phaseIndex: number;
  phases: AiAnalysisPhase[];
  detail: string;
  progress: number;
};

export function phaseLabel(phase: AiAnalysisPhase, locale: Locale): string {
  return locale === "id" ? phase.idLabel : phase.en;
}

function contextDetail(locale: Locale, charCount: number): string {
  const formatted = charCount.toLocaleString(locale === "id" ? "id-ID" : "en-US");
  return locale === "id"
    ? `Meninjau ${formatted} karakter teks laporan`
    : `Reviewing ${formatted} characters of report text`;
}

export function buildAiProgressDetail(
  phase: AiAnalysisPhase,
  locale: Locale,
  charCount?: number,
): string {
  if (phase.id === "context" && charCount != null && charCount > 0) {
    return contextDetail(locale, charCount);
  }
  return phaseLabel(phase, locale);
}

function analyzingProgress(phaseIndex: number, total: number): number {
  const start = 60;
  const end = 92;
  const ratio = total <= 1 ? 1 : phaseIndex / (total - 1);
  return Math.round(start + ratio * (end - start));
}

/** Map backend stream progress (0–100) into the upload modal analyzing band (60–92). */
export function analyzingProgressFromServer(
  serverProgress: number,
  phaseIndex: number,
): number {
  const fromPhase = analyzingProgress(phaseIndex, BASE_AI_PHASES.length);
  const fromServer = 60 + Math.min(32, Math.max(0, serverProgress) * 0.32);
  return Math.round(Math.max(fromPhase, fromServer));
}

export type AiAnalysisProgressCallback = (state: AiAnalysisProgressState) => void;

export async function runWithAiAnalysisProgress<T>(
  locale: Locale,
  onProgress: AiAnalysisProgressCallback,
  work: (advance: (phaseId: AiAnalysisPhaseId) => void) => Promise<T>,
  options?: { contentLength?: number },
): Promise<T> {
  const phases = BASE_AI_PHASES;
  const charCount = options?.contentLength ?? 0;
  let phaseIndex = 0;

  const emit = (index: number, phaseOverride?: AiAnalysisPhase) => {
    phaseIndex = index;
    const phase = phaseOverride ?? phases[index] ?? phases[phases.length - 1];
    onProgress({
      phaseIndex: index,
      phases,
      detail: buildAiProgressDetail(phase, locale, charCount),
      progress: analyzingProgress(index, phases.length),
    });
  };

  const advance = (phaseId: AiAnalysisPhaseId) => {
    const idx = phases.findIndex((p) => p.id === phaseId);
    if (idx >= 0) emit(idx);
  };

  emit(0);

  const timers: ReturnType<typeof setTimeout>[] = [];
  const schedule = (delayMs: number, index: number) => {
    timers.push(
      setTimeout(() => {
        if (index > phaseIndex && index < phases.length - 1) {
          emit(index);
        }
      }, delayMs),
    );
  };

  schedule(800, 1);
  schedule(2400, 2);
  schedule(4200, 3);
  schedule(6000, 4);
  schedule(7800, 5);
  schedule(9600, 6);

  try {
    const result = await work(advance);
    timers.forEach(clearTimeout);
    emit(phases.length - 1);
    return result;
  } catch (error) {
    timers.forEach(clearTimeout);
    throw error;
  }
}

export function getAiPhaseStatuses(
  phases: AiAnalysisPhase[],
  activeIndex: number,
  locale: Locale,
): { label: string; status: "done" | "active" | "pending" }[] {
  return phases.map((phase, i) => ({
    label: phaseLabel(phase, locale),
    status:
      i < activeIndex ? "done" : i === activeIndex ? "active" : "pending",
  }));
}
