import { Locale } from '../../../utils/i18n';
export type TabletPatientDetailProps = {
    lang?: Locale;
    name: string;
    mrn: string;
    age?: number;
    gender?: string;
    embedded?: boolean;
    className?: string;
};
export declare function TabletPatientDetail({ lang, name, mrn, age, gender, embedded, className, }: TabletPatientDetailProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TabletPatientDetail.d.ts.map