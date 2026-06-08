"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  LanguageSwitcher,
} from "@alocare/design-system";
import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/hooks/use-locale";
import { submitContactUs } from "@/lib/api/contact";
import { ApiError } from "@/lib/api/client";

const ROLE_OPTIONS = [
  { value: "PATIENT", en: "Patient", id: "Pasien" },
  { value: "DOCTOR", en: "Doctor / Clinician", id: "Dokter / Klinisi" },
] as const;

export default function ContactPage() {
  const { locale, setLocale } = useLocale();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [roleInterest, setRoleInterest] = useState("PATIENT");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title = locale === "id" ? "Hubungi kami" : "Contact us";
  const subtitle =
    locale === "id"
      ? "Minta akun portal. Tim kami akan meninjau permintaan Anda dan menghubungi via email."
      : "Request a portal account. Our team will review your request and follow up by email.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const result = await submitContactUs({
        full_name: fullName,
        email,
        message,
        organization: organization.trim() || undefined,
        role_interest: roleInterest,
        language: locale,
      });
      setSuccess(result);
      setFullName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.detail ?? err.message
          : locale === "id"
            ? "Pengiriman gagal. Coba lagi."
            : "Submission failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="relative w-full max-w-lg shadow-lg">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>

        <CardHeader className="flex flex-col items-center border-b-0 px-6 pb-0 pt-12 text-center">
          <BrandLogo href={undefined} size={48} showWordmark />
          <h1 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label={{ en: "Full name", id: "Nama lengkap" }}
              lang={locale}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
            <Input
              type="email"
              label={{ en: "Email", id: "Email" }}
              lang={locale}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              type="text"
              label={{
                en: "Organization (optional)",
                id: "Organisasi (opsional)",
              }}
              lang={locale}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              autoComplete="organization"
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                {locale === "id" ? "Peran yang diminta" : "Requested role"}
              </label>
              <select
                value={roleInterest}
                onChange={(e) => setRoleInterest(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {locale === "id" ? option.id : option.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                {locale === "id" ? "Pesan" : "Message"}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                minLength={10}
                rows={4}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder={
                  locale === "id"
                    ? "Ceritakan kebutuhan Anda…"
                    : "Tell us about your access needs…"
                }
              />
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="text-sm text-green-700" role="status">
                {success}
              </p>
            ) : null}

            <Button type="submit" fullWidth loading={loading} size="lg">
              {locale === "id" ? "Kirim permintaan" : "Submit request"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            {locale === "id" ? "Sudah punya akun? " : "Already have an account? "}
            <Link href="/login" className="text-blue-600 hover:underline">
              {locale === "id" ? "Masuk" : "Sign in"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
