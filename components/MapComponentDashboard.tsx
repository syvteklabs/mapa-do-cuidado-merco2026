"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configurar ícones padrão do Leaflet
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

interface Municipality {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentDashboardProps {
  municipalities: Municipality[];
  stats?: Record<string, number>;
  selectedMunicipio?: string | null;
  onMunicipioSelect?: (municipio: string | null) => void;
}

const getColorForParticipations = (count: number, maxCount: number): string => {
  if (count === 0) return "#d1d5db";
  if (maxCount === 0) return "#d1d5db";

  const ratio = count / maxCount;
  if (ratio >= 0.75) return "#16a34a";
  if (ratio >= 0.5) return "#22c55e";
  if (ratio >= 0.25) return "#86efac";
  return "#86efac";
};

export default function MapComponentDashboard({
  municipalities,
  stats = {},
  selectedMunicipio = null,
  onMunicipioSelect = () => {},
}: MapComponentDashboardProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  useEffect(() => {
    if (mapRef.current) return;

    try {
      const mapElement = document.getElementById("map-dashboard");
      if (!mapElement) return;

      const center = [-21.25, -41.9];
      const bounds = L.latLngBounds(
        [-20.6, -41.4],
        [-21.85, -42.25]
      );

      const map = L.map("map-dashboard", {
        center: center as L.LatLngExpression,
        zoom: 10,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      const maxCount = Math.max(
        ...Object.values(stats || {}).filter((v) => typeof v === "number"),
        1
      );

      municipalities.forEach((municipality) => {
        const count = (stats || {})[municipality.name] || 0;
        const color = getColorForParticipations(count, maxCount);
        const isSelected = selectedMunicipio === municipality.name;
        const radius = isSelected
          ? 12
          : count === 0
            ? 6
            : Math.min(6 + (count / maxCount) * 4, 10);

        const marker = L.circleMarker([municipality.lat, municipality.lng], {
          radius: radius,
          fillColor: color,
          color: isSelected ? "#1f2937" : count === 0 ? "#9ca3af" : "#16a34a",
          weight: isSelected ? 3 : 2,
          opacity: 0.9,
          fillOpacity: 0.8,
        })
          .bindPopup(
            `<div class="font-semibold text-sm">${municipality.name}</div>
             <div class="text-xs text-gray-600">Participações: ${count}</div>`,
            { closeButton: false }
          )
          .on("click", () => {
            onMunicipioSelect(isSelected ? null : municipality.name);
          })
          .addTo(map);

        markersRef.current.push(marker);
      });

      setTimeout(() => {
        map.fitBounds(bounds, { padding: [50, 50] });
      }, 100);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error("Erro ao inicializar mapa:", error);
    }
  }, [municipalities, stats, selectedMunicipio, onMunicipioSelect]);

  return (
    <div
      id="map-dashboard"
      className="w-full h-full"
      style={{ minHeight: "100%" }}
    />
  );
}
