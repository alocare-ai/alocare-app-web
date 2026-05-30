import { Locale } from '../../../utils/i18n';
export type AIStatus = "idle" | "processing" | "complete" | "review";
export type AIStatusBadgeProps = {
    status?: AIStatus;
    lang?: Locale;
    className?: string;
};
export declare function AIStatusBadge({ status, lang, className, }: AIStatusBadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AIStatusBadge.d.ts.map