"use client";

import { IconMessage, IconLink, IconMap, IconExpand, IconSecurity, IconCommunity } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Compartilhe",
      description: "Responda algumas perguntas sobre sua experiência de acesso ao cuidado. Leva cerca de 2 minutos.",
      icon: IconMessage,
    },
    {
      number: "2",
      title: "Conecte",
      description: "Sua resposta é agrupada com as demais, sem identificação pessoal.",
      icon: IconLink,
    },
    {
      number: "3",
      title: "Descubra",
      description: "O mapa revela percepções, padrões e diferenças entre os municípios da região.",
      icon: IconMap,
    },
  ];

  return (
    <div className="bg-blue-50 rounded-lg p-8 sm:p-12 border border-blue-200">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Como funciona
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Você participa. O território ganha voz.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={step.number} className="relative">
              {/* Card */}
              <div className="bg-white rounded-lg p-8 h-full border border-blue-200 hover:shadow-md transition-shadow">
                {/* Step number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <IconComponent size={32} color={colors.primary[600]} />
                </div>

                {/* Description */}
                <p className="text-gray-700 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-blue-300">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Benefits section */}
      <div className="bg-white rounded-lg p-8 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Por que participar?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <IconExpand size={32} color={colors.primary[600]} />
            </div>
            <p className="font-semibold text-gray-900 mb-2">Rápido</p>
            <p className="text-sm text-gray-600">
              Leva cerca de 2 minutos.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <IconSecurity size={32} color={colors.success[600]} />
            </div>
            <p className="font-semibold text-gray-900 mb-2">Protegido</p>
            <p className="text-sm text-gray-600">
              Não solicitamos nome, telefone ou contato.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <IconCommunity size={32} color={colors.primary[600]} />
            </div>
            <p className="font-semibold text-gray-900 mb-2">Coletivo</p>
            <p className="text-sm text-gray-600">
              Cada participação amplia a compreensão sobre a experiência de cuidado na região.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/participar"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Participar agora
        </a>
      </div>
    </div>
  );
}
