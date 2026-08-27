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

// Mapa territorial realista do Noroeste Fluminense com 13 municípios
// Baseado em coordenadas geográficas reais
// ViewBox: 0-200, 0-200 para melhor representação cartográfica
const MUNICIPALITIES: Municipality[] = [
  // Norte - Laje do Muriaé, Aperibé, Varre-Sai
  {
    name: "Laje do Muriaé",
    lat: -20.8389,
    lng: -41.6392,
    labelX: 145,
    labelY: 25,
    polygon: "M 135 10 L 160 8 L 165 35 L 140 38 Z"
  },
  {
    name: "Aperibé",
    lat: -20.9669,
    lng: -41.7486,
    labelX: 125,
    labelY: 40,
    polygon: "M 118 28 L 135 25 L 138 48 L 121 50 Z"
  },
  {
    name: "Varre-Sai",
    lat: -20.7531,
    lng: -41.8492,
    labelX: 105,
    labelY: 25,
    polygon: "M 95 15 L 120 10 L 125 40 L 100 45 Z"
  },

  // Nordeste - Bom Jesus, Porciúncula
  {
    name: "Bom Jesus do Itabapoana",
    lat: -21.1356,
    lng: -41.7778,
    labelX: 120,
    labelY: 70,
    polygon: "M 113 55 L 135 50 L 140 85 L 118 90 Z"
  },
  {
    name: "Porciúncula",
    lat: -20.9228,
    lng: -41.9231,
    labelX: 90,
    labelY: 55,
    polygon: "M 80 40 L 105 35 L 110 70 L 85 75 Z"
  },

  // Centro - Itaperuna, Italva, São José de Ubá
  {
    name: "Itaperuna",
    lat: -21.2278,
    lng: -41.8833,
    labelX: 105,
    labelY: 85,
    polygon: "M 95 70 L 120 65 L 128 105 L 103 110 Z"
  },
  {
    name: "Italva",
    lat: -21.1958,
    lng: -41.9483,
    labelX: 82,
    labelY: 78,
    polygon: "M 70 65 L 95 60 L 103 95 L 78 100 Z"
  },
  {
    name: "São José de Ubá",
    lat: -21.3142,
    lng: -41.9789,
    labelX: 85,
    labelY: 105,
    polygon: "M 75 90 L 100 85 L 108 125 L 83 130 Z"
  },

  // Oeste - Santo Antônio de Pádua, Miracema
  {
    name: "Santo Antônio de Pádua",
    lat: -21.5331,
    lng: -42.1947,
    labelX: 50,
    labelY: 120,
    polygon: "M 40 105 L 65 100 L 72 145 L 47 150 Z"
  },
  {
    name: "Miracema",
    lat: -21.4494,
    lng: -41.9831,
    labelX: 75,
    labelY: 130,
    polygon: "M 65 115 L 90 110 L 98 155 L 73 160 Z"
  },

  // Sul - Cambuci, Natividade
  {
    name: "Cambuci",
    lat: -21.5261,
    lng: -41.7014,
    labelX: 150,
    labelY: 130,
    polygon: "M 140 115 L 165 110 L 172 155 L 147 160 Z"
  },
  {
    name: "Natividade",
    lat: -21.5128,
    lng: -41.4328,
    labelX: 175,
    labelY: 125,
    polygon: "M 165 110 L 190 105 L 197 150 L 172 155 Z"
  },

  // Sudoeste - Itaocara
  {
    name: "Itaocara",
    lat: -21.7739,
    lng: -42.0611,
    labelX: 60,
    labelY: 155,
    polygon: "M 50 140 L 75 135 L 82 180 L 57 185 Z"
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
        viewBox="0 0 200 200"
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
              font-size: 2.5px;
              font-weight: 700;
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
        <rect width="200" height="200" fill="#ffffff" />

        {/* Noroeste Fluminense region boundary - territorial outline */}
        <path
          d="M 150 20 L 170 22 L 180 40 L 190 65 L 195 100 L 190 135 L 180 160 L 160 180 L 130 190 L 90 192 L 50 185 L 25 165 L 12 135 L 8 100 L 10 65 L 18 40 L 35 25 L 70 15 Z"
          fill="none"
          stroke="#c4c4c4"
          strokeWidth="1.5"
          opacity="0.4"
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
          x="100"
          y="195"
          textAnchor="middle"
          fontSize="3.5"
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
