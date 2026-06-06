import { ApiError } from "@/lib/api/client";
import { shouldUseUpstreamRewriteUpload } from "@/lib/api/public-api-base";
import { fetchUploadCredentials } from "@/lib/api/upload-credentials";

export {
  analyzeStreamEventToProgress,
  phaseIndexFromAnalyzeStep,
} from "@/lib/ai-analysis-progress";

export type AnalyzeStreamStep =
  | "started"
  | "entities"
  | "generating"
  | "parsing"
  | "complete"
  | "error";

export type AnalyzeStreamEvent = {
  step: AnalyzeStreamStep;
  progress: number;
  message?: string;
  summary?: string;
  doctorSummary?: string;
  nextActions?: string[];
  keyFindings?: unknown[];
  confidenceScore?: number;
  riskIndicator?: string;
  result?: Record<string, unknown>;
};

export type AnalyzeStreamRequest = {
  sessionId: string;
  reportId: string;
  content: string;
  inputType?: "pdf" | "image" | "text";
  preferredLanguage?: string;
  patientReference?: string;
};

export type AnalyzeStreamHandlers = {
  onEvent: (event: AnalyzeStreamEvent) => void;
  onComplete: (event: AnalyzeStreamEvent) => void;
  onError: (message: string) => void;
};

function dispatchAnalyzeEvent(
  event: AnalyzeStreamEvent,
  handlers: AnalyzeStreamHandlers,
): void {
  handlers.onEvent(event);
  if (event.step === "complete") {
    handlers.onComplete(event);
  } else if (event.step === "error") {
    const message = event.message ?? "AI analysis failed";
    handlers.onError(message);
    throw new Error(message);
  }
}

function consumeSseBuffer(
  buffer: string,
  handlers: AnalyzeStreamHandlers,
  lastComplete: AnalyzeStreamEvent | null,
): { remainder: string; lastComplete: AnalyzeStreamEvent | null } {
  const parts = buffer.split("\n\n");
  const remainder = parts.pop() ?? "";

  for (const part of parts) {
    const event = parseSseChunk(part);
    if (!event) continue;
    dispatchAnalyzeEvent(event, handlers);
    if (event.step === "complete") {
      lastComplete = event;
    }
  }

  return { remainder, lastComplete };
}

function parseSseChunk(chunk: string): AnalyzeStreamEvent | null {
  for (const line of chunk.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const raw = line.slice(5).trim();
    if (!raw) continue;
    try {
      return JSON.parse(raw) as AnalyzeStreamEvent;
    } catch {
      return null;
    }
  }
  return null;
}

function analyzeStreamBody(data: AnalyzeStreamRequest): string {
  return JSON.stringify({
    sessionId: data.sessionId,
    reportId: data.reportId,
    content: data.content,
    inputType: data.inputType ?? "pdf",
    preferredLanguage: data.preferredLanguage ?? "en",
    patientReference: data.patientReference,
  });
}

/** Production: stream directly to api.alocare.net (avoids Vercel serverless timeouts on long SSE). */
async function openAnalyzeStream(
  data: AnalyzeStreamRequest,
  signal?: AbortSignal,
): Promise<Response> {
  const body = analyzeStreamBody(data);
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  };

  if (shouldUseUpstreamRewriteUpload()) {
    const { apiUrl, accessToken } = await fetchUploadCredentials();
    return fetch(`${apiUrl.replace(/\/$/, "")}/ai/analyze/stream`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
      body,
      signal,
    });
  }

  return fetch("/api/ai/analyze/stream", {
    method: "POST",
    credentials: "include",
    headers,
    body,
    signal,
  });
}

export async function streamAnalyze(
  data: AnalyzeStreamRequest,
  handlers: AnalyzeStreamHandlers,
  signal?: AbortSignal,
): Promise<AnalyzeStreamEvent> {
  let res: Response;
  try {
    res = await openAnalyzeStream(data, signal);
  } catch (err) {
    if (err instanceof TypeError) {
      throw new ApiError(
        "Could not reach the AI analysis service. Check your connection and try again.",
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
      detail ?? `AI analyze stream failed (${res.status})`,
      res.status,
      detail,
    );
  }

  if (!res.body) {
    throw new Error("AI analyze stream returned no body");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastComplete: AnalyzeStreamEvent | null = null;

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
            dispatchAnalyzeEvent(trailing, handlers);
            if (trailing.step === "complete") {
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

  if (lastComplete) return lastComplete;

  throw new ApiError(
    "AI analysis ended before completion. The connection may have timed out — try again with fewer or smaller files.",
    0,
  );
}

export function runAnalyzeStream(
  data: AnalyzeStreamRequest,
  onEvent?: (event: AnalyzeStreamEvent) => void,
  signal?: AbortSignal,
): Promise<AnalyzeStreamEvent> {
  return streamAnalyze(
    data,
    {
      onEvent: (event) => onEvent?.(event),
      onComplete: () => {},
      onError: (message) => {
        throw new Error(message);
      },
    },
    signal,
  );
}
