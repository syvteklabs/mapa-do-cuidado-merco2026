"use client";

import { useEffect, useState, useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { supabaseService } from "@/lib/supabase-service";
import { createClient } from "@/lib/supabase";
import type { DashboardStats, MapaContribuicao } from "@/types/database";
import { getCategoryLabel, getSentimentLabel } from "@/lib/dictionaries";

interface NewVoiceNotification {
  id: string;
  municipio: string;
  showUntil: number;
}

interface PanelScreen {
  id: number;
  name: string;
  component: React.ComponentType<{
    stats: DashboardStats;
    isTV: boolean;
    highlightedMunicipio?: string | null;
  }>;
}

// Screen 1: Overview
const OverviewScreen = ({
  stats,
}: {
  stats: DashboardStats;
  isTV?: boolean;
  highlightedMunicipio?: string | null;
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center px-8">
      <h1 className="text-8xl font-black text-blue-600 mb-8">
        {stats.total}
      </h1>
      <p className="text-6xl font-bold text-gray-900 mb-4">
        experiências compartilhadas
      </p>
      <p className="text-5xl text-gray-600 mb-12">
        do cuidado no Noroeste Fluminense
      </p>

      <div className="grid grid-cols-3 gap-12 w-full max-w-6xl mt-8">
        <div className="bg-blue-50 rounded-2xl p-8">
          <p className="text-5xl font-black text-blue-600 mb-4">
            {Object.keys(stats.byMunicipio).filter(m => (stats.byMunicipio[m] || 0) > 0).length}
          </p>
          <p className="text-4xl font-semibold text-gray-700">
            municípios participam
          </p>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-8">
          <p className="text-5xl font-black text-emerald-600 mb-4">
            13
          </p>
          <p className="text-4xl font-semibold text-gray-700">
            a região tem
          </p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-8">
          <p className="text-5xl font-black text-amber-600 mb-4">
            {Math.round((Object.keys(stats.byMunicipio).filter(m => (stats.byMunicipio[m] || 0) > 0).length / 13) * 100)}%
          </p>
          <p className="text-4xl font-semibold text-gray-700">
            cobertura
          </p>
        </div>
      </div>
    </div>
  );
};

// Screen 2: Map
const MapScreen = ({
  stats,
}: {
  stats: DashboardStats;
  isTV?: boolean;
  highlightedMunicipio?: string | null;
}) => {
  const participatingCount = Object.keys(stats.byMunicipio).filter(
    m => (stats.byMunicipio[m] || 0) > 0
  ).length;

  return (
    <div className="flex flex-col justify-center items-center h-full px-8">
      <h2 className="text-7xl font-black text-blue-600 mb-12">
        Mapa do Cuidado
      </h2>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 w-full max-w-5xl border-4 border-blue-200">
        <div className="text-center space-y-8">
          <p className="text-6xl font-bold text-gray-900">
            {participatingCount} de 13 municípios
          </p>
          <p className="text-5xl text-gray-600 leading-tight">
            já compartilharam suas experiências e desafios no cuidado
          </p>
          <div className="pt-8 border-t-4 border-blue-200">
            <p className="text-4xl font-semibold text-blue-700">
              Clique em qualquer município no mapa para explorar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Screen 3: Needs/Categories
const NeedsScreen = ({
  stats,
}: {
  stats: DashboardStats;
  isTV?: boolean;
  highlightedMunicipio?: string | null;
}) => {
  const topCategories = useMemo(() => {
    const categories = stats.byCategory;
    return Object.entries(categories)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 3);
  }, [stats]);

  const showPercentages = stats.total >= 30;

  return (
    <div className="flex flex-col justify-center items-center h-full px-8">
      <h2 className="text-7xl font-black text-amber-600 mb-12">
        {showPercentages ? "Principais Sinais do Território" : "Sinais Iniciais"}
      </h2>

      <div className="space-y-8 w-full max-w-5xl">
        {topCategories.map(([category, count], idx) => (
          <div key={category} className="bg-amber-50 rounded-2xl p-8 border-4 border-amber-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-5xl font-bold text-amber-900 mb-3">
                  {idx + 1}. {getCategoryLabel(category as string)}
                </p>
                <p className="text-4xl text-amber-700">
                  {showPercentages
                    ? `${Math.round(((count as number) / stats.total) * 100)}% — ${count} relatos`
                    : `Apareceu em ${count} de ${stats.total} experiências`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showPercentages && (
        <div className="mt-8 bg-amber-100 rounded-2xl px-6 py-3 inline-block">
          <p className="text-3xl font-bold text-amber-900">
            📊 Amostra pequena
          </p>
        </div>
      )}
    </div>
  );
};

// Screen 4: Sentiments
const SentimentsScreen = ({
  stats,
}: {
  stats: DashboardStats;
  isTV?: boolean;
  highlightedMunicipio?: string | null;
}) => {
  const sentiments = useMemo(() => {
    const sent = stats.bySentiment || {};
    return Object.entries(sent)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 4);
  }, [stats]);

  const colors: Record<string, { bg: string; border: string; text: string; emoji: string }> = {
    positivo: { bg: "#d1fae5", border: "#6ee7b7", text: "#047857", emoji: "😊" },
    neutro: { bg: "#dbeafe", border: "#93c5fd", text: "#1e40af", emoji: "😐" },
    negativo: { bg: "#ffe4e6", border: "#fbcfe8", text: "#be184d", emoji: "😔" },
    outro: { bg: "#fef3c7", border: "#fcd34d", text: "#a16207", emoji: "🤔" },
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-8">
      <h2 className="text-7xl font-black text-rose-600 mb-12">
        Sentimentos no Cuidado
      </h2>

      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        {sentiments.map(([sentiment, count]) => {
          const config = colors[sentiment as string] || { bg: "#f3f4f6", border: "#d1d5db", text: "#374151", emoji: "❓" };

          return (
            <div
              key={sentiment}
              className="rounded-2xl p-8 border-4 text-center"
              style={{ backgroundColor: config.bg, borderColor: config.border }}
            >
              <p className="text-8xl mb-4">{config.emoji}</p>
              <p className="text-5xl font-bold text-gray-900 mb-2">
                {getSentimentLabel(sentiment as string).label}
              </p>
              <p className="text-4xl font-semibold" style={{ color: config.text }}>
                {count as number} relatos
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Screen 5: Municipalities
const MunicipalitiesScreen = ({
  stats,
  highlightedMunicipio,
}: {
  stats: DashboardStats;
  isTV?: boolean;
  highlightedMunicipio?: string | null;
}) => {
  const municipalities = useMemo(() => {
    const munis = stats.byMunicipio;
    return Object.entries(munis)
      .filter((entry) => (entry[1] as number) > 0)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 6);
  }, [stats]);

  return (
    <div className="flex flex-col justify-center items-center h-full px-8">
      <h2 className="text-7xl font-black text-emerald-600 mb-12">
        Municípios Participantes
      </h2>

      <div className="grid grid-cols-2 gap-6 w-full max-w-5xl">
        {municipalities.map(([muni, count]) => {
          const isHighlighted = highlightedMunicipio === (muni as string);
          return (
            <div
              key={muni}
              className={`rounded-2xl p-6 border-4 transition-all duration-300 ${
                isHighlighted
                  ? "bg-emerald-100 border-emerald-500 ring-4 ring-emerald-400 ring-offset-2 scale-105 shadow-2xl"
                  : "bg-emerald-50 border-emerald-200"
              }`}
            >
              <p className="text-4xl font-bold text-emerald-900 mb-2">
                {muni as string}
              </p>
              <p
                className={`text-5xl font-black transition-colors ${
                  isHighlighted ? "text-emerald-700" : "text-emerald-600"
                }`}
              >
                {count as number}
              </p>
              <p className={`text-3xl transition-colors ${
                isHighlighted ? "text-emerald-800" : "text-emerald-700"
              }`}>
                {(count as number) === 1 ? "experiência" : "experiências"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Screen 6: QR Code
const QRCodeScreen = ({
}: {
  stats: DashboardStats;
  isTV?: boolean;
  highlightedMunicipio?: string | null;
}) => {
  const participationUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://mapadeducuidado.merco'}/participar`;

  return (
    <div className="flex flex-col justify-center items-center h-full px-8">
      <h2 className="text-7xl font-black text-blue-600 mb-12">
        Compartilhe sua experiência
      </h2>

      <div className="bg-blue-50 rounded-3xl p-12 border-4 border-blue-200">
        <div className="flex flex-col items-center gap-12">
          <QRCodeCanvas
            value={participationUrl}
            size={400}
            level="H"
            includeMargin={true}
          />
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-900 mb-4">
              Escaneie o código QR
            </p>
            <p className="text-4xl text-gray-600">
              ou acesse: {participationUrl}
            </p>
          </div>
        </div>
      </div>

      <p className="text-3xl text-gray-600 mt-12">
        Suas contribuições ajudam a mapear o cuidado na região
      </p>
    </div>
  );
};

const screens: PanelScreen[] = [
  { id: 1, name: "Visão Geral", component: OverviewScreen },
  { id: 2, name: "Mapa", component: MapScreen },
  { id: 3, name: "Necessidades", component: NeedsScreen },
  { id: 4, name: "Sentimentos", component: SentimentsScreen },
  { id: 5, name: "Municípios", component: MunicipalitiesScreen },
  { id: 6, name: "QR Code", component: QRCodeScreen },
];

export default function TVPanelPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [notification, setNotification] = useState<NewVoiceNotification | null>(null);
  const [highlightedMunicipio, setHighlightedMunicipio] = useState<string | null>(null);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await supabaseService.getContribuicoesStats();
        if (response.success && response.data) {
          setStats(response.data);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Real-time subscription for new contributions
  useEffect(() => {
    const supabase = createClient();
    let lastSeenId: string | null = null;

    const subscription = supabase
      .channel("mapa_contribuicoes_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mapa_contribuicoes",
        },
        (payload) => {
          const newContribuicao = payload.new as MapaContribuicao;
          const municipio = newContribuicao.municipio;

          if (municipio && municipio !== lastSeenId) {
            lastSeenId = municipio;
            const notificationId = `${municipio}-${Date.now()}`;

            // Show notification
            setNotification({
              id: notificationId,
              municipio,
              showUntil: Date.now() + 4000,
            });

            // Highlight municipality
            setHighlightedMunicipio(municipio);

            // Auto-dismiss after 4 seconds
            setTimeout(() => {
              setNotification(null);
              setHighlightedMunicipio(null);
            }, 4000);

            // Refresh stats immediately
            const fetchStats = async () => {
              try {
                const response = await supabaseService.getContribuicoesStats();
                if (response.success && response.data) {
                  setStats(response.data);
                  setLastUpdated(new Date());
                }
              } catch (error) {
                console.error("Error fetching stats:", error);
              }
            };
            fetchStats();
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Auto-rotate screens every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen((prev) => (prev + 1) % screens.length);
        setIsTransitioning(false);
      }, 300);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-6xl font-bold text-gray-900">
          Carregando painel...
        </p>
      </div>
    );
  }

  const CurrentScreenComponent = screens[currentScreen].component;

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Main screen content */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <CurrentScreenComponent stats={stats} isTV={true} highlightedMunicipio={highlightedMunicipio} />
      </div>

      {/* QR Code corner (always visible except on QR screen) */}
      {currentScreen !== 5 && (
        <div className="absolute top-8 right-8 bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-lg z-20">
          <QRCodeCanvas
            value={`${typeof window !== 'undefined' ? window.location.origin : 'https://mapadeducuidado.merco'}/participar`}
            size={120}
            level="H"
            includeMargin={true}
          />
        </div>
      )}

      {/* Screen indicator and last updated */}
      <div className="absolute bottom-8 left-8 bg-white rounded-xl px-6 py-4 border-2 border-gray-200 shadow-lg z-20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-2xl font-semibold text-gray-900">
            Dados atualizados {lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {/* Screen counter */}
      <div className="absolute bottom-8 right-8 bg-blue-600 text-white rounded-xl px-6 py-4 font-bold shadow-lg z-20">
        <p className="text-3xl">
          {currentScreen + 1} / {screens.length}
        </p>
      </div>

      {/* Dots navigation */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {screens.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentScreen(idx);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`w-4 h-4 rounded-full transition-all ${
              idx === currentScreen
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir para ${screens[idx].name}`}
          />
        ))}
      </div>

      {/* New Voice Notification Toast */}
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-4 border-emerald-400 rounded-3xl shadow-2xl p-12 max-w-3xl mx-auto text-center">
              <div className="space-y-6">
                <div className="text-8xl animate-pulse">✨</div>
                <p className="text-6xl font-black text-emerald-900 leading-tight">
                  Uma nova experiência<br />acaba de entrar no mapa
                </p>
                <div className="bg-white rounded-2xl p-8 border-2 border-emerald-300">
                  <p className="text-5xl font-bold text-emerald-700">
                    {notification.municipio}
                  </p>
                  <p className="text-4xl text-emerald-600 mt-3">
                    agora soma mais uma contribuição
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Highlight pulse animation style */}
      <style>{`
        @keyframes pulse-highlight {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse-highlight {
          animation: pulse-highlight 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
