import type { Locale } from "@/hooks/use-locale";
import type { ReportPatientIdentity } from "@/lib/types/api";

export type PatientDisplayField = {
  label: string;
  value: string;
};

/** Map persisted API patient_identity to display rows (no OCR heuristics). */
export function patientIdentityDisplayFields(
  identity: ReportPatientIdentity | null | undefined,
  locale: Locale,
): PatientDisplayField[] {
  if (!identity?.name?.trim()) return [];

  const fields: PatientDisplayField[] = [
    {
      label: locale === "id" ? "Nama pasien" : "Patient name",
      value: identity.name.trim(),
    },
  ];

  if (identity.gender?.trim()) {
    fields.push({
      label: locale === "id" ? "Jenis kelamin" : "Gender",
      value: identity.gender.trim(),
    });
  }

  if (identity.age?.trim()) {
    fields.push({
      label: locale === "id" ? "Usia" : "Age",
      value:
        locale === "id"
          ? `${identity.age} tahun`
          : `${identity.age} years`,
    });
  }

  if (identity.date_of_birth?.trim()) {
    fields.push({
      label: locale === "id" ? "Tanggal lahir" : "Date of birth",
      value: identity.date_of_birth,
    });
  }

  if (identity.medical_record_number?.trim()) {
    fields.push({ label: "MRN", value: identity.medical_record_number.trim() });
  }

  if (identity.hospital?.trim()) {
    fields.push({
      label: locale === "id" ? "Rumah sakit" : "Hospital",
      value: identity.hospital.trim(),
    });
  }

  if (identity.report_type?.trim()) {
    fields.push({
      label: locale === "id" ? "Jenis laporan" : "Report type",
      value: identity.report_type.trim(),
    });
  }

  const fileCount = identity.file_count ?? 0;
  if (fileCount > 1) {
    fields.push({
      label: locale === "id" ? "Berkas dianalisis" : "Files analyzed",
      value: String(fileCount),
    });
  } else if (fileCount === 1) {
    fields.push({
      label: locale === "id" ? "Berkas" : "Source file",
      value: locale === "id" ? "1 berkas" : "1 file",
    });
  }

  return fields;
}

export function patientIdentityPageHeading(
  identity: ReportPatientIdentity | null | undefined,
  locale: Locale,
  fallbackTitle: string,
): { title: string; subtitle: string } {
  if (!identity?.name?.trim()) {
    return {
      title: fallbackTitle.trim() || (locale === "id" ? "Pasien" : "Patient"),
      subtitle: locale === "id" ? "Hasil analisis AI" : "AI analysis result",
    };
  }

  const details: string[] = [];
  if (identity.gender?.trim()) details.push(identity.gender.trim());
  if (identity.age?.trim()) {
    details.push(
      locale === "id" ? `Usia ${identity.age}` : `Age ${identity.age}`,
    );
  }
  const fileCount = identity.file_count ?? 0;
  if (fileCount > 1) {
    details.push(
      locale === "id" ? `${fileCount} berkas` : `${fileCount} files`,
    );
  } else if (identity.report_type?.trim()) {
    details.push(identity.report_type.trim());
  }

  return {
    title: identity.name.trim(),
    subtitle:
      details.length > 0
        ? details.join(" · ")
        : locale === "id"
          ? "Hasil analisis AI"
          : "AI analysis result",
  };
}
