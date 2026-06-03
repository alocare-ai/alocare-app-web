import { ApiError } from "@/lib/api/client";
import { refreshSessionCookies } from "@/lib/auth/refresh-session";
import type { Locale } from "@/lib/i18n";

export type ChatStreamStep = "started" | "token" | "complete" | "error";

export type ChatStreamEvent = {
  step: ChatStreamStep;
  delta?: string;
  reply?: string;
  language?: string;
  message?: string;
};

export type ReportChatStreamRequest = {
  sessionId: string;
  reportId: string;
  message: string;
  locale: Locale;
};

export type ChatStreamHandlers = {
  onEvent: (event: ChatStreamEvent) => void;
  onToken: (delta: string, accumulated: string) => void;
  onComplete: (event: ChatStreamEvent) => void;
  onError: (message: string) => void;
};

function parseSseChunk(chunk: string): ChatStreamEvent | null {
  for (const line of chunk.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const raw = line.slice(5).trim();
    if (!raw) continue;
    try {
      return JSON.parse(raw) as ChatStreamEvent;
    } catch {
      return null;
    }
  }
  return null;
}

export async function streamReportChat(
  data: ReportChatStreamRequest,
  handlers: ChatStreamHandlers,
  signal?: AbortSignal,
): Promise<ChatStreamEvent> {
  await refreshSessionCookies();

  const res = await fetch("/api/ai/chat/stream", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      sessionId: data.sessionId,
      reportId: data.reportId,
      message: data.message,
      preferredLanguage: data.locale,
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
      detail ?? `AI chat stream failed (${res.status})`,
      res.status,
      detail,
    );
  }

  if (!res.body) {
    throw new Error("AI chat stream returned no body");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let accumulated = "";
  let lastComplete: ChatStreamEvent | null = null;

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

        if (event.step === "token" && event.delta) {
          accumulated += event.delta;
          handlers.onToken(event.delta, accumulated);
        } else if (event.step === "complete") {
          lastComplete = event;
          handlers.onComplete(event);
        } else if (event.step === "error") {
          const message = event.message ?? "AI chat failed";
          handlers.onError(message);
          throw new Error(message);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (lastComplete) return lastComplete;

  throw new Error("AI chat stream ended without a complete event");
}
