"use client";

import { DoctorReviewPanel, type ReviewFormData } from "@alocare/design-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { approveClinicalResult } from "@/lib/api/clinical-intelligence";
import type { Locale } from "@/hooks/use-locale";

type ReportDoctorReviewProps = {
  reportId: string;
  locale: Locale;
  disabled?: boolean;
};

export function ReportDoctorReview({
  reportId,
  locale,
  disabled = false,
}: ReportDoctorReviewProps) {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const approved = data.assessment !== "disagree";
      const notes = [data.comments, data.nextAction].filter(Boolean).join("\n\n");
      await approveClinicalResult(reportId, { notes, approved });
    },
    onSuccess: () => {
      setMessage(
        locale === "id"
          ? "Laporan disetujui dan siap dibagikan ke pasien."
          : "Report approved and ready for patient sharing.",
      );
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      void queryClient.invalidateQueries({ queryKey: ["report-result", reportId] });
      void queryClient.invalidateQueries({ queryKey: ["clinical-review-queue"] });
    },
    onError: () => {
      setError(
        locale === "id"
          ? "Gagal menyetujui laporan. Coba lagi."
          : "Failed to approve report. Please try again.",
      );
    },
  });

  if (disabled) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
        {locale === "id"
          ? "Laporan ini telah disetujui oleh dokter."
          : "This report has been approved by a clinician."}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {locale === "id" ? "Tinjauan Dokter" : "Doctor Review"}
      </h3>
      <DoctorReviewPanel
        lang={locale}
        onSubmit={(data) => mutation.mutate(data)}
        className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
      />
      {mutation.isPending ? (
        <p className="text-sm text-slate-500">
          {locale === "id" ? "Menyimpan persetujuan…" : "Saving approval…"}
        </p>
      ) : null}
      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
