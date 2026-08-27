"use client";

export default function HeroMap() {
  const municipalities = [
    { name: "Aperibé", label: "Aperibé" },
    { name: "Porciúncula", label: "Porciúncula" },
    { name: "Laje do Muriaé", label: "Laje do Muriaé" },
    { name: "Bom Jesus do Itabapoana", label: "Bom Jesus" },
    { name: "Varre-Sai", label: "Varre-Sai" },
    { name: "Italva", label: "Italva" },
    { name: "Itaperuna", label: "Itaperuna", isHighlight: true },
    { name: "São José de Ubá", label: "São José de Ubá" },
    { name: "Miracema", label: "Miracema" },
    { name: "Natividade", label: "Natividade" },
    { name: "Cambuci", label: "Cambuci" },
    { name: "Itaocara", label: "Itaocara" },
    { name: "Santo Antônio de Pádua", label: "Santo Antônio" },
  ];

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
      {/* Map visualization */}
      <svg className="w-full h-full" viewBox="0 0 140 180" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="lightGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f0fdf4', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Base region - Noroeste Fluminense outline */}
        <path
          d="M 20 30 L 50 10 L 80 15 L 100 25 L 110 50 L 115 85 L 105 115 L 80 130 L 50 125 L 30 110 L 15 80 Z"
          fill="url(#lightGreen)"
          stroke="#86efac"
          strokeWidth="1.5"
        />

        {/* Itaperuna region - highlighted in green */}
        <path
          d="M 50 40 L 70 35 L 85 45 L 80 70 L 65 75 L 50 65 Z"
          fill="#22c55e"
          opacity="0.4"
          stroke="#16a34a"
          strokeWidth="1"
        />

        {/* Municipality boundaries - light dividing lines */}
        <g stroke="#dcfce7" strokeWidth="0.8" opacity="0.8">
          {/* North-South divisions */}
          <line x1="40" y1="20" x2="40" y2="120" />
          <line x1="60" y1="15" x2="60" y2="130" />
          <line x1="80" y1="20" x2="80" y2="125" />
          <line x1="100" y1="30" x2="100" y2="110" />

          {/* East-West divisions */}
          <line x1="20" y1="50" x2="115" y2="50" />
          <line x1="20" y1="75" x2="115" y2="75" />
          <line x1="25" y1="95" x2="110" y2="95" />

          {/* Diagonal divisions */}
          <line x1="30" y1="30" x2="80" y2="120" />
          <line x1="70" y1="20" x2="105" y2="100" />
        </g>

        {/* Municipality circles/dots */}
        {/* Porciúncula */}
        <circle cx="32" cy="28" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Aperibé */}
        <circle cx="48" cy="20" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Laje do Muriaé */}
        <circle cx="28" cy="50" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Bom Jesus do Itabapoana */}
        <circle cx="38" cy="68" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Varre-Sai */}
        <circle cx="32" cy="88" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Italva */}
        <circle cx="55" cy="42" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Itaperuna - HIGHLIGHTED */}
        <circle cx="65" cy="58" r="3.5" fill="#15803d" stroke="#166534" strokeWidth="1" />
        <circle
          cx="65"
          cy="58"
          r="6"
          fill="none"
          stroke="#15803d"
          strokeWidth="0.8"
          opacity="0.3"
        >
          <animate attributeName="r" from="6" to="9" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* São José de Ubá */}
        <circle cx="72" cy="72" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Miracema */}
        <circle cx="58" cy="88" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Natividade */}
        <circle cx="85" cy="48" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Cambuci */}
        <circle cx="95" cy="62" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Itaocara */}
        <circle cx="72" cy="105" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Santo Antônio de Pádua */}
        <circle cx="58" cy="118" r="2.5" fill="#86efac" stroke="#22c55e" strokeWidth="0.5" />

        {/* Region label */}
        <text x="65" y="155" textAnchor="middle" fontSize="5" fill="#166534" fontWeight="bold" letterSpacing="0.5">
          Noroeste Fluminense
        </text>
        <text x="65" y="168" textAnchor="middle" fontSize="3" fill="#4ade80">
          13 Municípios Conectados
        </text>
      </svg>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 text-xs shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
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
