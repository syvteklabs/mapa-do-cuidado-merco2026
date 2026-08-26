import Link from "next/link";

export default function InstitutionalTransparency() {
  return (
    <div className="bg-gray-50 border-t border-gray-200 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          As instituições mencionadas representam conexões de formação, desenvolvimento e
          participação no ecossistema de inovação. Essas conexões não significam, por si só,
          financiamento, aprovação científica, responsabilidade institucional ou validação dos
          resultados apresentados.{" "}
          <Link
            href="/sobre"
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Saiba mais
          </Link>
        </p>
      </div>
    </div>
  );
}
