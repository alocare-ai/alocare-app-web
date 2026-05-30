import { TabletShellProps } from '../shared/TabletShell';
export type UploadPipelineStatus = "idle" | "uploaded" | "ocr" | "analyzing" | "completed";
export type TabletUploadFlowProps = Omit<TabletShellProps, "children"> & {
    pipelineStatus?: UploadPipelineStatus;
    progress?: number;
    fileName?: string;
};
export declare function TabletUploadFlow({ lang, pipelineStatus, progress, fileName, ...shellProps }: TabletUploadFlowProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TabletUploadFlow.d.ts.map