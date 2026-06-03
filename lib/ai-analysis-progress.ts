import type { AnalyzeStreamEvent, AnalyzeStreamStep } from "@/lib/api/analyze-stream";
import type { Locale } from "@/lib/i18n";
import type { ReportPipelineStep } from "@/lib/report-pipeline";

export type AiPipelineStage = "prep" | "generating" | "saving";

export type AiAnalysisPhaseId =
  | "session"
  | "context"
  | "sections"
  | "terminology"
  | "labs"
  | "vitals"
  | "entities"
  | "correlate"
  | "model_loading"
  | "prompt_build"
  | "llm_stream"
  | "narrative_integrate"
  | "physician_draft"
  | "recommendations_draft"
  | "patient_explain"
  | "bilingual_en"
  | "bilingual_id"
  | "findings_struct"
  | "risk_score"
  | "confidence_score"
  | "parse_response"
  | "validate_output"
  | "bilingual_merge"
  | "biomarkers_sync"
  | "persist_analysis"
  | "finalize";

export type AiAnalysisPhase = {
  id: AiAnalysisPhaseId;
  en: string;
  idLabel: string;
  /** Shown under the active substep while this phase runs */
  detailEn?: string;
  detailId?: string;
};

export const AI_PREP_PHASES: AiAnalysisPhase[] = [
  {
    id: "session",
    en: "Creating secure AI session",
    idLabel: "Membuat sesi AI yang aman",
    detailEn: "Opening an encrypted session with the health AI engine",
    detailId: "Membuka sesi terenkripsi dengan mesin AI kesehatan",
  },
  {
    id: "context",
    en: "Reviewing extracted report text",
    idLabel: "Meninjau teks laporan yang diekstrak",
    detailEn: "Scanning OCR output for labs, vitals, and narrative sections",
    detailId: "Memindai keluaran OCR untuk lab, tanda vital, dan bagian naratif",
  },
  {
    id: "sections",
    en: "Parsing report sections and file boundaries",
    idLabel: "Mengurai bagian laporan dan batas berkas",
    detailEn: "Detecting separate uploads and section headers in OCR text",
    detailId: "Mendeteksi unggahan terpisah dan judul bagian dalam teks OCR",
  },
  {
    id: "terminology",
    en: "Normalizing medical terms and units",
    idLabel: "Menormalkan istilah dan satuan medis",
    detailEn: "Standardizing lab names, units, and abbreviations",
    detailId: "Menyeragamkan nama lab, satuan, dan singkatan",
  },
  {
    id: "labs",
    en: "Extracting laboratory values and reference ranges",
    idLabel: "Mengekstrak nilai laboratorium dan rentang referensi",
    detailEn: "Matching results to reference ranges where available",
    detailId: "Mencocokkan hasil dengan rentang referensi jika tersedia",
  },
  {
    id: "vitals",
    en: "Reviewing vitals and screening scores",
    idLabel: "Meninjau tanda vital dan skor skrining",
    detailEn: "Including stress scores, BMI, and screening metrics",
    detailId: "Termasuk skor stres, BMI, dan metrik skrining",
  },
  {
    id: "entities",
    en: "Identifying key clinical findings",
    idLabel: "Mengidentifikasi temuan klinis utama",
    detailEn: "Extracting structured metrics with AI-assisted entity detection",
    detailId: "Mengekstrak metrik terstruktur dengan deteksi entitas berbantuan AI",
  },
  {
    id: "correlate",
    en: "Correlating abnormal results across files",
    idLabel: "Mengkorelasikan hasil abnormal antar berkas",
    detailEn: "Linking related abnormalities across multiple uploads",
    detailId: "Menghubungkan kelainan terkait di beberapa berkas unggahan",
  },
];

