import { LoginSize } from './loginSizing';
import { Locale } from '../../../utils/i18n';
export type LoginGoogleButtonProps = {
    lang?: Locale;
    loginSize?: LoginSize;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
};
export declare function LoginGoogleButton({ lang, loginSize, onClick, loading, disabled, className, }: LoginGoogleButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginGoogleButton.d.ts.map