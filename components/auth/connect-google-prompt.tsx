"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  LanguageSwitcher,
  LoginGoogleButton,
} from "@alocare/design-system";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BrandLogo } from "@/components/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";
import {
  clearPendingGoogleConnect,
  dismissGoogleConnectPrompt,
  hasPendingGoogleConnect,
} from "@/lib/auth/google-connect-prompt";

type ConnectGooglePromptProps = {
  googleEnabled: boolean;
};

function ConnectGooglePromptInner({ googleEnabled }: ConnectGooglePromptProps) {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";
  const googleStatus = searchParams.get("google");
  const { data: user, isLoading, refetch } = useAuth();
  const queryClient = useQueryClient();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (googleStatus === "linked") {
      clearPendingGoogleConnect();
      setStatusMessage(
        locale === "id"
          ? "Google berhasil terhubung. Mengalihkan…"
          : "Google connected successfully. Redirecting…",
      );
      void refetch();
      void queryClient.invalidateQueries({ queryKey: ["me"] });
      const timer = window.setTimeout(() => {
        router.replace(from);
      }, 1500);
      return () => window.clearTimeout(timer);
    }
    if (googleStatus === "error") {
      setStatusMessage(
        locale === "id"
          ? "Gagal menghubungkan Google. Pastikan email Google sama dengan akun portal."
          : "Could not connect Google. Ensure your Google email matches your portal account.",
      );
    }
  }, [googleStatus, locale, from, router, refetch, queryClient]);

  useEffect(() => {
    if (isLoading || googleStatus === "linked") return;

    if (!user) {
      router.replace(`/login?from=${encodeURIComponent(from)}`);
      return;
    }

    if (!hasPendingGoogleConnect() && googleStatus !== "error") {
      router.replace(from);
      return;
    }

    if (user.google_linked || user.google_sign_in_disabled || !googleEnabled) {
      clearPendingGoogleConnect();
      router.replace(from);
    }
  }, [user, isLoading, googleEnabled, from, router, googleStatus]);

  const handleSkip = () => {
    if (user) {
      dismissGoogleConnectPrompt(user.id);
    } else {
      clearPendingGoogleConnect();
    }
    router.push(from);
    router.refresh();
  };

  const connectReturnPath = `/connect-google?from=${encodeURIComponent(from)}`;
  const connectHref = `/api/auth/google?mode=link&from=${encodeURIComponent(connectReturnPath)}`;

  const title =
    locale === "id" ? "Hubungkan Google?" : "Connect Google?";
  const body =
    locale === "id"
      ? "Anda baru saja mencoba masuk dengan Google. Hubungkan akun Google Anda ke portal ini agar bisa masuk dengan satu klik di lain waktu."
      : "You just tried to sign in with Google. Connect your Google account to this portal so you can use one-click sign-in next time.";
  const skipLabel = locale === "id" ? "Lewati untuk sekarang" : "Skip for now";
  const settingsHint =
    locale === "id"
      ? "Anda dapat menghubungkan Google nanti di Pengaturan."
      : "You can connect Google later in Settings.";

  if (isLoading || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-slate-500">
        {locale === "id" ? "Memuat…" : "Loading…"}
      </div>
    );
  }

  if (user.google_linked && googleStatus !== "linked") {
    return (
      <div className="flex min-h-dvh items-center justify-center text-slate-500">
        {locale === "id" ? "Memuat…" : "Loading…"}
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center overflow-y-auto bg-slate-50 px-4 py-[max(1.5rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:py-10">
      <Card className="relative my-auto w-full max-w-md shadow-lg">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>

        <CardHeader className="flex flex-col items-center border-b-0 px-6 pb-0 pt-12 text-center sm:pt-10">
          <div className="flex justify-center">
            <BrandLogo href={undefined} size={56} showWordmark />
          </div>
          <h1 className="mt-3 w-full font-heading text-2xl font-semibold leading-tight tracking-tight text-balance text-slate-900 sm:text-[1.625rem]">
            {title}
          </h1>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <p className="text-sm text-slate-600">{body}</p>

          {statusMessage ? (
            <p
              className={`text-sm ${googleStatus === "error" ? "text-red-600" : "text-green-700"}`}
              role="status"
            >
              {statusMessage}
            </p>
          ) : null}

          {googleEnabled && googleStatus !== "linked" ? (
            <LoginGoogleButton
              lang={locale}
              loginSize="lg"
              className="w-full"
              onClick={() => {
                window.location.href = connectHref;
              }}
            />
          ) : null}

          <Button
            type="button"
            variant="secondary"
            fullWidth
            size="lg"
            onClick={handleSkip}
            disabled={googleStatus === "linked"}
          >
            {skipLabel}
          </Button>

          <p className="text-center text-xs text-slate-500">{settingsHint}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function ConnectGooglePrompt(props: ConnectGooglePromptProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-500">
          Loading…
        </div>
      }
    >
      <ConnectGooglePromptInner {...props} />
    </Suspense>
  );
}
