"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ExpansionInterest from "./ExpansionInterest";

interface DashboardStats {
  total: number;
  byState: Record<string, number>;
  byMunicipio: Record<string, number>;
  byCategory: Record<string, number>;
}

const MUNICIPIOS_NOROESTE = [
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

const POLLING_INTERVAL = 30000; // 30 segundos

export default function DashboardPreview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [municipiosStats, setMunicipiosStats] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);
  const [showNewContributionMessage, setShowNewContributionMessage] = useState<{
    municipio: string;
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contribuicoes");
        if (!response.ok) throw new Error("Falha ao carregar dados");
        const data = await response.json();

        // Se temos dados de contribuições, usar dados por município
        if (data.data) {
          setStats(data.data);

          // Preparar dados por município (inicializar com 0 e depois preencher com dados reais)
          const byMunicipio: Record<string, number> = {};
          MUNICIPIOS_NOROESTE.forEach((mun) => {
            byMunicipio[mun] = data.data.byMunicipio?.[mun] || 0;
          });
          setMunicipiosStats(byMunicipio);

          setLastUpdate(new Date());
        }

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar dados"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Processar destaque de URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const destaqueParam = params.get("destaque");
      if (destaqueParam) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHighlightedCity(destaqueParam);
        setShowNewContributionMessage({
          municipio: destaqueParam,
          visible: true,
        });
        const cleanup = setTimeout(() => {
          setHighlightedCity(null);
          setShowNewContributionMessage(null);
        }, 5000);
        return () => clearTimeout(cleanup);
      }
    }
  }, []);

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return "Nunca";
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Para TV, usar tamanhos maiores
  const isTV = typeof window !== "undefined" && window.innerWidth > 1920;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>{`
        @keyframes pulse-highlight {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        }
        .pulse-highlight {
          animation: pulse-highlight 2s infinite;
        }
      `}</style>
      {/* Header */}
      <header className="bg-white border-b-4 border-blue-600 shadow-lg">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`font-bold text-gray-900 ${
                isTV ? "text-7xl" : "text-4xl"
              }`}>
                Mapa do Cuidado
              </h1>
              <p className={`text-gray-600 ${isTV ? "text-3xl mt-2" : "text-lg mt-1"}`}>
                Noroeste Fluminense - Merco 2026
              </p>
            </div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 text-sm sm:text-base hidden sm:block font-semibold"
            >
              ← Voltar
            </Link>
          </div>

          {/* Last Update */}
          <div className={`text-gray-600 ${isTV ? "text-2xl" : "text-sm"}`}>
            Última atualização: <span className="font-semibold">{formatLastUpdate(lastUpdate)}</span>
            {loading && <span className="ml-2 inline-block animate-pulse">Atualizando...</span>}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error && (
          <div className={`bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8 ${isTV ? "text-2xl" : ""}`}>
            <p className="text-red-700">Erro ao carregar dados: {error}</p>
          </div>
        )}

        {showNewContributionMessage?.visible && (
          <div className={`bg-green-50 border-4 border-green-500 rounded-lg p-8 mb-8 animate-pulse ${isTV ? "p-12 text-3xl" : ""}`}>
            <p className={`text-green-700 font-bold text-center ${isTV ? "text-4xl" : "text-lg"}`}>
              ✓ Uma nova experiência foi compartilhada em <span className="text-green-900">{showNewContributionMessage.municipio}</span>
            </p>
          </div>
        )}

        {stats && (
          <div className="space-y-8 sm:space-y-12">
            {/* Total Contributions */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-600 rounded-lg p-8 sm:p-12">
              <div className="text-center">
                <p className={`font-bold text-blue-700 mb-3 ${isTV ? "text-4xl" : "text-sm"}`}>
                  PARTICIPAÇÕES REGISTRADAS
                </p>
                <p className={`font-bold text-blue-900 ${isTV ? "text-9xl" : "text-5xl"}`}>
                  {stats.total}
                </p>
                <p className={`text-blue-700 mt-3 ${isTV ? "text-3xl" : "text-sm"}`}>
                  histórias de cuidado compartilhadas
                </p>
              </div>
            </div>

            {/* Dynamic Indicators */}
            {stats.total > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Total Participations */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center">
                  <p className={`text-blue-600 font-semibold ${isTV ? "text-xl mb-2" : "text-xs mb-1"}`}>
                    Participações
                  </p>
                  <p className={`font-bold text-blue-900 ${isTV ? "text-5xl" : "text-3xl"}`}>
                    {stats.total}
                  </p>
                </div>

                {/* Municipalities Represented */}
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
                  <p className={`text-green-600 font-semibold ${isTV ? "text-xl mb-2" : "text-xs mb-1"}`}>
                    Municípios
                  </p>
                  <p className={`font-bold text-green-900 ${isTV ? "text-5xl" : "text-3xl"}`}>
                    {Object.keys(stats.byMunicipio || {}).length}
                  </p>
                </div>

                {/* Top Municipality */}
                {stats.byMunicipio && Object.keys(stats.byMunicipio).length > 0 && (
                  <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6 text-center col-span-2 sm:col-span-1">
                    <p className={`text-purple-600 font-semibold ${isTV ? "text-xl mb-2" : "text-xs mb-1"}`}>
                      Mais Ativo
                    </p>
                    <p className={`font-bold text-purple-900 line-clamp-2 ${isTV ? "text-2xl mb-1" : "text-sm mb-1"}`}>
                      {Object.entries(stats.byMunicipio).reduce((a, b) => b[1] > a[1] ? b : a)[0]}
                    </p>
                    <p className={`text-purple-600 font-semibold ${isTV ? "text-2xl" : "text-lg"}`}>
                      {Object.entries(stats.byMunicipio).reduce((a, b) => b[1] > a[1] ? b : a)[1]}
                    </p>
                  </div>
                )}

                {/* Predominant Category */}
                {stats.byCategory && Object.keys(stats.byCategory).length > 0 && (
                  <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 text-center col-span-2 sm:col-span-1">
                    <p className={`text-orange-600 font-semibold ${isTV ? "text-xl mb-2" : "text-xs mb-1"}`}>
                      Necessidade Percebida
                    </p>
                    <p className={`font-bold text-orange-900 line-clamp-2 ${isTV ? "text-xl" : "text-xs"}`}>
                      {(() => {
                        const entries = Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]);
                        if (entries.length === 0) return "—";
                        const maxCount = entries[0][1];
                        const tied = entries.filter(e => e[1] === maxCount);
                        return tied.length > 1
                          ? "Percepções variadas"
                          : entries[0][0].replace(/-/g, " ");
                      })()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Municípios Grid */}
            <div>
              <h2 className={`font-bold text-gray-900 mb-6 ${isTV ? "text-5xl" : "text-2xl"}`}>
                Municípios do Noroeste Fluminense
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {MUNICIPIOS_NOROESTE.map((municipio) => (
                  <div
                    key={municipio}
                    className={`bg-white border-2 rounded-lg p-4 sm:p-6 text-center transition-all duration-300 ${
                      highlightedCity === municipio
                        ? "pulse-highlight border-blue-600 bg-blue-50"
                        : "border-gray-400"
                    } ${isTV ? "p-8" : ""}`}
                  >
                    <p className={`text-gray-900 font-semibold line-clamp-3 ${isTV ? "text-2xl mb-3" : "text-sm mb-2"}`}>
                      {municipio}
                    </p>
                    <p className={`${highlightedCity === municipio ? "text-blue-600 font-bold" : "text-gray-600"} ${isTV ? "text-3xl" : "text-xl"}`}>
                      {municipiosStats[municipio] || 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribuição de Categorias */}
            {stats.byCategory && Object.keys(stats.byCategory).length > 0 && (
              <div>
                <h2 className={`font-bold text-gray-900 mb-6 ${isTV ? "text-5xl" : "text-2xl"}`}>
                  Experiências Compartilhadas
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {Object.entries(stats.byCategory)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count]) => {
                      const percentage =
                        stats.total > 0
                          ? Math.round((count / stats.total) * 100)
                          : 0;
                      return (
                        <div key={category} className="space-y-2">
                          <div className={`flex items-baseline gap-3 ${isTV ? "gap-4" : ""}`}>
                            <p className={`font-semibold text-gray-900 flex-1 line-clamp-2 ${isTV ? "text-2xl" : "text-sm"}`}>
                              {category}
                            </p>
                            <p className={`font-bold text-blue-600 whitespace-nowrap ${isTV ? "text-4xl" : "text-lg"}`}>
                              {count}
                            </p>
                          </div>
                          <div className={`w-full bg-gray-300 rounded-full ${isTV ? "h-6" : "h-2"}`}>
                            <div
                              className="bg-blue-600 rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                height: isTV ? "24px" : "8px",
                              }}
                            />
                          </div>
                          <p className={`text-right font-semibold text-gray-700 ${isTV ? "text-2xl" : "text-xs"}`}>
                            {percentage}%
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {stats.total === 0 && (
              <div className={`bg-gray-50 border-2 border-gray-300 rounded-lg p-8 sm:p-12 text-center ${isTV ? "p-16" : ""}`}>
                <p className={`text-gray-600 mb-6 ${isTV ? "text-3xl" : "text-base"}`}>
                  Nenhuma participação registrada ainda.
                </p>
                <p className={`text-gray-500 ${isTV ? "text-2xl" : "text-sm"}`}>
                  Convide as pessoas a compartilharem suas experiências!
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className={`bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 sm:p-8 ${isTV ? "p-12 text-2xl" : ""}`}>
              <p className={`text-yellow-900 leading-relaxed font-semibold ${isTV ? "text-xl" : "text-sm"}`}>
                ⚠️ Os dados representam as contribuições voluntárias recebidas durante a experiência. Não constituem diagnóstico oficial nem pesquisa estatisticamente representativa da população.
              </p>
            </div>

            {/* Expansion Interest Section */}
            <ExpansionInterest />
          </div>
        )}

        {loading && !stats && (
          <div className={`flex flex-col items-center justify-center py-16 ${isTV ? "py-32" : ""}`}>
            <div className={`border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin ${isTV ? "w-24 h-24" : "w-12 h-12"}`} />
            <p className={`text-gray-600 text-center mt-6 ${isTV ? "text-3xl" : "text-base"}`}>
              Carregando dados...
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`bg-gray-50 border-t-2 border-gray-300 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center ${isTV ? "py-12" : ""}`}>
        <p className={`text-gray-600 ${isTV ? "text-2xl mb-3" : "text-xs mb-1"}`}>
          Dados agregados e anônimos. Nenhuma informação pessoal é armazenada ou exibida.
        </p>
        <p className={`text-gray-500 ${isTV ? "text-xl" : "text-xs"}`}>
          Uma experiência da SyVtek Care para a Merco Noroeste 2026
        </p>
      </footer>
    </div>
  );
}
