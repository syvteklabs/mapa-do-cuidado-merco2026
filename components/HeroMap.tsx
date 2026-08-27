"use client";

import { useEffect, useState } from "react";

interface Municipality {
  name: string;
  lat: number;
  lng: number;
  polygon: string;
  labelX: number;
  labelY: number;
}

interface HeroMapProps {
  stats?: Record<string, number> | null;
}

// Converter coordenadas geográficas para SVG (viewBox 0-120, 0-140)
// Lat range: -20.75 a -21.77 (~1.02)
// Lng range: -41.43 a -42.19 (~0.76)
const latRange = { min: -20.7, max: -21.8, span: 1.1 };
const lngRange = { min: -41.4, max: -42.2, span: 0.8 };

const geoToSvg = (lat: number, lng: number): [number, number] => {
  const x = ((lngRange.max - lng) / lngRange.span) * 110 + 5;
  const y = ((lat - latRange.min) / latRange.span) * 125 + 5;
  return [x, y];
};

const MUNICIPALITIES: Municipality[] = [
  {
    name: "Aperibé",
    lat: -20.9669,
    lng: -41.7486,
    labelX: 75,
    labelY: 28,
    polygon: "M 72 22 L 82 20 L 85 28 L 75 30 Z"
  },
  {
    name: "Bom Jesus do Itabapoana",
    lat: -21.1356,
    lng: -41.7778,
    labelX: 72,
    labelY: 48,
    polygon: "M 68 42 L 80 40 L 83 52 L 71 54 Z"
  },
  {
    name: "Cambuci",
    lat: -21.5261,
    lng: -41.7014,
    labelX: 82,
    labelY: 92,
    polygon: "M 80 86 L 92 84 L 96 98 L 84 100 Z"
  },
  {
    name: "Italva",
    lat: -21.1958,
    lng: -41.9483,
    labelX: 55,
    labelY: 56,
    polygon: "M 50 50 L 62 48 L 65 60 L 53 62 Z"
  },
  {
    name: "Itaocara",
    lat: -21.7739,
    lng: -42.0611,
    labelX: 42,
    labelY: 116,
    polygon: "M 38 110 L 50 108 L 53 122 L 41 124 Z"
  },
  {
    name: "Itaperuna",
    lat: -21.2278,
    lng: -41.8833,
    labelX: 60,
    labelY: 68,
    polygon: "M 55 62 L 67 60 L 70 74 L 58 76 Z"
  },
  {
    name: "Laje do Muriaé",
    lat: -20.8389,
    lng: -41.6392,
    labelX: 85,
    labelY: 12,
    polygon: "M 82 6 L 94 4 L 97 16 L 85 18 Z"
  },
  {
    name: "Miracema",
    lat: -21.4494,
    lng: -41.9831,
    labelX: 48,
    labelY: 80,
    polygon: "M 44 74 L 56 72 L 59 86 L 47 88 Z"
  },
  {
    name: "Natividade",
    lat: -21.5128,
    lng: -41.4328,
    labelX: 105,
    labelY: 92,
    polygon: "M 101 86 L 113 84 L 116 98 L 104 100 Z"
  },
  {
    name: "Porciúncula",
    lat: -20.9228,
    lng: -41.9231,
    labelX: 48,
    labelY: 32,
    polygon: "M 44 26 L 56 24 L 59 38 L 47 40 Z"
  },
  {
    name: "Santo Antônio de Pádua",
    lat: -21.5331,
    lng: -42.1947,
    labelX: 32,
    labelY: 100,
    polygon: "M 28 94 L 40 92 L 43 106 L 31 108 Z"
  },
  {
    name: "São José de Ubá",
    lat: -21.3142,
    lng: -41.9789,
    labelX: 52,
    labelY: 72,
    polygon: "M 48 66 L 60 64 L 63 78 L 51 80 Z"
  },
  {
    name: "Varre-Sai",
    lat: -20.7531,
    lng: -41.8492,
    labelX: 52,
    labelY: 18,
    polygon: "M 48 12 L 60 10 L 63 24 L 51 26 Z"
  },
];

const getColorForParticipations = (count: number, maxCount: number): string => {
  if (count === 0) return "#f0fdf4";
  if (maxCount === 0) return "#f0fdf4";

  const ratio = count / maxCount;
  if (ratio >= 0.75) return "#16a34a";
  if (ratio >= 0.5) return "#22c55e";
  if (ratio >= 0.25) return "#86efac";
  return "#c7f0d8";
};

