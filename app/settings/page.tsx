"use client";

import {
  Card,
  CardContent,
  CardHeader,
  LanguageSwitcher,
  useLocale,
} from "@alocare/design-system";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";

export default function SettingsPage() {
  const { locale, setLocale } = useLocale();
  const { data: user } = useAuth();

  const sections = [
    {
      title: locale === "id" ? "Profil" : "Profile",
      content: user ? (
        <dl className="space-y-2 text-sm">
          <Row label="Email" value={user.email} />
          <Row label={locale === "id" ? "Nama" : "Name"} value={user.full_name} />
          <Row label={locale === "id" ? "Peran" : "Role"} value={user.role} />
        </dl>
      ) : null,
    },
    {
      title: locale === "id" ? "Bahasa" : "Language",
      content: <LanguageSwitcher locale={locale} onChange={setLocale} />,
    },
    {
      title: locale === "id" ? "Keamanan" : "Security",
      content: (
        <p className="text-sm text-slate-600">
          {locale === "id"
            ? "Sesi diamankan dengan token JWT httpOnly."
            : "Sessions secured with httpOnly JWT tokens."}
        </p>
      ),
    },
    {
      title: locale === "id" ? "Audit" : "Audit",
      content: (
        <p className="text-sm text-slate-600">
          {locale === "id"
            ? "Log audit tersedia untuk peran admin."
            : "Audit logs available for admin roles."}
        </p>
      ),
    },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Pengaturan" : "Settings"}
          </h1>
        </div>

        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <h2 className="text-sm font-semibold text-slate-900">
                {section.title}
              </h2>
            </CardHeader>
            <CardContent>{section.content}</CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}
