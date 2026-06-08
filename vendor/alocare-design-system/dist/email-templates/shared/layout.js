import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Column, Container, Head, Heading, Hr, Html, Img, Preview, Row, Section, Text, } from "@react-email/components";
import { emailBrandCopy, resolveEmailLogoUrl, } from "./branding.js";
export function EmailLayout({ preview, title, children, footer, language = "en", logoUrl, }) {
    const logoSrc = resolveEmailLogoUrl(logoUrl);
    const brand = emailBrandCopy[language];
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: preview }), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsx(Section, { style: header, children: _jsxs(Row, { children: [_jsx(Column, { style: logoColumn, children: _jsx(Img, { src: logoSrc, alt: "Alocare AI", width: 48, height: 48, style: logoImg }) }), _jsxs(Column, { style: wordmarkColumn, children: [_jsxs(Text, { style: wordmark, children: ["alocare", _jsx("span", { style: wordmarkDot, children: "." }), _jsx("span", { style: wordmarkAccent, children: "ai" })] }), _jsx(Text, { style: tagline, children: brand.tagline })] })] }) }), _jsx(Heading, { style: titleStyle, children: title }), children, _jsx(Hr, { style: hr }), _jsx(Text, { style: footerStyle, children: footer ??
                                "This message is informational and does not replace professional medical advice." })] }) })] }));
}
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};
const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "32px 24px",
    marginBottom: "64px",
    borderRadius: "8px",
    maxWidth: "560px",
};
const header = {
    marginBottom: "24px",
};
const logoColumn = {
    width: "48px",
    verticalAlign: "middle",
};
const wordmarkColumn = {
    paddingLeft: "12px",
    verticalAlign: "middle",
};
const logoImg = {
    display: "block",
};
const wordmark = {
    color: "#020617",
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    lineHeight: "24px",
    margin: "0 0 2px",
};
const wordmarkDot = {
    color: "#020617",
};
const wordmarkAccent = {
    color: "#059669",
};
const tagline = {
    color: "#475569",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "16px",
    margin: 0,
};
const titleStyle = {
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: 600,
    margin: "0 0 20px",
};
const hr = {
    borderColor: "#e2e8f0",
    margin: "24px 0",
};
const footerStyle = {
    color: "#94a3b8",
    fontSize: "12px",
    lineHeight: "18px",
};
