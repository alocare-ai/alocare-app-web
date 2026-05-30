import { LoginCredentials } from '../LoginForm/LoginForm';
import { Locale } from '../../../utils/i18n';
export type HRPortalLoginProps = {
    lang?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    onLogin?: (credentials: LoginCredentials) => void;
    error?: string;
    loading?: boolean;
    className?: string;
};
/** Enterprise HR / occupational health portal login. */
export declare function HRPortalLogin({ lang, onLocaleChange, onLogin, error, loading, className, }: HRPortalLoginProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HRPortalLogin.d.ts.map