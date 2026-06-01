"use client";

type Props = {
  level: number;
  locale: string;
};

const LEVELS = [
  { en: "Lab interpretation", id: "Interpretasi lab" },
  { en: "5-year risk outlook", id: "Proyeksi risiko 5 tahun" },
  { en: "90-day health program", id: "Program kesehatan 90 hari" },
  { en: "Progress monitoring", id: "Pemantauan progres" },
  { en: "Personal health concierge", id: "Konsier kesehatan pribadi" },
];

export function ConciergeLevelBadge({ level, locale }: Props) {
  const idx = Math.min(Math.max(level, 1), 5) - 1;
  const label = LEVELS[idx][locale === "id" ? "id" : "en"];

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
        L{level}
      </span>
      {label}
    </div>
  );
}
