"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ProofOfMovement from "@/components/ProofOfMovement";
import HowItWorks from "@/components/HowItWorks";
import ResearchAndInnovation from "@/components/ResearchAndInnovation";
import LiveActivationBadge from "@/components/LiveActivationBadge";
import LiveActivityBar from "@/components/LiveActivityBar";
import PersistentMobileCTA from "@/components/PersistentMobileCTA";

const OpenStreetMapView = dynamic(() => import("@/components/OpenStreetMapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
      <p className="text-gray-600">Carregando mapa...</p>
    </div>
  ),
});

interface StatsData {
  total: number;
  byMunicipio: Record<string, number>;
}

export default function Home() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

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
            setIsDemoMode(false);
          }
        }
      } catch {
        setIsDemoMode(true);
        setStats({ total: 0, byMunicipio: {} });
      }
    };
    fetchStats();
  }, []);

  const getParticipationMessage = () => {
    if (!stats) return "Convidamos você a compartilhar sua experiência.";
    if (stats.total === 0) return "Seja o primeiro a contribuir.";
    if (stats.total === 1) return "Uma pessoa já começou a compartilhar.";
    return `${stats.total} pessoas já compartilharam suas experiências.`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content Column */}
            <div className="space-y-6">
              <LiveActivationBadge isDemoMode={isDemoMode} />

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Como foi buscar cuidado na sua cidade?
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Em 2 minutos, sua experiência entra no Mapa do Cuidado e ajuda a revelar os caminhos do Noroeste Fluminense.
                </p>
              </div>

              {/* Compact Info Card */}
              <div className={`border-2 rounded-lg p-5 space-y-3 ${
                isDemoMode
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200"
              }`}>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{getParticipationMessage()}</span>
                  {isDemoMode && " (dados de demonstração)"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">🔒 Protegido:</span> Sem nome, telefone ou dados clínicos. Resultados apenas agregados.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button href="/participar" variant="primary" className="text-base py-3 px-6">
                  Compartilhar experiência
                </Button>
                <Button href="/mapa" variant="secondary" className="text-base py-3 px-6">
                  Ver mapa
                </Button>
              </div>
            </div>

            {/* Map Column */}
            <div className="hidden lg:block h-96 lg:h-full min-h-96">
              <OpenStreetMapView stats={stats?.byMunicipio} />
            </div>
          </div>
        </section>

        {/* Mobile Map */}
        <section className="lg:hidden max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          <div className="h-64 sm:h-80">
            <OpenStreetMapView stats={stats?.byMunicipio} />
          </div>
        </section>

        <LiveActivityBar />

        {/* Secondary Sections */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <ProofOfMovement />
        </section>

        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <HowItWorks />
        </section>

        <ResearchAndInnovation />
      </main>
      <PersistentMobileCTA />
      <Footer />
    </div>
  );
}
