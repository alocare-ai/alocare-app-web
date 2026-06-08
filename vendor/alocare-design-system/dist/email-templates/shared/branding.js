/** PNG logo for email clients (SVG is blocked by Gmail/Outlook). Host on the patient portal public folder. */
export const EMAIL_LOGO_URL = "https://app.alocare.net/alocare-ai.png";
/** Public portal base for links in transactional emails (verify, reset, reports). */
export const EMAIL_PORTAL_BASE_URL = "https://app.alocare.net";
/** Storybook serves `public/` at the site root. */
export const EMAIL_LOGO_STORYBOOK_URL = "/alocare-ai.png";
/** Matches `BrandLogo` / `AlocareLogo` wordmark in alocare-admin-app. */
export const emailBrandCopy = {
    en: { tagline: "Medical AI Report Analysis" },
    id: { tagline: "Analisis Laporan Medis AI" },
};
export function resolveEmailLogoUrl(override) {
    if (override) {
        return override;
    }
    if (typeof window !== "undefined" &&
        /localhost|127\.0\.0\.1/.test(window.location.hostname)) {
        return EMAIL_LOGO_STORYBOOK_URL;
    }
    return EMAIL_LOGO_URL;
}
