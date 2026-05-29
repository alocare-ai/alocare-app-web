"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Spinner,
  Textarea,
} from "@alocare/design-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useLocale } from "@/hooks/use-locale";
import {
  getConsultation,
  submitConsultation,
  updateSoap,
} from "@/lib/api/consultations";

type Tab = "soap" | "medication" | "lab" | "ai" | "history";

export default function ConsultationPage() {
  const { locale } = useLocale();
  const params = useParams();
  const consultationId = params.id as string;
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("soap");

  const [soap, setSoap] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    doctor_notes: "",
  });

  const { data: consultation, isLoading } = useQuery({
    queryKey: ["consultation", consultationId],
    queryFn: () => getConsultation(consultationId),
  });

  useEffect(() => {
    if (consultation) {
      setSoap({
        subjective: consultation.soap_subjective ?? "",
        objective: consultation.soap_objective ?? "",
        assessment: consultation.soap_assessment ?? "",
        plan: consultation.soap_plan ?? "",
        doctor_notes: consultation.doctor_notes ?? "",
      });
    }
  }, [consultation]);

  const saveMutation = useMutation({
    mutationFn: () => updateSoap(consultationId, soap),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["consultation", consultationId],
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: () => submitConsultation(consultationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["consultation", consultationId],
      });
    },
  });

  const tabs: { id: Tab; en: string; idLabel: string }[] = [
    { id: "soap", en: "SOAP", idLabel: "SOAP" },
    { id: "medication", en: "Medication", idLabel: "Obat" },
    { id: "lab", en: "Lab", idLabel: "Lab" },
    { id: "ai", en: "AI", idLabel: "AI" },
    { id: "history", en: "History", idLabel: "Riwayat" },
  ];

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (!consultation) {
    return (
      <AppShell>
        <p className="text-slate-600">
          {locale === "id"
            ? "Konsultasi tidak ditemukan."
            : "Consultation not found."}
        </p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <Link
            href={`/patients/${consultation.patient_id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            ← {locale === "id" ? "Kembali ke pasien" : "Back to patient"}
          </Link>
          <h1 className="mt-2 font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Konsultasi" : "Consultation"}
          </h1>
          <p className="text-sm capitalize text-slate-600">
            {consultation.status.replace("_", " ")}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                tab === t.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {locale === "id" ? t.idLabel : t.en}
            </button>
          ))}
        </div>

        {tab === "soap" ? (
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold">SOAP</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {(
                [
                  ["subjective", "Subjective", "Subjektif"],
                  ["objective", "Objective", "Objektif"],
                  ["assessment", "Assessment", "Penilaian"],
                  ["plan", "Plan", "Rencana"],
                  ["doctor_notes", "Doctor notes", "Catatan dokter"],
                ] as const
              ).map(([key, en, idLabel]) => (
                <Textarea
                  key={key}
                  lang={locale}
                  label={{ en, id: idLabel }}
                  value={soap[key]}
                  onChange={(e) =>
                    setSoap((s) => ({ ...s, [key]: e.target.value }))
                  }
                  rows={3}
                />
              ))}
              <div className="flex gap-3">
                <Button
                  onClick={() => saveMutation.mutate()}
                  loading={saveMutation.isPending}
                >
                  {locale === "id" ? "Simpan" : "Save"}
                </Button>
                <Button
                  variant="success"
                  onClick={() => submitMutation.mutate()}
                  loading={submitMutation.isPending}
                >
                  {locale === "id" ? "Kirim" : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-sm text-slate-500">
              {locale === "id"
                ? `Tab ${tab} — segera hadir.`
                : `${tab} tab — coming soon.`}
              {tab === "ai" && consultation.ai_draft ? (
                <p className="mt-4 text-left text-slate-700">
                  {consultation.ai_draft}
                </p>
              ) : null}
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
