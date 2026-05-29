export type Locale = "en" | "id";

export type BilingualText = {
  en: string;
  id: string;
};

export function t(text: BilingualText | string, lang: Locale = "en"): string {
  if (typeof text === "string") return text;
  return text[lang];
}

export function bilingual(en: string, id: string): BilingualText {
  return { en, id };
}
