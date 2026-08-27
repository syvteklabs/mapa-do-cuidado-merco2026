"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import HeroMap from "@/components/HeroMap";
import HowItWorks from "@/components/HowItWorks";
import ResearchAndInnovation from "@/components/ResearchAndInnovation";
import PersistentMobileCTA from "@/components/PersistentMobileCTA";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero Section - Two Column */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Main Headline - Human & Compelling */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Como foi seu caminho para conseguir cuidado na sua cidade?
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Em cerca de 2 minutos, você compartilha sua experiência e ajuda a construir um retrato coletivo do cuidado no Noroeste Fluminense.
                </p>
              </div>

              {/* Protection Information */}
              <div className="border-2 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🔒</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Participação protegida</h3>
                    <p className="text-sm text-gray-700">
                      Não solicitamos nome, telefone ou informações clínicas. Os resultados são apresentados apenas de forma coletiva.
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
                  Explorar o mapa
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

        {/* How It Works - Three step process */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <HowItWorks />
        </section>

        {/* Research and Innovation */}
        <ResearchAndInnovation />
      </main>
      <PersistentMobileCTA />
      <Footer />
    </div>
  );
}
