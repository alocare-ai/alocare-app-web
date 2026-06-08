"use client";

import { Button, Input } from "@alocare/design-system";
import { useState } from "react";
import { changePassword } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import type { Locale } from "@/hooks/use-locale";

type ChangePasswordFormProps = {
  locale: Locale;
};

export function ChangePasswordForm({ locale }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 8) {
      setError(
        locale === "id"
          ? "Kata sandi baru minimal 8 karakter."
          : "New password must be at least 8 characters.",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(
        locale === "id"
          ? "Konfirmasi kata sandi tidak cocok."
          : "Passwords do not match.",
      );
      return;
    }

    setLoading(true);
    try {
      const message = await changePassword(currentPassword, newPassword);
      setSuccess(message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.detail ?? err.message
          : locale === "id"
            ? "Gagal mengubah kata sandi."
            : "Could not change password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-3">
      <p className="text-sm text-slate-600">
        {locale === "id"
          ? "Ubah kata sandi akun portal Anda."
          : "Change your portal account password."}
      </p>

      <Input
        type="password"
        label={{ en: "Current password", id: "Kata sandi saat ini" }}
        lang={locale}
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <Input
        type="password"
        label={{ en: "New password", id: "Kata sandi baru" }}
        lang={locale}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Input
        type="password"
        label={{ en: "Confirm new password", id: "Konfirmasi kata sandi baru" }}
        lang={locale}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="text-sm text-green-700" role="status">
          {success}
        </p>
      ) : null}

      <Button type="submit" loading={loading} size="md">
        {locale === "id" ? "Ubah kata sandi" : "Change password"}
      </Button>
    </form>
  );
}
