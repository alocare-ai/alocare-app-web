import { LoginSize } from './loginSizing';
import { BRAND_LOGO_PATH } from '../../../tokens/brand';
import { Locale } from '../../../utils/i18n';
export type AlocareLogoLayout = "horizontal" | "stacked" | "mark";
export type AlocareLogoProps = {
    lang?: Locale;
    /** Override bundled logo (e.g. `/alocare-ai.svg` in consuming app public folder). */
    logoSrc?: string;
    layout?: AlocareLogoLayout;
    showTagline?: boolean;
    /** Logo height in px — defaults from `size` preset when omitted. */
    logoSize?: number;
    loginSize?: LoginSize;
    className?: string;
    imageClassName?: string;
};
/** Brand lockup using the full alocare AI horizontal logo. */
export declare function AlocareLogo({ lang, logoSrc, layout, showTagline, logoSize, loginSize, className, imageClassName, }: AlocareLogoProps): import("react/jsx-runtime").JSX.Element;
export { BRAND_LOGO_PATH };
//# sourceMappingURL=AlocareLogo.d.ts.map