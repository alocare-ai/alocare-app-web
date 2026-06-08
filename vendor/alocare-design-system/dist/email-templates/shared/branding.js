/** Hosted logo path on the patient portal (place `logo-alocare.svg` in app public/). */
export const EMAIL_LOGO_URL = "https://app.alocare.net/logo-alocare.svg";
/** Storybook serves `public/` at the site root. */
export const EMAIL_LOGO_STORYBOOK_URL = "/logo-alocare.svg";
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
