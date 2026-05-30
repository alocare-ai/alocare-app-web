import { LoginSize } from './loginSizing';
import { Locale } from '../../../utils/i18n';
export type LoginBrandVariant = "alocare" | "emr" | "admin" | "hr";
/** Portal = centered logo mark + title (alocare-app-web style). */
export type LoginBrandLayout = "portal" | "inline";
export type LoginBrandProps = {
    variant?: LoginBrandVariant;
    layout?: LoginBrandLayout;
    lang?: Locale;
    loginSize?: LoginSize;
    title?: string;
    subtitle?: string;
    logoSrc?: string;
    className?: string;
};
export declare function LoginBrand({ variant, layout, lang, loginSize, title, subtitle, logoSrc, className, }: LoginBrandProps): import("react/jsx-runtime").JSX.Element;
/** Side panel brand block for split admin layout. */
export declare function LoginBrandPanel({ lang, logoSrc, className, }: {
    lang?: Locale;
    logoSrc?: string;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginBrand.d.ts.map