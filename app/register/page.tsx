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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/hooks/use-locale";
import { register } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

type AccountRole = "PATIENT" | "DOCTOR" | "CLINICIAN";

export default function RegisterPage() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AccountRole>("PATIENT");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title = locale === "id" ? "Buat Akun" : "Create Account";
  const brandSubtitle =
    locale === "id"
      ? "Analisis Laporan Medis Berbasis AI"
      : "Medical AI Report Analysis";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(
        locale === "id"
          ? "Kata sandi tidak cocok."
          : "Passwords do not match.",
      );
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        email,
        password,
        full_name: fullName,
        role,
        language: locale,
      });
      router.push(
        `/verify?email=${encodeURIComponent(result.email)}&registered=1`,
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.detail ?? err.message);
      } else {
        setError(
          locale === "id"
            ? "Pendaftaran gagal. Coba lagi."
            : "Registration failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center overflow-y-auto bg-slate-50 px-4 py-[max(1.5rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:py-10">
      <Card className="relative my-auto w-full max-w-md shadow-lg">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>

        <CardHeader className="flex flex-col items-center border-b-0 px-6 pb-0 pt-12 text-center sm:pt-10">
          <div className="flex justify-center">
            <BrandLogo
              href={undefined}
              size={56}
              showWordmark
              subtitle={brandSubtitle}
            />
          </div>
          <h1 className="mt-3 w-full font-heading text-2xl font-semibold leading-tight tracking-tight text-balance text-slate-900 sm:text-[1.625rem]">
            {title}
          </h1>
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
              type="password"
              label={{ en: "Password", id: "Kata sandi" }}
              lang={locale}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={8}
            />
            <Input
              type="password"
              label={{ en: "Confirm password", id: "Konfirmasi kata sandi" }}
              lang={locale}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={8}
            />

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-slate-700">
                {locale === "id" ? "Jenis akun" : "Account type"}
              </legend>
              <div className="flex flex-col gap-2 sm:flex-row">
                {(
                  [
                    ["PATIENT", locale === "id" ? "Pasien" : "Patient"],
                    ["DOCTOR", locale === "id" ? "Dokter" : "Clinician"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm has-checked:border-teal-600 has-checked:bg-teal-50"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => setRole(value)}
                      className="accent-teal-700"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            {error ? (
              <p className="whitespace-pre-line text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" fullWidth loading={loading} size="lg">
              {locale === "id" ? "Daftar" : "Register"}
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
