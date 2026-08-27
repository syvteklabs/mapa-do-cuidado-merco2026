"use client";

import { getCategoryLabel } from "@/lib/dictionaries";
import { IconMap, IconChart, IconIdea, IconIdea as IconInsight } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface LearningsBlockProps {
  total: number;
  byCategory?: Record<string, number>;
  byMunicipio?: Record<string, number>;
  activeMunicipios: number;
  totalMunicipios?: number;
  isTV?: boolean;
}

interface Insight {
  text: string;
  icon?: React.ComponentType<{ size: number; color: string }>;
  category?: "municipalities" | "pattern" | "gaps" | "methodology";
}

export default function LearningsBlock({
  total,
  byCategory = {},
  byMunicipio = {},
  activeMunicipios,
  totalMunicipios = 13,
  isTV = false,
}: LearningsBlockProps) {
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    // Insight 1: Municipalities participating
    if (activeMunicipios > 0) {
      insights.push({
        text: `${activeMunicipios} ${activeMunicipios === 1 ? "município" : "municípios"} já participou${activeMunicipios === 1 ? "" : "ram"} da escuta`,
        icon: IconMap,
        category: "municipalities",
      });
    }

    // Insight 2: Significant patterns (categories mentioned 3+ times)
    const sortedCategories = Object.entries(byCategory || {})
      .sort((a, b) => b[1] - a[1])
      .filter(([, count]) => count >= 3);

    if (sortedCategories.length > 0) {
      const topCategory = sortedCategories[0];
      if (topCategory[1] >= 3) {
        insights.push({
          text: `${getCategoryLabel(topCategory[0])} apareceu em ${topCategory[1]} contribuição${topCategory[1] !== 1 ? "ões" : ""}`,
          icon: IconChart,
          category: "pattern",
        });
      }
    }

    // Insight 3: Municipalities without contributions
    const municipiosWithoutParticipation = totalMunicipios - activeMunicipios;
    if (municipiosWithoutParticipation > 0) {
      insights.push({
        text: `${municipiosWithoutParticipation} ${municipiosWithoutParticipation === 1 ? "município" : "municípios"} ainda não possuem contribuições`,
        icon: IconIdea,
        category: "gaps",
      });
    }

    // Insight 4: Always show methodology reminder
    insights.push({
      text: "Os resultados ainda são sinais iniciais",
      icon: IconInsight,
      category: "methodology",
    });

    return insights;
  };

  const insights = generateInsights();

  // Only show if there's data
  if (total === 0 || insights.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${isTV ? "" : ""}`}>
      <div className="space-y-3">
        <h2 className={`font-bold text-gray-900 flex items-center gap-3 ${isTV ? "text-5xl" : "text-3xl sm:text-4xl"}`}>
          <IconIdea size={32} color={colors.primary[600]} />
          O que estamos aprendendo
        </h2>
        <p className={`text-gray-700 leading-relaxed max-w-3xl ${isTV ? "text-xl" : "text-base"}`}>
          Interpretações cautelosas baseadas nas contribuições recebidas até agora
        </p>
      </div>

      <div className={`grid gap-4 ${isTV ? "grid-cols-2 gap-6" : "grid-cols-1 md:grid-cols-2"}`}>
        {insights.map((insight, index) => {
          const bgColorClass =
            insight.category === "municipalities"
              ? "bg-blue-50 border-blue-200"
              : insight.category === "pattern"
                ? "bg-emerald-50 border-emerald-200"
                : insight.category === "gaps"
                  ? "bg-amber-50 border-amber-200"
                  : "bg-gray-50 border-gray-200";

          const iconColor =
            insight.category === "municipalities"
              ? colors.primary[600]
              : insight.category === "pattern"
                ? colors.secondary[600]
                : insight.category === "gaps"
                  ? colors.accent[600]
                  : colors.gray[600];

          const IconComponent = insight.icon || IconIdea;

          return (
            <div
              key={index}
              className={`${bgColorClass} border rounded-lg p-6 hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-start gap-4">
                <IconComponent size={24} color={iconColor} className="flex-shrink-0 mt-0.5" />
                <p className={`text-gray-900 font-semibold leading-relaxed ${isTV ? "text-lg" : "text-base"}`}>
                  {insight.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Methodology Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className={`text-blue-900 text-center ${isTV ? "text-lg" : "text-sm"}`}>
          <strong>Nota metodológica:</strong> Estas interpretações seguem regras automáticas simples (mínimo 3 menções para considerar um padrão). Elas revelam sinais iniciais, não representam a população estatisticamente.
        </p>
      </div>
    </div>
  );
}
