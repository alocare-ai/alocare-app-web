import type { OcrStreamEvent } from "@/lib/api/ocr-stream";
import type { Locale } from "@/lib/i18n";

export type OcrFileStatus = "pending" | "active" | "done" | "error";

export type OcrFileItem = {
  name: string;
  status: OcrFileStatus;
  detail: string;
  progress: number;
  charCount?: number;
};

export type IdentityFileStatus = "pending" | "active" | "done" | "skipped";

export type IdentityFileItem = {
  name: string;
  status: IdentityFileStatus;
  detail: string;
  patientName?: string;
};

export type IdentityPhaseStatus = "pending" | "active" | "done";

export type IdentityPhaseItem = {
  id: string;
  label: string;
  status: IdentityPhaseStatus;
  detail?: string;
};

export type CiPhaseStatus = "pending" | "active" | "done" | "error";

export type CiPhaseItem = {
  id: string;
  label: string;
  status: CiPhaseStatus;
  detail?: string;
};

export type OcrFilesProgressState = {
  files: OcrFileItem[];
  overallProgress: number;
  detail: string;
  identityProgress?: number;
  identityDetail?: string;
  identityFiles?: IdentityFileItem[];
  identityPhases?: IdentityPhaseItem[];
  /** Populated during clinical-intelligence SSE (replaces legacy aiProgress substeps). */
  ciPhases?: CiPhaseItem[];
};

export function createOcrFilesProgress(fileNames: string[]): OcrFilesProgressState {
  return {
    files: fileNames.map((name) => ({
      name,
      status: "pending",
      detail: "",
      progress: 0,
    })),
    overallProgress: 12,
    detail: "",
  };
}

function eventDetail(locale: Locale, event: OcrStreamEvent): string {
  if (event.message) return event.message;
  switch (event.step) {
    case "loading":
      return locale === "id" ? "Memuat PDF…" : "Loading PDF…";
    case "extracting":
      return locale === "id" ? "Membaca berkas…" : "Reading file…";
    case "page":
      return locale === "id"
        ? `Halaman ${event.page ?? 1} / ${event.totalPages ?? "?"}`
        : `Page ${event.page ?? 1} / ${event.totalPages ?? "?"}`;
    case "ocr":
      return locale === "id"
        ? `OCR halaman ${event.page ?? 1}…`
        : `OCR page ${event.page ?? 1}…`;
    case "started":
      return locale === "id" ? "Memulai…" : "Starting…";
    case "identity":
      return locale === "id"
        ? "Mengekstrak identitas pasien…"
        : "Extracting patient identity…";
    default:
      return locale === "id" ? "Memindai…" : "Scanning…";
  }
}

function doneDetail(locale: Locale, charCount?: number): string {
  if (charCount != null && charCount > 0) {
    const n = charCount.toLocaleString(locale === "id" ? "id-ID" : "en-US");
    return locale === "id" ? `${n} karakter` : `${n} characters`;
  }
  return locale === "id" ? "Diekstrak" : "Extracted";
}

function overallFromFiles(files: OcrFileItem[]): number {
  if (!files.length) return 12;
  const sum = files.reduce((acc, f) => {
    if (f.status === "done") return acc + 100;
    if (f.status === "active") return acc + f.progress;
    return acc;
  }, 0);
  const ratio = sum / files.length / 100;
  return Math.min(52, Math.round(12 + ratio * 40));
}

function defaultIdentityPhases(locale: Locale): IdentityPhaseItem[] {
  return [
    {
      id: "selecting",
      label:
        locale === "id" ? "Memilih kecocokan terbaik" : "Selecting best match",
      status: "pending",
    },
    {
      id: "saving",
      label: locale === "id" ? "Menyimpan identitas" : "Saving identity",
      status: "pending",
    },
  ];
}

function initIdentityFiles(
  state: OcrFilesProgressState,
  fileTotal: number,
): IdentityFileItem[] {
  if (state.identityFiles?.length) {
    return state.identityFiles.map((item) => ({ ...item }));
  }
  return state.files.slice(0, fileTotal).map((file) => ({
    name: file.name,
    status: "pending" as const,
    detail: "",
  }));
}

function findIdentityFileIndex(
  identityFiles: IdentityFileItem[],
  event: OcrStreamEvent,
): number {
  if (event.file) {
    const idx = identityFiles.findIndex((f) => f.name === event.file);
    if (idx >= 0) return idx;
  }
  if (event.fileIndex != null && event.fileIndex >= 1) {
    return event.fileIndex - 1;
  }
  return -1;
}

