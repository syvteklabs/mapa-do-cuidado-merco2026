export default function ResearchAndInnovation() {
  const institutions = [
    {
      title: "Mestrado Profissional SAEG · IFF",
      description: "Pesquisa aplicada que fundamenta o desenvolvimento de tecnologias para continuidade e coordenação do cuidado.",
      category: "Pesquisa aplicada",
    },
    {
      title: "HUB RJ · FAPERJ",
      description: "Trajetória selecionada e fomentada para o desenvolvimento e a evolução tecnológica da solução.",
      category: "Fomento à inovação",
    },
    {
      title: "TEC Incubadora · UENF",
      description: "Ambiente de incubação e apoio ao amadurecimento da SyVtek Care como empresa inovadora.",
      category: "Incubação",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Uma experiência conectada à pesquisa e à inovação
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O Mapa do Cuidado é uma ativação da SyVtek Care que transforma participações voluntárias e anônimas em uma visão coletiva sobre os caminhos do cuidado no Noroeste Fluminense.
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
            </div>
          ))}
        </div>

        {/* Transparency Note */}
        <div className="bg-gray-50 border-l-4 border-gray-300 rounded-lg p-6 mt-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Pesquisa, fomento e incubação fazem parte da trajetória da SyVtek Care e não representam validação institucional dos dados ou resultados do Mapa do Cuidado.
          </p>
        </div>
      </div>
    </section>
  );
}
