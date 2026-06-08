import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text, } from "@react-email/components";
import { emailBrandCopy, resolveEmailLogoUrl, } from "./branding.js";
import { emailColors } from "./styles.js";
/** Horizontal lockup aspect ratio (1434×405). */
const BRAND_LOGO_ASPECT = 1434 / 405;
const LOGO_HEIGHT = 40;
export function EmailLayout({ preview, title, children, footer, language = "en", logoUrl, }) {
    const logoSrc = resolveEmailLogoUrl(logoUrl);
    const brand = emailBrandCopy[language];
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: preview }), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsxs(Section, { style: header, children: [_jsx(Img, { src: logoSrc, alt: "Alocare AI", width: Math.round(LOGO_HEIGHT * BRAND_LOGO_ASPECT), height: LOGO_HEIGHT, style: logoImg }), _jsx(Text, { style: tagline, children: brand.tagline })] }), _jsx(Heading, { style: titleStyle, children: title }), children, _jsx(Hr, { style: hr }), _jsx(Text, { style: footerStyle, children: footer ??
                                "This message is informational and does not replace professional medical advice." })] }) })] }));
}
const main = {
    backgroundColor: emailColors.background,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};
const container = {
    backgroundColor: emailColors.surface,
    margin: "0 auto",
    padding: "32px 24px",
    marginBottom: "64px",
    borderRadius: "8px",
    maxWidth: "560px",
};
const header = {
    marginBottom: "24px",
};
const logoImg = {
    display: "block",
    marginBottom: "8px",
};
const tagline = {
    color: emailColors.textMuted,
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "16px",
    margin: 0,
};
const titleStyle = {
    color: emailColors.heading,
    fontSize: "22px",
    fontWeight: 600,
    margin: "0 0 20px",
};
const hr = {
    borderColor: emailColors.border,
    margin: "24px 0",
};
const footerStyle = {
    color: emailColors.footer,
    fontSize: "12px",
    lineHeight: "18px",
};
