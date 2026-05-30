import { TabletShellProps } from '../shared/TabletShell';
export type PatientQueueItem = {
    id: string;
    name: string;
    mrn: string;
    status: "waiting" | "in-review" | "follow-up";
    statusLabel: {
        en: string;
        id: string;
    };
};
export type TabletPatientQueueProps = Omit<TabletShellProps, "children"> & {
    patients?: PatientQueueItem[];
};
export declare function TabletPatientQueue({ lang, patients, orientation, ...shellProps }: TabletPatientQueueProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TabletPatientQueue.d.ts.map