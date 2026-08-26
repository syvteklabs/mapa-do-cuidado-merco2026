import { useEffect, useState, useCallback } from "react";
import { getDataMode, DEMO_METRICS } from "@/lib/config";

export interface PublicMapMetrics {
  totalParticipacoes: number;
  participacoesNoroeste: number;
  municipiosAtivos: number;
  totalMunicipios: 13;
  temasIdentificados: number;
  ultimaAtualizacao: string;
  tipoDados: "real" | "demonstracao" | "indisponivel";
}

const FETCH_TIMEOUT = 8000; // 8 segundos
const POLLING_INTERVAL = 30000; // 30 segundos
const MAX_RETRIES = 2;

export function usePublicMapMetrics() {
  const [metrics, setMetrics] = useState<PublicMapMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetricsWithTimeout = useCallback(
    async (controller: AbortController) => {
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

      try {
        const response = await fetch("/api/metrics", {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          setMetrics(data.data);
          setError(null);
          return true;
        } else {
          throw new Error("Resposta inválida do servidor");
        }
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    },
    []
  );

  const performFetch = useCallback(async () => {
    const controller = new AbortController();

    const tryFetch = async (attempt: number): Promise<void> => {
      try {
        await fetchMetricsWithTimeout(controller);
      } catch (err) {
        console.error("[Metrics] Error fetching data:", err);

        if (attempt < MAX_RETRIES) {
          console.log(`[Metrics] Retry attempt ${attempt + 1}/${MAX_RETRIES}`);
          const backoffDelay = Math.min(1000 * Math.pow(2, attempt), 5000);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          return tryFetch(attempt + 1);
        } else {
          setError(
            "Não foi possível atualizar os dados agora. Você ainda pode participar normalmente."
          );
          setLoading(false);
        }
      }
    };

    return tryFetch(0);
  }, [fetchMetricsWithTimeout]);

  useEffect(() => {
    const dataMode = getDataMode();

    // If demo mode, use fixed demo data
    if (dataMode === "demo") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMetrics(DEMO_METRICS);
      setLoading(false);
      setError(null);
      return;
    }

    // If empty mode, show empty state
    if (dataMode === "empty") {
      setMetrics(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Real mode: fetch from API
    setLoading(true);
    setError(null);

    performFetch();

    const interval = setInterval(() => {
      performFetch();
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [performFetch]);

  return {
    metrics,
    loading,
    error,
    retryFetch: () => {
      setLoading(true);
      setError(null);
      performFetch();
    },
  };
}
