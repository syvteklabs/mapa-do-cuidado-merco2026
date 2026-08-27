"use client";

import { useEffect, useState } from "react";
import { ConversionFunnel } from "@/lib/analytics/types";
import { IconChart, IconSuccess } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface AnalyticsDashboardProps {
  days?: number;
}

export default function AnalyticsDashboard({ days = 7 }: AnalyticsDashboardProps) {
  const [funnel, setFunnel] = useState<ConversionFunnel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`/api/analytics/metrics?days=${days}`);
        if (!response.ok) throw new Error("Failed to fetch metrics");
        const data = await response.json();
        setFunnel(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar métricas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    // Refresh every 5 minutes
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [days]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !funnel) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800 font-semibold">{error}</p>
      </div>
    );
  }

  const funnelSteps = [
    { label: "Visitaram", value: funnel.viewed, color: "blue" },
    { label: "Iniciaram", value: funnel.started, value2: funnel.start_rate.toFixed(1) },
    { label: "Completaram", value: funnel.completed, value2: funnel.completion_rate.toFixed(1) },
    { label: "Abriram mapa", value: funnel.opened_map, value2: funnel.map_rate.toFixed(1) },
    { label: "Compartilharam", value: funnel.shared, value2: funnel.share_rate.toFixed(1) },
  ];

  const maxValue = Math.max(...funnelSteps.map(s => s.value));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <IconChart size={32} color={colors.primary[600]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Métricas da Ativação
          </h1>
        </div>
        <p className="text-gray-600">
          Últimos {days} dias • Funil de conversão
        </p>
      </div>

      {/* Funnel Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">
          Funil de Conversão
        </h2>

        <div className="space-y-4">
          {funnelSteps.map((step, index) => (
            <div key={index} className="space-y-2">
              {/* Label and metrics */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{step.label}</p>
                  <p className="text-sm text-gray-600">
                    {step.value.toLocaleString()} {step.value === 1 ? "pessoa" : "pessoas"}
                    {step.value2 && ` • ${step.value2}% de conversão`}
                  </p>
                </div>
              </div>

              {/* Bar */}
              <div className="bg-gray-100 rounded-lg h-8 overflow-hidden">
                <div
                  className={`h-full bg-blue-500 transition-all duration-300 flex items-center justify-end pr-3`}
                  style={{
                    width: `${maxValue > 0 ? (step.value / maxValue) * 100 : 0}%`,
                  }}
                >
                  {step.value > 0 && (
                    <span className="text-white text-xs font-bold">
                      {step.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 pt-6 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Taxa de Início</p>
            <p className="text-2xl font-bold text-blue-600">
              {funnel.start_rate.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Taxa de Conclusão</p>
            <p className="text-2xl font-bold text-blue-600">
              {funnel.completion_rate.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Taxa de Mapa</p>
            <p className="text-2xl font-bold text-blue-600">
              {funnel.map_rate.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Taxa de Compartilhamento</p>
            <p className="text-2xl font-bold text-emerald-600">
              {funnel.share_rate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <IconSuccess size={20} color={colors.success[600]} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Dados agregados apenas</p>
            <p className="text-sm text-blue-800">
              Este painel mostra apenas métricas agregadas (eventos e contagens). Nenhum conteúdo de respostas, dados pessoais ou informações clínicas são coletados ou armazenados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
