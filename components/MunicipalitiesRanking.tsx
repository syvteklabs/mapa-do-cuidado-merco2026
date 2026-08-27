"use client";

import { useMemo } from "react";

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

const getGradientColor = (rank: number) => {
  if (rank === 1) return "from-yellow-50 to-yellow-100 border-yellow-400";
  if (rank === 2) return "from-gray-50 to-gray-100 border-gray-400";
  if (rank === 3) return "from-orange-50 to-orange-100 border-orange-400";
  if (rank <= 6) return "from-blue-50 to-blue-100 border-blue-300";
  return "from-indigo-50 to-indigo-100 border-indigo-300";
};

const getTextColor = (rank: number) => {
  if (rank === 1) return "text-yellow-700";
  if (rank === 2) return "text-gray-700";
  if (rank === 3) return "text-orange-700";
  if (rank <= 6) return "text-blue-700";
  return "text-indigo-700";
};

const getMedalEmoji = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  if (rank <= 6) return "⭐";
  return "📌";
};

export default function MunicipalitiesRanking({
  municipiosStats,
  selectedMunicipio = null,
  onMunicipioSelect = () => {},
  onCenterMap = () => {},
  isTV = false,
}: MunicipalitiesRankingProps) {
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

    items.forEach((item) => {
      item.percentage =
        totalParticipations > 0
          ? Math.round((item.count / totalParticipations) * 100)
          : 0;
    });

    items.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

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

  return (
    <div className={`space-y-6 ${isTV ? "space-y-8" : ""}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className={`font-bold text-gray-900 ${isTV ? "text-4xl" : "text-2xl sm:text-3xl"}`}>
            Ranking de Participações
          </h2>
          <p className="text-gray-600 text-sm mt-1">Municípios ordenados por número de histórias compartilhadas</p>
        </div>
        <div className="flex gap-3">
          <div className="text-center">
            <p className="text-xs text-gray-600 font-semibold uppercase">Total</p>
            <p className={`font-black ${isTV ? "text-3xl" : "text-2xl"} text-blue-600`}>{total}</p>
          </div>
          <div className="w-px bg-gray-300" />
          <div className="text-center">
            <p className="text-xs text-gray-600 font-semibold uppercase">Ativos</p>
            <p className={`font-black ${isTV ? "text-3xl" : "text-2xl"} text-emerald-600`}>
              {ranking.filter((m) => m.count > 0).length}/13
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={`grid gap-4 ${isTV ? "gap-6" : ""} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`}>
        {ranking.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              onMunicipioSelect(item.name === selectedMunicipio ? null : item.name);
              onCenterMap(item.name);
            }}
            className={`bg-gradient-to-br ${getGradientColor(item.rank)} border-2 rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 ${
              selectedMunicipio === item.name
                ? "ring-2 ring-blue-600 shadow-xl scale-105"
                : ""
            } ${isTV ? "p-8" : ""}`}
          >
            {/* Rank Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${
                item.rank <= 3 ? "bg-white shadow-lg" : "bg-white/80"
              } rounded-full font-black text-lg ${getTextColor(item.rank)}`}>
                {getMedalEmoji(item.rank)}
              </div>
              <div className={`text-right ${isTV ? "text-lg" : ""}`}>
                <p className="text-xs font-bold text-gray-600 uppercase">Posição</p>
                <p className={`font-black ${getTextColor(item.rank)} ${isTV ? "text-2xl" : "text-xl"}`}>
                  #{item.rank}
                </p>
              </div>
            </div>

            {/* Municipality Name */}
            <div className="mb-4">
              <p className={`font-bold text-gray-900 line-clamp-2 ${isTV ? "text-lg" : "text-base"}`}>
                {item.name}
              </p>
            </div>

            {/* Count + Percentage */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/70 rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 uppercase">Participações</p>
                <p className={`font-black text-blue-600 ${isTV ? "text-2xl" : "text-xl"}`}>
                  {item.count}
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 uppercase">%</p>
                <p className={`font-black text-gray-700 ${isTV ? "text-2xl" : "text-xl"}`}>
                  {item.percentage}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            {item.count > 0 && (
              <div className="space-y-2">
                <div className={`w-full bg-white/60 rounded-full overflow-hidden ${isTV ? "h-4" : "h-3"}`}>
                  <div
                    className={`bg-gradient-to-r ${
                      item.rank === 1 ? "from-yellow-400 to-yellow-600" :
                      item.rank === 2 ? "from-gray-400 to-gray-600" :
                      item.rank === 3 ? "from-orange-400 to-orange-600" :
                      item.rank <= 6 ? "from-blue-500 to-blue-700" :
                      "from-indigo-500 to-indigo-700"
                    } rounded-full transition-all duration-500`}
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                      height: isTV ? "16px" : "12px",
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 font-semibold text-center">
                  {((item.count / maxCount) * 100).toFixed(0)}% do máximo
                </p>
              </div>
            )}

            {/* No Data State */}
            {item.count === 0 && (
              <div className="text-center py-3">
                <p className="text-gray-500 text-sm font-semibold italic">Aguardando dados</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 border-2 border-indigo-300 rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs font-bold text-indigo-700 uppercase mb-2">Total Geral</p>
            <p className="text-3xl font-black text-indigo-900">{total}</p>
          </div>
          <div className="text-center border-l border-indigo-300">
            <p className="text-xs font-bold text-indigo-700 uppercase mb-2">Ativos</p>
            <p className="text-3xl font-black text-emerald-600">{ranking.filter((m) => m.count > 0).length}/13</p>
          </div>
          <div className="text-center border-l border-indigo-300">
            <p className="text-xs font-bold text-indigo-700 uppercase mb-2">Máximo</p>
            <p className="text-3xl font-black text-blue-600">{maxCount}</p>
          </div>
          <div className="text-center border-l border-indigo-300">
            <p className="text-xs font-bold text-indigo-700 uppercase mb-2">Média</p>
            <p className="text-3xl font-black text-amber-600">
              {ranking.filter(m => m.count > 0).length > 0
                ? Math.round(total / ranking.filter(m => m.count > 0).length)
                : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500 text-center italic px-4">
        💡 Clique em um card para selecioná-lo e ver detalhes no mapa
      </p>
    </div>
  );
}
