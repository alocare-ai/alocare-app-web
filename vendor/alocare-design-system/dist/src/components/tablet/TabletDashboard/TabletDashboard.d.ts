import { TabletShellProps } from '../shared/TabletShell';
export type TabletDashboardProps = Omit<TabletShellProps, "children"> & {
    todayPatients?: number;
    pendingReview?: number;
    urgent?: number;
    recentUploads?: number;
    aiAlerts?: {
        id: string;
        message: {
            en: string;
            id: string;
        };
        severity: "warning" | "info";
    }[];
};
export declare function TabletDashboard({ lang, todayPatients, pendingReview, urgent, recentUploads, aiAlerts, ...shellProps }: TabletDashboardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TabletDashboard.d.ts.map