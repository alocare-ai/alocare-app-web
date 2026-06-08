"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  LanguageSwitcher,
  LoginDivider,
  LoginGoogleButton,
} from "@alocare/design-system";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/hooks/use-locale";
import { login, logout } from "@/lib/api/auth";
import {
  isAuthSessionError,
  profileLoadErrorMessage,
  sessionErrorMessage,
} from "@/lib/auth/session";
import { ApiError } from "@/lib/api/client";
import {
  googleNotLinkedLoginMessage,
  markPendingGoogleConnect,
  shouldPromptGoogleConnect,
} from "@/lib/auth/google-connect-prompt";
import { getPostLoginPath } from "@/lib/auth/post-login";

type PortalLoginFormProps = {
  googleEnabled: boolean;
};

function oauthErrorMessage(locale: "en" | "id", code: string | null): string | null {
  if (!code) return null;
  if (code === "oauth") {
    return locale === "id"
      ? "Login Google gagal. Periksa OAuth redirect URI dan coba lagi."
      : "Google sign-in failed. Check OAuth redirect URIs and try again.";
  }
  if (code === "api") {
    return locale === "id"
      ? "Layanan API belum mendukung login Google portal. Deploy alocare-api terbaru dan set PORTAL_GOOGLE_CLIENT_ID."
      : "The API does not support portal Google login yet. Deploy the latest alocare-api and set PORTAL_GOOGLE_CLIENT_ID.";
  }
  if (code === "google_not_linked") {
    return null;
  }
  if (code === "google_no_account") {
    return locale === "id"
      ? "Tidak ada akun portal untuk email Google ini. Hubungi administrator."
      : "No portal account exists for this Google email. Contact your administrator.";
  }
  if (code === "google_disabled") {
    return locale === "id"
      ? "Login Google dinonaktifkan untuk akun ini. Gunakan email dan kata sandi."
      : "Google sign-in is disabled for this account. Use email and password.";
  }
  if (code === "forbidden") {
    return locale === "id"
      ? "Akun Google ini tidak dapat masuk ke portal."
      : "This Google account cannot sign in to the portal.";
  }
  return null;
}

function noticeMessage(locale: "en" | "id", code: string | null): string | null {
  if (code === "registration_disabled") {
    return locale === "id"
      ? "Pendaftaran mandiri dinonaktifkan. Hubungi administrator untuk akun portal."
      : "Self-registration is disabled. Contact your administrator for a portal account.";
  }
  if (code === "reset") {
    return locale === "id"
      ? "Kata sandi berhasil diperbarui. Silakan masuk."
      : "Password updated successfully. Please sign in.";
  }
  return null;
}

function LoginForm({ googleEnabled }: PortalLoginFormProps) {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";
  const sessionError = searchParams.get("error");
  const notice = searchParams.get("notice") ?? searchParams.get("reset");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [googleNotLinkedHint, setGoogleNotLinkedHint] = useState<{
    title: string;
    body: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionError === "session") {
      void logout();
      setError(sessionErrorMessage(locale, "session"));
      return;
    }
    if (sessionError === "google_not_linked") {
      markPendingGoogleConnect();
      setGoogleNotLinkedHint(googleNotLinkedLoginMessage(locale));
      return;
    }
    const oauthError = oauthErrorMessage(locale, sessionError);
    if (oauthError) {
      setError(oauthError);
      return;
    }
    const noticeText = noticeMessage(
      locale,
      notice === "1" ? "reset" : notice,
    );
    if (noticeText) {
      setInfo(noticeText);
    }
  }, [sessionError, notice, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setGoogleNotLinkedHint(null);
    setLoading(true);
    try {
      await logout();
      const user = await login(email, password);
      queryClient.setQueryData(["me"], user);
      const destination =
        user.role === "PATIENT" ? getPostLoginPath(user, from) : from;
      if (shouldPromptGoogleConnect(user, googleEnabled)) {
        router.push(
          `/connect-google?from=${encodeURIComponent(destination)}`,
        );
      } else {
        router.push(destination);
      }
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError && err.detail && err.status !== 401) {
        setError(err.detail);
      } else if (err instanceof ApiError && err.status === 503) {
        setError(profileLoadErrorMessage(locale));
      } else if (err instanceof ApiError && isAuthSessionError(err)) {
        setError(sessionErrorMessage(locale, "session"));
      } else if (err instanceof ApiError && err.message) {
        setError(err.message);
      } else {
        setError(sessionErrorMessage(locale));
      }
    } finally {
      setLoading(false);
    }
  };

  const title =
    locale === "id" ? "Masuk ke Portal" : "Sign in to Portal";
  const brandSubtitle =
    locale === "id"
      ? "Analisis Laporan Medis Berbasis AI"
      : "Medical AI Report Analysis";

  const googleHref = `/api/auth/google?from=${encodeURIComponent(from)}`;

  const startGoogleSignIn = () => {
    window.location.href = googleHref;
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
          {googleNotLinkedHint ? (
            <div
              className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900"
              role="status"
            >
              <p className="font-medium">{googleNotLinkedHint.title}</p>
              <p className="mt-1 text-blue-800">{googleNotLinkedHint.body}</p>
            </div>
          ) : null}

          {googleEnabled && !googleNotLinkedHint ? (
            <>
              <LoginGoogleButton
                lang={locale}
                loginSize="lg"
                className="w-full"
                onClick={startGoogleSignIn}
              />
              <LoginDivider lang={locale} />
            </>
          ) : null}

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

            {info ? (
              <p className="text-sm text-blue-700" role="status">
                {info}
              </p>
            ) : null}

            {error ? (
              <p className="whitespace-pre-line text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" fullWidth loading={loading} size="lg">
              {locale === "id" ? "Masuk" : "Sign in"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              {locale === "id" ? "Lupa kata sandi?" : "Forgot password?"}
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-slate-600">
            {locale === "id"
              ? "Butuh akun? "
              : "Need an account? "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              {locale === "id" ? "Hubungi kami" : "Contact us"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function PortalLoginForm({ googleEnabled }: PortalLoginFormProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-500">
          Loading…
        </div>
      }
    >
      <LoginForm googleEnabled={googleEnabled} />
    </Suspense>
  );
}
