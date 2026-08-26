import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-6">
          {/* Brand section */}
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              SyVtek Care
            </p>
            <p className="text-sm text-gray-700 font-medium">
              Mapa do Cuidado
            </p>
          </div>

          {/* Links section */}
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-4 flex-wrap text-xs">
              <Link
                href="/como-funciona"
                className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                Como funciona
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/privacidade"
                className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                Privacidade
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/acessibilidade"
                className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                Acessibilidade
              </Link>
            </div>
          </div>

          {/* Metadata section */}
          <div className="text-center sm:text-right">
            <p className="text-xs text-gray-500">
              Merco Noroeste Fluminense 2026
            </p>
          </div>
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
