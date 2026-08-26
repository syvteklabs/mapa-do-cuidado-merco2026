"use client";

import { usePublicMapMetrics } from "@/lib/hooks/usePublicMapMetrics";

export default function ProofOfMovement() {
  const { metrics, loading, error, retryFetch } = usePublicMapMetrics();

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
  if (error || !metrics) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 sm:p-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-yellow-900">
            ⏳ Dados temporariamente indisponíveis
          </p>
          <p className="text-xs text-yellow-800">
            Não conseguimos atualizar os dados agora. Você ainda pode participar normalmente — tente visualizar o mapa novamente em alguns instantes.
          </p>
          <button
            onClick={retryFetch}
            className="inline-block px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition"
          >
            Tentar atualizar
          </button>
        </div>
      </div>
    );
  }

  // Generate insight message
  const getInsight = () => {
    if (metrics.totalParticipacoes === 0) {
      return "Seja o primeiro a contribuir e ajude a mapear os caminhos do cuidado na sua região.";
    }

    if (metrics.totalParticipacoes < 10) {
      return `${metrics.totalParticipacoes} ${metrics.totalParticipacoes === 1 ? "pessoa começou" : "pessoas começaram"} a compartilhar experiências de cuidado. Mais contribuições ajudam a construir um mapa mais completo.`;
    }

    if (metrics.totalParticipacoes < 50) {
      return `Com ${metrics.totalParticipacoes} contribuições de ${metrics.municipiosAtivos} ${metrics.municipiosAtivos === 1 ? "município" : "municípios"}, já é possível ver padrões emergindo nos caminhos do cuidado.`;
    }

    if (metrics.totalParticipacoes < 100) {
      return `${metrics.totalParticipacoes} participações mostram que cuidado é assunto prioritário em ${metrics.municipiosAtivos} ${metrics.municipiosAtivos === 1 ? "município" : "municípios"} do Noroeste.`;
    }

    return `${metrics.totalParticipacoes} pessoas já compartilharam suas experiências de cuidado, revelando necessidades em ${metrics.temasIdentificados} áreas diferentes e impactando ${metrics.municipiosAtivos} ${metrics.municipiosAtivos === 1 ? "município" : "municípios"}.`;
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Prova de Movimento
          </h2>
        </div>
        <p className="text-sm text-gray-700">
          Acompanhe em tempo real como o mapa está crescendo
        </p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Total contributions */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Contribuições
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {metrics.totalParticipacoes}
          </p>
          <p className="text-xs text-emerald-600 mt-1">histórias compartilhadas</p>
        </div>

        {/* Participating municipalities */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Municípios
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {metrics.municipiosAtivos}
          </p>
          <p className="text-xs text-emerald-600 mt-1">de {metrics.totalMunicipios} participantes</p>
        </div>

        {/* Categories addressed */}
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Temas
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {metrics.temasIdentificados}
          </p>
          <p className="text-xs text-emerald-600 mt-1">áreas de cuidado</p>
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
