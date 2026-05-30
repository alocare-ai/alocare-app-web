/** Shared scale for web portal login (matches alocare-app-web, with optional `lg` boost). */
export type LoginSize = "md" | "lg";
/** @param loginSize - visual scale for portal login (`md` | `lg`). */
export declare const loginSizing: {
    readonly card: {
        readonly md: "w-full max-w-md";
        readonly lg: "w-full max-w-lg";
    };
    readonly header: {
        readonly md: "border-b border-slate-100 px-5 pt-5 pb-4";
        readonly lg: "border-b border-slate-100 px-6 pt-6 pb-5";
    };
    readonly content: {
        readonly md: "px-5 py-5";
        readonly lg: "px-6 py-6";
    };
    readonly logoPx: {
        readonly md: 48;
        readonly lg: 56;
    };
    readonly title: {
        readonly md: "font-heading text-xl font-semibold text-slate-900";
        readonly lg: "font-heading text-2xl font-semibold text-slate-900";
    };
    readonly subtitle: {
        readonly md: "mt-1 text-sm text-slate-600";
        readonly lg: "mt-2 text-base text-slate-600";
    };
    readonly form: {
        readonly md: "space-y-4";
        readonly lg: "space-y-5";
    };
    readonly input: {
        readonly md: "h-10 text-sm";
        readonly lg: "h-12 text-base px-4";
    };
    readonly label: {
        readonly md: "text-sm font-medium text-slate-700";
        readonly lg: "text-base font-medium text-slate-700";
    };
    readonly button: {
        readonly md: "lg";
        readonly lg: "xl";
    };
    readonly passwordToggleTop: {
        readonly md: "top-[2.125rem]";
        readonly lg: "top-[2.625rem]";
    };
    /** Centered portal brand block — logo → title → subtitle */
    readonly brandBlock: {
        readonly md: "mx-auto flex w-full max-w-xs flex-col items-center text-center";
        readonly lg: "mx-auto flex w-full max-w-sm flex-col items-center text-center";
    };
    readonly brandLogoToTitle: {
        readonly md: "mt-6";
        readonly lg: "mt-8";
    };
    readonly titleToSubtitle: {
        readonly md: "mt-2";
        readonly lg: "mt-2.5";
    };
    readonly subtitleMax: {
        readonly md: "max-w-[260px]";
        readonly lg: "max-w-[300px]";
    };
};
//# sourceMappingURL=loginSizing.d.ts.map