import type { Locale } from "@/hooks/use-locale";
import { parseClinicalSummaryParts } from "@/lib/clinical-summary-display";
import {
  parseDoctorSummary,
  type DoctorSummaryPatientField,
} from "@/lib/format-doctor-summary";
import { splitDocumentSections } from "@/lib/document-sections";
import type { ReportFileAnalysis } from "@/lib/types/api";

export type ReportSubjectInfo = {
  name: string | null;
  age: string | null;
  gender: string | null;
  reportKind: string | null;
};

export type ReportPageHeading = {
  title: string;
  subtitle: string;
};

const NAME_LABELS = ["name", "nama"];
const AGE_LABELS = ["age", "usia"];
const GENDER_LABELS = ["gender", "jenis kelamin"];

function fieldValue(
  fields: DoctorSummaryPatientField[],
  labels: string[],
): string | null {
  for (const field of fields) {
    const key = field.label.trim().toLowerCase();
    if (labels.includes(key)) {
      const value = field.value.trim();
      if (value) return value;
    }
  }
  return null;
}

function normalizeGender(value: string, locale: Locale): string {
  const lower = value.trim().toLowerCase();
  if (/^(m|male|laki|laki-laki|pria)$/i.test(lower)) {
    return locale === "id" ? "Laki-laki" : "Male";
  }
  if (/^(f|female|perempuan|wanita)$/i.test(lower)) {
    return locale === "id" ? "Perempuan" : "Female";
  }
  return value.trim();
}

function cleanPatientName(name: string, gender: string | null): string {
  let cleaned = name.trim().replace(/\s+/g, " ");
  if (gender && /\s+Gender$/i.test(cleaned)) {
    cleaned = cleaned.replace(/\s+Gender$/i, "").trim();
  }
  return cleaned;
}

function isUploadBundleTitle(title: string): boolean {
  return /\(\+\d+\s+more\)/i.test(title.trim());
}

