"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
  SystemHealthBadge,
} from "@alocare/design-system";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";
import { getWorklist } from "@/lib/api/patients";

export default function DashboardPage() {
  const { locale } = useLocale();
  const { data: user } = useAuth();
  const { data: worklist, isLoading } = useQuery({
    queryKey: ["worklist"],
    queryFn: getWorklist,
  });

  const pending =
    worklist?.items.filter((i) => i.status === "pending").length ?? 0;
  const inProgress =
    worklist?.items.filter((i) => i.status === "in_progress").length ?? 0;

  const quickActions = [
    {
      href: "/reports/upload",
      en: "Upload report",
      id: "Unggah laporan",
    },
    { href: "/chat", en: "Ask AI", id: "Tanya AI" },
    {
      href: "/telemedicine/new",
      en: "Start consultation",
      id: "Mulai konsultasi",
    },
    { href: "/patients", en: "View patients", id: "Lihat pasien" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Dasbor" : "Dashboard"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {user
              ? locale === "id"
                ? `Selamat datang, ${user.full_name}`
                : `Welcome back, ${user.full_name}`
              : null}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title={locale === "id" ? "Menunggu review" : "Pending review"}
            value={isLoading ? "—" : String(pending)}
          />
          <MetricCard
            title={locale === "id" ? "Sedang diproses" : "In progress"}
            value={isLoading ? "—" : String(inProgress)}
          />
          <MetricCard
            title={locale === "id" ? "Item worklist" : "Worklist items"}
            value={isLoading ? "—" : String(worklist?.total ?? 0)}
          />
          <MetricCard
            title={locale === "id" ? "Peran" : "Role"}
            value={user?.role ?? "—"}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "id" ? "Aksi cepat" : "Quick actions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button variant="secondary" className="cursor-pointer">
                  {locale === "id" ? action.id : action.en}
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "id" ? "Aktivitas terbaru" : "Recent activity"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Spinner />
            ) : worklist?.items.length ? (
              <ul className="divide-y divide-slate-100">
                {worklist.items.slice(0, 5).map((item) => (
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
            ) : (
              <p className="text-sm text-slate-500">
                {locale === "id"
                  ? "Belum ada aktivitas."
                  : "No recent activity yet."}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <SystemHealthBadge variant="privacy" />
          <SystemHealthBadge variant="encryption" />
        </div>
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
