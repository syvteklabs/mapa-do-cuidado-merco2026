import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import HeroMap from "@/components/HeroMap";
import ProofOfMovement from "@/components/ProofOfMovement";
import HowItWorks from "@/components/HowItWorks";
import ResearchAndInnovation from "@/components/ResearchAndInnovation";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero Section - Two Column */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Seal/Badge */}
              <div className="inline-block">
                <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-xs sm:text-sm font-semibold text-gray-700 tracking-wider">
                  MAPA DO CUIDADO · NOROESTE FLUMINENSE
                </div>
              </div>

              {/* Main Headline - Territorial & Human */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  O cuidado acontece no território.
                  <br />
                  Sua experiência ajuda a enxergá-lo.
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Compartilhe, de forma rápida e anônima, como você percebe os caminhos do cuidado no Noroeste Fluminense e ajude a construir um retrato coletivo da região.
                </p>
              </div>

              {/* CTAs with Microcopy */}
              <div className="flex flex-col gap-4 pt-2">
                {/* Primary CTA */}
                <div className="space-y-2">
                  <Button href="/participar" variant="primary" className="text-base sm:text-lg py-4 px-6 w-full sm:w-auto">
                    Compartilhar minha experiência
                  </Button>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Leva cerca de 2 minutos. Nenhum dado pessoal ou clínico é solicitado.
                  </p>
                </div>

                {/* Secondary CTA */}
                <Button href="/mapa" variant="secondary" className="text-base sm:text-lg py-3 px-6 w-full sm:w-auto">
                  Explorar o mapa
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Confidencial</span> •
                  <span className="font-semibold ml-2">Rápido</span> •
                  <span className="font-semibold ml-2">Sem dados clínicos</span>
                </p>
              </div>
            </div>

            {/* Right Column - Visual Map */}
            <div className="hidden lg:block h-96 lg:h-full min-h-[400px]">
              <HeroMap />
            </div>
          </div>
        </section>

        {/* Mobile Map - Show on small screens */}
        <section className="lg:hidden max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
          <div className="h-72 sm:h-96">
            <HeroMap />
          </div>
        </section>

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
