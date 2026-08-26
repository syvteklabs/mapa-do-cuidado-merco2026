import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <span className="text-sm text-gray-600">SyVtek Care</span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Mapa do Cuidado
            </h1>
          </Link>
          <nav className="flex gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Início
            </Link>
            <Link
              href="/participar"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Participar
            </Link>
            <Link
              href="/mapa"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Mapa
            </Link>
            <Link
              href="/expansao"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Expansão
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
