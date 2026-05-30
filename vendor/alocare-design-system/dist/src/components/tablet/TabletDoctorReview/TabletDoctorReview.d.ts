import { TabletShellProps } from '../shared/TabletShell';
export type ReviewDecision = "approve" | "partial" | "reject";
export type TabletDoctorReviewProps = Omit<TabletShellProps, "children"> & {
    onSubmit?: (decision: ReviewDecision, notes: string) => void;
};
export declare function TabletDoctorReview({ lang, onSubmit, ...shellProps }: TabletDoctorReviewProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TabletDoctorReview.d.ts.map