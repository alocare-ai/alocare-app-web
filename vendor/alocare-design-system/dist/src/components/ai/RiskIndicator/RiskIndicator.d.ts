import { Locale } from '../../../utils/i18n';
export type RiskLevel = "low" | "medium" | "high";
export type RiskIndicatorProps = {
    level: RiskLevel;
    percentage?: number;
    lang?: Locale;
    className?: string;
};
export declare function RiskIndicator({ level, percentage, lang, className, }: RiskIndicatorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RiskIndicator.d.ts.map