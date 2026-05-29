"use client";

import { Spinner } from "@alocare/design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { useLocale } from "@/hooks/use-locale";
import { getTelemedicineSession } from "@/lib/api/telemedicine";

export default function TelemedicineSessionPage() {
  const { locale } = useLocale();
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const { data: session, isLoading, isError } = useQuery({
    queryKey: ["telemedicine", sessionId],
    queryFn: () => getTelemedicineSession(sessionId),
    enabled: sessionId !== "new",
  });

  useEffect(() => {
    if (sessionId === "new") {
      router.replace("/patients");
    }
  }, [sessionId, router]);

  if (sessionId === "new") {
    return (
      <AppShell>
        <Spinner size="lg" />
      </AppShell>
    );
  }

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (isError || !session) {
    return (
      <AppShell>
        <p className="text-slate-600">
          {locale === "id"
            ? "Sesi telemedisin tidak ditemukan."
            : "Telemedicine session not found."}
        </p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-slate-900 p-8 text-center text-white">
          <p className="text-sm text-slate-300">
            {locale === "id" ? "Video konsultasi" : "Video consultation"}
          </p>
          <div className="mt-8 flex aspect-video items-center justify-center rounded-lg bg-slate-800">
            <span className="text-slate-400">
              {locale === "id" ? "Feed video" : "Video feed"}
            </span>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Session: {session.id} · {session.status}
          </p>
        </section>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {locale === "id" ? "Transkrip" : "Transcript"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {locale === "id"
                ? "Transkrip real-time akan muncul di sini."
                : "Real-time transcript will appear here."}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {locale === "id" ? "Ringkasan AI" : "AI summary"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {locale === "id"
                ? "Ringkasan konsultasi dihasilkan AI setelah sesi."
                : "AI-generated consultation summary after session."}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {locale === "id" ? "Catatan" : "Notes"}
            </h2>
            <textarea
              className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm"
              rows={4}
              placeholder={
                locale === "id" ? "Catatan klinis…" : "Clinical notes…"
              }
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
