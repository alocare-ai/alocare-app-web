"use client";

import type { RiskAssessment } from "@/lib/types/api";

type Props = {
  risks: RiskAssessment[];
  locale: string;
};

const TIER_STYLES: Record<string, string> = {
  minimal: "bg-emerald-100 text-emerald-800",
  low: "bg-lime-100 text-lime-800",
  moderate: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

export function RiskScoresPanel({ risks, locale }: Props) {
  if (!risks.length) {
    return (
      <p className="text-sm text-slate-500">
        {locale === "id"
          ? "Belum ada skor risiko. Unggah MCU dan segarkan intelijen kesehatan."
          : "No risk scores yet. Upload checkups and refresh health intelligence."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {risks.map((risk) => (
        <div
          key={risk.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-slate-900">{risk.condition_label}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TIER_STYLES[risk.tier] ?? TIER_STYLES.low}`}
            >
              {risk.tier}
            </span>
          </div>
          <div className="mt-2">
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${risk.score >= 75 ? "bg-red-500" : risk.score >= 50 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${Math.min(risk.score, 100)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {locale === "id" ? "Skor risiko" : "Risk score"}: {risk.score.toFixed(0)}/100
            </p>
          </div>
          {risk.factors.length > 0 ? (
            <ul className="mt-2 list-inside list-disc text-xs text-slate-600">
              {risk.factors.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          ) : null}
          {risk.narrative ? (
            <p className="mt-2 text-xs text-slate-500">{risk.narrative}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
