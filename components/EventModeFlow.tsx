"use client";

import { useEventModeForm } from "@/lib/hooks/useEventModeForm";
import ParticipationRewardScreen from "./ParticipationRewardScreen";
import { useEffect, useState } from "react";

const MUNICIPIOS_NOROESTE = [
  "Aperibé",
  "Bom Jesus do Itabapoana",
  "Cambuci",
  "Italva",
  "Itaocara",
  "Itaperuna",
  "Laje do Muriaé",
  "Miracema",
  "Natividade",
  "Porciúncula",
  "Santo Antônio de Pádua",
  "São José de Ubá",
  "Varre-Sai",
];

const CATEGORIAS = [
  {
    id: "dificuldade-continuar",
    label: "Dificuldade para continuar o tratamento",
  },
  {
    id: "falta-orientacao",
    label: "Falta de orientação",
  },
  {
    id: "espera-encaminhamento",
    label: "Espera por encaminhamento",
  },
  {
    id: "interrupcao-acompanhamento",
    label: "Interrupção do acompanhamento",
  },
  {
    id: "mais-apoio",
    label: "Necessidade de mais apoio ao paciente ou à família",
  },
  {
    id: "outra-percepcao",
    label: "Outra percepção",
  },
];

export default function EventModeFlow() {
  const {
    step,
    formData,
    isLoading,
    error,
    rewardStats,
    autoResetCountdown,
    nextStep,
    updateFormData,
    submitForm,
    reset,
    categorias,
    cidades,
  } = useEventModeForm();

  const filteredCidades = cidades.filter((c) => c.uf === formData.estado);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-4">
      {/* Full Screen Container */}
      <div className="w-full max-w-4xl min-h-screen flex flex-col items-center justify-center space-y-8 py-8">
        {/* Header with Logo/Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">
            Mapa do Cuidado
          </h1>
          <p className="text-2xl sm:text-3xl text-indigo-700 font-semibold">
            Merco Noroeste 2026
          </p>
        </div>

        {/* Step: Location */}
        {step === "location" && (
          <div className="w-full max-w-3xl space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Onde você está?
              </h2>
            </div>

            <div className="space-y-4 px-4 sm:px-0">
              <div>
                <label className="block text-2xl font-semibold text-gray-700 mb-4">
                  Município
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {MUNICIPIOS_NOROESTE.map((municipio) => (
                    <button
                      key={municipio}
                      onClick={() => updateFormData("municipio", municipio)}
                      className={`p-4 sm:p-6 rounded-lg font-semibold text-base sm:text-xl transition-all ${
                        formData.municipio === municipio
                          ? "bg-indigo-600 text-white border-2 border-indigo-600 scale-105"
                          : "bg-white border-2 border-gray-300 text-gray-900 hover:border-indigo-400 hover:bg-indigo-50"
                      }`}
                    >
                      {municipio}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-lg text-red-700">
                  {error}
                </div>
              )}

              <button
                onClick={async () => {
                  if (!formData.municipio) {
                    alert("Por favor, selecione seu município");
                    return;
                  }
                  nextStep("question");
                }}
                className="w-full bg-indigo-600 text-white py-5 sm:py-7 px-6 rounded-lg font-bold text-2xl sm:text-3xl hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step: Question */}
        {step === "question" && (
          <div className="w-full max-w-3xl space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                O que mais marcou esse caminho?
              </h2>
              <p className="text-xl sm:text-2xl text-gray-700">
                em {formData.municipio}
              </p>
              <p className="text-lg sm:text-xl text-gray-600">
                Escolha o que melhor descreve sua experiência.
              </p>
            </div>

            <div className="space-y-4 px-4 sm:px-0">
              {categorias.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    updateFormData("resposta_categoria", cat.id)
                  }
                  className={`w-full p-5 sm:p-7 rounded-lg font-bold text-lg sm:text-2xl transition-all text-left ${
                    formData.resposta_categoria === cat.id
                      ? "bg-indigo-600 text-white border-2 border-indigo-600 scale-105"
                      : "bg-white border-2 border-gray-300 text-gray-900 hover:border-indigo-400 hover:bg-indigo-50"
                  }`}
                >
                  {cat.humanLabel || cat.label}
                </button>
              ))}

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => nextStep("location")}
                  className="flex-1 bg-gray-200 text-gray-900 py-5 sm:py-7 rounded-lg font-bold text-xl sm:text-2xl hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={async () => {
                    try {
                      nextStep("sending");
                      await submitForm();
                    } catch (err) {
                      nextStep("question");
                    }
                  }}
                  disabled={!formData.resposta_categoria || isLoading}
                  className="flex-1 bg-indigo-600 text-white py-5 sm:py-7 rounded-lg font-bold text-xl sm:text-2xl hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Salvando..." : "Enviar"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Sending */}
        {step === "sending" && isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 border-6 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-2xl sm:text-3xl text-gray-600 text-center">
              Salvando sua resposta...
            </p>
          </div>
        )}

        {/* Step: Confirmation */}
        {step === "confirmation" && rewardStats && (
          <div className="w-full max-w-3xl">
            <ParticipationRewardScreen
              municipio={formData.municipio}
              stats={rewardStats}
              onNewParticipation={reset}
            />

            {/* Auto-reset countdown */}
            {autoResetCountdown !== null && autoResetCountdown > 0 && (
              <div className="mt-8 text-center space-y-3">
                <p className="text-xl sm:text-2xl text-gray-600 font-semibold">
                  Retornando em {autoResetCountdown} segundos...
                </p>
                <button
                  onClick={reset}
                  className="mx-auto block bg-blue-100 text-blue-700 py-3 sm:py-4 px-8 sm:px-10 rounded-lg font-bold text-lg sm:text-xl hover:bg-blue-200 transition-colors"
                >
                  Nova participação
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
