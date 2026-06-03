import { ApiError } from "@/lib/api/client";

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

export async function streamAnalyze(
  data: AnalyzeStreamRequest,
  handlers: AnalyzeStreamHandlers,
  signal?: AbortSignal,
): Promise<AnalyzeStreamEvent> {
  const res = await fetch("/api/ai/analyze/stream", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      sessionId: data.sessionId,
      reportId: data.reportId,
      content: data.content,
      inputType: data.inputType ?? "pdf",
      preferredLanguage: data.preferredLanguage ?? "en",
      patientReference: data.patientReference,
    }),
    signal,
  });

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
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";

      for (const part of parts) {
        const event = parseSseChunk(part);
        if (!event) continue;

        handlers.onEvent(event);

        if (event.step === "complete") {
          lastComplete = event;
          handlers.onComplete(event);
        } else if (event.step === "error") {
          const message = event.message ?? "AI analysis failed";
          handlers.onError(message);
          throw new Error(message);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (lastComplete) return lastComplete;

  throw new Error("AI analyze stream ended without a complete event");
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
