"use client";

import { useEffect, useState } from "react";

interface StatsData {
  total: number;
  byMunicipio?: Record<string, number>;
}

/**
 * Central hook for determining if we're in demo mode.
 * Demo mode is ON when:
 * 1. The API fails to connect to Supabase
 * 2. OR the database returns 0 responses (no real data yet)
 *
 * This ensures consistent demo/live indication across all pages.
 */
export function useDemoMode() {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contribuicoes", {
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();

        // Check if API returned demo flag or if total is 0
        const isDemo = data.isDemoMode || data.data?.total === 0 || !data.data;

        setStats(data.data || null);
        setIsDemoMode(isDemo);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        // If API call fails entirely, we're definitely in demo mode
        setIsDemoMode(true);
        setStats(null);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    isDemoMode,
    stats,
    isLoading,
    error,
  };
}
