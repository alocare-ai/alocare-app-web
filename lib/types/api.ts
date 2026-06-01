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

export interface HealthProfile {
  id: string;
  patient_id: string;
  height_cm: number | null;
  weight_kg: number | null;
  bmi: number | null;
  activity_level: string | null;
  sleep_hours_avg: number | null;
  family_history: string | null;
  chronic_conditions: string | null;
  current_medications: string | null;
  dietary_preferences: string | null;
  health_goals: string | null;
  biological_age: number | null;
  intelligence_summary: string | null;
  intelligence_generated_at: string | null;
}

export interface BiomarkerTrendPoint {
  observed_at: string;
  value: number;
  value_text: string;
  status: string;
  report_id: string | null;
}

export interface BiomarkerTrend {
  code: string;
  name: string;
  unit: string | null;
  reference_low: number | null;
  reference_high: number | null;
  points: BiomarkerTrendPoint[];
  change_percent: number | null;
  direction: string | null;
  insight_en: string | null;
  insight_id: string | null;
  projected_breach_months: number | null;
}

export interface RiskAssessment {
  id: string;
  condition: string;
  condition_label: string;
  score: number;
  tier: string;
  factors: string[];
  narrative: string | null;
  computed_at: string;
}

export interface ActionPlanItem {
  id: string;
  week_number: number;
  category: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
}

export interface ActionPlan {
  id: string;
  patient_id: string;
  title: string;
  program_type: string;
  status: string;
  focus_areas: string[];
  start_date: string | null;
  end_date: string | null;
  items: ActionPlanItem[];
  progress_percent: number;
}

export interface HealthIntelligenceDashboard {
  patient_id: string;
  profile: HealthProfile | null;
  report_count: number;
  biomarker_trends: BiomarkerTrend[];
  risk_assessments: RiskAssessment[];
  action_plans: ActionPlan[];
  longitudinal_summary: string | null;
  key_insights: string[];
  concierge_level: number;
  generated_at: string | null;
}
