"use client";

import Link from "next/link";

interface RewardStats {
  total: number;
  municipios: number;
  temas: number;
  themeName?: string;
}

interface ParticipationRewardScreenProps {
  municipio: string;
  stats: RewardStats | null;
  onNewParticipation: () => void;
}

export default function ParticipationRewardScreen({
  municipio,
  stats,
  onNewParticipation,
}: ParticipationRewardScreenProps) {
  const themeEmoji = {
    "dificuldade-continuar": "🚨",
    "falta-orientacao": "❓",
    "espera-encaminhamento": "⏳",
    "interrupcao-acompanhamento": "📍",
    "mais-apoio": "🤝",
    "outra-percepcao": "💭",
  } as Record<string, string>;

  const getCategoryEmoji = (themeName?: string) => {
    if (!themeName) return "💡";
    const key = Object.keys(themeEmoji).find(
      (k) => themeEmoji[k as keyof typeof themeEmoji] === themeName
    );
    return themeEmoji[key as keyof typeof themeEmoji] || "💡";
  };

  return (
    <div className="text-center space-y-8">
      {/* Success Animation */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 animate-in zoom-in-75 duration-500">
          <span className="text-5xl">✨</span>
        </div>
      </div>

      {/* Main Message */}
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Sua experiência agora faz parte do mapa.
        </h2>

        {municipio && stats && (
          <div className="space-y-3">
            <p className="text-xl sm:text-2xl text-indigo-700 font-semibold">
              Você ajudou <span className="font-bold">{municipio}</span> a ganhar
              mais visibilidade no Mapa do Cuidado.
            </p>

            <p className="text-lg text-gray-700">
              Agora,{" "}
              <span className="font-bold text-gray-900">{stats.total}</span>{" "}
              {stats.total === 1
                ? "experiência ajuda"
                : "experiências ajudam"}{" "}
              a revelar os caminhos do território.
            </p>
          </div>
        )}
      </div>

      {/* Contribution Details */}
      {stats && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Total Experiências */}
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-1">
                {stats.total}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {stats.total === 1
                  ? "experiência"
                  : "experiências"}
              </p>
            </div>

            {/* Total Municípios */}
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-1">
                {stats.municipios}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {stats.municipios === 1 ? "município" : "municípios"}
              </p>
            </div>

            {/* Total Temas */}
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-1">
                {stats.temas}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {stats.temas === 1 ? "tema" : "temas"}
              </p>
            </div>
          </div>

          {/* Theme Detail */}
          {stats.themeName && (
            <div className="border-t border-indigo-200 pt-4">
              <p className="text-sm text-gray-600">
                Sua contribuição foi agregada ao tema:
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {stats.themeName}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Privacy Assurance */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-green-700">✓ Dados anônimos:</span>{" "}
          Sua resposta foi salva sem nome, telefone, contato ou informação
          clínica. Apenas os dados agregados aparecem no mapa.
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-3 pt-4">
        <Link
          href={`/mapa?destaque=${encodeURIComponent(municipio)}`}
          className="block w-full bg-indigo-600 text-white py-4 sm:py-5 px-6 rounded-lg font-semibold text-center text-lg sm:text-xl hover:bg-indigo-700 active:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ver minha cidade no mapa
        </Link>

        <Link
          href="/"
          className="block w-full bg-blue-50 text-blue-700 border-2 border-blue-200 py-4 sm:py-5 px-6 rounded-lg font-semibold text-center text-lg sm:text-xl hover:bg-blue-100 active:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Convidar outra pessoa
        </Link>

        <button
          onClick={onNewParticipation}
          className="w-full bg-gray-200 text-gray-900 py-4 sm:py-5 px-6 rounded-lg font-semibold text-lg sm:text-xl hover:bg-gray-300 active:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Encerrar experiência
        </button>
      </div>

      {/* Inspirational Quote */}
      <p className="text-gray-600 italic text-base sm:text-lg">
        &quot;Quando uma experiência é compartilhada, o cuidado deixa de ser
        invisível.&quot;
      </p>
    </div>
  );
}
