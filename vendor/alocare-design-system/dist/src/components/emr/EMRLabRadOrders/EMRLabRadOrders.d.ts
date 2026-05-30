import { EMRTabletShellProps } from '../shared/EMRTabletShell';
import { EMRLabOrderLine } from '../shared/types';
export type EMRLabRadOrdersProps = Omit<EMRTabletShellProps, "children"> & {
    orders?: EMRLabOrderLine[];
};
export declare function EMRLabRadOrders({ lang, orders, ...shell }: EMRLabRadOrdersProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EMRLabRadOrders.d.ts.map