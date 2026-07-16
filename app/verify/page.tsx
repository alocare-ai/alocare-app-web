"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  LanguageSwitcher,
} from "@alocare/design-system";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/hooks/use-locale";
import { resendVerification, verifyEmail } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

function VerifyContent() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const justRegistered = searchParams.get("registered") === "1";

  const [status, setStatus] = useState<"pending" | "success" | "error">(
    token ? "pending" : justRegistered ? "success" : "error",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const brandSubtitle =
    locale === "id"
      ? "Analisis Laporan Medis Berbasis AI"
      : "Medical AI Report Analysis";

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const msg = await verifyEmail(token);
        if (!cancelled) {
          setStatus("success");
          setMessage(msg);
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setMessage(
            err instanceof ApiError
              ? (err.detail ?? err.message)
              : locale === "id"
                ? "Verifikasi gagal."
                : "Verification failed.",
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, locale]);

  const pendingMessage =
    locale === "id"
      ? "Memverifikasi email Anda…"
      : "Verifying your email…";

  const registeredMessage =
    locale === "id"
      ? "Pendaftaran berhasil. Periksa email Anda dan klik tautan verifikasi untuk mengaktifkan akun."
      : "Registration successful. Check your email and click the verification link to activate your account.";

  const successMessage =
    message ??
    (locale === "id"
      ? "Email berhasil diverifikasi. Kembali ke aplikasi Alocare dan masuk lagi."
      : "Email verified successfully. Return to the Alocare app and sign in again.");

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      const msg = await resendVerification(email, locale);
      setMessage(msg);
      setStatus("success");
    } catch (err) {
      setMessage(
        err instanceof ApiError
          ? (err.detail ?? err.message)
          : locale === "id"
            ? "Gagal mengirim ulang email."
            : "Could not resend email.",
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center overflow-y-auto bg-slate-50 px-4 py-10">
      <Card className="relative w-full max-w-md shadow-lg">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>

        <CardHeader className="flex flex-col items-center border-b-0 px-6 pb-0 pt-12 text-center sm:pt-10">
          <BrandLogo href={undefined} size={56} showWordmark subtitle={brandSubtitle} />
          <h1 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            {locale === "id" ? "Verifikasi Email" : "Email Verification"}
          </h1>
        </CardHeader>

        <CardContent className="space-y-4 pt-4 text-center">
          {status === "pending" ? (
            <p className="text-sm text-slate-600">{pendingMessage}</p>
          ) : null}

          {status === "success" ? (
            <p className="text-sm text-teal-800" role="status">
              {token ? successMessage : registeredMessage}
            </p>
          ) : null}

          {status === "error" ? (
            <p className="text-sm text-red-600" role="alert">
              {message ??
                (locale === "id"
                  ? "Tautan verifikasi tidak valid."
                  : "Invalid verification link.")}
            </p>
          ) : null}

          {status === "success" && token ? (
            <p className="text-sm text-slate-600">
              {locale === "id"
                ? "Anda dapat menutup halaman ini dan membuka kembali aplikasi."
                : "You can close this page and open the app again."}
            </p>
          ) : null}

          {status === "success" ? (
            <Button fullWidth size="lg" onClick={() => router.push("/login")}>
              {locale === "id"
                ? token
                  ? "Buka portal web (opsional)"
                  : "Masuk"
                : token
                  ? "Open web portal (optional)"
                  : "Sign in"}
            </Button>
          ) : null}

          {status === "error" && email ? (
            <Button fullWidth loading={resending} onClick={handleResend}>
              {locale === "id"
                ? "Kirim ulang email verifikasi"
                : "Resend verification email"}
            </Button>
          ) : null}

          {status !== "success" ? (
            <Link href="/login" className="block text-sm text-blue-600 hover:underline">
              {locale === "id" ? "Kembali ke masuk" : "Back to sign in"}
            </Link>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-500">
          Loading…
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
