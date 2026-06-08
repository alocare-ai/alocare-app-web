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
import { requestPasswordReset } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

export default function ForgotPasswordPage() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title =
    locale === "id" ? "Lupa kata sandi" : "Forgot password";
  const subtitle =
    locale === "id"
      ? "Masukkan email akun Anda. Kami akan mengirim tautan reset jika akun ada."
      : "Enter your account email. We will send a reset link if an account exists.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const result = await requestPasswordReset(email, locale);
      setMessage(result);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.detail ?? err.message
          : locale === "id"
            ? "Permintaan gagal. Coba lagi."
            : "Request failed. Please try again.",
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
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label={{ en: "Email", id: "Email" }}
              lang={locale}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            {message ? (
              <p className="text-sm text-green-700" role="status">
                {message}
              </p>
            ) : null}

            <Button type="submit" fullWidth loading={loading} size="lg">
              {locale === "id" ? "Kirim tautan reset" : "Send reset link"}
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
