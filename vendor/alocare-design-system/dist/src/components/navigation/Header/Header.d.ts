import { Locale } from '../../../utils/i18n';
export type HeaderProps = {
    logo?: React.ReactNode;
    title?: string;
    subtitle?: string;
    navItems?: {
        label: string;
        href: string;
        active?: boolean;
    }[];
    locale?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    actions?: React.ReactNode;
    className?: string;
};
export declare function Header({ logo, title, subtitle, navItems, locale, onLocaleChange, actions, className, }: HeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Header.d.ts.map