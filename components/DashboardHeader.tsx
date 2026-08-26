"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  total: number;
  byMunicipio: Record<string, number>;
  byCategory: Record<string, number>;
}

type DataStatus = "loading" | "real" | "empty" | "error";

export default function DashboardHeader() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [status, setStatus] = useState<DataStatus>("loading");
  const [timestamp, setTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contribuicoes", {
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setStats(data.data);
            setTimestamp(new Date());
            setStatus(data.data.total > 0 ? "real" : "empty");
          }
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    fetchStats();
  }, []);

  // Calculate derived metrics
  const totalParticipations = stats?.total || 0;
  const activeMunicipalities = stats
    ? Object.values(stats.byMunicipio).filter((count) => count > 0).length
    : 0;
  const identifiedThemes = stats ? Object.keys(stats.byCategory).length : 0;

  // Format timestamp
  const formattedTime =
    timestamp && status === "real"
      ? timestamp.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  // Status badge
  const getStatusBadge = () => {
    if (status === "loading") return null;
    if (status === "real")
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
          Dados reais
        </span>
      );
    if (status === "empty")
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          Sem participações
        </span>
      );
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-medium text-red-700">
        <span className="w-2 h-2 rounded-full bg-red-600" />
        Dados indisponíveis
      </span>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
          {/* Logo + Title + Status */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
            </div>

            {/* Title Section */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Mapa do Cuidado
              </h1>
              <p className="text-sm text-gray-600">Noroeste Fluminense</p>
            </div>
          </div>

          {/* Status and Last Update */}
          <div className="flex flex-col sm:items-end gap-2">
            <div>{getStatusBadge()}</div>
            {formattedTime && (
              <p className="text-xs text-gray-500">
                Atualizado às {formattedTime}
              </p>
            )}
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Participations */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Participações
            </p>
            <p className="text-3xl font-bold text-indigo-600">
              {totalParticipations}
            </p>
          </div>

          {/* Active Municipalities */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-100">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Municípios ativos
            </p>
            <p className="text-3xl font-bold text-emerald-600">
              {activeMunicipalities}<span className="text-lg text-gray-400">/13</span>
            </p>
          </div>

          {/* Identified Themes */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Temas identificados
            </p>
            <p className="text-3xl font-bold text-amber-600">
              {identifiedThemes}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link
            href="/participar"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            Participar
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
