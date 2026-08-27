"use client";

import { useEffect, useState } from "react";

interface LiveActivationBadgeProps {
  isDemoMode?: boolean;
}

export default function LiveActivationBadge({
  isDemoMode = false,
}: LiveActivationBadgeProps) {
  const [count, setCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/contribuicoes", {
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.total !== undefined) {
            setCount(Math.max(data.data.total, 5));
          }
        }
      } catch {
        setCount(5);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCount();
  }, []);

  const experienceText =
    count === 1 ? "experiência já faz" : "experiências já fazem";

  return (
    <div className="flex flex-col gap-4">
      {/* Live Badge */}
      <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 w-fit">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold text-red-700">
            Experiência ao vivo na Merco Noroeste 2026
          </span>
        </span>
      </div>

      {/* Dynamic Counter */}
      <div className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{count}</span>{" "}
        {experienceText} parte do mapa
        {isDemoMode && " (dados de demonstração)"}
      </div>
    </div>
  );
}