export const AI_GENERATING_PHASES: AiAnalysisPhase[] = [
  {
    id: "model_loading",
    en: "Loading clinical language model",
    idLabel: "Memuat model bahasa klinis",
    detailEn: "Selecting the best model for your report language and content",
    detailId: "Memilih model terbaik untuk bahasa dan isi laporan Anda",
  },
  {
    id: "prompt_build",
    en: "Building analysis prompt from report text",
    idLabel: "Menyusun prompt analisis dari teks laporan",
    detailEn: "Including labs, screening scores, and multi-file context in the prompt",
    detailId: "Memasukkan lab, skor skrining, dan konteks multi-berkas ke prompt",
  },
  {
    id: "llm_stream",
    en: "Generating clinical summary",
    idLabel: "Menghasilkan ringkasan klinis",
    detailEn: "Streaming the narrative from the AI model — this step often takes the longest",
    detailId: "Mengalirkan narasi dari model AI — langkah ini sering memakan waktu terlama",
  },
  {
    id: "narrative_integrate",
    en: "Integrating findings across all files",
    idLabel: "Mengintegrasikan temuan dari semua berkas",
    detailEn: "Combining labs, imaging text, and advice into one clinician-facing story",
    detailId: "Menggabungkan lab, teks pencitraan, dan saran menjadi satu narasi untuk klinisi",
  },
  {
    id: "physician_draft",
    en: "Drafting physician summary highlights",
    idLabel: "Menyusun sorotan ringkasan untuk dokter",
    detailEn: "Highlighting priorities for clinician review",
    detailId: "Menyoroti prioritas untuk tinjauan klinisi",
  },
  {
    id: "recommendations_draft",
    en: "Preparing care recommendations and next steps",
    idLabel: "Menyiapkan rekomendasi perawatan dan langkah berikutnya",
    detailEn: "Turning findings into actionable follow-up items",
    detailId: "Mengubah temuan menjadi tindak lanjut yang dapat ditindaklanjuti",
  },
  {
    id: "patient_explain",
    en: "Drafting patient-friendly explanation",
    idLabel: "Menyusun penjelasan yang mudah dipahami pasien",
    detailEn: "Plain-language explanation separate from the clinical summary",
    detailId: "Penjelasan bahasa sederhana terpisah dari ringkasan klinis",
  },
  {
    id: "bilingual_en",
    en: "Polishing English clinical narrative",
    idLabel: "Memperhalus narasi klinis bahasa Inggris",
    detailEn: "Ensuring terminology and tone are appropriate for physicians",
    detailId: "Memastikan terminologi dan nada sesuai untuk dokter",
  },
  {
    id: "bilingual_id",
    en: "Polishing Indonesian clinical narrative",
    idLabel: "Memperhalus narasi klinis bahasa Indonesia",
    detailEn: "Localizing phrasing for Indonesian-speaking clinicians and patients",
    detailId: "Menyesuaikan frasa untuk klinisi dan pasien berbahasa Indonesia",
  },
  {
    id: "findings_struct",
    en: "Structuring key findings for review",
    idLabel: "Menyusun temuan utama untuk tinjauan",
    detailEn: "Organizing metrics and flags into a reviewable list",
    detailId: "Mengorganisir metrik dan penanda menjadi daftar yang dapat ditinjau",
  },
  {
    id: "risk_score",
    en: "Assessing clinical risk indicators",
    idLabel: "Menilai indikator risiko klinis",
    detailEn: "Estimating overall risk level from combined results",
    detailId: "Memperkirakan tingkat risiko keseluruhan dari hasil gabungan",
  },
  {
    id: "confidence_score",
    en: "Calculating confidence score",
    idLabel: "Menghitung skor kepercayaan",
    detailEn: "Scoring how strongly the AI supports this interpretation",
    detailId: "Menilai seberapa kuat AI mendukung interpretasi ini",
  },
];

export const AI_SAVING_PHASES: AiAnalysisPhase[] = [
  {
    id: "parse_response",
    en: "Parsing AI response structure",
    idLabel: "Mengurai struktur respons AI",
    detailEn: "Reading summary, doctor notes, and findings from the model output",
    detailId: "Membaca ringkasan, catatan dokter, dan temuan dari keluaran model",
  },
  {
    id: "validate_output",
    en: "Validating clinical summary format",
    idLabel: "Memvalidasi format ringkasan klinis",
    detailEn: "Checking for placeholders and single-vendor framing on multi-file reports",
    detailId: "Memeriksa placeholder dan framing vendor tunggal pada laporan multi-berkas",
  },
  {
    id: "bilingual_merge",
    en: "Merging English and Indonesian fields",
    idLabel: "Menggabungkan field bahasa Inggris dan Indonesia",
    detailEn: "Aligning bilingual summary and doctor text for the portal",
    detailId: "Menyelaraskan ringkasan dwibahasa dan teks dokter untuk portal",
  },
  {
    id: "biomarkers_sync",
    en: "Syncing biomarkers and structured findings",
    idLabel: "Menyinkronkan biomarker dan temuan terstruktur",
    detailEn: "Updating health intelligence metrics linked to this report",
    detailId: "Memperbarui metrik health intelligence yang terhubung ke laporan ini",
  },
  {
    id: "persist_analysis",
    en: "Saving analysis results to your report",
    idLabel: "Menyimpan hasil analisis ke laporan Anda",
    detailEn: "Writing summaries and actions to the database — may take a moment on large reports",
    detailId: "Menulis ringkasan dan tindakan ke basis data — dapat memakan waktu pada laporan besar",
  },
  {
    id: "finalize",
    en: "Finalizing report for review",
    idLabel: "Menyelesaikan laporan untuk ditinjau",
    detailEn: "Preparing the report page for you to read",
    detailId: "Menyiapkan halaman laporan untuk Anda baca",
  },
];

