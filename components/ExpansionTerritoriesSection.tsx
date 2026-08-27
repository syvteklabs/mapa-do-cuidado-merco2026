"use client";

import { useExpansionStats } from "@/lib/hooks/useExpansionStats";

interface ExpansionTerritorieSectionProps {
  isTV?: boolean;
  newTerritory?: string | null;
}

export default function ExpansionTerritoriesSection({
  isTV,
  newTerritory,
}: ExpansionTerritorieSectionProps) {
  const { stats, loading } = useExpansionStats();

  if (loading) {
    return null;
  }

  if (!stats || stats.total === 0) {
    return (
      <div className={`bg-purple-50 border-2 border-purple-300 rounded-lg p-6 sm:p-8 ${isTV ? "p-12" : ""}`}>
        <h2 className={`font-bold text-gray-900 mb-3 ${isTV ? "text-3xl" : "text-lg"}`}>
          Territórios que querem entrar no mapa
        </h2>
        <p className={`text-gray-600 ${isTV ? "text-2xl" : "text-sm"}`}>
          Novos territórios poderão manifestar interesse durante esta experiência.
        </p>
      </div>
    );
  }

  const getHeadlineText = () => {
    if (stats.uniqueCities === 1) {
      return "Um novo território já manifestou interesse em receber o Mapa do Cuidado.";
    }
    return `${stats.uniqueCities} territórios já manifestaram interesse em participar dos próximos ciclos.`;
  };

  return (
    <div className={`bg-purple-50 border-2 border-purple-300 rounded-lg p-6 sm:p-8 space-y-6 ${isTV ? "p-12" : ""}`}>
      {/* Header */}
      <div>
        <h2 className={`font-bold text-gray-900 mb-3 ${isTV ? "text-3xl" : "text-lg"}`}>
          Territórios que querem entrar no mapa
        </h2>
        <p className={`text-gray-600 mb-4 ${isTV ? "text-2xl" : "text-sm"}`}>
          O Mapa do Cuidado começa no Noroeste Fluminense, mas outros territórios
          já estão manifestando interesse em participar dos próximos ciclos.
        </p>
      </div>

      {/* New Territory Notification */}
      {newTerritory && (
        <div className={`bg-green-100 border-2 border-green-400 rounded-lg p-4 animate-pulse ${isTV ? "p-6" : ""}`}>
          <p className={`text-green-800 font-semibold ${isTV ? "text-xl" : "text-sm"}`}>
            ✓ O Mapa do Cuidado acaba de receber um pedido de expansão para <span className="font-bold">{newTerritory}</span>.
          </p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Total Interests */}
        <div className="bg-white border-2 border-purple-300 rounded-lg p-4 sm:p-6 text-center">
          <p className={`text-purple-600 font-semibold ${isTV ? "text-xl mb-2" : "text-xs mb-1"}`}>
            Interesses
          </p>
          <p className={`font-bold text-purple-900 ${isTV ? "text-5xl" : "text-3xl"}`}>
            {stats.total}
          </p>
        </div>

        {/* Unique Cities */}
        <div className="bg-white border-2 border-purple-300 rounded-lg p-4 sm:p-6 text-center">
          <p className={`text-purple-600 font-semibold ${isTV ? "text-xl mb-2" : "text-xs mb-1"}`}>
            Territórios
          </p>
          <p className={`font-bold text-purple-900 ${isTV ? "text-5xl" : "text-3xl"}`}>
            {stats.uniqueCities}
          </p>
        </div>
      </div>

      {/* Headline */}
      <p className={`text-gray-700 font-semibold ${isTV ? "text-2xl" : "text-sm"}`}>
        {getHeadlineText()}
      </p>

      {/* Top Cities Ranking */}
      {stats.byCity.length > 0 && (
        <div>
          <h3 className={`font-bold text-gray-900 mb-4 ${isTV ? "text-2xl" : "text-base"}`}>
            Territórios com mais interesse
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {stats.byCity.slice(0, 5).map((city) => (
              <div key={city.city} className="space-y-2">
                <div className={`flex items-center gap-3 ${isTV ? "gap-4" : ""}`}>
                  <p className={`font-semibold text-gray-900 flex-1 ${isTV ? "text-xl" : "text-sm"}`}>
                    {city.city}
                  </p>
                  <p className={`font-bold text-purple-600 ${isTV ? "text-2xl" : "text-lg"}`}>
                    {city.count} {city.count === 1 ? "interesse" : "interesses"}
                  </p>
                </div>
                <div className={`w-full bg-gray-300 rounded-full ${isTV ? "h-6" : "h-2"}`}>
                  <div
                    className="bg-purple-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(city.count / stats.byCity[0].count) * 100}%`,
                      height: isTV ? "24px" : "8px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white border border-purple-200 rounded-lg p-4 text-center">
        <p className={`text-gray-600 ${isTV ? "text-lg" : "text-xs"}`}>
          Manifestações de interesse para participação em próximos ciclos
        </p>
      </div>
    </div>
  );
}
