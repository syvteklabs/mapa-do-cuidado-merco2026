import { useEffect, useState } from "react";

export interface ContribuicoesStatsData {
  total: number;
  byState: Record<string, number>;
  byMunicipio: Record<string, number>;
  byCategory: Record<string, number>;
}

export function useMovementStats() {
  const [stats, setStats] = useState<ContribuicoesStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const POLLING_INTERVAL = 30000; // 30 segundos

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contribuicoes");
        if (!response.ok) throw new Error("Falha ao carregar dados de movimento");
        const data = await response.json();

        if (data.success && data.data) {
          setStats(data.data);
          setError(null);
        } else {
          setError(data.error || "Erro ao carregar dados");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar dados de movimento"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    loading,
    error,
  };
}
