"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";

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

export default function MapContent({ municipiosStats }: MapContentProps) {
  // Centro do Noroeste Fluminense (aproximadamente)
  const mapCenter: LatLngExpression = [-21.2, -41.85];

  // Enriquecer dados com contagens
  const enrichedMunicipios = useMemo(() => {
    return MUNICIPIOS_COORDS.map((mun) => ({
      ...mun,
      count: municipiosStats[mun.name] || 0,
    }));
  }, [municipiosStats]);

  // Encontrar a maior contagem para escala de cores
  const maxCount = useMemo(() => {
    return Math.max(...enrichedMunicipios.map((m) => m.count), 1);
  }, [enrichedMunicipios]);

  // Função para determinar cor baseada na contagem
  const getColor = (count: number) => {
    if (count === 0) return "#cbd5e1"; // cinza claro
    const intensity = count / maxCount;
    if (intensity > 0.75) return "#1e40af"; // azul escuro
    if (intensity > 0.5) return "#3b82f6"; // azul
    if (intensity > 0.25) return "#93c5fd"; // azul claro
    return "#dbeafe"; // azul muito claro
  };

  const getRadius = (count: number) => {
    if (count === 0) return 15000;
    return 10000 + (count / maxCount) * 50000;
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={9}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {enrichedMunicipios.map((mun) => (
        <div key={mun.name}>
          {/* Círculo de raio proporcional à participação */}
          {mun.count > 0 && (
            <Circle
              center={[mun.lat, mun.lng] as LatLngExpression}
              radius={getRadius(mun.count)}
              pathOptions={{
                color: getColor(mun.count),
                weight: 2,
                opacity: 0.3,
                fillOpacity: 0.15,
              }}
            />
          )}
          {/* Marcador do município */}
          <Marker position={[mun.lat, mun.lng] as LatLngExpression}>
            <Popup>
              <div className="text-sm font-semibold text-gray-900">
                {mun.name}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {mun.count} {mun.count === 1 ? "participação" : "participações"}
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  );
}
