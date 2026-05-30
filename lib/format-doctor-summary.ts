export type DoctorSummaryPatientField = {
  label: string;
  value: string;
};

export type DoctorSummarySection = {
  title: string;
  score?: string;
  description: string;
};

export type ParsedDoctorSummary = {
  reportTitle: string | null;
  patientFields: DoctorSummaryPatientField[];
  sections: DoctorSummarySection[];
};

const PATIENT_FIELD_LABELS = [
  "Name",
  "Gender",
  "Age",
  "ID Number",
  "Time",
  "Nama",
  "Jenis Kelamin",
  "Usia",
  "Nomor ID",
  "Waktu",
] as const;

const SCALE_NOISE =
  /\b(?:Weak|Below\s+Average|Above\s+Average|Strong|Above)\b(?:\s+\b(?:Weak|Below\s+Average|Above\s+Average|Strong|Above)\b)*|\b0\s+25\s+50\s+75\s+100\b/gi;

const SECTION_HEADER =
  /((?:[A-Z][a-z]+\s+){1,4}(?:Assessment|Resistance|Index|Level|Score|Rating))\s*(\d{1,3})?\s*/g;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const PATIENT_FIELD_SPLIT = new RegExp(
  `\\b(${PATIENT_FIELD_LABELS.map(escapeRegex).join("|")})\\s*:\\s*`,
  "gi",
);

export function normalizeDoctorSummaryText(text: string): string {
  return text
    .replace(/^\s*(?:doctor\s+summary|ringkasan\s+dokter)\s*[:\-]?\s*/i, "")
    .replace(/：/g, ": ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripScaleNoise(text: string): string {
  return text.replace(SCALE_NOISE, " ").replace(/\s+/g, " ").trim();
}

function parsePatientFields(
  text: string,
): { reportTitle: string | null; patientFields: DoctorSummaryPatientField[]; remainder: string } {
  const matches = [...text.matchAll(PATIENT_FIELD_SPLIT)];
  if (matches.length === 0) {
    return { reportTitle: null, patientFields: [], remainder: text };
  }

  const reportTitle = text.slice(0, matches[0].index).trim() || null;
  const patientFields: DoctorSummaryPatientField[] = [];

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const label = match[1];
    const valueStart = match.index! + match[0].length;
    const valueEnd = matches[i + 1]?.index ?? text.length;
    const value = text.slice(valueStart, valueEnd).trim();
    if (value) {
      patientFields.push({ label, value });
    }
  }

  let remainder = "";
  const lastField = patientFields[patientFields.length - 1];
  if (lastField) {
    const sectionStart = lastField.value.search(SECTION_HEADER);
    if (sectionStart >= 0) {
      remainder = lastField.value.slice(sectionStart).trim();
      lastField.value = lastField.value.slice(0, sectionStart).trim();
    }
  }

  return { reportTitle, patientFields, remainder };
}

function parseSections(remainder: string): DoctorSummarySection[] {
  const body = stripScaleNoise(remainder);
  if (!body) return [];

  const headers = [...body.matchAll(SECTION_HEADER)];
  if (headers.length === 0) return [];

  const sections: DoctorSummarySection[] = [];

  for (let i = 0; i < headers.length; i += 1) {
    const match = headers[i];
    const title = match[1].trim();
    const score = match[2]?.trim();
    const contentStart = match.index! + match[0].length;
    const contentEnd = headers[i + 1]?.index ?? body.length;
    let description = body.slice(contentStart, contentEnd).trim();
    description = stripScaleNoise(description);

    if (title || description) {
      sections.push({
        title,
        score: score || undefined,
        description,
      });
    }
  }

  return sections;
}

export function parseDoctorSummary(text: string): ParsedDoctorSummary | null {
  const normalized = normalizeDoctorSummaryText(text);
  if (!normalized) return null;

  const { reportTitle, patientFields, remainder } = parsePatientFields(normalized);
  const sections = parseSections(remainder);

  const structured =
    patientFields.length > 0 || sections.length > 0 || Boolean(reportTitle);
  if (!structured) return null;

  return {
    reportTitle,
    patientFields,
    sections,
  };
}

export function formatDoctorSummaryPlain(text: string): string {
  const normalized = normalizeDoctorSummaryText(text);
  if (!normalized) return "";

  let formatted = stripScaleNoise(normalized);

  formatted = formatted.replace(PATIENT_FIELD_SPLIT, (match) => `\n${match.trim()} `);

  formatted = formatted.replace(
    /\s+((?:[A-Z][a-z]+\s+){1,4}(?:Assessment|Resistance|Index|Level|Score|Rating))\s*(\d{1,3})?\s*/g,
    (_full, title: string, score?: string) =>
      `\n\n${title.trim()}${score ? ` ${score}` : ""}\n`,
  );

  return formatted.replace(/\n{3,}/g, "\n\n").trim();
}

export function hasStructuredDoctorSummary(text: string): boolean {
  return parseDoctorSummary(text) !== null;
}
