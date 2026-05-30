import { InputProps } from '../../primitives/Input/Input';
import { LoginSize } from './loginSizing';
import { Locale } from '../../../utils/i18n';
export type LoginPasswordFieldProps = Omit<InputProps, "type" | "label"> & {
    lang?: Locale;
    loginSize?: LoginSize;
    label?: InputProps["label"];
};
export declare function LoginPasswordField({ lang, loginSize, label, className, labelClassName, ...props }: LoginPasswordFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginPasswordField.d.ts.map