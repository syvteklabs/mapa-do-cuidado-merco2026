import { useEffect, useState, useCallback } from "react";

export interface ContribuicoesStatsData {
  total: number;
  byState: Record<string, number>;
  byMunicipio: Record<string, number>;
  byCategory: Record<string, number>;
}

const FETCH_TIMEOUT = 8000; // 8 segundos
const POLLING_INTERVAL = 30000; // 30 segundos
const MAX_RETRIES = 2;

export function useMovementStats() {
  const [stats, setStats] = useState<ContribuicoesStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatsWithTimeout = useCallback(async (controller: AbortController) => {
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    try {
      const response = await fetch("/api/contribuicoes", {
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
        setStats(data.data);
        setError(null);
        return true;
      } else {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }, []);

  const performFetch = useCallback(async () => {
    const controller = new AbortController();

    const tryFetch = async (attempt: number): Promise<void> => {
      try {
        await fetchStatsWithTimeout(controller);
      } catch (err) {
        console.error("[Stats] Error fetching data:", err);

        if (attempt < MAX_RETRIES) {
          console.log(`[Stats] Retry attempt ${attempt + 1}/${MAX_RETRIES}`);
          const backoffDelay = Math.min(1000 * Math.pow(2, attempt), 5000);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          return tryFetch(attempt + 1);
        } else {
          setError("Não foi possível atualizar os dados agora. Você ainda pode participar normalmente.");
          setLoading(false);
        }
      }
    };

    return tryFetch(0);
  }, [fetchStatsWithTimeout]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    performFetch();

    const interval = setInterval(() => {
      performFetch();
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [performFetch]);

  return {
    stats,
    loading,
    error,
    retryFetch: () => {
      setLoading(true);
      setError(null);
      performFetch();
    },
  };
}
