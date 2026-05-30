"use client";

import { UploadPreview } from "@alocare/design-system";
import type { Locale } from "@/hooks/use-locale";
import type { Report } from "@/lib/types/api";

type ReportFileCardProps = {
  report: Report;
  locale: Locale;
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

export function ReportFileCard({ report, locale }: ReportFileCardProps) {
  const fileName = report.file_reference ?? report.title;
  const uploadedAt = formatCreatedAt(report.created_at, locale);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <UploadPreview
        fileName={fileName}
        lang={locale}
        uploaded
        className="rounded-none border-0 shadow-none"
      />
      <dl className="space-y-2 border-t border-slate-100 px-4 py-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">
            {locale === "id" ? "Judul" : "Title"}
          </dt>
          <dd className="min-w-0 truncate text-right font-medium text-slate-900">
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
          <dt className="text-slate-500">
            {locale === "id" ? "Status" : "Status"}
          </dt>
          <dd className="font-medium capitalize text-slate-900">
            {formatStatus(report.status, locale)}
          </dd>
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
    </div>
  );
}
