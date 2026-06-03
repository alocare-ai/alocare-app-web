import type { AnalyzeStreamEvent, AnalyzeStreamStep } from "@/lib/api/analyze-stream";
import type { Locale } from "@/lib/i18n";

export type AiAnalysisPhaseId =
  | "session"
  | "context"
  | "sections"
  | "terminology"
  | "labs"
  | "vitals"
  | "entities"
  | "correlate"
  | "narrative"
  | "physician"
  | "recommendations"
  | "patient_note"
  | "bilingual_en"
  | "bilingual_id"
  | "findings_list"
  | "risk"
  | "confidence"
  | "validate"
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
    id: "sections",
    en: "Parsing report sections and file boundaries",
    idLabel: "Mengurai bagian laporan dan batas berkas",
  },
  {
    id: "terminology",
    en: "Normalizing medical terms and units",
    idLabel: "Menormalkan istilah dan satuan medis",
  },
  {
    id: "labs",
    en: "Extracting laboratory values and reference ranges",
    idLabel: "Mengekstrak nilai laboratorium dan rentang referensi",
  },
  {
    id: "vitals",
    en: "Reviewing vitals and screening scores",
    idLabel: "Meninjau tanda vital dan skor skrining",
  },
  {
    id: "entities",
    en: "Identifying key clinical findings",
    idLabel: "Mengidentifikasi temuan klinis utama",
  },
  {
    id: "correlate",
    en: "Correlating abnormal results across files",
    idLabel: "Mengkorelasikan hasil abnormal antar berkas",
  },
  {
    id: "narrative",
    en: "Drafting clinical summary for clinicians",
    idLabel: "Menyusun ringkasan klinis untuk klinisi",
  },
  {
    id: "physician",
    en: "Preparing physician summary highlights",
    idLabel: "Menyiapkan sorotan ringkasan untuk dokter",
  },
  {
    id: "recommendations",
    en: "Preparing doctor summary and care recommendations",
    idLabel: "Menyiapkan ringkasan dokter dan rekomendasi perawatan",
  },
  {
    id: "patient_note",
    en: "Drafting patient-friendly explanation",
    idLabel: "Menyusun penjelasan yang mudah dipahami pasien",
  },
  {
    id: "bilingual_en",
    en: "Generating English clinical narrative",
    idLabel: "Menghasilkan narasi klinis bahasa Inggris",
  },
  {
    id: "bilingual_id",
    en: "Generating Indonesian clinical narrative",
    idLabel: "Menghasilkan narasi klinis bahasa Indonesia",
  },
  {
    id: "findings_list",
    en: "Structuring key findings for clinician review",
    idLabel: "Menyusun temuan utama untuk tinjauan klinisi",
  },
  {
    id: "risk",
    en: "Assessing clinical risk indicators",
    idLabel: "Menilai indikator risiko klinis",
  },
  {
    id: "confidence",
    en: "Calculating confidence score and risk indicator",
    idLabel: "Menghitung skor kepercayaan dan indikator risiko",
  },
  {
    id: "validate",
    en: "Validating and formatting AI output",
    idLabel: "Memvalidasi dan memformat keluaran AI",
  },
  {
    id: "saving",
    en: "Saving analysis results to your report",
    idLabel: "Menyimpan hasil analisis ke laporan Anda",
  },
];

const GENERATING_PHASE_START = 8;
const GENERATING_PHASE_END = 16;

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

export function phaseIndexFromAnalyzeStep(
  step: AnalyzeStreamStep,
  serverProgress = 0,
): number {
  const last = BASE_AI_PHASES.length - 1;
  switch (step) {
    case "started":
      return 0;
    case "entities":
      return 6;
    case "generating": {
      const p = Math.max(32, Math.min(88, serverProgress || 32));
      const ratio = (p - 32) / (88 - 32);
      return Math.round(
        GENERATING_PHASE_START +
          ratio * (GENERATING_PHASE_END - GENERATING_PHASE_START),
      );
    }
    case "parsing":
      return 17;
    case "complete":
      return last;
    case "error":
      return 0;
    default:
      return 0;
  }
}

export function analyzeStreamEventToProgress(
  event: AnalyzeStreamEvent,
  locale: Locale,
  contentLength = 0,
): AiAnalysisProgressState {
  const phaseIndex = phaseIndexFromAnalyzeStep(event.step, event.progress ?? 0);
  const phase = BASE_AI_PHASES[phaseIndex] ?? BASE_AI_PHASES[0];
  const detail =
    event.message?.trim() ||
    buildAiProgressDetail(phase, locale, contentLength);

  const serverPct = event.progress ?? 0;
  const progress =
    event.step === "complete"
      ? 92
      : analyzingProgressFromServer(serverPct, phaseIndex);

  return {
    phaseIndex,
    phases: BASE_AI_PHASES,
    detail,
    progress,
  };
}

export type AiAnalysisProgressCallback = (state: AiAnalysisProgressState) => void;

/** Gradually advance substeps while the analyze stream runs (never moves backward). */
export function createAiAnalysisProgressController(
  locale: Locale,
  onProgress: AiAnalysisProgressCallback,
  options?: { contentLength?: number; creepIntervalMs?: number },
): {
  fromEvent: (event: AnalyzeStreamEvent) => void;
  finish: () => void;
  stop: () => void;
} {
  const phases = BASE_AI_PHASES;
  const charCount = options?.contentLength ?? 0;
  let highWater = 0;

  const emit = (index: number, detail?: string) => {
    const clamped = Math.min(Math.max(index, 0), phases.length - 1);
    if (clamped < highWater) return;
    highWater = clamped;
    const phase = phases[highWater];
    onProgress({
      phaseIndex: highWater,
      phases,
      detail: detail ?? buildAiProgressDetail(phase, locale, charCount),
      progress: analyzingProgress(highWater, phases.length),
    });
  };

  emit(0);

  const creepIntervalMs = options?.creepIntervalMs ?? 2800;
  const timer = setInterval(() => {
    if (highWater < phases.length - 2) {
      emit(highWater + 1);
    }
  }, creepIntervalMs);

  return {
    fromEvent: (event) => {
      const idx = phaseIndexFromAnalyzeStep(event.step, event.progress ?? 0);
      const detail =
        event.message?.trim() ||
        buildAiProgressDetail(
          phases[idx] ?? phases[0],
          locale,
          charCount,
        );
      const merged = Math.max(highWater, idx);
      emit(merged, detail);
      if (event.step === "complete") {
        emit(phases.length - 1, detail);
      }
    },
    finish: () => emit(phases.length - 1),
    stop: () => clearInterval(timer),
  };
}

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

  const stagger = 2200;
  for (let i = 1; i < phases.length - 1; i++) {
    schedule(stagger * i, i);
  }

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
