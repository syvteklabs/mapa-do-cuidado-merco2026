import { useState, useCallback, useEffect, useRef } from "react";

export type ParticipationStep = "start" | "location" | "question" | "sending" | "confirmation";

const STORAGE_KEY = "mapa-cuidado-form-data";

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
  const isMountedRef = useRef(false);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with localStorage data
  const getInitialFormData = (): ParticipationFormData => {
    if (typeof window === "undefined") {
      return { estado: "RJ", municipio: "", resposta_categoria: "" };
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) {
          return parsed.formData;
        }
      }
    } catch (err) {
      console.error("Failed to load from localStorage:", err);
    }
    return { estado: "RJ", municipio: "", resposta_categoria: "" };
  };

  const [step, setStep] = useState<ParticipationStep>("start");
  const [formData, setFormData] = useState<ParticipationFormData>(
    getInitialFormData()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participationNumber, setParticipationNumber] = useState<number | null>(null);
  const [showOutOfRegion, setShowOutOfRegion] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  // Set mounted flag after first render
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Save to localStorage whenever formData changes (after mount)
  useEffect(() => {
    if (!isMountedRef.current) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          timestamp: new Date().toISOString(),
        })
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedNotification(true);
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      notificationTimeoutRef.current = setTimeout(() => {
        setSavedNotification(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [formData]);

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

    const submitWithRetry = async (retryCount = 0): Promise<void> => {
      const FETCH_TIMEOUT = 10000; // 10 segundos para envio
      const MAX_RETRIES = 2;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

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
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Erro ao processar");
        }

        // Obter o total de participações da resposta
        if (data.total) {
          setParticipationNumber(data.total);
        }

        setIsLoading(false);
        nextStep("confirmation");
      } catch (err) {
        clearTimeout(timeoutId);

        // Log technical error only
        console.error("[Form] Submission error:", err);

        // Retry logic
        if (retryCount < MAX_RETRIES) {
          console.log(`[Form] Retry attempt ${retryCount + 1}/${MAX_RETRIES}`);
          const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 3000);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          return submitWithRetry(retryCount + 1);
        }

        // User-friendly error message only
        setIsLoading(false);
        setError("Não foi possível enviar sua resposta agora. Por favor, tente novamente.");
        throw err;
      }
    };

    try {
      await submitWithRetry();
    } catch (err) {
      // Error already set in catch block above
      throw err;
    }
  }, [formData, nextStep]);

  const reset = useCallback(() => {
    setStep("start");
    const freshData = {
      estado: "RJ",
      municipio: "",
      resposta_categoria: "",
    };
    setFormData(freshData);
    setError(null);
    setIsLoading(false);
    setSavedNotification(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear localStorage:", err);
    }
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
    savedNotification,
  };
}
