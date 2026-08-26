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
  categoryTopName?: string;
  categoryTopCount?: number;
}

interface MapContentProps {
  municipiosStats: Record<string, number>;
  municipiosCategories?: Record<string, Record<string, number>>;
  selectedMunicipio?: string | null;
  onMunicipioSelect?: (municipio: string | null) => void;
  dataView?: "participations" | "needs";
}

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

// Accessibility-enhanced color scale with patterns and icons
const INTENSITY_LEVELS = [
  { level: 5, label: "> 75%", color: "#1e40af", icon: "●●●●●", pattern: "solid" },
  { level: 4, label: "50-75%", color: "#3b82f6", icon: "●●●●", pattern: "medium" },
  { level: 3, label: "25-50%", color: "#60a5fa", icon: "●●●", pattern: "light" },
  { level: 2, label: "< 25%", color: "#bfdbfe", icon: "●●", pattern: "very-light" },
  { level: 1, label: "Sem dados", color: "#cbd5e1", icon: "◯", pattern: "none" },
];

const createCustomIcon = (count: number, maxCount: number, isSelected: boolean = false) => {
  let color = "#cbd5e1";
  let size = 30;
  let borderColor = "white";
  let borderWidth = 2;

  if (count === 0) {
    color = "#cbd5e1";
    size = 28;
  } else {
    const intensity = count / maxCount;
    if (intensity > 0.75) {
      color = "#1e40af";
      size = isSelected ? 48 : 42;
    } else if (intensity > 0.5) {
      color = "#3b82f6";
      size = isSelected ? 44 : 38;
    } else if (intensity > 0.25) {
      color = "#60a5fa";
      size = isSelected ? 40 : 34;
    } else {
      color = "#bfdbfe";
      size = isSelected ? 36 : 30;
    }
  }

  if (isSelected) {
    borderColor = "#1e40af";
    borderWidth = 3;
  }

  const svgIcon = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="${borderColor}" stroke-width="${borderWidth}"/>
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

export default function MapContent({
  municipiosStats,
  municipiosCategories = {},
  selectedMunicipio = null,
  onMunicipioSelect = () => {},
  dataView = "participations",
}: MapContentProps) {
  const [showLegend, setShowLegend] = useState(true);
  const [localSelectedMunicipio, setLocalSelectedMunicipio] = useState<string | null>(selectedMunicipio);
  const mapRef = useRef(null);

  const mapCenter: LatLngExpression = [-21.2, -41.85];

  const enrichedMunicipios = useMemo(() => {
    return MUNICIPIOS_COORDS.map((mun) => {
      const count = municipiosStats[mun.name] || 0;
      let categoryTopName: string | undefined;
      let categoryTopCount: number | undefined;

      if (dataView === "needs" && municipiosCategories[mun.name]) {
        const categories = municipiosCategories[mun.name];
        const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
        if (topCategory) {
          categoryTopName = topCategory[0];
          categoryTopCount = topCategory[1];
        }
      }

      return {
        ...mun,
        count,
        categoryTopName,
        categoryTopCount,
      };
    });
  }, [municipiosStats, municipiosCategories, dataView]);

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

  const handleMarkerClick = (municipio: string) => {
    setLocalSelectedMunicipio(municipio);
    onMunicipioSelect(municipio);
  };

  const handleClearSelection = () => {
    setLocalSelectedMunicipio(null);
    onMunicipioSelect(null);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        {/* OpenStreetMap base layer */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Intensity circles */}
        {enrichedMunicipios.map((mun) =>
          mun.count > 0 ? (
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
          ) : null
        )}

        {/* Municipality markers */}
        {enrichedMunicipios.map((mun) => (
          <Marker
            key={`marker-${mun.name}`}
            position={[mun.lat, mun.lng] as LatLngExpression}
            icon={createCustomIcon(mun.count, maxCount, localSelectedMunicipio === mun.name)}
            eventHandlers={{
              click: () => handleMarkerClick(mun.name),
            }}
          >
            <Popup closeButton={true} className="municipality-popup">
              <div className="w-56">
                <h3 className="font-bold text-gray-900 text-base mb-3 pb-2 border-b">
                  {mun.name}
                </h3>
                <div className="space-y-3">
                  {dataView === "participations" ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-sm">Participações:</span>
                        <span className="font-bold text-blue-600 text-lg">{mun.count}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-sm">% do total:</span>
                        <span className="font-bold text-blue-600">
                          {totalParticipations > 0
                            ? ((mun.count / totalParticipations) * 100).toFixed(1)
                            : "0"}
                          %
                        </span>
                      </div>
                      {mun.count > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600">Intensidade relativa</div>
                          <div className="w-full bg-gray-300 rounded-full h-3">
                            <div
                              className="bg-blue-600 rounded-full h-3 transition-all"
                              style={{
                                width: `${(mun.count / maxCount) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-sm">Tema Principal:</span>
                        <span className="font-bold text-amber-600">{mun.categoryTopName || "—"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-sm">Menções:</span>
                        <span className="font-bold text-amber-600 text-lg">{mun.categoryTopCount || 0}</span>
                      </div>
                      <div className="text-xs text-gray-500 italic">
                        {mun.count > 0 ? `Baseado em ${mun.count} participação(ões)` : "Sem dados"}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Enhanced Accessible Legend */}
      {showLegend && (
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white rounded-lg shadow-lg p-4 sm:p-5 max-w-sm z-40 border border-gray-200 text-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Intensidade</h3>
            <button
              onClick={() => setShowLegend(false)}
              className="text-gray-400 hover:text-gray-600 text-lg"
              aria-label="Fechar legenda"
            >
              ✕
            </button>
          </div>

          {/* Color and pattern scale */}
          <div className="space-y-2 mb-3">
            {INTENSITY_LEVELS.map((level) => (
              <div key={level.level} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 w-10">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-gray-300"
                    style={{ background: level.color }}
                    role="img"
                    aria-label={`Nível ${level.level}: ${level.label}`}
                  />
                  <span className="text-xs font-bold text-gray-700">{level.icon}</span>
                </div>
                <span className="text-xs text-gray-700 font-medium">{level.label}</span>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="border-t pt-2">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Estatísticas</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-blue-600">{totalParticipations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ativos:</span>
                <span className="font-bold text-green-600">{municipiosComDados}/13</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Máx.:</span>
                <span className="font-bold text-purple-600">{maxCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show legend button */}
      {!showLegend && (
        <button
          onClick={() => setShowLegend(true)}
          className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white rounded-lg shadow-lg p-2 z-40 hover:bg-gray-50 border border-gray-200 text-lg"
          title="Mostrar legenda"
          aria-label="Mostrar legenda"
        >
          📋
        </button>
      )}

      {/* Selection info box */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 z-40 border border-gray-200 max-w-xs">
        <div className="text-xs sm:text-sm">
          <p className="text-gray-600 mb-2 font-medium line-clamp-2">
            {localSelectedMunicipio
              ? `📍 ${localSelectedMunicipio}`
              : "👆 Clique no mapa"}
          </p>
          {localSelectedMunicipio && (
            <button
              onClick={handleClearSelection}
              className="text-xs px-2 py-1.5 sm:px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Custom styles */}
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
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          transition: filter 0.2s;
        }
        .custom-marker:hover {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        .leaflet-marker-icon {
          border: none !important;
          background: none !important;
        }
        .leaflet-popup-content-wrapper {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-family: inherit;
        }
        .leaflet-popup-tip {
          background-color: #fff;
        }
      `}</style>
    </div>
  );
}
