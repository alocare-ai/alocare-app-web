"use client";

import { Spinner } from "@alocare/design-system";
import { usePathname, useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
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
      <AppHeader
        locale={locale}
        onLocaleChange={setLocale}
        navItems={navItems}
        user={user}
        onLogout={handleLogout}
        sessionExpired={isError}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
