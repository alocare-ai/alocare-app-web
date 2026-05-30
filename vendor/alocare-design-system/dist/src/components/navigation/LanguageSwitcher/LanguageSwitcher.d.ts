import { Locale } from '../../../utils/i18n';
export type LanguageSwitcherVariant = "default" | "marketing";
export type LanguageSwitcherProps = {
    locale: Locale;
    onChange: (locale: Locale) => void;
    /** `marketing` matches https://www.alocare.net/ header toggle. */
    variant?: LanguageSwitcherVariant;
    className?: string;
};
export declare function LanguageSwitcher({ locale, onChange, variant, className, }: LanguageSwitcherProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LanguageSwitcher.d.ts.map