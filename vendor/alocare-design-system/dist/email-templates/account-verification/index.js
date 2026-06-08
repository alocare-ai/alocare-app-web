import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
import { emailButtonStyle, emailMutedStyle, emailTextStyle } from "../shared/styles.js";
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
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.greeting(name) }), _jsx(Text, { style: emailTextStyle, children: t.body }), _jsx(Button, { href: verificationUrl, style: emailButtonStyle, children: t.cta }), _jsx(Text, { style: emailMutedStyle, children: t.expiry })] }));
}
