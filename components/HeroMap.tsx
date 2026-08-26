"use client";

import { useState, useEffect } from "react";

export default function HeroMap() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // Municipalities of Noroeste Fluminense with more accurate positions
  // Normalized to 0-100 scale for SVG viewBox
  const municipalities = [
    { name: "Aperibé", x: 28, y: 32, population: "2.1k" },
    { name: "Porciúncula", x: 20, y: 28, population: "2.8k" },
    { name: "Laje do Muriaé", x: 18, y: 22, population: "1.2k" },
    { name: "Bom Jesus do Itabapoana", x: 32, y: 38, population: "3.5k" },
    { name: "Varre-Sai", x: 22, y: 42, population: "1.8k" },
    { name: "Italva", x: 38, y: 35, population: "2.4k" },
    { name: "Itaperuna", x: 42, y: 40, population: "3.8k" },
    { name: "São José de Ubá", x: 45, y: 45, population: "2.3k" },
    { name: "Miracema", x: 40, y: 50, population: "2.6k" },
    { name: "Natividade", x: 52, y: 38, population: "2.1k" },
    { name: "Cambuci", x: 55, y: 43, population: "2.9k" },
    { name: "Itaocara", x: 48, y: 55, population: "3.2k" },
    { name: "Santo Antônio de Pádua", x: 50, y: 60, population: "3.6k" },
  ];

  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-emerald-50 rounded-2xl overflow-hidden border border-indigo-200 shadow-xl transition-all duration-1000 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      {/* Map visualization */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Region gradient background */}
          <linearGradient id="regionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#d1fae5', stopOpacity: 0.4 }} />
          </linearGradient>

          {/* Pulse animation for participation indicators */}
          <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#0ea5e9', stopOpacity: 0 }} />
          </radialGradient>

          {/* Animation keyframes */}
          <style>{`
            @keyframes pulse-ring {
              0% {
                r: 2;
                opacity: 0.8;
              }
              100% {
                r: 5;
                opacity: 0;
              }
            }
            @keyframes float-up {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-pulse-ring {
              animation: pulse-ring 2s ease-out infinite;
            }
            .animate-float-up {
              animation: float-up 0.8s ease-out;
            }
          `}</style>
        </defs>

        {/* Regional boundary shape - Noroeste Fluminense contorno aproximado */}
        <path
          d="M 15 18 L 35 15 L 52 20 L 60 35 L 58 55 L 52 65 L 35 70 L 20 65 L 15 45 Z"
          fill="url(#regionGradient)"
          stroke="#6366f1"
          strokeWidth="1.2"
          opacity="0.8"
          className="animate-float-up"
          style={{ animationDelay: '0.2s' }}
        />

        {/* Subtle connection network between municipalities */}
        <g stroke="#a5d6ff" strokeWidth="0.5" opacity="0.35" className="animate-float-up" style={{ animationDelay: '0.4s' }}>
          {/* Main connections forming a territorial network */}
          <line x1="20" y1="28" x2="28" y2="32" />
          <line x1="28" y1="32" x2="32" y2="38" />
          <line x1="32" y1="38" x2="38" y2="35" />
          <line x1="38" y1="35" x2="42" y2="40" />
          <line x1="42" y1="40" x2="45" y2="45" />
          <line x1="45" y1="45" x2="40" y2="50" />
          <line x1="40" y1="50" x2="48" y2="55" />
          <line x1="48" y1="55" x2="50" y2="60" />
          <line x1="42" y1="40" x2="52" y2="38" />
          <line x1="52" y1="38" x2="55" y2="43" />
        </g>

        {/* Municipality points with participation indicators */}
        {municipalities.map((mun, index) => (
          <g
            key={mun.name}
            className="animate-float-up"
            style={{ animationDelay: `${0.6 + index * 0.05}s` }}
          >
            {/* Pulse ring effect */}
            <circle
              cx={mun.x}
              cy={mun.y}
              r="2"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="0.6"
              opacity="0.6"
              className="animate-pulse-ring"
            />

            {/* Main municipality point */}
            <circle
              cx={mun.x}
              cy={mun.y}
              r="2"
              fill="#0ea5e9"
              stroke="#0369a1"
              strokeWidth="0.5"
            />

            {/* Glow effect */}
            <circle
              cx={mun.x}
              cy={mun.y}
              r="2.5"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.3"
              opacity="0.4"
            />
          </g>
        ))}

        {/* Central territory highlight */}
        <circle
          cx="38"
          cy="42"
          r="20"
          fill="none"
          stroke="#6366f1"
          strokeWidth="0.4"
          strokeDasharray="2,2"
          opacity="0.2"
          className="animate-float-up"
          style={{ animationDelay: '1s' }}
        />
      </svg>

      {/* Legend overlay - bottom left */}
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-200 text-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>
          <span className="text-gray-700 font-medium">Municípios participando</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-300"></div>
          <span className="text-gray-600">Conexões territoriais</span>
        </div>
      </div>

      {/* Title overlay - center bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/40 to-transparent p-4 text-center pointer-events-none">
        <p className="text-xs sm:text-sm font-semibold text-gray-700">
          13 municípios mapeando os caminhos do cuidado
        </p>
      </div>
    </div>
  );
}
