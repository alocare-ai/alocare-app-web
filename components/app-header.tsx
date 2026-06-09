"use client";

import {
  Avatar,
  Badge,
  Button,
  LanguageSwitcher,
} from "@alocare/design-system";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import type { Locale } from "@/lib/i18n";
import type { UserProfile } from "@/lib/types/api";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type AppHeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  navItems: NavItem[];
  user?: UserProfile;
  onLogout: () => void;
  sessionExpired?: boolean;
};

function userInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function roleLabel(role: UserProfile["role"], locale: Locale): string {
  if (role === "PATIENT") {
    return locale === "id" ? "Pasien" : "Patient";
  }
  return role.replace(/_/g, " ");
}

export function AppHeader({
  locale,
  onLocaleChange,
  navItems,
  user,
  onLogout,
  sessionExpired,
}: AppHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1100] border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <BrandLogo href="/dashboard" size={28} showWordmark={false} />
            {navItems.length > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="cursor-pointer md:hidden"
                aria-expanded={mobileOpen}
                aria-label={locale === "id" ? "Menu navigasi" : "Navigation menu"}
                onClick={() => setMobileOpen((open) => !open)}
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
            {user ? (
              <Link
                href="/settings"
                className="flex min-w-0 max-w-[8rem] cursor-pointer items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2 py-1 shadow-sm transition-colors hover:bg-slate-50 sm:max-w-none sm:px-3 sm:py-1.5"
                title={user.email}
              >
                <Avatar fallback={userInitials(user.full_name)} size="sm" />
                <span className="hidden truncate text-sm font-medium text-slate-900 sm:block sm:max-w-[9rem]">
                  {user.full_name}
                </span>
                <Badge variant="info" className="hidden shrink-0 lg:inline-flex">
                  {roleLabel(user.role, locale)}
                </Badge>
              </Link>
            ) : sessionExpired ? (
              <span className="text-xs font-medium text-amber-700">
                {locale === "id" ? "Sesi berakhir…" : "Session expired…"}
              </span>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="hidden shrink-0 cursor-pointer sm:inline-flex"
              onClick={onLogout}
            >
              {locale === "id" ? "Keluar" : "Logout"}
            </Button>
          </div>
        </div>

        {navItems.length > 0 ? (
          <nav
            className="hidden border-t border-slate-100 md:block"
            aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}
          >
            <div className="flex gap-1 overflow-x-auto py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors ${
                    item.active
                      ? "bg-slate-100 font-semibold text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}

        {mobileOpen && navItems.length > 0 ? (
          <nav
            className="border-t border-slate-100 py-2 md:hidden"
            aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}
          >
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors ${
                    item.active
                      ? "bg-slate-100 font-semibold text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="mt-1 w-full cursor-pointer justify-start px-3 sm:hidden"
                onClick={() => {
                  setMobileOpen(false);
                  onLogout();
                }}
              >
                {locale === "id" ? "Keluar" : "Logout"}
              </Button>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
