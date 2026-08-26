"use client";

import Link from "next/link";

export default function SpacingGuidePage() {
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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        <div className="space-y-16">
          {/* Title */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Guia de Espaçamento</h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              Implementação de espaçamento, grids e hierarquia visual consistentes em todo o Mapa do Cuidado.
            </p>
          </div>

          {/* Container e Largura Máxima */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Container e Largura Máxima</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">max-w-7xl (80rem / 1280px)</h3>
                <p className="text-gray-700 mb-4">
                  Usado para a maioria das seções principais. Oferece espaço generoso sem sentir muito largo.
                </p>
                <div className="bg-white border-2 border-blue-300 rounded p-4">
                  <p className="text-sm text-gray-600 text-center">Conteúdo com max-w-7xl</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">max-w-3xl (48rem / 768px)</h3>
                <p className="text-gray-700 mb-4">
                  Limite de largura para parágrafos e textos longos. Garante legibilidade ideal (50-75 caracteres por linha).
                </p>
                <div className="bg-white border-2 border-blue-300 rounded p-4 max-w-3xl">
                  <p className="text-sm text-gray-600">
                    Exemplo de texto com largura limitada. Isto garante que não haja linhas muito compridas que prejudiquem a leitura.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Espaçamento Vertical */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Espaçamento Vertical</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Desktop (96–128px)</h3>

                <div className="space-y-8">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-sm font-semibold text-gray-900">py-16 (64px) - Standard</p>
                    <p className="text-sm text-gray-600">Espaçamento padrão entre seções</p>
                  </div>

                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-sm font-semibold text-gray-900">py-20 (80px) - Large</p>
                    <p className="text-sm text-gray-600">Seções maiores ou com mais destaque</p>
                  </div>

                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-sm font-semibold text-gray-900">py-24 (96px) - XL</p>
                    <p className="text-sm text-gray-600">Transições entre áreas principais</p>
                  </div>

                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-sm font-semibold text-gray-900">py-32 (128px) - XXL</p>
                    <p className="text-sm text-gray-600">Respiro máximo entre seções</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tablet (72–96px) e Mobile (56–72px)</h3>
                <p className="text-gray-700">
                  Usar proporções menores para economizar espaço. Escalar com breakpoints: py-8 sm:py-12 lg:py-16
                </p>
              </div>
            </div>
          </section>

          {/* Grids */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Sistemas de Grid</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Grid Responsivo de 3 Colunas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-white border-2 border-blue-300 rounded p-4 text-center"
                    >
                      <p className="text-sm text-gray-600">Coluna {i}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  1 coluna mobile → 2 colunas tablet → 3 colunas desktop
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Grid Responsivo de 2 Colunas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-white border-2 border-blue-300 rounded p-4 text-center"
                    >
                      <p className="text-sm text-gray-600">Coluna {i}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  1 coluna mobile → 2 colunas desktop (gap: 24px tablet, 32px desktop)
                </p>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Cards Consistentes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Card Padrão
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Título do Card</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Cards com borda sutil, sem sombra pesada. Hover suave aumenta a sombra para indicar interatividade.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 sm:p-8 shadow-sm">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">
                  Card de Sucesso
                </p>
                <h3 className="text-lg font-bold text-green-900 mb-3">Confirmação</h3>
                <p className="text-green-800 text-sm leading-relaxed">
                  Fundo de cor suave com borda correspondente. Indica estado positivo sem parecer alarme.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 sm:p-8">
              <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wider mb-3">
                Card de Aviso
              </p>
              <h3 className="text-lg font-bold text-yellow-900 mb-3">Atenção</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                Cores quentes para avisos e informações importantes. Sempre acompanhadas de texto descritivo.
              </p>
            </div>
          </section>

          {/* Tipografia e Largura */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Tipografia e Largura de Texto</h2>

            <div className="space-y-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Parágrafo com Largura Limitada (max-w-3xl)</h3>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Este parágrafo tem uma largura máxima de 48rem (768px), o que oferece um comprimento de linha
                  ideal para leitura. Pesquisas mostram que 50-75 caracteres por linha é o ideal para legibilidade.
                  Textos mais longos ou que ocupam toda a largura da tela tendem a cansar a visão e prejudicar a
                  experiência de leitura.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Parágrafo sem Limite (Evitar)</h3>
                <p className="text-gray-700 leading-relaxed">
                  Este parágrafo se estende pela largura total do seu container. Quando a linha fica muito comprida,
                  fica mais difícil acompanhar o texto. O olho perde a posição ao final de cada linha e precisa voltar
                  ao início da próxima. Isso reduz a velocidade de leitura e aumenta a fadiga visual. Por isso sempre
                  limitamos a largura de textos longos com max-w-3xl ou similar.
                </p>
              </div>
            </div>
          </section>

          {/* Agrupamento Visual */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Agrupamento Visual</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Conteúdos relacionados formam grupos</h3>

              <div className="space-y-12">
                {/* Group 1 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Grupo 1: Conceito Principal</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Ponto 1: Descrição do conceito. Todos os pontos relacionados ficam próximos.
                    </p>
                    <p className="text-gray-700">
                      Ponto 2: Continuação da ideia. Espaçamento interno mantém coesão do grupo.
                    </p>
                    <p className="text-gray-700">
                      Ponto 3: Fechamento do conceito. Separação clara marca fim do grupo.
                    </p>
                  </div>
                </div>

                {/* Group 2 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Grupo 2: Novo Conceito</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Espaço largo (py-12) entre grupos indica transição para novo tópico.
                    </p>
                    <p className="text-gray-700">
                      Sem nova linha separadora - o espaçamento faz esse trabalho.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-8 pt-8 border-t border-gray-300">
                Observe: 12px entre itens (space-y-3), 48px entre grupos (py-12).
              </p>
            </div>
          </section>

          {/* Princípios */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Princípios Aplicados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">✓ Não pareça cards independentes</h3>
                <p className="text-blue-800 text-sm">
                  Seções formam grupos coerentes através de espaçamento e agrupamento visual.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">✓ Hierarquia clara</h3>
                <p className="text-blue-800 text-sm">
                  Títulos próximos ao conteúdo. Espaçamento cria respiração sem fragmentação.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">✓ Texto legível</h3>
                <p className="text-blue-800 text-sm">
                  Parágrafos com largura limitada. Nenhum texto ocupa 100% da tela.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">✓ Ritmo responsivo</h3>
                <p className="text-blue-800 text-sm">
                  Espaçamento diminui em tablets e mobile. Mantém respiração sem desperdiçar espaço.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
