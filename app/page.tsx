"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import HeroMap from "@/components/HeroMap";
import ContextAndTrustBar from "@/components/ContextAndTrustBar";
import ProofOfMovement from "@/components/ProofOfMovement";
import HowItWorks from "@/components/HowItWorks";
import ResearchAndInnovation from "@/components/ResearchAndInnovation";

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
        {/* Hero Section - Territorial Identity */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Regional Seal */}
              <div className="inline-block">
                <p className="text-sm font-semibold text-gray-700 tracking-wide">
                  MAPA DO CUIDADO • NOROESTE FLUMINENSE
                </p>
              </div>

              {/* Main Headline - Territorial & Human */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  O cuidado acontece no território.
                  <br />
                  Sua experiência ajuda a enxergá-lo.
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-md">
                  Compartilhe, de forma rápida e anônima, como você percebe os caminhos do cuidado no Noroeste Fluminense e ajude a construir um retrato coletivo da região.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Primary CTA - Highlighted */}
                <Button href="/participar" variant="primary" className="text-base sm:text-lg py-4 px-6 font-semibold">
                  Compartilhar minha experiência
                </Button>
                {/* Secondary CTA */}
                <Button href="/mapa" variant="secondary" className="text-base sm:text-lg py-4 px-6">
                  Explorar o mapa
                </Button>
              </div>

              {/* Microcopy */}
              <div className="text-sm text-gray-600 border-l-4 border-indigo-300 pl-4">
                <p>
                  <span className="font-semibold">Leva cerca de 2 minutos.</span> Nenhum dado pessoal ou clínico é solicitado.
                </p>
              </div>
            </div>

            {/* Right Column - Territorial Map */}
            <div className="hidden lg:block h-96 lg:h-full min-h-96">
              <HeroMap stats={stats} />
            </div>
          </div>
        </section>

        {/* Mobile Map - Show on small screens */}
        <section className="lg:hidden max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
          <div className="h-72 sm:h-80">
            <HeroMap stats={stats} />
          </div>
        </section>

        {/* Context and Trust Bar - Immediate below hero */}
        <ContextAndTrustBar />

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
