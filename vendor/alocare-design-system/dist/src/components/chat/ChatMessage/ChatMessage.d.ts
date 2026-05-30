export type ChatMessageProps = {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp?: string;
    className?: string;
};
export declare function ChatMessage({ role, content, timestamp, className }: ChatMessageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatMessage.d.ts.map