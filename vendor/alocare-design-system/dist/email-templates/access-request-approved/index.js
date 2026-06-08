import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
import { emailButtonStyle, emailMutedStyle, emailTextStyle } from "../shared/styles.js";
const copy = {
    en: {
        preview: "Your Alocare portal access was approved",
        title: "Access approved",
        greeting: (name) => `Hi ${name},`,
        body: "Your portal access request was approved. Set your password to sign in.",
        cta: "Set your password",
        login: (url) => `After setting your password, sign in at ${url}`,
    },
    id: {
        preview: "Akses portal Alocare Anda disetujui",
        title: "Akses disetujui",
        greeting: (name) => `Halo ${name},`,
        body: "Permintaan akses portal Anda disetujui. Atur kata sandi untuk masuk.",
        cta: "Atur kata sandi",
        login: (url) => `Setelah mengatur kata sandi, masuk di ${url}`,
    },
};
export function AccessRequestApproved({ name, resetUrl, loginUrl, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.greeting(name) }), _jsx(Text, { style: emailTextStyle, children: t.body }), _jsx(Button, { href: resetUrl, style: emailButtonStyle, children: t.cta }), _jsx(Text, { style: emailMutedStyle, children: t.login(loginUrl) })] }));
}
