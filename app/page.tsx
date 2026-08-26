import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import HeroMap from "@/components/HeroMap";
import ContextTrustBar from "@/components/ContextTrustBar";
import ProofOfMovement from "@/components/ProofOfMovement";
import HowItWorks from "@/components/HowItWorks";
import ResearchAndInnovation from "@/components/ResearchAndInnovation";

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
                  Sua experiência importa no cuidado
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Escuta participativa rápida, voluntária e anônima sobre os
                  caminhos do cuidado no Noroeste Fluminense.
                </p>
              </div>

              {/* Results & Impact - Show what participation achieves */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📊</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Seus dados em ação</h3>
                    <p className="text-sm text-gray-700">
                      Mais de 240 histórias já mapearam os caminhos do cuidado. Cada participação nos ajuda a entender melhor as necessidades da região.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🔒</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Privacidade garantida</h3>
                    <p className="text-sm text-gray-700">
                      Respostas apresentadas de forma agregada. Nenhuma informação pessoal é armazenada ou exibida.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Primary CTA */}
                <Button href="/participar" variant="primary" className="text-base sm:text-lg py-4 px-6">
                  Participar agora — leva 2 minutos
                </Button>
                {/* Secondary CTA */}
                <Button href="/mapa" variant="secondary" className="text-base sm:text-lg py-4 px-6">
                  Explorar o mapa
                </Button>
              </div>

              {/* Trust indicator */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">✓ Confidencial</span> •
                  <span className="font-semibold ml-1">Rápido</span> •
                  <span className="font-semibold ml-1">Impacto real</span>
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

        {/* Context & Trust Bar - Cards and trust indicators */}
        <ContextTrustBar />

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
