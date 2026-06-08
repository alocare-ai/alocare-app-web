import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { Fragment } from "react";
import { EmailLayout } from "../shared/layout.js";
import { emailButtonStyle, emailMutedStyle, emailTextStyle } from "../shared/styles.js";
const copy = {
    en: {
        preview: "New Alocare portal access request",
        title: "Portal access request",
        intro: "Someone submitted the Contact us form on the patient portal.",
        nameLabel: "Name",
        emailLabel: "Email",
        orgLabel: "Organization",
        roleLabel: "Requested role",
        messageLabel: "Message",
        cta: "Review request",
        reply: (email) => `Requester email: ${email}`,
    },
    id: {
        preview: "Permintaan akses portal Alocare baru",
        title: "Permintaan akses portal",
        intro: "Seseorang mengirim formulir Hubungi kami di portal pasien.",
        nameLabel: "Nama",
        emailLabel: "Email",
        orgLabel: "Organisasi",
        roleLabel: "Peran yang diminta",
        messageLabel: "Pesan",
        cta: "Tinjau permintaan",
        reply: (email) => `Email pemohon: ${email}`,
    },
};
function renderMultilineText(text) {
    const lines = text.split(/\r\n|\r|\n/);
    return lines.map((line, index) => (_jsxs(Fragment, { children: [line, index < lines.length - 1 ? _jsx("br", {}) : null] }, index)));
}
export function ContactUsRequest({ fullName, email, organization, roleInterest, message, reviewUrl, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.intro }), _jsxs(Text, { style: emailTextStyle, children: [_jsxs("strong", { children: [t.nameLabel, ":"] }), " ", fullName, _jsx("br", {}), _jsxs("strong", { children: [t.emailLabel, ":"] }), " ", email, organization ? (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsxs("strong", { children: [t.orgLabel, ":"] }), " ", organization] })) : null, roleInterest ? (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsxs("strong", { children: [t.roleLabel, ":"] }), " ", roleInterest] })) : null] }), _jsxs(Text, { style: { ...emailTextStyle, whiteSpace: "pre-wrap" }, children: [_jsxs("strong", { children: [t.messageLabel, ":"] }), _jsx("br", {}), renderMultilineText(message)] }), reviewUrl ? (_jsx(Button, { href: reviewUrl, style: emailButtonStyle, children: t.cta })) : null, _jsx(Text, { style: emailMutedStyle, children: t.reply(email) })] }));
}
