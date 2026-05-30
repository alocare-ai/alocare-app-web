import { LoginSize } from './loginSizing';
import { Locale } from '../../../utils/i18n';
export type AlocareLogoLayout = "horizontal" | "stacked" | "mark";
export type AlocareLogoProps = {
    lang?: Locale;
    /** Override bundled logo (e.g. `/logo.png` in consuming app public folder). */
    logoSrc?: string;
    layout?: AlocareLogoLayout;
    showTagline?: boolean;
    /** Logo mark size in px — defaults from `size` preset when omitted. */
    logoSize?: number;
    loginSize?: LoginSize;
    className?: string;
    imageClassName?: string;
};
/** Brand lockup aligned with https://www.alocare.net/ header. */
export declare function AlocareLogo({ lang, logoSrc, layout, showTagline, logoSize, loginSize, className, imageClassName, }: AlocareLogoProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AlocareLogo.d.ts.map