"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo, useState, useRef } from "react";

interface MunicipalityData {
  name: string;
  lat: number;
  lng: number;
  count: number;
}

interface MapContentProps {
  municipiosStats: Record<string, number>;
}

// Coordenadas dos 13 municípios do Noroeste Fluminense
const MUNICIPIOS_COORDS: MunicipalityData[] = [
  { name: "Aperibé", lat: -20.9669, lng: -41.7486, count: 0 },
  { name: "Bom Jesus do Itabapoana", lat: -21.1356, lng: -41.7778, count: 0 },
  { name: "Cambuci", lat: -21.5261, lng: -41.7014, count: 0 },
  { name: "Italva", lat: -21.1958, lng: -41.9483, count: 0 },
  { name: "Itaocara", lat: -21.7739, lng: -42.0611, count: 0 },
  { name: "Itaperuna", lat: -21.2278, lng: -41.8833, count: 0 },
  { name: "Laje do Muriaé", lat: -20.8389, lng: -41.6392, count: 0 },
  { name: "Miracema", lat: -21.4494, lng: -41.9831, count: 0 },
  { name: "Natividade", lat: -21.5128, lng: -41.4328, count: 0 },
  { name: "Porciúncula", lat: -20.9228, lng: -41.9231, count: 0 },
  { name: "Santo Antônio de Pádua", lat: -21.5331, lng: -42.1947, count: 0 },
  { name: "São José de Ubá", lat: -21.3142, lng: -41.9789, count: 0 },
  { name: "Varre-Sai", lat: -20.7531, lng: -41.8492, count: 0 },
];

