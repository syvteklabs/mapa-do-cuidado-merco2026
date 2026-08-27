"use client";

export default function HeroMap() {
  // Municipalities with realistic geographic positions
  const municipalities = [
    { name: "Aperibé", x: 28, y: 22 },
    { name: "Porciúncula", x: 22, y: 28 },
    { name: "Laje do Muriaé", x: 18, y: 32 },
    { name: "Bom Jesus do Itabapoana", x: 25, y: 38 },
    { name: "Varre-Sai", x: 20, y: 42 },
    { name: "Italva", x: 35, y: 28 },
    { name: "Itaperuna", x: 38, y: 35 },
    { name: "São José de Ubá", x: 42, y: 40 },
    { name: "Miracema", x: 35, y: 45 },
    { name: "Natividade", x: 48, y: 32 },
    { name: "Cambuci", x: 52, y: 38 },
    { name: "Itaocara", x: 40, y: 50 },
    { name: "Santo Antônio de Pádua", x: 45, y: 55 },
  ];

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
      {/* Map visualization */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="regionGradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#dcfce7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
          </linearGradient>
          <radialGradient id="highlightGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#16a34a', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* Background - Noroeste Fluminense region (realistic shape) */}
        <path
          d="M 15 20 L 30 15 L 45 18 L 55 25 L 58 40 L 55 60 L 40 65 L 25 62 L 15 50 Z"
          fill="url(#regionGradientGreen)"
          stroke="#4ade80"
          strokeWidth="1.2"
        />

        {/* Highlight the main region (Itaperuna area) */}
        <path
          d="M 30 25 L 45 22 L 50 35 L 48 48 L 32 50 Z"
          fill="#16a34a"
          opacity="0.25"
          stroke="#22c55e"
          strokeWidth="0.8"
        />

        {/* Internal territorial divisions (subtle) */}
        <g stroke="#86efac" strokeWidth="0.4" opacity="0.4">
          <line x1="28" y1="20" x2="48" y2="35" />
          <line x1="22" y1="28" x2="40" y2="50" />
          <line x1="35" y1="28" x2="40" y2="65" />
          <line x1="45" y1="18" x2="55" y2="40" />
        </g>

        {/* Municipality circles - larger and more visible */}
        {municipalities.map((mun) => {
          const isItaperuna = mun.name === "Itaperuna";
          return (
            <g key={mun.name}>
              {/* Larger circle for all municipalities */}
              <circle
                cx={mun.x}
                cy={mun.y}
                r={isItaperuna ? 2.5 : 2}
                fill={isItaperuna ? "#15803d" : "#22c55e"}
                opacity={isItaperuna ? 1 : 0.8}
                stroke={isItaperuna ? "#166534" : "#16a34a"}
                strokeWidth="0.4"
              />
              {/* Pulse effect for Itaperuna */}
              {isItaperuna && (
                <circle
                  cx={mun.x}
                  cy={mun.y}
                  r="4"
                  fill="none"
                  stroke="#15803d"
                  strokeWidth="0.5"
                  opacity="0.3"
                >
                  <animate attributeName="r" from="4" to="6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Center point indicator */}
        <circle cx="38" cy="35" r="1" fill="none" stroke="#dc2626" strokeWidth="0.4" opacity="0.3" />

        {/* Region label */}
        <text x="38" y="78" textAnchor="middle" fontSize="3.5" fill="#166534" fontWeight="bold">
          Noroeste Fluminense
        </text>
        <text x="38" y="84" textAnchor="middle" fontSize="2" fill="#4ade80">
          13 Municípios Conectados
        </text>
      </svg>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 text-xs shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-gray-700 font-medium">Municípios</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-800"></div>
          <span className="text-gray-600">Itaperuna (referência)</span>
        </div>
      </div>
    </div>
  );
}
