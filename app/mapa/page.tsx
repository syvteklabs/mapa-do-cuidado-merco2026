import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mapa do Cuidado
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Esta página será implementada nos próximos cards.
          </p>
          <p className="text-gray-500 mb-8">
            Aqui você verá o mapa interativo e o painel com dados agregados das
            respostas.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
