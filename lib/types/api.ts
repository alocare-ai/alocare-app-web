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

/** Patient record linked to a PATIENT-role portal login. */
export interface PatientAccountSummary {
  id: string;
  full_name: string;
  mrn: string | null;
  date_of_birth: string | null;
  gender: string | null;
  phone: string | null;
  insurance_provider: string | null;
  allergies: string | null;
  medical_alerts: string | null;
}

export interface EarlyWarning {
  code: string;
  severity: string;
  message: string;
  change_percent?: number | null;
}

export interface DashboardActionItem {
  title: string;
  category: string;
  priority: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  tenant_id: string | null;
  patient_id?: string | null;
  patient?: PatientAccountSummary | null;
  google_linked?: boolean;
  google_sign_in_disabled?: boolean;
}

export interface MessageResponse {
  message: string;
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

export interface ReportUploadedFile {
  filename: string;
  size_bytes: number;
}

export interface ReportFileAnalysis {
  filename: string;
  size_bytes: number;
  char_count: number;
  extract_preview: string;
  /** Full per-file OCR for doctor-summary repair (may exceed extract_preview). */
  ocr_text?: string;
  summary: BilingualStrings;
  key_findings?: ReportKeyFinding[];
}

export interface ReportPatientIdentity {
  name?: string | null;
  medical_record_number?: string | null;
  medicalRecordNumber?: string | null;
  date_of_birth?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  age?: string | null;
  address?: string | null;
  hospital?: string | null;
  report_type?: string | null;
  reportType?: string | null;
  report_date?: string | null;
  reportDate?: string | null;
  file_count?: number | null;
  fileCount?: number | null;
  matched_patient_id?: string | null;
  matchedPatientId?: string | null;
  match_level?: string | null;
  matchLevel?: string | null;
  requires_review?: boolean | null;
  requiresReview?: boolean | null;
  overall_confidence?: number | null;
  overallConfidence?: number | null;
  source_filename?: string | null;
  sourceFilename?: string | null;
}

export type AnalysisEngine = "ai" | "rule_based";

export interface ClinicalIntelligencePatientSummary {
  name?: string | null;
  age?: number | string | null;
  sex?: string | null;
  chief_complaint?: string[];
  chiefComplaint?: string[];
  source_documents?: string[];
  sourceDocuments?: string[];
}

export interface ClinicalIntelligenceClinicalSummary {
  short_summary?: string;
  shortSummary?: string;
  executive_summary?: string;
  executiveSummary?: string;
  risk_level?: string;
  riskLevel?: string;
  requires_doctor_review?: boolean;
  requiresDoctorReview?: boolean;
}

export interface ClinicalIntelligenceFindingItem {
  label: string;
  status: string;
  detail?: string;
  category?: string;
}

export interface ClinicalIntelligenceFindingCategory {
  category: string;
  items: ClinicalIntelligenceFindingItem[];
}

export interface ClinicalIntelligenceFindings {
  laboratory?: ClinicalIntelligenceFindingCategory[];
  endoscopy?: string[];
  radiology?: string[];
  other?: string[];
  abnormal?: ClinicalIntelligenceFindingItem[];
  normal?: ClinicalIntelligenceFindingItem[];
}

export interface ClinicalIntelligenceDiagnosisSupport {
  primary_impression?: string[];
  primaryImpression?: string[];
  differential_diagnosis?: string[];
  differentialDiagnosis?: string[];
  supporting_evidence?: string[];
  supportingEvidence?: string[];
  pending_results?: string[];
  pendingResults?: string[];
  clinical_interpretation?: string;
  clinicalInterpretation?: string;
}

export interface ClinicalIntelligenceRiskAssessment {
  level?: string;
  summary?: string;
  red_flags?: string[];
  redFlags?: string[];
  alarm_symptoms?: string[];
  alarmSymptoms?: string[];
}

export interface ClinicalIntelligenceRecommendations {
  doctor_actions?: string[];
  doctorActions?: string[];
  patient_advice?: string[];
  patientAdvice?: string[];
}

export interface ClinicalIntelligenceResult {
  patient_summary?: ClinicalIntelligencePatientSummary;
  patientSummary?: ClinicalIntelligencePatientSummary;
  clinical_summary?: ClinicalIntelligenceClinicalSummary;
  clinicalSummary?: ClinicalIntelligenceClinicalSummary;
  findings?: ClinicalIntelligenceFindings;
  diagnosis_support?: ClinicalIntelligenceDiagnosisSupport;
  diagnosisSupport?: ClinicalIntelligenceDiagnosisSupport;
  risk_assessment?: ClinicalIntelligenceRiskAssessment;
  riskAssessment?: ClinicalIntelligenceRiskAssessment;
  recommendations?: ClinicalIntelligenceRecommendations;
  patient_friendly?: { summary?: string; key_points?: string[]; keyPoints?: string[] };
  patientFriendly?: { summary?: string; key_points?: string[]; keyPoints?: string[] };
  safety_note?: string;
  safetyNote?: string;
  confidence_score?: number | null;
  confidenceScore?: number | null;
}

export interface ClinicalDocumentUploadResponse {
  document_id: string;
  documentId?: string;
  job_id: string;
  jobId?: string;
  status: string;
  poll_url: string;
  pollUrl?: string;
}

export interface ClinicalIntelligenceJobResponse {
  job_id: string;
  jobId?: string;
  document_id: string;
  documentId?: string;
  patient_id: string;
  patientId?: string;
  status: string;
  progress: number;
  step?: string | null;
  message?: string | null;
  result?: ClinicalIntelligenceResult | null;
  error?: string | null;
  approved?: boolean;
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
  uploaded_files?: ReportUploadedFile[];
  file_analyses?: ReportFileAnalysis[];
  patient_identity?: ReportPatientIdentity | null;
  patientIdentity?: ReportPatientIdentity | null;
  analysis_engine?: AnalysisEngine | null;
  analysisEngine?: AnalysisEngine | null;
  requires_clinical_review?: boolean | null;
  requiresClinicalReview?: boolean | null;
  clinical_intelligence?: ClinicalIntelligenceResult | null;
  clinicalIntelligence?: ClinicalIntelligenceResult | null;
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
  health_score?: number | null;
  risk_indicators?: string[];
  biomarker_trends: BiomarkerTrend[];
  risk_assessments: RiskAssessment[];
  action_plans: ActionPlan[];
  action_items?: DashboardActionItem[];
  early_warnings?: EarlyWarning[];
  recent_uploads?: string[];
  ai_recommendations?: string[];
  upcoming_tests?: string[];
  longitudinal_summary: string | null;
  key_insights: string[];
  concierge_level: number;
  generated_at: string | null;
}
