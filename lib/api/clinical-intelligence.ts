import { apiFetch } from "@/lib/api/client";
import type {
  ClinicalDocumentUploadResponse,
  ClinicalIntelligenceJobResponse,
} from "@/lib/types/api";

export async function uploadClinicalDocument(
  patientId: string,
  file: File,
  options?: {
    documentType?: string;
    encounterId?: string;
    preferredLanguage?: string;
  },
): Promise<ClinicalDocumentUploadResponse> {
  const form = new FormData();
  form.append("file", file);
  if (options?.documentType) {
    form.append("documentType", options.documentType);
  }
  if (options?.encounterId) {
    form.append("encounterId", options.encounterId);
  }
  if (options?.preferredLanguage) {
    form.append("preferredLanguage", options.preferredLanguage);
  }

  return apiFetch<ClinicalDocumentUploadResponse>(
    `/patients/${patientId}/clinical-documents`,
    { method: "POST", body: form },
  );
}

export async function getClinicalIntelligenceJob(
  jobId: string,
): Promise<ClinicalIntelligenceJobResponse> {
  return apiFetch<ClinicalIntelligenceJobResponse>(
    `/clinical-intelligence/jobs/${jobId}`,
  );
}

export async function approveClinicalResult(
  resultId: string,
  body: {
    notes?: string;
    approved?: boolean;
    editedResult?: Record<string, unknown>;
  },
): Promise<{ resultId: string; documentId: string; status: string; approved: boolean }> {
  return apiFetch(`/clinical-intelligence/results/${resultId}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      notes: body.notes,
      approved: body.approved ?? true,
      editedResult: body.editedResult,
    }),
  });
}

export const CLINICAL_INTELLIGENCE_STEPS = [
  "upload_received",
  "ocr_processing",
  "document_classification",
  "medical_extraction",
  "clinical_interpretation",
  "clinical_report_generated",
] as const;

export function clinicalStepLabel(
  step: string | null | undefined,
  locale: "en" | "id",
): string {
  const labels: Record<string, { en: string; id: string }> = {
    upload_received: { en: "Upload received", id: "Upload diterima" },
    ocr_processing: { en: "OCR processing", id: "Memproses OCR" },
    document_classification: {
      en: "Document classification",
      id: "Klasifikasi dokumen",
    },
    medical_extraction: {
      en: "Medical entity extraction",
      id: "Ekstraksi entitas medis",
    },
    clinical_interpretation: {
      en: "Clinical interpretation",
      id: "Interpretasi klinis",
    },
    clinical_report_generated: {
      en: "Report ready for doctor review",
      id: "Laporan siap ditinjau dokter",
    },
    queued: { en: "Queued", id: "Dalam antrian" },
    processing: { en: "Processing", id: "Memproses" },
    completed: { en: "Completed", id: "Selesai" },
    failed: { en: "Failed", id: "Gagal" },
  };
  const entry = labels[step ?? ""] ?? {
    en: step ?? "Processing",
    id: step ?? "Memproses",
  };
  return locale === "id" ? entry.id : entry.en;
}