const getBorderColor = (count: number): string => {
  return count === 0 ? "#d1d5db" : "#22c55e";
};

export default function HeroMap({ stats = null }: HeroMapProps) {
  const [municipalitiesData, setMunicipalitiesData] = useState<Record<string, number>>(stats || {});
  const [hoveredMunicipality, setHoveredMunicipality] = useState<string | null>(null);

  useEffect(() => {
    if (stats) {
      setMunicipalitiesData(stats);
    }
  }, [stats]);

  const maxCount = Math.max(
    ...Object.values(municipalitiesData).filter((v) => typeof v === "number"),
    1
  );

  const getStrokeWidth = (municipalityName: string): number => {
    return hoveredMunicipality === municipalityName ? 3 : 2;
  };

  const getStrokeOpacity = (municipalityName: string): number => {
    return hoveredMunicipality === municipalityName ? 1 : 0.7;
  };

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg flex flex-col">
      {/* SVG Map */}
      <svg
        className="flex-1 w-full h-full"
        viewBox="0 0 120 140"
        preserveAspectRatio="xMidYMid meet"
        style={{ minHeight: "100%" }}
      >
        <defs>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .municipality-path {
              animation: fadeIn 0.8s ease-in-out forwards;
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .municipality-label {
              font-size: 2px;
              font-weight: 600;
              text-anchor: middle;
              opacity: 0;
              transition: opacity 0.3s ease;
              pointer-events: none;
            }
            .municipality-path:hover + .municipality-label,
            .municipality-label:hover {
              opacity: 1;
            }
          `}</style>
        </defs>

        {/* Background */}
        <rect width="120" height="140" fill="#ffffff" />

        {/* Noroeste Fluminense region boundary - simplified accurate outline */}
        <path
          d="M 85 10 L 100 12 L 105 22 L 115 35 L 118 55 L 115 75 L 110 95 L 105 110 L 95 120 L 75 125 L 55 128 L 35 120 L 25 105 L 20 85 L 18 65 L 20 45 L 25 30 L 35 18 L 50 12 L 65 10 Z"
          fill="none"
          stroke="#b0b9c3"
          strokeWidth="0.8"
          opacity="0.3"
        />

        {/* Municipality polygons - with staggered animation */}
        {MUNICIPALITIES.map((municipality, index) => {
          const count = municipalitiesData[municipality.name] || 0;
          const color = getColorForParticipations(count, maxCount);
          const borderColor = getBorderColor(count);
          const strokeWidth = getStrokeWidth(municipality.name);
          const strokeOpacity = getStrokeOpacity(municipality.name);

          return (
            <g
              key={municipality.name}
              onMouseEnter={() => setHoveredMunicipality(municipality.name)}
              onMouseLeave={() => setHoveredMunicipality(null)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <path
                className="municipality-path"
                d={municipality.polygon}
                fill={color}
                stroke={borderColor}
                strokeWidth={strokeWidth}
                opacity={strokeOpacity}
              />
              {/* Municipality label on hover */}
              {hoveredMunicipality === municipality.name && (
                <text
                  x={municipality.labelX}
                  y={municipality.labelY}
                  fontSize="1.2"
                  fontWeight="600"
                  fill="#166534"
                  textAnchor="middle"
                  className="municipality-label"
                  style={{ opacity: 1, pointerEvents: "none" }}
                >
                  {municipality.name.length > 15 ? municipality.name.substring(0, 12) + "..." : municipality.name}
                </text>
              )}
              <title>{municipality.name}: {count} participação(ões)</title>
            </g>
          );
        })}

        {/* Territory label and support text */}
        <text
          x="60"
          y="135"
          textAnchor="middle"
          fontSize="2.5"
          fontWeight="700"
          fill="#166534"
          className="municipality-label"
          style={{ opacity: 1, pointerEvents: "auto" }}
        >
          Noroeste Fluminense • 13 Municípios
        </text>
      </svg>

      {/* Support text and legend */}
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
            Total de participações: <span className="font-bold text-green-700">{Object.values(municipalitiesData).reduce((a, b) => a + b, 0)}</span>
          </p>
        )}
      </div>
    </div>
  );
}
