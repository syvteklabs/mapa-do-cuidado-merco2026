"use client";

import { animationClasses } from "@/lib/animations";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ContextAndTrustBar() {
  const items: TrustItem[] = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "13 Municípios",
      description: "Primeiro ciclo de participação",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: "Voluntária",
      description: "Participação sem obrigação",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm-5.5 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm7 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
          <path d="M8 15h8" />
        </svg>
      ),
      title: "Respostas Anônimas",
      description: "Sem identificação pessoal",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="2" x2="12" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: "Visualização Agregada",
      description: "Padrões coletivos revelados",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-start gap-3 py-4 px-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 hover:border-blue-200/70 transition-colors ${animationClasses.fadeInUp}`}
            style={{
              animationDelay: `${index * 75}ms`,
            }}
          >
            {/* Icon */}
            <div className="text-blue-600 flex-shrink-0">{item.icon}</div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
