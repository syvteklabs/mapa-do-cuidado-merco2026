"use client";

import { useEffect, useState } from "react";
import { IconLive } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface LiveActivationBadgeProps {
  isDemoMode?: boolean;
}

export default function LiveActivationBadge({
  isDemoMode = false,
}: LiveActivationBadgeProps) {
  const [count, setCount] = useState<number>(5);

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
      }
    };
    fetchCount();
  }, []);

  const experienceText =
    count === 1 ? "experiência já faz" : "experiências já fazem";

  return (
    <div className="flex flex-col gap-4">
      {/* Live Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 w-fit">
        <IconLive size={12} color={colors.error[600]} />
        <span className="text-sm font-semibold text-blue-700">
          Experiência ao vivo na Merco Noroeste 2026
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
