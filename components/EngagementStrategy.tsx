"use client";

import { IconAlert, IconChart } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface EngagementStrategyProps {
  missingMunicipios: string[];
  totalMunicipios: number;
}

/**
 * Highlights municipalities without participation
 * and suggests engagement strategy
 */
export default function EngagementStrategy({
  missingMunicipios,
  totalMunicipios,
}: EngagementStrategyProps) {
  if (missingMunicipios.length === 0) {
    return null; // Don't show if all municipalities have participation
  }

  const coverage = Math.round(((totalMunicipios - missingMunicipios.length) / totalMunicipios) * 100);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
      <div className="flex items-start gap-3">
        <IconChart size={20} color={colors.primary[600]} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-bold text-blue-900 mb-1">Próximos Passos Estratégicos</h3>
          <p className="text-sm text-blue-800 mb-4">
            Cobertura atual: <span className="font-semibold">{coverage}%</span> dos municípios ({totalMunicipios - missingMunicipios.length}/{totalMunicipios})
          </p>

          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-900 mb-3">
              Municípios para engajamento prioritário:
            </p>
            <div className="space-y-2">
              {missingMunicipios.map((municipio) => (
                <div
                  key={municipio}
                  className="flex items-center gap-3 bg-white border border-blue-100 rounded-lg p-3"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm font-semibold text-gray-900">{municipio}</span>
                  <span className="text-xs text-gray-500 ml-auto">(0 participações)</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-blue-700 italic">
            💡 Todos os municípios têm importância igual. A ausência de participações não significa
            menor necessidade de atenção — indica que ainda não conectamos com essas comunidades.
          </p>
        </div>
      </div>
    </div>
  );
}
