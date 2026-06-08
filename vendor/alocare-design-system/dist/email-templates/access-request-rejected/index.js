import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
import { emailMutedStyle, emailTextStyle } from "../shared/styles.js";
const copy = {
    en: {
        preview: "Update on your Alocare portal access request",
        title: "Access request update",
        greeting: (name) => `Hi ${name},`,
        body: "Thank you for your interest in Alocare. We are unable to approve your portal access request at this time.",
        reasonLabel: "Note from our team",
        closing: "If you believe this was a mistake, you may contact us again through the portal.",
    },
    id: {
        preview: "Pembaruan permintaan akses portal Alocare",
        title: "Pembaruan permintaan akses",
        greeting: (name) => `Halo ${name},`,
        body: "Terima kasih atas minat Anda pada Alocare. Saat ini kami belum dapat menyetujui permintaan akses portal Anda.",
        reasonLabel: "Catatan dari tim kami",
        closing: "Jika Anda merasa ini keliru, Anda dapat menghubungi kami lagi melalui portal.",
    },
};
export function AccessRequestRejected({ name, reason, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.greeting(name) }), _jsx(Text, { style: emailTextStyle, children: t.body }), reason ? (_jsxs(Text, { style: emailTextStyle, children: [_jsxs("strong", { children: [t.reasonLabel, ":"] }), _jsx("br", {}), reason] })) : null, _jsx(Text, { style: emailMutedStyle, children: t.closing })] }));
}
