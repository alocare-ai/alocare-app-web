import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
const copy = {
    en: {
        preview: "Reset your Alocare password",
        title: "Password reset",
        greeting: (name) => `Hi ${name},`,
        body: "We received a request to reset your password. Click below to choose a new one.",
        cta: "Reset password",
        ignore: "If you did not request this, you can safely ignore this email.",
    },
    id: {
        preview: "Atur ulang kata sandi Alocare Anda",
        title: "Atur ulang kata sandi",
        greeting: (name) => `Halo ${name},`,
        body: "Kami menerima permintaan untuk mengatur ulang kata sandi Anda. Klik di bawah untuk membuat yang baru.",
        cta: "Atur ulang kata sandi",
        ignore: "Jika Anda tidak meminta ini, abaikan email ini.",
    },
};
export function PasswordReset({ name, resetUrl, language = "en" }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: text, children: t.greeting(name) }), _jsx(Text, { style: text, children: t.body }), _jsx(Button, { href: resetUrl, style: button, children: t.cta }), _jsx(Text, { style: muted, children: t.ignore })] }));
}
const text = { color: "#334155", fontSize: "15px", lineHeight: "24px" };
const muted = { color: "#64748b", fontSize: "13px", lineHeight: "20px" };
const button = {
    backgroundColor: "#0f766e",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    textDecoration: "none",
    padding: "12px 20px",
    display: "inline-block",
};
