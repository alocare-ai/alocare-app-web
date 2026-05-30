import { Locale } from '../../../utils/i18n';
export type ChatInputProps = {
    lang?: Locale;
    onSend?: (message: string) => void;
    disabled?: boolean;
    className?: string;
};
export declare function ChatInput({ lang, onSend, disabled, className, }: ChatInputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatInput.d.ts.map