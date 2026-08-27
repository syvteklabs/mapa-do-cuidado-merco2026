import { useState, useCallback, useEffect, useRef } from "react";

export type EventModeStep = "location" | "question" | "sending" | "confirmation";

const EVENT_STORAGE_KEY = "mapa-cuidado-evento-temp";

// Helper to trigger async updates without setState in effect
const scheduleStateUpdates = (callback: () => void) => {
  Promise.resolve().then(callback);
};

export interface EventFormData {
  estado: string;
  municipio: string;
  resposta_categoria: string;
}

const CATEGORIAS = [
  {
    id: "dificuldade-continuar",
    label: "Dificuldade para continuar o tratamento",
    humanLabel: "Achei difícil continuar o tratamento",
  },
  {
    id: "falta-orientacao",
    label: "Falta de orientação",
    humanLabel: "Faltou orientação sobre como buscar ajuda",
  },
  {
    id: "espera-encaminhamento",
    label: "Espera por encaminhamento",
    humanLabel: "Esperei muito por um encaminhamento",
  },
  {
    id: "interrupcao-acompanhamento",
    label: "Interrupção do acompanhamento",
    humanLabel: "Perdi o acompanhamento no caminho",
  },
  {
    id: "mais-apoio",
    label: "Necessidade de mais apoio ao paciente ou à família",
    humanLabel: "Precisei de mais apoio para mim ou minha família",
  },
  {
    id: "outra-percepcao",
    label: "Outra percepção",
    humanLabel: "Outra coisa marcou essa experiência",
  },
];

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

const CIDADES_MERCO = [
  ...MUNICIPIOS_NOROESTE.map((cidade) => ({ uf: "RJ", cidade })),
];

function isFromNoroeste(estado: string, municipio: string): boolean {
  if (estado !== "RJ") return false;
  return MUNICIPIOS_NOROESTE.includes(municipio);
}

export function useEventModeForm() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getInitialFormData = (): EventFormData => {
    return { estado: "RJ", municipio: "", resposta_categoria: "" };
  };

  const [step, setStep] = useState<EventModeStep>("location");
  const [formData, setFormData] = useState<EventFormData>(
    getInitialFormData()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rewardStats, setRewardStats] = useState<{
    total: number;
    municipios: number;
    temas: number;
    themeName?: string;
  } | null>(null);
  const [autoResetCountdown, setAutoResetCountdown] = useState<number | null>(
    null
  );

  // Auto-reset após confirmação
  useEffect(() => {
    if (step !== "confirmation") {
      return;
    }
    if (autoResetCountdown !== null) {
      return;
    }
    const timer = setTimeout(() => setAutoResetCountdown(20), 0);
    return () => clearTimeout(timer);
  }, [step, autoResetCountdown]);

  // Reset when countdown reaches 0
  useEffect(() => {
    if (autoResetCountdown !== 0) return;

    scheduleStateUpdates(() => {
      setStep("location");
      setFormData(getInitialFormData());
      setError(null);
      setIsLoading(false);
      setRewardStats(null);
      setAutoResetCountdown(null);
      try {
        localStorage.removeItem(EVENT_STORAGE_KEY);
        localStorage.removeItem("mapa-cuidado-form-data");
      } catch (err) {
        console.error("Failed to clear localStorage:", err);
      }
    });
  }, [autoResetCountdown]);

  // Countdown timer
  useEffect(() => {
    if (autoResetCountdown === null || autoResetCountdown <= 0) return;

    const timer = setTimeout(() => {
      setAutoResetCountdown(autoResetCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoResetCountdown]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const nextStep = useCallback((nextStepValue: EventModeStep) => {
    setError(null);
    setStep(nextStepValue);
  }, []);

  const updateFormData = useCallback(
    (field: keyof EventFormData, value: string) => {
      setFormData((prev) => {
        return { ...prev, [field]: value };
      });
      setError(null);
    },
    []
  );

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

      // Obter estatísticas atualizadas
      const statsResponse = await fetch("/api/contribuicoes");
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.data) {
          const themeName = CATEGORIAS.find(
            (cat) => cat.id === formData.resposta_categoria
          )?.label;
          setRewardStats({
            total: statsData.data.total || 0,
            municipios: Object.keys(statsData.data.byMunicipio || {}).length,
            temas: Object.keys(statsData.data.byCategory || {}).length,
            themeName,
          });
        }
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
    setStep("location");
    const freshData = {
      estado: "RJ",
      municipio: "",
      resposta_categoria: "",
    };
    setFormData(freshData);
    setError(null);
    setIsLoading(false);
    setRewardStats(null);
    setAutoResetCountdown(null);

    // Limpar localStorage completamente
    try {
      localStorage.removeItem(EVENT_STORAGE_KEY);
      localStorage.removeItem("mapa-cuidado-form-data");
    } catch (err) {
      console.error("Failed to clear localStorage:", err);
    }
  }, []);

  return {
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
    categorias: CATEGORIAS,
    cidades: CIDADES_MERCO,
  };
}
