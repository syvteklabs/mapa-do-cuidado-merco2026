"use client";

import { useState } from "react";
import ExpansionModal from "./ExpansionModal";

interface OutOfRegionFlowProps {
  selectedCity: string;
  selectedState: string;
  onContinue: () => void;
}

export default function OutOfRegionFlow({
  selectedCity,
  selectedState,
  onContinue,
}: OutOfRegionFlowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 sm:p-8 space-y-4">
        <div>
          <p className="text-gray-900 font-semibold text-lg mb-3">
            A SyVtek Care está começando pelo Noroeste Fluminense.
          </p>
          <p className="text-gray-700 mb-4">
            Sua cidade ainda não faz parte deste primeiro ciclo, mas queremos
            conhecer o interesse da sua região.
          </p>
          <p className="text-gray-700">
            Entre na Lista de Expansão e ajude a indicar onde o próximo Mapa do
            Cuidado poderá chegar.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Registrar interesse
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-gray-200 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors"
          >
            Continuar minha participação
          </button>
        </div>
      </div>

      <ExpansionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCity={selectedCity}
        initialState={selectedState}
      />
    </>
  );
}
