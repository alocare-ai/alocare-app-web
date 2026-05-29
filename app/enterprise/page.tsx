"use client";

import {
  Card,
  CardContent,
  CardHeader,
  EmployeeHealthCard,
  Spinner,
} from "@alocare/design-system";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { useLocale } from "@/hooks/use-locale";
import { getEnterpriseDashboard } from "@/lib/api/enterprise";

export default function EnterprisePage() {
  const { locale } = useLocale();
  const { data, isLoading } = useQuery({
    queryKey: ["enterprise-dashboard"],
    queryFn: getEnterpriseDashboard,
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Dasbor Perusahaan" : "Enterprise Dashboard"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {locale === "id"
              ? "Tren kesehatan karyawan dan skrining"
              : "Employee health trends and screening"}
          </p>
        </div>

        {isLoading ? (
          <Spinner size="lg" />
        ) : data ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title={
                  locale === "id" ? "Jumlah karyawan" : "Workforce count"
                }
                value={String(data.workforce_count)}
              />
              <MetricCard
                title={
                  locale === "id"
                    ? "Skrining selesai"
                    : "Screening completed"
                }
                value={String(data.screening_completed)}
              />
              <MetricCard
                title={locale === "id" ? "Tingkat penyelesaian" : "Completion rate"}
                value={`${Math.round((data.screening_completed / data.workforce_count) * 100)}%`}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {data.trends.map((trend) => (
                <Card key={trend.metric}>
                  <CardContent className="pt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {trend.metric.replace(/_/g, " ")}
                    </p>
                    <p className="mt-2 font-heading text-3xl font-bold text-slate-900">
                      {trend.value}
                      {trend.unit === "percent" ? "%" : ` ${trend.unit}`}
                    </p>
                  </CardContent>
                </Card>
              ))}
              <EmployeeHealthCard
                totalEmployees={data.workforce_count}
                trend={`${data.screening_completed} screened`}
              />
            </div>

            {data.alerts.length ? (
              <Card>
                <CardHeader>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {locale === "id" ? "Peringatan" : "Alerts"}
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {data.alerts.map((alert) => (
                      <li key={alert}>{alert}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
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
        <p className="mt-1 font-heading text-2xl font-bold text-slate-900">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
