import { AccessRequestApproved } from "./access-request-approved/index.js";
import { AccessRequestRejected } from "./access-request-rejected/index.js";
import { AccountVerification } from "./account-verification/index.js";
import { AppointmentConfirmation } from "./appointment-confirmation/index.js";
import { ContactUsRequest } from "./contact-us-request/index.js";
import { ConsultationSummary } from "./consultation-summary/index.js";
import { LabResultReady } from "./lab-result-ready/index.js";
import { PasswordReset } from "./password-reset/index.js";
import { PortalAccountCreated } from "./portal-account-created/index.js";
export const TEMPLATE_CODES = [
    "ACCOUNT_VERIFICATION",
    "PASSWORD_RESET",
    "PORTAL_ACCOUNT_CREATED",
    "CONTACT_US",
    "ACCESS_REQUEST_APPROVED",
    "ACCESS_REQUEST_REJECTED",
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
    PORTAL_ACCOUNT_CREATED: (props) => PortalAccountCreated({
        name: String(props.name ?? ""),
        email: String(props.email ?? ""),
        roleLabel: String(props.roleLabel ?? ""),
        loginUrl: String(props.loginUrl ?? ""),
        language: props.language ?? "en",
    }),
    CONTACT_US: (props) => ContactUsRequest({
        fullName: String(props.fullName ?? ""),
        email: String(props.email ?? ""),
        organization: props.organization ? String(props.organization) : undefined,
        roleInterest: props.roleInterest ? String(props.roleInterest) : undefined,
        message: String(props.message ?? ""),
        reviewUrl: props.reviewUrl ? String(props.reviewUrl) : undefined,
        language: props.language ?? "en",
    }),
    ACCESS_REQUEST_APPROVED: (props) => AccessRequestApproved({
        name: String(props.name ?? ""),
        resetUrl: String(props.resetUrl ?? ""),
        loginUrl: String(props.loginUrl ?? ""),
        language: props.language ?? "en",
    }),
    ACCESS_REQUEST_REJECTED: (props) => AccessRequestRejected({
        name: String(props.name ?? ""),
        reason: props.reason ? String(props.reason) : undefined,
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
    PORTAL_ACCOUNT_CREATED: {
        en: "Your Alocare portal account is ready",
        id: "Akun portal Alocare Anda siap",
    },
    CONTACT_US: {
        en: "New portal access request — Alocare",
        id: "Permintaan akses portal baru — Alocare",
    },
    ACCESS_REQUEST_APPROVED: {
        en: "Your Alocare portal access was approved",
        id: "Akses portal Alocare Anda disetujui",
    },
    ACCESS_REQUEST_REJECTED: {
        en: "Update on your Alocare access request",
        id: "Pembaruan permintaan akses Alocare",
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
    PORTAL_ACCOUNT_CREATED: "Portal Account Created",
    CONTACT_US: "Contact Us Request",
    ACCESS_REQUEST_APPROVED: "Access Request Approved",
    ACCESS_REQUEST_REJECTED: "Access Request Rejected",
    APPOINTMENT_CONFIRMATION: "Appointment Confirmation",
    SOAP_SUMMARY: "Consultation Summary (SOAP)",
    LAB_RESULT_READY: "Lab Result Ready",
};
export { AccessRequestApproved, AccessRequestRejected, AccountVerification, AppointmentConfirmation, ContactUsRequest, ConsultationSummary, LabResultReady, PasswordReset, PortalAccountCreated, };
