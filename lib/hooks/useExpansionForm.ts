import { useState, useCallback } from "react";
import { CreateExpansaoRequest } from "@/types/database";

export interface ExpansionFormData {
  nome: string;
  cidade: string;
  estado: string;
  contato_whatsapp: string;
  contato_email: string;
  tipo_participante: string;
  consentimento_contato: boolean;
}

export type ExpansionStep = "form" | "confirmation";

export function useExpansionForm() {
  const [step, setStep] = useState<ExpansionStep>("form");
  const [formData, setFormData] = useState<ExpansionFormData>({
    nome: "",
    cidade: "",
    estado: "RJ",
    contato_whatsapp: "",
    contato_email: "",
    tipo_participante: "",
    consentimento_contato: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = useCallback(
    (field: keyof ExpansionFormData, value: string | boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
    },
    []
  );

  const submitForm = useCallback(async () => {
    if (!formData.cidade || !formData.estado) {
      setError("Cidade e estado são obrigatórios");
      return false;
    }

    if (!formData.contato_whatsapp && !formData.contato_email) {
      setError("Forneça ao menos WhatsApp ou e-mail para contato");
      return false;
    }

    if (formData.contato_email && !formData.contato_email.includes("@")) {
      setError("E-mail inválido");
      return false;
    }

    if (!formData.consentimento_contato) {
      setError("Você precisa autorizar o contato");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload: CreateExpansaoRequest = {
        nome: formData.nome,
        cidade: formData.cidade,
        estado: formData.estado,
        contato_whatsapp: formData.contato_whatsapp || undefined,
        contato_email: formData.contato_email || undefined,
        tipo_participante: formData.tipo_participante || undefined,
        consentimento_contato: true,
      };

      const response = await fetch("/api/expansao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao registrar interesse");
      }

      setStep("confirmation");
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao registrar interesse";
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  }, [formData]);

  const reset = useCallback(() => {
    setStep("form");
    setFormData({
      nome: "",
      cidade: "",
      estado: "RJ",
      contato_whatsapp: "",
      contato_email: "",
      tipo_participante: "",
      consentimento_contato: false,
    });
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    step,
    formData,
    isLoading,
    error,
    updateFormData,
    submitForm,
    reset,
    setStep,
  };
}
