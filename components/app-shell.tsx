"use client";

import {
  Avatar,
  Button,
  Header,
  Spinner,
  useLocale,
} from "@alocare/design-system";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";
import {
  getNavItemsForRole,
  isNavActive,
  labelNav,
} from "@/lib/roles/navigation";
import type { UserProfile } from "@/lib/types/api";
import { useAuth } from "@/hooks/use-auth";

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

  const navItems = user
    ? getNavItemsForRole(user.role).map((item) => ({
        label: labelNav(item, locale),
        href: item.href,
        active: isNavActive(item.href, pathname),
      }))
    : [];

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
        locale={locale}
        onLocaleChange={setLocale}
        subtitle={
          locale === "id"
            ? "Portal Kesehatan AI"
            : "AI-Powered Health Portal"
        }
        navItems={navItems.map((item) => ({
          ...item,
          href: item.href,
        }))}
        actions={
          user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="hidden items-center gap-2 sm:flex"
              >
                <Avatar
                  fallback={user.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                  size="sm"
                />
                <span className="max-w-[8rem] truncate text-sm font-medium text-slate-700">
                  {user.full_name}
                </span>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                {locale === "id" ? "Keluar" : "Logout"}
              </Button>
            </div>
          ) : null
        }
      />

      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
    </div>
  );
}
