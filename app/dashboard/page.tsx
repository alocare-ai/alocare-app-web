"use client";

import {
  Button,
  Card,
  CardContent,
  Spinner,
} from "@alocare/design-system";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PatientAccountCard } from "@/components/patient-account-card";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";
import { getWorklist } from "@/lib/api/patients";

export default function DashboardPage() {
  const { locale } = useLocale();
  const { data: user } = useAuth();
  const isPatient = user?.role === "PATIENT";
  const { data: worklist, isLoading } = useQuery({
    queryKey: ["worklist"],
    queryFn: getWorklist,
    enabled: !isPatient,
  });

  const pending =
    worklist?.items.filter((i) => i.status === "pending").length ?? 0;
  const inProgress =
    worklist?.items.filter((i) => i.status === "in_progress").length ?? 0;

  const quickActions = isPatient
    ? [
        { href: "/my-health", en: "My health", id: "Kesehatan saya" },
        {
          href: user?.patient_id
            ? `/patients/${user.patient_id}/health`
            : "/my-health",
          en: "Health insights",
          id: "Wawasan kesehatan",
        },
        { href: "/reports/upload", en: "Upload report", id: "Unggah laporan" },
        { href: "/chat", en: "Ask AI", id: "Tanya AI" },
      ]
    : [
        { href: "/review", en: "Review queue", id: "Antrian review" },
        { href: "/patients", en: "Patients", id: "Pasien" },
        { href: "/reports/upload", en: "Upload report", id: "Unggah laporan" },
        { href: "/chat", en: "Ask AI", id: "Tanya AI" },
      ];

  const recentItems = worklist?.items.slice(0, 5) ?? [];

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {user
              ? locale === "id"
                ? `Selamat datang, ${user.full_name}`
                : `Welcome back, ${user.full_name}`
              : locale === "id"
                ? "Dasbor"
                : "Dashboard"}
          </h1>
          {!isPatient ? (
            <p className="mt-1 text-sm text-slate-600">
              {locale === "id"
                ? "Ringkasan worklist dan aksi cepat."
                : "Your worklist summary and quick actions."}
            </p>
          ) : null}
        </div>

        {isPatient && user ? (
          <PatientAccountCard user={user} locale={locale} compact />
        ) : null}

        {!isPatient ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              title={locale === "id" ? "Menunggu review" : "Pending review"}
              value={isLoading ? "—" : String(pending)}
            />
            <MetricCard
              title={locale === "id" ? "Sedang diproses" : "In progress"}
              value={isLoading ? "—" : String(inProgress)}
            />
            <MetricCard
              title={locale === "id" ? "Total worklist" : "Total worklist"}
              value={isLoading ? "—" : String(worklist?.total ?? 0)}
            />
          </div>
        ) : null}

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {locale === "id" ? "Aksi cepat" : "Quick actions"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button
                  variant="secondary"
                  className="h-auto w-full cursor-pointer justify-center px-4 py-3"
                >
                  {locale === "id" ? action.id : action.en}
                </Button>
              </Link>
            ))}
          </div>
        </section>

        {!isPatient && !isLoading && recentItems.length > 0 ? (
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {locale === "id" ? "Aktivitas terbaru" : "Recent activity"}
              </h2>
              <ul className="divide-y divide-slate-100">
                {recentItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span className="font-medium text-slate-900">
                      {item.title}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
                      {item.status.replace("_", " ")}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}

        {!isPatient && isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
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
        <p className="mt-1 font-heading text-3xl font-bold text-slate-900">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
