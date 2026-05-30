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
        className="[&>div>div>span.leading-tight]:hidden"
        logo={
          <BrandLogo
            href="/dashboard"
            size={40}
            showWordmark
            subtitle={
              locale === "id"
                ? "Portal Kesehatan AI"
                : "AI-Powered Health Portal"
            }
          />
        }
        locale={locale}
        onLocaleChange={setLocale}
        navItems={navItems}
        actions={
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Link
                href="/settings"
                className="flex max-w-[12rem] items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2 py-1.5 shadow-sm transition-colors hover:bg-slate-50 sm:max-w-none sm:px-3"
                title={user.email}
              >
                <Avatar fallback={userInitials(user.full_name)} size="sm" />
                <span className="min-w-0 text-left leading-tight">
                  <span className="block truncate text-sm font-semibold text-slate-900">
                    {user.full_name}
                  </span>
                  <span className="hidden truncate text-xs text-slate-500 sm:block">
                    {user.email}
                  </span>
                </span>
                <Badge variant="info" className="hidden shrink-0 sm:inline-flex">
                  {user.role.replace("_", " ")}
                </Badge>
              </Link>
            ) : isError ? (
              <span className="text-xs font-medium text-amber-700">
                {locale === "id" ? "Sesi berakhir…" : "Session expired…"}
              </span>
            ) : (
              <span className="text-xs text-slate-500">
                {locale === "id" ? "Belum masuk" : "Not signed in"}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="cursor-pointer"
              onClick={handleLogout}
            >
              {locale === "id" ? "Keluar" : "Logout"}
            </Button>
          </div>
        }
      />

      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
    </div>
  );
}
