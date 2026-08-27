"use client";

import { useEffect, useState } from "react";
import { IconAlert, IconSuccess, IconChart } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface AdminStatus {
  supabase: {
    status: "online" | "offline" | "error";
    lastCheck: string;
    responseTime: number;
  };
  data: {
    totalToday: number;
    totalAllTime: number;
    pendingSubmissions: number;
    lastResponseReceived: {
      timestamp: string;
      municipio: string;
      status: "success" | "error";
    } | null;
    recentErrors: Array<{
      timestamp: string;
      error: string;
      count: number;
    }>;
  };
  tablets: {
    active: number;
    lastActivity: string | null;
  };
}

export default function AdminDashboard() {
  const [status, setStatus] = useState<AdminStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [hideInvalid, setHideInvalid] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/admin/status");
      if (!response.ok) throw new Error("Failed to fetch status");
      const data = await response.json();
      setStatus(data);
      setError(null);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleExport = async (format: "csv" | "json") => {
    try {
      const response = await fetch("/api/admin/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, includeInvalid: !hideInvalid }),
      });

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mapa-do-cuidado-export.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erro ao exportar dados: " + (err instanceof Error ? err.message : "Erro desconhecido"));
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const supabaseOnline = status?.supabase.status === "online";
  const hasErrors = status?.data.recentErrors.length ? true : false;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconChart size={32} color={colors.primary[600]} />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Painel de Operação
            </h1>
          </div>
          <button
            onClick={fetchStatus}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Atualizar agora
          </button>
        </div>
        <p className="text-gray-600">
          Última atualização: {lastRefresh ? lastRefresh.toLocaleTimeString("pt-BR") : "Nunca"}
        </p>
      </div>

      {/* Status Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-3">
          <IconAlert size={20} color={colors.error[600]} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 mb-1">Erro ao conectar</p>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Supabase Status */}
      {status && (
        <div className={`border rounded-lg p-6 ${
          supabaseOnline
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-start gap-3">
            {supabaseOnline ? (
              <IconSuccess size={20} color={colors.success[600]} className="flex-shrink-0 mt-0.5" />
            ) : (
              <IconAlert size={20} color={colors.error[600]} className="flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className={`font-semibold mb-2 ${
                supabaseOnline ? "text-green-900" : "text-red-900"
              }`}>
                Status do Supabase
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {status.supabase.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Tempo de resposta</p>
                  <p className="font-semibold text-gray-900">
                    {status.supabase.responseTime}ms
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Última verificação</p>
                  <p className="font-semibold text-gray-900 text-xs">
                    {new Date(status.supabase.lastCheck).toLocaleTimeString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Metrics Grid */}
      {status && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Today */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Enviado hoje</p>
            <p className="text-4xl font-bold text-blue-600">
              {status.data.totalToday}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {status.data.totalAllTime} no total
            </p>
          </div>

          {/* Pending Submissions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Expansões registradas</p>
            <p className="text-4xl font-bold text-teal-600">
              {status.data.pendingSubmissions}
            </p>
            <p className="text-xs text-gray-500 mt-2">Interesse em novos territórios</p>
          </div>

          {/* Active Tablets */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Tablets ativos</p>
            <p className="text-4xl font-bold text-amber-600">
              {status.tablets.active}
            </p>
            <p className="text-xs text-gray-500 mt-2">Últimas 24 horas</p>
          </div>

          {/* System Health */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Saúde do sistema</p>
            <p className={`text-4xl font-bold ${
              hasErrors ? "text-red-600" : "text-green-600"
            }`}>
              {hasErrors ? "⚠" : "✓"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {hasErrors
                ? `${status.data.recentErrors.length} erro(s) recente(s)`
                : "Sem erros"}
            </p>
          </div>
        </div>
      )}

      {/* Last Response & Errors */}
      {status && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Last Response */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Última resposta recebida</h3>
            {status.data.lastResponseReceived ? (
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Município</p>
                  <p className="font-semibold text-gray-900">
                    {status.data.lastResponseReceived.municipio}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Horário</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(status.data.lastResponseReceived.timestamp).toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">Nenhuma resposta recebida ainda</p>
            )}
          </div>

          {/* Recent Errors */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Erros recentes</h3>
            {status.data.recentErrors.length > 0 ? (
              <div className="space-y-3 text-sm">
                {status.data.recentErrors.map((err, idx) => (
                  <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                    <p className="font-semibold text-red-700">{err.error}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(err.timestamp).toLocaleTimeString("pt-BR")} ({err.count}x)
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">Sem erros registrados</p>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-gray-900">Controles</h3>

        <div className="space-y-3">
          {/* Refresh Interval */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Intervalo de atualização (segundos)
            </label>
            <select
              value={refreshInterval / 1000}
              onChange={(e) => setRefreshInterval(parseInt(e.target.value) * 1000)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10 segundos</option>
              <option value="30">30 segundos</option>
              <option value="60">1 minuto</option>
              <option value="300">5 minutos</option>
            </select>
          </div>

          {/* Demo Mode */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={demoMode}
              onChange={(e) => setDemoMode(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-semibold text-gray-700">
              Modo demonstração (dados exemplo)
            </span>
          </label>

          {/* Hide Invalid Data */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hideInvalid}
              onChange={(e) => setHideInvalid(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-semibold text-gray-700">
              Ocultar dados inválidos (na exportação)
            </span>
          </label>
        </div>

        {/* Export Buttons */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Exportação controlada</p>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport("csv")}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-colors text-sm"
            >
              Exportar CSV
            </button>
            <button
              onClick={() => handleExport("json")}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm"
            >
              Exportar JSON
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Exportações incluem apenas dados agregados, sem respostas individuais ou chaves.
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex gap-3">
          <IconAlert size={20} color={colors.warning[600]} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Aviso de segurança</p>
            <p className="text-sm text-amber-800">
              Este painel é apenas para membros da equipe. Nunca exponha chaves de API, senhas ou dados individuais. Todas as operações são auditadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
