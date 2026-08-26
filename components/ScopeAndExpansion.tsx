"use client";

const municipalities = [
  "Aperibé",
  "Bom Jesus do Itabapoana",
  "Cambuci",
  "Italva",
  "Itaocara",
  "Itaperuna",
  "Laje do Muriaé",
  "Miracema",
  "Natividade",
  "Porciúncula",
  "Santo Antônio de Pádua",
  "São José de Ubá",
  "Varre-Sai",
];

export default function ScopeAndExpansion() {
  return (
    <section className="space-y-16 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Scope Section */}
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            O primeiro ciclo começa no Noroeste Fluminense.
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl leading-relaxed">
            Neste primeiro ciclo, o Mapa do Cuidado está sendo construído com a participação dos 13 municípios do Noroeste Fluminense.
          </p>
        </div>

        {/* Municipalities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {municipalities.map((municipality) => (
            <div
              key={municipality}
              className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 hover:border-blue-200 transition-colors"
            >
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600" />
              <p className="text-base text-gray-900 font-medium">
                {municipality}
              </p>
            </div>
          ))}
        </div>

        {/* Territory Visualization */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg aspect-video sm:aspect-square lg:aspect-auto lg:h-80 flex items-center justify-center">
            <div className="text-center space-y-4">
              <svg
                className="w-16 h-16 mx-auto text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  13 Municípios
                </p>
                <p className="text-sm text-gray-600">
                  Noroeste Fluminense — Primeiro Ciclo
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Visualização do território de atuação do mapa
          </p>
        </div>
      </div>

      {/* Expansion Section */}
      <div className="border-t border-gray-200 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Sua cidade ainda não aparece no mapa?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Registre seu interesse e ajude a indicar os próximos territórios onde essa experiência poderá chegar.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              A participação em outros territórios será contabilizada separadamente e alimentará futuras expansões do Mapa do Cuidado.
            </p>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="/expansao"
                className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Quero o Mapa do Cuidado na minha região
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-8 sm:p-12 text-center">
            <div className="space-y-4">
              <svg
                className="w-12 h-12 mx-auto text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <p className="font-semibold text-gray-900">
                Expansão territorial
              </p>
              <p className="text-sm text-gray-600">
                Ajude a levar o Mapa do Cuidado para sua região
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
