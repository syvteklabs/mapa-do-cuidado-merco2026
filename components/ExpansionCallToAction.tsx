import Link from "next/link";
import Button from "./Button";

export default function ExpansionCallToAction() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-8 sm:p-10 text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Sua cidade ainda não aparece no mapa?
        </h2>
        <p className="text-gray-700 text-sm sm:text-base">
          O primeiro ciclo começa no Noroeste Fluminense. Registre seu interesse e ajude a indicar os próximos territórios.
        </p>
      </div>
      <Link href="/expansao">
        <Button variant="secondary" className="text-base py-3 px-6">
          Quero o Mapa do Cuidado na minha região
        </Button>
      </Link>
    </div>
  );
}
