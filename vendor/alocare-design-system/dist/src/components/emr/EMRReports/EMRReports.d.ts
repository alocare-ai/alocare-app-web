import { Locale } from '../../../utils/i18n';
/** Medical report AI analysis — uses shared tablet view; data from GET /reports/{id}/result */
export type EMRReportsProps = {
    lang?: Locale;
    orientation?: "landscape" | "portrait";
};
export declare function EMRReports({ lang, orientation }: EMRReportsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRReports.d.ts.map