// Ícone customizado para marcadores
const createCustomIcon = (count: number, maxCount: number) => {
  let color = "#cbd5e1"; // cinza
  let size = 30;

  if (count === 0) {
    color = "#cbd5e1";
    size = 28;
  } else {
    const intensity = count / maxCount;
    if (intensity > 0.75) {
      color = "#1e40af"; // azul escuro
      size = 42;
    } else if (intensity > 0.5) {
      color = "#3b82f6"; // azul
      size = 38;
    } else if (intensity > 0.25) {
      color = "#60a5fa"; // azul claro
      size = 34;
    } else {
      color = "#bfdbfe"; // azul muito claro
      size = 30;
    }
  }

  const svgIcon = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="12" y="14" font-size="8" font-weight="bold" text-anchor="middle" fill="white">
        ${count}
      </text>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export default function MapContent({ municipiosStats }: MapContentProps) {
  const [showLegend, setShowLegend] = useState(true);
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);
  const mapRef = useRef(null);

  // Centro do Noroeste Fluminense
  const mapCenter: LatLngExpression = [-21.2, -41.85];

  // Enriquecer dados
  const enrichedMunicipios = useMemo(() => {
    return MUNICIPIOS_COORDS.map((mun) => ({
      ...mun,
      count: municipiosStats[mun.name] || 0,
    }));
  }, [municipiosStats]);

  // Encontrar máximo para escala
  const maxCount = useMemo(() => {
    return Math.max(...enrichedMunicipios.map((m) => m.count), 1);
  }, [enrichedMunicipios]);

  const totalParticipations = useMemo(() => {
    return enrichedMunicipios.reduce((sum, m) => sum + m.count, 0);
  }, [enrichedMunicipios]);

  const getColor = (count: number) => {
    if (count === 0) return "#cbd5e1";
    const intensity = count / maxCount;
    if (intensity > 0.75) return "#1e40af";
    if (intensity > 0.5) return "#3b82f6";
    if (intensity > 0.25) return "#60a5fa";
    return "#bfdbfe";
  };

  const getRadius = (count: number) => {
    if (count === 0) return 12000;
    return 8000 + (count / maxCount) * 45000;
  };

  const municipiosComDados = enrichedMunicipios.filter((m) => m.count > 0).length;

  return (
    <div className="relative w-full h-full">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Círculos de intensidade */}
        {enrichedMunicipios.map((mun) => (
          mun.count > 0 && (
            <Circle
              key={`circle-${mun.name}`}
              center={[mun.lat, mun.lng] as LatLngExpression}
              radius={getRadius(mun.count)}
              pathOptions={{
                color: getColor(mun.count),
                weight: 2,
                opacity: 0.25,
                fillOpacity: 0.08,
              }}
            />
          )
        ))}

        {/* Marcadores dos municípios */}
        {enrichedMunicipios.map((mun) => (
          <Marker
            key={`marker-${mun.name}`}
            position={[mun.lat, mun.lng] as LatLngExpression}
            icon={createCustomIcon(mun.count, maxCount)}
            eventHandlers={{
              click: () => setSelectedMunicipio(mun.name),
            }}
          >
            <Popup closeButton={true} className="municipality-popup">
              <div className="w-48">
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {mun.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Participações:</span>
                    <span className="font-bold text-blue-600">{mun.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">% do total:</span>
                    <span className="font-bold text-blue-600">
                      {totalParticipations > 0
                        ? ((mun.count / totalParticipations) * 100).toFixed(1)
                        : "0"}
                      %
                    </span>
                  </div>
                  {mun.count > 0 && (
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                      <div
                        className="bg-blue-600 rounded-full h-2 transition-all"
                        style={{
                          width: `${(mun.count / maxCount) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legenda Customizada */}
      {showLegend && (
        <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs z-40 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm">Legenda</h3>
            <button
              onClick={() => setShowLegend(false)}
              className="text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Escala de cores */}
          <div className="space-y-2 mb-4">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Intensidade
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full" style={{ background: "#1e40af" }} />
                <span className="text-xs text-gray-700">&gt; 75% do máximo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full" style={{ background: "#3b82f6" }} />
                <span className="text-xs text-gray-700">50-75% do máximo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full" style={{ background: "#60a5fa" }} />
                <span className="text-xs text-gray-700">25-50% do máximo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full" style={{ background: "#bfdbfe" }} />
                <span className="text-xs text-gray-700">&lt; 25% do máximo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full" style={{ background: "#cbd5e1" }} />
                <span className="text-xs text-gray-700">Sem dados</span>
              </div>
            </div>
          </div>

          {/* Estatísticas rápidas */}
          <div className="border-t pt-3">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
              Estatísticas
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-blue-600">{totalParticipations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Municípios:</span>
                <span className="font-bold text-green-600">{municipiosComDados}/13</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Máximo:</span>
                <span className="font-bold text-purple-600">{maxCount}</span>
              </div>
            </div>
          </div>

          {/* Dica de interação */}
          <div className="border-t pt-3 mt-3">
            <p className="text-xs text-gray-500">
              💡 Clique nos marcadores para ver detalhes
            </p>
          </div>
        </div>
      )}

      {/* Botão para mostrar/esconder legenda */}
      {!showLegend && (
        <button
          onClick={() => setShowLegend(true)}
          className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-2 z-40 hover:bg-gray-50 border border-gray-200"
          title="Mostrar legenda"
        >
          <span className="text-lg">📋</span>
        </button>
      )}

      {/* Info box superior */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-40 border border-gray-200">
        <div className="text-sm">
          <p className="text-gray-600 mb-2">
            {selectedMunicipio
              ? `Selecionado: ${selectedMunicipio}`
              : "Passe o mouse ou clique para explorar"}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMunicipio(null)}
              className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Estilos customizados */}
      <style>{`
        .municipality-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
          font-family: inherit;
        }
        .municipality-popup .leaflet-popup-tip-container {
          display: none;
        }
        .custom-marker {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
        }
        .leaflet-marker-icon {
          border: none !important;
          background: none !important;
        }
        .leaflet-popup-content-wrapper {
          background-color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}
