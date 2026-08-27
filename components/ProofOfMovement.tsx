"use client";

import { useMovementStats } from "@/lib/hooks/useMovementStats";
import { useEffect, useState } from "react";
import { IconExpand, IconAlert, IconSuccess, IconLive } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

export default function ProofOfMovement() {
  const { stats, loading, error } = useMovementStats();
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const checkDemoMode = async () => {
      try {
        const response = await fetch("/api/contribuicoes", {
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) {
          setIsDemoMode(true);
        }
      } catch {
        setIsDemoMode(true);
      }
    };
    checkDemoMode();
  }, []);

  // Skeleton loader
  if (loading) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 sm:p-8">
        <div className="space-y-6">
          {/* Headline skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-emerald-200 rounded-lg w-48 animate-pulse"></div>
            <div className="h-4 bg-emerald-100 rounded-lg w-64 animate-pulse"></div>
          </div>

          {/* Stats grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-emerald-200 rounded-lg p-4 space-y-3">
                <div className="h-4 bg-emerald-100 rounded-lg w-20 animate-pulse"></div>
                <div className="h-8 bg-emerald-200 rounded-lg w-16 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Insight skeleton */}
          <div className="bg-white border border-emerald-200 rounded-lg p-4">
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
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8">
        <div className="flex items-center justify-center gap-3">
          <IconAlert size={24} color={colors.error[600]} className="flex-shrink-0" />
          <div className="text-center">
            <p className="text-sm font-semibold text-red-800 mb-1">
              Dados indisponíveis
            </p>
            <p className="text-xs text-red-700">
              {error || "Não foi possível carregar os dados de movimento. Tente novamente mais tarde."}
            </p>
          </div>
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
      return "O território aguarda suas primeiras contribuições.";
    }

    if (stats.total < 30) {
      return `Com ${stats.total} ${stats.total === 1 ? "contribuição" : "contribuições"} distribuídas por ${municipiosParticipantes} ${municipiosParticipantes === 1 ? "município" : "municípios"}, o território começa a revelar seus primeiros sinais.`;
    }

    return `As contribuições já permitem observar tendências iniciais nos caminhos do cuidado.`;
  };

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <IconExpand size={28} color={colors.secondary[600]} className="flex-shrink-0" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            O Mapa do Cuidado está acontecendo agora
          </h2>
        </div>
        <p className="text-sm text-gray-700">
          Acompanhe como as experiências compartilhadas durante a Merco Noroeste 2026 começam a revelar percepções e diferenças entre os municípios.
        </p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Total contributions */}
        <div className="bg-white border border-emerald-200 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Participações
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {stats.total}
          </p>
          <p className="text-xs text-emerald-600 mt-1">experiências compartilhadas</p>
        </div>

        {/* Participating municipalities */}
        <div className="bg-white border border-emerald-200 rounded-lg p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            Municípios
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {municipiosParticipantes}
          </p>
          <p className="text-xs text-emerald-600 mt-1">com participações registradas</p>
        </div>

        {/* Categories addressed */}
        <div className="bg-white border border-emerald-200 rounded-lg p-4 sm:p-5 text-center">
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
      <div className="bg-white border border-emerald-200 rounded-lg p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <IconSuccess size={20} color={colors.success[600]} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
            {getInsight()}
          </p>
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center justify-center gap-2">
        {isDemoMode ? (
          <>
            <IconAlert size={12} color={colors.warning[600]} />
            <p className="text-xs text-amber-700 font-medium">
              Visualização demonstrativa com dados fictícios
            </p>
          </>
        ) : (
          <>
            <IconLive size={12} color={colors.success[600]} />
            <p className="text-xs text-emerald-700 font-medium">
              Dados atualizados a cada 30 segundos
            </p>
          </>
        )}
      </div>
    </div>
  );
}
