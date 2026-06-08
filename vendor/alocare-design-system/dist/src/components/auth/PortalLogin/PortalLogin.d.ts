import { LoginCredentials } from '../LoginForm/LoginForm';
import { Locale } from '../../../utils/i18n';
export type PortalLoginProps = {
    lang?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    onLogin?: (credentials: LoginCredentials) => void;
    onForgotPassword?: () => void;
    /** Full URL to start Google OAuth, or omit to hide Google sign-in. */
    googleAuthUrl?: string | null;
    error?: string;
    loading?: boolean;
    logoSrc?: string;
    className?: string;
};
/**
 * Clinician / patient portal login — matches alocare-app-web `/login` layout.
 * Single centered card: language (top-right), logo, title, form, forgot password.
 */
export declare function PortalLogin({ lang, onLocaleChange, onLogin, onForgotPassword, googleAuthUrl, error, loading, logoSrc, className, }: PortalLoginProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PortalLogin.d.ts.map