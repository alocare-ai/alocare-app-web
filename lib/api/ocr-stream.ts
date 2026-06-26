import { ApiError } from "@/lib/api/client";
import { shouldUseUpstreamRewriteUpload } from "@/lib/api/public-api-base";
import { fetchUploadCredentials } from "@/lib/api/upload-credentials";

export type OcrStreamStep =
  | "started"
  | "loading"
  | "extracting"
  | "page"
  | "ocr"
  | "file_complete"
  | "complete"
  | "identity"
  | "error";

export type IdentityStreamSubstep =
  | "started"
  | "file"
  | "file_result"
  | "selecting"
  | "saving"
  | "cached"
  | "complete";

export type OcrStreamEvent = {
  step: OcrStreamStep;
  progress: number;
  message?: string;
  substep?: IdentityStreamSubstep;
  page?: number;
  totalPages?: number;
  charCount?: number;
  text?: string;
  file?: string;
  fileIndex?: number;
  fileTotal?: number;
  patientIdentity?: Record<string, unknown>;
  patientName?: string;
  medicalRecordNumber?: string;
  overallConfidence?: number;
  found?: boolean;
};

export type OcrStreamHandlers = {
  onEvent: (event: OcrStreamEvent) => void;
  onComplete: (event: OcrStreamEvent) => void;
  onError: (message: string) => void;
};

function isTerminalComplete(event: OcrStreamEvent): boolean {
  return event.step === "complete" && event.fileTotal != null;
}

function parseSseChunk(chunk: string): OcrStreamEvent | null {
  for (const line of chunk.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const raw = line.slice(5).trim();
    if (!raw) continue;
    try {
      return JSON.parse(raw) as OcrStreamEvent;
    } catch {
      return null;
    }
  }
  return null;
}

function dispatchOcrEvent(
  event: OcrStreamEvent,
  handlers: OcrStreamHandlers,
): void {
  handlers.onEvent(event);
  if (event.step === "error") {
    const message = event.message ?? "OCR failed";
    handlers.onError(message);
    throw new Error(message);
  }
  if (isTerminalComplete(event)) {
    handlers.onComplete(event);
  }
}

function consumeSseBuffer(
  buffer: string,
  handlers: OcrStreamHandlers,
  lastComplete: OcrStreamEvent | null,
): { remainder: string; lastComplete: OcrStreamEvent | null } {
  const parts = buffer.split("\n\n");
  const remainder = parts.pop() ?? "";

  for (const part of parts) {
    const event = parseSseChunk(part);
    if (!event) continue;
    dispatchOcrEvent(event, handlers);
    if (isTerminalComplete(event)) {
      lastComplete = event;
    }
  }

  return { remainder, lastComplete };
}

/** Production: stream directly to api.alocare.net (avoids Vercel serverless timeouts on long SSE). */
async function openOcrStream(
  reportId: string,
  signal?: AbortSignal,
): Promise<Response> {
  const headers = { Accept: "text/event-stream" };

  if (shouldUseUpstreamRewriteUpload()) {
    const credentials = await fetchUploadCredentials();
    const url = `${credentials.apiUrl.replace(/\/$/, "")}/reports/${reportId}/ocr/stream`;

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

  return fetch(`/api/reports/${reportId}/ocr/stream`, {
    method: "GET",
    credentials: "include",
    headers,
    signal,
  });
}

export async function streamOcr(
  reportId: string,
  handlers: OcrStreamHandlers,
  signal?: AbortSignal,
): Promise<string> {
  let res: Response;
  try {
    res = await openOcrStream(reportId, signal);
  } catch (err) {
    if (err instanceof TypeError) {
      throw new ApiError(
        "Could not reach the OCR service. Check your connection and try again.",
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
      detail ?? `OCR stream failed (${res.status})`,
      res.status,
      detail,
    );
  }

  if (!res.body) {
    throw new Error("OCR stream returned no body");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastComplete: OcrStreamEvent | null = null;

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
            dispatchOcrEvent(trailing, handlers);
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
    return lastComplete.text ?? "";
  }

  throw new ApiError(
    "OCR ended before completion. The connection may have timed out — try again with fewer or smaller photos.",
    0,
  );
}

export function runOcrStream(
  reportId: string,
  onEvent: (event: OcrStreamEvent) => void,
  signal?: AbortSignal,
): Promise<string> {
  return streamOcr(
    reportId,
    {
      onEvent,
      onComplete: () => {},
      onError: (message) => {
        throw new Error(message);
      },
    },
    signal,
  );
}
