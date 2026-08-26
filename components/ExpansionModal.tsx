"use client";

import { useExpansionForm } from "@/lib/hooks/useExpansionForm";
import { ESTADOS_BR } from "@/lib/hooks/useParticipationForm";
import { useEffect } from "react";

interface ExpansionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: string;
  initialState?: string;
}

export default function ExpansionModal({
  isOpen,
  onClose,
  initialCity,
  initialState,
}: ExpansionModalProps) {
  const { step, formData, isLoading, error, updateFormData, submitForm, reset } =
    useExpansionForm();

  useEffect(() => {
    if (isOpen && initialCity) {
      updateFormData("cidade", initialCity);
    }
    if (isOpen && initialState) {
      updateFormData("estado", initialState);
    }
  }, [isOpen, initialCity, initialState, updateFormData]);

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Step: Form */}
        {step === "form" && (
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Lista de Expansão
                </h2>
                <p className="text-gray-600">
                  Registre seu interesse e ajude a indicar os próximos territórios
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seu nome
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => updateFormData("nome", e.target.value)}
                  placeholder="Digite seu nome"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cidade
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
                  Estado
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

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  WhatsApp (opcional)
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
                    Autorizo a SyVtek Care a utilizar estes dados para entrar em
                    contato sobre a possível expansão do Mapa do Cuidado para minha
                    região.
                  </span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitForm}
                  disabled={isLoading || !formData.consentimento_contato}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Registrando..." : "Registrar Interesse"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Confirmation */}
        {step === "confirmation" && (
          <div className="p-6 sm:p-8 text-center">
            <div className="mb-4 text-5xl">✓</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Interesse registrado.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sua participação ajuda a mostrar onde novas experiências de cuidado
              podem ser construídas.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-sm text-gray-600">
                Obrigado por demonstrar interesse na expansão do Mapa do Cuidado
                para sua região. Em breve, entraremos em contato para explorar as
                possibilidades juntos.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
