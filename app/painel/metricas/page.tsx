import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export default function MetricasPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Painel de Métricas</h1>
          <p className="text-sm text-gray-600 mt-1">Acompanhe a ativação do Mapa do Cuidado em tempo real</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnalyticsDashboard days={7} />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 px-4 py-6 text-center text-xs text-gray-500 mt-12">
        <p>Painel de metricas - Apenas dados agregados, nenhuma informação pessoal</p>
      </footer>
    </div>
  );
}
