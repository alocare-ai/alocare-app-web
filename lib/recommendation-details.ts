import type { Locale } from "@/lib/i18n";

type ActionDetail = { title: string; description: string };

const DETAILS: Record<string, { en: ActionDetail; id: ActionDetail }> = {
  discuss: {
    en: {
      title: "Discuss the results with the patient",
      description:
        "Review each value, what is in range, and what needs follow-up.",
    },
    id: {
      title: "Diskusikan hasil dengan pasien",
      description:
        "Jelaskan setiap nilai, mana yang normal, dan mana yang perlu ditindaklanjuti.",
    },
  },
  lifestyle: {
    en: {
      title: "Recommend lifestyle modifications to lower LDL cholesterol",
      description:
        "Diet low in saturated/trans fat, regular aerobic activity (~150 min/week), weight management, smoking cessation if applicable; recheck lipids in 3–6 months.",
    },
    id: {
      title: "Rekomendasikan perubahan gaya hidup untuk menurunkan LDL",
      description:
        "Diet rendah lemak jenuh/trans, aktivitas aerobik teratur (~150 menit/minggu), pengelolaan berat badan, berhenti merokok bila perlu; kontrol ulang lipid dalam 3–6 bulan.",
    },
  },
  evaluation: {
    en: {
      title: "Consider further evaluation if symptoms are present",
      description:
        "Assess chest pain, dyspnea, family history, and cardiovascular risk factors.",
    },
    id: {
      title: "Pertimbangkan evaluasi lanjutan jika ada gejala",
      description:
        "Telaah nyeri dada, sesak, riwayat keluarga, dan faktor risiko kardiovaskular.",
    },
  },
  investigation: {
    en: {
      title: "Consider further investigation",
      description:
        "Order targeted tests based on abnormal values and clinical presentation.",
    },
    id: {
      title: "Pertimbangkan investigasi lanjutan",
      description:
        "Lakukan pemeriksaan tambahan sesuai nilai abnormal dan kondisi klinis pasien.",
    },
  },
};

function matchKey(action: string): keyof typeof DETAILS | null {
  const lower = action.toLowerCase();
  if (lower.includes("lifestyle") || lower.includes("lower ldl")) return "lifestyle";
  if (lower.includes("discuss")) return "discuss";
  if (lower.includes("investigation")) return "investigation";
  if (lower.includes("evaluation") || lower.includes("symptom")) return "evaluation";
  return null;
}

export function enrichRecommendation(
  action: string,
  locale: Locale,
): { title: string; description?: string } {
  const key = matchKey(action);
  if (!key) {
    return { title: action };
  }
  const entry = DETAILS[key][locale];
  return { title: entry.title, description: entry.description };
}
