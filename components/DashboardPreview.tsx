"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ExpansionUnified from "./ExpansionUnified";
import DemoBanner from "./DemoBanner";
import NoroestMap from "./NoroestMap";
import MunicipalitiesRanking from "./MunicipalitiesRanking";
import { DEMO_STATS } from "@/lib/demo-data";

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
  const [municipiosCategories, setMunicipiosCategories] = useState<
    Record<string, Record<string, number>>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);
  const [showNewContributionMessage, setShowNewContributionMessage] = useState<{
    municipio: string;
    visible: boolean;
  } | null>(null);
  const [newTerritory, setNewTerritory] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [dataView, setDataView] = useState<"participations" | "needs">("participations");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setRetrying(false);
        // Timeout de 5 segundos para request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("/api/contribuicoes", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Servidor retornou erro");
        const data = await response.json();

        // Se temos dados de contribuições, usar dados por município
        if (data.data) {
          setStats(data.data);

          // Preparar dados por município
          const byMunicipio: Record<string, number> = {};
          const byMunicipioCategories: Record<string, Record<string, number>> = {};

          MUNICIPIOS_NOROESTE.forEach((mun) => {
            byMunicipio[mun] = data.data.byMunicipio?.[mun] || 0;
            // TODO: Extract category data per municipality when available
            byMunicipioCategories[mun] = {};
          });

          setMunicipiosStats(byMunicipio);
          setMunicipiosCategories(byMunicipioCategories);
          setLastUpdate(new Date());
          setError(null);
          setIsDemoMode(false);
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
        setError(`Falha ao conectar com o servidor: ${errorMsg}`);

        // Usar dados de demonstração como contingência
        setStats(DEMO_STATS);
        setIsDemoMode(true);

        // Preparar dados por município
        const byMunicipio: Record<string, number> = {};
        const byMunicipioCategories: Record<string, Record<string, number>> = {};
        const municipiosMap = DEMO_STATS.byMunicipio as Record<string, number>;
        MUNICIPIOS_NOROESTE.forEach((mun) => {
          byMunicipio[mun] = municipiosMap[mun] || 0;
          byMunicipioCategories[mun] = {};
        });
        setMunicipiosStats(byMunicipio);
        setMunicipiosCategories(byMunicipioCategories);
        setLastUpdate(new Date());
      } finally {
        setLoading(false);
        setLoadingTimeout(false);
      }
    };

    // Timeout para mostrar skeleton por no máximo 3 segundos
    const skeletonTimeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 3000);

    fetchStats();
    const interval = setInterval(fetchStats, POLLING_INTERVAL);

    return () => {
      clearTimeout(skeletonTimeout);
      clearInterval(interval);
    };
  }, []);

  // Processar destaque de URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const destaqueParam = params.get("destaque");
      if (destaqueParam) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedMunicipio(destaqueParam);
        setShowNewContributionMessage({
          municipio: destaqueParam,
          visible: true,
        });
        const cleanup = setTimeout(() => {
          setSelectedMunicipio(null);
          setShowNewContributionMessage(null);
        }, 5000);
        return () => clearTimeout(cleanup);
      }
    }
  }, []);

  // Processar novo território de URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const novoTerritorio = params.get("novo-territorio");
      if (novoTerritorio) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNewTerritory(novoTerritorio);
        const cleanup = setTimeout(() => {
          setNewTerritory(null);
        }, 5000);
        return () => clearTimeout(cleanup);
      }
    }
  }, []);

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return "Aguardando primeiro carregamento...";
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) {
      return `Agora mesmo`;
    } else if (diffSeconds < 3600) {
      const minutes = Math.floor(diffSeconds / 60);
      return `${minutes} min atrás`;
    } else {
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const handleRetry = () => {
    setRetrying(true);
    setError(null);
    setLoading(true);
    // Trigger manual fetch
    const fetchStats = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("/api/contribuicoes", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Servidor retornou erro");
        const data = await response.json();

        if (data.data) {
          setStats(data.data);
          const byMunicipio: Record<string, number> = {};
          const byMunicipioCategories: Record<string, Record<string, number>> = {};
          MUNICIPIOS_NOROESTE.forEach((mun) => {
            byMunicipio[mun] = data.data.byMunicipio?.[mun] || 0;
            byMunicipioCategories[mun] = {};
          });
          setMunicipiosStats(byMunicipio);
          setMunicipiosCategories(byMunicipioCategories);
          setLastUpdate(new Date());
          setError(null);
          setIsDemoMode(false);
        }
      } catch (err) {
        console.error("Erro ao tentar novamente:", err);
        setError(
          `Falha ao conectar. Exibindo dados de demonstração. Tentaremos novamente em ${Math.ceil(POLLING_INTERVAL / 1000)}s.`
        );
        setStats(DEMO_STATS);
        setIsDemoMode(true);
        const byMunicipio: Record<string, number> = {};
        const byMunicipioCategories: Record<string, Record<string, number>> = {};
        const municipiosMap = DEMO_STATS.byMunicipio as Record<string, number>;
        MUNICIPIOS_NOROESTE.forEach((mun) => {
          byMunicipio[mun] = municipiosMap[mun] || 0;
          byMunicipioCategories[mun] = {};
        });
        setMunicipiosStats(byMunicipio);
        setMunicipiosCategories(byMunicipioCategories);
        setLastUpdate(new Date());
      } finally {
        setLoading(false);
        setRetrying(false);
      }
    };
    fetchStats();
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
      {/* Demo Mode Banner */}
      {isDemoMode && <DemoBanner />}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className={`font-bold text-gray-900 ${
                    isTV ? "text-6xl" : "text-3xl"
                  }`}>
                    Mapa do Cuidado
                  </h1>
                  <p className={`text-gray-500 font-medium ${isTV ? "text-2xl mt-1" : "text-sm mt-0.5"}`}>
                    Noroeste Fluminense
                  </p>
                </div>
                {/* Status Seal */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                  isDemoMode
                    ? "bg-yellow-50 border-yellow-300"
                    : "bg-green-50 border-green-300"
                } ${isTV ? "px-4 py-2 gap-3" : ""}`}>
                  <span className={`${isDemoMode ? "text-yellow-600" : "text-green-600"} font-semibold ${isTV ? "text-lg" : "text-xs"}`}>
                    {isDemoMode ? "🎬 Demonstração" : "🟢 Dados ao vivo"}
                  </span>
                </div>
              </div>
              {/* Last Update and Back Link */}
              <div className={`flex items-center justify-between text-gray-600 ${isTV ? "text-lg" : "text-xs"}`}>
                <span>
                  {loading && <span className="inline-block animate-pulse">Atualizando...</span>}
                  {!loading && <span>Atualizado: <span className="font-semibold">{formatLastUpdate(lastUpdate)}</span></span>}
                </span>
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-700 font-medium hidden sm:block"
                >
                  ← Voltar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Loading State - Skeleton */}
        {loading && !loadingTimeout && !stats && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-4 border-gray-300 rounded-lg p-8 sm:p-12 animate-pulse">
              <div className="text-center">
                <div className="h-6 bg-gray-300 rounded mb-4 w-48 mx-auto" />
                <div className="h-20 bg-gray-300 rounded w-32 mx-auto" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded mb-2" />
                  <div className="h-8 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className={`bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8 ${
              isTV ? "text-2xl" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div className="flex-1">
                <h3 className="text-red-900 font-bold mb-2">
                  {isDemoMode
                    ? "Modo Demonstração Ativado"
                    : "Erro de Conexão"}
                </h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  disabled={retrying}
                  className="px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 disabled:bg-gray-400 transition"
                >
                  {retrying ? "Tentando novamente..." : "Tentar Novamente"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Timeout - Show demo data with message */}
        {loading && loadingTimeout && !error && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl">⏳</span>
              <div>
                <h3 className="text-yellow-900 font-bold mb-1">
                  Carregamento demorando...
                </h3>
                <p className="text-yellow-700 text-sm">
                  Estamos tentando conectar ao servidor. Exibindo dados em cache
                  enquanto aguardamos a resposta.
                </p>
              </div>
            </div>
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
            {/* Total & Indicators Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Total Contributions - Compact */}
              <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100 border-2 border-indigo-300 rounded-lg p-6 sm:p-8 shadow-sm">
                <div className="text-center">
                  <p className={`font-semibold text-indigo-700 mb-2 tracking-wide uppercase text-xs`}>
                    Total
                  </p>
                  <p className={`font-bold text-indigo-900 ${isTV ? "text-6xl" : "text-5xl"}`}>
                    {stats.total}
                  </p>
                  <p className={`text-indigo-700 font-medium mt-2 text-sm`}>
                    histórias compartilhadas
                  </p>
                </div>
              </div>

              {/* Complementary Indicators - 3 metrics */}
              {stats.total > 0 && (
                <>
                  {/* Municipalities */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 text-center">
                    <p className={`text-blue-600 font-semibold mb-2 text-sm`}>
                      Municípios
                    </p>
                    <p className={`font-bold text-blue-900 mb-1 ${isTV ? "text-4xl" : "text-3xl"}`}>
                      {Object.keys(stats.byMunicipio || {}).filter(m => (stats.byMunicipio || {})[m] > 0).length}/13
                    </p>
                    <p className={`text-blue-700 font-medium text-xs`}>
                      ativos
                    </p>
                  </div>

                  {/* States */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg p-6 text-center">
                    <p className={`text-emerald-600 font-semibold mb-2 text-sm`}>
                      Temas
                    </p>
                    <p className={`font-bold text-emerald-900 mb-1 ${isTV ? "text-4xl" : "text-3xl"}`}>
                      {Object.keys(stats.byCategory || {}).filter(c => (stats.byCategory || {})[c] > 0).length}
                    </p>
                    <p className={`text-emerald-700 font-medium text-xs`}>
                      identificados
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Map Section with Data View Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={`font-bold text-gray-900 ${isTV ? "text-5xl" : "text-2xl"}`}>
                  Mapa Geográfico
                </h2>
                {/* Data View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDataView("participations")}
                    className={`px-4 py-2 rounded font-medium text-sm transition ${
                      dataView === "participations"
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Participações
                  </button>
                  <button
                    onClick={() => setDataView("needs")}
                    className={`px-4 py-2 rounded font-medium text-sm transition ${
                      dataView === "needs"
                        ? "bg-amber-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Necessidades
                  </button>
                </div>
              </div>

              {/* Map - Large and Primary */}
              <div className={`${isTV ? "h-[600px]" : "h-[500px]"} rounded-lg overflow-hidden border-2 border-gray-200 shadow-md`}>
                <NoroestMap
                  municipiosStats={municipiosStats}
                  municipiosCategories={municipiosCategories}
                  selectedMunicipio={selectedMunicipio}
                  onMunicipioSelect={setSelectedMunicipio}
                  dataView={dataView}
                  height="h-full"
                />
              </div>
            </div>

            {/* Municípios Ranking - Interactive */}
            <div>
              <h2 className={`font-bold text-gray-900 mb-6 ${isTV ? "text-4xl" : "text-xl"}`}>
                Ranking de Participações
              </h2>
              <MunicipalitiesRanking
                municipiosStats={municipiosStats}
                selectedMunicipio={selectedMunicipio}
                onMunicipioSelect={setSelectedMunicipio}
                onCenterMap={(municipio) => {
                  setSelectedMunicipio(municipio);
                  // Map will receive this through the onMunicipioSelect callback
                }}
                isTV={isTV}
              />
            </div>

            {/* Insights - Shared Experiences */}
            {stats.byCategory && Object.keys(stats.byCategory).length > 0 && (
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <h2 className={`font-bold text-gray-900 ${isTV ? "text-4xl" : "text-2xl"}`}>
                    Temas e Necessidades Identificadas
                  </h2>
                  <p className={`text-gray-700 leading-relaxed font-medium ${isTV ? "text-xl" : "text-base"}`}>
                    As experiências compartilhadas revelam as necessidades mais frequentemente mencionadas pelos participantes:
                  </p>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {Object.entries(stats.byCategory)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count]) => {
                      const percentage =
                        stats.total > 0
                          ? Math.round((count / stats.total) * 100)
                          : 0;
                      return (
                        <div key={category} className="space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <p className={`font-semibold text-gray-900 flex-1 ${isTV ? "text-xl" : "text-sm"}`}>
                              {category}
                            </p>
                            <div className="flex items-center gap-3 whitespace-nowrap">
                              <p className={`font-bold text-blue-600 ${isTV ? "text-2xl" : "text-base"}`}>
                                {count}
                              </p>
                              <p className={`font-semibold text-gray-600 min-w-12 text-right ${isTV ? "text-lg" : "text-sm"}`}>
                                {percentage}%
                              </p>
                            </div>
                          </div>
                          <div className={`w-full bg-gray-200 rounded-full ${isTV ? "h-4" : "h-2.5"}`}>
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                height: isTV ? "16px" : "10px",
                              }}
                            />
                          </div>
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

            {/* Expansion Unified Section */}
            <ExpansionUnified isTV={isTV} newTerritory={newTerritory} />

            {/* Methodological Note - Less Visual Weight */}
            <div className={`bg-gray-50 border border-gray-300 rounded-lg p-4 sm:p-6 ${isTV ? "p-8" : ""}`}>
              <p className={`text-gray-700 leading-relaxed text-sm flex gap-2 items-start`}>
                <span className="flex-shrink-0 mt-0.5">ℹ️</span>
                <span>Os dados representam contribuições voluntárias da experiência. Não constituem diagnóstico oficial nem pesquisa estatisticamente representativa.</span>
              </p>
            </div>
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
      <footer className={`bg-gradient-to-r from-gray-50 to-indigo-50 border-t-2 border-gray-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center ${isTV ? "py-12" : ""}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className={`font-semibold text-indigo-700 ${isTV ? "text-2xl" : "text-sm"}`}>
            SyVtek Care
          </span>
          <span className="text-gray-300">•</span>
          <span className={`text-gray-600 font-medium ${isTV ? "text-xl" : "text-xs"}`}>
            Merco Noroeste 2026
          </span>
        </div>
        <p className={`text-gray-600 ${isTV ? "text-lg" : "text-xs"}`}>
          Dados agregados e anônimos. Nenhuma informação pessoal é armazenada ou exibida.
        </p>
      </footer>
    </div>
  );
}
