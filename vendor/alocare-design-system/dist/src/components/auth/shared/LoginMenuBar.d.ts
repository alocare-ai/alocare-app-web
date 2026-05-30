import { Locale } from '../../../utils/i18n';
export type LoginMenuBarProps = {
    lang?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    logoSrc?: string;
    /** Show brand lockup on the left (alocare.net header style). */
    showBrand?: boolean;
    className?: string;
};
/** Top menu bar — language toggle on the right like https://www.alocare.net/ */
export declare function LoginMenuBar({ lang, onLocaleChange, logoSrc, showBrand, className, }: LoginMenuBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginMenuBar.d.ts.map