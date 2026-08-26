export default function ResearchAndInnovation() {
  const institutions = [
    {
      title: "SAEG · IFF Campos",
      description: "Grupo de pesquisa dedicado a estudar os caminhos do cuidado e acesso de pessoas no território",
      category: "Pesquisa",
    },
    {
      title: "HUB RJ · FAPERJ",
      description: "Ecossistema de inovação que conecta pesquisa acadêmica com soluções aplicadas em saúde",
      category: "Inovação",
    },
    {
      title: "TEC Incubadora · UENF",
      description: "Espaço para transformar ideias de tecnologia em saúde em empreendimentos reais",
      category: "Empreendedorismo",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Pesquisa, território e inovação aplicada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O Mapa do Cuidado integra pesquisa acadêmica qualitativa com inovação aplicada, conectando vozes da comunidade com ecossistemas de conhecimento e empreendedorismo no Noroeste Fluminense.
          </p>
        </div>

        {/* Institutional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {institutions.map((institution, idx) => (
            <div
              key={idx}
              className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="mb-4">
                <div className="inline-block">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                    {institution.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                {institution.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {institution.description}
              </p>
              <div className="mt-4 text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                Saiba mais →
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-50 border-l-4 border-gray-300 rounded-lg p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold block mb-2">Transparência:</span>
            As conexões mencionadas acima com instituições acadêmicas e de inovação refletem parcerias de pesquisa e desenvolvimento. Não implicam em validação, financiamento ou responsabilidade institucional específica sobre o Mapa do Cuidado. A SyVtek Care desenvolve e mantém o projeto de forma independente.
          </p>
        </div>
      </div>
    </section>
  );
}
