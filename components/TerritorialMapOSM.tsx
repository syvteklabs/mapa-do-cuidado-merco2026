"use client";

import dynamic from "next/dynamic";

interface TerritorialMapOSMProps {
  municipiosStats: Record<string, number>;
  selectedMunicipio?: string | null;
  onMunicipioSelect?: (municipio: string | null) => void;
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

const MapComponent = dynamic(() => import("./MapComponentDashboard"), {
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

export default function TerritorialMapOSM({
  municipiosStats,
  selectedMunicipio = null,
  onMunicipioSelect = () => {},
}: TerritorialMapOSMProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
      <MapComponent
        municipalities={MUNICIPALITIES}
        stats={municipiosStats}
        selectedMunicipio={selectedMunicipio}
        onMunicipioSelect={onMunicipioSelect}
      />
    </div>
  );
}
