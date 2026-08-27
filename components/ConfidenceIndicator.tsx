"use client";

import { IconAlert } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface ConfidenceIndicatorProps {
  totalContributions: number;
  confidenceLevel?: number; // 0-100
  variant?: "inline" | "prominent";
}

/**
 * Shows data confidence level based on sample size
 * Warns about small samples and early-stage patterns
 */
export default function ConfidenceIndicator({
  totalContributions,
  confidenceLevel,
  variant = "inline",
}: ConfidenceIndicatorProps) {
  // Calculate confidence based on sample size
  // 15 contributions ≈ 40% confidence (small sample)
  // 50 contributions ≈ 70% confidence (moderate)
  // 200+ contributions ≈ 90% confidence (good)
  const calculatedConfidence =
    confidenceLevel ?? Math.min(90, Math.max(20, totalContributions * 4));

  const getConfidenceLabel = () => {
    if (calculatedConfidence < 40) return "Amostra pequena";
    if (calculatedConfidence < 60) return "Amostra moderada";
    if (calculatedConfidence < 80) return "Amostra boa";
    return "Amostra sólida";
  };

  const getConfidenceColor = () => {
    if (calculatedConfidence < 40) return "bg-amber-500";
    if (calculatedConfidence < 60) return "bg-yellow-500";
    if (calculatedConfidence < 80) return "bg-lime-500";
    return "bg-green-500";
  };

  if (variant === "inline") {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <IconAlert size={20} color={colors.warning[600]} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-amber-900 mb-2">
            {getConfidenceLabel()}
          </p>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${getConfidenceColor()}`}
                style={{ width: `${calculatedConfidence}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-amber-800 min-w-fit">
              {calculatedConfidence}%
            </span>
          </div>
          <p className="text-sm text-amber-800">
            {totalContributions} contribuição{totalContributions !== 1 ? "s" : ""} recebida
            {totalContributions !== 1 ? "s" : ""}. Interpretamos apenas sinais iniciais, não
            diagnósticos oficiais.
          </p>
        </div>
      </div>
    );
  }

  // Prominent variant for early stage
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-6">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-100">
            <IconAlert size={24} color={colors.warning[600]} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-900 mb-2">Estamos em fase inicial</h3>
          <div className="mb-3">
            <p className="text-sm text-amber-800 mb-2">
              Confiança dos padrões identificados:
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${getConfidenceColor()}`}
                  style={{ width: `${calculatedConfidence}%` }}
                />
              </div>
              <span className="text-sm font-bold text-amber-900 min-w-fit">
                {calculatedConfidence}%
              </span>
            </div>
          </div>
          <p className="text-sm text-amber-800">
            Com {totalContributions} contribuição{totalContributions !== 1 ? "s" : ""}, estes são
            sinais iniciais da experiência compartilhada no território. Não constituem diagnóstico
            oficial nem pesquisa estatisticamente representativa.
          </p>
          <p className="text-xs text-amber-700 mt-3 italic">
            Novos dados chegarão nas próximas semanas. Padrões se solidificam com mais participação.
          </p>
        </div>
      </div>
    </div>
  );
}
