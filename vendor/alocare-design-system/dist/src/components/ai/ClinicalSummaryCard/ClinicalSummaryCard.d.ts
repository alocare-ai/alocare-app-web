import { BilingualText, Locale } from '../../../utils/i18n';
export type ClinicalSummaryCardProps = {
    summary: BilingualText | string;
    lang?: Locale;
    loading?: boolean;
    riskLevel?: "normal" | "elevated" | "high";
    /** When true, shows EN and ID titles together (marketing/tablet). Portal uses false. */
    dualLanguageTitle?: boolean;
    className?: string;
};
export declare function ClinicalSummaryCard({ summary, lang, loading, riskLevel, dualLanguageTitle, className, }: ClinicalSummaryCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ClinicalSummaryCard.d.ts.map