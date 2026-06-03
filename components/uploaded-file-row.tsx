"use client";

import { Card, CardContent } from "@alocare/design-system";
import { Check, FileText, Loader2, X } from "lucide-react";
import type { Locale } from "@/hooks/use-locale";

const iconActionClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition";

type UploadedFileRowProps = {
  fileName: string;
  fileSize: string;
  locale: Locale;
  onRemove?: () => void;
  removeDisabled?: boolean;
  removing?: boolean;
};

export function UploadedFileRow({
  fileName,
  fileSize,
  locale,
  onRemove,
  removeDisabled = false,
  removing = false,
}: UploadedFileRowProps) {
  const uploadedLabel = locale === "id" ? "Berhasil diunggah" : "Uploaded";

  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <FileText className="h-5 w-5 text-red-600" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{fileName}</p>
          <p className="text-xs text-slate-500">{fileSize}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`${iconActionClass} bg-emerald-50`}
            aria-label={uploadedLabel}
            title={uploadedLabel}
          >
            <Check className="h-4 w-4 text-emerald-600" aria-hidden />
          </span>
          {onRemove ? (
            <button
              type="button"
              disabled={removeDisabled || removing}
              onClick={onRemove}
              className={`${iconActionClass} bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50`}
              aria-label={
                locale === "id" ? `Hapus ${fileName}` : `Remove ${fileName}`
              }
              title={locale === "id" ? "Hapus berkas" : "Remove file"}
            >
              {removing ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <X className="h-4 w-4" aria-hidden />
              )}
            </button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
