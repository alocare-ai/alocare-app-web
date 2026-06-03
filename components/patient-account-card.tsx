"use client";

import { Card, CardContent, CardHeader } from "@alocare/design-system";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { UserProfile } from "@/lib/types/api";

type Props = {
  user: UserProfile;
  locale: Locale;
  showLoginMeta?: boolean;
  compact?: boolean;
};

export function PatientAccountCard({
  user,
  locale,
  showLoginMeta = true,
  compact = false,
}: Props) {
  const isId = locale === "id";
  const patient = user.patient;

  if (user.role !== "PATIENT") {
    return null;
  }

  return (
    <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white">
      <CardHeader className={compact ? "pb-2" : undefined}>
        <h2 className="text-sm font-semibold text-slate-900">
          {isId ? "Akun pasien Anda" : "Your patient account"}
        </h2>
        {showLoginMeta ? (
          <p className="text-xs text-slate-500">
            {isId ? "Detail login portal pasien" : "Patient portal login details"}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className={`space-y-4 text-sm ${compact ? "pt-0" : ""}`}>
        {showLoginMeta ? (
          <dl className="grid gap-2 sm:grid-cols-2">
            <Detail label="Email" value={user.email} />
            <Detail
              label={isId ? "Nama akun" : "Account name"}
              value={user.full_name}
            />
            <Detail label={isId ? "Peran" : "Role"} value="PATIENT" />
            {user.patient_id ? (
              <Detail
                label={isId ? "ID pasien" : "Patient ID"}
                value={user.patient_id}
                mono
              />
            ) : null}
          </dl>
        ) : null}

        {patient ? (
          <>
            {showLoginMeta ? (
              <hr className="border-indigo-100" />
            ) : null}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-indigo-700">
                {isId ? "Rekam medis terhubung" : "Linked medical record"}
              </p>
              <dl className="grid gap-2 sm:grid-cols-2">
                <Detail
                  label={isId ? "Nama pasien" : "Patient name"}
                  value={patient.full_name}
                />
                {patient.mrn ? (
                  <Detail label="MRN" value={patient.mrn} mono />
                ) : null}
                {patient.date_of_birth ? (
                  <Detail
                    label={isId ? "Tanggal lahir" : "Date of birth"}
                    value={patient.date_of_birth}
                  />
                ) : null}
                {patient.gender ? (
                  <Detail
                    label={isId ? "Jenis kelamin" : "Gender"}
                    value={patient.gender}
                  />
                ) : null}
                {patient.phone ? (
                  <Detail
                    label={isId ? "Telepon" : "Phone"}
                    value={patient.phone}
                  />
                ) : null}
                {patient.insurance_provider ? (
                  <Detail
                    label={isId ? "Asuransi" : "Insurance"}
                    value={patient.insurance_provider}
                  />
                ) : null}
              </dl>
              {patient.allergies ? (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-amber-900">
                  <span className="font-medium">
                    {isId ? "Alergi: " : "Allergies: "}
                  </span>
                  {patient.allergies}
                </p>
              ) : null}
              {patient.medical_alerts ? (
                <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-red-900">
                  <span className="font-medium">
                    {isId ? "Peringatan: " : "Alerts: "}
                  </span>
                  {patient.medical_alerts}
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <p className="text-slate-600">
            {isId
              ? "Akun pasien belum terhubung ke rekam medis. Hubungi klinik Anda."
              : "This login is not linked to a medical record yet. Contact your clinic."}
          </p>
        )}

        {user.patient_id ? (
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/my-health"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
            >
              {isId ? "Intelijen kesehatan" : "Health intelligence"}
            </Link>
            <Link
              href="/reports/upload"
              className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50"
            >
              {isId ? "Unggah MCU" : "Upload checkup"}
            </Link>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Detail({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd
        className={`font-medium text-slate-900 ${mono ? "font-mono text-xs break-all" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
