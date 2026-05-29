"use client";

import { PortalLogin } from "@alocare/design-system";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocale } from "@/hooks/use-locale";
import { login } from "@/lib/api/auth";

function LoginForm() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <PortalLogin
      lang={locale}
      onLocaleChange={setLocale}
      logoSrc="/logo.png"
      showDemoNotes
      onLogin={async ({ identifier, password }) => {
        setError(null);
        setLoading(true);
        try {
          await login(identifier, password);
          await queryClient.invalidateQueries({ queryKey: ["me"] });
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
      }}
      onForgotPassword={() => {}}
      error={error ?? undefined}
      loading={loading}
    />
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
