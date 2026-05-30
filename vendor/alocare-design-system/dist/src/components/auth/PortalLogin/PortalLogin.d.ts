import { LoginCredentials } from '../LoginForm/LoginForm';
import { Locale } from '../../../utils/i18n';
export type PortalLoginProps = {
    lang?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    onLogin?: (credentials: LoginCredentials) => void;
    onForgotPassword?: () => void;
    error?: string;
    loading?: boolean;
    showDemoNotes?: boolean;
    demoEmail?: string;
    demoPassword?: string;
    logoSrc?: string;
    className?: string;
};
/**
 * Clinician / patient portal login — matches alocare-app-web `/login` layout.
 * Single centered card: language (top-right), logo, title, form, forgot password, demo note.
 */
export declare function PortalLogin({ lang, onLocaleChange, onLogin, onForgotPassword, error, loading, showDemoNotes, demoEmail, demoPassword, logoSrc, className, }: PortalLoginProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PortalLogin.d.ts.map