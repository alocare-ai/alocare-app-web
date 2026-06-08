/** PNG logo for email clients (SVG is blocked by Gmail/Outlook). Host on the patient portal public folder. */
export declare const EMAIL_LOGO_URL = "https://app.alocare.net/logo-alocare.png";
/** Storybook serves `public/` at the site root. */
export declare const EMAIL_LOGO_STORYBOOK_URL = "/logo-alocare.png";
export type EmailLanguage = "en" | "id";
/** Matches `BrandLogo` / `AlocareLogo` wordmark in alocare-admin-app. */
export declare const emailBrandCopy: Record<EmailLanguage, {
    tagline: string;
}>;
export declare function resolveEmailLogoUrl(override?: string): string;
//# sourceMappingURL=branding.d.ts.map