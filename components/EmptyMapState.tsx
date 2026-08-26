"use client";

import Link from "next/link";

interface EmptyMapStateProps {
  title?: string;
  description?: string;
  showCTA?: boolean;
}

export default function EmptyMapState({
  title = "O mapa começa com você",
  description = "As primeiras respostas aparecerão aqui de forma agregada, preservando a identidade dos participantes.",
  showCTA = true,
}: EmptyMapStateProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8 sm:p-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <div className="text-6xl">🗺️</div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-5 space-y-2">
            <p className="text-2xl">🔒</p>
            <p className="font-semibold text-gray-900 text-sm">Anônimo</p>
            <p className="text-xs text-gray-600">
              Sua privacidade é respeitada
            </p>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-lg p-5 space-y-2">
            <p className="text-2xl">📊</p>
            <p className="font-semibold text-gray-900 text-sm">Agregado</p>
            <p className="text-xs text-gray-600">
              Apenas dados coletivos aparecem
            </p>
          </div>
        </div>

        {/* CTA */}
        {showCTA && (
          <Link
            href="/participar"
            className="inline-block bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Compartilhar minha experiência
          </Link>
        )}
      </div>
    </div>
  );
}
