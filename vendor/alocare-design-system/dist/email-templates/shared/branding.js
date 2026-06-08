/** PNG logo for email clients (SVG is blocked by Gmail/Outlook). Host on the patient portal public folder. */
export const EMAIL_LOGO_URL = "https://app.alocare.net/logo-alocare.png";
/** Storybook serves `public/` at the site root. */
export const EMAIL_LOGO_STORYBOOK_URL = "/logo-alocare.png";
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
