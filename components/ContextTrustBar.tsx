function MapPinIcon() {
  return (
    <svg
      className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg
      className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.856-1.487M7 20H2v-2a3 3 0 015.856-1.487m5-5a3 3 0 11-6 0 3 3 0 016 0zM13 14h-1v-4m0 0H9m4 0l-2-2m-2 2l2-2"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ChartBarIcon() {
  return (
    <svg
      className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

export default function ContextTrustBar() {
  const items = [
    {
      icon: MapPinIcon,
      title: "13 municípios",
      description: "Primeiro ciclo do mapeamento",
    },
    {
      icon: HandshakeIcon,
      title: "Participação voluntária",
      description: "Seu tempo, sua escolha",
    },
    {
      icon: ShieldIcon,
      title: "Respostas anônimas",
      description: "Seu nome não é registrado",
    },
    {
      icon: ChartBarIcon,
      title: "Visualização agregada",
      description: "Dados em conjunto, não individuais",
    },
  ];

  return (
    <section className="bg-white border-t border-b border-gray-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Grid: 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3"
              >
                {/* Icon - Clean and linear style */}
                <div className="flex-shrink-0">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
