import { Locale } from '../../../utils/i18n';
export type LoginFooterProps = {
    lang?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    onForgotPassword?: () => void;
    showForgotPassword?: boolean;
    showLanguageSwitcher?: boolean;
    languageVariant?: "default" | "marketing";
    showApiHint?: boolean;
    className?: string;
};
export declare function LoginFooter({ lang, onLocaleChange, onForgotPassword, showForgotPassword, showLanguageSwitcher, languageVariant, showApiHint, className, }: LoginFooterProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginFooter.d.ts.map