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

export type HospitalLabMetric = {
  name: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  status: "normal" | "low" | "high" | "unknown" | "abnormal";
};

const LAB_SECTION_HEADERS = new Set([
  "hematologi umum",
  "hematologi rutin",
  "hitung jenis",
  "elektrolit",
  "diabetes",
  "fungsi hati",
  "fungsi ginjal",
  "fungsi pankreas",
  "nilai normal",
  "test",
  "hasil",
  "unit",
]);

const INVALID_LAB_TOKENS = new Set([
  "tel",
  "tgl",
  "alamat",
  "validator",
  "pelaporan",
  "mandaya",
  "hospital",
  "order",
  "sample",
  "ruangan",
  "dokter",
  "pasien",
  "normal",
  "kdigo",
  "penanggung",
  "laboratorium",
  "terima",
  "terimasample",
  "royal",
  "puri",
  "metland",
  "tangerang",
]);

const LAB_ROW_RE =
  /^(?:[\s|]*)?(?<test>[A-Za-z][A-Za-z0-9 \-/()]{2,35}?)\s+(?:\*\s*)?(?<value>[\d.,\s]+)\s*(?:(?<unit>[A-Za-z/%\^°0-9/]{1,15})\s+)?(?:(?<ref>[\d.]+\s*[-–]\s*[\d.]+|<\s*[\d.]+))?\s*(?<flag>[HL*])?\s*$/i;

function normalizeOcrLine(line: string): string {
  let cleaned = line
    .replace(/\|/g, " ")
    .replace(/(\d)\.\s+(\d)/g, "$1.$2");
  cleaned = cleaned.replace(
    /^([A-Za-z][A-Za-z \-/()]{2,30}?)\s+(?:t)?([HL])\s+([\d.,\s]+)(.*)$/i,
    "$1 $3$4 $2",
  );
  return cleaned.replace(/\s+/g, " ").trim();
}

function cleanPatientName(raw?: string): string {
  if (!raw) return "";
  let name = raw.replace(/[\]|]/g, "I").trim();
  name = name.replace(/\s+No\.?\s*Lab.*$/i, "").trim();
  return name.split(/\s+/).join(" ");
}

function cleanTestAndFlag(
  test: string,
  flag?: string,
): { test: string; flag?: string } {
  const embedded = test.match(/^(?<name>.+?)\s+(?:t)?(?<flag>[HL])$/i);
  if (embedded?.groups) {
    return { test: embedded.groups.name.trim(), flag: embedded.groups.flag.toUpperCase() };
  }
  return { test: test.replace(/\s+[a-z]$/i, "").trim(), flag };
}

function normalizeLabValue(raw: string): string {
  return raw.replace(/\s+/g, "").replace(",", ".");
}

function isValidLabTest(test: string): boolean {
  const key = test.trim().toLowerCase().replace(/\s+/g, " ");
  if (LAB_SECTION_HEADERS.has(key) || key.length < 3) return false;
  if (!/[A-Za-z]{3,}/.test(key)) return false;
  const words = key.match(/[a-z]+/g) ?? [];
  if (words.some((word) => word.length <= 2 && word !== "na" && word !== "cl")) {
    return false;
  }
  if (words.some((word) => INVALID_LAB_TOKENS.has(word))) return false;
  if (/\b(no\.?|tel\.?|tgl\.?)\b/.test(key)) return false;
  if (/\b\d+\b/.test(test)) return false;
  return true;
}

function statusFromFlag(flag?: string): HospitalLabMetric["status"] {
  if (!flag) return "unknown";
  const upper = flag.toUpperCase();
  if (upper === "H" || upper === "*") return "high";
  if (upper === "L") return "low";
  return "abnormal";
}

function fixOcrUnit(unit?: string): string | undefined {
  if (!unit) return undefined;
  let fixed = unit.trim();
  fixed = fixed.replace(/gidL/gi, "g/dL").replace(/Mg\/Db/gi, "mg/dL");
  fixed = fixed.replace(/10°3/gi, "10^3");
  fixed = fixed.replace(/u\/t/gi, "U/L");
  return fixed;
}

export function extractHospitalLabMetrics(text: string): HospitalLabMetric[] {
  const results: HospitalLabMetric[] = [];
  const seen = new Set<string>();

  for (const rawLine of text.split(/\r?\n/)) {
    const fragment =
      rawLine.match(
        /([A-Za-z][A-Za-z \-/()]{2,35}?\s+(?:t)?[HL]?\s*[\d.,]+.*)/,
      )?.[1] ?? rawLine.replace(/^[^A-Za-z|]*/g, "");
    const line = normalizeOcrLine(fragment);
    const match = line.match(LAB_ROW_RE);
    if (!match?.groups) continue;

    let test = (match.groups.test ?? "").replace(/^[ |:-]+|[ |:-]+$/g, "");
    const cleaned = cleanTestAndFlag(test, match.groups.flag);
    test = cleaned.test;
    const value = normalizeLabValue(match.groups.value ?? "");
    if (!test || !value || !/^\d+(\.\d+)?$/.test(value)) continue;
    if (!isValidLabTest(test)) continue;

    const key = test.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    results.push({
      name: test,
      value,
      unit: fixOcrUnit(match.groups.unit),
      referenceRange: match.groups.ref?.trim() || undefined,
      status: statusFromFlag(cleaned.flag),
    });
  }

  return results;
}

