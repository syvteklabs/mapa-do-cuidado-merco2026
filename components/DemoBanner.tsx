"use client";

import { getDataMode } from "@/lib/config";

export default function DemoBanner() {
  const dataMode = getDataMode();
  const isDemo = dataMode === "demo";

  if (!isDemo) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-100 to-orange-100 border-b-2 border-orange-400">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl flex-shrink-0" aria-hidden="true">
            🎭
          </span>
          <div className="flex-1">
            <p className="font-semibold text-orange-900 text-sm sm:text-base">
              Visualização demonstrativa
            </p>
            <p className="text-xs sm:text-sm text-orange-800 mt-0.5">
              Os dados apresentados nesta tela são fictícios e servem
              exclusivamente para demonstrar o funcionamento do mapa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
