import { ApiError } from "@/lib/api/client";
import { shouldUseUpstreamRewriteUpload } from "@/lib/api/public-api-base";
import { fetchUploadCredentials } from "@/lib/api/upload-credentials";
import type { ClinicalIntelligenceResult } from "@/lib/types/api";
import type { Locale } from "@/hooks/use-locale";

export type ClinicalIntelligenceStreamStep =
  | "upload_received"
  | "ocr_processing"
  | "document_classification"
  | "medical_extraction"
  | "clinical_interpretation"
  | "clinical_report_generated"
  | "file_complete"
  | "complete"
  | "error";

export type ClinicalIntelligenceStreamEvent = {
  step: ClinicalIntelligenceStreamStep | string;
  progress: number;
  message?: string;
  file?: string;
  fileIndex?: number;
  fileTotal?: number;
  result?: ClinicalIntelligenceResult;
  clinicalIntelligence?: ClinicalIntelligenceResult;
  interpretation?: Record<string, unknown>;
};

export type ClinicalIntelligenceStreamHandlers = {
  onEvent: (event: ClinicalIntelligenceStreamEvent) => void;
  onComplete: (event: ClinicalIntelligenceStreamEvent) => void;
  onError: (message: string) => void;
};

function isTerminalComplete(event: ClinicalIntelligenceStreamEvent): boolean {
  return event.step === "clinical_report_generated";
}

function parseSseChunk(chunk: string): ClinicalIntelligenceStreamEvent | null {
  for (const line of chunk.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const raw = line.slice(5).trim();
    if (!raw) continue;
    try {
      return JSON.parse(raw) as ClinicalIntelligenceStreamEvent;
    } catch {
      return null;
    }
  }
  return null;
}

function dispatchCiEvent(
  event: ClinicalIntelligenceStreamEvent,
  handlers: ClinicalIntelligenceStreamHandlers,
): void {
  handlers.onEvent(event);
  if (event.step === "error") {
    const message = event.message ?? "Clinical intelligence failed";
    handlers.onError(message);
    throw new Error(message);
  }
  if (isTerminalComplete(event)) {
    handlers.onComplete(event);
  }
}

function consumeSseBuffer(
  buffer: string,
  handlers: ClinicalIntelligenceStreamHandlers,
  lastComplete: ClinicalIntelligenceStreamEvent | null,
): { remainder: string; lastComplete: ClinicalIntelligenceStreamEvent | null } {
  const parts = buffer.split("\n\n");
  const remainder = parts.pop() ?? "";

  for (const part of parts) {
    const event = parseSseChunk(part);
    if (!event) continue;
    dispatchCiEvent(event, handlers);
    if (isTerminalComplete(event)) {
      lastComplete = event;
    }
  }

  return { remainder, lastComplete };
}

async function openClinicalIntelligenceStream(
  reportId: string,
  locale: Locale,
  signal?: AbortSignal,
): Promise<Response> {
  const headers = { Accept: "text/event-stream" };
  const query = `preferredLanguage=${encodeURIComponent(locale)}`;

  if (shouldUseUpstreamRewriteUpload()) {
    const credentials = await fetchUploadCredentials();
    const url = `${credentials.apiUrl.replace(/\/$/, "")}/reports/${reportId}/clinical-intelligence/stream?${query}`;

    const fetchWithToken = (accessToken: string) =>
      fetch(url, {
        method: "GET",
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });

    let res = await fetchWithToken(credentials.accessToken);
    if (res.status === 401) {
      const refresh = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (refresh.ok) {
        const tokens = (await refresh.json()) as { access_token: string };
        res = await fetchWithToken(tokens.access_token);
      }
    }
    return res;
  }

  return fetch(
    `/api/reports/${reportId}/clinical-intelligence/stream?${query}`,
    {
      method: "GET",
      credentials: "include",
      headers,
      signal,
    },
  );
}

export async function streamClinicalIntelligence(
  reportId: string,
  handlers: ClinicalIntelligenceStreamHandlers,
  locale: Locale,
  signal?: AbortSignal,
): Promise<ClinicalIntelligenceResult | null> {
  let res: Response;
  try {
    res = await openClinicalIntelligenceStream(reportId, locale, signal);
  } catch (err) {
    if (err instanceof TypeError) {
      throw new ApiError(
        "Could not reach the clinical intelligence service. Check your connection and try again.",
        0,
      );
    }
    throw err;
  }

  if (!res.ok) {
    let detail: string | undefined;
    try {
      const body = (await res.json()) as { detail?: string };
      detail = typeof body.detail === "string" ? body.detail : undefined;
    } catch {
      try {
        detail = (await res.text()).slice(0, 500) || undefined;
      } catch {
        /* ignore */
      }
    }
    throw new ApiError(
      detail ?? `Clinical intelligence stream failed (${res.status})`,
      res.status,
      detail,
    );
  }

  if (!res.body) {
    throw new Error("Clinical intelligence stream returned no body");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastComplete: ClinicalIntelligenceStreamEvent | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (value) {
        buffer += decoder.decode(value, { stream: true });
      }

      const consumed = consumeSseBuffer(buffer, handlers, lastComplete);
      buffer = consumed.remainder;
      lastComplete = consumed.lastComplete;

      if (done) {
        if (buffer.trim()) {
          const trailing = parseSseChunk(buffer);
          if (trailing) {
            dispatchCiEvent(trailing, handlers);
            if (isTerminalComplete(trailing)) {
              lastComplete = trailing;
            }
          }
        }
        break;
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (lastComplete) {
    return (
      lastComplete.clinicalIntelligence ??
      lastComplete.result ??
      null
    );
  }

  throw new ApiError(
    "Clinical intelligence ended before completion. The connection may have timed out — try again with fewer or smaller photos.",
    0,
  );
}

export function runClinicalIntelligenceStream(
  reportId: string,
  locale: Locale,
  onEvent: (event: ClinicalIntelligenceStreamEvent) => void,
  signal?: AbortSignal,
): Promise<ClinicalIntelligenceResult | null> {
  return streamClinicalIntelligence(
    reportId,
    {
      onEvent,
      onComplete: () => {},
      onError: (message) => {
        throw new Error(message);
      },
    },
    locale,
    signal,
  );
}
