"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo, useState, useRef, useEffect } from "react";
import { LocationIcon, AlertIcon, XIcon } from "./Icons";
import { animationClasses } from "@/lib/animations";

interface MunicipalityData {
  name: string;
  lat: number;
  lng: number;
  count: number;
  categoryTopName?: string;
  categoryTopCount?: number;
  lastParticipationDate?: string;
}

interface MapContentProps {
  municipiosStats: Record<string, number>;
  municipiosCategories?: Record<string, Record<string, number>>;
  selectedMunicipio?: string | null;
  onMunicipioSelect?: (municipio: string | null) => void;
  dataView?: "participations" | "needs";
}

const MUNICIPIOS_COORDS: MunicipalityData[] = [
  { name: "Aperibé", lat: -20.9669, lng: -41.7486, count: 0, lastParticipationDate: undefined },
  { name: "Bom Jesus do Itabapoana", lat: -21.1356, lng: -41.7778, count: 0, lastParticipationDate: undefined },
  { name: "Cambuci", lat: -21.5261, lng: -41.7014, count: 0, lastParticipationDate: undefined },
  { name: "Italva", lat: -21.1958, lng: -41.9483, count: 0, lastParticipationDate: undefined },
  { name: "Itaocara", lat: -21.7739, lng: -42.0611, count: 0, lastParticipationDate: undefined },
  { name: "Itaperuna", lat: -21.2278, lng: -41.8833, count: 0, lastParticipationDate: undefined },
  { name: "Laje do Muriaé", lat: -20.8389, lng: -41.6392, count: 0, lastParticipationDate: undefined },
  { name: "Miracema", lat: -21.4494, lng: -41.9831, count: 0, lastParticipationDate: undefined },
  { name: "Natividade", lat: -21.5128, lng: -41.4328, count: 0, lastParticipationDate: undefined },
  { name: "Porciúncula", lat: -20.9228, lng: -41.9231, count: 0, lastParticipationDate: undefined },
  { name: "Santo Antônio de Pádua", lat: -21.5331, lng: -42.1947, count: 0, lastParticipationDate: undefined },
  { name: "São José de Ubá", lat: -21.3142, lng: -41.9789, count: 0, lastParticipationDate: undefined },
  { name: "Varre-Sai", lat: -20.7531, lng: -41.8492, count: 0, lastParticipationDate: undefined },
];

// Accessibility-enhanced color scale with patterns and icons
const INTENSITY_LEVELS = [
  { level: 5, label: "> 75%", color: "#1e40af", icon: "●●●●●", pattern: "solid" },
  { level: 4, label: "50-75%", color: "#3b82f6", icon: "●●●●", pattern: "medium" },
  { level: 3, label: "25-50%", color: "#60a5fa", icon: "●●●", pattern: "light" },
  { level: 2, label: "< 25%", color: "#bfdbfe", icon: "●●", pattern: "very-light" },
  { level: 1, label: "Sem dados", color: "#cbd5e1", icon: "◯", pattern: "none" },
];

