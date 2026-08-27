"use client";

import { useDemoMode } from "@/lib/hooks/useDemoMode";

export default function LiveActivationBadge() {
  const { isDemoMode, stats, isLoading } = useDemoMode();

  const count = stats?.total || 0;
  const experienceText =
    count === 1 ? "experiência já faz" : "experiências já fazem";

  if (isDemoMode) {
    return (
      <div className="flex flex-col gap-4">
        {/* Demo Mode Badge */}
        <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 w-fit">
          <span className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <span className="text-sm font-semibold text-amber-700">
              Prévia demonstrativa
            </span>
          </span>
        </div>

        {/* Counter */}
        <div className="text-sm text-gray-600">
          {isLoading ? (
            <span className="animate-pulse">Carregando dados...</span>
          ) : (
            <>
              <span className="font-semibold text-gray-900">
                {count > 0 ? count : "0"}
              </span>{" "}
              {count === 1 ? "exemplo de experiência" : "exemplos de experiências"}
              {" — "}
              <span className="text-amber-700 font-semibold">
                dados fictícios
              </span>
            </>
          )}
        </div>

        <div className="text-xs text-amber-700 bg-amber-100 rounded px-3 py-2">
          Os dados abaixo são fictícios e servem apenas para apresentar como o mapa funcionará durante a ativação.
        </div>
      </div>
    );
  }

  // Live mode - real data
  return (
    <div className="flex flex-col gap-4">
      {/* Live Badge */}
      <div className="inline-flex items-center gap-3 bg-green-50 border border-green-300 rounded-lg px-4 py-3 w-fit">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold text-green-700">
            🟢 Dados ao vivo
          </span>
        </span>
      </div>

      {/* Dynamic Counter */}
      <div className="text-sm text-gray-600">
        {isLoading ? (
          <span className="animate-pulse">Carregando dados...</span>
        ) : (
          <>
            <span className="font-semibold text-gray-900">{count}</span>{" "}
            {experienceText} parte do mapa
          </>
        )}
      </div>
    </div>
  );
}
