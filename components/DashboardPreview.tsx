"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ExpansionUnified from "./ExpansionUnified";
import DemoBanner from "./DemoBanner";
import TerritorialMap from "./TerritorialMap";
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
        if (data.success && data.data) {
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
          setIsDemoMode(data.isDemoMode || false);
        } else {
          throw new Error("Dados inválidos recebidos da API");
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

        if (data.success && data.data) {
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
          setIsDemoMode(data.isDemoMode || false);
        } else {
          throw new Error("Dados inválidos recebidos da API");
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
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        {/* Loading State - Skeleton */}
        {loading && !loadingTimeout && !stats && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-100 to-blue-100 border-4 border-indigo-300 rounded-xl p-8 sm:p-12 animate-pulse shadow-lg">
              <div className="text-center">
                <div className="h-6 bg-indigo-300 rounded-lg mb-4 w-48 mx-auto" />
                <div className="h-20 bg-indigo-300 rounded-lg w-32 mx-auto" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-xl p-6 animate-pulse shadow-md">
                  <div className="h-4 bg-gray-300 rounded-lg mb-2" />
                  <div className="h-8 bg-gray-300 rounded-lg" />
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
          <div className="space-y-8 sm:space-y-12 lg:space-y-14">
            {/* SECTION 1: Map + Quick Stats Grid */}
            <div className="space-y-6">
              {/* Title + Toggle - Full Width */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className={`font-bold text-gray-900 ${isTV ? "text-5xl" : "text-3xl sm:text-4xl"}`}>
                    Mapa Geográfico
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">Visualize a distribuição de participações no Noroeste Fluminense</p>
                </div>
                {/* Data View Toggle */}
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-1.5 sm:p-2 shadow-sm border border-gray-200">
                  <button
                    onClick={() => setDataView("participations")}
                    className={`px-4 sm:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      dataView === "participations"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    📊 Participações
                  </button>
                  <button
                    onClick={() => setDataView("needs")}
                    className={`px-4 sm:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      dataView === "needs"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🎯 Necessidades
                  </button>
                </div>
              </div>

              {/* Main Grid: Large Map + Side Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Map - Large (3/4 on desktop) */}
                <div className="lg:col-span-3 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300" style={{
                  height: isTV ? '700px' : 'clamp(400px, 70vh, 600px)',
                  minHeight: '400px'
                }}>
                  <TerritorialMap
                    municipiosStats={municipiosStats}
                    municipiosCategories={municipiosCategories}
                    selectedMunicipio={selectedMunicipio}
                    onMunicipioSelect={setSelectedMunicipio}
                    dataView={dataView}
                  />
                </div>

                {/* Right Stats Panel (1/4 on desktop) */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Total - Large Card */}
                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-center space-y-2">
                      <p className="font-bold text-blue-600 uppercase text-xs tracking-wider">
                        Total
                      </p>
                      <p className={`font-black text-blue-900 ${isTV ? "text-5xl" : "text-4xl sm:text-5xl"}`}>
                        {stats.total}
                      </p>
                      <p className="text-blue-700 font-semibold text-sm">
                        participações
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats - 2 cards stacked */}
                  {stats.total > 0 && (
                    <>
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-400 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                        <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">Municípios</p>
                        <p className="font-black text-emerald-900 text-3xl mb-1">
                          {Object.keys(stats.byMunicipio || {}).filter(m => (stats.byMunicipio || {})[m] > 0).length}
                          <span className="text-xs text-emerald-700 font-semibold">/13</span>
                        </p>
                        <p className="text-emerald-700 font-semibold text-xs">ativos</p>
                      </div>

                      <div className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-400 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                        <p className="text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">Temas</p>
                        <p className="font-black text-rose-900 text-3xl">
                          {Object.keys(stats.byCategory || {}).filter(c => (stats.byCategory || {})[c] > 0).length}
                        </p>
                        <p className="text-rose-700 font-semibold text-xs">identificados</p>
                      </div>

                      {/* Scope Info */}
                      {stats.byState && stats.byState.RJ !== stats.total && (
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-2xl p-4 shadow-md">
                          <div className="flex gap-2 text-xs">
                            <span className="flex-shrink-0 text-xl">📍</span>
                            <div>
                              <p className="font-bold text-amber-900 mb-1 text-xs">Noroeste RJ</p>
                              <p className="text-amber-800 font-semibold">
                                <strong>{stats.byState.RJ}</strong> de <strong>{stats.total}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Selected Municipality Info */}
                  {selectedMunicipio && (
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-400 rounded-2xl p-4 shadow-lg animate-pulse">
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 text-2xl">📍</span>
                        <div className="text-sm flex-1">
                          <p className="font-bold text-cyan-900 mb-2 text-base">{selectedMunicipio}</p>
                          <p className="text-cyan-800 font-semibold text-sm mb-3">
                            {municipiosStats[selectedMunicipio] || 0} participações
                          </p>
                          <button
                            onClick={() => setSelectedMunicipio(null)}
                            className="w-full text-xs font-bold text-cyan-700 bg-cyan-200 hover:bg-cyan-300 py-2 px-3 rounded-lg transition-colors"
                          >
                            Limpar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Municípios Ranking - Full Width Below */}
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
                }}
                isTV={isTV}
              />
            </div>

            {/* Insights - Shared Experiences */}
            {stats.byCategory && Object.keys(stats.byCategory).length > 0 && (
              <div className="space-y-8 sm:space-y-10 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 border-2 border-indigo-300 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-lg">
                <div className="space-y-3">
                  <h2 className={`font-bold text-gray-900 ${isTV ? "text-5xl" : "text-3xl sm:text-4xl"}`}>
                    🎯 Temas e Necessidades
                  </h2>
                  <p className={`text-gray-700 leading-relaxed font-semibold max-w-3xl ${isTV ? "text-xl" : "text-base"}`}>
                    Os participantes compartilharam experiências que revelam as principais necessidades do território:
                  </p>
                </div>

                <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
                  {Object.entries(stats.byCategory)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count], index) => {
                      const percentage =
                        stats.total > 0
                          ? Math.round((count / stats.total) * 100)
                          : 0;

                      const colors = [
                        "from-blue-100 to-blue-50 border-blue-400",
                        "from-emerald-100 to-emerald-50 border-emerald-400",
                        "from-rose-100 to-rose-50 border-rose-400",
                        "from-amber-100 to-amber-50 border-amber-400",
                        "from-violet-100 to-violet-50 border-violet-400",
                      ];

                      const bgColor = colors[index % colors.length];

                      return (
                        <div key={category} className={`bg-gradient-to-br ${bgColor} border-2 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300`}>
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <p className={`font-bold text-gray-900 flex-1 leading-tight ${isTV ? "text-lg" : "text-sm sm:text-base"}`}>
                                {category}
                              </p>
                              <div className="flex items-center gap-2 whitespace-nowrap">
                                <p className={`font-black text-blue-600 ${isTV ? "text-2xl" : "text-lg"}`}>
                                  {count}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className={`w-full bg-white/60 rounded-full overflow-hidden ${isTV ? "h-5" : "h-3"}`}>
                                <div
                                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full transition-all duration-700 ease-out"
                                  style={{
                                    width: `${percentage}%`,
                                    height: isTV ? "20px" : "12px",
                                  }}
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600 font-semibold">Frequência</span>
                                <span className={`font-bold text-gray-700 ${isTV ? "text-lg" : "text-sm"}`}>
                                  {percentage}% das participações
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Insight Summary */}
                <div className="bg-white/80 border border-indigo-200 rounded-2xl p-6 text-center">
                  <p className={`text-indigo-900 font-semibold ${isTV ? "text-xl" : "text-base"}`}>
                    💡 <strong>{Object.keys(stats.byCategory).length}</strong> temas identificados a partir de <strong>{stats.total}</strong> histórias compartilhadas
                  </p>
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

            {/* Methodological Note */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-300 rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">📋</span>
                <div>
                  <p className="font-bold text-gray-900 mb-2 text-base">Nota Metodológica</p>
                  <p className="text-gray-700 leading-relaxed text-sm font-medium">
                    Os dados apresentados representam contribuições <strong>voluntárias e anônimas</strong> sobre experiências no cuidado.
                    Não constituem diagnóstico oficial, pesquisa estatisticamente representativa, nem substituem processos formais de avaliação de políticas de saúde.
                  </p>
                </div>
              </div>
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
