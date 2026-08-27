"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useExpansionForm } from "@/lib/hooks/useExpansionForm";
import { useErrorRecovery } from "@/lib/hooks/useErrorRecovery";
import { ESTADOS_BR } from "@/lib/hooks/useParticipationForm";
import ErrorContingency from "@/components/ErrorContingency";

export default function ExpansionPage() {
  const router = useRouter();
  const { step, formData, isLoading, error, updateFormData, submitForm, reset } =
    useExpansionForm();
  const {
    hasError,
    errorMessage,
    isRetrying,
    setIsRetrying,
    reportError,
    clearError,
  } = useErrorRecovery();

  const handleSubmit = async () => {
    try {
      const success = await submitForm();
      if (success) {
        const territorio = `${formData.cidade} — ${formData.estado}`;
        router.push(`/mapa?novo-territorio=${encodeURIComponent(territorio)}`);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao registrar interesse";
      reportError(errorMsg, formData as unknown as Record<string, string | boolean>);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Step: Form */}
        {step === "form" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Lista de Expansão
              </h1>
              <p className="text-gray-600 mb-4">
                Registre seu interesse e ajude a indicar os próximos territórios onde
                o Mapa do Cuidado poderá chegar.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
              <p className="text-sm text-gray-700">
                Sua região ainda não faz parte deste primeiro ciclo, mas queremos
                conhecer o interesse dos territórios que virão em seguida.
              </p>
            </div>

            {/* Privacy Notice - Different from Map Participation */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6">
              <h3 className="font-bold text-amber-900 text-lg mb-3">
                ⚠️ Privacidade: Diferente da participação no mapa
              </h3>
              <div className="space-y-3 text-sm text-amber-900">
                <p>
                  Diferentemente do mapa principal (que não coleta identificação), <strong>a Lista de Expansão coleta seu nome e contato</strong>.
                </p>
                <div className="bg-white rounded p-3 border border-amber-200">
                  <p className="font-semibold mb-2">O que coletamos:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• <strong>Nome</strong> - Obrigatório</li>
                    <li>• <strong>Cidade e Estado</strong> - Obrigatório</li>
                    <li>• <strong>WhatsApp, Email, Tipo</strong> - Opcional</li>
                  </ul>
                </div>
                <p>
                  <strong>Para que:</strong> Contato direto sobre expansão do mapa para sua região
                </p>
                <p>
                  <strong>Quanto tempo:</strong> Mantemos até 2 anos ou até você revogar consentimento
                </p>
                <p>
                  <strong>Como revogar:</strong> Email para contact@syvtek.care com &quot;Revogar Lista de Expansão&quot; no assunto
                </p>
                <p className="italic">
                  Leia nossa <a href="/privacidade" className="underline font-semibold text-amber-900 hover:text-amber-800">política de privacidade completa</a> para detalhes.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Cidade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cidade <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.cidade}
                  onChange={(e) => updateFormData("cidade", e.target.value)}
                  placeholder="Digite sua cidade"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => updateFormData("estado", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {ESTADOS_BR.map((est) => (
                    <option key={est.uf} value={est.uf}>
                      {est.nome} ({est.uf})
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Required Note */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900">
                  ℹ️ Forneça ao menos WhatsApp ou e-mail para que possamos entrar em contato
                </p>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.contato_whatsapp}
                  onChange={(e) =>
                    updateFormData("contato_whatsapp", e.target.value)
                  }
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  value={formData.contato_email}
                  onChange={(e) =>
                    updateFormData("contato_email", e.target.value)
                  }
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Nome (agora opcional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seu nome (opcional)
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => updateFormData("nome", e.target.value)}
                  placeholder="Seu nome (ajuda para personalização do contato)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tipo de Participante */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de participante (opcional)
                </label>
                <select
                  value={formData.tipo_participante}
                  onChange={(e) =>
                    updateFormData("tipo_participante", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="paciente">Paciente ou cuidador</option>
                  <option value="profissional">Profissional de saúde</option>
                  <option value="gestor">Gestor de saúde</option>
                  <option value="comunidade">Comunidade/Sociedade civil</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Contact Usage Notice */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4">
                <p className="text-sm text-emerald-900">
                  <strong>📧 Como usaremos seu contato:</strong> Usaremos WhatsApp ou e-mail apenas para informar sobre uma possível expansão do Mapa do Cuidado para sua região. Nada de spam, nada de publicidade.
                </p>
              </div>

              {/* Consentimento */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentimento_contato}
                    onChange={(e) =>
                      updateFormData("consentimento_contato", e.target.checked)
                    }
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    Autorizo a SyVtek Care a entrar em contato sobre possível expansão do Mapa do Cuidado para minha região <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors text-center"
              >
                Voltar
              </Link>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.consentimento_contato || (!formData.contato_whatsapp && !formData.contato_email)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Registrando..." : "Quero levar o Mapa para minha região"}
              </button>
            </div>
          </div>
        )}

        {/* Step: Confirmation */}
        {step === "confirmation" && (
          <div className="text-center space-y-8">
            <div>
              <div className="mb-4 text-5xl">✓</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Interesse registrado.
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Sua participação ajuda a mostrar onde novas experiências de cuidado
                podem ser construídas.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
              <p className="text-sm text-gray-600">
                Obrigado por demonstrar interesse na expansão do Mapa do Cuidado para
                sua região. Em breve, entraremos em contato para explorar as
                possibilidades juntos.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-center hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                Voltar para a página inicial
              </Link>
              <button
                onClick={reset}
                className="w-full bg-gray-200 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors"
              >
                Registrar Outro Interesse
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* Error Contingency Modal */}
      {hasError && errorMessage && (
        <ErrorContingency
          errorMessage={errorMessage}
          onRetry={async () => {
            setIsRetrying(true);
            try {
              const success = await submitForm();
              if (success) {
                const territorio = `${formData.cidade} — ${formData.estado}`;
                router.push(`/mapa?novo-territorio=${encodeURIComponent(territorio)}`);
              }
              clearError();
            } catch (err) {
              const errorMsg =
                err instanceof Error ? err.message : "Erro ao tentar novamente";
              reportError(errorMsg, formData as unknown as Record<string, string | boolean>);
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
