import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

export default function ComoFuncionaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Como funciona o Mapa do Cuidado
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Um processo simples, transparente e seguro para mapear os caminhos do cuidado no Noroeste Fluminense
            </p>
          </div>
        </section>

        {/* How it works section */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <HowItWorks />
        </section>

        {/* FAQ section */}
        <section className="bg-gray-50 border-t border-gray-200 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Perguntas frequentes
            </h2>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  O que é o Mapa do Cuidado?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  O Mapa do Cuidado é uma ferramenta de escuta participativa que visualiza os caminhos do cuidado no Noroeste Fluminense. Você compartilha sua experiência, agregamos os dados de muitas pessoas, e geramos sinais que podem apoiar conversas, estudos e decisões futuras sobre o território.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  O que será perguntado?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Apenas perguntas sobre sua experiência de cuidado: qual seu município, que tipo de necessidade você tem, quem ajuda você, e qual é seu sentimento sobre esse caminho. Nenhuma pergunta sobre identificação pessoal. Leva apenas 2 minutos.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Minha participação é identificada?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Não. Você não precisa fornecer seu nome, email, telefone ou dados que identifiquem você. Você compartilha apenas seu município e sua experiência de cuidado. Os dados são agregados (combinados) antes de serem visualizados no mapa. Veja nossa <a href="/privacidade" className="text-blue-600 hover:text-blue-700 font-semibold underline">política de privacidade</a> para detalhes completos.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Como os resultados são apresentados?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Os dados são agregados em visualizações que mostram padrões dos caminhos do cuidado por município: quais necessidades aparecem, quem oferece ajuda, qual é o sentimento geral. O mapa mostra apenas os padrões, nunca dados individuais.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  O Mapa representa toda a população?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Não. É uma escuta participativa qualitativa, não uma pesquisa estatística. Quanto mais pessoas participam, melhores são os sinais. Mas os dados refletem quem participou, não necessariamente toda a população. Isso é importante e transparente.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Posso participar novamente?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Sim! Cada participação é uma contribuição independente. Se sua experiência de cuidado mudou ou você tem uma nova perspectiva, estamos sempre abertos a ouvir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Pronto para participar?
            </h2>
            <p className="text-lg text-gray-700">
              Compartilhe sua experiência de cuidado e ajude a mapear os caminhos do Noroeste Fluminense
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/participar"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                Participar agora
              </a>
              <a
                href="/mapa"
                className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-200 hover:bg-blue-50 active:bg-blue-100 transition-colors"
              >
                Explorar o mapa
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
