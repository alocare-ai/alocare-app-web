import { EMRTabletShellProps } from '../shared/EMRTabletShell';
import { EMRWorklistPatient } from '../shared/types';
export type EMRWorklistProps = Omit<EMRTabletShellProps, "children"> & {
    patients?: EMRWorklistPatient[];
    onCallPatient?: (patient: EMRWorklistPatient) => void;
};
export declare function EMRWorklist({ lang, patients, onCallPatient, ...shell }: EMRWorklistProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRWorklist.d.ts.map