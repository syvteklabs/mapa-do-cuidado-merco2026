"use client";

import { useParticipationForm } from "@/lib/hooks/useParticipationForm";
import { useErrorRecovery } from "@/lib/hooks/useErrorRecovery";
import Link from "next/link";
import OutOfRegionFlow from "./OutOfRegionFlow";
import ErrorContingency from "./ErrorContingency";

export default function ParticipationFlow() {
  const {
    step,
    formData,
    isLoading,
    error,
    participationNumber,
    nextStep,
    updateFormData,
    submitForm,
    reset,
    categorias,
    estados,
    cidades,
    showOutOfRegion,
    continueParticipation,
  } = useParticipationForm();

  const {
    hasError,
    errorMessage,
    isRetrying,
    setIsRetrying,
    reportError,
    clearError,
  } = useErrorRecovery();

  const filteredCidades = cidades.filter((c) => c.uf === formData.estado);

  const progressSteps = ["info", "location", "question", "sending"];
  const currentProgress =
    progressSteps.indexOf(step as string) + 1;
  const totalProgress = progressSteps.length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
            ← Voltar
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      {step !== "start" && step !== "confirmation" && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              {Array.from({ length: totalProgress }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    i < currentProgress ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {currentProgress} de {totalProgress}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Step: Start */}
        {step === "start" && (
          <div className="text-center space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Mapa do Cuidado
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Sua experiência pode transformar o cuidado em nossa região.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left space-y-3">
              <p className="text-sm text-gray-700">
                <strong>Esta é uma escuta rápida, voluntária e anônima.</strong>
              </p>
              <p className="text-sm text-gray-600">
                As respostas serão apresentadas de forma agregada e não
                identificam os participantes.
              </p>
              <p className="text-xs text-gray-500 mt-4">
                Tempo estimado: 2 minutos
              </p>
            </div>

            <button
              onClick={() => nextStep("info")}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              Começar
            </button>
          </div>
        )}

        {/* Step: Info */}
        {step === "info" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Sua Experiência Importa
              </h2>
              <p className="text-gray-600 mb-4">
                Queremos ouvir sobre os caminhos do cuidado que você percorreu
                ou conhece na região do Noroeste Fluminense.
              </p>
              <p className="text-gray-600 mb-4">
                Não há respostas certas ou erradas. Sua percepção é valiosa.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => nextStep("location")}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step: Location */}
        {step === "location" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Onde você está?
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Estado
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => {
                    updateFormData("estado", e.target.value);
                    updateFormData("municipio", "");
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {estados.map((est) => (
                    <option key={est.uf} value={est.uf}>
                      {est.nome} ({est.uf})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cidade/Município
                </label>
                {formData.estado === "RJ" ? (
                  <select
                    value={formData.municipio}
                    onChange={(e) =>
                      updateFormData("municipio", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma cidade</option>
                    {filteredCidades.map((cidade) => (
                      <option key={cidade.cidade} value={cidade.cidade}>
                        {cidade.cidade}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.municipio}
                    onChange={(e) =>
                      updateFormData("municipio", e.target.value)
                    }
                    placeholder="Digite sua cidade"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            {showOutOfRegion && formData.municipio && (
              <OutOfRegionFlow
                selectedCity={formData.municipio}
                selectedState={formData.estado}
                onContinue={() => {
                  continueParticipation();
                  nextStep("question");
                }}
              />
            )}

            {!showOutOfRegion && (
              <div className="flex gap-3">
                <button
                  onClick={() => nextStep("info")}
                  className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={() => {
                    if (formData.municipio) nextStep("question");
                  }}
                  disabled={!formData.municipio}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Próximo
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step: Question */}
        {step === "question" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Qual é a sua experiência?
              </h2>
              <p className="text-gray-600 text-sm">
                Selecione a opção que melhor descreve sua experiência com o
                cuidado.
              </p>
            </div>

            <div className="space-y-3">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    updateFormData("resposta_categoria", cat.id)
                  }
                  className={`w-full p-4 rounded-lg font-semibold text-left transition-colors ${
                    formData.resposta_categoria === cat.id
                      ? "bg-blue-600 text-white border-2 border-blue-600"
                      : "bg-white border-2 border-gray-300 text-gray-900 hover:border-blue-400 active:bg-blue-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => nextStep("location")}
                className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={async () => {
                  try {
                    nextStep("sending");
                    await submitForm();
                  } catch (err) {
                    const errorMsg =
                      err instanceof Error ? err.message : "Erro ao enviar resposta";
                    reportError(errorMsg, formData as unknown as Record<string, string>);
                    nextStep("question");
                  }
                }}
                disabled={!formData.resposta_categoria || isLoading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        )}

        {/* Step: Sending */}
        {step === "sending" && isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-600 text-center">
              Salvando sua resposta de forma anônima...
            </p>
          </div>
        )}

        {/* Step: Confirmation */}
        {step === "confirmation" && (
          <div className="text-center space-y-8">
            <div>
              <div className="mb-4 text-5xl">✓</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Sua voz entrou no mapa.
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Sua experiência agora faz parte do Mapa do Cuidado.
              </p>
              {participationNumber && (
                <p className="text-2xl font-bold text-blue-600 mb-3">
                  Você é a participação nº {participationNumber} deste mapa.
                </p>
              )}
              <p className="text-gray-600 italic">
                &quot;Quando uma experiência é compartilhada, o cuidado deixa de ser invisível.&quot;
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
              <p className="text-sm text-gray-600">
                Sua contribuição anônima e voluntária ajuda a construir um mapa
                real dos caminhos do cuidado em nossa região.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href={`/mapa?destaque=${encodeURIComponent(formData.municipio)}`}
                className="block w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-center hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                Ver minha cidade no mapa
              </Link>
              <button
                onClick={reset}
                className="w-full bg-gray-200 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors"
              >
                Nova Participação
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 px-4 py-6 text-center text-xs text-gray-500">
        <p>Uma experiência da SyVtek Care para a Merco Noroeste 2026</p>
      </footer>

      {/* Error Contingency Modal */}
      {hasError && errorMessage && (
        <ErrorContingency
          errorMessage={errorMessage}
          onRetry={async () => {
            setIsRetrying(true);
            try {
              await submitForm();
              clearError();
            } catch (err) {
              const errorMsg =
                err instanceof Error ? err.message : "Erro ao tentar novamente";
              reportError(errorMsg, formData as unknown as Record<string, string>);
            } finally {
              setIsRetrying(false);
            }
          }}
          isRetrying={isRetrying}
        />
      )}
    </div>
  );
}
