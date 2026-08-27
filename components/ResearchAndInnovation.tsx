export default function ResearchAndInnovation() {
  const institutions = [
    {
      title: "SAEG · IFF Campos",
      description: "Pesquisa acadêmica e desenvolvimento científico.",
      category: "Pesquisa",
    },
    {
      title: "HUB RJ · FAPERJ",
      description: "Conexão com o ecossistema de inovação do estado.",
      category: "Inovação",
    },
    {
      title: "TEC Incubadora · UENF",
      description: "Desenvolvimento e amadurecimento da solução.",
      category: "Empreendedorismo",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Pesquisa conectada ao território
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O Mapa do Cuidado é uma experiência de inovação da SyVtek Care que transforma participações voluntárias em uma visualização coletiva do Noroeste Fluminense.
          </p>
        </div>

        {/* Introduction */}
        <p className="text-gray-700 text-center mb-8">
          O projeto se conecta a ambientes de pesquisa, inovação e empreendedorismo:
        </p>

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
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-50 border-l-4 border-gray-300 rounded-lg p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold block mb-2">Nota de transparência:</span>
            Essas conexões representam vínculos de pesquisa, inovação e desenvolvimento. Não significam validação, financiamento ou responsabilidade institucional sobre o Mapa do Cuidado.
          </p>
        </div>
      </div>
    </section>
  );
}
