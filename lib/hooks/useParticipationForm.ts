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

// Municípios da região Noroeste Fluminense (13 municipios)
export const MUNICIPIOS_NOROESTE = [
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

// Cidades disponíveis para seleção (todos os estados)
const CIDADES_MERCO = [
  ...MUNICIPIOS_NOROESTE.map((cidade) => ({ uf: "RJ", cidade })),
];

function isFromNoroeste(estado: string, municipio: string): boolean {
  if (estado !== "RJ") return false;
  return MUNICIPIOS_NOROESTE.includes(municipio);
}

export function useParticipationForm() {
  const [step, setStep] = useState<ParticipationStep>("start");
  const [formData, setFormData] = useState<ParticipationFormData>({
    estado: "RJ",
    municipio: "",
    resposta_categoria: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participationNumber, setParticipationNumber] = useState<number | null>(null);
  const [showOutOfRegion, setShowOutOfRegion] = useState(false);

  const nextStep = useCallback((nextStepValue: ParticipationStep) => {
    setError(null);
    setStep(nextStepValue);
  }, []);

  const updateFormData = useCallback(
    (field: keyof ParticipationFormData, value: string) => {
      setFormData((prev) => {
        const updated = { ...prev, [field]: value };
        // Check if selected city is from Noroeste
        if (field === "municipio" || field === "estado") {
          const estado = field === "estado" ? value : prev.estado;
          const municipio = field === "municipio" ? value : prev.municipio;
          setShowOutOfRegion(!isFromNoroeste(estado, municipio));
        }
        return updated;
      });
      setError(null);
    },
    []
  );

  const continueParticipation = useCallback(() => {
    setShowOutOfRegion(false);
    // nextStep will be called by the caller
  }, []);

  const submitForm = useCallback(async () => {
    if (!formData.municipio || !formData.resposta_categoria) {
      const errorMsg = "Por favor, complete todos os campos";
      setError(errorMsg);
      throw new Error(errorMsg);
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

      const data = await response.json();
      // Obter o total de participações da resposta
      if (data.total) {
        setParticipationNumber(data.total);
      }

      setIsLoading(false);
      nextStep("confirmation");
    } catch (err) {
      setIsLoading(false);
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao enviar resposta";
      setError(errorMessage);
      throw err;
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
    participationNumber,
    nextStep,
    updateFormData,
    submitForm,
    reset,
    categorias: CATEGORIAS,
    estados: ESTADOS_BR,
    cidades: CIDADES_MERCO,
    showOutOfRegion,
    continueParticipation,
  };
}
