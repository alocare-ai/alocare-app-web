import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
const copy = {
    en: {
        preview: "Verify your Alocare account",
        title: "Verify your account",
        greeting: (name) => `Hi ${name},`,
        body: "Please confirm your email address to activate your Alocare account.",
        cta: "Verify email",
        expiry: "This link expires in 24 hours.",
    },
    id: {
        preview: "Verifikasi akun Alocare Anda",
        title: "Verifikasi akun Anda",
        greeting: (name) => `Halo ${name},`,
        body: "Silakan konfirmasi alamat email Anda untuk mengaktifkan akun Alocare.",
        cta: "Verifikasi email",
        expiry: "Tautan ini berlaku selama 24 jam.",
    },
};
export function AccountVerification({ name, verificationUrl, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: text, children: t.greeting(name) }), _jsx(Text, { style: text, children: t.body }), _jsx(Button, { href: verificationUrl, style: button, children: t.cta }), _jsx(Text, { style: muted, children: t.expiry })] }));
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
