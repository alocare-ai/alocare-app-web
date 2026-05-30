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
import { Suspense, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/hooks/use-locale";
import { login, logout } from "@/lib/api/auth";
import { isAuthSessionError, sessionErrorMessage } from "@/lib/auth/session";
import { ApiError } from "@/lib/api/client";

function LoginForm() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";
  const sessionError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionError === "session") {
      void logout();
      setError(sessionErrorMessage(locale, "session"));
    }
  }, [sessionError, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await logout();
      const user = await login(email, password);
      queryClient.setQueryData(["me"], user);
      router.push(from);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError && isAuthSessionError(err)) {
        setError(sessionErrorMessage(locale, "session"));
      } else {
        setError(sessionErrorMessage(locale));
      }
    } finally {
      setLoading(false);
    }
  };

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "https://api.alocare.net";

  const title =
    locale === "id" ? "Masuk ke Portal" : "Sign in to Portal";
  const brandSubtitle =
    locale === "id"
      ? "Analisis Laporan Medis Berbasis AI"
      : "Medical AI Report Analysis";

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
              label={{ en: "Password", id: "Kata Sandi" }}
              lang={locale}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" fullWidth loading={loading} size="lg">
              {locale === "id" ? "Masuk" : "Sign in"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="#"
              className="text-sm text-blue-600 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              {locale === "id" ? "Lupa kata sandi?" : "Forgot password?"}
            </Link>
          </div>

          <div
            className="mt-4 rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left text-sm text-blue-900"
            role="note"
          >
            <p className="font-semibold">
              {locale === "id" ? "Akun demo" : "Demo account"}
            </p>
            <p className="mt-1 text-blue-800">
              doctor@alocare.net / doctor123
            </p>
            {process.env.NODE_ENV === "development" ? (
              <p className="mt-2 text-xs text-blue-700">
                API: {apiUrl}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-500">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
