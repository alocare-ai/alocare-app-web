import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
import { emailButtonStyle, emailMutedStyle, emailTextStyle } from "../shared/styles.js";
const copy = {
    en: {
        preview: "Your lab results are ready on Alocare",
        title: "Lab results ready",
        greeting: (name) => `Hi ${name},`,
        body: (reportName) => `Your lab report "${reportName}" has been processed and is ready for review.`,
        cta: "View results",
        note: "A clinician may review your results before they are finalized.",
    },
    id: {
        preview: "Hasil lab Anda siap di Alocare",
        title: "Hasil lab siap",
        greeting: (name) => `Halo ${name},`,
        body: (reportName) => `Laporan lab Anda "${reportName}" telah diproses dan siap ditinjau.`,
        cta: "Lihat hasil",
        note: "Dokter dapat meninjau hasil Anda sebelum hasil akhir tersedia.",
    },
};
export function LabResultReady({ name, reportName, portalUrl, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.greeting(name) }), _jsx(Text, { style: emailTextStyle, children: t.body(reportName) }), _jsx(Button, { href: portalUrl, style: emailButtonStyle, children: t.cta }), _jsx(Text, { style: emailMutedStyle, children: t.note })] }));
}
