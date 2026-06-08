import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from "@react-email/components";
import { EmailLayout } from "../shared/layout.js";
import { emailTextStyle } from "../shared/styles.js";
const copy = {
    en: {
        preview: "Your Alocare appointment is confirmed",
        title: "Appointment confirmation",
        greeting: (name) => `Hi ${name},`,
        body: "Your appointment is confirmed.",
        date: "Date & time",
        doctor: "Clinician",
        location: "Location",
    },
    id: {
        preview: "Janji temu Alocare Anda telah dikonfirmasi",
        title: "Konfirmasi janji temu",
        greeting: (name) => `Halo ${name},`,
        body: "Janji temu Anda telah dikonfirmasi.",
        date: "Tanggal & waktu",
        doctor: "Dokter",
        location: "Lokasi",
    },
};
export function AppointmentConfirmation({ name, appointmentDate, doctorName, location, language = "en", }) {
    const t = copy[language];
    return (_jsxs(EmailLayout, { preview: t.preview, title: t.title, language: language, children: [_jsx(Text, { style: emailTextStyle, children: t.greeting(name) }), _jsx(Text, { style: emailTextStyle, children: t.body }), _jsx(Text, { style: label, children: t.date }), _jsx(Text, { style: value, children: appointmentDate }), doctorName ? (_jsxs(_Fragment, { children: [_jsx(Text, { style: label, children: t.doctor }), _jsx(Text, { style: value, children: doctorName })] })) : null, location ? (_jsxs(_Fragment, { children: [_jsx(Text, { style: label, children: t.location }), _jsx(Text, { style: value, children: location })] })) : null] }));
}
const label = { color: "#64748b", fontSize: "12px", fontWeight: 600, marginBottom: "4px" };
const value = { color: "#001450", fontSize: "15px", marginTop: 0, marginBottom: "16px" };
