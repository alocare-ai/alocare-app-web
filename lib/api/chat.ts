import type { AISession } from "@/lib/types/api";
import { reportInputType } from "@/lib/report-analysis";
import { apiFetch } from "./client";

export { reportInputType };

export async function createAISession(data?: {
  patient_reference?: string;
  preferred_language?: string;
}): Promise<AISession> {
  return apiFetch<AISession>("/ai/sessions", {
    method: "POST",
    body: JSON.stringify({
      patient_reference: data?.patient_reference,
      preferred_language: data?.preferred_language ?? "en",
    }),
  });
}

export async function sendChatMessage(
  sessionId: string,
  message: string,
  options?: {
    reportId?: string;
    preferredLanguage?: string;
  },
): Promise<{ reply: string; language?: string }> {
  return apiFetch<{ reply: string; language?: string }>("/ai/chat", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      message,
      reportId: options?.reportId,
      preferredLanguage: options?.preferredLanguage,
    }),
  });
}

export async function getAISession(sessionId: string): Promise<AISession> {
  return apiFetch<AISession>(`/ai/sessions/${sessionId}`);
}

/** @deprecated Use `runAnalyzeStream` from `@/lib/api/analyze-stream` instead. */
export async function analyzeReport(data: {
  sessionId: string;
  reportId: string;
  content: string;
  inputType?: "pdf" | "image" | "text";
  preferredLanguage?: string;
}): Promise<{
  summary: string;
  doctorSummary: string;
  nextActions: string[];
}> {
  const { runAnalyzeStream } = await import("./analyze-stream");
  const complete = await runAnalyzeStream({
    sessionId: data.sessionId,
    reportId: data.reportId,
    content: data.content,
    inputType: data.inputType,
    preferredLanguage: data.preferredLanguage,
  });
  return {
    summary: complete.summary ?? "",
    doctorSummary: complete.doctorSummary ?? "",
    nextActions: complete.nextActions ?? [],
  };
}
