"use client";

import { useState } from "react";

export default function DataInterpretationGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  const limitations = [
    {
      title: "Não é diagnóstico clínico",
      description:
        "As experiências compartilhadas refletem percepções individuais, não conclusões médicas ou clínicas.",
    },
    {
      title: "Não é pesquisa populacional",
      description:
        "Os dados representam apenas quem escolheu participar voluntariamente, não a totalidade da população.",
    },
    {
      title: "Não avalia profissionais ou unidades",
      description:
        "O mapa não mede desempenho, eficiência ou qualidade clínica de serviços específicos.",
    },
    {
      title: "Não substitui bases oficiais de saúde",
      description:
        "Dados administrativos, epidemiológicos e de desempenho mantêm suas fontes de verdade institucionais.",
    },
  ];

  return (
    <div className="space-y-3">
      {/* Compact Header Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full group"
      >
        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
          <div className="flex-shrink-0">
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-600 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
              Como interpretar estes dados
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Clique para entender os limites e usos apropriados
            </p>
          </div>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Introduction */}
          <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              O Mapa do Cuidado reúne contribuições voluntárias e anônimas. Os resultados mostram
              padrões dentro das participações recebidas, mas não representam toda a população nem
              permitem comparar a qualidade dos serviços de saúde.
            </p>
          </div>

          {/* Limitations Grid */}
          <div className="p-4 sm:p-6 space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm">Quatro limites importantes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {limitations.map((limit, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <h5 className="font-semibold text-red-900 text-sm mb-1.5">
                    {index + 1}. {limit.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                    {limit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Complement */}
          <div className="p-4 sm:p-6 bg-green-50 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Usos apropriados:</h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Os dados podem apoiar análises exploratórias, pesquisa aplicada e conversas sobre os
              caminhos do cuidado, respeitando os requisitos éticos e institucionais aplicáveis.
            </p>
          </div>

          {/* Footer Note */}
          <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Base ética:</span> Estudo observacional descritivo com
              participação voluntária, sem coleta de dados clínicos ou pessoais identificáveis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
