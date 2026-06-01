import type { UserProfile } from "@/lib/types/api";

/** Route after successful login, based on role and linked patient record. */
export function getPostLoginPath(user: UserProfile, fallback = "/dashboard"): string {
  if (user.role === "PATIENT") {
    if (user.patient_id) {
      return "/my-health";
    }
    return "/settings";
  }
  return fallback;
}
