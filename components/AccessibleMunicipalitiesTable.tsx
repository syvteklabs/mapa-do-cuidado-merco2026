"use client";

interface AccessibleTableProps {
  municipiosStats: Record<string, number>;
  totalParticipations: number;
  dataView?: "participations" | "needs";
  isTV?: boolean;
}

export default function AccessibleMunicipalitiesTable({
  municipiosStats,
  totalParticipations,
  dataView = "participations",
  isTV = false,
}: AccessibleTableProps) {
  // Sort municipalities by participation count (descending)
  const sortedMunicipios = Object.entries(municipiosStats)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalParticipations > 0 ? Math.round((count / totalParticipations) * 100) : 0,
    }));

  const getPlural = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : plural;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table
          className={`w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden ${
            isTV ? "text-lg" : ""
          }`}
          role="table"
          aria-label={`Tabela de participações por município${
            totalParticipations > 0 ? ` - Total de ${totalParticipations} ${getPlural(totalParticipations, "contribuição", "contribuições")}` : ""
          }`}
        >
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th
                scope="col"
                className={`px-6 py-4 text-left font-bold border-b-2 border-blue-800 ${isTV ? "text-lg" : ""}`}
              >
                Município
              </th>
              <th
                scope="col"
                className={`px-6 py-4 text-center font-bold border-b-2 border-blue-800 ${isTV ? "text-lg" : ""}`}
              >
                Participações
              </th>
              <th
                scope="col"
                className={`px-6 py-4 text-center font-bold border-b-2 border-blue-800 ${isTV ? "text-lg" : ""}`}
              >
                Percentual
              </th>
              <th
                scope="col"
                className={`px-6 py-4 text-left font-bold border-b-2 border-blue-800 ${isTV ? "text-lg" : ""}`}
              >
                Indicador Visual
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMunicipios.map((municipio, index) => (
              <tr
                key={municipio.name}
                className={`border-b border-gray-200 hover:bg-blue-50 focus-within:bg-blue-100 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className={`px-6 py-4 font-semibold text-gray-900 ${isTV ? "text-lg" : ""}`}>
                  {municipio.name}
                </td>
                <td className={`px-6 py-4 text-center font-bold text-blue-600 ${isTV ? "text-lg" : ""}`}>
                  {municipio.count} {getPlural(municipio.count, "participação", "participações")}
                </td>
                <td className={`px-6 py-4 text-center ${isTV ? "text-lg" : ""}`}>
                  {totalParticipations > 0 ? `${municipio.percentage}%` : "—"}
                </td>
                <td className={`px-6 py-4 ${isTV ? "text-lg" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-24 bg-gray-200 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={municipio.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Barra de progresso: ${municipio.percentage}%`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${municipio.percentage}%`,
                        }}
                      />
                    </div>
                    <span className={`text-gray-600 font-semibold whitespace-nowrap ${isTV ? "text-lg" : "text-sm"}`}>
                      {municipio.count > 0 ? `${municipio.count}/${totalParticipations}` : "0"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accessibility Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className={`text-blue-900 ${isTV ? "text-lg" : "text-sm"}`}>
          <strong>Tabela acessível:</strong> Esta tabela é uma alternativa totalmente acessível ao mapa. Use Tab para navegar entre células, Shift+Tab para voltar. Todos os dados estão em texto claro, sem dependência de cor.
        </p>
      </div>
    </div>
  );
}
