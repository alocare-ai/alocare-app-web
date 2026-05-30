export type Locale = "en" | "id";
export type BilingualText = {
    en: string;
    id: string;
};
export declare function t(text: BilingualText | string, lang?: Locale): string;
export declare function bilingual(en: string, id: string): BilingualText;
//# sourceMappingURL=i18n.d.ts.map