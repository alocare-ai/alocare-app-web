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
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/hooks/use-locale";
import { resetPassword } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

function ResetPasswordForm() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title =
    locale === "id" ? "Atur ulang kata sandi" : "Reset password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError(
        locale === "id"
          ? "Tautan reset tidak valid."
          : "Invalid reset link.",
      );
      return;
    }
    if (password.length < 8) {
      setError(
        locale === "id"
          ? "Kata sandi minimal 8 karakter."
          : "Password must be at least 8 characters.",
      );
      return;
    }
    if (password !== confirm) {
      setError(
        locale === "id"
          ? "Konfirmasi kata sandi tidak cocok."
          : "Passwords do not match.",
      );
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      router.push("/login?reset=1");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.detail ?? err.message
          : locale === "id"
            ? "Reset gagal. Coba lagi."
            : "Reset failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="relative w-full max-w-md shadow-lg">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>

        <CardHeader className="flex flex-col items-center border-b-0 px-6 pb-0 pt-12 text-center">
          <BrandLogo href={undefined} size={48} showWordmark />
          <h1 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            {title}
          </h1>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              label={{ en: "New password", id: "Kata sandi baru" }}
              lang={locale}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <Input
              type="password"
              label={{ en: "Confirm password", id: "Konfirmasi kata sandi" }}
              lang={locale}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" fullWidth loading={loading} size="lg">
              {locale === "id" ? "Simpan kata sandi" : "Save password"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            <Link href="/login" className="text-blue-600 hover:underline">
              {locale === "id" ? "Kembali ke masuk" : "Back to sign in"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-500">
          Loading…
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