function applyIdentityEvent(
  state: OcrFilesProgressState,
  event: OcrStreamEvent,
  locale: Locale,
): OcrFilesProgressState {
  const detail = event.message ?? eventDetail(locale, event);
  const fileTotal = event.fileTotal ?? state.files.length;
  const doneOcrFiles = state.files.map((f) =>
    f.status === "done"
      ? f
      : {
          ...f,
          status: "done" as const,
          progress: 100,
          detail: f.detail || doneDetail(locale, f.charCount),
        },
  );

  let identityFiles = initIdentityFiles(state, fileTotal);
  let identityPhases =
    state.identityPhases?.map((phase) => ({ ...phase })) ??
    defaultIdentityPhases(locale);

  const substep = event.substep;

  if (substep === "started") {
    identityFiles = identityFiles.map((file) => ({ ...file, status: "pending", detail: "" }));
    identityPhases = defaultIdentityPhases(locale);
  }

  if (substep === "file") {
    const idx = findIdentityFileIndex(identityFiles, event);
    if (idx >= 0) {
      identityFiles[idx] = {
        ...identityFiles[idx],
        status: "active",
        detail:
          locale === "id"
            ? "Mengekstrak nama, MRN, dan demografi…"
            : "Extracting name, MRN, and demographics…",
      };
    }
  }

  if (substep === "file_result") {
    const idx = findIdentityFileIndex(identityFiles, event);
    if (idx >= 0) {
      const found = event.found !== false && Boolean(event.patientName);
      identityFiles[idx] = {
        ...identityFiles[idx],
        status: found ? "done" : "skipped",
        patientName: event.patientName,
        detail: found
          ? event.patientName!
          : locale === "id"
            ? "Tidak ada nama pasien"
            : "No patient name",
      };
    }
  }

  if (substep === "selecting") {
    identityPhases = identityPhases.map((phase) =>
      phase.id === "selecting"
        ? { ...phase, status: "active", detail }
        : phase,
    );
  }

  if (substep === "saving") {
    identityPhases = identityPhases.map((phase) => {
      if (phase.id === "selecting") {
        return { ...phase, status: "done", detail: phase.detail ?? detail };
      }
      if (phase.id === "saving") {
        return { ...phase, status: "active", detail };
      }
      return phase;
    });
  }

  if (substep === "cached" || substep === "complete") {
    identityPhases = identityPhases.map((phase) => ({
      ...phase,
      status: "done",
      detail: phase.id === "saving" ? detail : phase.detail,
    }));
    if (substep === "complete" && event.found === false) {
      identityFiles = identityFiles.map((file) =>
        file.status === "pending"
          ? {
              ...file,
              status: "skipped" as const,
              detail:
                locale === "id" ? "Tidak ada nama pasien" : "No patient name",
            }
          : file,
      );
    }
  }

  return {
    files: doneOcrFiles,
    overallProgress: 52,
    detail,
    identityProgress: event.progress ?? state.identityProgress ?? 95,
    identityDetail: detail,
    identityFiles,
    identityPhases,
  };
}

export function applyOcrStreamEvent(
  state: OcrFilesProgressState,
  event: OcrStreamEvent,
  locale: Locale,
): OcrFilesProgressState {
  if (event.step === "identity") {
    return applyIdentityEvent(state, event, locale);
  }

  const total = event.fileTotal ?? state.files.length;
  const fileName = event.file;

  const files = state.files.map((item) => ({ ...item }));

  const findIndex = (): number => {
    if (!fileName) return -1;
    const idx = files.findIndex((f) => f.name === fileName);
    if (idx >= 0) return idx;
    if (event.fileIndex != null && event.fileIndex >= 1) {
      return event.fileIndex - 1;
    }
    return -1;
  };

  if (event.step === "error") {
    const idx = findIndex();
    if (idx >= 0) {
      files[idx] = {
        ...files[idx],
        status: "error",
        detail: event.message ?? (locale === "id" ? "Gagal" : "Failed"),
      };
    } else if (files.length === 1) {
      files[0] = {
        ...files[0],
        status: "error",
        detail: event.message ?? (locale === "id" ? "Gagal" : "Failed"),
      };
    }
    return {
      ...state,
      files,
      overallProgress: overallFromFiles(files),
      detail: event.message ?? state.detail,
    };
  }

  if (event.step === "file_complete") {
    const idx = findIndex();
    if (idx >= 0) {
      files[idx] = {
        ...files[idx],
        status: "done",
        progress: 100,
        charCount: event.charCount,
        detail: doneDetail(locale, event.charCount),
      };
    }
    return {
      ...state,
      files,
      overallProgress: overallFromFiles(files),
      detail:
        event.message ??
        (locale === "id"
          ? `${files.filter((f) => f.status === "done").length} / ${total} berkas selesai`
          : `${files.filter((f) => f.status === "done").length} / ${total} files done`),
    };
  }

  if (event.step === "complete" && !fileName) {
    const doneFiles = files.map((f) =>
      f.status === "done"
        ? f
        : {
            ...f,
            status: "done" as const,
            progress: 100,
            detail: doneDetail(locale, f.charCount),
          },
    );
    return {
      ...state,
      files: doneFiles,
      overallProgress: 52,
      detail:
        event.message ??
        (locale === "id" ? "Semua berkas digabung" : "All files combined"),
    };
  }

  const idx = findIndex();
  if (idx >= 0 && files[idx].status !== "done") {
    files[idx] = {
      ...files[idx],
      status: "active",
      progress: event.progress ?? files[idx].progress,
      detail: eventDetail(locale, event),
    };
  }

  return {
    ...state,
    files,
    overallProgress: overallFromFiles(files),
    detail: fileName ? eventDetail(locale, event) : state.detail,
  };
}

export function getOcrFileStatuses(
  files: OcrFileItem[],
): { label: string; status: OcrFileStatus; detail?: string }[] {
  return files.map((file) => ({
    label: file.name,
    status: file.status,
    detail:
      file.status === "done" || file.status === "active"
        ? file.detail
        : undefined,
  }));
}

export function getIdentityFileStatuses(
  files: IdentityFileItem[],
): { label: string; status: IdentityFileStatus; detail?: string }[] {
  return files.map((file) => ({
    label: file.name,
    status: file.status,
    detail:
      file.status === "done" ||
      file.status === "active" ||
      file.status === "skipped"
        ? file.detail
        : undefined,
  }));
}

export function getIdentityPhaseStatuses(
  phases: IdentityPhaseItem[],
): { label: string; status: IdentityPhaseStatus; detail?: string }[] {
  return phases.map((phase) => ({
    label: phase.label,
    status: phase.status,
    detail: phase.detail,
  }));
}
