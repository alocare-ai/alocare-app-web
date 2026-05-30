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
