import type { TelemedicineSession } from "@/lib/types/api";
import { apiFetch } from "./client";

export async function createTelemedicineSession(data: {
  patientId: string;
  consultationId?: string;
}): Promise<TelemedicineSession> {
  return apiFetch<TelemedicineSession>("/telemedicine/sessions", {
    method: "POST",
    body: JSON.stringify({
      patientId: data.patientId,
      consultationId: data.consultationId,
    }),
  });
}

export async function getTelemedicineSession(
  id: string,
): Promise<TelemedicineSession> {
  return apiFetch<TelemedicineSession>(`/telemedicine/sessions/${id}`);
}
