"use client";

import {
  Avatar,
  Badge,
  Button,
  Header,
  Spinner,
} from "@alocare/design-system";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";
import { logout } from "@/lib/api/auth";
import {
  getDefaultNavItems,
  getNavItemsForRole,
  isNavActive,
  labelNav,
} from "@/lib/roles/navigation";
import type { UserProfile } from "@/lib/types/api";

type AppShellProps = {
  children: React.ReactNode;
  user?: UserProfile;
};

function userInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AppShell({ children, user: userProp }: AppShellProps) {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: userFromQuery, isLoading, isError } = useAuth();
  const user = userProp ?? userFromQuery;

  const navItems = (user ? getNavItemsForRole(user.role) : getDefaultNavItems()).map(
    (item) => ({
      label: labelNav(item, locale),
      href: item.href,
      active: isNavActive(item.href, pathname),
    }),
  );

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  if (isLoading && !userProp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        className="[&>div]:flex-wrap [&>div]:items-center [&>div]:gap-x-2 [&>div]:gap-y-2 [&>div]:px-3 [&>div]:py-2.5 sm:[&>div]:flex-nowrap sm:[&>div]:gap-4 sm:[&>div]:px-6 sm:[&>div]:py-4 [&>div>div:first-child]:min-w-0 [&>div>div:first-child]:max-w-[58%] sm:[&>div>div:first-child]:max-w-none [&>div>div:last-child]:ml-auto [&>div>div:last-child]:shrink-0"
        logo={<BrandLogo href="/dashboard" size={32} showWordmark={false} />}
        subtitle={
          locale === "id"
            ? "Portal Kesehatan AI"
            : "AI-Powered Health Portal"
        }
        locale={locale}
        onLocaleChange={setLocale}
        navItems={navItems}
        actions={
          <div className="flex max-w-full items-center justify-end gap-1.5 sm:gap-2">
            {user ? (
              <Link
                href="/settings"
                className="flex min-w-0 max-w-[9.5rem] items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-1.5 py-1 shadow-sm transition-colors hover:bg-slate-50 sm:max-w-none sm:gap-2 sm:px-3 sm:py-1.5"
                title={user.email}
              >
                <Avatar fallback={userInitials(user.full_name)} size="sm" />
                <span className="min-w-0 truncate text-sm font-semibold text-slate-900 max-[380px]:hidden min-[381px]:block sm:max-w-[10rem]">
                  {user.full_name}
                </span>
                {user.role === "PATIENT" && user.patient?.mrn ? (
                  <span className="hidden text-xs text-slate-500 md:inline">
                    MRN {user.patient.mrn}
                  </span>
                ) : null}
                <Badge variant="info" className="hidden shrink-0 lg:inline-flex">
                  {user.role === "PATIENT"
                    ? locale === "id"
                      ? "Pasien"
                      : "Patient"
                    : user.role.replace("_", " ")}
                </Badge>
              </Link>
            ) : isError ? (
              <span className="text-xs font-medium text-amber-700">
                {locale === "id" ? "Sesi berakhir…" : "Session expired…"}
              </span>
            ) : (
              <span className="hidden text-xs text-slate-500 sm:inline">
                {locale === "id" ? "Belum masuk" : "Not signed in"}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="hidden shrink-0 cursor-pointer sm:inline-flex"
              onClick={handleLogout}
            >
              {locale === "id" ? "Keluar" : "Logout"}
            </Button>
          </div>
        }
      />

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">{children}</main>
    </div>
  );
}
