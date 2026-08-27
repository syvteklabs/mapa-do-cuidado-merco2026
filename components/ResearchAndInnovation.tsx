export default function ResearchAndInnovation() {
  const institutions = [
    {
      title: "Mestrado Profissional SAEG · IFF Campus Campos Centro",
      description: "A SyVtek Care nasce de uma trajetória de pesquisa aplicada vinculada ao Mestrado Profissional em Sistemas Aplicados à Engenharia e Gestão do IFF. A pesquisa fornece base científica para o desenvolvimento de tecnologias voltadas à continuidade e à coordenação do cuidado.",
      category: "Pesquisa aplicada",
    },
    {
      title: "HUB RJ · FAPERJ",
      description: "A trajetória tecnológica que deu origem à SyVtek Care foi selecionada pelo HUB RJ, programa da FAPERJ, recebendo fomento público para o desenvolvimento e a evolução da solução.",
      category: "Fomento à inovação",
    },
    {
      title: "TEC Incubadora · UENF",
      description: "A SyVtek Care foi aprovada para incubação na TEC Incubadora, ambiente vinculado à UENF que apoia o desenvolvimento e o amadurecimento de empresas inovadoras.",
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
            O Mapa do Cuidado é uma ativação independente da SyVtek Care. A experiência transforma participações voluntárias e anônimas em uma visualização coletiva sobre os caminhos do cuidado no Noroeste Fluminense.
            <br className="mt-4" />
            A iniciativa integra uma trajetória construída entre pesquisa acadêmica, fomento à inovação e incubação de empresas.
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

        {/* Legal Disclaimer */}
        <div className="bg-gray-50 border-l-4 border-gray-300 rounded-lg p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold block mb-2">Transparência institucional:</span>
            O Mapa do Cuidado é uma iniciativa da SyVtek Care. As referências ao SAEG/IFF, HUB RJ/FAPERJ e TEC Incubadora/UENF representam etapas reais da trajetória de pesquisa, fomento e incubação da empresa. Não significam aprovação científica dos resultados, certificação, responsabilidade institucional ou financiamento específico desta ativação.
          </p>
        </div>
      </div>
    </section>
  );
}
