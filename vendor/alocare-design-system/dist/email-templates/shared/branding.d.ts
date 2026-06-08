/** Hosted logo path on the patient portal (place `logo-alocare.svg` in app public/). */
export declare const EMAIL_LOGO_URL = "https://app.alocare.net/logo-alocare.svg";
/** Storybook serves `public/` at the site root. */
export declare const EMAIL_LOGO_STORYBOOK_URL = "/logo-alocare.svg";
export type EmailLanguage = "en" | "id";
/** Matches `BrandLogo` / `AlocareLogo` wordmark in alocare-admin-app. */
export declare const emailBrandCopy: Record<EmailLanguage, {
    tagline: string;
}>;
export declare function resolveEmailLogoUrl(override?: string): string;
//# sourceMappingURL=branding.d.ts.map