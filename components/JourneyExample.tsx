"use client";

import { useEffect, useState } from "react";

interface JourneyStep {
  number: number;
  title: string;
  description: string;
}

export default function JourneyExample() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps: JourneyStep[] = [
    {
      number: 1,
      title: "Experiência compartilhada",
      description: "Uma pessoa relata sua vivência",
    },
    {
      number: 2,
      title: "Informação anônima",
      description: "Sem identificação pessoal",
    },
    {
      number: 3,
      title: "Respostas agregadas",
      description: "Padrões coletivos aparecem",
    },
    {
      number: 4,
      title: "Padrão territorial",
      description: "Reconhecimento regional",
    },
    {
      number: 5,
      title: "Evidência para análise",
      description: "Base para discussão",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="space-y-8 mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-3xl">
          Uma experiência pode ajudar a revelar um caminho interrompido.
        </h2>

        {/* Illustrative Testimony */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-600 p-6 sm:p-8 rounded-lg max-w-2xl">
          <p className="text-lg sm:text-xl text-gray-900 italic leading-relaxed font-medium">
            "Recebi um encaminhamento, mas não entendi onde deveria continuar o atendimento."
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Exemplo ilustrativo
          </p>
        </div>
      </div>

      {/* Journey Flow - Visual Timeline */}
      <div className="mb-16">
        {/* Desktop Flow - Horizontal */}
        <div className="hidden md:block">
          <div className="flex items-center gap-2 sm:gap-3">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`transition-all duration-700 ease-out transform ${
                    mounted
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {step.number}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 text-center max-w-20 sm:max-w-24">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center max-w-20 sm:max-w-24">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 sm:mx-3 bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-700 ease-out ${
                      mounted ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{
                      transformOrigin: "left",
                      transitionDelay: `${(index + 1) * 100 + 100}ms`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flow - Vertical */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`transition-all duration-500 ease-out ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <div className="flex gap-4">
                {/* Circle */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {step.number}
                  </div>
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-blue-400 to-indigo-400 ml-5 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supporting Text */}
      <div className="max-w-3xl space-y-4">
        <p className="text-lg sm:text-xl text-gray-900 font-semibold leading-relaxed">
          Uma resposta representa uma experiência.
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Quando situações semelhantes aparecem, o mapa pode ajudar a revelar padrões que merecem ser compreendidos.
        </p>

        {/* Clarification Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-700">Esclarecimento:</span> Este mapa não promete resolver automaticamente as situações, nem realiza monitoramento individual. É um instrumento para revelar padrões coletivos que orientam conversas e reflexões sobre o cuidado territorial.
          </p>
        </div>
      </div>
    </section>
  );
}
