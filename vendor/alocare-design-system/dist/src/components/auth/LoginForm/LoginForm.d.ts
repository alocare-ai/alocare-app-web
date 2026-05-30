import { LoginSize } from '../shared/loginSizing';
import { Locale } from '../../../utils/i18n';
export type LoginIdentifierMode = "email" | "username";
export type LoginCredentials = {
    identifier: string;
    password: string;
};
export type LoginFormProps = {
    lang?: Locale;
    loginSize?: LoginSize;
    identifierMode?: LoginIdentifierMode;
    onSubmit?: (credentials: LoginCredentials) => void;
    error?: string;
    loading?: boolean;
    /** 48px touch targets for Android tablet EMR. */
    touchOptimized?: boolean;
    showRememberMe?: boolean;
    submitLabel?: string;
    className?: string;
    showPasswordToggle?: boolean;
};
export declare function LoginForm({ lang, loginSize, identifierMode, onSubmit, error, loading, touchOptimized, showRememberMe, submitLabel, showPasswordToggle, className, }: LoginFormProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginForm.d.ts.map