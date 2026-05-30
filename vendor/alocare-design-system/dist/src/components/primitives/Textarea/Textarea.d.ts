import { TextareaHTMLAttributes } from 'react';
import { BilingualText, Locale } from '../../../utils/i18n';
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: BilingualText | string;
    helperText?: BilingualText | string;
    errorText?: BilingualText | string;
    lang?: Locale;
};
export declare const Textarea: import('react').ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: BilingualText | string;
    helperText?: BilingualText | string;
    errorText?: BilingualText | string;
    lang?: Locale;
} & import('react').RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=Textarea.d.ts.map