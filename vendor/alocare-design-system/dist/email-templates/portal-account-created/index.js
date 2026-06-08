import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
import { emailButtonStyle, emailMutedStyle, emailTextStyle } from "../shared/styles.js";
const copy = {
    en: {
        preview: "Your Alocare portal account is ready",
        title: "Welcome to Alocare",
        greeting: (name) => `Hi ${name},`,
        body: "Your administrator created a portal account for you.",
        emailLabel: "Email",
        roleLabel: "Role",
        cta: "Sign in to portal",
        passwordNote: "Sign in with the password your administrator provided. You can change it anytime under Settings → Security.",
    },
    id: {
        preview: "Akun portal Alocare Anda siap",
        title: "Selamat datang di Alocare",
        greeting: (name) => `Halo ${name},`,
        body: "Administrator Anda telah membuat akun portal untuk Anda.",
        emailLabel: "Email",
        roleLabel: "Peran",
        cta: "Masuk ke portal",
        passwordNote: "Masuk dengan kata sandi dari administrator Anda. Anda dapat mengubahnya kapan saja di Pengaturan → Keamanan.",
    },
};
export function PortalAccountCreated({ name, email, roleLabel, loginUrl, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.greeting(name) }), _jsx(Text, { style: emailTextStyle, children: t.body }), _jsxs(Text, { style: emailTextStyle, children: [_jsxs("strong", { children: [t.emailLabel, ":"] }), " ", email, _jsx("br", {}), _jsxs("strong", { children: [t.roleLabel, ":"] }), " ", roleLabel] }), _jsx(Button, { href: loginUrl, style: emailButtonStyle, children: t.cta }), _jsx(Text, { style: emailMutedStyle, children: t.passwordNote })] }));
}
