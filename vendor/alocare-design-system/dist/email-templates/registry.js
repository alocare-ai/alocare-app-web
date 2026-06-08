import { AccountVerification } from "./account-verification/index.js";
import { AppointmentConfirmation } from "./appointment-confirmation/index.js";
import { ConsultationSummary } from "./consultation-summary/index.js";
import { LabResultReady } from "./lab-result-ready/index.js";
import { PasswordReset } from "./password-reset/index.js";
export const TEMPLATE_CODES = [
    "ACCOUNT_VERIFICATION",
    "PASSWORD_RESET",
    "APPOINTMENT_CONFIRMATION",
    "SOAP_SUMMARY",
    "LAB_RESULT_READY",
];
export const templateRegistry = {
    ACCOUNT_VERIFICATION: (props) => AccountVerification({
        name: String(props.name ?? ""),
        verificationUrl: String(props.verificationUrl ?? ""),
        language: props.language ?? "en",
    }),
    PASSWORD_RESET: (props) => PasswordReset({
        name: String(props.name ?? ""),
        resetUrl: String(props.resetUrl ?? ""),
        language: props.language ?? "en",
    }),
    APPOINTMENT_CONFIRMATION: (props) => AppointmentConfirmation({
        name: String(props.name ?? ""),
        appointmentDate: String(props.appointmentDate ?? ""),
        doctorName: props.doctorName ? String(props.doctorName) : undefined,
        location: props.location ? String(props.location) : undefined,
        language: props.language ?? "en",
    }),
    SOAP_SUMMARY: (props) => ConsultationSummary({
        name: String(props.name ?? ""),
        consultationDate: String(props.consultationDate ?? ""),
        summaryUrl: String(props.summaryUrl ?? ""),
        language: props.language ?? "en",
    }),
    LAB_RESULT_READY: (props) => LabResultReady({
        name: String(props.name ?? ""),
        reportName: String(props.reportName ?? ""),
        portalUrl: String(props.portalUrl ?? ""),
        language: props.language ?? "en",
    }),
};
export const defaultSubjects = {
    ACCOUNT_VERIFICATION: {
        en: "Verify your Alocare account",
        id: "Verifikasi akun Alocare Anda",
    },
    PASSWORD_RESET: {
        en: "Reset your Alocare password",
        id: "Atur ulang kata sandi Alocare",
    },
    APPOINTMENT_CONFIRMATION: {
        en: "Your appointment is confirmed",
        id: "Janji temu Anda telah dikonfirmasi",
    },
    SOAP_SUMMARY: {
        en: "Your consultation summary is ready",
        id: "Ringkasan konsultasi Anda siap",
    },
    LAB_RESULT_READY: {
        en: "Your lab results are ready",
        id: "Hasil lab Anda siap",
    },
};
export const templateNames = {
    ACCOUNT_VERIFICATION: "Account Verification",
    PASSWORD_RESET: "Password Reset",
    APPOINTMENT_CONFIRMATION: "Appointment Confirmation",
    SOAP_SUMMARY: "Consultation Summary (SOAP)",
    LAB_RESULT_READY: "Lab Result Ready",
};
export { AccountVerification, AppointmentConfirmation, ConsultationSummary, LabResultReady, PasswordReset, };
