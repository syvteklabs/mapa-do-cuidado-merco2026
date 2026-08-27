"use client";

import { useMemo, useState } from "react";

interface MunicipalityItem {
  name: string;
  count: number;
  percentage: number;
}

interface MunicipalitiesRankingProps {
  municipiosStats: Record<string, number>;
  selectedMunicipio?: string | null;
  onMunicipioSelect?: (municipio: string | null) => void;
  onCenterMap?: (municipio: string) => void;
  isTV?: boolean;
}

export default function MunicipalitiesRanking({
  municipiosStats,
  selectedMunicipio = null,
  onMunicipioSelect = () => {},
  onCenterMap = () => {},
  isTV = false,
}: MunicipalitiesRankingProps) {
  const [sortBy, setSortBy] = useState<"quantity" | "alphabetical">("quantity");

  const items = useMemo(() => {
    const municipalityItems: MunicipalityItem[] = Object.entries(municipiosStats).map(
      ([name, count]) => ({
        name,
        count,
        percentage: 0,
      })
    );

    const totalParticipations = municipalityItems.reduce((sum, m) => sum + m.count, 0);

    municipalityItems.forEach((item) => {
      item.percentage =
        totalParticipations > 0
          ? Math.round((item.count / totalParticipations) * 100)
          : 0;
    });

    // Sort based on selected option
    if (sortBy === "quantity") {
      municipalityItems.sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.name.localeCompare(b.name);
      });
    } else {
      municipalityItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    return municipalityItems;
  }, [municipiosStats, sortBy]);

  const total = useMemo(
    () => items.reduce((sum, m) => sum + m.count, 0),
    [items]
  );

  const activeMunicipios = useMemo(
    () => items.filter((m) => m.count > 0).length,
    [items]
  );

  const maxCount = useMemo(() => Math.max(...items.map((m) => m.count), 1), [items]);

  return (
    <div className={`space-y-6 ${isTV ? "space-y-8" : ""}`}>
      {/* Header with Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className={`text-gray-600 ${isTV ? "text-lg" : "text-sm"} mt-1`}>
            Cobertura territorial do Noroeste Fluminense
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-gray-600 font-medium ${isTV ? "text-lg" : "text-sm"}`}>
            Ordenar por:
          </span>
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg p-1 border border-gray-300">
            <button
              onClick={() => setSortBy("quantity")}
              className={`px-4 py-2 rounded font-semibold text-sm transition-all ${
                sortBy === "quantity"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Quantidade
            </button>
            <button
              onClick={() => setSortBy("alphabetical")}
              className={`px-4 py-2 rounded font-semibold text-sm transition-all ${
                sortBy === "alphabetical"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              A-Z
            </button>
          </div>
        </div>
      </div>

      {/* Coverage Stats */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6 shadow-md">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <p className={`text-emerald-600 font-bold uppercase mb-2 ${isTV ? "text-lg" : "text-xs"}`}>
              Participações
            </p>
            <p className={`font-black text-emerald-900 ${isTV ? "text-4xl" : "text-3xl"}`}>
              {total}
            </p>
          </div>
          <div className="text-center border-l border-emerald-300">
            <p className={`text-emerald-600 font-bold uppercase mb-2 ${isTV ? "text-lg" : "text-xs"}`}>
              Municípios
            </p>
            <p className={`font-black text-emerald-900 ${isTV ? "text-4xl" : "text-3xl"}`}>
              {activeMunicipios}
              <span className={`text-emerald-600 font-semibold ${isTV ? "text-lg" : "text-sm"}`}>
                /13
              </span>
            </p>
          </div>
          <div className="text-center border-l border-emerald-300">
            <p className={`text-emerald-600 font-bold uppercase mb-2 ${isTV ? "text-lg" : "text-xs"}`}>
              Cobertura
            </p>
            <p className={`font-black text-emerald-900 ${isTV ? "text-4xl" : "text-3xl"}`}>
              {Math.round((activeMunicipios / 13) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Municipalities Cards Grid */}
      <div className={`grid gap-4 ${isTV ? "gap-6" : ""} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`}>
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              onMunicipioSelect(item.name === selectedMunicipio ? null : item.name);
              onCenterMap(item.name);
            }}
            className={`bg-white border-2 border-gray-300 rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:border-blue-400 ${
              selectedMunicipio === item.name
                ? "ring-2 ring-blue-600 shadow-lg border-blue-500 bg-blue-50"
                : ""
            } ${isTV ? "p-8" : ""}`}
          >
            {/* Municipality Name */}
            <div className="mb-4">
              <p className={`font-bold text-gray-900 line-clamp-2 ${isTV ? "text-lg" : "text-base"}`}>
                {item.name}
              </p>
            </div>

            {/* Contribution Count and Percentage */}
            <div className="mb-4 space-y-1">
              <div className="flex justify-between items-baseline">
                <p className={`text-gray-600 font-semibold ${isTV ? "text-lg" : "text-sm"}`}>
                  Contribuições
                </p>
                <p className={`font-black text-gray-900 ${isTV ? "text-2xl" : "text-lg"}`}>
                  {item.count}
                </p>
              </div>
              {item.percentage > 0 && (
                <p className={`text-gray-500 font-medium ${isTV ? "text-base" : "text-xs"}`}>
                  {item.percentage}% do total
                </p>
              )}
            </div>

            {/* Neutral Progress Bar */}
            {item.count > 0 ? (
              <div className="space-y-2">
                <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${isTV ? "h-4" : "h-3"}`}>
                  <div
                    className="bg-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                      height: isTV ? "16px" : "12px",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="py-3">
                <p className={`text-gray-500 font-semibold text-center italic ${isTV ? "text-base" : "text-sm"}`}>
                  Ainda sem participação
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Methodology Note */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-5 sm:p-6">
        <p className={`text-blue-900 font-medium leading-relaxed ${isTV ? "text-lg" : "text-sm"}`}>
          ℹ️ Este mapa mostra a <strong>cobertura territorial</strong> das participações. Todos os municípios têm importância igual — a ausência de participações não significa menor necessidade de atenção.
        </p>
      </div>

      {/* Interaction Hint */}
      <p className={`text-gray-500 text-center italic px-4 ${isTV ? "text-base" : "text-xs"}`}>
        💡 Clique em um card para selecioná-lo e centralizá-lo no mapa
      </p>
    </div>
  );
}
