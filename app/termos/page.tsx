import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Termos de Uso
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
              Entenda as condições para usar o Mapa do Cuidado
            </p>
          </div>
        </section>

        {/* Content section */}
        <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="space-y-12">
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Bem-vindo ao Mapa do Cuidado. Estes Termos de Uso estabelecem as condições sob as quais você pode usar este serviço.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Última atualização:</strong> Agosto de 2026
              </p>
            </div>

            {/* 1. Aceitação dos Termos */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ao acessar e usar o Mapa do Cuidado, você concorda em estar vinculado por estes Termos de Uso. Se você não concorda com algum termo, não acesse o serviço.
              </p>
            </div>

            {/* 2. Natureza do Serviço */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                2. Natureza do Serviço
              </h2>
              <p className="text-gray-700 leading-relaxed">
                O Mapa do Cuidado é uma <strong>escuta participativa qualitativa</strong>, não uma pesquisa estatística representativa. O serviço coleta experiências voluntárias de pessoas sobre os caminhos do cuidado em um determinado território.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                O projeto é <strong>não comercial</strong> e voltado para diálogo público sobre sistemas de saúde e cuidado.
              </p>
            </div>

            {/* 3. Participação Voluntária */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900">
                3. Participação Voluntária e Anônima
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Sua participação é <strong>totalmente voluntária</strong>. Ninguém pode forçá-lo a participar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Você pode parar de preencher o formulário a qualquer momento sem consequências.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Suas respostas são <strong>completamente anônimas</strong>. Nenhum dado pessoal é vinculado a ela.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Você pode fazer múltiplas contribuições. Cada uma é tratada como participação separada.</span>
                </li>
              </ul>
            </div>

            {/* 4. Responsabilidades do Usuário */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                4. Responsabilidades do Usuário
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ao usar o Mapa do Cuidado, você concorda em:
              </p>
              <ul className="space-y-3 text-gray-700 mt-4">
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Fornecer informações <strong>honestas e precisas</strong> sobre suas experiências</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Não incluir dados identificadores pessoais no formulário (nomes, emails, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Não incluir informações clínicas sensíveis ou diagnósticos específicos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Usar o serviço apenas para os fins propostos (compartilhar experiências de cuidado)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Não tentar hackear, abusar ou interromper o funcionamento da plataforma</span>
                </li>
              </ul>
            </div>

            {/* 5. Conteúdo Não Permitido */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                5. Conteúdo Não Permitido
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Você não pode enviar através do formulário:
              </p>
              <ul className="space-y-3 text-gray-700 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Conteúdo que viola direitos de terceiros</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Linguagem ofensiva, discriminatória ou de ódio</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Spam ou conteúdo comercial não solicitado</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Informações que identificam indivíduos</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                A SyVtek Care reserva o direito de remover conteúdo que viole estes termos.
              </p>
            </div>

            {/* 6. Isenção de Responsabilidade */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900">
                6. Isenção de Responsabilidade
              </h2>
              <p className="text-gray-700 leading-relaxed">
                O Mapa do Cuidado é fornecido <strong>"tal como está"</strong>. A SyVtek Care não oferece garantias sobre:
              </p>
              <ul className="space-y-3 text-gray-700 mt-4">
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span><strong>Acurácia das conclusões:</strong> As tendências mostradas são baseadas em escuta participativa qualitativa, não em dados científicos robustos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span><strong>Disponibilidade contínua:</strong> O serviço pode ter períodos de manutenção ou indisponibilidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span><strong>Ação em resposta aos dados:</strong> O compartilhamento de experiências não garante que decisões serão tomadas baseadas nelas</span>
                </li>
              </ul>
            </div>

            {/* 7. Uso dos Dados */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                7. Uso de Seus Dados
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Seus dados anônimos podem ser:
              </p>
              <ul className="space-y-3 text-gray-700 mt-4">
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">✓</span>
                  <span>Agregados e visualizados no mapa público</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">✓</span>
                  <span>Usados em relatórios agregados sobre o projeto</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">✓</span>
                  <span>Compartilhados com gestores públicos em forma agregada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">✓</span>
                  <span>Usados como base para pesquisa aplicada (mediante aprovação ética)</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Nunca serão:</strong> Vendidos a terceiros, usados para publicidade direcionada, ou compartilhados para fins comerciais.
              </p>
            </div>

            {/* 8. Propriedade Intelectual */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                8. Propriedade Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed">
                O código do Mapa do Cuidado é desenvolvido de forma responsável. As visualizações e insights gerados pertencem ao projeto e aos territórios participantes.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Ao enviar sua experiência, você concorda que ela pode ser usada de forma agregada e sem atribuição pessoal para apoiar o desenvolvimento público de políticas de saúde.
              </p>
            </div>

            {/* 9. Modificações dos Termos */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                9. Modificações dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                A SyVtek Care pode modificar estes Termos de Uso a qualquer momento. Mudanças significativas serão comunicadas aos usuários. Seu uso contínuo do serviço após as modificações constitui aceitação dos novos termos.
              </p>
            </div>

            {/* 10. Contato e Reclamações */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-gray-50 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-gray-900">
                10. Contato e Reclamações
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Se você tem dúvidas sobre estes Termos de Uso ou deseja reportar uma violação, entre em contato:
              </p>
              <p className="text-gray-700 mt-4">
                <strong>Email:</strong> contact@syvtek.care<br/>
                <strong>Website:</strong> www.syvtek.care
              </p>
            </div>

            {/* 11. Lei Aplicável */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                11. Lei Aplicável
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, especificamente do Estado do Rio de Janeiro.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
