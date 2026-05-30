import { LoginSize } from './loginSizing';
export type LoginCardProps = {
    children: React.ReactNode;
    loginSize?: LoginSize;
    /** Marketing-site elevation (default for portal). */
    elevated?: boolean;
    className?: string;
};
/** Login shell — Card with optional alocare.net-style shadow. */
export declare function LoginCard({ children, loginSize, elevated, className, }: LoginCardProps): import("react/jsx-runtime").JSX.Element;
export declare function LoginCardHeader({ children, loginSize, className, }: {
    children: React.ReactNode;
    loginSize?: LoginSize;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function LoginCardContent({ children, loginSize, className, }: {
    children: React.ReactNode;
    loginSize?: LoginSize;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginCard.d.ts.map