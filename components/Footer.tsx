import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Brand section */}
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            SyVtek Care
          </p>
          <p className="text-lg text-gray-900 font-medium">
            Mapa do Cuidado
          </p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Escuta participativa, voluntária e anônima sobre os caminhos do cuidado no Noroeste Fluminense.
          </p>
        </div>

        {/* Links section */}
        <div className="text-center flex justify-center gap-6 flex-wrap text-sm">
          <Link
            href="/como-funciona"
            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          >
            Como funciona
          </Link>
          <span className="text-gray-300">·</span>
          <Link
            href="/privacidade"
            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          >
            Privacidade
          </Link>
          <span className="text-gray-300">·</span>
          <Link
            href="/acessibilidade"
            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          >
            Acessibilidade
          </Link>
        </div>

        {/* Institutional section */}
        <div className="border-t border-gray-200 pt-8 space-y-4 text-center text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-900 mb-2">
              Experiência apresentada na Merco Noroeste 2026
            </p>
            <p className="leading-relaxed">
              Uma iniciativa da SyVtek Care, construída em uma trajetória de pesquisa aplicada no SAEG/IFF, fomento à inovação pelo HUB RJ/FAPERJ e incubação na TEC Incubadora/UENF.
            </p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed italic">
            Esses vínculos representam etapas da trajetória da SyVtek Care e não implicam validação, certificação ou responsabilidade institucional sobre o Mapa do Cuidado.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-xs text-gray-500">
            © 2026 SyVtek Care. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
