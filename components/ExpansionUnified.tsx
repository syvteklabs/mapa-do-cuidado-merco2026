"use client";

import { useState } from "react";
import ExpansionModal from "./ExpansionModal";
import { useExpansionStats } from "@/lib/hooks/useExpansionStats";

interface ExpansionUnifiedProps {
  isTV?: boolean;
  newTerritory?: string | null;
}

export default function ExpansionUnified({
  isTV,
  newTerritory,
}: ExpansionUnifiedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { stats, loading } = useExpansionStats();

  // If no data from either source, show just the call-to-action
  if (!loading && (!stats || stats.total === 0)) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-8 sm:p-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className={`font-bold text-gray-900 ${isTV ? "text-4xl" : "text-2xl"}`}>
            Expansão para novos territórios
          </h2>

          <p className={`text-gray-700 leading-relaxed ${isTV ? "text-xl" : "text-base"}`}>
            O Mapa do Cuidado começou no Noroeste Fluminense. Sua região deseja
            participar dos próximos ciclos?
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`inline-block bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 active:bg-purple-800 transition-colors ${
              isTV
                ? "py-4 px-8 text-xl"
                : "py-3 px-6 text-base"
            }`}
          >
            Registrar interesse na expansão
          </button>
        </div>
      </div>
    );
  }

  // Show full expansion section with data
  const getHeadlineText = () => {
    if (!stats) return "";
    if (stats.uniqueCities === 1) {
      return "Um novo território já manifestou interesse em receber o Mapa do Cuidado.";
    }
    return `${stats.uniqueCities} territórios já manifestaram interesse em participar dos próximos ciclos.`;
  };

  return (
    <>
      <div className={`bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg space-y-6 sm:space-y-8 ${
        isTV ? "p-12" : "p-6 sm:p-8"
      }`}>
        {/* Header */}
        <div className="space-y-3">
          <h2 className={`font-bold text-gray-900 ${isTV ? "text-4xl" : "text-2xl"}`}>
            Expansão para novos territórios
          </h2>
          <p className={`text-gray-700 leading-relaxed ${isTV ? "text-lg" : "text-sm"}`}>
            O Mapa do Cuidado está expandindo para outros territórios. Confira o
            interesse já registrado e considere adicionar sua região.
          </p>
        </div>

        {/* New Territory Notification */}
        {newTerritory && (
          <div className={`bg-green-100 border-2 border-green-400 rounded-lg animate-pulse ${
            isTV ? "p-6" : "p-4"
          }`}>
            <p className={`text-green-800 font-semibold ${isTV ? "text-lg" : "text-sm"}`}>
              ✓ Expansão registrada para <span className="font-bold">{newTerritory}</span>
            </p>
          </div>
        )}

        {/* Statistics */}
        {stats && stats.total > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-2 border-purple-300 rounded-lg p-4 sm:p-5 text-center">
                <p className={`text-purple-600 font-semibold mb-2 ${isTV ? "text-lg" : "text-xs"}`}>
                  Interesses Registrados
                </p>
                <p className={`font-bold text-purple-900 ${isTV ? "text-4xl" : "text-3xl"}`}>
                  {stats.total}
                </p>
              </div>

              <div className="bg-white border-2 border-purple-300 rounded-lg p-4 sm:p-5 text-center">
                <p className={`text-purple-600 font-semibold mb-2 ${isTV ? "text-lg" : "text-xs"}`}>
                  Territórios Únicos
                </p>
                <p className={`font-bold text-purple-900 ${isTV ? "text-4xl" : "text-3xl"}`}>
                  {stats.uniqueCities}
                </p>
              </div>
            </div>

            {/* Insight */}
            <p className={`text-gray-700 font-semibold leading-relaxed ${isTV ? "text-lg" : "text-sm"}`}>
              {getHeadlineText()}
            </p>

            {/* Top Cities */}
            {stats.byCity.length > 0 && (
              <div className="space-y-3">
                <h3 className={`font-bold text-gray-900 ${isTV ? "text-2xl" : "text-base"}`}>
                  Territórios com mais interesse
                </h3>
                <div className="space-y-3">
                  {stats.byCity.slice(0, 5).map((city) => (
                    <div key={city.city} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <p className={`font-semibold text-gray-900 ${isTV ? "text-lg" : "text-sm"}`}>
                          {city.city}
                        </p>
                        <p className={`font-bold text-purple-600 whitespace-nowrap ${isTV ? "text-lg" : "text-sm"}`}>
                          {city.count}
                        </p>
                      </div>
                      <div className={`w-full bg-gray-200 rounded-full ${isTV ? "h-4" : "h-2"}`}>
                        <div
                          className="bg-purple-600 rounded-full transition-all duration-300"
                          style={{
                            width: `${(city.count / stats.byCity[0].count) * 100}%`,
                            height: isTV ? "16px" : "8px",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="border-t border-purple-300 pt-6 text-center">
          <p className={`text-gray-700 mb-4 ${isTV ? "text-lg" : "text-sm"}`}>
            Quer levar o Mapa do Cuidado para sua região?
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`inline-block bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 active:bg-purple-800 transition-colors ${
              isTV
                ? "py-3 px-8 text-lg"
                : "py-2.5 px-6 text-sm"
            }`}
          >
            Registrar interesse
          </button>
        </div>
      </div>

      <ExpansionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
