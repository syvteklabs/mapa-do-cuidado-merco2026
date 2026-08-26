"use client";

import DashboardHeader from "@/components/DashboardHeader";
import MunicipalityAndThemesTabs from "@/components/MunicipalityAndThemesTabs";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapContent = dynamic(() => import("@/components/MapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-600">Carregando mapa...</p>
      </div>
    </div>
  ),
});

interface DashboardStats {
  total: number;
  byMunicipio: Record<string, number>;
  byCategory?: Record<string, Record<string, number>>;
}

export default function MapPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

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
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Map Section */}
        <div className="h-96 sm:h-[500px] lg:h-screen lg:max-h-[600px] overflow-hidden border-b border-gray-200">
          <MapContent
            municipiosStats={stats?.byMunicipio || {}}
            municipiosCategories={stats?.byCategory}
            dataView="participations"
          />
        </div>

        {/* Tabs Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <MunicipalityAndThemesTabs
            municipiosStats={stats?.byMunicipio || {}}
            municipiosCategories={stats?.byCategory || {}}
          />
        </div>
      </main>
    </div>
  );
}
