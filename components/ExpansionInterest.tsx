"use client";

import { useState } from "react";
import ExpansionModal from "./ExpansionModal";

export default function ExpansionInterest() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-4 border-purple-600 rounded-lg p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Sua região ainda não faz parte do mapa?
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Neste primeiro ciclo, o Mapa do Cuidado está sendo construído com a
            participação dos 13 municípios do Noroeste Fluminense.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Sua cidade ainda não aparece no mapa? Registre seu interesse e ajude a
            indicar os próximos territórios onde essa experiência poderá chegar.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 active:bg-purple-800 transition-colors"
          >
            Quero o Mapa do Cuidado na minha região
          </button>
        </div>
      </div>

      <ExpansionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
