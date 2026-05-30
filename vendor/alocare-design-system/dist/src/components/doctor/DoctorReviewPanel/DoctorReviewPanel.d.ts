import { Locale } from '../../../utils/i18n';
export type DoctorReviewPanelProps = {
    lang?: Locale;
    onSubmit?: (data: ReviewFormData) => void;
    className?: string;
};
export type ReviewFormData = {
    assessment: "agree" | "partial" | "disagree";
    comments: string;
    nextAction: string;
    notifyPatient: boolean;
};
export declare function DoctorReviewPanel({ lang, onSubmit, className, }: DoctorReviewPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DoctorReviewPanel.d.ts.map