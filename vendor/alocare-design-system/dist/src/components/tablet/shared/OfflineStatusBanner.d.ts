import { Locale } from '../../../utils/i18n';
export type OfflineStatus = "online" | "syncing" | "offline" | "retry";
export type OfflineStatusBannerProps = {
    status: OfflineStatus;
    lang?: Locale;
    pendingCount?: number;
    onRetry?: () => void;
    className?: string;
};
export declare function OfflineStatusBanner({ status, lang, pendingCount, onRetry, className, }: OfflineStatusBannerProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=OfflineStatusBanner.d.ts.map