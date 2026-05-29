import type { AISession } from "@/lib/types/api";
import { apiFetch } from "./client";

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
): Promise<{ reply: string }> {
  return apiFetch<{ reply: string }>("/ai/chat", {
    method: "POST",
    body: JSON.stringify({ sessionId, message }),
  });
}

export async function getAISession(sessionId: string): Promise<AISession> {
  return apiFetch<AISession>(`/ai/sessions/${sessionId}`);
}

export async function analyzeReport(data: {
  sessionId: string;
  reportId: string;
  content: string;
  preferredLanguage?: string;
}): Promise<{
  summary: string;
  doctorSummary: string;
  nextActions: string[];
}> {
  return apiFetch("/ai/analyze", {
    method: "POST",
    body: JSON.stringify({
      sessionId: data.sessionId,
      reportId: data.reportId,
      content: data.content,
      inputType: "pdf",
      preferredLanguage: data.preferredLanguage ?? "en",
    }),
  });
}
