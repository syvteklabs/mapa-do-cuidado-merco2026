import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand and Description */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            SyVtek Care
          </p>
          <p className="text-sm text-gray-700 font-medium mb-2">
            Mapa do Cuidado
          </p>
          <p className="text-xs text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
            Escuta participativa, voluntária e anônima sobre os caminhos do cuidado no Noroeste Fluminense.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <Link
            href="/como-funciona"
            className="text-xs text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          >
            Como funciona
          </Link>
          <Link
            href="/privacidade"
            className="text-xs text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          >
            Privacidade
          </Link>
          <Link
            href="/acessibilidade"
            className="text-xs text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          >
            Acessibilidade
          </Link>
        </div>

        {/* Activity Reference */}
        <div className="text-center border-t border-gray-200 pt-6 pb-6">
          <p className="text-xs text-gray-600 mb-2">
            Experiência apresentada na Merco Noroeste 2026.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Pesquisa aplicada no SAEG/IFF, fomento à inovação pelo HUB RJ/FAPERJ e incubação na TEC Incubadora/UENF.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2026 SyVtek Care. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
