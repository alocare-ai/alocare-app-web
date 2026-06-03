"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from "@alocare/design-system";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { apiFetch } from "@/lib/api/client";
import { useLocale } from "@/hooks/use-locale";

interface ReviewQueueItem {
  report_id: string;
  patient_id: string | null;
  title: string;
  status: string;
  risk_indicator: string | null;
  finding_count: number;
  ai_summary_preview: string | null;
}

interface ReviewQueueResponse {
  items: ReviewQueueItem[];
  total: number;
  pending_count: number;
}

export default function ReviewQueuePage() {
  const { locale } = useLocale();
  const { data, isLoading } = useQuery({
    queryKey: ["clinical-review-queue"],
    queryFn: () => apiFetch<ReviewQueueResponse>("/clinical-review/queue"),
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Antrian review klinis" : "Clinical review queue"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {locale === "id"
              ? "Review-first — setujui, ubah, atau tolak temuan AI"
              : "Review-first — approve, modify, or reject AI findings"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "id" ? "Menunggu review" : "Pending review"} (
              {isLoading ? "—" : data?.pending_count ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Spinner />
            ) : data?.items.length ? (
              <ul className="divide-y divide-slate-100">
                {data.items.map((item) => (
                  <li key={item.report_id} className="py-4">
                    <Link
                      href={`/reports/${item.report_id}`}
                      className="block hover:opacity-80"
                    >
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="mt-1 text-xs capitalize text-slate-500">
                        {item.status.replace("_", " ")}
                        {item.risk_indicator
                          ? ` · ${item.risk_indicator.replace("_", " ")}`
                          : ""}
                        {item.finding_count
                          ? ` · ${item.finding_count} findings`
                          : ""}
                      </p>
                      {item.ai_summary_preview ? (
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                          {item.ai_summary_preview}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                {locale === "id" ? "Tidak ada laporan dalam antrian." : "No reports in queue."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