/** @deprecated Use stage-specific phase lists */
export const BASE_AI_PHASES: AiAnalysisPhase[] = [
  ...AI_PREP_PHASES,
  ...AI_GENERATING_PHASES,
  ...AI_SAVING_PHASES,
];

const STAGE_PHASES: Record<AiPipelineStage, AiAnalysisPhase[]> = {
  prep: AI_PREP_PHASES,
  generating: AI_GENERATING_PHASES,
  saving: AI_SAVING_PHASES,
};

const PROGRESS_BAND: Record<
  ReportPipelineStep,
  { start: number; end: number }
> = {
  uploaded: { start: 0, end: 10 },
  ocr: { start: 10, end: 55 },
  analyzing: { start: 55, end: 68 },
  generating_summary: { start: 68, end: 86 },
  saving_results: { start: 86, end: 98 },
  completed: { start: 100, end: 100 },
};

export type AiAnalysisProgressState = {
  stage: AiPipelineStage;
  phaseIndex: number;
  phases: AiAnalysisPhase[];
  detail: string;
  progress: number;
};

export function pipelineStepFromAiProgress(
  state: AiAnalysisProgressState,
): ReportPipelineStep {
  switch (state.stage) {
    case "prep":
      return "analyzing";
    case "generating":
      return "generating_summary";
    case "saving":
      return "saving_results";
  }
}

export function phaseLabel(phase: AiAnalysisPhase, locale: Locale): string {
  return locale === "id" ? phase.idLabel : phase.en;
}

function normalizeProgressText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.…!?]+$/g, "")
    .replace(/\s+/g, " ");
}

/** True when detail text would repeat the step title in the UI. */
export function isDuplicateOfPhaseLabel(
  text: string,
  phase: AiAnalysisPhase,
  locale: Locale,
): boolean {
  const normalized = normalizeProgressText(text);
  if (!normalized) return true;
  const labels = [phaseLabel(phase, locale), phase.en, phase.idLabel].map(
    normalizeProgressText,
  );
  return labels.some((label) => label === normalized);
}

function contextDetail(locale: Locale, charCount: number): string {
  const formatted = charCount.toLocaleString(
    locale === "id" ? "id-ID" : "en-US",
  );
  return locale === "id"
    ? `Meninjau ${formatted} karakter teks laporan yang diekstrak dari OCR`
    : `Reviewing ${formatted} characters of OCR-extracted report text`;
}

const GENERIC_DETAIL = {
  en: "Working through this step…",
  id: "Sedang memproses langkah ini…",
} as const;

/**
 * Status line under the active substep — never repeats the step title.
 */
export function resolveStepDetail(
  phase: AiAnalysisPhase,
  locale: Locale,
  options?: {
    charCount?: number;
    serverMessage?: string;
    explicitDetail?: string;
  },
): string {
  const candidates: string[] = [];

  if (options?.explicitDetail?.trim()) {
    candidates.push(options.explicitDetail.trim());
  }
  if (options?.serverMessage?.trim()) {
    candidates.push(options.serverMessage.trim());
  }
  if (
    phase.id === "context" &&
    options?.charCount != null &&
    options.charCount > 0
  ) {
    candidates.push(contextDetail(locale, options.charCount));
  }
  const intrinsic = locale === "id" ? phase.detailId : phase.detailEn;
  if (intrinsic?.trim()) {
    candidates.push(intrinsic.trim());
  }

  for (const candidate of candidates) {
    if (!isDuplicateOfPhaseLabel(candidate, phase, locale)) {
      return candidate;
    }
  }

  return locale === "id" ? GENERIC_DETAIL.id : GENERIC_DETAIL.en;
}

