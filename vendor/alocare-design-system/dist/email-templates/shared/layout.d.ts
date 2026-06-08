import type { ReactNode } from "react";
import { type EmailLanguage } from "./branding.js";
interface EmailLayoutProps {
    preview: string;
    title: string;
    children: ReactNode;
    footer?: string;
    language?: EmailLanguage;
    /** Absolute URL for the header logo (defaults to app.alocare.net PNG; Storybook uses `/logo-alocare.png`). */
    logoUrl?: string;
}
export declare function EmailLayout({ preview, title, children, footer, language, logoUrl, }: EmailLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=layout.d.ts.map