export default function ResearchAndInnovation() {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Uma experiência conectada à pesquisa e à inovação
          </h2>
          <div className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed space-y-3">
            <p>
              O Mapa do Cuidado é uma ativação independente da SyVtek Care. A experiência transforma participações voluntárias e anônimas em uma visualização coletiva sobre os caminhos do cuidado no Noroeste Fluminense.
            </p>
            <p>
              A iniciativa integra uma trajetória construída entre pesquisa acadêmica, fomento à inovação e incubação de empresas.
            </p>
          </div>
        </div>

        {/* Institutional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pesquisa */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Pesquisa aplicada
            </h3>
            <p className="text-sm text-blue-600 font-semibold mb-4">
              Mestrado Profissional SAEG · IFF Campus Campos Centro
            </p>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              A SyVtek Care nasce de uma trajetória de pesquisa aplicada vinculada ao Mestrado Profissional em Sistemas Aplicados à Engenharia e Gestão do IFF. A pesquisa fornece base científica para o desenvolvimento de tecnologias voltadas à continuidade e à coordenação do cuidado.
            </p>
          </div>

          {/* Inovação */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Fomento à inovação
            </h3>
            <p className="text-sm text-blue-600 font-semibold mb-4">
              HUB RJ · FAPERJ
            </p>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              A trajetória tecnológica que deu origem à SyVtek Care foi selecionada pelo HUB RJ, programa da FAPERJ, recebendo fomento público para o desenvolvimento e a evolução da solução.
            </p>
          </div>

          {/* Incubação */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Incubação
            </h3>
            <p className="text-sm text-blue-600 font-semibold mb-4">
              TEC Incubadora · UENF
            </p>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              A SyVtek Care foi aprovada para incubação na TEC Incubadora, ambiente vinculado à UENF que apoia o desenvolvimento e o amadurecimento de empresas inovadoras.
            </p>
          </div>
        </div>

        {/* Transparency Statement */}
        <div className="bg-gray-50 border-l-4 border-gray-300 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Transparência institucional
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            O Mapa do Cuidado é uma iniciativa da SyVtek Care. As referências ao SAEG/IFF, HUB RJ/FAPERJ e TEC Incubadora/UENF representam etapas reais da trajetória de pesquisa, fomento e incubação da empresa. Não significam aprovação científica dos resultados, certificação, responsabilidade institucional ou financiamento específico desta ativação.
          </p>
        </div>
      </div>
    </section>
  );
}
