"use client";

interface ProblemCard {
  title: string;
  question: string;
  icon: React.ReactNode;
}

export default function WhatAreWeTryingToSee() {
  const cards: ProblemCard[] = [
    {
      title: "Continuidade",
      question: "O que acontece depois de uma consulta, alta ou encaminhamento?",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
          <path d="M3 12l7-7v14" />
        </svg>
      ),
    },
    {
      title: "Orientação",
      question: "As pessoas sabem onde, quando e como continuar o cuidado?",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
          <path d="M12 2l3 3-3 3" />
        </svg>
      ),
    },
    {
      title: "Apoio",
      question: "Pacientes e famílias encontram o apoio necessário durante a jornada?",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Acesso",
      question: "Quais barreiras aparecem com mais frequência nos diferentes municípios?",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
          <path d="M9 12h6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="space-y-6 mb-16">
        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl">
          Há experiências que acontecem todos os dias, mas ainda não aparecem quando olhamos apenas para números.
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl">
          Dificuldade para continuar um tratamento, espera por um encaminhamento, falta de orientação ou necessidade de apoio são experiências que ajudam a compreender como o cuidado é percebido no território.
        </p>
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col h-full p-6 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            {/* Icon */}
            <div className="text-indigo-600 mb-4 flex-shrink-0">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {card.title}
            </h3>

            {/* Question */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-grow">
              {card.question}
            </p>
          </div>
        ))}
      </div>

      {/* Disclaimer / Observation */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <p className="text-sm text-gray-600 max-w-3xl">
          <span className="font-semibold text-gray-700">Observação:</span> Este mapa não avalia a eficiência, qualidade clínica ou desempenho de nenhuma unidade ou profissional. Ele captura percepções coletivas sobre os caminhos do cuidado.
        </p>
      </div>
    </section>
  );
}
