"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  LanguageSwitcher,
  useLocale,
} from "@alocare/design-system";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { login } from "@/lib/api/auth";

function LoginForm() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push(from);
      router.refresh();
    } catch {
      setError(
        locale === "id"
          ? "Email atau kata sandi tidak valid"
          : "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-2 text-2xl font-semibold tracking-tight">
            alocare<span className="text-emerald-600">.ai</span>
          </div>
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            {locale === "id" ? "Masuk ke Portal" : "Sign in to Portal"}
          </h2>
          <p className="text-sm text-slate-600">
            {locale === "id"
              ? "Akses aman untuk tenaga medis dan pasien"
              : "Secure access for clinicians and patients"}
          </p>
        </CardHeader>
        <CardContent>
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

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <Link
              href="#"
              className="text-sm text-blue-600 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              {locale === "id" ? "Lupa kata sandi?" : "Forgot password?"}
            </Link>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Demo: doctor@alocare.net / doctor123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-slate-500">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
