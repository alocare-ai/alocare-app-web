import { tabletNavItems } from './tabletCopy';
import { Locale } from '../../../utils/i18n';
import { OfflineStatus } from './OfflineStatusBanner';
export type TabletNavId = (typeof tabletNavItems)[number]["id"];
export type TabletShellProps = {
    children: React.ReactNode;
    lang?: Locale;
    activeNav?: TabletNavId;
    onNavChange?: (id: TabletNavId) => void;
    doctorName?: string;
    role?: string;
    locale?: Locale;
    onLocaleChange?: (locale: Locale) => void;
    onLogout?: () => void;
    notificationCount?: number;
    offlineStatus?: OfflineStatus;
    pendingUploads?: number;
    orientation?: "landscape" | "portrait";
    showSecurityBar?: boolean;
    className?: string;
};
export declare function TabletShell({ children, lang, activeNav, onNavChange, doctorName, role, locale, onLocaleChange, onLogout, notificationCount, offlineStatus, pendingUploads, orientation, showSecurityBar, className, }: TabletShellProps): import("react/jsx-runtime").JSX.Element;
export declare const TabletNav: typeof TabletShell;
//# sourceMappingURL=TabletShell.d.ts.map