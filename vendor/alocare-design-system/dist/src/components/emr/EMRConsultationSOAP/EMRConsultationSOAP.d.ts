import { EMRTabletShellProps } from '../shared/EMRTabletShell';
import { EMRSoapFields } from '../shared/types';
export type EMRConsultationSOAPProps = Omit<EMRTabletShellProps, "children"> & {
    soap?: Partial<EMRSoapFields>;
    onSaveSoap?: (soap: EMRSoapFields) => void;
    onSubmit?: () => void;
};
export declare function EMRConsultationSOAP({ lang, soap: initial, onSaveSoap, onSubmit, ...shell }: EMRConsultationSOAPProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRConsultationSOAP.d.ts.map