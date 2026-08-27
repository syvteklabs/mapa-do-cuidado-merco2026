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
// Baseado em coordenadas geográficas reais transformadas para coordenadas SVG
// ViewBox: 0-200, 0-200 para melhor representação cartográfica com estrutura coerente
const MUNICIPALITIES: Municipality[] = [
  // Região Norte - Laje do Muriaé, Aperibé, Varre-Sai
  {
    name: "Laje do Muriaé",
    lat: -20.8389,
    lng: -41.6392,
    labelX: 155,
    labelY: 28,
    polygon: "M 142 15 L 168 12 L 172 42 L 146 45 Z"
  },
  {
    name: "Aperibé",
    lat: -20.9669,
    lng: -41.7486,
    labelX: 125,
    labelY: 38,
    polygon: "M 110 22 L 140 18 L 143 50 L 113 54 Z"
  },
  {
    name: "Varre-Sai",
    lat: -20.7531,
    lng: -41.8492,
    labelX: 85,
    labelY: 28,
    polygon: "M 70 12 L 110 8 L 115 45 L 75 49 Z"
  },

  // Região Nordeste - Bom Jesus do Itabapoana, Porciúncula
  {
    name: "Bom Jesus do Itabapoana",
    lat: -21.1356,
    lng: -41.7778,
    labelX: 135,
    labelY: 75,
    polygon: "M 120 58 L 150 54 L 155 95 L 125 99 Z"
  },
  {
    name: "Porciúncula",
    lat: -20.9228,
    lng: -41.9231,
    labelX: 88,
    labelY: 62,
    polygon: "M 72 46 L 105 42 L 110 78 L 77 82 Z"
  },

  // Região Centro - Itaperuna, Italva, São José de Ubá
  {
    name: "Itaperuna",
    lat: -21.2278,
    lng: -41.8833,
    labelX: 118,
    labelY: 100,
    polygon: "M 103 83 L 133 80 L 138 122 L 108 125 Z"
  },
  {
    name: "Italva",
    lat: -21.1958,
    lng: -41.9483,
    labelX: 80,
    labelY: 90,
    polygon: "M 65 75 L 100 72 L 105 108 L 70 111 Z"
  },
  {
    name: "São José de Ubá",
    lat: -21.3142,
    lng: -41.9789,
    labelX: 82,
    labelY: 125,
    polygon: "M 67 108 L 98 105 L 103 145 L 72 148 Z"
  },

  // Região Oeste - Santo Antônio de Pádua, Miracema
  {
    name: "Santo Antônio de Pádua",
    lat: -21.5331,
    lng: -42.1947,
    labelX: 48,
    labelY: 135,
    polygon: "M 35 118 L 62 115 L 67 160 L 40 163 Z"
  },
  {
    name: "Miracema",
    lat: -21.4494,
    lng: -41.9831,
    labelX: 78,
    labelY: 150,
    polygon: "M 63 133 L 93 130 L 98 175 L 68 178 Z"
  },

  // Região Sul - Cambuci, Natividade
  {
    name: "Cambuci",
    lat: -21.5261,
    lng: -41.7014,
    labelX: 160,
    labelY: 140,
    polygon: "M 147 123 L 175 120 L 180 165 L 152 168 Z"
  },
  {
    name: "Natividade",
    lat: -21.5128,
    lng: -41.4328,
    labelX: 185,
    labelY: 130,
    polygon: "M 173 115 L 198 112 L 200 155 L 175 158 Z"
  },

  // Região Sudoeste - Itaocara
  {
    name: "Itaocara",
    lat: -21.7739,
    lng: -42.0611,
    labelX: 58,
    labelY: 170,
    polygon: "M 43 153 L 73 150 L 78 192 L 48 195 Z"
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

        {/* Municipality points - cities represented as circles */}
        {MUNICIPALITIES.map((municipality, index) => {
          const count = municipalitiesData[municipality.name] || 0;
          const color = getColorForParticipations(count, maxCount);
          const borderColor = getBorderColor(count);
          const radius = count === 0 ? 3 : Math.min(3 + (count / maxCount) * 3, 6);

          return (
            <g
              key={municipality.name}
              onMouseEnter={() => setHoveredMunicipality(municipality.name)}
              onMouseLeave={() => setHoveredMunicipality(null)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* City point circle */}
              <circle
                className="municipality-path"
                cx={municipality.labelX}
                cy={municipality.labelY}
                r={radius}
                fill={color}
                stroke={borderColor}
                strokeWidth="1.5"
              />

              {/* Municipality label on hover */}
              {hoveredMunicipality === municipality.name && (
                <text
                  x={municipality.labelX}
                  y={municipality.labelY - radius - 2}
                  fontSize="2"
                  fontWeight="600"
                  fill="#166534"
                  textAnchor="middle"
                  className="municipality-label"
                  style={{ opacity: 1, pointerEvents: "none" }}
                >
                  {municipality.name}
                </text>
              )}

              {/* Participation count label */}
              {count > 0 && (
                <text
                  x={municipality.labelX}
                  y={municipality.labelY + radius + 3}
                  fontSize="1.2"
                  fontWeight="600"
                  fill="#166534"
                  textAnchor="middle"
                  className="municipality-label"
                  style={{ opacity: 0.8, pointerEvents: "none" }}
                >
                  {count}
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
          Um território formado por 13 municípios e diferentes experiências de cuidado.
        </p>

        {/* Color legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-50 border border-gray-300"></div>
            <span className="text-gray-600">Sem participações</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-200 border border-green-300"></div>
            <span className="text-gray-600">Poucas participações</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-500 border border-green-600"></div>
            <span className="text-gray-600">Participação crescente</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-700 border border-green-800"></div>
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
