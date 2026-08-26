"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-semibold text-gray-900">Mapa do Cuidado</span>
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 font-semibold"
            >
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="space-y-12">
          {/* Title */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Sobre o projeto
            </h1>
            <p className="text-lg text-gray-700">
              Informações sobre o Mapa do Cuidado, suas instituições parceiras e diretrizes éticas.
            </p>
          </div>

          {/* O que é o Mapa do Cuidado */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              O que é o Mapa do Cuidado?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              O Mapa do Cuidado é uma experiência desenvolvida pela SyVtek Care para ouvir o
              território e testar formas responsáveis de transformar participações anônimas em
              visualizações coletivas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Iniciado no Noroeste Fluminense, o projeto recolhe experiências de cuidado — tanto
              de acesso, continuidade, orientação e apoio — com o objetivo de construir uma
              compreensão territorial colaborativa sobre os desafios e potenciais do sistema local
              de cuidados.
            </p>
          </section>

          {/* Conexões Institucionais */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Conexões institucionais
            </h2>
            <p className="text-gray-700 leading-relaxed">
              As instituições mencionadas no Mapa do Cuidado representam conexões reais de
              formação, desenvolvimento e participação no ecossistema de inovação do Estado do Rio
              de Janeiro. Cada conexão reflete um aspecto específico da trajetória do projeto:
            </p>

            <div className="space-y-6">
              {/* SAEG */}
              <div className="border-l-4 border-blue-600 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  SAEG · IFF Campos
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Formação e pesquisa aplicada</span>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A iniciativa dialoga com a trajetória de formação e pesquisa aplicada do
                  pesquisador no Mestrado Profissional em Sistemas Aplicados à Engenharia e
                  Gestão. Esta conexão reflete o compromisso com metodologias rigorosas de
                  investigação e documentação.
                </p>
              </div>

              {/* HUB RJ */}
              <div className="border-l-4 border-green-600 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  HUB RJ · FAPERJ
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Ecossistema de inovação</span>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A trajetória da SyVtek Care está conectada a ambientes de desenvolvimento,
                  inovação e empreendedorismo apoiados pelo ecossistema fluminense. Esta conexão
                  reflete a participação em redes colaborativas de desenvolvimento tecnológico.
                </p>
              </div>

              {/* TEC Incubadora */}
              <div className="border-l-4 border-amber-600 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  TEC Incubadora · UENF
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Incubação e desenvolvimento</span>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  O desenvolvimento empreendedor da SyVtek Care acontece em conexão com o ambiente
                  de incubação e inovação da TEC Incubadora. Esta conexão reflete o suporte ao
                  desenvolvimento operacional e estratégico do projeto.
                </p>
              </div>
            </div>
          </section>

          {/* Transparência e Independência */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Transparência e independência
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">É importante esclarecer:</span>
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>
                  As conexões institucionais não significam financiamento direto das instituições
                  mencionadas ao projeto.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>
                  As instituições mencionadas não validam, aprovam ou endossam cientificamente os
                  resultados apresentados.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>
                  As instituições não assumem responsabilidade institucional específica sobre o
                  Mapa do Cuidado ou suas conclusões.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>
                  A SyVtek Care desenvolve e mantém o projeto de forma independente,
                  responsabilizando-se pelo conteúdo, metodologia e condução da escuta
                  participativa.
                </span>
              </li>
            </ul>
          </section>

          {/* Privacidade e Ética */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Privacidade e ética
            </h2>
            <p className="text-gray-700 leading-relaxed">
              O Mapa do Cuidado foi desenvolvido com rigorosos compromissos éticos:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span>
                  <span className="font-semibold">Participação voluntária e anônima:</span> Todas
                  as participações são completamente anônimas. Nenhum dado pessoal identificável
                  é coletado.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span>
                  <span className="font-semibold">Sem coleta de dados clínicos:</span> O projeto
                  não coleta diagnósticos, condições de saúde específicas ou outros dados
                  clínicos identificáveis.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span>
                  <span className="font-semibold">Visualização agregada:</span> Os dados são
                  apresentados apenas em forma agregada e territorial, impedindo qualquer
                  re-identificação.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span>
                  <span className="font-semibold">Segurança de dados:</span> As respostas são
                  armazenadas com segurança e protegidas contra acesso não autorizado.
                </span>
              </li>
            </ul>
          </section>

          {/* Uso dos dados para pesquisa */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Uso dos dados para pesquisa acadêmica
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-900 font-semibold mb-3">
                Qualquer utilização dos dados para pesquisa acadêmica deverá observar:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Finalidade específica e documentada de pesquisa.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>
                    Aprovação ética quando aplicável, de acordo com as normas institucionais.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>
                    Cumprimento dos procedimentos institucionais de cada organização envolvida.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>
                    Respeito rigoroso aos princípios de privacidade e anonimato dos participantes.
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Pesquisadores interessados em utilizar os dados do Mapa do Cuidado para fins
              acadêmicos devem entrar em contato com a SyVtek Care para esclarecer detalhes sobre
              a pesquisa proposta, aprovações éticas e procedimentos institucionais correspondentes.
            </p>
          </section>

          {/* Limitações */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Limitações e interpretação dos dados
            </h2>
            <p className="text-gray-700 leading-relaxed">
              O Mapa do Cuidado é uma ferramenta de escuta territorial, não uma pesquisa
              epidemiológica ou clínica. Seus dados apresentam limitações importantes:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold flex-shrink-0">⚠</span>
                <span>
                  <span className="font-semibold">Amostra participatória:</span> As participações
                  não constituem uma amostra estatística representativa da população.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold flex-shrink-0">⚠</span>
                <span>
                  <span className="font-semibold">Sem validação clínica:</span> Os dados não
                  medem qualidade clínica ou eficiência do sistema de saúde.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold flex-shrink-0">⚠</span>
                <span>
                  <span className="font-semibold">Perspectiva territorial:</span> O projeto reflete
                  a experiência dos participantes em um momento específico e em um território
                  delimitado.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold flex-shrink-0">⚠</span>
                <span>
                  <span className="font-semibold">Evolução contínua:</span> Os dados evoluem
                  conforme novas participações chegam e novas regiões são incorporadas.
                </span>
              </li>
            </ul>
          </section>

          {/* Contato */}
          <section className="space-y-4 pt-8 border-t border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dúvidas ou sugestões?</h2>
            <p className="text-gray-700 leading-relaxed">
              Para dúvidas sobre metodologia, uso dos dados, pesquisa acadêmica ou qualquer outra
              questão relacionada ao projeto, entre em contato através do{" "}
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                Mapa do Cuidado
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
