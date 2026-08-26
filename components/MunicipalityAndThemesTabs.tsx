"use client";

import { useState, useMemo } from "react";

interface MunicipalityAndThemesTabsProps {
  municipiosStats: Record<string, number>;
  municipiosCategories?: Record<string, Record<string, number>>;
}

export default function MunicipalityAndThemesTabs({
  municipiosStats,
  municipiosCategories = {},
}: MunicipalityAndThemesTabsProps) {
  const [activeTab, setActiveTab] = useState<"municipalities" | "themes">("municipalities");

  const MUNICIPALITIES = [
    "Aperibé",
    "Bom Jesus do Itabapoana",
    "Cambuci",
    "Italva",
    "Itaocara",
    "Itaperuna",
    "Laje do Muriaé",
    "Miracema",
    "Natividade",
    "Porciúncula",
    "Santo Antônio de Pádua",
    "São José de Ubá",
    "Varre-Sai",
  ];

  const municipalitiesData = useMemo(() => {
    const dataList = MUNICIPALITIES.map((name) => ({
      name,
      count: municipiosStats[name] || 0,
    }));

    const totalParticipations = dataList.reduce((sum, m) => sum + m.count, 0);

    return dataList
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
      })
      .map((municipality, index) => ({
        ...municipality,
        position: index + 1,
        percentage: totalParticipations > 0 ? (municipality.count / totalParticipations) * 100 : 0,
        hasData: municipality.count > 0,
      }));
  }, [municipiosStats]);

  const themesData = useMemo(() => {
    const themeMap: Record<string, number> = {};

    Object.values(municipiosCategories).forEach((categories) => {
      Object.entries(categories).forEach(([theme, count]) => {
        themeMap[theme] = (themeMap[theme] || 0) + count;
      });
    });

    const totalMentions = Object.values(themeMap).reduce((sum, count) => sum + count, 0);

    return Object.entries(themeMap)
      .map(([theme, count]) => ({
        theme,
        count,
        percentage: totalMentions > 0 ? (count / totalMentions) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [municipiosCategories]);

  const totalParticipations = municipalitiesData.reduce((sum, m) => sum + m.count, 0);
  const municipalitiesWithData = municipalitiesData.filter((m) => m.hasData).length;

  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 flex">
        <button
          onClick={() => setActiveTab("municipalities")}
          className={`flex-1 px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
            activeTab === "municipalities"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Participação por município
        </button>
        <button
          onClick={() => setActiveTab("themes")}
          className={`flex-1 px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
            activeTab === "themes"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Temas percebidos
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {/* Municipalities Tab */}
        {activeTab === "municipalities" && (
          <div className="space-y-4">
            {/* Header Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                <p className="text-xs text-blue-600 font-semibold uppercase">Total</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-900 mt-1">
                  {totalParticipations}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                <p className="text-xs text-green-600 font-semibold uppercase">Com dados</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-900 mt-1">
                  {municipalitiesWithData}
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 sm:p-4 border border-amber-200">
                <p className="text-xs text-amber-600 font-semibold uppercase">Média</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-900 mt-1">
                  {municipalitiesWithData > 0
                    ? Math.round(totalParticipations / municipalitiesWithData)
                    : 0}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                      Pos.
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                      Município
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-700 text-xs sm:text-sm">
                      Participações
                    </th>
                    <th className="px-3 sm:px-4 py-3 text-right font-semibold text-gray-700 text-xs sm:text-sm">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {municipalitiesData.map((municipality, index) => (
                    <tr
                      key={municipality.name}
                      className={`border-b border-gray-200 transition-colors ${
                        municipality.hasData
                          ? "hover:bg-blue-50"
                          : "bg-gray-50 opacity-75"
                      }`}
                    >
                      <td className="px-3 sm:px-4 py-3 font-semibold text-gray-900">
                        {municipality.position}
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {municipality.name}
                          </span>
                          {!municipality.hasData && (
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                              sem dados
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-right font-medium text-gray-900">
                        {municipality.count}
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-right">
                        <span className="font-semibold text-blue-600">
                          {municipality.percentage.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Notes */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-1">
              <p>
                <span className="font-semibold">Base:</span> Total de {totalParticipations}{" "}
                participação(ões) coletadas
              </p>
              <p>
                Os percentuais indicam a participação relativa de cada município dentro do total
                territorial.
              </p>
            </div>
          </div>
        )}

        {/* Themes Tab */}
        {activeTab === "themes" && (
          <div className="space-y-4">
            {themesData.length > 0 ? (
              <>
                {/* Header Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div className="bg-amber-50 rounded-lg p-3 sm:p-4 border border-amber-200">
                    <p className="text-xs text-amber-600 font-semibold uppercase">Total temas</p>
                    <p className="text-2xl sm:text-3xl font-bold text-amber-900 mt-1">
                      {themesData.length}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                    <p className="text-xs text-purple-600 font-semibold uppercase">Menções</p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-900 mt-1">
                      {themesData.reduce((sum, t) => sum + t.count, 0)}
                    </p>
                  </div>
                </div>

                {/* Themes List */}
                <div className="space-y-4">
                  {themesData.map((theme, index) => {
                    const maxCount = Math.max(...themesData.map((t) => t.count), 1);
                    return (
                      <div
                        key={theme.theme}
                        className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-base">
                              {index + 1}. {theme.theme}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {theme.count} menção{theme.count !== 1 ? "ões" : ""}
                            </p>
                          </div>
                          <div className="text-right ml-4 flex-shrink-0">
                            <span className="text-lg font-bold text-purple-600">
                              {theme.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {/* Visual Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 transition-all duration-300"
                            style={{
                              width: `${(theme.count / maxCount) * 100}%`,
                            }}
                          />
                        </div>

                        {/* Explanation */}
                        <p className="text-xs text-gray-600 mt-2">
                          Representa {theme.percentage.toFixed(1)}% do total de menções temáticas.
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Notes */}
                <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Base:</span> Total de{" "}
                    {themesData.reduce((sum, t) => sum + t.count, 0)} menção(ões) temáticas
                  </p>
                  <p>
                    Uma mesma participação pode mencionar múltiplos temas. Os percentuais indicam a
                    distribuição dentro do total de menções.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Nenhum tema foi identificado ainda.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