const createCustomIcon = (count: number, maxCount: number, isSelected: boolean = false, municipioName: string = "") => {
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
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${municipioName}: ${count} participações">
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
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const mapRef = useRef(null);

  const mapCenter: LatLngExpression = [-21.2, -41.85];

  const municipioNames = useMemo(() => MUNICIPIOS_COORDS.map((m) => m.name), []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!localSelectedMunicipio) return;

      const currentIndex = municipioNames.indexOf(localSelectedMunicipio);
      let nextIndex = currentIndex;

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : municipioNames.length - 1;
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = currentIndex < municipioNames.length - 1 ? currentIndex + 1 : 0;
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClearSelection();
        return;
      }

      if (nextIndex !== currentIndex) {
        const nextMunicipio = municipioNames[nextIndex];
        setLocalSelectedMunicipio(nextMunicipio);
        onMunicipioSelect(nextMunicipio);
        setShowDetailPanel(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [localSelectedMunicipio, municipioNames, onMunicipioSelect]);

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
    setShowDetailPanel(true);
  };

  const handleClearSelection = () => {
    setLocalSelectedMunicipio(null);
    onMunicipioSelect(null);
    setShowDetailPanel(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getSelectedMunicipio = () => {
    if (!localSelectedMunicipio) return null;
    return enrichedMunicipios.find((m) => m.name === localSelectedMunicipio);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        className={`rounded-lg ${animationClasses.fadeIn}`}
      >
        {/* Softer base layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/stamen_tonerlite/{z}/{x}/{y}.png"
          opacity={0.85}
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
            icon={createCustomIcon(mun.count, maxCount, localSelectedMunicipio === mun.name, mun.name)}
            aria-label={`${mun.name}: ${mun.count} participações. Clique para detalhes`}
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
        <div className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white rounded-lg shadow-lg p-4 sm:p-5 max-w-sm z-40 border border-gray-200 text-sm ${animationClasses.fadeInUp}`}>
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

      {/* Selection info box - Quick indicator */}
      {localSelectedMunicipio && !showDetailPanel && (
        <div className={`absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 z-40 border border-gray-200 max-w-xs ${animationClasses.fadeInDown}`}>
          <div className="text-xs sm:text-sm">
            <p className="text-gray-600 mb-2 font-medium line-clamp-2 flex items-center gap-2">
              <LocationIcon className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden={true} />
              {localSelectedMunicipio}
            </p>
            <button
              onClick={() => setShowDetailPanel(true)}
              className="text-xs px-2 py-1.5 sm:px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
            >
              Ver detalhes
            </button>
          </div>
        </div>
      )}

      {/* Detailed selection panel */}
      {showDetailPanel && localSelectedMunicipio && getSelectedMunicipio() && (
        <div className={`absolute bottom-0 right-0 top-0 sm:top-4 sm:right-4 w-full sm:w-96 bg-white rounded-t-lg sm:rounded-lg shadow-2xl z-50 border border-gray-200 flex flex-col max-h-screen sm:max-h-[85vh] overflow-hidden ${animationClasses.slideInRight}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4 sm:p-5 flex-shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  {getSelectedMunicipio()!.name}
                </h2>
                <p className="text-xs text-gray-600">
                  Informações da participação
                </p>
              </div>
              <button
                onClick={handleClearSelection}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1"
                aria-label="Fechar painel"
              >
                <XIcon className="w-5 h-5" aria-hidden={true} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Main metrics */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                  Participações
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {getSelectedMunicipio()!.count}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
                  % do total territorial
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold text-blue-600">
                    {totalParticipations > 0
                      ? ((getSelectedMunicipio()!.count / totalParticipations) * 100).toFixed(1)
                      : "0"}
                    %
                  </p>
                  {getSelectedMunicipio()!.count > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2 transition-all"
                        style={{
                          width: `${(getSelectedMunicipio()!.count / maxCount) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200" />

            {/* Theme or data info */}
            {dataView === "needs" && getSelectedMunicipio()!.count > 0 ? (
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                  Tema principal
                </p>
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <p className="font-semibold text-amber-900">
                    {getSelectedMunicipio()!.categoryTopName || "—"}
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    {getSelectedMunicipio()!.categoryTopCount} menção(ões)
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                  Status
                </p>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-sm text-blue-900">
                    {getSelectedMunicipio()!.count > 0
                      ? "Participações ativas"
                      : "Sem participações"}
                  </p>
                </div>
              </div>
            )}

            {/* Last participation */}
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                Última participação
              </p>
              <p className="text-sm text-gray-700">
                {formatDate(getSelectedMunicipio()!.lastParticipationDate)}
              </p>
            </div>

            {/* Participatory sample warning */}
            {getSelectedMunicipio()!.count > 0 && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                <p className="text-xs font-semibold text-yellow-900 mb-1 flex items-center gap-2">
                  <AlertIcon className="w-4 h-4 flex-shrink-0" aria-hidden={true} />
                  Amostra participativa
                </p>
                <p className="text-xs text-yellow-800 leading-relaxed">
                  Os dados refletem experiências compartilhadas voluntariamente e não representam a totalidade da população.
                </p>
              </div>
            )}

            {/* No data state */}
            {getSelectedMunicipio()!.count === 0 && (
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Nenhuma participação registrada neste município ainda.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 sm:p-5 flex-shrink-0">
            <p className="text-xs text-gray-600 mb-3">
              Navegue: ↑ ↓ ou ← → | Fechar: ESC
            </p>
            <button
              onClick={handleClearSelection}
              className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition text-sm"
            >
              Fechar painel
            </button>
          </div>
        </div>
      )}

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
