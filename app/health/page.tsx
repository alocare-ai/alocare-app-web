"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from "@alocare/design-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import {
  getHealthIntelligence,
  refreshHealthIntelligence,
} from "@/lib/api/health-intelligence";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";

export default function HealthPage() {
  const { locale } = useLocale();
  const { data: user } = useAuth();
  const patientId = user?.patient_id ?? user?.patient?.id;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["health-intelligence", patientId, locale],
    queryFn: () => getHealthIntelligence(patientId!, locale),
    enabled: Boolean(patientId),
  });

  const refreshMutation = useMutation({
    mutationFn: () => refreshHealthIntelligence(patientId!, locale),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-intelligence", patientId] });
    },
  });

  if (!patientId) {
    return (
      <AppShell>
        <Card>
          <CardContent className="py-8 text-center text-sm text-slate-600">
            {locale === "id"
              ? "Akun ini tidak terhubung ke profil pasien."
              : "This account is not linked to a patient profile."}
          </CardContent>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">
              {locale === "id" ? "Kesehatan Saya" : "My Health"}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {locale === "id"
                ? "Inteligensi kesehatan personal — timeline, risiko, dan rekomendasi"
                : "Personal health intelligence — timeline, risks, and recommendations"}
            </p>
          </div>
          <Button
            variant="secondary"
            className="cursor-pointer"
            disabled={refreshMutation.isPending}
            onClick={() => refreshMutation.mutate()}
          >
            {refreshMutation.isPending
              ? locale === "id"
                ? "Memperbarui…"
                : "Refreshing…"
              : locale === "id"
                ? "Perbarui analisis"
                : "Refresh analysis"}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="py-6 text-sm text-red-600">
              {locale === "id" ? "Gagal memuat data kesehatan." : "Failed to load health data."}
            </CardContent>
          </Card>
        ) : data ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title={locale === "id" ? "Skor kesehatan" : "Health score"}
                value={data.health_score != null ? String(data.health_score) : "—"}
              />
              <MetricCard
                title={locale === "id" ? "Laporan" : "Reports"}
                value={String(data.report_count)}
              />
              <MetricCard
                title={locale === "id" ? "Level concierge" : "Concierge level"}
                value={`${data.concierge_level}/5`}
              />
              <MetricCard
                title={locale === "id" ? "Peringatan" : "Alerts"}
                value={String(data.early_warnings.length)}
              />
            </div>

            {data.longitudinal_summary ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === "id" ? "Ringkasan longitudinal" : "Longitudinal summary"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {data.longitudinal_summary}
                  </p>
                </CardContent>
              </Card>
            ) : null}

            {data.early_warnings.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === "id" ? "Peringatan dini" : "Early warnings"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {data.early_warnings.map((w) => (
                      <li
                        key={w.code}
                        className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-amber-900"
                      >
                        {w.message}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            {data.risk_assessments.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === "id" ? "Prediksi risiko" : "Risk predictions"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.risk_assessments.slice(0, 6).map((r) => (
                      <div
                        key={r.id}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                      >
                        <p className="font-medium text-slate-900">{r.condition_label}</p>
                        <p className="text-2xl font-bold text-slate-800">{r.score}%</p>
                        <p className="text-xs capitalize text-slate-500">{r.tier}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {data.biomarker_trends.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === "id" ? "Tren biomarker" : "Biomarker trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y divide-slate-100 text-sm">
                    {data.biomarker_trends.map((t) => (
                      <li key={t.code} className="py-3">
                        <div className="flex justify-between font-medium text-slate-900">
                          <span>{t.name}</span>
                          {t.points.length > 0 ? (
                            <span>{t.points[t.points.length - 1].value_text}</span>
                          ) : null}
                        </div>
                        {(locale === "id" ? t.insight_id : t.insight_en) ? (
                          <p className="mt-1 text-slate-600">
                            {locale === "id" ? t.insight_id : t.insight_en}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === "id" ? "Rekomendasi & tindakan" : "Recommendations & actions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {data.ai_recommendations.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-5 text-slate-700">
                    {data.ai_recommendations.map((rec) => (
                      <li key={rec}>{rec}</li>
                    ))}
                  </ul>
                ) : null}
                {data.upcoming_tests.map((t) => (
                  <p key={t} className="text-slate-600">
                    {t}
                  </p>
                ))}
                <Link href="/reports/upload">
                  <Button variant="primary" className="cursor-pointer">
                    {locale === "id" ? "Unggah laporan baru" : "Upload new report"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-slate-600">{title}</p>
        <p className="mt-1 font-heading text-2xl font-bold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}
