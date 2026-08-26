"use client";

export default function DemoBanner() {
  return (
    <div className="w-full bg-yellow-50 border-b-4 border-yellow-400 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <span className="text-2xl">🎬</span>
        <p className="text-sm font-semibold text-yellow-900">
          MODO DEMONSTRAÇÃO - Dados fictícios para visualização
        </p>
      </div>
    </div>
  );
}
