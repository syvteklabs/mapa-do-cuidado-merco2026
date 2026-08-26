import { animationClasses } from "@/lib/animations";

export default function ResearchAndInnovation() {
  const institutions = [
    {
      title: "SAEG · IFF Campos",
      description:
        "A iniciativa dialoga com a trajetória de formação e pesquisa aplicada do pesquisador no Mestrado Profissional em Sistemas Aplicados à Engenharia e Gestão.",
      category: "Formação e pesquisa aplicada",
    },
    {
      title: "HUB RJ · FAPERJ",
      description:
        "A trajetória da SyVtek Care está conectada a ambientes de desenvolvimento, inovação e empreendedorismo apoiados pelo ecossistema fluminense.",
      category: "Ecossistema de inovação",
    },
    {
      title: "TEC Incubadora · UENF",
      description:
        "O desenvolvimento empreendedor da SyVtek Care acontece em conexão com o ambiente de incubação e inovação da TEC Incubadora.",
      category: "Incubação e desenvolvimento",
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
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            O Mapa do Cuidado é uma experiência desenvolvida pela SyVtek Care para ouvir o território e testar
            formas responsáveis de transformar participações anônimas em visualizações coletivas.
          </p>
        </div>

        {/* Institutional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {institutions.map((institution, idx) => (
            <div
              key={idx}
              className={`bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-300 flex flex-col ${animationClasses.fadeInUp}`}
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="mb-4">
                <div className="inline-block">
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {institution.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {institution.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                {institution.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transparency Disclaimer */}
        <div className="bg-gray-50 border-l-4 border-gray-400 rounded-lg p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold block mb-2">Transparência:</span>
            As conexões mencionadas com instituições acadêmicas, de inovação e incubação refletem o contexto
            formativo, empreendedor e de desenvolvimento do projeto. Não implicam em validação científica,
            financiamento, ou responsabilidade institucional específica sobre o Mapa do Cuidado. A SyVtek Care
            desenvolve e mantém o projeto de forma independente, responsável pelo conteúdo e pela condução da
            escuta participativa.
          </p>
        </div>
      </div>
    </section>
  );
}
