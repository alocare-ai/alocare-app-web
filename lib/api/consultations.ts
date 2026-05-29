import type { Consultation } from "@/lib/types/api";
import { apiFetch } from "./client";

export async function getConsultation(id: string): Promise<Consultation> {
  return apiFetch<Consultation>(`/consultations/${id}`);
}

export async function updateSoap(
  id: string,
  soap: {
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
    doctor_notes?: string;
  },
): Promise<Consultation> {
  return apiFetch<Consultation>(`/consultations/${id}/soap`, {
    method: "PUT",
    body: JSON.stringify(soap),
  });
}

export async function submitConsultation(id: string): Promise<Consultation> {
  return apiFetch<Consultation>(`/consultations/${id}/submit`, {
    method: "POST",
  });
}
