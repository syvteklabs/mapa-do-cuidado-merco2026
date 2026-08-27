"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import HeroMap from "@/components/HeroMap";
import ProofOfMovement from "@/components/ProofOfMovement";
import HowItWorks from "@/components/HowItWorks";
import ResearchAndInnovation from "@/components/ResearchAndInnovation";
import LiveActivationBadge from "@/components/LiveActivationBadge";
import LiveActivityBar from "@/components/LiveActivityBar";

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
    if (stats.total === 0) return "Seja o primeiro a contribuir e ajude a mapear os caminhos do cuidado.";
    if (stats.total === 1) return "Uma pessoa já começou a compartilhar. Sua contribuição ajuda a construir um mapa mais completo.";
    return `${stats.total} ${stats.total === 1 ? "pessoa já começou" : "pessoas já começaram"} a compartilhar suas experiências. Cada contribuição nos ajuda a enxergar melhor os caminhos do cuidado.`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero Section - Two Column */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Live Activation Badge */}
              <LiveActivationBadge isDemoMode={isDemoMode} />

              {/* Main Headline - Human & Compelling */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Como foi buscar cuidado na sua cidade?
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Em 2 minutos, sua experiência entra no Mapa do Cuidado e ajuda a revelar os caminhos do Noroeste Fluminense.
                </p>
              </div>

              {/* Results & Impact - Show what participation achieves */}
              <div className={`border-2 rounded-lg p-6 space-y-4 ${
                isDemoMode
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200"
              }`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📊</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {isDemoMode ? "Exemplo de participação" : "Sua experiência ajuda a revelar o território"}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {getParticipationMessage()}
                      {isDemoMode && " (dados de demonstração)"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🔒</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Participação protegida</h3>
                    <p className="text-sm text-gray-700">
                      Não solicitamos nome, telefone, contato ou informação clínica. As respostas aparecem apenas de forma agrupada no mapa.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Primary CTA */}
                <Button href="/participar" variant="primary" className="text-base sm:text-lg py-4 px-6">
                  Compartilhar minha experiência
                </Button>
                {/* Secondary CTA */}
                <Button href="/mapa" variant="secondary" className="text-base sm:text-lg py-4 px-6">
                  Ver o mapa sendo construído
                </Button>
              </div>

              {/* Trust indicator */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">✓ Sem nome ou contato</span> •
                  <span className="font-semibold ml-1">Participação voluntária</span> •
                  <span className="font-semibold ml-1">Resultados agregados</span>
                </p>
              </div>
            </div>

            {/* Right Column - Visual Map */}
            <div className="hidden lg:block h-96 lg:h-full min-h-96">
              <HeroMap />
            </div>
          </div>
        </section>

        {/* Mobile Map - Show on small screens */}
        <section className="lg:hidden max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
          <div className="h-64 sm:h-80">
            <HeroMap />
          </div>
        </section>

        {/* Live Activity Bar */}
        <LiveActivityBar />

        {/* Proof of Movement - Live engagement stats */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <ProofOfMovement />
        </section>

        {/* How It Works - Three step process */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <HowItWorks />
        </section>

        {/* Research and Innovation */}
        <ResearchAndInnovation />

        {/* Brand Footer */}
        <section className="bg-gradient-to-r from-gray-50 to-indigo-50 border-t border-gray-200 py-8 mt-8">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-700 font-medium">
              Uma experiência da <span className="text-indigo-700 font-bold">SyVtek Care</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Merco Noroeste Fluminense 2026
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
