/** Rule-based EN→ID localization for stored AI summaries (no external API). */

const CLINICAL_REPLACEMENTS: [RegExp, string][] = [
  [/\bThe laboratory report includes\b/gi, "Laporan laboratorium mencakup"],
  [/\bThis laboratory report includes\b/gi, "Laporan laboratorium mencakup"],
  [/\bblood glucose levels\b/gi, "kadar glukosa darah"],
  [/\bfasting and 2 hours post-prandial\b/gi, "puasa dan 2 jam post-prandial"],
  [/\btriglycerides\b/gi, "trigliserida"],
  [/\bLDL cholesterol\b/gi, "kolesterol LDL"],
  [/\bHDL cholesterol\b/gi, "kolesterol HDL"],
  [/\btotal cholesterol\b/gi, "kolesterol total"],
  [/\bcreatinine\b/gi, "kreatinin"],
  [/\bestimated glomerular filtration rate \(eGFR\)/gi, "laju filtrasi glomerulus estimasi (eGFR)"],
  [/\beGFR\b/g, "eGFR"],
  [/\bThe patient is\b/gi, "Pasien adalah"],
  [/\ba male patient\b/gi, "pasien laki-laki"],
  [/\ba female patient\b/gi, "pasien perempuan"],
  [/\bwith a date of birth of\b/gi, "dengan tanggal lahir"],
  [/\bage (\d+ years?, \d+ months?, and \d+ days?)/gi, "usia $1"],
  [/\bThe report was ordered on\b/gi, "Laporan dipesan pada"],
  [/\band the results were obtained on\b/gi, "dan hasil diperoleh pada"],
  [/\bThe laboratory is\b/gi, "Laboratorium"],
  [/\bwith the doctor responsible being\b/gi, "dengan dokter penanggung jawab"],
  [/\bThe patient is insured through\b/gi, "Pasien diasuransikan melalui"],
  [/\bThe report includes\b/gi, "Laporan mencakup"],
  [/\bthe patient's weight, height\b/gi, "berat dan tinggi badan pasien"],
  [/\bcalculated creatinine clearance\b/gi, "clearance kreatinin terhitung"],
  [/\bunderwent a chemistry panel\b/gi, "menjalani panel kimia"],
  [/\bKey findings include\b/gi, "Temuan utama meliputi"],
  [/\bmoderate cardiovascular risk\b/gi, "risiko kardiovaskular sedang"],
  [/\bFurther evaluation and discussion with the patient are recommended\b/gi, "Evaluasi lanjutan dan diskusi dengan pasien disarankan"],
  [/\bValues should be interpreted with\b/gi, "Nilai perlu ditafsirkan bersama"],
  [/\bmedical history and risk factors\b/gi, "riwayat medis dan faktor risiko"],
  [/\bwithin normal ranges\b/gi, "dalam rentang normal"],
  [/\bbased on the provided data\b/gi, "berdasarkan data yang tersedia"],
  [/\bFurther clinical context is needed\b/gi, "Konteks klinis tambahan diperlukan"],
  [/\bto interpret these values fully\b/gi, "untuk menafsirkan nilai-nilai ini secara menyeluruh"],
  [/\bprovides a snapshot of\b/gi, "memberikan gambaran"],
  [/\bthe patient's\b/gi, "pasien"],
  [/\blipid profile\b/gi, "profil lipid"],
  [/\brenal function\b/gi, "fungsi ginjal"],
];

const DOCTOR_REPLACEMENTS: [RegExp, string][] = [
  [/\bpresented with a chemistry panel\b/gi, "menjalani panel kimia"],
  [/\bunderwent a chemistry panel\b/gi, "menjalani panel kimia"],
  [/\bon (\d{4}-\d{2}-\d{2})\b/g, "pada $1"],
  [/\bKey findings include\b/gi, "Temuan utama:"],
  [/\belevated LDL cholesterol\b/gi, "kolesterol LDL meningkat"],
  [/\bborderline total cholesterol\b/gi, "kolesterol total borderline"],
  [/\bmoderate cardiovascular risk\b/gi, "risiko kardiovaskular sedang"],
  [/\bFurther evaluation and discussion with the patient are recommended\b/gi, "Evaluasi lanjutan dan diskusi dengan pasien disarankan"],
  [/\bThe laboratory report provides\b/gi, "Laporan laboratorium memberikan"],
  [/\bwithin normal ranges\b/gi, "dalam rentang normal"],
  [/\bFurther clinical context is needed to interpret these values fully\b/gi, "Konteks klinis tambahan diperlukan untuk menafsirkan nilai secara menyeluruh"],
  ...CLINICAL_REPLACEMENTS,
];

function applyReplacements(text: string, pairs: [RegExp, string][]): string {
  let out = text;
  for (const [pattern, replacement] of pairs) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

export function localizeClinicalEnToId(en: string): string {
  return applyReplacements(en.trim(), CLINICAL_REPLACEMENTS);
}

export function localizeDoctorEnToId(en: string): string {
  return applyReplacements(en.trim(), DOCTOR_REPLACEMENTS);
}

export function isGenericLabClinicalTemplate(text: string): boolean {
  return /^Panel kimia darah untuk/i.test(text.trim());
}

export function isDoctorBriefWithOcrExcerpt(text: string): boolean {
  const t = text.trim();
  return (
    /^Ringkasan singkat untuk/i.test(t) ||
    /^Brief summary for/i.test(t) ||
    (/^Ringkasan singkat/i.test(t) && t.length > 280)
  );
}
