"use client";

import { useMovementStats } from "@/lib/hooks/useMovementStats";

export default function ProofOfMovement() {
  const { stats, loading, error } = useMovementStats();

  // Skeleton loader
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6 sm:p-8">
        <div className="space-y-6">
          {/* Headline skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-emerald-200 rounded-lg w-48 animate-pulse"></div>
            <div className="h-4 bg-emerald-100 rounded-lg w-64 animate-pulse"></div>
          </div>

          {/* Stats grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border-2 border-emerald-200 rounded-lg p-4 space-y-3">
                <div className="h-4 bg-emerald-100 rounded-lg w-20 animate-pulse"></div>
                <div className="h-8 bg-emerald-200 rounded-lg w-16 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Insight skeleton */}
          <div className="bg-white border-2 border-emerald-200 rounded-lg p-4">
            <div className="h-4 bg-emerald-100 rounded-lg w-full animate-pulse mb-2"></div>
            <div className="h-4 bg-emerald-100 rounded-lg w-5/6 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !stats) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-red-800 mb-2">
            ⚠️ Dados indisponíveis
          </p>
          <p className="text-xs text-red-700">
            {error || "Não foi possível carregar os dados de movimento. Tente novamente mais tarde."}
          </p>
        </div>
      </div>
    );
  }

  // Calculate insights
  const municipiosParticipantes = Object.keys(stats.byMunicipio).length;
  const categoriasAbordadas = Object.keys(stats.byCategory).length;

  // Generate insight message
  const getInsight = () => {
    if (stats.total === 0) {
      return "Seja o primeiro a contribuir e ajude a mapear os caminhos do cuidado na sua região.";
    }

    if (stats.total < 10) {
      return `${stats.total} ${stats.total === 1 ? "pessoa começou" : "pessoas começaram"} a compartilhar experiências de cuidado. Mais contribuições ajudam a construir um mapa mais completo.`;
    }

    if (stats.total < 50) {
      return `Com ${stats.total} contribuições de ${municipiosParticipantes} ${municipiosParticipantes === 1 ? "município" : "municípios"}, já é possível ver padrões emergindo nos caminhos do cuidado.`;
    }

    if (stats.total < 100) {
      return `${stats.total} participações mostram que cuidado é assunto prioritário em ${municipiosParticipantes} ${municipiosParticipantes === 1 ? "município" : "municípios"} do Noroeste.`;
    }

    return `${stats.total} pessoas já compartilharam suas experiências de cuidado, revelando necessidades em ${categoriasAbordadas} áreas diferentes e impactando ${municipiosParticipantes} ${municipiosParticipantes === 1 ? "município" : "municípios"}.`;
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            O mapa está acontecendo agora
          </h2>
        </div>
        <p className="text-sm text-gray-700">
          Acompanhe as experiências compartilhadas durante a Merco Noroeste 2026
        </p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Total contributions */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Participações
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {stats.total}
          </p>
          <p className="text-xs text-emerald-600 mt-1">experiências compartilhadas</p>
        </div>

        {/* Participating municipalities */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Municípios
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {municipiosParticipantes}
          </p>
          <p className="text-xs text-emerald-600 mt-1">com participações registradas</p>
        </div>

        {/* Categories addressed */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Temas
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {categoriasAbordadas}
          </p>
          <p className="text-xs text-emerald-600 mt-1">identificados até agora</p>
        </div>
      </div>

      {/* Main insight */}
      <div className="bg-white border-2 border-emerald-300 rounded-lg p-5 sm:p-6">
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
          ✨ {getInsight()}
        </p>
      </div>

      {/* Live indicator */}
      <div className="flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <p className="text-xs text-emerald-700 font-medium">
          Dados ao vivo — atualizado a cada 30 segundos
        </p>
      </div>
    </div>
  );
}
