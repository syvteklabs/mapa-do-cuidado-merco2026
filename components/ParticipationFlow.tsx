"use client";

import { useParticipationForm } from "@/lib/hooks/useParticipationForm";
import { useErrorRecovery } from "@/lib/hooks/useErrorRecovery";
import Link from "next/link";
import OutOfRegionFlow from "./OutOfRegionFlow";
import ErrorContingency from "./ErrorContingency";
import PrivacyDisclosure from "./PrivacyDisclosure";
import { CheckIcon } from "./Icons";

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
    savedNotification,
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

  const progressSteps = [
    { id: "location", label: "1. Município" },
    { id: "question", label: "2. Experiência" },
    { id: "perception", label: "3. Percepção" },
    { id: "review", label: "4. Revisar e enviar" },
  ];
  const currentProgress =
    progressSteps.findIndex((s) => s.id === step) + 1;
  const totalProgress = progressSteps.length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 inline-block"
          >
            ← Voltar
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      {step !== "confirmation" && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 mb-3">
              {Array.from({ length: totalProgress }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    i < currentProgress ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">
                {step === "start" ? "Preparado?" : progressSteps[currentProgress - 1]?.label || "Progresso"}
              </p>
              <p className="text-xs font-medium text-gray-600">
                {currentProgress} de {totalProgress}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Step: Start */}
        {step === "start" && (
          <div className="space-y-8">
            {/* Title and Introduction */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Sua experiência ajuda a construir este mapa.
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Você responderá algumas perguntas rápidas sobre como percebeu um caminho de cuidado
                na sua região.
              </p>
            </div>

            {/* Steps Visualization */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 sm:p-8">
              <h2 className="font-semibold text-gray-900 mb-6 text-sm">Processo em 4 etapas:</h2>
              <div className="space-y-4">
                {progressSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Block - Summarized */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Sua privacidade é protegida:</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                Não solicitamos nome, telefone, endereço, localização exata ou informações clínicas.
              </p>
              <Link
                href="/privacidade"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 inline-block"
              >
                Entenda como protegemos sua participação →
              </Link>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">2 min</p>
                <p className="text-sm text-gray-600 mt-1">Leva apenas 2 minutos</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-gray-600 mt-1">Anônimo</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">Agregado</p>
                <p className="text-sm text-gray-600 mt-1">Seus dados formam um mapa</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => nextStep("location")}
              className="w-full bg-blue-600 text-white py-4 sm:py-5 px-6 rounded-lg font-semibold text-lg sm:text-xl hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Começar agora
            </button>
          </div>
        )}

        {/* Step: Location */}
        {step === "location" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Em qual município você mora?
              </h2>
              <p className="text-gray-600 text-sm">
                Precisamos saber de qual região você está compartilhando sua experiência.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Estado (UF)
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
                  onClick={() => nextStep("start")}
                  className="flex-1 bg-gray-200 text-gray-900 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={() => {
                    if (formData.municipio) nextStep("question");
                  }}
                  disabled={!formData.municipio}
                  className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
                Como foi sua experiência?
              </h2>
              <p className="text-gray-600 text-sm">
                Selecione o que melhor descreve sua experiência com os caminhos do cuidado.
              </p>
            </div>

            <div className="space-y-3">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    updateFormData("resposta_categoria", cat.id)
                  }
                  className={`w-full p-4 sm:p-5 rounded-lg font-semibold text-left text-base sm:text-lg transition-colors ${
                    formData.resposta_categoria === cat.id
                      ? "bg-blue-600 text-white border-2 border-blue-600"
                      : "bg-white border-2 border-gray-300 text-gray-900 hover:border-blue-400 active:bg-blue-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <button
                onClick={() =>
                  updateFormData("resposta_categoria", "prefer_not_answer")
                }
                className={`w-full p-4 sm:p-5 rounded-lg font-semibold text-left text-base sm:text-lg transition-colors border-2 ${
                  formData.resposta_categoria === "prefer_not_answer"
                    ? "bg-gray-400 text-white border-2 border-gray-400"
                    : "bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400 active:bg-gray-50"
                }`}
              >
                Prefiro não responder
              </button>
            </div>

            <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              Esta pergunta é opcional. Se preferir não responder, você ainda poderá contribuir com sua participação.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => nextStep("location")}
                className="flex-1 bg-gray-200 text-gray-900 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-300 active:bg-gray-400 transition-colors"
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
                className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar resposta"
                )}
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
          <div className="space-y-8">
            {/* Success Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  Sua participação agora faz parte deste mapa.
                </h2>
                <p className="text-lg sm:text-xl text-gray-700">
                  A resposta foi registrada de forma anônima e será apresentada somente em
                  conjunto com outras participações.
                </p>
              </div>
            </div>

            {/* Submission Details */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm uppercase">Sua contribuição</h3>

              {/* Municipality */}
              <div className="flex justify-between items-start py-3 border-b border-blue-100">
                <span className="text-gray-600 font-medium">Município informado:</span>
                <span className="text-right font-semibold text-gray-900">{formData.municipio}</span>
              </div>

              {/* Theme/Category */}
              {formData.resposta_categoria !== "prefer_not_answer" && (
                <div className="flex justify-between items-start py-3 border-b border-blue-100">
                  <span className="text-gray-600 font-medium">Tema percebido:</span>
                  <span className="text-right font-semibold text-gray-900">
                    {categorias.find((c) => c.id === formData.resposta_categoria)?.label ||
                      "Resposta registrada"}
                  </span>
                </div>
              )}

              {/* Anonymity Confirmation */}
              <div className="flex justify-between items-start py-3">
                <span className="text-gray-600 font-medium">Dados pessoais coletados:</span>
                <span className="text-right font-semibold text-green-700">Nenhum</span>
              </div>

              {/* Update Time */}
              <div className="flex justify-between items-start pt-3 border-t border-blue-100">
                <span className="text-gray-600 font-medium">Próxima atualização:</span>
                <span className="text-right font-semibold text-gray-900">Em até 1 hora</span>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Sua resposta será agregada com outras participações. Você não pode ser
                identificado(a), pois nenhum dado pessoal ou de localização exata foi solicitado.
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              {/* Primary CTA */}
              <Link
                href="/mapa"
                className="block w-full bg-blue-600 text-white py-4 sm:py-5 px-6 rounded-lg font-semibold text-center text-lg sm:text-xl hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Ver o mapa atualizado
              </Link>

              {/* Secondary CTA - Share */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Mapa do Cuidado",
                      text: "Compartilhe sua experiência sobre os caminhos do cuidado no Noroeste Fluminense",
                      url: window.location.origin,
                    }).catch(() => {
                      // User cancelled share
                    });
                  } else {
                    // Fallback: copy URL to clipboard
                    const url = window.location.origin;
                    navigator.clipboard.writeText(url);
                    alert("Link copiado para a área de transferência!");
                  }
                }}
                className="w-full bg-gray-200 text-gray-900 py-4 sm:py-5 px-6 rounded-lg font-semibold text-lg sm:text-xl hover:bg-gray-300 active:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Compartilhar o Mapa do Cuidado
              </button>

              {/* Tertiary CTA */}
              <Link
                href="/"
                className="block w-full bg-white text-gray-900 border-2 border-gray-300 py-4 sm:py-5 px-6 rounded-lg font-semibold text-center text-lg sm:text-xl hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Voltar ao início
              </Link>
            </div>

            {/* Participation Count (Optional) */}
            {participationNumber && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Você é a participação nº <span className="font-bold text-gray-900">{participationNumber}</span> deste
                  mapa.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Saved Notification Toast */}
      {savedNotification && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-green-50 border-2 border-green-300 rounded-lg p-4 shadow-lg animate-pulse">
          <div className="flex items-center gap-3">
            <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden={true} />
            <p className="text-sm font-semibold text-green-800">
              Respostas salvas localmente
            </p>
          </div>
        </div>
      )}

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
          onGoBack={() => {
            clearError();
            nextStep("question");
          }}
          isRetrying={isRetrying}
        />
      )}
    </div>
  );
}
