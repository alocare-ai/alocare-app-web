import { Locale } from '../../../utils/i18n';
export type OCRStatus = "pending" | "processing" | "complete" | "error";
export type OCRStatusCardProps = {
    lang?: Locale;
    status?: OCRStatus;
    progress?: number;
    className?: string;
};
export declare function OCRStatusCard({ lang, status, progress, className, }: OCRStatusCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OCRStatusCard.d.ts.map