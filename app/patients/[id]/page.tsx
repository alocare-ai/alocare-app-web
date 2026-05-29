"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Spinner,
  useLocale,
} from "@alocare/design-system";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getPatient, getPatientConsultations } from "@/lib/api/patients";

export default function PatientDetailPage() {
  const { locale } = useLocale();
  const params = useParams();
  const patientId = params.id as string;

  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId),
  });

  const { data: consultations } = useQuery({
    queryKey: ["patient-consultations", patientId],
    queryFn: () => getPatientConsultations(patientId),
  });

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppShell>
    );
  }

  if (!patient) {
    return (
      <AppShell>
        <p className="text-slate-600">
          {locale === "id" ? "Pasien tidak ditemukan." : "Patient not found."}
        </p>
      </AppShell>
    );
  }

  const consultationItems =
    (consultations as { items?: Array<{ id: string; chief_complaint: string | null; status: string }> })?.items ?? [];

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <Link
            href="/patients"
            className="text-sm text-blue-600 hover:underline"
          >
            ← {locale === "id" ? "Kembali ke pasien" : "Back to patients"}
          </Link>
          <h1 className="mt-2 font-heading text-2xl font-bold text-slate-900">
            {patient.full_name}
          </h1>
          {patient.mrn ? (
            <p className="text-sm text-slate-600">MRN: {patient.mrn}</p>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-slate-900">
                {locale === "id" ? "Profil" : "Profile"}
              </h2>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <Row label={locale === "id" ? "Tanggal lahir" : "Date of birth"} value={patient.date_of_birth ?? "—"} />
              <Row label={locale === "id" ? "Jenis kelamin" : "Gender"} value={patient.gender ?? "—"} />
              <Row label={locale === "id" ? "Telepon" : "Phone"} value={patient.phone ?? "—"} />
              <Row label={locale === "id" ? "Asuransi" : "Insurance"} value={patient.insurance_provider ?? "—"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-slate-900">
                {locale === "id" ? "Alergi & peringatan" : "Allergies & alerts"}
              </h2>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <Row label={locale === "id" ? "Alergi" : "Allergies"} value={patient.allergies ?? "—"} />
              <Row label={locale === "id" ? "Peringatan medis" : "Medical alerts"} value={patient.medical_alerts ?? "—"} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-sm font-semibold text-slate-900">
                {locale === "id" ? "Konsultasi" : "Consultations"}
              </h2>
            </CardHeader>
            <CardContent>
              {consultationItems.length ? (
                <ul className="divide-y divide-slate-100">
                  {consultationItems.map((c) => (
                    <li key={c.id} className="flex items-center justify-between py-3">
                      <span className="text-sm text-slate-800">
                        {c.chief_complaint ?? (locale === "id" ? "Konsultasi" : "Consultation")}
                      </span>
                      <Link
                        href={`/consultations/${c.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {locale === "id" ? "Buka" : "Open"}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  {locale === "id"
                    ? "Belum ada konsultasi."
                    : "No consultations yet."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
