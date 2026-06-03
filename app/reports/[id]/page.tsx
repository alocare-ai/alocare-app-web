import { ReportAnalyzingBanner } from "@/components/report-analyzing-banner";
import {
  getReportResultServer,
  getReportServer,
  getServerLocale,
  isReportAnalyzing,
} from "@/lib/api/server-reports";
import { buildReportChatMeta } from "@/lib/report-chat-context";
import { ReportDetailClient } from "./report-detail-client";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportDetailPage({ params }: ReportPageProps) {
  const { id } = await params;
  const locale = await getServerLocale();

  const [report, result] = await Promise.all([
    getReportServer(id),
    getReportResultServer(id),
  ]);

  const analyzing = isReportAnalyzing(report, result);
  const chatMeta = report
    ? buildReportChatMeta(report, result, locale)
    : {
        fileCount: 0,
        hasAnalysis: false,
        hasDocumentText: false,
        contextHint:
          locale === "id"
            ? "Konteks laporan akan tersedia setelah analisis."
            : "Report context will be available after analysis.",
      };

  return (
    <ReportDetailClient
      reportId={id}
      initialReport={report}
      initialResult={result}
      initialAnalyzing={analyzing}
      chatMeta={chatMeta}
      analyzingBanner={
        analyzing ? <ReportAnalyzingBanner locale={locale} /> : null
      }
    />
  );
}
