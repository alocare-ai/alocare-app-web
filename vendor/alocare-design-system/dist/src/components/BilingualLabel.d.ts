import { Locale, BilingualText } from '../utils/i18n';
export type BilingualLabelProps = {
    label: BilingualText | string;
    secondaryLabel?: BilingualText | string;
    lang?: Locale;
    className?: string;
    secondaryClassName?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
};
export declare function BilingualLabel({ label, secondaryLabel, lang, className, secondaryClassName, as: Tag, }: BilingualLabelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BilingualLabel.d.ts.map