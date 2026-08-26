import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Sua experiência pode transformar o cuidado em nossa região.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Participe de uma escuta rápida, voluntária e anônima sobre os
            caminhos do cuidado no Noroeste Fluminense.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 inline-block">
            <p className="text-sm text-blue-900">
              As respostas serão apresentadas de forma agregada e não
              identificam os participantes.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button href="/participar" variant="primary">
            Compartilhar minha experiência
          </Button>
          <Button href="/mapa" variant="secondary">
            Ver o Mapa do Cuidado
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Uma experiência da SyVtek Care para a Merco Noroeste 2026</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
