import type { Patient, WorklistItem } from "@/lib/types/api";
import { apiFetch } from "./client";

export async function getPatients(): Promise<{
  items: Patient[];
  total: number;
}> {
  return apiFetch("/patients");
}

export async function getPatient(id: string): Promise<Patient> {
  return apiFetch<Patient>(`/patients/${id}`);
}

export async function getWorklist(): Promise<{
  items: WorklistItem[];
  total: number;
}> {
  return apiFetch("/worklist");
}

export async function getPatientConsultations(
  patientId: string,
): Promise<ConsultationList> {
  return apiFetch(`/patients/${patientId}/consultations`);
}

type ConsultationList = {
  items?: Array<{
    id: string;
    status: string;
    chief_complaint: string | null;
    created_at: string | null;
  }>;
};
