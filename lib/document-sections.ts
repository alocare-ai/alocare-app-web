export type DocumentSection = {
  filename: string;
  text: string;
};

const SECTION_HEADER = /^---\s*(.+?)\s*---\s*$/gm;

/** Parse `--- filename ---` blocks from combined OCR / upload text. */
export function splitDocumentSections(text: string): DocumentSection[] {
  const raw = text.trim();
  if (!raw || !raw.includes("---")) {
    return [];
  }

  const matches = [...raw.matchAll(SECTION_HEADER)];
  if (matches.length === 0) {
    return [];
  }

  return matches.map((match, index) => {
    const filename = match[1].trim();
    const start = match.index! + match[0].length;
    const end =
      index + 1 < matches.length ? matches[index + 1].index! : raw.length;
    return { filename, text: raw.slice(start, end).trim() };
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Sample every `--- filename ---` section for AI analysis (not only the first file). */
export function buildBalancedDocumentExcerpt(
  text: string,
  maxChars: number,
): string {
  const raw = text.trim();
  if (!raw) return "";
  if (raw.length <= maxChars) return raw;

  const sections = splitDocumentSections(raw);
  if (sections.length === 0) {
    return `${raw.slice(0, maxChars - 80)}\n\n[Document truncated — later files may be omitted.]`;
  }

  const header = `This medical report combines ${sections.length} uploaded files. Synthesize findings from ALL files.\n\n`;
  const overhead = header.length + sections.length * 48;
  const budget = Math.max(800, maxChars - overhead);
  const totalLen =
    sections.reduce((sum, s) => sum + s.text.length, 0) || 1;

  const parts = sections.map((section) => {
    const share = Math.max(350, Math.floor((budget * section.text.length) / totalLen));
    let chunk = section.text.slice(0, share);
    if (section.text.length > share) {
      chunk += "\n[...section truncated...]";
    }
    return `--- ${section.filename} ---\n${chunk}`;
  });

  const combined = header + parts.join("\n\n");
  if (combined.length <= maxChars) return combined;
  return `${combined.slice(0, maxChars - 60)}\n\n[Combined document excerpt truncated]`;
}