export function buildAiProgressDetail(
  phase: AiAnalysisPhase,
  locale: Locale,
  charCount?: number,
  serverMessage?: string,
): string {
  return resolveStepDetail(phase, locale, { charCount, serverMessage });
}

function stageProgressPercent(
  stage: AiPipelineStage,
  phaseIndex: number,
  phaseCount: number,
): number {
  const step = pipelineStepFromAiProgress({
    stage,
    phaseIndex,
    phases: STAGE_PHASES[stage],
    detail: "",
    progress: 0,
  });
  const band = PROGRESS_BAND[step];
  if (phaseCount <= 1) return band.end;
  const ratio = phaseIndex / (phaseCount - 1);
  return Math.round(band.start + ratio * (band.end - band.start));
}

export function phaseIndexFromAnalyzeStep(
  step: AnalyzeStreamStep,
  serverProgress = 0,
): { stage: AiPipelineStage; phaseIndex: number } {
  switch (step) {
    case "started":
      return { stage: "prep", phaseIndex: 0 };
    case "entities":
      return { stage: "prep", phaseIndex: 6 };
    case "generating": {
      const p = Math.max(32, Math.min(88, serverProgress || 32));
      const ratio = (p - 32) / (88 - 32);
      const maxIdx = AI_GENERATING_PHASES.length - 1;
      const idx = Math.round(2 + ratio * (maxIdx - 2));
      return { stage: "generating", phaseIndex: idx };
    }
    case "parsing":
      return { stage: "saving", phaseIndex: 0 };
    case "complete":
      return {
        stage: "saving",
        phaseIndex: AI_SAVING_PHASES.length - 1,
      };
    case "error":
      return { stage: "prep", phaseIndex: 0 };
    default:
      return { stage: "prep", phaseIndex: 0 };
  }
}

export function analyzeStreamEventToProgress(
  event: AnalyzeStreamEvent,
  locale: Locale,
  contentLength = 0,
): AiAnalysisProgressState {
  const { stage, phaseIndex } = phaseIndexFromAnalyzeStep(
    event.step,
    event.progress ?? 0,
  );
  const phases = STAGE_PHASES[stage];
  const phase = phases[phaseIndex] ?? phases[0];
  const detail = resolveStepDetail(phase, locale, {
    charCount: contentLength,
    serverMessage: event.message,
  });

  let progress = stageProgressPercent(stage, phaseIndex, phases.length);
  if (event.step === "generating" && event.progress != null) {
    const serverBoost =
      68 + Math.min(16, Math.max(0, event.progress - 32) * 0.28);
    progress = Math.round(Math.max(progress, serverBoost));
  }

  return { stage, phaseIndex, phases, detail, progress };
}

export type AiAnalysisProgressCallback = (state: AiAnalysisProgressState) => void;

export function getAiPhaseStatuses(
  phases: AiAnalysisPhase[],
  activeIndex: number,
  locale: Locale,
  options?: { statusDetail?: string; charCount?: number },
): {
  label: string;
  status: "done" | "active" | "pending";
  detail?: string;
}[] {
  return phases.map((phase, i) => {
    const status: "done" | "active" | "pending" =
      i < activeIndex ? "done" : i === activeIndex ? "active" : "pending";
    const label = phaseLabel(phase, locale);
    if (status !== "active") {
      return { label, status };
    }
    return {
      label,
      status,
      detail: resolveStepDetail(phase, locale, {
        charCount: options?.charCount,
        serverMessage: options?.statusDetail,
        explicitDetail: options?.statusDetail,
      }),
    };
  });
}

