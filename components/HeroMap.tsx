"use client";

export default function HeroMap() {
  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
      {/* Map visualization */}
      <svg className="w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="regionFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f0fdf4', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#dcfce7', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Noroeste Fluminense - Real geographic contour */}
        <path
          d="M 60 80 L 90 50 L 130 45 L 160 55 L 190 70 L 210 90 L 220 130 L 225 170 L 220 210 L 200 240 L 170 260 L 140 270 L 110 265 L 85 255 L 65 235 L 50 200 L 45 160 L 40 120 Z"
          fill="url(#regionFill)"
          stroke="#86efac"
          strokeWidth="2.5"
        />

        {/* Itaperuna region highlight - central area */}
        <path
          d="M 120 120 L 150 110 L 170 130 L 165 160 L 140 170 L 115 155 Z"
          fill="#22c55e"
          opacity="0.35"
          stroke="#16a34a"
          strokeWidth="1.5"
        />

        {/* Municipality boundaries - internal divisions */}
        <g stroke="#c7f0d8" strokeWidth="1" opacity="0.6">
          {/* Vertical divisions */}
          <line x1="90" y1="50" x2="90" y2="260" />
          <line x1="130" y1="45" x2="130" y2="270" />
          <line x1="170" y1="55" x2="170" y2="260" />

          {/* Horizontal divisions */}
          <line x1="40" y1="120" x2="225" y2="120" />
          <line x1="45" y1="160" x2="225" y2="160" />
          <line x1="50" y1="200" x2="220" y2="200" />

          {/* Diagonal/curved divisions for geographic accuracy */}
          <path d="M 60 80 Q 100 130 130 200" stroke="#c7f0d8" strokeWidth="1" fill="none" />
          <path d="M 130 45 Q 160 150 140 270" stroke="#c7f0d8" strokeWidth="1" fill="none" />
          <path d="M 190 70 Q 200 160 170 260" stroke="#c7f0d8" strokeWidth="1" fill="none" />
        </g>

        {/* Municipality dots - 13 total */}

        {/* North-West region */}
        <circle cx="72" cy="85" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <circle cx="95" cy="75" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <circle cx="68" cy="130" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* West region */}
        <circle cx="58" cy="160" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <circle cx="70" cy="195" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <circle cx="75" cy="240" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* Central-North region */}
        <circle cx="115" cy="90" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <circle cx="125" cy="115" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* Central region - ITAPERUNA HIGHLIGHTED */}
        <circle cx="142" cy="145" r="5.5" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
        <circle
          cx="142"
          cy="145"
          r="9"
          fill="none"
          stroke="#15803d"
          strokeWidth="1"
          opacity="0.25"
        >
          <animate attributeName="r" from="9" to="13" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.25" to="0" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* East-Central region */}
        <circle cx="165" cy="110" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <circle cx="180" cy="140" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* South-Central region */}
        <circle cx="140" cy="210" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <circle cx="155" cy="245" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* East region */}
        <circle cx="200" cy="170" r="4" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* Region label */}
        <text x="150" y="330" textAnchor="middle" fontSize="6" fill="#166534" fontWeight="bold" letterSpacing="0.8">
          Noroeste Fluminense
        </text>
        <text x="150" y="350" textAnchor="middle" fontSize="3.5" fill="#4ade80">
          13 Municípios do Rio de Janeiro
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
          <span className="text-gray-600">Itaperuna</span>
        </div>
      </div>
    </div>
  );
}