function formatHospitalMetric(
  metric: HospitalLabMetric,
  locale: Locale,
): string {
  const unit = metric.unit ? ` ${metric.unit}` : "";
  if (metric.status === "low") {
    return `${metric.name} ${metric.value}${unit}${locale === "id" ? " (rendah)" : " (low)"}`;
  }
  if (metric.status === "high") {
    return `${metric.name} ${metric.value}${unit}${locale === "id" ? " (tinggi)" : " (high)"}`;
  }
  return `${metric.name} ${metric.value}${unit}`;
}

export function buildHospitalDoctorSummary(
  text: string,
  locale: Locale,
): string {
  const ctx = extractHospitalLabContext(text);
  const metrics = extractHospitalLabMetrics(text);
  const patient =
    cleanPatientName(ctx.patientName) ||
    (locale === "id" ? "pasien" : "the patient");

  const contextBits = [
    ctx.department?.trim(),
    ctx.orderDate?.trim(),
    ctx.labNumber
      ? locale === "id"
        ? `no. lab ${ctx.labNumber}`
        : `lab ${ctx.labNumber}`
      : undefined,
  ].filter(Boolean);
  const context = contextBits.length ? ` (${contextBits.join(", ")})` : "";

  if (metrics.length === 0) {
    if (locale === "id") {
      return (
        `Laporan laboratorium untuk ${patient}${context}. ` +
        "Tinjau nilai lengkap di sistem dan diskusikan interpretasi klinis dengan pasien."
      );
    }
    return (
      `Laboratory report for ${patient}${context}. ` +
      "Review full values in the chart and discuss clinical interpretation with the patient."
    );
  }

  const abnormal = metrics.filter(
    (m) => m.status === "low" || m.status === "high" || m.status === "abnormal",
  );
  const valueText = metrics
    .slice(0, 8)
    .map((m) => formatHospitalMetric(m, locale))
    .join("; ");

  if (locale === "id") {
    const parts = [`Laporan laboratorium untuk ${patient}${context}: ${valueText}.`];
    if (abnormal.length > 0) {
      parts.push(
        `Kelainan: ${abnormal.slice(0, 4).map((m) => formatHospitalMetric(m, locale)).join(", ")}.`,
      );
    } else {
      parts.push("Nilai tercantum dalam rentang normal kecuali dinyatakan lain.");
    }
    parts.push("Tafsirkan bersama konteks klinis dan gejala pasien.");
    return parts.join(" ");
  }

  const parts = [`Laboratory report for ${patient}${context}: ${valueText}.`];
  if (abnormal.length > 0) {
    parts.push(
      `Abnormal: ${abnormal.slice(0, 4).map((m) => formatHospitalMetric(m, locale)).join(", ")}.`,
    );
  } else {
    parts.push("Listed values are within reference ranges unless noted.");
  }
  parts.push("Interpret with clinical context and symptoms.");
  return parts.join(" ");
}

export function isGenericDoctorSummaryPlaceholder(text: string): boolean {
  return /has laboratory results on file|memiliki hasil laboratorium pada dokumen ini|review full values in the chart/i.test(
    text.trim(),
  );
}

export function isHospitalLabReport(text: string): boolean {
  const normalized = text.replace(/\s+/g, " ");
  if (
    /namapasien|mapasien|fma\s*pasien|fopasien|no\.?\s*lab\b|no\.?\s*rm\b|jenis\s*kelamin|tgl\.?\s*order|tgl\.?\s*terima\s*sample/i.test(
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

  ctx.patientName = cleanPatientName(
    pickField(text, [
      /Nama\s*Pasien\s*[：:]\s*([A-Z][A-Za-z|\]\s.'-]{2,48}?)(?:\s+No\.?\s*Lab|\s+No\.?\s*RM|\s*$)/i,
      /(?:fmaPasien|maPasien|fOPasien)\s*[：:]\s*([A-Za-z|\][A-Za-z|\]\s.'-]{2,48}?)(?:\s+No\.?\s*Lab|\s+No\.?\s*RM|\s*$)/i,
      /(?:Name|Nama)\s*[：:]\s*([A-Za-z][A-Za-z\s.'-]{2,48})/i,
    ]),
  ) || undefined;
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