export function createAiAnalysisProgressController(
  locale: Locale,
  onProgress: AiAnalysisProgressCallback,
  options?: { contentLength?: number; creepIntervalMs?: number },
): {
  fromEvent: (event: AnalyzeStreamEvent) => void;
  enterSaving: (detail?: string) => void;
  advanceSaving: (phaseId: AiAnalysisPhaseId, detail?: string) => void;
  finish: () => void;
  stop: () => void;
} {
  const charCount = options?.contentLength ?? 0;
  let stage: AiPipelineStage = "prep";
  let highWater = 0;

  const emit = (
    nextStage: AiPipelineStage,
    index: number,
    detail?: string,
  ) => {
    const phases = STAGE_PHASES[nextStage];
    const clamped = Math.min(Math.max(index, 0), phases.length - 1);
    if (nextStage === stage && clamped < highWater) return;
    if (nextStage !== stage) {
      stage = nextStage;
      highWater = clamped;
    } else {
      highWater = Math.max(highWater, clamped);
    }
    const phase = phases[highWater];
    onProgress({
      stage,
      phaseIndex: highWater,
      phases,
      detail: resolveStepDetail(phase, locale, {
        charCount,
        explicitDetail: detail,
        serverMessage: detail,
      }),
      progress: stageProgressPercent(stage, highWater, phases.length),
    });
  };

  emit("prep", 0);

  const creepIntervalMs = options?.creepIntervalMs ?? 2400;
  const timer = setInterval(() => {
    const phases = STAGE_PHASES[stage];
    if (highWater < phases.length - 1) {
      emit(stage, highWater + 1);
    } else if (stage === "prep") {
      emit("generating", 0);
    }
  }, creepIntervalMs);

  return {
    fromEvent: (event) => {
      const mapped = phaseIndexFromAnalyzeStep(event.step, event.progress ?? 0);
      const phase =
        STAGE_PHASES[mapped.stage][mapped.phaseIndex] ??
        STAGE_PHASES[mapped.stage][0];
      const detail = resolveStepDetail(phase, locale, {
        charCount,
        serverMessage: event.message,
      });
      emit(mapped.stage, mapped.phaseIndex, detail);
    },
    enterSaving: (detail) => {
      emit("saving", 0, detail);
    },
    advanceSaving: (phaseId, detail) => {
      const idx = AI_SAVING_PHASES.findIndex((p) => p.id === phaseId);
      if (idx >= 0) emit("saving", idx, detail);
    },
    finish: () => {
      emit("saving", AI_SAVING_PHASES.length - 1);
    },
    stop: () => clearInterval(timer),
  };
}

/** Run work while creeping through saving substeps (post-stream persistence). */
export async function runWithSavingProgress<T>(
  locale: Locale,
  onProgress: AiAnalysisProgressCallback,
  work: (advance: (phaseId: AiAnalysisPhaseId, detail?: string) => void) => Promise<T>,
  options?: { startAt?: AiAnalysisPhaseId },
): Promise<T> {
  const startIdx = options?.startAt
    ? AI_SAVING_PHASES.findIndex((p) => p.id === options.startAt)
    : 0;
  let index = Math.max(0, startIdx);

  const emit = (idx: number, detail?: string) => {
    index = idx;
    const phases = AI_SAVING_PHASES;
    const phase = phases[index] ?? phases[0];
    onProgress({
      stage: "saving",
      phaseIndex: index,
      phases,
      detail: resolveStepDetail(phase, locale, {
        explicitDetail: detail,
        serverMessage: detail,
      }),
      progress: stageProgressPercent("saving", index, phases.length),
    });
  };

  emit(index);

  const timer = setInterval(() => {
    if (index < AI_SAVING_PHASES.length - 2) {
      emit(index + 1);
    }
  }, 2000);

  const advance = (phaseId: AiAnalysisPhaseId, detail?: string) => {
    const idx = AI_SAVING_PHASES.findIndex((p) => p.id === phaseId);
    if (idx >= 0) emit(idx, detail);
  };

  try {
    return await work(advance);
  } finally {
    clearInterval(timer);
    emit(AI_SAVING_PHASES.length - 1);
  }
}

export async function runWithAiAnalysisProgress<T>(
  locale: Locale,
  onProgress: AiAnalysisProgressCallback,
  work: (advance: (phaseId: AiAnalysisPhaseId) => void) => Promise<T>,
  options?: { contentLength?: number },
): Promise<T> {
  const charCount = options?.contentLength ?? 0;

  const advance = (phaseId: AiAnalysisPhaseId) => {
    for (const stage of ["prep", "generating", "saving"] as AiPipelineStage[]) {
      const idx = STAGE_PHASES[stage].findIndex((p) => p.id === phaseId);
      if (idx >= 0) {
        const phase = STAGE_PHASES[stage][idx];
        onProgress({
          stage,
          phaseIndex: idx,
          phases: STAGE_PHASES[stage],
          detail: resolveStepDetail(phase, locale, { charCount }),
          progress: stageProgressPercent(stage, idx, STAGE_PHASES[stage].length),
        });
        return;
      }
    }
  };

  advance("session");

  try {
    return await work(advance);
  } finally {
    advance("finalize");
  }
}
