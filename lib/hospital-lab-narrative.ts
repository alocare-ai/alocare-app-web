import { splitDocumentSections } from "@/lib/document-sections";
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
  /^(?:[\s|]*)?([A-Za-z][A-Za-z0-9 \-/()]{2,35}?)\s+(?:\*\s*)?([\d.,\s]+)\s*(?:([A-Za-z/%\^°0-9/]{1,15})\s+)?(?:([\d.]+\s*[-–]\s*[\d.]+|<\s*[\d.]+))?\s*([HL*])?\s*$/i;

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
  const embedded = test.match(/^(.+?)\s+(?:t)?([HL])$/i);
  if (embedded) {
    return { test: embedded[1].trim(), flag: embedded[2].toUpperCase() };
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
    if (!match) continue;

    let test = (match[1] ?? "").replace(/^[ |:-]+|[ |:-]+$/g, "");
    const cleaned = cleanTestAndFlag(test, match[5]);
    test = cleaned.test;
    const value = normalizeLabValue(match[2] ?? "");
    if (!test || !value || !/^\d+(\.\d+)?$/.test(value)) continue;
    if (!isValidLabTest(test)) continue;

    const key = test.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    results.push({
      name: test,
      value,
      unit: fixOcrUnit(match[3]),
      referenceRange: match[4]?.trim() || undefined,
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

function formatPanelLabel(ctx: HospitalLabContext, locale: Locale): string {
  const parts = [
    ctx.department?.trim(),
    ctx.orderDate?.trim().split(/\s+/)[0],
    ctx.labNumber
      ? locale === "id"
        ? `no. lab ${ctx.labNumber}`
        : `lab ${ctx.labNumber}`
      : undefined,
  ].filter(Boolean);
  if (parts.length === 0) {
    return locale === "id" ? "Panel" : "Panel";
  }
  return parts.join(" · ");
}

function resolvePatientName(
  text: string,
  identity: ReportPatientIdentity | null | undefined,
  locale: Locale,
): string {
  return (
    cleanPatientName(extractHospitalLabContext(text).patientName) ||
    identity?.name?.trim() ||
    (locale === "id" ? "pasien" : "the patient")
  );
}

/** One readable doctor summary across multiple hospital lab files (no WhatsApp filenames). */
export function buildUnifiedHospitalDoctorSummary(
  document: string,
  locale: Locale,
  identity?: ReportPatientIdentity | null,
): string {
  const sections = splitDocumentSections(document);
  if (sections.length <= 1) {
    return buildHospitalDoctorSummary(document, locale);
  }

  const patient = resolvePatientName(document, identity, locale);
  const panelLines: string[] = [];
  const allAbnormal: HospitalLabMetric[] = [];

  for (const section of sections) {
    const ctx = extractHospitalLabContext(section.text);
    const metrics = extractHospitalLabMetrics(section.text);
    const abnormal = metrics.filter(
      (m) => m.status === "low" || m.status === "high" || m.status === "abnormal",
    );
    allAbnormal.push(...abnormal);

    const label = formatPanelLabel(ctx, locale);
    if (metrics.length > 0) {
      const values = metrics
        .slice(0, 12)
        .map((m) => formatHospitalMetric(m, locale))
        .join("; ");
      panelLines.push(`• ${label}: ${values}`);
    } else if (label !== "Panel") {
      panelLines.push(
        `• ${label}: ${
          locale === "id"
            ? "nilai lengkap di berkas sumber"
            : "see full values in source file"
        }`,
      );
    }
  }

  if (panelLines.length === 0) {
    return buildHospitalDoctorSummary(document, locale);
  }

  const header =
    locale === "id"
      ? `Laporan laboratorium untuk ${patient} (${sections.length} panel):`
      : `Laboratory report for ${patient} (${sections.length} panels):`;

  const uniqueAbnormal = [
    ...new Map(allAbnormal.map((m) => [m.name.toLowerCase(), m])).values(),
  ];
  const footer =
    uniqueAbnormal.length > 0
      ? locale === "id"
        ? `Kelainan: ${uniqueAbnormal
            .slice(0, 5)
            .map((m) => formatHospitalMetric(m, locale))
            .join(", ")}. Tafsirkan bersama konteks klinis.`
        : `Abnormal: ${uniqueAbnormal
            .slice(0, 5)
            .map((m) => formatHospitalMetric(m, locale))
            .join(", ")}. Interpret with clinical context.`
      : locale === "id"
        ? "Nilai tercantum umumnya dalam rentang normal. Tafsirkan bersama konteks klinis."
        : "Values are generally within reference ranges. Interpret with clinical context.";

  return `${header}\n\n${panelLines.join("\n\n")}\n\n${footer}`;
}

/** Patient-facing clinical overview across multiple hospital lab uploads. */
export function buildUnifiedHospitalClinicalOverview(
  document: string,
  locale: Locale,
  identity?: ReportPatientIdentity | null,
): string {
  const sections = splitDocumentSections(document);
  if (sections.length <= 1) {
    return buildHospitalLabNarrative(document, locale, identity);
  }

  const ctx = mergeHospitalContext(
    extractHospitalLabContext(document),
    identity,
  );
  const patient = resolvePatientName(document, identity, locale);
  const patientDetails: string[] = [];
  if (ctx.gender) patientDetails.push(ctx.gender.toLowerCase());
  if (ctx.dateOfBirth) {
    patientDetails.push(
      locale === "id" ? `lahir ${ctx.dateOfBirth}` : `DOB ${ctx.dateOfBirth}`,
    );
  } else if (identity?.age?.trim()) {
    patientDetails.push(
      locale === "id" ? `${identity.age} tahun` : `${identity.age} years`,
    );
  }
  const patientDesc =
    patientDetails.length > 0
      ? `${patient} (${patientDetails.join(", ")})`
      : patient;
  const facility = [ctx.hospital, ctx.department].filter(Boolean).join(", ");

  const panelBlocks: string[] = [];
  const allMetrics: HospitalLabMetric[] = [];
  for (const section of sections) {
    const sectionCtx = extractHospitalLabContext(section.text);
    const metrics = extractHospitalLabMetrics(section.text);
    allMetrics.push(...metrics);
    const label = formatPanelLabel(sectionCtx, locale);
    if (metrics.length > 0) {
      const values = metrics
        .slice(0, 10)
        .map((m) => formatHospitalMetric(m, locale))
        .join("; ");
      panelBlocks.push(`• ${label}: ${values}`);
    }
  }

  const abnormal = allMetrics.filter(
    (m) => m.status === "low" || m.status === "high" || m.status === "abnormal",
  );
  const uniqueAbnormal = [
    ...new Map(abnormal.map((m) => [m.name.toLowerCase(), m])).values(),
  ];

  if (locale === "id") {
    const headerParts = [`Laporan laboratorium untuk ${patientDesc}.`];
    if (facility) headerParts.push(`Fasilitas: ${facility}.`);
    const header = headerParts.join(" ");
    const body =
      panelBlocks.length > 0
        ? `Hasil dari ${sections.length} panel:\n\n${panelBlocks.join("\n\n")}${
            uniqueAbnormal.length > 0
              ? `\n\nPerlu perhatian: ${uniqueAbnormal
                  .slice(0, 4)
                  .map((m) => formatHospitalMetric(m, locale))
                  .join(", ")}.`
              : ""
          }`
        : "Nilai lengkap perlu ditafsirkan dokter bersama riwayat medis dan gejala pasien.";
    return (
      `${header}\n\n${body}\n\n` +
      "Diskusikan hasil dengan pasien dan rencanakan tindak lanjut sesuai pedoman klinis."
    );
  }

  const headerParts = [`Laboratory report for ${patientDesc}.`];
  if (facility) headerParts.push(`Facility: ${facility}.`);
  const header = headerParts.join(" ");
  const body =
    panelBlocks.length > 0
      ? `Results from ${sections.length} panels:\n\n${panelBlocks.join("\n\n")}${
          uniqueAbnormal.length > 0
            ? `\n\nNotable: ${uniqueAbnormal
                .slice(0, 4)
                .map((m) => formatHospitalMetric(m, locale))
                .join(", ")}.`
            : ""
        }`
      : "Complete values should be interpreted with medical history, symptoms, and treatment goals.";
  return (
    `${header}\n\n${body}\n\n` +
    "Discuss results with the patient and plan appropriate follow-up."
  );
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

export function isWeakDoctorSummary(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  if (isGenericDoctorSummaryPlaceholder(t)) return true;
  if (/review full values in the chart/i.test(t)) return true;
  if (isMessyMultiFileDoctorSummary(t)) return true;
  return false;
}

/** Per-file WhatsApp filename prefixes make doctor summaries hard to read. */
export function isMessyMultiFileDoctorSummary(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  if (/\.jpe?g:\s/i.test(t) || /\.png:\s/i.test(t)) return true;
  if (/WhatsApp Image.*:\s/i.test(t)) return true;
  if ((t.match(/Review full values in the chart/gi) ?? []).length >= 2) {
    return true;
  }
  return false;
}

/** True when clinical overview is the metadata-only hospital lab boilerplate. */
export function isGenericHospitalClinicalOverview(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  if (
    /laboratory report for/i.test(t) &&
    /complete values should be interpreted with medical history/i.test(t) &&
    !/;\s/.test(t)
  ) {
    return true;
  }
  if (
    /laporan laboratorium untuk/i.test(t) &&
    /nilai lengkap perlu ditafsirkan/i.test(t) &&
    !/;\s/.test(t)
  ) {
    return true;
  }
  if (/discuss results with the patient and plan appropriate follow-up/i.test(t) && !/;\s/.test(t)) {
    return true;
  }
  return false;
}

function buildHospitalFindingsBlock(text: string, locale: Locale): string {
  const metrics = extractHospitalLabMetrics(text);
  if (metrics.length === 0) return "";

  const abnormal = metrics.filter(
    (m) => m.status === "low" || m.status === "high" || m.status === "abnormal",
  );
  const valueText = metrics
    .slice(0, 10)
    .map((m) => formatHospitalMetric(m, locale))
    .join("; ");

  if (locale === "id") {
    let block = `Hasil utama: ${valueText}.`;
    if (abnormal.length > 0) {
      block += ` Perlu perhatian: ${abnormal
        .slice(0, 4)
        .map((m) => formatHospitalMetric(m, locale))
        .join(", ")}.`;
    } else {
      block += " Nilai yang tercantum umumnya dalam rentang normal.";
    }
    return block;
  }

  let block = `Key results: ${valueText}.`;
  if (abnormal.length > 0) {
    block += ` Notable: ${abnormal
      .slice(0, 4)
      .map((m) => formatHospitalMetric(m, locale))
      .join(", ")}.`;
  } else {
    block += " Listed values are generally within reference ranges.";
  }
  return block;
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
    cleanPatientName(ctx.patientName) ||
    identity?.name?.trim() ||
    (locale === "id" ? "pasien" : "the patient");

  const patientDetails: string[] = [];
  if (ctx.gender) {
    patientDetails.push(ctx.gender.toLowerCase());
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
  const findings = buildHospitalFindingsBlock(text, locale);

  if (locale === "id") {
    const parts = [`Laporan laboratorium untuk ${patientDesc}.`];
    if (facility) parts.push(`Fasilitas: ${facility}.`);
    if (ctx.orderDate) parts.push(`Pesanan pada ${ctx.orderDate.trim()}.`);
    if (ctx.labNumber) parts.push(`No. lab: ${ctx.labNumber}.`);
    const header = parts.join(" ");
    const body =
      findings ||
      "Nilai lengkap perlu ditafsirkan dokter bersama riwayat medis dan gejala pasien.";
    return (
      `${header}\n\n${body}\n\n` +
      "Diskusikan hasil dengan pasien dan rencanakan tindak lanjut sesuai pedoman klinis."
    );
  }

  const parts = [`Laboratory report for ${patientDesc}.`];
  if (facility) parts.push(`Facility: ${facility}.`);
  if (ctx.orderDate) parts.push(`Ordered on ${ctx.orderDate.trim()}.`);
  if (ctx.labNumber) parts.push(`Lab no. ${ctx.labNumber}.`);
  const header = parts.join(" ");
  const body =
    findings ||
    "Complete values should be interpreted with medical history, symptoms, and treatment goals.";
  return (
    `${header}\n\n${body}\n\n` +
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
