"use client";

import { LoginGoogleButton } from "@alocare/design-system";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import type { Locale } from "@/hooks/use-locale";

type GoogleConnectCardProps = {
  locale: Locale;
  googleEnabled: boolean;
};

export function GoogleConnectCard({
  locale,
  googleEnabled,
}: GoogleConnectCardProps) {
  const { data: user, refetch } = useAuth();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const googleStatus = searchParams.get("google");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (googleStatus === "linked") {
      setStatusMessage(
        locale === "id"
          ? "Google berhasil terhubung. Anda dapat masuk dengan Google di lain waktu."
          : "Google connected successfully. You can sign in with Google next time.",
      );
      void refetch();
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    } else if (googleStatus === "error") {
      setStatusMessage(
        locale === "id"
          ? "Gagal menghubungkan Google. Pastikan email Google sama dengan akun portal."
          : "Could not connect Google. Ensure your Google email matches your portal account.",
      );
    }
  }, [googleStatus, locale, refetch, queryClient]);

  if (!googleEnabled || !user) {
    return null;
  }

  const linked = Boolean(user.google_linked);
  const disabled = Boolean(user.google_sign_in_disabled);

  const connectHref = "/api/auth/google?mode=link";

  return (
    <div className="space-y-3">
      {linked ? (
        <p className="text-sm text-green-700">
          {locale === "id"
            ? "Google terhubung ke akun ini."
            : "Google is connected to this account."}
        </p>
      ) : disabled ? (
        <p className="text-sm text-amber-700">
          {locale === "id"
            ? "Login Google dinonaktifkan oleh administrator."
            : "Google sign-in was disabled by an administrator."}
        </p>
      ) : (
        <>
          <p className="text-sm text-slate-600">
            {locale === "id"
              ? "Hubungkan Google untuk masuk dengan tombol Google di halaman login."
              : "Connect Google to sign in with the Google button on the login page."}
          </p>
          <LoginGoogleButton
            lang={locale}
            loginSize="md"
            className="w-full max-w-sm"
            onClick={() => {
              window.location.href = connectHref;
            }}
          />
        </>
      )}

      {statusMessage ? (
        <p className="text-sm text-slate-700" role="status">
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
