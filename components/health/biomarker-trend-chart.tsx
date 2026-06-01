"use client";

import type { BiomarkerTrend } from "@/lib/types/api";

type Props = {
  trend: BiomarkerTrend;
  locale: string;
};

const STATUS_COLORS: Record<string, string> = {
  normal: "bg-emerald-500",
  low: "bg-amber-500",
  high: "bg-orange-500",
  abnormal: "bg-red-500",
  unknown: "bg-slate-400",
};

export function BiomarkerTrendChart({ trend, locale }: Props) {
  const insight =
    locale === "id" ? trend.insight_id ?? trend.insight_en : trend.insight_en ?? trend.insight_id;
  const values = trend.points.map((p) => p.value).filter((v) => v > 0);
  const min = values.length ? Math.min(...values) * 0.9 : 0;
  const max = values.length ? Math.max(...values) * 1.1 : 1;
  const range = max - min || 1;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">{trend.name}</h3>
          {trend.change_percent != null ? (
            <p className="text-xs text-slate-500">
              {trend.direction === "rising" ? "↑" : trend.direction === "falling" ? "↓" : "→"}{" "}
              {Math.abs(trend.change_percent)}%
              {trend.projected_breach_months
                ? ` · ~${trend.projected_breach_months} mo to limit`
                : null}
            </p>
          ) : null}
        </div>
        {trend.reference_high != null ? (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            ref ≤ {trend.reference_high}
            {trend.unit ? ` ${trend.unit}` : ""}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex h-24 items-end gap-2">
        {trend.points.map((point, i) => {
          const height = ((point.value - min) / range) * 100;
          const color = STATUS_COLORS[point.status] ?? STATUS_COLORS.unknown;
          const date = new Date(point.observed_at).toLocaleDateString(
            locale === "id" ? "id-ID" : "en-US",
            { month: "short", year: "2-digit" },
          );
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-slate-700">{point.value_text}</span>
              <div
                className={`w-full max-w-[48px] rounded-t ${color}`}
                style={{ height: `${Math.max(height, 8)}%` }}
                title={point.value_text}
              />
              <span className="text-[10px] text-slate-400">{date}</span>
            </div>
          );
        })}
      </div>

      {insight ? <p className="mt-3 text-sm leading-relaxed text-slate-600">{insight}</p> : null}
    </div>
  );
}
