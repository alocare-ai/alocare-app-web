import { Locale } from '../../../utils/i18n';
export type DashboardLayoutProps = {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    locale?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    className?: string;
};
export declare function DashboardLayout({ children, sidebar, locale, onLocaleChange, className, }: DashboardLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DashboardLayout.d.ts.map