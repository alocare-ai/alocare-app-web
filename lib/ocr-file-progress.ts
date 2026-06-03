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

export type OcrFilesProgressState = {
  files: OcrFileItem[];
  overallProgress: number;
  detail: string;
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
  return Math.min(58, Math.round(12 + ratio * 46));
}

export function applyOcrStreamEvent(
  state: OcrFilesProgressState,
  event: OcrStreamEvent,
  locale: Locale,
): OcrFilesProgressState {
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
    }
    return {
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
      files: doneFiles,
      overallProgress: 58,
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
    files,
    overallProgress: overallFromFiles(files),
    detail: fileName
      ? eventDetail(locale, event)
      : state.detail,
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
