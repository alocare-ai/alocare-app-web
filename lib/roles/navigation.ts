import type { Locale } from "@/lib/i18n";
import type { UserRole } from "@/lib/types/api";

export type NavItem = {
  label: string;
  labelId: string;
  href: string;
};

const NAV: Record<string, { en: string; id: string; href: string }> = {
  dashboard: { en: "Dashboard", id: "Dasbor", href: "/dashboard" },
  reports: { en: "Reports", id: "Laporan", href: "/reports/upload" },
  chat: { en: "AI Chat", id: "Chat AI", href: "/chat" },
  patients: { en: "Patients", id: "Pasien", href: "/patients" },
  healthIntel: {
    en: "My Health",
    id: "Kesehatan Saya",
    href: "/my-health",
  },
  enterprise: { en: "Enterprise", id: "Perusahaan", href: "/enterprise" },
  telemedicine: { en: "Telemedicine", id: "Telemedisin", href: "/telemedicine/new" },
  settings: { en: "Settings", id: "Pengaturan", href: "/settings" },
  myReports: { en: "My Reports", id: "Laporan Saya", href: "/reports/upload" },
  history: { en: "History", id: "Riwayat", href: "/dashboard" },
  myHealth: { en: "My Health", id: "Kesehatan Saya", href: "/health" },
  reviewQueue: { en: "Review queue", id: "Antrian review", href: "/review" },
};

function item(key: keyof typeof NAV): NavItem {
  const n = NAV[key];
  return { label: n.en, labelId: n.id, href: n.href };
}

const DOCTOR_ROLES: UserRole[] = [
  "DOCTOR",
  "CLINICIAN",
  "NURSE",
  "TENANT_ADMIN",
  "SUPER_ADMIN",
];
const HR_ROLES: UserRole[] = ["HR_ADMIN"];
const ADMIN_ROLES: UserRole[] = ["SUPER_ADMIN", "TENANT_ADMIN", "AUDITOR"];

export function getDefaultNavItems(): NavItem[] {
  return [
    item("dashboard"),
    item("reports"),
    item("patients"),
    item("settings"),
  ];
}

export function getNavItemsForRole(role: UserRole): NavItem[] {
  if (role === "PATIENT") {
    return [
      item("healthIntel"),
      item("myReports"),
      item("settings"),
    ];
  }

  if (HR_ROLES.includes(role)) {
    return [item("dashboard"), item("enterprise"), item("reports")];
  }

  if (ADMIN_ROLES.includes(role) && !DOCTOR_ROLES.includes(role)) {
    return [
      item("dashboard"),
      item("reports"),
      item("patients"),
      item("enterprise"),
      item("settings"),
    ];
  }

  return [
    item("dashboard"),
    item("reviewQueue"),
    item("reports"),
    item("patients"),
    item("healthIntel"),
    item("telemedicine"),
  ];
}

export function labelNav(item: NavItem, locale: Locale): string {
  return locale === "id" ? item.labelId : item.label;
}

export function isNavActive(href: string, pathname: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/reports/upload") return pathname.startsWith("/reports");
  if (href === "/telemedicine/new") return pathname.startsWith("/telemedicine");
  if (href === "/my-health") {
    return pathname === "/my-health" || pathname.endsWith("/health");
  }
  if (href === "/review") return pathname.startsWith("/review");
  return pathname === href || pathname.startsWith(`${href}/`);
}
