/** Brand colors from the alocare AI logo. */
const brandColors = {
    navy: "#001450",
    primary: "#1078E0",
    primaryDark: "#003CDC",
    white: "#FFFFFF",
};
export const emailColors = {
    background: "#f6f9fc",
    surface: brandColors.white,
    text: "#334155",
    textMuted: "#64748b",
    heading: brandColors.navy,
    footer: "#94a3b8",
    border: "#e2e8f0",
    primary: brandColors.primary,
    primaryDark: brandColors.primaryDark,
    accent: brandColors.primary,
};
export const emailButtonStyle = {
    backgroundColor: emailColors.primary,
    borderRadius: "6px",
    color: brandColors.white,
    fontSize: "15px",
    fontWeight: 600,
    textDecoration: "none",
    padding: "12px 20px",
    display: "inline-block",
};
export const emailTextStyle = {
    color: emailColors.text,
    fontSize: "15px",
    lineHeight: "24px",
};
export const emailMutedStyle = {
    color: emailColors.textMuted,
    fontSize: "13px",
    lineHeight: "20px",
};
