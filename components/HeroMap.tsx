"use client";

export default function HeroMap() {
  // Municipalities of Noroeste Fluminense with approximate positions
  const municipalities = [
    { name: "Aperibé", x: 25, y: 30 },
    { name: "Porciúncula", x: 30, y: 35 },
    { name: "Laje do Muriaé", x: 20, y: 25 },
    { name: "Bom Jesus do Itabapoana", x: 35, y: 40 },
    { name: "Varre-Sai", x: 25, y: 45 },
    { name: "Italva", x: 40, y: 32 },
    { name: "Itaperuna", x: 42, y: 38 },
    { name: "São José de Ubá", x: 44, y: 42 },
    { name: "Miracema", x: 38, y: 45 },
    { name: "Natividade", x: 50, y: 35 },
    { name: "Cambuci", x: 52, y: 40 },
    { name: "Itaocara", x: 45, y: 50 },
    { name: "Santo Antônio de Pádua", x: 48, y: 55 },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-lg">
      {/* Map visualization */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Background region shape (simplified Noroeste Fluminense outline) */}
        <defs>
          <linearGradient id="regionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#c7d2fe', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#ddd6fe', stopOpacity: 0.5 }} />
          </linearGradient>
          <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* Region background */}
        <path
          d="M 20 20 L 55 15 L 60 50 L 50 65 L 25 60 Z"
          fill="url(#regionGradient)"
          stroke="#4f46e5"
          strokeWidth="0.8"
        />

        {/* Connection lines between municipalities (subtle network) */}
        <g stroke="#a5b4fc" strokeWidth="0.3" opacity="0.4">
          <line x1="25" y1="30" x2="30" y2="35" />
          <line x1="30" y1="35" x2="35" y2="40" />
          <line x1="35" y1="40" x2="40" y2="32" />
          <line x1="40" y1="32" x2="42" y2="38" />
          <line x1="42" y1="38" x2="44" y2="42" />
          <line x1="44" y1="42" x2="48" y2="55" />
          <line x1="45" y1="50" x2="50" y2="35" />
        </g>

        {/* Municipality points */}
        {municipalities.map((mun) => (
          <g key={mun.name}>
            {/* Pulse effect */}
            <circle
              cx={mun.x}
              cy={mun.y}
              r="3"
              fill="url(#pulseGradient)"
              opacity="0.6"
            />
            {/* Main point */}
            <circle
              cx={mun.x}
              cy={mun.y}
              r="1.5"
              fill="#3b82f6"
              stroke="#1e40af"
              strokeWidth="0.3"
            />
          </g>
        ))}

        {/* Center indicator */}
        <circle cx="40" cy="40" r="2" fill="none" stroke="#dc2626" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.5" />

        {/* Region label */}
        <text x="40" y="75" textAnchor="middle" fontSize="4" fill="#4f46e5" fontWeight="bold" opacity="0.8">
          Noroeste Fluminense
        </text>
        <text x="40" y="82" textAnchor="middle" fontSize="2.5" fill="#6366f1" opacity="0.6">
          13 Municípios Participando
        </text>
      </svg>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 text-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span className="text-gray-700">Municípios participando</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-2.5 bg-indigo-300"></div>
          <span className="text-gray-600">Conexões colaborativas</span>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-4 right-4 bg-green-100/80 backdrop-blur rounded-full p-2">
        <p className="text-lg">🌍</p>
      </div>
    </div>
  );
}
