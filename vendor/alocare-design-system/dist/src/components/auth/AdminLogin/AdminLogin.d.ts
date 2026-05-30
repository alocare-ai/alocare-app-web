import { LoginCredentials } from '../LoginForm/LoginForm';
import { Locale } from '../../../utils/i18n';
export type AdminLoginProps = {
    lang?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    onLogin?: (credentials: LoginCredentials) => void;
    error?: string;
    loading?: boolean;
    className?: string;
};
/** Tenant / platform admin — split brand panel + email login. */
export declare function AdminLogin({ lang, onLocaleChange, onLogin, error, loading, className, }: AdminLoginProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AdminLogin.d.ts.map