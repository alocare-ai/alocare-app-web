export type UserRole =
  | "SUPER_ADMIN"
  | "TENANT_ADMIN"
  | "DOCTOR"
  | "CLINICIAN"
  | "NURSE"
  | "PATIENT"
  | "PHARMACIST"
  | "LAB_STAFF"
  | "HR_ADMIN"
  | "AUDITOR";

export type ReportStatus =
  | "uploaded"
  | "processing"
  | "completed"
  | "validated"
  | "failed";

export type WorklistStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

export type ConsultationStatus =
  | "draft"
  | "in_progress"
  | "submitted"
  | "approved";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  tenant_id: string | null;
}

export interface Report {
  id: string;
  title: string;
  patient_id: string | null;
  status: ReportStatus;
  file_reference: string | null;
  ai_session_id: string | null;
  created_at: string | null;
}

export interface BilingualStrings {
  en: string;
  id: string;
}

export interface ReportKeyFinding {
  name: string;
  value: string;
  status: string;
  reference_range?: string | null;
}

export interface ReportResult {
  id: string;
  status: ReportStatus;
  summary: string | null;
  doctor_summary: string | null;
  next_actions: string[];
  summary_bilingual?: BilingualStrings | null;
  doctor_summary_bilingual?: BilingualStrings | null;
  next_actions_bilingual?: { en: string[]; id: string[] } | null;
  key_findings?: ReportKeyFinding[];
  confidence_score?: number | null;
  risk_indicator?: string | null;
}

export interface WorklistItem {
  id: string;
  patient_id: string;
  title: string;
  description: string | null;
  status: WorklistStatus;
  assigned_to: string | null;
  created_at: string | null;
}

export interface Patient {
  id: string;
  tenant_id: string;
  full_name: string;
  mrn: string | null;
  date_of_birth: string | null;
  gender: string | null;
  phone: string | null;
  insurance_provider: string | null;
  allergies: string | null;
  medical_alerts: string | null;
  created_at: string | null;
}

export interface Consultation {
  id: string;
  patient_id: string;
  doctor_id: string;
  status: ConsultationStatus;
  chief_complaint: string | null;
  soap_subjective: string | null;
  soap_objective: string | null;
  soap_assessment: string | null;
  soap_plan: string | null;
  doctor_notes: string | null;
  ai_draft: string | null;
  created_at: string | null;
}

export interface AISession {
  id: string;
  status: string;
  patient_reference: string | null;
  preferred_language: string;
}

export interface EnterpriseDashboard {
  workforce_count: number;
  screening_completed: number;
  trends: { metric: string; value: number; unit: string }[];
  alerts: string[];
}

export interface TelemedicineSession {
  id: string;
  status: string;
  patient_id: string;
  started_at: string;
}

export interface AuditLog {
  id?: string;
  action: string;
  user_id?: string;
  timestamp?: string;
  details?: string;
}
