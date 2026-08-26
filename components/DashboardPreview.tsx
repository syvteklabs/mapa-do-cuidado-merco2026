"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  total: number;
  byState: Record<string, number>;
  byCategory: Record<string, number>;
}

export default function DashboardPreview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contribuicoes");
        if (!response.ok) throw new Error("Falha ao carregar dados");
        const data = await response.json();
        setStats(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar dados"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
            ← Voltar
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Mapa do Cuidado
          </h1>
          <p className="text-xl text-gray-600">
            Dados agregados e anônimos das experiências compartilhadas
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <p className="text-red-700">Erro ao carregar dados: {error}</p>
          </div>
        )}

        {stats && (
          <div className="space-y-12">
            {/* Total Contributions */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-8">
              <div className="text-center">
                <p className="text-sm font-semibold text-blue-700 mb-2">
                  PARTICIPAÇÕES REGISTRADAS
                </p>
                <p className="text-5xl font-bold text-blue-900">
                  {stats.total}
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  histórias de cuidado compartilhadas
                </p>
              </div>
            </div>

            {/* By State */}
            {Object.keys(stats.byState).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Por Estado
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Object.entries(stats.byState).map(([state, count]) => (
                    <div
                      key={state}
                      className="bg-white border border-gray-300 rounded-lg p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-gray-900">
                        {count}
                      </p>
                      <p className="text-sm font-semibold text-gray-600">{state}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* By Category */}
            {Object.keys(stats.byCategory).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Experiências Compartilhadas
                </h2>
                <div className="space-y-4">
                  {Object.entries(stats.byCategory)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count]) => {
                      const percentage =
                        stats.total > 0
                          ? Math.round((count / stats.total) * 100)
                          : 0;
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <p className="text-sm font-semibold text-gray-900 flex-1 line-clamp-2">
                              {category}
                            </p>
                            <p className="text-lg font-bold text-blue-600">
                              {count}
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 text-right">
                            {percentage}%
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {stats.total === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">
                  Nenhuma participação registrada ainda.
                </p>
                <Link
                  href="/participar"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold"
                >
                  Seja o Primeiro a Participar
                </Link>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        {stats && stats.total > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/participar"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Compartilhar Sua Experiência
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 px-4 py-6 text-center text-xs text-gray-500">
        <p>
          Dados agregados e anônimos. Nenhuma informação pessoal é armazenada.
        </p>
        <p className="mt-2">
          Uma experiência da SyVtek Care para a Merco Noroeste 2026
        </p>
      </footer>
    </div>
  );
}
