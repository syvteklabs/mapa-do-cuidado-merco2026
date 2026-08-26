"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import HeroMap from "@/components/HeroMap";
import ProofOfMovement from "@/components/ProofOfMovement";
import HowItWorks from "@/components/HowItWorks";
import MapCallToAction from "@/components/MapCallToAction";
import ExpansionCallToAction from "@/components/ExpansionCallToAction";
import ResearchAndInnovation from "@/components/ResearchAndInnovation";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero Section - Two Column */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Sua experiência importa no cuidado
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Responda anonimamente em 2 minutos e ajude a revelar os caminhos do cuidado no Noroeste Fluminense.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/participar" variant="primary" className="text-base sm:text-lg py-3 px-6">
                  Participar agora
                </Button>
                <Button href="/mapa" variant="secondary" className="text-base sm:text-lg py-3 px-6">
                  Ver o mapa
                </Button>
              </div>

              {/* Trust indicator */}
              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  Sem nome, contato ou informação clínica.
                </p>
              </div>
            </div>

            {/* Right Column - Visual Map */}
            <div className="hidden lg:block h-80 lg:h-full min-h-80">
              <HeroMap />
            </div>
          </div>
        </section>

        {/* Mobile Map - Show on small screens */}
        <section className="lg:hidden max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
          <div className="h-64 sm:h-72">
            <HeroMap />
          </div>
        </section>

        {/* Proof of Movement - Live engagement stats */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <ProofOfMovement />
        </section>

        {/* How It Works - Three step process */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <HowItWorks />
        </section>

        {/* Map Call to Action */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <MapCallToAction />
        </section>

        {/* Expansion Call to Action */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <ExpansionCallToAction />
        </section>

        {/* Research and Innovation */}
        <ResearchAndInnovation />
      </main>
      <Footer />
    </div>
  );
}
