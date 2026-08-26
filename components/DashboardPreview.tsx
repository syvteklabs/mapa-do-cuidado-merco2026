"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  total: number;
  byMunicipio: Record<string, number>;
  byCategory: Record<string, number>;
}

export default function DashboardPreview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
            setError(false);
          }
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Os dados já falam
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg h-64 sm:h-80 animate-pulse border border-gray-200" />
            </div>
            {/* Stats skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-8 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state - No data yet
  if (!stats || stats.total === 0) {
    return (
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Os dados já falam
            </h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl">
              Seja o primeiro a contribuir e ajude a revelar os padrões do cuidado no Noroeste Fluminense.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8 sm:p-12 text-center">
            <p className="text-gray-600 mb-6">
              Nenhuma participação ainda. Compartilhe sua experiência e seja parte dessa construção coletiva.
            </p>
            <Link
              href="/participar"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compartilhar minha experiência
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Error state - Neutral display
  if (error) {
    return (
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Os dados já falam
          </h2>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-600">
              Explorar dados agregados e descobrir os padrões do cuidado no seu município.
            </p>
            <Link
              href="/mapa"
              className="inline-block mt-6 bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Explorar o mapa
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Calculate derived data
  const municipiosCount = Object.keys(stats.byMunicipio).length;
  const topCategory = Object.entries(stats.byCategory).sort(
    ([, a], [, b]) => b - a
  )[0];
  const topCategoryName = topCategory ? topCategory[0] : "—";

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Os dados já falam
          </h2>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl">
            Participações agregadas revelando padrões sobre os caminhos do cuidado no Noroeste Fluminense.
          </p>
        </div>

        {/* Layout - Map and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Map Preview */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg aspect-video sm:aspect-square lg:aspect-auto lg:h-80 flex items-center justify-center">
              <div className="text-center space-y-3">
                <p className="text-gray-600">Mapa territorial do Noroeste</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
                <p className="text-sm text-gray-600">participações mapeadas</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Visualização dos pontos de participação por município
            </p>
          </div>

          {/* Right: Statistics */}
          <div className="space-y-6">
            {/* Total Participations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-2">Total de participações</p>
              <p className="text-4xl font-bold text-indigo-600">{stats.total}</p>
            </div>

            {/* Municipalities with participation */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-2">Municípios participando</p>
              <p className="text-4xl font-bold text-indigo-600">{municipiosCount}</p>
              <p className="text-xs text-gray-500 mt-2">de 13 municípios</p>
            </div>

            {/* Most mentioned theme */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-2">Tema mais mencionado</p>
              <p className="text-lg font-semibold text-gray-900 truncate">
                {topCategoryName}
              </p>
              {topCategory && (
                <p className="text-xs text-gray-500 mt-2">
                  {topCategory[1]} {topCategory[1] === 1 ? "menção" : "menções"}
                </p>
              )}
            </div>

            {/* Last Update */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-2">Última atualização</p>
              <p className="text-sm font-medium text-gray-900">Agora</p>
              <p className="text-xs text-gray-500 mt-2">Dados em tempo real</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Link
            href="/mapa"
            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Explorar os dados agregados
          </Link>
        </div>
      </div>
    </section>
  );
}
