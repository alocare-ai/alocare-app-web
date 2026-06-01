"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Spinner,
} from "@alocare/design-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ActionPlanPanel } from "@/components/health/action-plan-panel";
import { BiomarkerTrendChart } from "@/components/health/biomarker-trend-chart";
import { ConciergeLevelBadge } from "@/components/health/concierge-level-badge";
import { RiskScoresPanel } from "@/components/health/risk-scores-panel";
import { useLocale } from "@/hooks/use-locale";
import {
  generateActionPlan,
  getHealthIntelligence,
  refreshHealthIntelligence,
} from "@/lib/api/health-intelligence";
import { getPatient } from "@/lib/api/patients";

export default function PatientHealthIntelligencePage() {
  const { locale } = useLocale();
  const params = useParams();
  const patientId = params.id as string;
  const queryClient = useQueryClient();
  const isId = locale === "id";

  const { data: patient } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId),
  });

  const { data: dashboard, isLoading, isError } = useQuery({
    queryKey: ["health-intelligence", patientId, locale],
    queryFn: () => getHealthIntelligence(patientId, locale),
  });

  const refreshMutation = useMutation({
    mutationFn: () => refreshHealthIntelligence(patientId, locale),
    onSuccess: (res) => {
      queryClient.setQueryData(["health-intelligence", patientId, locale], res.dashboard);
    },
  });

  const planMutation = useMutation({
    mutationFn: () => generateActionPlan(patientId, "90_day", locale),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-intelligence", patientId] });
    },
  });

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (isError || !dashboard) {
    return (
      <AppShell>
        <p className="text-slate-600">
          {isId ? "Gagal memuat intelijen kesehatan." : "Failed to load health intelligence."}
        </p>
      </AppShell>
    );
  }

  const profile = dashboard.profile;
  const nutrition =
    dashboard.key_insights.length > 0
      ? dashboard.key_insights
      : [];

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <Link
            href={`/patients/${patientId}`}
            className="text-sm text-blue-600 hover:underline"
          >
            ← {isId ? "Kembali ke profil pasien" : "Back to patient profile"}
          </Link>
          <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900">
                {isId ? "Intelijen Kesehatan Pribadi" : "Personal Health Intelligence"}
              </h1>
              <p className="text-slate-600">
                {patient?.full_name ?? "—"} · {dashboard.report_count}{" "}
                {isId ? "laporan MCU" : "checkup reports"}
              </p>
            </div>
            <ConciergeLevelBadge level={dashboard.concierge_level} locale={locale} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            disabled={refreshMutation.isPending}
            onClick={() => refreshMutation.mutate()}
          >
            {refreshMutation.isPending
              ? isId
                ? "Menganalisis…"
                : "Analyzing…"
              : isId
                ? "Segarkan analisis AI"
                : "Refresh AI analysis"}
          </Button>
          {!dashboard.action_plans.length ? (
            <Button
              variant="secondary"
              disabled={planMutation.isPending}
              onClick={() => planMutation.mutate()}
            >
              {isId ? "Buat program 90 hari" : "Generate 90-day program"}
            </Button>
          ) : null}
          <Link href="/reports/upload">
            <Button variant="secondary">
              {isId ? "Unggah MCU baru" : "Upload new checkup"}
            </Button>
          </Link>
        </div>

        {dashboard.longitudinal_summary ? (
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-slate-900">
                {isId ? "Ringkasan longitudinal" : "Longitudinal summary"}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {dashboard.longitudinal_summary}
              </p>
              {profile?.biological_age != null ? (
                <p className="mt-3 text-sm font-medium text-indigo-700">
                  {isId ? "Usia biologis estimasi" : "Estimated biological age"}:{" "}
                  {profile.biological_age.toFixed(0)} {isId ? "tahun" : "years"}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        {profile ? (
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-slate-900">
                {isId ? "Profil kesehatan (Health Twin)" : "Health profile (digital twin)"}
              </h2>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {profile.bmi != null ? (
                <ProfileRow label="BMI" value={String(profile.bmi)} />
              ) : null}
              {profile.activity_level ? (
                <ProfileRow
                  label={isId ? "Aktivitas" : "Activity"}
                  value={profile.activity_level}
                />
              ) : null}
              {profile.sleep_hours_avg != null ? (
                <ProfileRow
                  label={isId ? "Tidur (jam)" : "Sleep (hrs)"}
                  value={String(profile.sleep_hours_avg)}
                />
              ) : null}
              {profile.family_history ? (
                <div className="sm:col-span-2">
                  <ProfileRow
                    label={isId ? "Riwayat keluarga" : "Family history"}
                    value={profile.family_history}
                  />
                </div>
              ) : null}
              {profile.health_goals ? (
                <div className="sm:col-span-2">
                  <ProfileRow
                    label={isId ? "Tujuan kesehatan" : "Health goals"}
                    value={profile.health_goals}
                  />
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {isId ? "Tren biomarker multi-tahun" : "Multi-year biomarker trends"}
          </h2>
          {dashboard.biomarker_trends.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {dashboard.biomarker_trends.map((trend) => (
                <BiomarkerTrendChart key={trend.code} trend={trend} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              {isId
                ? "Unggah minimal dua MCU untuk melihat tren."
                : "Upload at least two checkups to see trends."}
            </p>
          )}
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              {isId ? "Skor risiko penyakit" : "Disease risk scores"}
            </h2>
            <RiskScoresPanel risks={dashboard.risk_assessments} locale={locale} />
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              {isId ? "Program kesehatan & coaching" : "Health program & coaching"}
            </h2>
            <ActionPlanPanel
              plans={dashboard.action_plans}
              patientId={patientId}
              locale={locale}
            />
          </section>
        </div>

        {nutrition.length > 0 ? (
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-slate-900">
                {isId ? "Insight & nutrisi lokal" : "Insights & local nutrition"}
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
                {nutrition.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}

        <p className="text-xs text-slate-400">
          {isId
            ? "Informasi ini bersifat edukatif dan bukan diagnosis medis. Konsultasikan dengan dokter Anda."
            : "This information is educational and not a medical diagnosis. Consult your physician."}
        </p>
      </div>
    </AppShell>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  );
}
