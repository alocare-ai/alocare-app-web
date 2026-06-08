import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
import { emailButtonStyle, emailMutedStyle, emailTextStyle } from "../shared/styles.js";
const copy = {
    en: {
        preview: "Your consultation summary is available",
        title: "Consultation summary",
        greeting: (name) => `Hi ${name},`,
        body: (date) => `Your consultation summary from ${date} is now available in your Alocare portal.`,
        cta: "View summary",
        note: "This summary is for your records and does not replace clinical documentation.",
    },
    id: {
        preview: "Ringkasan konsultasi Anda tersedia",
        title: "Ringkasan konsultasi",
        greeting: (name) => `Halo ${name},`,
        body: (date) => `Ringkasan konsultasi Anda pada ${date} sekarang tersedia di portal Alocare.`,
        cta: "Lihat ringkasan",
        note: "Ringkasan ini untuk catatan Anda dan bukan pengganti dokumentasi klinis.",
    },
};
export function ConsultationSummary({ name, consultationDate, summaryUrl, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.greeting(name) }), _jsx(Text, { style: emailTextStyle, children: t.body(consultationDate) }), _jsx(Button, { href: summaryUrl, style: emailButtonStyle, children: t.cta }), _jsx(Text, { style: emailMutedStyle, children: t.note })] }));
}
