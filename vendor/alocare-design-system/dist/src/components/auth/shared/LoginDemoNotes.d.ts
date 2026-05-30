import { LoginSize } from './loginSizing';
import { BilingualText, Locale } from '../../../utils/i18n';
export declare const DEFAULT_DEMO_EMAIL = "doctor@alocare.net";
export declare const DEFAULT_DEMO_PASSWORD = "doctor123";
export type LoginDemoNotesVariant = "compact" | "detailed";
export type LoginDemoNotesProps = {
    lang?: Locale;
    loginSize?: LoginSize;
    variant?: LoginDemoNotesVariant;
    email?: string;
    password?: string;
    additionalNote?: BilingualText | string;
    className?: string;
};
/** Demo credentials — `compact` matches alocare-app-web login page. */
export declare function LoginDemoNotes({ lang, loginSize, variant, email, password, additionalNote, className, }: LoginDemoNotesProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginDemoNotes.d.ts.map