import { ReportAnalyzingBanner } from "@/components/report-analyzing-banner";
import {
  getReportResultServer,
  getReportServer,
  getServerLocale,
  isReportAnalyzing,
} from "@/lib/api/server-reports";
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

  return (
    <ReportDetailClient
      reportId={id}
      initialReport={report}
      initialResult={result}
      initialAnalyzing={analyzing}
      analyzingBanner={
        analyzing ? <ReportAnalyzingBanner locale={locale} /> : null
      }
    />
  );
}
