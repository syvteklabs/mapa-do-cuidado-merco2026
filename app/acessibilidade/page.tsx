import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Acessibilidade
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto">
              O Mapa do Cuidado é projetado para ser acessível a todos
            </p>
          </div>
        </section>

        {/* Content section */}
        <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="space-y-12">
            {/* Keyboard Navigation */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Navegação por teclado
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                O Mapa do Cuidado pode ser totalmente navegado usando apenas o teclado:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold">Tab</span>
                  <span>Mover para o próximo elemento interativo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">Shift + Tab</span>
                  <span>Mover para o elemento interativo anterior</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">Enter</span>
                  <span>Ativar botões e links</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">Espaço</span>
                  <span>Selecionar opções em formulários</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">Setas ↑ ↓</span>
                  <span>Navegar em listas e dropdowns</span>
                </li>
              </ul>
            </div>

            {/* Screen Reader Support */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Suporte a leitores de tela
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                O Mapa do Cuidado é compatível com leitores de tela populares como:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• NVDA (Windows)</li>
                <li>• JAWS (Windows)</li>
                <li>• VoiceOver (macOS, iOS)</li>
                <li>• TalkBack (Android)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Utilizamos <strong>ARIA labels</strong> e <strong>semantic HTML</strong> para garantir que todo conteúdo seja acessível através de leitores de tela.
              </p>
            </div>

            {/* Visual Accessibility */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Acessibilidade visual
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Contraste adequado:</strong> Todos os textos têm contraste suficiente com seus fundos (WCAG AA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Sem dependência de cor:</strong> Informações não são transmitidas apenas por cor (usamos padrões e ícones)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Tamanho de fonte ajustável:</strong> Use a função de zoom do seu navegador para aumentar o texto</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Foco visível:</strong> Um anel azul aparece ao redor de botões quando navegando por teclado</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Tipografia clara:</strong> Usamos a fonte Inter, otimizada para legibilidade</span>
                </li>
              </ul>
            </div>

            {/* Mobile & Responsive */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Design responsivo e mobile-first
              </h2>
              <p className="text-gray-700">
                O Mapa do Cuidado foi projetado mobile-first e funciona perfeitamente em:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mt-3">
                <li>• Smartphones (pequenas telas)</li>
                <li>• Tablets (telas médias)</li>
                <li>• Desktop (telas grandes)</li>
                <li>• TV e displays públicos</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Botões são dimensionados adequadamente para serem facilmente selecionáveis em qualquer dispositivo, particularmente importante para usuários com limitações motoras.
              </p>
            </div>

            {/* Cognitive Accessibility */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Acessibilidade cognitiva
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span>✓</span>
                  <span><strong>Linguagem clara:</strong> Evitamos jargão desnecessário e explicamos conceitos claramente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>✓</span>
                  <span><strong>Estrutura consistente:</strong> Cada página segue um padrão lógico</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>✓</span>
                  <span><strong>Navegação intuitiva:</strong> É fácil encontrar o que você procura</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>✓</span>
                  <span><strong>Confirmação visual:</strong> Feedback claro quando ações são completadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>✓</span>
                  <span><strong>Sem distrações:</strong> Design focado no essencial</span>
                </li>
              </ul>
            </div>

            {/* Accessible Alternatives */}
            <div className="space-y-4 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Alternativas acessíveis
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Tabela de dados:</strong> O mapa territorial possui uma tabela acessível equivalente que pode ser alternada com um clique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Valores em texto:</strong> Todos os números e dados estão incluídos diretamente nos elementos, sem dependência de cores ou gráficos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Rótulos singulares/plurais:</strong> Usamos "1 participação" e "2 participações" conforme apropriado</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span><strong>Suporte a redução de movimento:</strong> Animações são respeitadas quando `prefers-reduced-motion` está ativado</span>
                </li>
              </ul>
            </div>

            {/* WCAG Conformance */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Conformidade com padrões
              </h2>
              <p className="text-gray-700 leading-relaxed">
                O Mapa do Cuidado foi desenvolvido com o objetivo de seguir as diretrizes <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>, o padrão reconhecido internacionalmente para acessibilidade na web.
              </p>
              <p className="text-blue-900 font-semibold">
                ⚠️ <strong>Nota importante:</strong> A conformidade total com WCAG 2.1 AA exige auditoria técnica independente. Se encontrar problemas de acessibilidade, por favor nos informe para que possamos corrigir.
              </p>
            </div>

            {/* Report Issues */}
            <div className="space-y-4 border-t border-gray-200 pt-12 bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Encontrou um problema de acessibilidade?
              </h2>
              <p className="text-gray-700">
                Se você encontrar algo que não é acessível, por favor nos informe. Sua contribuição nos ajuda a melhorar.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Email:</strong> accessibility@syvtek.care
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
