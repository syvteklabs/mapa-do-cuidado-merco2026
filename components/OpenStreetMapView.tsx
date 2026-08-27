"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import { MUNICIPIOS_GEOJSON } from "@/lib/noroeste-geojson";
import "leaflet/dist/leaflet.css";

const pulseStyle = `
  @keyframes pulse {
    0%, 100% { opacity: 1; r: 8px; }
    50% { opacity: 0.6; r: 12px; }
  }

  @keyframes pulse-inner {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .marker-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .marker-pulse-inner {
    animation: pulse-inner 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

interface OpenStreetMapViewProps {
  stats?: Record<string, number> | null;
}

const getColorForParticipations = (count: number, maxCount: number): string => {
  if (count === 0) return "#f0fdf4";
  if (maxCount === 0) return "#f0fdf4";

  const ratio = count / maxCount;
  if (ratio >= 0.75) return "#16a34a";
  if (ratio >= 0.5) return "#22c55e";
  if (ratio >= 0.25) return "#86efac";
  return "#c7f0d8";
};

export default function OpenStreetMapView({
  stats = null,
}: OpenStreetMapViewProps) {
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [municipalitiesData, setMunicipalitiesData] = useState<
    Record<string, number>
  >(stats || {});

  useEffect(() => {
    if (stats) {
      setMunicipalitiesData(stats);
    }
  }, [stats]);

  useEffect(() => {
    // Converter os dados geográficos para GeoJSON
    const features = Object.values(MUNICIPIOS_GEOJSON).map((municipio) => {
      const count = municipalitiesData[municipio.name] || 0;
      return {
        type: "Feature",
        properties: {
          name: municipio.name,
          count: count,
          centroid: municipio.centroid,
        },
        geometry: {
          type: "Polygon",
          coordinates: [municipio.coordinates],
        },
      };
    });

    setGeojsonData({
      type: "FeatureCollection",
      features: features,
    });
  }, [municipalitiesData]);

  const maxCount = Math.max(
    ...Object.values(municipalitiesData).filter((v) => typeof v === "number"),
    1
  );

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const name = feature.properties.name;
    const count = feature.properties.count;

    // Adicionar popup
    const popupContent = `
      <div class="p-2">
        <h3 class="font-bold text-green-700">${name}</h3>
        <p class="text-sm text-gray-700">
          <span class="font-semibold">${count}</span> ${
      count === 1 ? "participação" : "participações"
    }
        </p>
      </div>
    `;

    layer.bindPopup(popupContent);

    // Hover effects
    layer.on("mouseover", (e: L.LeafletEvent) => {
      const target = e.target as L.Path;
      target.setStyle({
        weight: 3,
        opacity: 1,
      });
    });

    layer.on("mouseout", (e: L.LeafletEvent) => {
      const target = e.target as L.Path;
      target.setStyle({
        weight: 2,
        opacity: 0.7,
      });
    });
  };

  const styleFeature = (feature: any) => {
    const count = feature.properties.count;
    const color = getColorForParticipations(count, maxCount);
    const borderColor = count === 0 ? "#d1d5db" : "#22c55e";

    return {
      fillColor: color,
      weight: 2,
      opacity: 0.7,
      color: borderColor,
      dashArray: "3",
      fillOpacity: 0.85,
    };
  };

  // Calcular bounds para o mapa
  const bounds = [
    [-21.9078, -42.2626], // SW corner
    [-20.6300, -41.1900], // NE corner
  ] as L.LatLngBoundsExpression;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg flex flex-col bg-white">
      <style>{pulseStyle}</style>
      {/* Leaflet Map */}
      <MapContainer
        bounds={bounds}
        className="flex-1 w-full h-full"
        scrollWheelZoom={true}
        zoom={8}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* GeoJSON Layer */}
        {geojsonData && (
          <GeoJSON data={geojsonData} style={styleFeature} onEachFeature={onEachFeature} />
        )}

        {/* Municipality Markers */}
        {Object.values(MUNICIPIOS_GEOJSON).map((municipio) => {
          const count = municipalitiesData[municipio.name] || 0;
          const color = count === 0 ? "#9ca3af" : "#22c55e";
          const radius = count === 0 ? 6 : 8;

          return (
            <CircleMarker
              key={municipio.name}
              center={[municipio.centroid[1], municipio.centroid[0]]}
              radius={radius}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.8,
                weight: 2,
              }}
              className="marker-pulse"
              eventHandlers={{
                mouseover: (e) => {
                  e.target.setStyle({
                    fillOpacity: 1,
                    weight: 3,
                    radius: radius + 2,
                  });
                },
                mouseout: (e) => {
                  e.target.setStyle({
                    fillOpacity: 0.8,
                    weight: 2,
                    radius: radius,
                  });
                },
              }}
            >
              <Popup>
                <div className="text-center">
                  <h4 className="font-bold text-green-700">{municipio.name}</h4>
                  <p className="text-sm text-gray-700">
                    {count} {count === 1 ? "participação" : "participações"}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Legend and info footer */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-green-50 to-blue-50 border-t border-green-100">
        <p className="text-xs sm:text-sm text-gray-700 font-medium mb-2">
          Um território formado por 13 municípios e muitas experiências de cuidado.
        </p>

        {/* Color legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-50 border border-gray-300"></div>
            <span className="text-gray-600">Sem participação</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-200 border border-green-300"></div>
            <span className="text-gray-600">Poucas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-500 border border-green-600"></div>
            <span className="text-gray-600">Muitas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-700 border border-green-800"></div>
            <span className="text-gray-600">Destaque</span>
          </div>
        </div>

        {/* Data info */}
        {Object.keys(municipalitiesData).length > 0 && (
          <p className="text-xs text-gray-600 mt-2">
            Total de participações:{" "}
            <span className="font-bold text-green-700">
              {Object.values(municipalitiesData).reduce((a, b) => a + b, 0)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
