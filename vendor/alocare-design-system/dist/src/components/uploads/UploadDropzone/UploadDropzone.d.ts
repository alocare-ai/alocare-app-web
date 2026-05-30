import { Locale } from '../../../utils/i18n';
export type UploadDropzoneState = "empty" | "uploading" | "success" | "error";
export type UploadDropzoneProps = {
    lang?: Locale;
    state?: UploadDropzoneState;
    accept?: string;
    multiple?: boolean;
    onFilesSelected?: (files: FileList) => void;
    className?: string;
    hideHeader?: boolean;
};
export declare function UploadDropzone({ lang, state, accept, multiple, onFilesSelected, className, hideHeader, }: UploadDropzoneProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=UploadDropzone.d.ts.map