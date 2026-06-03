import type {
  ActionPlan,
  ActionPlanItem,
  HealthIntelligenceDashboard,
  HealthProfile,
} from "@/lib/types/api";
import { apiFetch } from "./client";

export async function getHealthIntelligence(
  patientId: string,
  locale = "en",
): Promise<HealthIntelligenceDashboard> {
  return apiFetch(
    `/patients/${patientId}/health-intelligence?locale=${encodeURIComponent(locale)}`,
  );
}

export async function refreshHealthIntelligence(
  patientId: string,
  locale = "en",
): Promise<{ dashboard: HealthIntelligenceDashboard; refreshed: boolean }> {
  return apiFetch(
    `/patients/${patientId}/health-intelligence/refresh?locale=${encodeURIComponent(locale)}`,
    { method: "POST" },
  );
}

export async function getHealthProfile(patientId: string): Promise<HealthProfile> {
  return apiFetch(`/patients/${patientId}/health-profile`);
}

export async function updateHealthProfile(
  patientId: string,
  body: Partial<HealthProfile>,
): Promise<HealthProfile> {
  return apiFetch(`/patients/${patientId}/health-profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function generateActionPlan(
  patientId: string,
  programType = "90_day",
  preferredLanguage = "en",
): Promise<ActionPlan> {
  return apiFetch(`/patients/${patientId}/action-plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      program_type: programType,
      preferred_language: preferredLanguage,
    }),
  });
}

export async function updateActionPlanItem(
  itemId: string,
  status: string,
): Promise<ActionPlanItem> {
  return apiFetch(`/action-plan-items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export async function getHealthTimeline(patientId: string, locale = "en") {
  return apiFetch(
    `/patients/${patientId}/timeline?locale=${encodeURIComponent(locale)}`,
  );
}
