/** Heuristic: text is likely English clinical prose (not Indonesian). */
export function looksEnglish(text: string): boolean {
  const sample = text.slice(0, 800).toLowerCase();
  const idHits = (
    sample.match(
      /\b(untuk|dengan|pasien|disarankan|nilai|laporan|panel|menunjukkan|temuan|perlu|berdasarkan|riwayat)\b/g,
    ) ?? []
  ).length;
  const enHits = (
    sample.match(
      /\b(the|patient|underwent|laboratory|results|recommend|report|includes|ordered|physician)\b/g,
    ) ?? []
  ).length;
  return enHits > idHits + 1;
}

export function looksIndonesian(text: string): boolean {
  return /\b(untuk|dengan|pasien|disarankan|nilai|laporan|panel|menunjukkan|temuan|perlu)\b/i.test(
    text.slice(0, 800),
  );
}

/** True when text still needs EN→ID localization (including partial / mixed translations). */
export function needsLocalizationToId(text: string): boolean {
  const sample = text.slice(0, 1500);
  if (!sample.trim()) return false;

  const englishHits = (
    sample.match(
      /\b(the|with|elevated|presented|indicating|showed|levels|normal|further|evaluation|management|physician|patient|negative|function|pressure|cholesterol|glycemic|urinalysis|proteinuria|hepatitis|guided|context|investigation|consider)\b/gi,
    ) ?? []
  ).length;

  if (englishHits >= 4) return true;
  if (/\bThe patient\b/i.test(sample)) return true;
  if (/\bpresented with\b/i.test(sample)) return true;
  if (/\bshould be guided\b/i.test(sample)) return true;

  return looksEnglish(sample);
}
