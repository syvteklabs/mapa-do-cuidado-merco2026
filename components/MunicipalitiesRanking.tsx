"use client";

import { useMemo } from "react";
import { animationClasses } from "@/lib/animations";

interface MunicipalityRankItem {
  name: string;
  count: number;
  rank: number;
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
  // Create and sort ranking
  const ranking = useMemo(() => {
    const items: MunicipalityRankItem[] = Object.entries(municipiosStats).map(
      ([name, count]) => ({
        name,
        count,
        rank: 0,
        percentage: 0,
      })
    );

    const totalParticipations = items.reduce((sum, m) => sum + m.count, 0);

    // Calculate percentages
    items.forEach((item) => {
      item.percentage =
        totalParticipations > 0
          ? Math.round((item.count / totalParticipations) * 100)
          : 0;
    });

    // Sort by count descending, then by name ascending
    items.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

    // Assign ranks
    items.forEach((item, index) => {
      item.rank = index + 1;
    });

    return items;
  }, [municipiosStats]);

  const total = useMemo(
    () => ranking.reduce((sum, m) => sum + m.count, 0),
    [ranking]
  );

  const maxCount = useMemo(() => Math.max(...ranking.map((m) => m.count), 1), [ranking]);

  // Get medal emoji for top 3
  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };

  // Get color based on rank
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-600";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-600";
    return "text-gray-500";
  };

  const getBarColor = (count: number) => {
    if (count === 0) return "bg-gray-200";
    const intensity = count / maxCount;
    if (intensity > 0.75) return "bg-blue-600";
    if (intensity > 0.5) return "bg-blue-500";
    if (intensity > 0.25) return "bg-blue-400";
    return "bg-blue-300";
  };

  return (
    <div className={`space-y-4 ${isTV ? "space-y-6" : ""}`}>
      {/* Ranking Container */}
      <div
        className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 ${
            isTV ? "py-6 px-8" : ""
          }`}
        >
          <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
            <div className={`col-span-1 font-bold text-gray-600 text-center ${isTV ? "text-xl" : "text-xs sm:text-sm"}`}>
              #
            </div>
            <div className={`col-span-4 sm:col-span-5 font-bold text-gray-600 truncate ${isTV ? "text-xl" : "text-xs sm:text-sm"}`}>
              Município
            </div>
            <div className={`col-span-3 sm:col-span-2 font-bold text-gray-600 text-right ${isTV ? "text-xl" : "text-xs sm:text-sm"}`}>
              Part.
            </div>
            <div className={`col-span-4 sm:col-span-3 font-bold text-gray-600 text-right ${isTV ? "text-xl" : "text-xs sm:text-sm"}`}>
              %
            </div>
          </div>
        </div>

        {/* Ranking Items */}
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {ranking.map((item, index) => (
            <div
              key={item.name}
              onClick={() => {
                onMunicipioSelect(item.name === selectedMunicipio ? null : item.name);
                onCenterMap(item.name);
              }}
              className={`px-4 sm:px-6 py-3 sm:py-4 cursor-pointer transition-all duration-200 ${
                selectedMunicipio === item.name
                  ? "bg-blue-50 border-l-4 border-blue-600"
                  : "hover:bg-gray-50 border-l-4 border-transparent"
              } ${isTV ? "py-5 px-8" : ""} ${animationClasses.fadeInUp}`}
              style={{
                animationDelay: `${Math.min(index * 50, 200)}ms`,
              }}
            >
              <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center mb-2">
                {/* Rank */}
                <div
                  className={`col-span-1 text-center font-bold ${getRankColor(
                    item.rank
                  )} ${isTV ? "text-2xl" : "text-base sm:text-lg"}`}
                >
                  {getMedalEmoji(item.rank) || `${item.rank}°`}
                </div>

                {/* Municipality Name */}
                <div className={`col-span-4 sm:col-span-5 font-semibold text-gray-900 truncate ${isTV ? "text-lg" : "text-xs sm:text-sm"}`}>
                  {item.name}
                </div>

                {/* Count */}
                <div className={`col-span-3 sm:col-span-2 text-right font-bold ${
                  item.count === 0 ? "text-gray-400" : "text-blue-600"
                } ${isTV ? "text-xl" : "text-xs sm:text-base"}`}>
                  {item.count}
                </div>

                {/* Percentage */}
                <div className={`col-span-4 sm:col-span-3 text-right font-semibold text-gray-600 ${isTV ? "text-lg" : "text-xs sm:text-sm"}`}>
                  {item.percentage}%
                </div>
              </div>

              {/* Progress Bar */}
              {item.count > 0 && (
                <div className={`flex gap-2 items-center ${isTV ? "gap-3" : ""}`}>
                  <div className={`flex-1 bg-gray-200 rounded-full overflow-hidden ${isTV ? "h-4" : "h-2"}`}>
                    <div
                      className={`${getBarColor(item.count)} rounded-full transition-all duration-300 ${
                        isTV ? "h-4" : "h-2"
                      }`}
                      style={{
                        width: `${(item.count / maxCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* No Data State - Graceful */}
              {item.count === 0 && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <div className="flex-1 bg-gray-100 rounded-full h-2" />
                  <span className="italic">Sem dados</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-2 gap-2 sm:gap-4">
          <div>
            <p className={`text-gray-600 font-medium ${isTV ? "text-lg mb-1" : "text-xs mb-0.5"}`}>
              Total
            </p>
            <p className={`font-bold text-blue-600 ${isTV ? "text-3xl" : "text-lg sm:text-xl"}`}>
              {total}
            </p>
          </div>
          <div>
            <p className={`text-gray-600 font-medium ${isTV ? "text-lg mb-1" : "text-xs mb-0.5"}`}>
              Ativos
            </p>
            <p className={`font-bold text-green-600 ${isTV ? "text-3xl" : "text-lg sm:text-xl"}`}>
              {ranking.filter((m) => m.count > 0).length}/13
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Hint */}
      {!isTV && (
        <div className="text-xs text-gray-500 text-center italic px-4">
          Clique para selecionar e centralizar no mapa
        </div>
      )}
    </div>
  );
}
