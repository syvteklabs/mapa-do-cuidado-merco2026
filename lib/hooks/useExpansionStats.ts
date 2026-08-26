import { useEffect, useState } from "react";

export interface ExpansionStatsData {
  total: number;
  uniqueCities: number;
  byCity: Array<{
    city: string;
    count: number;
  }>;
}

export function useExpansionStats() {
  const [stats, setStats] = useState<ExpansionStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const POLLING_INTERVAL = 30000; // 30 segundos

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/expansao-stats");
        if (!response.ok) throw new Error("Falha ao carregar dados de expansão");
        const data = await response.json();

        if (data.success && data.data) {
          setStats(data.data);
        }

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar dados de expansão"
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
