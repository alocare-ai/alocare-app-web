import { ReactNode } from 'react';
import { Locale, BilingualText } from '../utils/i18n';
type LocaleContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (text: BilingualText | string) => string;
};
export declare function LocaleProvider({ children, defaultLocale, }: {
    children: ReactNode;
    defaultLocale?: Locale;
}): import("react/jsx-runtime").JSX.Element;
export declare function useLocale(): LocaleContextValue;
export {};
//# sourceMappingURL=useLocale.d.ts.map