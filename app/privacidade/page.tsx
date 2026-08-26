import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Privacidade e Dados
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Entenda como protegemos sua privacidade e utilizamos seus dados
            </p>
          </div>
        </section>

        {/* Content section */}
        <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="space-y-12">
            {/* What We Don't Collect */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                O que NÃO coletamos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Sua privacidade é nossa prioridade. Explicitamente, <strong>não coletamos</strong>:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Nome ou identificação</p>
                    <p className="text-gray-600">Você permanece totalmente anônimo</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Email ou telefone</p>
                    <p className="text-gray-600">Nenhum contato pessoal é registrado</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Endereço residencial</p>
                    <p className="text-gray-600">Apenas o município é registrado</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Dados clínicos ou de saúde</p>
                    <p className="text-gray-600">Nunca coletamos diagnósticos ou histórico médico</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Localização em tempo real</p>
                    <p className="text-gray-600">Não rastreamos sua localização por GPS</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Dados de comportamento online</p>
                    <p className="text-gray-600">Não monitoramos atividades de navegação</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Data Collection */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Quais dados coletamos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Coletamos apenas o mínimo necessário para mapear os caminhos do cuidado:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Município de residência</p>
                    <p className="text-gray-600">Usado para geolocalizar insights no mapa</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Categoria de experiência</p>
                    <p className="text-gray-600">Qual desafio de cuidado você enfrentou (ex: falta de orientação)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Timestamp anônimo</p>
                    <p className="text-gray-600">Quando você participou (não é rastreável até você)</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* How Data is Used */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Como os dados são usados
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Seus dados anônimos são usados <strong>exclusivamente</strong> para:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">🗺️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Criar visualizações no mapa</p>
                    <p className="text-gray-600">Mostrar onde os desafios de cuidado são mais prevalentes</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">📊</span>
                  <div>
                    <p className="font-semibold text-gray-900">Gerar insights agregados</p>
                    <p className="text-gray-600">Identificar padrões e tendências regionais</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">🤝</span>
                  <div>
                    <p className="font-semibold text-gray-900">Informar políticas públicas</p>
                    <p className="text-gray-600">Ajudar gestores a entender necessidades reais da região</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">📈</span>
                  <div>
                    <p className="font-semibold text-gray-900">Relatórios de participação</p>
                    <p className="text-gray-600">Mostrar engagement do mapa publicamente</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Research Clarification */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Isto NÃO é uma pesquisa populacional
              </h2>
              <p className="text-gray-700 leading-relaxed">
                O Mapa do Cuidado é uma <strong>escuta participativa qualitativa</strong>, não uma pesquisa estatística. Isso significa:
              </p>
              <ul className="space-y-2 mt-4 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Não buscamos representatividade estatística de 100% da população</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Números absolutos (ex: 100 participações) indicam <strong>tendências</strong>, não prevalência exata</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Padrões emergentes são mais importantes que quantidade total</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Cada voz tem igual peso (não ajustamos por demografia)</span>
                </li>
              </ul>
            </div>

            {/* Data Differentiation */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Entenda os termos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Para evitar confusão, diferenciamos três conceitos importantes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="border-2 border-blue-200 rounded-lg p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Contribuição</h3>
                  <p className="text-gray-600">
                    Cada experiência que você compartilha via formulário. Uma pessoa pode fazer múltiplas contribuições.
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">Ex: &quot;Você enviou 2 contribuições&quot;</p>
                </div>

                <div className="border-2 border-indigo-200 rounded-lg p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Participação Mapeada</h3>
                  <p className="text-gray-600">
                    Sua contribuição registrada no banco de dados e agregada ao mapa. Totalmente anônima.
                  </p>
                  <p className="text-sm text-indigo-600 font-semibold">Ex: &quot;Você é a participação #247&quot;</p>
                </div>

                <div className="border-2 border-emerald-200 rounded-lg p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">Lista de Expansão</h3>
                  <p className="text-gray-600">
                    Registro de interesse em expandir o mapa para novos territórios. Requer contato voluntário.
                  </p>
                  <p className="text-sm text-emerald-600 font-semibold">Ex: &quot;Você registrou interesse para SP&quot;</p>
                </div>
              </div>
            </div>

            {/* Technical Data Collection */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Dados técnicos de acesso
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Além dos dados de participação, coletamos dados técnicos <strong>necessários para manter o serviço</strong> funcionando:
              </p>
              <ul className="space-y-3 text-gray-700 mt-4">
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <div>
                    <p className="font-semibold">Endereço IP</p>
                    <p className="text-sm text-gray-600">Registrado automaticamente em logs de servidor para segurança e diagnóstico. Não é vinculado ao seu formulário.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <div>
                    <p className="font-semibold">User-Agent (navegador e dispositivo)</p>
                    <p className="text-sm text-gray-600">Coletado para entender se usuários acessam via mobile ou desktop. Não identifica você pessoalmente.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <div>
                    <p className="font-semibold">Cookies técnicos</p>
                    <p className="text-sm text-gray-600">Apenas para funcionalidade essencial (sessão, autenticação Next.js). <strong>Sem cookies de rastreamento.</strong></p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <div>
                    <p className="font-semibold">Timestamps de requisição</p>
                    <p className="text-sm text-gray-600">Quando você acessou o site. Armazenado em logs, não vinculado a dados de participação.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <div>
                    <p className="font-semibold">Status de requisições HTTP</p>
                    <p className="text-sm text-gray-600">Se seu pedido foi bem-sucedido ou não. Usado para monitorar saúde do sistema.</p>
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 italic">
                <strong>Importante:</strong> Dados técnicos de acesso <strong>nunca são combinados com seus dados de participação</strong> no formulário. São mantidos separadamente e deletados conforme politica de retenção de logs padrão do servidor.
              </p>
            </div>

            {/* Analytics & Tracking */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Analytics e rastreamento
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Este site NÃO utiliza:</strong>
              </p>
              <ul className="space-y-2 text-gray-700 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Google Analytics ou similares</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Pixels de rastreamento (Facebook, LinkedIn, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Cookies de terceiros</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Serviços de analytics comportamental</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>Eventos de participação enviados para plataformas de medição</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Seus dados de formulário <strong>nunca são rastreados, perfilados ou compartilhados com terceiros</strong>.
              </p>
            </div>

            {/* Data Storage & Deletion */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Armazenamento e exclusão
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Dados de participação (contribuições):</strong> Armazenados indefinidamente em Supabase com criptografia, pois são agregados e anônimos.
                </p>
                <p>
                  <strong>Dados de expansão (interesse em novos territórios):</strong> Armazenados enquanto relevante para futuras expansões. Você pode solicitar exclusão por email.
                </p>
                <p>
                  <strong>Dados técnicos de acesso (IPs, logs):</strong> Mantidos por até 30 dias conforme política padrão de retenção de logs do servidor, depois deletados automaticamente.
                </p>
                <p>
                  <strong>Sem direito de exclusão individual:</strong> Como seus dados de participação são completamente anônimos, não podemos identificar e deletar sua contribuição específica. Dados já agregados não podem ser revertidos.
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Segurança
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">🔒</span>
                  <span>HTTPS/TLS criptografa dados em trânsito</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">🔐</span>
                  <span>Banco de dados com criptografia em repouso</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">🚫</span>
                  <span>Nenhum identificador pessoal vinculado aos dados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✓</span>
                  <span>Acesso restrito ao sistema (apenas equipe autorizada)</span>
                </li>
              </ul>
            </div>

            {/* Cookies and Participation */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Cookies e participação
              </h2>
              <p className="text-gray-700">
                <strong>Recusar cookies não impede sua participação.</strong> Todos os cookies neste site são técnicos e opcionais. Se você não aceitar cookies, poderá:
              </p>
              <ul className="space-y-2 text-gray-700 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✓</span>
                  <span>Navegar em todas as páginas normalmente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✓</span>
                  <span>Acessar o formulário de participação sem restrições</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">✓</span>
                  <span>Enviar sua contribuição anônima normalmente</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                A recusa de cookies só afeta funcionalidades opcionais como autenticação (se implementada) ou persistência de preferências.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Dúvidas sobre privacidade?
              </h2>
              <p className="text-gray-700">
                Entre em contato com a equipe SyVtek Care para esclarecimentos sobre nossa política de privacidade.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Email:</strong> contact@syvtek.care<br/>
                <strong>Website:</strong> www.syvtek.care
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
