import { BilingualText, Locale } from '../../../utils/i18n';
export type Recommendation = {
    id: string;
    title: BilingualText | string;
    description?: BilingualText | string;
    icon?: "heart" | "exercise" | "calendar" | "default";
};
export type RecommendationListProps = {
    items: Recommendation[];
    lang?: Locale;
    dualLanguageTitle?: boolean;
    className?: string;
};
export declare function RecommendationList({ items, lang, dualLanguageTitle, className, }: RecommendationListProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RecommendationList.d.ts.map