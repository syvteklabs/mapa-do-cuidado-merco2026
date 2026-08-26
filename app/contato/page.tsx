import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Fale Conosco
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
              Dúvidas, sugestões ou comentários sobre o Mapa do Cuidado?
            </p>
          </div>
        </section>

        {/* Content section */}
        <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="space-y-12">
            {/* Direct contact info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Email
                </h2>
                <p className="text-gray-700 mb-4">
                  Para dúvidas, sugestões ou reportar problemas:
                </p>
                <a
                  href="mailto:contact@syvtek.care"
                  className="inline-block text-lg font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  contact@syvtek.care
                </a>
              </div>

              {/* Website */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Website
                </h2>
                <p className="text-gray-700 mb-4">
                  Conheça mais sobre a SyVtek Care:
                </p>
                <a
                  href="https://www.syvtek.care"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-lg font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  www.syvtek.care
                </a>
              </div>
            </div>

            {/* Common questions */}
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Dúvidas Frequentes
              </h2>
              <div className="space-y-6">
                {/* Q1 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    Meus dados serão identificados?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Não. Todas as participações são completamente anônimas. Nenhum dado pessoal é coletado ou vinculado às suas respostas.
                  </p>
                </div>

                {/* Q2 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    Posso deletar minhas respostas?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Como suas respostas são anônimas e agregadas com outras participações, não é possível identificar ou deletar uma contribuição específica. Isso faz parte do design que protege sua privacidade.
                  </p>
                </div>

                {/* Q3 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    O que acontece com meus dados?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Seus dados anônimos são agregados e visualizados no mapa do Mapa do Cuidado, compartilhados com gestores públicos em forma agregada, e podem ser usados em pesquisas aplicadas (com aprovação ética). Nunca são vendidos ou usados para publicidade.
                  </p>
                </div>

                {/* Q4 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    Há cookies ou rastreamento?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    O Mapa do Cuidado não utiliza Analytics, pixels de rastreamento, ou cookies de terceiros. Apenas cookies técnicos necessários para o funcionamento básico da plataforma podem estar presentes, e você pode recusar sem afetar sua participação.
                  </p>
                </div>

                {/* Q5 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    Como posso aprender mais sobre o projeto?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Visite a página <a href="/sobre" className="text-blue-600 hover:text-blue-700 underline">Sobre o projeto</a> para entender mais sobre a pesquisa, as instituições envolvidas, e os valores do Mapa do Cuidado. Confira também nossa <a href="/privacidade" className="text-blue-600 hover:text-blue-700 underline">Política de Privacidade</a> e <a href="/termos" className="text-blue-600 hover:text-blue-700 underline">Termos de Uso</a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form note */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-lg p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold block mb-2">Nota sobre privacidade:</span>
                O Mapa do Cuidado mantém a mesma filosofia de privacidade em todos os canais. Se você nos contatar por email, solicitamos apenas as informações necessárias para responder sua dúvida. Não coletamos dados clínicos ou informações pessoais identificáveis.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