function toDisplayName(raw: string): string {
  const cleaned = raw.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  if (cleaned === cleaned.toUpperCase() && cleaned.length > 3) {
    return cleaned
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return cleaned;
}

const INVALID_PATIENT_NAMES = new Set([
  "patient",
  "pasien",
  "the patient",
  "unknown",
  "gender",
  "male",
  "female",
  "name",
  "nama",
  "mandaya",
  "royal",
  "hospital",
]);

function isValidPatientName(name: string | null | undefined): boolean {
  if (!name?.trim()) return false;
  const normalized = name.trim().toLowerCase();
  if (INVALID_PATIENT_NAMES.has(normalized)) return false;
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return false;
  if (words.some((word) => INVALID_PATIENT_NAMES.has(word.toLowerCase()))) return false;
  if (normalized.length < 4) return false;
  return true;
}

function sanitizeNameFromNarrative(name: string): string {
  return name
    .replace(/\s+Gender$/i, "")
    .replace(/\s+Age$/i, "")
    .replace(/\s+(Male|Female)$/i, "")
    .trim();
}

function preferPatientName(
  current: string | null,
  candidate: string | null,
): string | null {
  if (!candidate?.trim()) return current;
  const next = toDisplayName(sanitizeNameFromNarrative(candidate));
  if (!isValidPatientName(next)) return current;
  if (!current?.trim()) return next;
  const cur = current.trim();
  if (!isValidPatientName(cur)) return next;
  if (isUploadBundleTitle(cur)) return next;
  const curWords = cur.split(/\s+/).length;
  const nextWords = next.split(/\s+/).length;
  if (nextWords > curWords) return next;
  if (next.length > cur.length + 4 && curWords === 1) return next;
  return cur;
}

function nameFromFilename(filename: string): string | null {
  const base = filename.replace(/\.[^.]+$/i, "").trim();
  const labMatch = base.match(
    /LAB[_\s-]+([A-Z][A-Z\s]{4,48}?)(?:[_\s-]+\d{6,}|_\d{2,})/i,
  );
  if (labMatch?.[1]) {
    const name = toDisplayName(labMatch[1]);
    if (name.split(/\s+/).length >= 2) return name;
  }
  const underscored = base.match(/^([A-Z][A-Z]{2,}(?:_[A-Z]{2,})+)$/);
  if (underscored?.[1]) {
    const name = toDisplayName(underscored[1].replace(/_/g, " "));
    if (name.split(/\s+/).length >= 2) return name;
  }
  return null;
}

function fromLabeledDocument(text: string): Partial<ReportSubjectInfo> {
  const name =
    text.match(
      /(?:Name|Nama(?:\s+Pasien)?|Patient(?:\s+Name)?)[\s:：]+([A-Za-z][A-Za-z\s.'-]{2,48})/i,
    )?.[1]?.trim() ??
    text.match(/Pasien[\s:：]+([A-Za-z][A-Za-z\s.'-]{2,48})/i)?.[1]?.trim();
  const age =
    text.match(/(?:Age|Usia)[\s:：]+(\d{1,3})/i)?.[1]?.trim() ??
    text.match(/(?:Age|Usia)\s+(\d{1,3})\b/i)?.[1]?.trim();
  const gender = text
    .match(
      /(?:Gender|Jenis\s+Kelamin|Sex)[\s:：]+(Male|Female|Laki-laki|Perempuan|Pria|Wanita|[MF])/i,
    )?.[1]
    ?.trim();
  return {
    name: name ? toDisplayName(name) : null,
    age: age ?? null,
    gender: gender ?? null,
  };
}

/** Scan every uploaded file (OCR sections, previews, filenames) for demographics. */
function fromAllUploadedFiles(sources: {
  documentText: string;
  fileAnalyses?: ReportFileAnalysis[];
  uploadedFilenames?: string[];
}): Partial<ReportSubjectInfo> {
  const result: ReportSubjectInfo = {
    name: null,
    age: null,
    gender: null,
    reportKind: null,
  };

  const visit = (filename: string, text: string) => {
    result.name = preferPatientName(result.name, nameFromFilename(filename));
    if (!text.trim()) return;
    const labeled = fromLabeledDocument(text);
    result.name = preferPatientName(result.name, labeled.name ?? null);
    if (!result.age && labeled.age) result.age = labeled.age;
    if (!result.gender && labeled.gender) result.gender = labeled.gender;
  };

  const document = sources.documentText.trim();
  const sections = splitDocumentSections(document);
  if (sections.length > 0) {
    for (const section of sections) {
      visit(section.filename, section.text);
    }
  } else if (document) {
    visit("", document);
  }

  for (const entry of sources.fileAnalyses ?? []) {
    visit(entry.filename, entry.extract_preview ?? "");
  }

  for (const filename of sources.uploadedFilenames ?? []) {
    visit(filename, "");
  }

  return result;
}

function fromClinicalNarrative(text: string): Partial<ReportSubjectInfo> {
  const trimmed = text.trim();
  if (!trimmed) return {};

  const patterns = [
    /This\s+(.+?)\s+report\s+for\s+(.+?)\s*,\s*age\s+(\d{1,3})\s*,\s*(male|female)/i,
    /This\s+(.+?)\s+report\s+for\s+(.+?)\s+shows/i,
    /(?:report|laporan)\s+for\s+(.+?)\s*,\s*age\s+(\d{1,3})\s*,\s*(male|female)/i,
    /for\s+([A-Za-z][A-Za-z\s.'-]{1,36}?)\s*,\s*age\s+(\d{1,3})\s*,\s*(male|female)/i,
    /untuk\s+(.+?)\s*,\s*(?:usia\s+)?(\d{1,3})\s*,\s*(laki-laki|perempuan|male|female)/i,
    /([A-Za-z][A-Za-z\s.'-]{1,36}?)\s*,\s*age\s+(\d{1,3})\s*,\s*(male|female)\s+shows/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (!match) continue;

    if (match.length >= 5) {
      const rawName = sanitizeNameFromNarrative(match[2]?.trim() || "");
      return {
        reportKind: match[1]?.trim() || null,
        name: isValidPatientName(rawName) ? rawName : null,
        age: match[3]?.trim() || null,
        gender: match[4]?.trim() || null,
      };
    }
    if (match.length >= 4 && /^\d+$/.test(match[2] ?? "")) {
      const rawName = sanitizeNameFromNarrative(match[1]?.trim() || "");
      return {
        name: isValidPatientName(rawName) ? rawName : null,
        age: match[2]?.trim() || null,
        gender: match[3]?.trim() || null,
      };
    }
    if (match.length >= 3) {
      const rawName = sanitizeNameFromNarrative(match[2]?.trim() || "");
      return {
        reportKind: match[1]?.trim() || null,
        name: isValidPatientName(rawName) ? rawName : null,
      };
    }
  }

  const kindOnly = trimmed.match(/^This\s+(.+?)\s+report\b/i);
  if (kindOnly) {
    return { reportKind: kindOnly[1].trim() };
  }

  return {};
}

function mergeSubject(
  ...partials: Partial<ReportSubjectInfo>[]
): ReportSubjectInfo {
  const merged: ReportSubjectInfo = {
    name: null,
    age: null,
    gender: null,
    reportKind: null,
  };

  for (const partial of partials) {
    if (!partial.name && !partial.age && !partial.gender && !partial.reportKind) {
      continue;
    }
    if (partial.name) {
      merged.name = preferPatientName(merged.name, partial.name);
    }
    if (!merged.age && partial.age) merged.age = partial.age;
    if (!merged.gender && partial.gender) merged.gender = partial.gender;
    if (!merged.reportKind && partial.reportKind) {
      merged.reportKind = partial.reportKind;
    }
  }

  return merged;
}

export type LinkedReportPatient = {
  fullName: string;
  age?: string | null;
  gender?: string | null;
};

export function extractReportSubject(sources: {
  clinicalSummary?: string;
  doctorSummary?: string;
  documentText?: string;
  fileAnalyses?: ReportFileAnalysis[];
  uploadedFilenames?: string[];
  fileCount?: number;
  linkedPatient?: LinkedReportPatient | null;
}): ReportSubjectInfo {
  const clinical = sources.clinicalSummary?.trim() ?? "";
  const doctor = sources.doctorSummary?.trim() ?? "";
  const document = sources.documentText?.trim() ?? "";
  const clinicalOverview = clinical
    ? parseClinicalSummaryParts(clinical).overview
    : "";

  const parsedDoctor = doctor ? parseDoctorSummary(doctor) : null;
  const parsedDocument = document ? parseDoctorSummary(document) : null;

  const fromDoctorFields: Partial<ReportSubjectInfo> = parsedDoctor
    ? {
        name: fieldValue(parsedDoctor.patientFields, NAME_LABELS),
        age: fieldValue(parsedDoctor.patientFields, AGE_LABELS),
        gender: fieldValue(parsedDoctor.patientFields, GENDER_LABELS),
        reportKind: parsedDoctor.reportTitle,
      }
    : {};

  const fromDocumentFields: Partial<ReportSubjectInfo> = parsedDocument
    ? {
        name: fieldValue(parsedDocument.patientFields, NAME_LABELS),
        age: fieldValue(parsedDocument.patientFields, AGE_LABELS),
        gender: fieldValue(parsedDocument.patientFields, GENDER_LABELS),
        reportKind: parsedDocument.reportTitle,
      }
    : {};

  const sectionCount = splitDocumentSections(document).length;
  const fileCount =
    sources.fileCount ??
    Math.max(sectionCount, sources.uploadedFilenames?.length ?? 0, 1);
  const multiFile = fileCount > 1 || sectionCount > 1;

  const fromLinked: Partial<ReportSubjectInfo> = sources.linkedPatient
    ? {
        name: sources.linkedPatient.fullName,
        age: sources.linkedPatient.age ?? null,
        gender: sources.linkedPatient.gender ?? null,
      }
    : {};

  const partials: Partial<ReportSubjectInfo>[] = [
    fromAllUploadedFiles({
      documentText: document,
      fileAnalyses: sources.fileAnalyses,
      uploadedFilenames: sources.uploadedFilenames,
    }),
    fromDoctorFields,
    fromDocumentFields,
    fromLinked,
  ];

  if (!multiFile) {
    partials.push(
      fromClinicalNarrative(clinicalOverview || clinical),
      fromClinicalNarrative(doctor),
    );
  } else if (!partials.some((partial) => partial.name)) {
    partials.push(fromClinicalNarrative(clinicalOverview));
  }

  const merged = mergeSubject(...partials);

  if (multiFile) {
    merged.reportKind = null;
  }

  return merged;
}

/** Age in years from ISO date of birth when available. */
export function ageFromDateOfBirth(dob: string | null | undefined): string | null {
  if (!dob?.trim()) return null;
  const born = new Date(dob);
  if (Number.isNaN(born.getTime())) return null;
  const today = new Date();
  let years = today.getFullYear() - born.getFullYear();
  const monthDelta = today.getMonth() - born.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < born.getDate())) {
    years -= 1;
  }
  return years >= 0 && years <= 120 ? String(years) : null;
}

export type PatientDisplayField = {
  label: string;
  value: string;
};

function formatDateOfBirth(
  dob: string,
  locale: Locale,
): string {
  try {
    return new Date(dob).toLocaleDateString(
      locale === "id" ? "id-ID" : "en-US",
      { dateStyle: "medium" },
    );
  } catch {
    return dob;
  }
}

/** Demographics rows for the clinical summary patient panel. */
export function patientDisplayFields(
  subject: ReportSubjectInfo,
  locale: Locale,
  options?: {
    fileCount?: number;
    mrn?: string | null;
    dateOfBirth?: string | null;
  },
): PatientDisplayField[] {
  const fields: PatientDisplayField[] = [];
  const gender = subject.gender
    ? normalizeGender(subject.gender, locale)
    : null;
  const name = subject.name
    ? cleanPatientName(subject.name, subject.gender)
    : null;

  if (name) {
    fields.push({
      label: locale === "id" ? "Nama pasien" : "Patient name",
      value: name,
    });
  }
  if (gender) {
    fields.push({
      label: locale === "id" ? "Jenis kelamin" : "Gender",
      value: gender,
    });
  }
  if (subject.age) {
    fields.push({
      label: locale === "id" ? "Usia" : "Age",
      value:
        locale === "id" ? `${subject.age} tahun` : `${subject.age} years`,
    });
  }
  if (options?.dateOfBirth?.trim()) {
    fields.push({
      label: locale === "id" ? "Tanggal lahir" : "Date of birth",
      value: formatDateOfBirth(options.dateOfBirth, locale),
    });
  }
  if (options?.mrn?.trim()) {
    fields.push({ label: "MRN", value: options.mrn.trim() });
  }
  const fileCount = options?.fileCount ?? 0;
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

export function buildReportPageHeading(
  subject: ReportSubjectInfo,
  locale: Locale,
  fallbackTitle: string,
  options?: { fileCount?: number },
): ReportPageHeading {
  const gender = subject.gender
    ? normalizeGender(subject.gender, locale)
    : null;
  const name = subject.name
    ? cleanPatientName(subject.name, subject.gender)
    : null;

  if (!name) {
    const useFallback =
      fallbackTitle.trim() && !isUploadBundleTitle(fallbackTitle);
    return {
      title: useFallback
        ? fallbackTitle
        : locale === "id"
          ? "Pasien"
          : "Patient",
      subtitle:
        locale === "id" ? "Hasil analisis AI" : "AI analysis result",
    };
  }

  const details: string[] = [];
  if (gender) details.push(gender);
  if (subject.age) {
    details.push(
      locale === "id" ? `Usia ${subject.age}` : `Age ${subject.age}`,
    );
  }
  const fileCount = options?.fileCount ?? 0;
  if (fileCount > 1) {
    details.push(
      locale === "id" ? `${fileCount} berkas` : `${fileCount} files`,
    );
  } else if (subject.reportKind) {
    const kind = subject.reportKind.replace(/\s+report$/i, "").trim();
    if (kind && !/airdoc|stress\s+resilience/i.test(kind)) {
      details.push(kind);
    }
  }

  return {
    title: name,
    subtitle:
      details.length > 0
        ? details.join(" · ")
        : locale === "id"
          ? "Hasil analisis AI"
          : "AI analysis result",
  };
}
