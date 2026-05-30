import { Locale } from '../../../utils/i18n';
export type EMRLoginProps = {
    lang?: Locale;
    onLogin?: (credentials: {
        username: string;
        password: string;
    }) => void;
    error?: string;
    loading?: boolean;
    className?: string;
};
/** Android EMR tablet login — username + password, touch-optimized. */
export declare function EMRLogin({ lang, onLogin, error, loading, className, }: EMRLoginProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRLogin.d.ts.map