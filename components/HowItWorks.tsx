"use client";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Compartilhe",
      description:
        "Informe seu município e conte como você percebeu uma experiência relacionada aos caminhos do cuidado.",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="12" cy="10" r="1" />
          <circle cx="15" cy="10" r="1" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Protegemos",
      description:
        "Nenhum nome, contato, endereço, dado clínico ou localização em tempo real é solicitado.",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M10 17l2 2 4-4" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Agregamos",
      description:
        "As respostas são combinadas para evitar a identificação individual.",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Visualizamos",
      description:
        "O mapa apresenta tendências da participação por município e por tema.",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18a1 1 0 0 0 1 1h16" />
          <path d="M18 17V9" />
          <path d="M13 17v-5" />
          <path d="M8 17v-3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Como funciona
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
          Quatro passos simples que transformam uma experiência em insight coletivo.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="flex flex-col h-full bg-white rounded-lg border border-gray-200 p-8 hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            {/* Number - Large visual element */}
            <div className="mb-6 flex-shrink-0">
              <p className="text-6xl sm:text-7xl font-bold text-gray-100 leading-none">
                {step.number}
              </p>
            </div>

            {/* Icon */}
            <div className="text-indigo-600 mb-6 flex-shrink-0">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {step.title}
            </h3>

            {/* Description - Flex grow to push connector to bottom */}
            <p className="text-base text-gray-700 leading-relaxed flex-grow mb-6">
              {step.description}
            </p>

            {/* Connector line (hidden on mobile, visible on md and above between items) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-1/2 w-6 h-0.5 bg-gradient-to-r from-indigo-300 to-transparent opacity-40 transform translate-x-full" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile vertical connectors - visible only on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .step-item {
            position: relative;
            padding-bottom: 2rem;
          }
          .step-item::after {
            content: "";
            position: absolute;
            left: 1.5rem;
            top: 100%;
            width: 2px;
            height: 2rem;
            background: linear-gradient(to bottom, #a5b4fc, transparent);
          }
          .step-item:last-child::after {
            display: none;
          }
        }
      `}</style>

      {/* Whitespace and breathing room - key visual element */}
      <div className="h-12" />
    </section>
  );
}
