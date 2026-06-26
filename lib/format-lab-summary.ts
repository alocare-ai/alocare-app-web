export type LabSummaryMetric = {
  text: string;
  abnormal: boolean;
};

export type LabSummaryPanel = {
  label: string;
  metrics: LabSummaryMetric[];
  placeholder?: boolean;
};

export type ParsedLabSummary = {
  title: string;
  intro: string;
  sectionHeading: string | null;
  panels: LabSummaryPanel[];
  notable: string | null;
  footer: string | null;
};

const LAB_SUMMARY_MARKER =
  /\b(?:laboratory report for|laporan laboratorium untuk)\b/i;

const NOTABLE_PREFIX =
  /^(?:notable|abnormal|kelainan|perlu perhatian)\s*:\s*/i;

const FOOTER_MARKER =
  /\b(?:discuss results with the patient|interpret with clinical context|values are generally within reference|nilai tercantum umumnya dalam rentang|tafsirkan bersama|diskusikan hasil dengan pasien|rencanakan tindak lanjut)\b/i;

function isAbnormalMetric(text: string): boolean {
  return /\((?:low|high|rendah|tinggi|abnormal)\)/i.test(text);
}

function isPlaceholderPanel(values: string): boolean {
  return /see full values in source file|nilai lengkap di berkas sumber/i.test(
    values,
  );
}

function splitMetrics(values: string): LabSummaryMetric[] {
  return values
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((text) => ({
      text,
      abnormal: isAbnormalMetric(text),
    }));
}

function splitPanelChunk(chunk: string): LabSummaryPanel | null {
  const trimmed = chunk.trim();
  if (!trimmed) return null;

  const colon = trimmed.indexOf(":");
  if (colon < 0) {
    return {
      label: trimmed,
      metrics: [],
    };
  }

  const label = trimmed.slice(0, colon).trim();
  const values = trimmed.slice(colon + 1).trim();
  if (!label) return null;

  return {
    label,
    metrics: splitMetrics(values),
    placeholder: isPlaceholderPanel(values),
  };
}

function extractNotableAndFooter(tail: string): {
  notable: string | null;
  footer: string | null;
} {
  const trimmed = tail.trim();
  if (!trimmed) return { notable: null, footer: null };

  const paragraphs = trimmed
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  let notable: string | null = null;
  let footer: string | null = null;

  for (const paragraph of paragraphs) {
    if (NOTABLE_PREFIX.test(paragraph)) {
      notable = paragraph.replace(NOTABLE_PREFIX, "").trim() || paragraph;
      continue;
    }
    if (FOOTER_MARKER.test(paragraph)) {
      footer = paragraph;
    }
  }

  if (!footer) {
    const footerMatch = trimmed.match(
      /(?:^|\n\n)([^•\n]*(?:discuss results|interpret with clinical|tafsirkan bersama|diskusikan hasil)[^•\n]*)$/i,
    );
    if (footerMatch) {
      footer = footerMatch[1].trim();
    }
  }

  return { notable, footer };
}

/** Parse unified hospital lab doctor / clinical overview text into panels. */
export function parseLabSummary(text: string): ParsedLabSummary | null {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized || !LAB_SUMMARY_MARKER.test(normalized)) {
    return null;
  }

  const bulletParts = normalized.split(/\s*•\s+/);
  if (bulletParts.length < 2) {
    return null;
  }

  const head = bulletParts[0].trim();
  const panelChunks = bulletParts.slice(1);

  let title = head;
  let intro = "";
  let sectionHeading: string | null = null;

  const sectionMatch = head.match(
    /^(.*?)(?:\n\n|\n)?((?:results from|hasil dari)\s+\d+\s+panels?:)$/i,
  );
  if (sectionMatch) {
    intro = sectionMatch[1].trim();
    sectionHeading = sectionMatch[2].trim();
    title = intro.split(/\n/)[0]?.trim() || intro;
  } else {
    const colonIdx = head.lastIndexOf(":");
    if (colonIdx >= 0 && colonIdx < head.length - 1) {
      title = head.slice(0, colonIdx + 1).trim();
      const afterColon = head.slice(colonIdx + 1).trim();
      if (afterColon && !afterColon.includes("\n")) {
        intro = title;
        title = title.replace(/:\s*$/, "");
      } else {
        intro = head;
      }
    } else {
      intro = head;
      title = head.split(/\n/)[0]?.trim() || head;
    }
  }

  const panels: LabSummaryPanel[] = [];
  let tail = "";

  for (let i = 0; i < panelChunks.length; i += 1) {
    let chunk = panelChunks[i].trim();
    if (!chunk) continue;

    if (i === panelChunks.length - 1) {
      const newlineIdx = chunk.indexOf("\n\n");
      if (newlineIdx >= 0) {
        tail = chunk.slice(newlineIdx).trim();
        chunk = chunk.slice(0, newlineIdx).trim();
      } else {
        const footerMatch = chunk.match(
          /\s+((?:values are generally|nilai tercantum|abnormal:|kelainan:|notable:|perlu perhatian:).+)$/i,
        );
        if (footerMatch) {
          tail = footerMatch[1].trim();
          chunk = chunk.slice(0, footerMatch.index).trim();
        } else if (FOOTER_MARKER.test(chunk) && !/^.+:\s*.+/.test(chunk)) {
          tail = chunk;
          continue;
        }
      }
    }

    const panel = splitPanelChunk(chunk);
    if (panel) panels.push(panel);
  }

  if (panels.length === 0) return null;

  const { notable, footer } = extractNotableAndFooter(tail);

  return {
    title,
    intro: intro || title,
    sectionHeading,
    panels,
    notable,
    footer,
  };
}

export function hasStructuredLabSummary(text: string): boolean {
  return parseLabSummary(text) !== null;
}
