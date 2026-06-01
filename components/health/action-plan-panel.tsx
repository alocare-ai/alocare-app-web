"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ActionPlan } from "@/lib/types/api";
import { updateActionPlanItem } from "@/lib/api/health-intelligence";

type Props = {
  plans: ActionPlan[];
  patientId: string;
  locale: string;
};

const CATEGORY_LABELS: Record<string, { en: string; id: string }> = {
  nutrition: { en: "Nutrition", id: "Nutrisi" },
  exercise: { en: "Exercise", id: "Olahraga" },
  sleep: { en: "Sleep", id: "Tidur" },
  monitoring: { en: "Monitoring", id: "Pemantauan" },
  general: { en: "General", id: "Umum" },
};

export function ActionPlanPanel({ plans, patientId, locale }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ itemId, status }: { itemId: string; status: string }) =>
      updateActionPlanItem(itemId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-intelligence", patientId] });
    },
  });

  if (!plans.length) {
    return (
      <p className="text-sm text-slate-500">
        {locale === "id"
          ? "Belum ada program kesehatan. Klik \"Buat program\" untuk memulai rencana 90 hari."
          : 'No health program yet. Click "Generate program" to start a 90-day plan.'}
      </p>
    );
  }

  const plan = plans[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">{plan.title}</h3>
          <p className="text-xs text-slate-500">
            {plan.program_type.replace("_", "-")} · {plan.progress_percent.toFixed(0)}%{" "}
            {locale === "id" ? "selesai" : "complete"}
          </p>
        </div>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${plan.progress_percent}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {plan.items.map((item) => {
          const cat =
            CATEGORY_LABELS[item.category]?.[locale === "id" ? "id" : "en"] ?? item.category;
          const done = item.status === "completed";
          return (
            <label
              key={item.id}
              className={`flex cursor-pointer gap-3 rounded-lg border p-3 transition ${done ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white"}`}
            >
              <input
                type="checkbox"
                checked={done}
                disabled={mutation.isPending}
                onChange={() =>
                  mutation.mutate({
                    itemId: item.id,
                    status: done ? "pending" : "completed",
                  })
                }
                className="mt-1"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>
                    {locale === "id" ? "Minggu" : "Week"} {item.week_number}
                  </span>
                  <span>·</span>
                  <span>{cat}</span>
                </div>
                <p className={`font-medium ${done ? "text-slate-500 line-through" : "text-slate-900"}`}>
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-0.5 text-sm text-slate-600">{item.description}</p>
                ) : null}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
