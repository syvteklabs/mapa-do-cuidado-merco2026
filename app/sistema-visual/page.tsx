"use client";

import Link from "next/link";
import { colors, typography, spacing } from "@/lib/design-tokens";

export default function DesignSystemPage() {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Sistema Visual Mapa do Cuidado
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              Linguagem visual para <span className="font-semibold">território + cuidado + evidência humana</span>
            </p>
          </div>

          {/* COLOR PALETTE */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Paleta de cores</h2>

            {/* Primary Blues */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Azuis institucionais
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border border-gray-200"
                    style={{ backgroundColor: colors.blue[700] }}
                  ></div>
                  <p className="text-xs font-semibold text-gray-900">Profundo</p>
                  <p className="text-xs text-gray-600">#0369a1</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border border-gray-200"
                    style={{ backgroundColor: colors.blue[500] }}
                  ></div>
                  <p className="text-xs font-semibold text-gray-900">Ação</p>
                  <p className="text-xs text-gray-600">#0ea5e9</p>
                </div>
              </div>
            </div>

            {/* Purple */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Roxo controlado
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border border-gray-200"
                    style={{ backgroundColor: colors.purple[500] }}
                  ></div>
                  <p className="text-xs font-semibold text-gray-900">Inteligência</p>
                  <p className="text-xs text-gray-600">#a855f7</p>
                </div>
              </div>
            </div>

            {/* Green */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Verde suave
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border border-gray-200"
                    style={{ backgroundColor: colors.green[600] }}
                  ></div>
                  <p className="text-xs font-semibold text-gray-900">Sucesso</p>
                  <p className="text-xs text-gray-600">#16a34a</p>
                </div>
              </div>
            </div>

            {/* Red */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vermelho para alertas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border border-gray-200"
                    style={{ backgroundColor: colors.red[600] }}
                  ></div>
                  <p className="text-xs font-semibold text-gray-900">Erro</p>
                  <p className="text-xs text-gray-600">#dc2626</p>
                </div>
              </div>
            </div>

            {/* Grays */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cinzas quentes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {Object.entries(colors.gray).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div
                      className="w-full h-12 rounded border border-gray-200"
                      style={{ backgroundColor: value }}
                    ></div>
                    <p className="text-xs text-gray-600">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TYPOGRAPHY */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Tipografia</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Display (5xl)
                </p>
                <h3 className="text-5xl font-bold text-gray-900">
                  Território + cuidado
                </h3>
                <p className="text-sm text-gray-600 mt-2">48px, 700 weight</p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Heading (4xl)
                </p>
                <h2 className="text-4xl font-bold text-gray-900">
                  Seção principal do projeto
                </h2>
                <p className="text-sm text-gray-600 mt-2">36px, 700 weight</p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Card Title (lg)
                </p>
                <h3 className="text-lg font-bold text-gray-900">
                  Título de card ou seção secundária
                </h3>
                <p className="text-sm text-gray-600 mt-2">18px, 700 weight</p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Body (base)
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  Texto de corpo padrão. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
                <p className="text-sm text-gray-600 mt-2">16px, 400 weight</p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Small (sm)
                </p>
                <p className="text-sm text-gray-600">
                  Texto pequeno para contexto e etiquetas
                </p>
                <p className="text-xs text-gray-500 mt-2">14px, 400 weight</p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Label
                </p>
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Categoria ou rótulo
                </p>
                <p className="text-xs text-gray-500 mt-2">12px, 600 weight, uppercase</p>
              </div>
            </div>
          </section>

          {/* COMPONENTS */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Componentes</h2>

            {/* Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Botões</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="w-full bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800 transition-colors">
                  Primário
                </button>
                <button className="w-full bg-blue-100 text-blue-700 py-3 rounded font-semibold hover:bg-blue-200 transition-colors">
                  Secundário
                </button>
                <button className="w-full bg-gray-200 text-gray-900 py-3 rounded font-semibold hover:bg-gray-300 transition-colors">
                  Terciário
                </button>
                <button className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors">
                  Destrutor
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Padrão
                  </p>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Título do Card</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Descrição do conteúdo. Cards são usados para agrupar informações
                    relacionadas com hierarquia clara.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <p className="text-sm font-semibold text-green-800">Sucesso</p>
                  </div>
                  <p className="text-sm text-green-700">
                    Card com estado positivo. Use verde suave para indicar sucesso.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-red-600 font-bold">!</span>
                    <p className="text-sm font-semibold text-red-800">Erro</p>
                  </div>
                  <p className="text-sm text-red-700">
                    Card com alerta. Use vermelho somente para erros e alertas críticos.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-blue-600 font-bold">ℹ</span>
                    <p className="text-sm font-semibold text-blue-800">Informação</p>
                  </div>
                  <p className="text-sm text-blue-700">
                    Card informativo. Use azul para ações e informações relevantes.
                  </p>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Alertas</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">Sucesso:</span> Ação completada com
                    sucesso.
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Atenção:</span> Verifique antes de
                    continuar.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                  <p className="text-sm text-red-800">
                    <span className="font-semibold">Erro:</span> Algo deu errado. Tente
                    novamente.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Informação:</span> Dica útil para você.
                  </p>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Indicadores</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-sm text-gray-700">Ativo</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-700">Em progresso</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span className="text-sm text-gray-700">Erro</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm text-gray-700">Inativo</span>
                </div>
              </div>
            </div>

            {/* States */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Estados</h3>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Carregamento</p>
                <div className="flex gap-8 items-center">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">Carregando dados...</span>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Vazio</p>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <p className="text-gray-600">Nenhum dado disponível</p>
                </div>
              </div>
            </div>
          </section>

          {/* PRINCIPLES */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Princípios</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Legibilidade</h3>
                <p className="text-gray-700">
                  Sans-serif altamente legível para interface. Suporte completo ao português
                  com acentuação correta.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Acessibilidade</h3>
                <p className="text-gray-700">
                  Contraste mínimo compatível com WCAG AA. Todos os elementos interativos
                  precisam de feedback visual claro.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Consistência</h3>
                <p className="text-gray-700">
                  Mesma linguagem visual em todas as rotas. Componentes seguem padrões
                  definidos sem estilos conflitantes.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Humanidade</h3>
                <p className="text-gray-700">
                  Design responsivo e intuitivo. Evitar estetização tecnológica excessiva.
                  Foco em clareza e propósito.
                </p>
              </div>
            </div>
          </section>

          {/* USAGE */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Como usar</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Cores:</span> Utilize os códigos hexadecimais
                documentados em <code className="bg-white px-2 py-1 rounded">lib/design-tokens.ts</code>
              </p>

              <p className="text-sm text-blue-900">
                <span className="font-semibold">Tipografia:</span> Aplique os estilos através
                do Tailwind CSS com os espaçamentos e pesos predefinidos.
              </p>

              <p className="text-sm text-blue-900">
                <span className="font-semibold">Componentes:</span> Reutilize componentes
                existentes antes de criar novos. Mantenha consistência visual.
              </p>

              <p className="text-sm text-blue-900">
                <span className="font-semibold">Testes:</span> Sempre testar contraste de cor
                com ferramentas WCAG AA para garantir acessibilidade.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
