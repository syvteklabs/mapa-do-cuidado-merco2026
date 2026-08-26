"use client";

import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Participe",
      description: "Compartilhe sua experiência em cerca de 2 minutos.",
    },
    {
      number: "2",
      title: "Somamos as respostas",
      description: "As contribuições são organizadas de forma anônima e agregada.",
    },
    {
      number: "3",
      title: "O território ganha visibilidade",
      description: "Os padrões coletivos aparecem no mapa do Noroeste Fluminense.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 sm:p-10 border border-blue-200">
      {/* Header */}
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Como funciona
        </h2>
      </div>

      {/* Steps - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {steps.map((step) => (
          <div key={step.number} className="bg-white rounded-lg p-6 border border-blue-200 text-center space-y-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mx-auto">
              {step.number}
            </div>
            <h3 className="font-bold text-gray-900 text-sm">
              {step.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="text-center">
        <Link
          href="/como-funciona"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
        >
          Entenda como funciona →
        </Link>
      </div>
    </div>
  );
}
