import { InputHTMLAttributes } from 'react';
import { BilingualText, Locale } from '../../../utils/i18n';
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: BilingualText | string;
    helperText?: BilingualText | string;
    errorText?: BilingualText | string;
    lang?: Locale;
    labelClassName?: string;
};
export declare const Input: import('react').ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & {
    label?: BilingualText | string;
    helperText?: BilingualText | string;
    errorText?: BilingualText | string;
    lang?: Locale;
    labelClassName?: string;
} & import('react').RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map