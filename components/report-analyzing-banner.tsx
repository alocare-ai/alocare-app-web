import type { Locale } from "@/lib/i18n";

type ReportAnalyzingBannerProps = {
  locale: Locale;
};

export function ReportAnalyzingBanner({ locale }: ReportAnalyzingBannerProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm text-blue-800"
      role="status"
      aria-live="polite"
    >
      <span
        className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
        aria-hidden
      />
      {locale === "id"
        ? "AI sedang menganalisis laporan…"
        : "AI is analyzing your report…"}
    </div>
  );
}
