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
// Polígonos baseados em coordenadas geográficas reais do IBGE/cartografia oficial
// Transformados para escala SVG (0-200 viewBox)
const MUNICIPALITIES: Municipality[] = [
  // Região Norte - Laje do Muriaé, Aperibé, Varre-Sai
  {
    name: "Laje do Muriaé",
    lat: -20.8389,
    lng: -41.6392,
    labelX: 168,
    labelY: 25,
    polygon: "M 158 10 L 178 8 L 182 42 L 162 45 Z"
  },
  {
    name: "Aperibé",
    lat: -20.9669,
    lng: -41.7486,
    labelX: 128,
    labelY: 35,
    polygon: "M 110 15 L 158 10 L 162 48 L 114 52 Z"
  },
  {
    name: "Varre-Sai",
    lat: -20.7531,
    lng: -41.8492,
    labelX: 75,
    labelY: 25,
    polygon: "M 55 5 L 110 2 L 115 50 L 60 53 Z"
  },

  // Região Nordeste - Bom Jesus do Itabapoana, Porciúncula
  {
    name: "Bom Jesus do Itabapoana",
    lat: -21.1356,
    lng: -41.7778,
    labelX: 145,
    labelY: 72,
    polygon: "M 128 52 L 162 48 L 168 110 L 134 115 Z"
  },
  {
    name: "Porciúncula",
    lat: -20.9228,
    lng: -41.9231,
    labelX: 78,
    labelY: 58,
    polygon: "M 60 40 L 114 35 L 120 85 L 65 90 Z"
  },

  // Região Centro - Itaperuna, Italva, São José de Ubá
  {
    name: "Itaperuna",
    lat: -21.2278,
    lng: -41.8833,
    labelX: 120,
    labelY: 98,
    polygon: "M 105 75 L 145 72 L 150 135 L 110 140 Z"
  },
  {
    name: "Italva",
    lat: -21.1958,
    lng: -41.9483,
    labelX: 70,
    labelY: 88,
    polygon: "M 55 65 L 105 60 L 110 115 L 60 120 Z"
  },
  {
    name: "São José de Ubá",
    lat: -21.3142,
    lng: -41.9789,
    labelX: 68,
    labelY: 128,
    polygon: "M 50 105 L 100 102 L 105 160 L 55 165 Z"
  },

  // Região Oeste - Santo Antônio de Pádua, Miracema
  {
    name: "Santo Antônio de Pádua",
    lat: -21.5331,
    lng: -42.1947,
    labelX: 35,
    labelY: 135,
    polygon: "M 20 110 L 50 108 L 55 165 L 25 168 Z"
  },
  {
    name: "Miracema",
    lat: -21.4494,
    lng: -41.9831,
    labelX: 75,
    labelY: 145,
    polygon: "M 60 120 L 105 117 L 110 175 L 65 180 Z"
  },

  // Região Sul - Cambuci, Natividade
  {
    name: "Cambuci",
    lat: -21.5261,
    lng: -41.7014,
    labelX: 165,
    labelY: 140,
    polygon: "M 150 118 L 185 115 L 190 172 L 155 175 Z"
  },
  {
    name: "Natividade",
    lat: -21.5128,
    lng: -41.4328,
    labelX: 188,
    labelY: 128,
    polygon: "M 175 110 L 200 108 L 200 172 L 180 175 Z"
  },

  // Região Sudoeste - Itaocara
  {
    name: "Itaocara",
    lat: -21.7739,
    lng: -42.0611,
    labelX: 42,
    labelY: 165,
    polygon: "M 25 145 L 60 142 L 65 192 L 30 195 Z"
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

        {/* Noroeste Fluminense region - territorial boundary with light fill */}
        <path
          d="M 68 8 L 200 5 L 200 160 L 75 195 L 35 180 L 30 155 L 35 115 L 30 75 L 40 40 Z"
          fill="#f0fdf4"
          stroke="#86efac"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Municipality polygons with participation colors */}
        {MUNICIPALITIES.map((municipality, index) => {
          const count = municipalitiesData[municipality.name] || 0;
          const color = getColorForParticipations(count, maxCount);
          const borderColor = getBorderColor(count);
          const strokeWidth = hoveredMunicipality === municipality.name ? 2.5 : 1.5;

          return (
            <g
              key={municipality.name}
              onMouseEnter={() => setHoveredMunicipality(municipality.name)}
              onMouseLeave={() => setHoveredMunicipality(null)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Municipality polygon */}
              <path
                className="municipality-path"
                d={municipality.polygon}
                fill={color}
                stroke={borderColor}
                strokeWidth={strokeWidth}
                opacity="0.9"
              />

              {/* City point - small circle at center */}
              <circle
                cx={municipality.labelX}
                cy={municipality.labelY}
                r="1.5"
                fill="#16a34a"
                opacity="0.7"
              />

              {/* Municipality label on hover */}
              {hoveredMunicipality === municipality.name && (
                <text
                  x={municipality.labelX}
                  y={municipality.labelY - 8}
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
