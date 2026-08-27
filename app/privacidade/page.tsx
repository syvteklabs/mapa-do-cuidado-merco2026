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

        {/* Important Notice */}
        <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 space-y-3">
            <h2 className="text-2xl font-bold text-amber-900">
              ⚠️ Dois processos diferentes, duas políticas
            </h2>
            <p className="text-gray-800 leading-relaxed">
              Este documento descreve como o Mapa do Cuidado coleta e protege dados em dois contextos diferentes:
            </p>
            <ul className="space-y-2 text-gray-800">
              <li className="flex gap-2">
                <span className="font-bold">1.</span>
                <span><strong>Participação no Mapa</strong> - Compartilhar experiência de cuidado (sem identificação)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span>
                <span><strong>Lista de Expansão</strong> - Registrar interesse em expandir o mapa (com contato pessoal)</span>
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed mt-3">
              Leia abaixo as seções que se aplicam a você.
            </p>
          </div>
        </section>

        {/* Content section */}
        <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="space-y-12">
            {/* Section Header: Map Participation */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-8">
              <h2 className="text-4xl font-bold text-blue-900 mb-3">
                1️⃣ Participação no Mapa do Cuidado
              </h2>
              <p className="text-lg text-blue-800">
                Quando você compartilha sua experiência de cuidado através do formulário
              </p>
            </div>

            {/* What We Don't Collect */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                O que NÃO coletamos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Sua privacidade é nossa prioridade. Explicitamente, <strong>não solicitamos</strong>:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-900">Nome ou identificação pessoal</p>
                    <p className="text-gray-600">Você não precisa fornecer seu nome ou dados identificadores</p>
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
                Dados que você fornece
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Você compartilha voluntariamente:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Município de residência</p>
                    <p className="text-gray-600">Usado para geolocalizar insights no mapa (sem rua ou número)</p>
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
                    <p className="font-semibold text-gray-900">Sentimento associado</p>
                    <p className="text-gray-600">Como você se sentiu (ex: seguro, preocupado, esperançoso)</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Technical Data */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Dados técnicos processados pela infraestrutura
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Como qualquer site, a infraestrutura técnica pode processar:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">⚙️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Logs de servidor</p>
                    <p className="text-gray-600">Endereço IP, navegador usado, data/hora de acesso (processados conforme política Vercel/Supabase)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">⚙️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Cookies e rastreamento</p>
                    <p className="text-gray-600">Apenas cookies técnicos necessários (sem cookies de publicidade ou rastreamento)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">⚙️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Dados de conexão</p>
                    <p className="text-gray-600">Informações técnicas sobre sua conexão (DNS, tempo de resposta)</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Purpose */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Finalidade do processamento
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Os dados que você fornece são usados para:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">🗺️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Criar visualizações agregadas</p>
                    <p className="text-gray-600">Mostrar onde os desafios de cuidado estão sendo relatados (sem identificar indivíduos)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">📊</span>
                  <div>
                    <p className="font-semibold text-gray-900">Análise de padrões</p>
                    <p className="text-gray-600">Identificar tendências regionais e insights coletivos</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">🤝</span>
                  <div>
                    <p className="font-semibold text-gray-900">Pesquisa participativa</p>
                    <p className="text-gray-600">Usar para pesquisa qualitativa e advocacy em saúde pública</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">📈</span>
                  <div>
                    <p className="font-semibold text-gray-900">Transparência</p>
                    <p className="text-gray-600">Compartilhar estatísticas agregadas publicamente (total de participações, distribuição por município)</p>
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

            {/* Data Storage & Deletion */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Armazenamento e exclusão
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Onde os dados são armazenados:</strong> Em servidores seguros da Supabase, com criptografia em trânsito e em repouso.
                </p>
                <p>
                  <strong>Quanto tempo são mantidos:</strong> Indefinidamente, pois são agregados e anônimos. Sem dados pessoais, não há direito de exclusão individual de contribuições específicas.
                </p>
                <p>
                  <strong>Política de retenção:</strong> Dados agregados são mantidos em perpetuidade para servir como histórico do mapeamento. Dados brutos são excluídos após agregação para evitar reidentificação.
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

            {/* Data Controller */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Responsável pelos dados
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Controlador de dados (Data Controller):</strong> SyVtek Care
                </p>
                <p>
                  Responsável por decidir como e por que os dados são processados.
                </p>
              </div>
            </div>

            {/* Operators */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Operadores (Processadores de dados)
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Os seguintes serviços processam seus dados:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Supabase</strong> - Banco de dados e API (hospedagem de dados)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Vercel</strong> - Hospedagem da aplicação web</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Estes serviços têm seus próprios termos de privacidade. Recomendamos revisar:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mt-2">
                <li>• Política de privacidade Supabase: https://supabase.com/privacy</li>
                <li>• Política de privacidade Vercel: https://vercel.com/legal/privacy-policy</li>
              </ul>
            </div>

            {/* Retention */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Período de retenção
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Dados agregados e anônimos:</strong> Mantidos indefinidamente como histórico do mapeamento
                </p>
                <p>
                  <strong>Dados brutos individuais:</strong> Podem ser excluídos após agregação para evitar reidentificação
                </p>
                <p>
                  <strong>Logs técnicos:</strong> Retenção conforme política dos operadores (Supabase, Vercel)
                </p>
              </div>
            </div>

            {/* Legal Basis */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Base legal
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  O processamento é baseado em:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>✓ <strong>Consentimento:</strong> Você consente ao submeter o formulário</li>
                  <li>✓ <strong>Interesse legítimo:</strong> Pesquisa de saúde pública e formulação de políticas</li>
                  <li>✓ <strong>LGPD Art. 7º, II:</strong> Consentimento informado (Lei Geral de Proteção de Dados)</li>
                </ul>
              </div>
            </div>

            {/* Rights and Requests */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Seus direitos e solicitações
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Como as contribuições são processadas de forma anônima e agregada, certas solicitações (acesso, correção, exclusão) podem não ser possíveis para dados específicos.
                </p>
                <p>
                  <strong>Se você deseja:</strong>
                </p>
                <ul className="space-y-2 ml-4 text-gray-700">
                  <li>• Questionar como seus dados são usados</li>
                  <li>• Exercer direitos de acesso ou portabilidade</li>
                  <li>• Solicitar informações sobre retenção</li>
                  <li>• Reportar preocupações de privacidade</li>
                </ul>
                <p className="mt-4">
                  Entre em contato: <strong>contact@syvtek.care</strong>
                </p>
              </div>
            </div>

            {/* Section Header: Expansion List */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-8 mt-16">
              <h2 className="text-4xl font-bold text-emerald-900 mb-3">
                2️⃣ Lista de Expansão do Mapa
              </h2>
              <p className="text-lg text-emerald-800">
                Quando você registra interesse em expandir o mapa para sua região
              </p>
            </div>

            {/* Expansion Data Collection */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Dados coletados
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Para registrar interesse em expandir o mapa, coletamos:
              </p>
              <div className="space-y-3">
                <div className="border-2 border-emerald-300 bg-emerald-50 rounded-lg p-4">
                  <p className="font-bold text-emerald-900 mb-1">Nome *</p>
                  <p className="text-sm text-emerald-700">Obrigatório. Identificar você para possível contato</p>
                </div>
                <div className="border-2 border-emerald-300 bg-emerald-50 rounded-lg p-4">
                  <p className="font-bold text-emerald-900 mb-1">Cidade *</p>
                  <p className="text-sm text-emerald-700">Obrigatório. Região de interesse para expansão</p>
                </div>
                <div className="border-2 border-emerald-300 bg-emerald-50 rounded-lg p-4">
                  <p className="font-bold text-emerald-900 mb-1">Estado *</p>
                  <p className="text-sm text-emerald-700">Obrigatório. Estado de interesse</p>
                </div>
                <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">WhatsApp (opcional)</p>
                  <p className="text-sm text-blue-700">Se fornecido, será usado apenas para contato sobre expansão</p>
                </div>
                <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">E-mail (opcional)</p>
                  <p className="text-sm text-blue-700">Se fornecido, será usado apenas para contato sobre expansão</p>
                </div>
                <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Tipo de participante (opcional)</p>
                  <p className="text-sm text-blue-700">Perfil: paciente, profissional, gestor, comunidade ou outro</p>
                </div>
              </div>
            </div>

            {/* Expansion Purpose */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Para que usamos esses dados
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900">Contato direto</p>
                    <p className="text-gray-600">Entrar em contato sobre possível expansão do mapa para sua região</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📊</span>
                  <div>
                    <p className="font-semibold text-gray-900">Planejamento</p>
                    <p className="text-gray-600">Identificar regiões de maior interesse para priorizar expansão</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🤝</span>
                  <div>
                    <p className="font-semibold text-gray-900">Parceria</p>
                    <p className="text-gray-600">Identificar potenciais parceiros locais (gestores, profissionais, comunidade)</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Expansion Retention */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Período de retenção
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Dados de contato (nome, email, WhatsApp):</strong> Mantidos enquanto o interesse em expansão for válido ou até 2 anos sem contato
                </p>
                <p>
                  <strong>Dados agregados (região, tipo de participante):</strong> Mantidos indefinidamente para planejamento estratégico
                </p>
                <p>
                  <strong>Após exclusão:</strong> Dados são removidos dentro de 30 dias de solicitação
                </p>
              </div>
            </div>

            {/* Expansion Access & Sharing */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Quem pode acessar seus dados
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold">•</span>
                  <span>Equipe SyVtek Care (para contato direto)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">•</span>
                  <span>Parceiros potenciais do mapa na sua região (apenas se você consentir em compartilhamento específico)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">•</span>
                  <span>Operadores técnicos (Supabase, Vercel) conforme seus termos de privacidade</span>
                </li>
              </ul>
            </div>

            {/* Expansion Revoke Consent */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-red-50 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-red-900">
                Como revogar consentimento
              </h2>
              <p className="text-gray-800">
                Você pode, a qualquer momento, revogar o consentimento para contato e solicitar exclusão de seus dados enviando um email para:
              </p>
              <p className="text-lg font-bold text-red-700 mt-2">
                contact@syvtek.care
              </p>
              <p className="text-sm text-gray-700 mt-3">
                Inclua "Revogar Lista de Expansão" no assunto e confirme qual região registrou.
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
                <strong>Website:</strong> www.syvtek.care<br/>
                <strong>Última atualização:</strong> Agosto de 2026
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
