import { Locale } from '../../../utils/i18n';
export type FindingStatus = "normal" | "low" | "high" | "critical";
export type KeyFinding = {
    label: string;
    value: string;
    status: FindingStatus;
    statusLabel?: {
        en: string;
        id: string;
    };
};
export type KeyFindingCardProps = {
    findings: KeyFinding[];
    lang?: Locale;
    dualLanguageTitle?: boolean;
    className?: string;
};
export declare function KeyFindingCard({ findings, lang, dualLanguageTitle, className, }: KeyFindingCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=KeyFindingCard.d.ts.map