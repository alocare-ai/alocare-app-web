import { EMRTabletShellProps } from '../shared/EMRTabletShell';
import { EMRMedicationLine } from '../shared/types';
export type EMRMedicationOrdersProps = Omit<EMRTabletShellProps, "children"> & {
    medications?: EMRMedicationLine[];
};
export declare function EMRMedicationOrders({ lang, medications, ...shell }: EMRMedicationOrdersProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRMedicationOrders.d.ts.map