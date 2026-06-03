"use client";

import { ChevronDown, FileText, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Locale } from "@/hooks/use-locale";
import { buildReportFileAnalyses, deleteReportFile } from "@/lib/api/reports";
import { formatFileSize } from "@/lib/document-sections";
import type {
  Report,
  ReportFileAnalysis,
  ReportUploadedFile,
} from "@/lib/types/api";

type ReportFilesSectionProps = {
  report: Report;
  reportId: string;
  locale: Locale;
  uploadedFiles: ReportUploadedFile[];
  fileAnalyses: ReportFileAnalysis[];
  /** Called after a source file is removed (e.g. to refresh AI summaries). */
  onFilesChanged?: () => void;
};

function formatStatus(status: string, locale: Locale): string {
  const labels: Record<string, { en: string; id: string }> = {
    uploaded: { en: "Uploaded", id: "Terunggah" },
    processing: { en: "Processing", id: "Memproses" },
    completed: { en: "Completed", id: "Selesai" },
    validated: { en: "Validated", id: "Tervalidasi" },
    failed: { en: "Failed", id: "Gagal" },
  };
  const entry = labels[status];
  if (entry) return locale === "id" ? entry.id : entry.en;
  return status.replace(/_/g, " ");
}

function formatCreatedAt(value: string | null, locale: Locale): string | null {
  if (!value) return null;
  try {
    return new Date(value).toLocaleString(locale === "id" ? "id-ID" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return null;
  }
}

function pickSummary(entry: ReportFileAnalysis, locale: Locale): string {
  const summary = entry.summary;
  if (!summary) return "";
  const text = locale === "id" ? summary.id : summary.en;
  return (
    text?.trim() || summary.en?.trim() || summary.id?.trim() || ""
  );
}

function buildFileNamesSummary(
  filenames: string[],
  locale: Locale,
): string {
  if (filenames.length === 0) return "";
  if (filenames.length === 1) return filenames[0];
  const preview = filenames.slice(0, 2).join(", ");
  const more = filenames.length - 2;
  if (more <= 0) return preview;
  return locale === "id"
    ? `${preview} +${more} lainnya`
    : `${preview} +${more} more`;
}

export function ReportFilesSection({
  report,
  reportId,
  locale,
  uploadedFiles,
  fileAnalyses,
  onFilesChanged,
}: ReportFilesSectionProps) {
  const queryClient = useQueryClient();
  const [filesOpen, setFilesOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showReanalyzeHint, setShowReanalyzeHint] = useState(false);
  const uploadedAt = formatCreatedAt(report.created_at, locale);

  const invalidateReportData = () => {
    void queryClient.invalidateQueries({ queryKey: ["report", reportId] });
    void queryClient.invalidateQueries({ queryKey: ["report-result", reportId] });
    onFilesChanged?.();
  };

  const buildMutation = useMutation({
    mutationFn: () => buildReportFileAnalyses(reportId),
    onSuccess: () => {
      invalidateReportData();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (filename: string) => deleteReportFile(reportId, filename),
    onSuccess: () => {
      setConfirmDelete(null);
      setDeleteError(null);
      setShowReanalyzeHint(true);
      invalidateReportData();
    },
    onError: (err: Error) => {
      setDeleteError(err.message);
    },
  });

  const rows = useMemo(() => {
    const byName = new Map(
      fileAnalyses.map((a) => [a.filename.toLowerCase(), a]),
    );
    return uploadedFiles.map((file) => {
      const analysis =
        byName.get(file.filename.toLowerCase()) ??
        fileAnalyses.find(
          (a) => a.filename.toLowerCase() === file.filename.toLowerCase(),
        );
      return { file, analysis };
    });
  }, [uploadedFiles, fileAnalyses]);

  const totalBytes = useMemo(
    () => uploadedFiles.reduce((sum, f) => sum + (f.size_bytes ?? 0), 0),
    [uploadedFiles],
  );

  const backfillStarted = useRef(false);
  useEffect(() => {
    if (backfillStarted.current) return;
    if (uploadedFiles.length > 1 && fileAnalyses.length === 0) {
      backfillStarted.current = true;
      buildMutation.mutate();
    }
  }, [uploadedFiles.length, fileAnalyses.length, buildMutation]);

  const fileCount = uploadedFiles.length;
  const heading =
    locale === "id"
      ? `Berkas laporan (${fileCount})`
      : `Report files (${fileCount})`;
  const sizeLine =
    totalBytes > 0
      ? formatFileSize(totalBytes)
      : locale === "id"
        ? "Ukuran tidak tersedia"
        : "Size unavailable";
  const statusLabel = formatStatus(report.status, locale);
  const fileNamesSummary = buildFileNamesSummary(
    uploadedFiles.map((f) => f.filename),
    locale,
  );

  const canDeleteFiles = fileCount > 1;

  const filesToggleLabel = filesOpen
    ? locale === "id"
      ? "Sembunyikan daftar berkas"
      : "Hide file list"
    : locale === "id"
      ? "Tampilkan daftar berkas"
      : "Show file list";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">{heading}</h2>
        <p className="mt-0.5 text-xs text-slate-500">{sizeLine}</p>
      </div>

      <dl className="grid gap-2 border-b border-slate-100 px-4 py-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">{locale === "id" ? "Judul" : "Title"}</dt>
          <dd className="min-w-0 text-right font-medium text-slate-900">
            {report.title}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="shrink-0 text-slate-500">
            {locale === "id" ? "ID laporan" : "Report ID"}
          </dt>
          <dd className="font-mono text-xs text-slate-700" title={report.id}>
            {report.id.slice(0, 8)}…
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">{locale === "id" ? "Status" : "Status"}</dt>
          <dd className="font-medium text-slate-900">{statusLabel}</dd>
        </div>
        {uploadedAt ? (
          <div className="flex justify-between gap-3">
            <dt className="text-slate-500">
              {locale === "id" ? "Diunggah" : "Uploaded"}
            </dt>
            <dd className="text-right text-slate-700">{uploadedAt}</dd>
          </div>
        ) : null}
      </dl>

      <button
        type="button"
        className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-slate-50/80"
        onClick={() => setFilesOpen((open) => !open)}
        aria-expanded={filesOpen}
        aria-label={filesToggleLabel}
      >
        <FileText
          className="mt-0.5 h-5 w-5 shrink-0 text-slate-400"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900">
            {locale === "id" ? "Detail berkas" : "File details"}
          </p>
          {!filesOpen && fileNamesSummary ? (
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
              {fileNamesSummary}
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-slate-500">
              {fileCount} {locale === "id" ? "berkas" : "files"}
              {locale === "id"
                ? " · ringkasan AI per berkas"
                : " · AI summary per file"}
            </p>
          )}
        </div>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            filesOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {deleteError ? (
        <p
          className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-800"
          role="alert"
        >
          {deleteError}
        </p>
      ) : null}

      {showReanalyzeHint ? (
        <p className="border-t border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          {locale === "id"
            ? "Berkas dihapus. Ringkasan diperbarui dari berkas yang tersisa — gunakan Coba lagi pada ringkasan klinis untuk analisis AI penuh."
            : "File removed. Summaries were updated from remaining files — use Retry on the clinical summary for a full AI re-analysis."}
        </p>
      ) : null}

      {filesOpen ? (
        <ul className="divide-y divide-slate-100 border-t border-slate-100">
          {rows.map(({ file, analysis }) => {
            const key = file.filename;
            const isOpen = expanded[key] ?? false;
            const summaryText = analysis ? pickSummary(analysis, locale) : "";
            const preview = analysis?.extract_preview?.trim() ?? "";
            const isConfirming = confirmDelete === key;
            const isDeleting =
              deleteMutation.isPending && deleteMutation.variables === key;

            return (
              <li key={key}>
                <div className="flex items-start gap-1 px-4 py-3 hover:bg-slate-50">
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                    onClick={() =>
                      setExpanded((prev) => ({ ...prev, [key]: !isOpen }))
                    }
                    aria-expanded={isOpen}
                  >
                    <FileText
                      className="mt-0.5 h-5 w-5 shrink-0 text-slate-400"
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="break-all text-sm font-medium text-slate-900 sm:break-words">
                        {file.filename}
                      </p>
                      <p className="text-xs text-slate-500">
                        {file.size_bytes > 0
                          ? formatFileSize(file.size_bytes)
                          : locale === "id"
                            ? "Ukuran tidak tersedia"
                            : "Size unavailable"}
                        {analysis?.char_count
                          ? ` · ${analysis.char_count.toLocaleString()} ${
                              locale === "id" ? "karakter" : "chars"
                            }`
                          : null}
                      </p>
                      {summaryText && !isOpen ? (
                        <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                          {summaryText}
                        </p>
                      ) : null}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  {isConfirming ? (
                    <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center">
                      <p className="max-w-[9rem] text-right text-xs text-slate-600">
                        {locale === "id"
                          ? "Hapus berkas & data AI?"
                          : "Remove file & AI data?"}
                      </p>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={isDeleting}
                          className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                          onClick={() => deleteMutation.mutate(key)}
                        >
                          {locale === "id" ? "Ya" : "Yes"}
                        </button>
                        <button
                          type="button"
                          disabled={isDeleting}
                          className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                          onClick={() => {
                            setConfirmDelete(null);
                            setDeleteError(null);
                          }}
                        >
                          {locale === "id" ? "Batal" : "Cancel"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={!canDeleteFiles || deleteMutation.isPending}
                      title={
                        canDeleteFiles
                          ? locale === "id"
                            ? "Hapus berkas sumber"
                            : "Delete source file"
                          : locale === "id"
                            ? "Minimal satu berkas harus tersisa"
                            : "At least one file must remain"
                      }
                      className="mt-0.5 shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={() => {
                        setDeleteError(null);
                        setConfirmDelete(key);
                      }}
                      aria-label={
                        locale === "id"
                          ? `Hapus ${file.filename}`
                          : `Delete ${file.filename}`
                      }
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>

                {isOpen ? (
                  <div className="space-y-3 border-t border-slate-50 bg-slate-50/60 px-4 py-3 text-sm">
                    {buildMutation.isPending && !summaryText ? (
                      <p className="text-slate-500">
                        {locale === "id"
                          ? "Memuat ringkasan…"
                          : "Loading summary…"}
                      </p>
                    ) : summaryText ? (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          {locale === "id" ? "Ringkasan" : "Summary"}
                        </p>
                        <p className="mt-1 whitespace-pre-wrap text-slate-800">
                          {summaryText}
                        </p>
                      </div>
                    ) : null}
                    {preview ? (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          {locale === "id" ? "Cuplikan teks" : "Extracted text"}
                        </p>
                        <p className="mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap font-mono text-xs text-slate-600">
                          {preview}
                          {analysis && analysis.char_count > preview.length
                            ? "…"
                            : null}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
