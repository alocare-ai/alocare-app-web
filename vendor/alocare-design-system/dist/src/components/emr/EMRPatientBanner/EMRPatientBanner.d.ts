import { Locale } from '../../../utils/i18n';
export type EMRPatientBannerProps = {
    lang?: Locale;
    name: string;
    admissionNo: string;
    mrn: string;
    insurance: string;
    allergies?: string;
    className?: string;
};
export declare function EMRPatientBanner({ lang, name, admissionNo, mrn, insurance, allergies, className, }: EMRPatientBannerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRPatientBanner.d.ts.map