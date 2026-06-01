"use client";

import { Button, Spinner } from "@alocare/design-system";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PatientAccountCard } from "@/components/patient-account-card";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";

/** Patient home: login-linked record and shortcuts to health features. */
export default function MyHealthPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const { data: user, isLoading } = useAuth();
  const isId = locale === "id";

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (!user) {
    return null;
  }

  if (user.role !== "PATIENT") {
    router.replace("/dashboard");
    return null;
  }

  const healthHref = user.patient_id
    ? `/patients/${user.patient_id}/health`
    : "/settings";

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {isId ? "Portal Pasien Saya" : "My Patient Portal"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {isId
              ? "Detail login dan rekam medis Anda"
              : "Your login and linked medical record"}
          </p>
        </div>

        <PatientAccountCard user={user} locale={locale} />

        <div className="flex flex-wrap gap-3">
          <Link href={healthHref}>
            <Button variant="primary">
              {isId ? "Intelijen kesehatan" : "Health intelligence"}
            </Button>
          </Link>
          <Link href="/reports/upload">
            <Button variant="secondary">
              {isId ? "Unggah laporan MCU" : "Upload checkup report"}
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="secondary">
              {isId ? "Chat AI" : "AI chat"}
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost">
              {isId ? "Pengaturan" : "Settings"}
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
