"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface HeroMapProps {
  stats?: Record<string, number> | null;
}

const MUNICIPALITIES = [
  { name: "Laje do Muriaé", lat: -20.8389, lng: -41.6392 },
  { name: "Aperibé", lat: -20.9669, lng: -41.7486 },
  { name: "Varre-Sai", lat: -20.7531, lng: -41.8492 },
  { name: "Bom Jesus do Itabapoana", lat: -21.1356, lng: -41.7778 },
  { name: "Porciúncula", lat: -20.9228, lng: -41.9231 },
  { name: "Itaperuna", lat: -21.2278, lng: -41.8833 },
  { name: "Italva", lat: -21.1958, lng: -41.9483 },
  { name: "São José de Ubá", lat: -21.3142, lng: -41.9789 },
  { name: "Santo Antônio de Pádua", lat: -21.5331, lng: -42.1947 },
  { name: "Miracema", lat: -21.4494, lng: -41.9831 },
  { name: "Cambuci", lat: -21.5261, lng: -41.7014 },
  { name: "Natividade", lat: -21.5128, lng: -41.4328 },
  { name: "Itaocara", lat: -21.7739, lng: -42.0611 },
];

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center rounded-2xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-3"></div>
        <p className="text-gray-600">Carregando mapa...</p>
      </div>
    </div>
  ),
});

export default function HeroMap({ stats = null }: HeroMapProps) {
  const [municipalitiesData, setMunicipalitiesData] = useState<Record<string, number>>(stats || {});

  useEffect(() => {
    if (stats) {
      setMunicipalitiesData(stats);
    }
  }, [stats]);

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg flex flex-col">
      {/* OpenStreetMap */}
      <div className="flex-1 w-full h-full">
        <MapComponent municipalities={MUNICIPALITIES} stats={municipalitiesData} />
      </div>

      {/* Support text and legend */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-green-50 to-blue-50 border-t border-green-100">
        <p className="text-xs sm:text-sm text-gray-700 font-medium mb-2">
          Um território formado por 13 municípios e diferentes experiências de cuidado.
        </p>

        {/* Color legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <span className="text-gray-600">Sem participações</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>
            <span className="text-gray-600">Poucas participações</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Participação crescente</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-700"></div>
            <span className="text-gray-600">Maior participação</span>
          </div>
        </div>

        {/* Data info */}
        {Object.keys(municipalitiesData).length > 0 && (
          <p className="text-xs text-gray-600 mt-2">
            Total de participações: <span className="font-bold text-green-700">{Object.values(municipalitiesData).reduce((a, b) => a + b, 0)}</span>
          </p>
        )}
      </div>
    </div>
  );
}
