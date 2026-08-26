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
              Um processo simples, transparente e seguro para mapear os caminhos do cuidado na Noroeste Fluminense
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
                  Meus dados são realmente anônimos?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Sim. Não coletamos seu nome, email, telefone ou qualquer informação que possa identificá-lo. Você compartilha apenas sua experiência de cuidado e a região em que vive. Os dados são agregados sem rastreamento individual.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Quanto tempo leva para participar?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Apenas 2 minutos. O formulário é rápido e direto, com perguntas claras sobre sua experiência de cuidado. Sem burocracia, sem informações desnecessárias.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  O que vocês fazem com os dados que coletam?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Os dados são agregados e usados apenas para criar visualizações dos caminhos do cuidado, identificar padrões e tendências, e ajudar gestores a melhor entender as necessidades da região. Nunca são compartilhados com terceiros.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Posso confiar que minha participação fará diferença?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Absolutamente. O Mapa do Cuidado foi criado com base em pesquisa participativa real. Cada contribuição é agregada e visualizada no mapa, ajudando formuladores de políticas a entender os caminhos do cuidado na sua região.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Qual é a diferença entre &quot;Participação&quot; e &quot;Agregação&quot;?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Participação é quando você compartilha sua experiência. Agregação é quando juntamos muitas experiências anônimas para identificar padrões. O mapa mostra apenas os padrões agregados, nunca dados individuais.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Posso participar mais de uma vez?
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Sim! Cada participação é registrada como uma contribuição independente. Se sua experiência de cuidado mudou ou você tem uma nova perspectiva, estamos sempre abertos a ouvir.
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
