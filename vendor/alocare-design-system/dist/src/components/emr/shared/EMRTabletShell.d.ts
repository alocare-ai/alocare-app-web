import { OfflineStatus } from '../../tablet/shared/OfflineStatusBanner';
import { Locale } from '../../../utils/i18n';
import { emrNavItems } from './emrCopy';
export type EMRNavId = (typeof emrNavItems)[number]["id"];
export type EMRTabletShellProps = {
    children: React.ReactNode;
    lang?: Locale;
    activeNav?: EMRNavId;
    onNavChange?: (id: EMRNavId) => void;
    doctorName?: string;
    specialty?: string;
    unitLabel?: string;
    dateLabel?: string;
    onLocaleChange?: (locale: Locale) => void;
    onLogout?: () => void;
    offlineStatus?: OfflineStatus;
    orientation?: "landscape" | "portrait";
    appTitle?: string;
    className?: string;
};
export declare function EMRTabletShell({ children, lang, activeNav, onNavChange, doctorName, specialty, unitLabel, dateLabel, onLocaleChange, onLogout, offlineStatus, orientation, appTitle, className, }: EMRTabletShellProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRTabletShell.d.ts.map