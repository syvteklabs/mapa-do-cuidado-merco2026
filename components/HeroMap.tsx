"use client";

import { useEffect, useState } from "react";

interface HeroMapProps {
  stats?: {
    total: number;
    byMunicipio: Record<string, number>;
  } | null;
}

interface Municipality {
  name: string;
  x: number;
  y: number;
  participations?: number;
}

export default function HeroMap({ stats }: HeroMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Municipalities with realistic normalized coordinates
  const municipalities: Municipality[] = [
    { name: "Aperibé", x: 20, y: 28 },
    { name: "Porciúncula", x: 18, y: 36 },
    { name: "Laje do Muriaé", x: 15, y: 22 },
    { name: "Bom Jesus do Itabapoana", x: 28, y: 42 },
    { name: "Varre-Sai", x: 22, y: 48 },
    { name: "Italva", x: 35, y: 30 },
    { name: "Itaperuna", x: 38, y: 36 },
    { name: "São José de Ubá", x: 40, y: 42 },
    { name: "Miracema", x: 35, y: 48 },
    { name: "Natividade", x: 48, y: 32 },
    { name: "Cambuci", x: 50, y: 40 },
    { name: "Itaocara", x: 42, y: 52 },
    { name: "Santo Antônio de Pádua", x: 45, y: 58 },
  ];

  // Add participation data from stats if available
  const municipalitiesWithData = municipalities.map((mun) => ({
    ...mun,
    participations: stats?.byMunicipio?.[mun.name] || 0,
  }));

  const maxParticipations = Math.max(
    ...municipalitiesWithData.map((m) => m.participations || 0),
    1
  );

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      {/* SVG Map */}
      <svg
        className={`w-full h-full transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Regional background gradient */}
          <linearGradient id="heroRegionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f0f7ff", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#e0f0ff", stopOpacity: 1 }} />
          </linearGradient>

          {/* Pulse animations */}
          <defs>
            <style>{`
              @keyframes pulse-animation {
                0%, 100% { r: 2.5; opacity: 0.3; }
                50% { r: 4; opacity: 0; }
              }
              @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              .municipality-pulse {
                animation: pulse-animation 3s infinite;
              }
              .territory-map {
                animation: fade-in 1.2s ease-out;
              }
            `}</style>
          </defs>

          {/* Participation gradient - from light to saturated blue */}
          <linearGradient id="participationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#93c5fd", stopOpacity: 0.5 }} />
            <stop offset="50%" style={{ stopColor: "#3b82f6", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "#1d4ed8", stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Background region (simplified Noroeste Fluminense) */}
        <g className="territory-map">
          <path
            d="M 12 15 L 55 12 L 58 65 L 40 70 L 20 65 L 12 48 Z"
            fill="url(#heroRegionGradient)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            opacity="0.8"
          />
        </g>

        {/* Subtle connection lines between municipalities */}
        <g className="territory-map" stroke="#cbd5e1" strokeWidth="0.4" opacity="0.4">
          <line x1="20" y1="28" x2="35" y2="30" />
          <line x1="35" y1="30" x2="38" y2="36" />
          <line x1="38" y1="36" x2="40" y2="42" />
          <line x1="40" y1="42" x2="45" y2="58" />
          <line x1="45" y1="58" x2="42" y2="52" />
          <line x1="42" y1="52" x2="48" y2="32" />
          <line x1="48" y1="32" x2="50" y2="40" />
          <line x1="18" y1="36" x2="28" y2="42" />
          <line x1="28" y1="42" x2="35" y2="48" />
        </g>

        {/* Municipality points with participation indicator */}
        {municipalitiesWithData.map((mun, idx) => {
          const scale =
            mun.participations && mun.participations > 0
              ? 1.5 + (mun.participations / maxParticipations) * 1.5
              : 1;
          const opacity = mun.participations && mun.participations > 0 ? 0.9 : 0.6;

          return (
            <g key={mun.name} style={{ animationDelay: `${idx * 0.1}s` }}>
              {/* Pulse effect for municipalities with participation */}
              {mun.participations && mun.participations > 0 && (
                <circle
                  cx={mun.x}
                  cy={mun.y}
                  r="2.5"
                  fill="#3b82f6"
                  className="municipality-pulse"
                  style={{
                    animationDelay: `${idx * 0.15}s`,
                  }}
                />
              )}

              {/* Main municipality point */}
              <circle
                cx={mun.x}
                cy={mun.y}
                r={0.9 * scale}
                fill={mun.participations && mun.participations > 0 ? "#1e40af" : "#93c5fd"}
                stroke={
                  mun.participations && mun.participations > 0
                    ? "#1e3a8a"
                    : "#bfdbfe"
                }
                strokeWidth="0.4"
                opacity={opacity}
                className="territory-map"
                style={{
                  transition: "all 0.3s ease",
                }}
              />

              {/* Label - positioned above municipality */}
              <text
                x={mun.x}
                y={mun.y - 3.5}
                textAnchor="middle"
                fontSize="1.8"
                fill="#1f2937"
                fontWeight="600"
                opacity="0"
                className="territory-map"
                style={{
                  pointerEvents: "none",
                  transition: "opacity 0.3s ease",
                }}
              >
                {mun.name}
              </text>
            </g>
          );
        })}

        {/* Region label at bottom */}
        <text
          x="50"
          y="78"
          textAnchor="middle"
          fontSize="3.2"
          fill="#1f2937"
          fontWeight="bold"
          opacity="0.8"
          className="territory-map"
        >
          Noroeste Fluminense
        </text>
        <text
          x="50"
          y="85"
          textAnchor="middle"
          fontSize="2"
          fill="#4b5563"
          opacity="0.6"
          className="territory-map"
        >
          13 Municípios — Construindo juntos
        </text>
      </svg>

      {/* Legend - Discrete and positioned */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 text-xs border border-gray-200 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-900"></div>
            <span className="text-gray-700 font-medium">Com participações</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-300"></div>
            <span className="text-gray-600">Sem participações</span>
          </div>
        </div>
      </div>

      {/* Stats indicator - top right */}
      {stats && stats.total > 0 && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 text-xs border border-gray-200 shadow-sm">
          <div className="font-semibold text-gray-900">{stats.total}</div>
          <div className="text-gray-600 text-xs">
            {stats.total === 1 ? "participação" : "participações"}
          </div>
        </div>
      )}
    </div>
  );
}
