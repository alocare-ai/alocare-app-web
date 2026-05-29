"use client";

import {
  Avatar,
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

export function AppShell({ children, user: userProp }: AppShellProps) {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: userFromQuery, isLoading } = useAuth();
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
        logo={<BrandLogo href="/dashboard" size={40} />}
        locale={locale}
        onLocaleChange={setLocale}
        subtitle={
          locale === "id"
            ? "Portal Kesehatan AI"
            : "AI-Powered Health Portal"
        }
        navItems={navItems}
        actions={
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/settings"
              className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-100"
            >
              {user ? (
                <>
                  <Avatar
                    fallback={user.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                    size="sm"
                  />
                  <span className="hidden max-w-[8rem] truncate text-sm font-medium text-slate-700 sm:inline">
                    {user.full_name}
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-slate-700">
                  {locale === "id" ? "Pengaturan" : "Settings"}
                </span>
              )}
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              {locale === "id" ? "Keluar" : "Logout"}
            </Button>
          </div>
        }
      />

      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
    </div>
  );
}
