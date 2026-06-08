/** PNG logo for email clients (SVG is blocked by Gmail/Outlook). Host on the patient portal public folder. */
export declare const EMAIL_LOGO_URL = "https://app.alocare.net/alocare-ai.png";
/** Public portal base for links in transactional emails (verify, reset, reports). */
export declare const EMAIL_PORTAL_BASE_URL = "https://app.alocare.net";
/** Storybook serves `public/` at the site root. */
export declare const EMAIL_LOGO_STORYBOOK_URL = "/alocare-ai.png";
export type EmailLanguage = "en" | "id";
/** Matches `BrandLogo` / `AlocareLogo` wordmark in alocare-admin-app. */
export declare const emailBrandCopy: Record<EmailLanguage, {
    tagline: string;
}>;
export declare function resolveEmailLogoUrl(override?: string): string;
//# sourceMappingURL=branding.d.ts.map