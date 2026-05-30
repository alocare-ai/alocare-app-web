export type LoginLayoutVariant = "plain" | "gradient" | "split";
export type LoginAccent = "blue" | "teal" | "emerald" | "slate";
export type LoginLayoutProps = {
    children: React.ReactNode;
    variant?: LoginLayoutVariant;
    accent?: LoginAccent;
    /** Content for split layout left panel (brand, illustration). */
    sidePanel?: React.ReactNode;
    className?: string;
};
export declare function LoginLayout({ children, variant, accent, sidePanel, className, }: LoginLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginLayout.d.ts.map