import Link from "next/link";
import Button from "./Button";

export default function MapCallToAction() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-8 sm:p-10 text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Veja o que o território está revelando
        </h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Explore as participações agregadas dos 13 municípios do Noroeste Fluminense.
        </p>
      </div>
      <Link href="/mapa">
        <Button variant="primary" className="text-base py-3 px-6">
          Explorar o mapa
        </Button>
      </Link>
    </div>
  );
}
