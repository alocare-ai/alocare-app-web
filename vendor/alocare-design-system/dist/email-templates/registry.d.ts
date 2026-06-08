import type React from "react";
import { AccountVerification } from "./account-verification/index.js";
import { AppointmentConfirmation } from "./appointment-confirmation/index.js";
import { ConsultationSummary } from "./consultation-summary/index.js";
import { LabResultReady } from "./lab-result-ready/index.js";
import { PasswordReset } from "./password-reset/index.js";
export declare const TEMPLATE_CODES: readonly ["ACCOUNT_VERIFICATION", "PASSWORD_RESET", "APPOINTMENT_CONFIRMATION", "SOAP_SUMMARY", "LAB_RESULT_READY"];
export type TemplateCode = (typeof TEMPLATE_CODES)[number];
type TemplateRenderer = (props: Record<string, unknown>) => React.ReactElement;
export declare const templateRegistry: Record<TemplateCode, TemplateRenderer>;
export declare const defaultSubjects: Record<TemplateCode, {
    en: string;
    id: string;
}>;
export declare const templateNames: Record<TemplateCode, string>;
export { AccountVerification, AppointmentConfirmation, ConsultationSummary, LabResultReady, PasswordReset, };
export type { AccountVerificationProps } from "./account-verification/index.js";
export type { AppointmentConfirmationProps } from "./appointment-confirmation/index.js";
export type { ConsultationSummaryProps } from "./consultation-summary/index.js";
export type { LabResultReadyProps } from "./lab-result-ready/index.js";
export type { PasswordResetProps } from "./password-reset/index.js";
//# sourceMappingURL=registry.d.ts.map