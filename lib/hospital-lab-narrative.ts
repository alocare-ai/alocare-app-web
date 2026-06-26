import type { Locale } from "@/lib/i18n";
import type { ReportPatientIdentity } from "@/lib/types/api";

export type HospitalLabContext = {
  patientName?: string;
  gender?: string;
  dateOfBirth?: string;
  doctor?: string;
  labNumber?: string;
  medicalRecordNumber?: string;
  department?: string;
  orderDate?: string;
  reportDate?: string;
  validator?: string;
  hospital?: string;
};

function pickField(text: string, patterns: RegExp[]): string | undefined {
  for (const re of patterns) {
    const match = text.match(re);
    const value = match?.[1]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function isHospitalLabReport(text: string): boolean {
  const normalized = text.replace(/\s+/g, " ");
  if (
    /namapasien|no\.?\s*lab\b|no\.?\s*rm\b|jenis\s*kelamin|tgl\.?\s*order|tgl\.?\s*terima\s*sample/i.test(
      normalized,
    )
  ) {
    return true;
  }
  return (
    /rumah\s*sakit|hospitalgroup|hospital\b/i.test(normalized) &&
    /(?:dokter|doctor|laboratorium|laboratory|\blab\b)/i.test(normalized)
  );
}

export function extractHospitalLabContext(text: string): HospitalLabContext {
  const ctx: HospitalLabContext = {};

  ctx.patientName = pickField(text, [
    /Nama\s*Pasien\s*[：:]\s*([A-Z][A-Za-z\s.'-]{2,48})/i,
    /(?:Name|Nama)\s*[：:]\s*([A-Za-z][A-Za-z\s.'-]{2,48})/i,
  ]);
  ctx.gender = pickField(text, [
    /Jenis\s*Kelamin\s*[：:]\s*(\w+)/i,
    /(?:Gender|Sex)\s*[：:]\s*(\w+)/i,
  ]);
  ctx.dateOfBirth = pickField(text, [
    /Tgl\.?\s*Lahir\s*[：:]\s*(\d{2}[-/]\d{2}[-/]\d{4})/i,
    /(?:DOB|Date\s+of\s+Birth)\s*[：:]\s*(\d{2,4}[-/]\d{2}[-/]\d{4})/i,
  ]);
  ctx.doctor = pickField(text, [
    /Dokter\s*[：:]\s*(DR\.?\s*[A-Za-z\s.]+?)(?=\s*(?:Tgl|No\.|Ruangan|$))/i,
    /(?:Doctor|Physician)\s*[：:]\s*(.+?)(?=\s*(?:Tgl|Order|$))/i,
  ]);
  ctx.labNumber = pickField(text, [/No\.?\s*Lab\s*[：:]\s*(\S+)/i]);
  ctx.medicalRecordNumber = pickField(text, [/No\.?\s*RM\s*[：:]\s*(\S+)/i]);
  ctx.department = pickField(text, [/Ruangan\s*[：:]\s*(.+?)(?=\s*Tgl|$)/i]);
  ctx.orderDate = pickField(text, [
    /Tgl\.?\s*Order\s*[：:]\s*([\d\-/:\s]{8,20})/i,
  ]);
  ctx.reportDate = pickField(text, [
    /Tgl\.?\s*Pelaporan\s*[：:]\s*([\d\-/:\s]{8,20})/i,
  ]);
  ctx.validator = pickField(text, [
    /Validator\s*[：:]\s*([A-Za-z\s.]+?)(?=\s*Tgl|$)/i,
  ]);

  const mandaya = text.match(
    /mandaya\s+royal\s+hospital\s+([A-Za-z]+)/i,
  )?.[0];
  if (mandaya) {
    ctx.hospital = mandaya.replace(/\s+/g, " ").trim();
  } else {
    const hospitalName = text.match(
      /(?:RS|Rumah\s+Sakit)\s+([A-Za-z0-9\s]+)/i,
    )?.[0];
    if (hospitalName) ctx.hospital = hospitalName.trim();
  }

  return ctx;
}

function mergeHospitalContext(
  fromText: HospitalLabContext,
  identity?: ReportPatientIdentity | null,
): HospitalLabContext {
  if (!identity) return fromText;
  return {
    patientName:
      fromText.patientName ||
      identity.name?.trim() ||
      undefined,
    gender: fromText.gender || identity.gender?.trim() || undefined,
    dateOfBirth:
      fromText.dateOfBirth ||
      identity.date_of_birth?.trim() ||
      identity.dateOfBirth?.trim() ||
      undefined,
    medicalRecordNumber:
      fromText.medicalRecordNumber ||
      identity.medical_record_number?.trim() ||
      identity.medicalRecordNumber?.trim() ||
      undefined,
    hospital: fromText.hospital || identity.hospital?.trim() || undefined,
    doctor: fromText.doctor,
    labNumber: fromText.labNumber,
    department: fromText.department,
    orderDate: fromText.orderDate || identity.report_date?.trim() || identity.reportDate?.trim() || undefined,
    reportDate: fromText.reportDate,
    validator: fromText.validator,
  };
}

export function buildHospitalLabNarrative(
  text: string,
  locale: Locale,
  identity?: ReportPatientIdentity | null,
): string {
  const ctx = mergeHospitalContext(extractHospitalLabContext(text), identity);
  const patient =
    ctx.patientName || (locale === "id" ? "pasien" : "the patient");

  const patientDetails: string[] = [];
  if (ctx.gender) {
    patientDetails.push(
      locale === "id" ? ctx.gender.toLowerCase() : ctx.gender.toLowerCase(),
    );
  }
  if (ctx.dateOfBirth) {
    patientDetails.push(
      locale === "id"
        ? `lahir ${ctx.dateOfBirth}`
        : `DOB ${ctx.dateOfBirth}`,
    );
  } else if (identity?.age?.trim()) {
    patientDetails.push(
      locale === "id"
        ? `${identity.age} tahun`
        : `${identity.age} years`,
    );
  }

  const patientDesc =
    patientDetails.length > 0
      ? `${patient} (${patientDetails.join(", ")})`
      : patient;

  const facility = [ctx.hospital, ctx.department].filter(Boolean).join(", ");

  if (locale === "id") {
    const parts = [`Laporan laboratorium untuk ${patientDesc}.`];
    if (facility) parts.push(`Fasilitas: ${facility}.`);
    if (ctx.orderDate) parts.push(`Pesanan pada ${ctx.orderDate.trim()}.`);
    if (ctx.doctor) parts.push(`Dokter penanggung jawab: ${ctx.doctor}.`);
    if (ctx.labNumber) parts.push(`No. lab: ${ctx.labNumber}.`);
    if (ctx.medicalRecordNumber) parts.push(`No. RM: ${ctx.medicalRecordNumber}.`);
    if (ctx.validator) parts.push(`Validator: ${ctx.validator}.`);
    parts.push(
      "Nilai lengkap perlu ditafsirkan dokter bersama riwayat medis dan gejala pasien.",
    );
    return (
      `${parts.join(" ")}\n\n` +
      "Diskusikan hasil dengan pasien dan rencanakan tindak lanjut sesuai pedoman klinis."
    );
  }

  const parts = [`Laboratory report for ${patientDesc}.`];
  if (facility) parts.push(`Facility: ${facility}.`);
  if (ctx.orderDate) parts.push(`Ordered on ${ctx.orderDate.trim()}.`);
  if (ctx.doctor) parts.push(`Ordering physician: ${ctx.doctor}.`);
  if (ctx.labNumber) parts.push(`Lab no. ${ctx.labNumber}.`);
  if (ctx.medicalRecordNumber) parts.push(`MRN ${ctx.medicalRecordNumber}.`);
  if (ctx.validator) parts.push(`Validated by ${ctx.validator}.`);
  parts.push(
    "Complete values should be interpreted with medical history, symptoms, and treatment goals.",
  );
  return (
    `${parts.join(" ")}\n\n` +
    "Discuss results with the patient and plan appropriate follow-up."
  );
}

export function buildClinicalFromPatientIdentity(
  identity: ReportPatientIdentity,
  locale: Locale,
): string | null {
  const name = identity.name?.trim();
  if (!name) return null;
  return buildHospitalLabNarrative("", locale, identity);
}
