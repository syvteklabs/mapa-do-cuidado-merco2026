import { useState, useCallback } from "react";

export type ParticipationStep = "start" | "info" | "location" | "question" | "sending" | "confirmation";

export interface ParticipationFormData {
  estado: string;
  municipio: string;
  resposta_categoria: string;
}

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

export const ESTADOS_BR = [
  { uf: "AC", nome: "Acre" },
  { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "BA", nome: "Bahia" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" },
  { uf: "SC", nome: "Santa Catarina" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "SE", nome: "Sergipe" },
  { uf: "TO", nome: "Tocantins" },
];

// Cidades da região Noroeste Fluminense (prioridade para MVP)
const CIDADES_MERCO = [
  { uf: "RJ", cidade: "Campos dos Goytacazes" },
  { uf: "RJ", cidade: "São Fidélis" },
  { uf: "RJ", cidade: "Conceição de Macabu" },
  { uf: "RJ", cidade: "Carapebus" },
  { uf: "RJ", cidade: "Quissamã" },
  { uf: "RJ", cidade: "Macaé" },
  { uf: "RJ", cidade: "Rio das Ostras" },
  { uf: "RJ", cidade: "Cardoso Moreira" },
];

export function useParticipationForm() {
  const [step, setStep] = useState<ParticipationStep>("start");
  const [formData, setFormData] = useState<ParticipationFormData>({
    estado: "RJ",
    municipio: "",
    resposta_categoria: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextStep = useCallback((nextStepValue: ParticipationStep) => {
    setError(null);
    setStep(nextStepValue);
  }, []);

  const updateFormData = useCallback(
    (field: keyof ParticipationFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
    },
    []
  );

  const submitForm = useCallback(async () => {
    if (!formData.municipio || !formData.resposta_categoria) {
      setError("Por favor, complete todos os campos");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contribuicoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          municipio: formData.municipio,
          estado: formData.estado,
          resposta_categoria: formData.resposta_categoria,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar resposta");
      }

      nextStep("confirmation");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao enviar resposta";
      setError(errorMessage);
      setIsLoading(false);
    }
  }, [formData, nextStep]);

  const reset = useCallback(() => {
    setStep("start");
    setFormData({
      estado: "RJ",
      municipio: "",
      resposta_categoria: "",
    });
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    step,
    formData,
    isLoading,
    error,
    nextStep,
    updateFormData,
    submitForm,
    reset,
    categorias: CATEGORIAS,
    estados: ESTADOS_BR,
    cidades: CIDADES_MERCO,
  };
}
