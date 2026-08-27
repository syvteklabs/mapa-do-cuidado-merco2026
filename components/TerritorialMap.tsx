"use client";

import { useMemo, useState } from "react";
import { MUNICIPIOS_GEOJSON, getNoroesteBounds } from "@/lib/noroeste-geojson";

interface TerritorialMapProps {
  municipiosStats: Record<string, number>;
  municipiosCategories?: Record<string, Record<string, number>>;
  selectedMunicipio?: string | null;
  onMunicipioSelect?: (municipio: string | null) => void;
  dataView?: "participations" | "needs";
}

export default function TerritorialMap({
  municipiosStats,
  selectedMunicipio = null,
  onMunicipioSelect = () => {},
  dataView = "participations",
}: TerritorialMapProps) {
  const [hoveredMunicipio, setHoveredMunicipio] = useState<string | null>(null);

  const getPlural = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : plural;
  };

  // Calcular cores baseado na intensidade
  const getColorForMunicipio = (municipioName: string) => {
    const count = municipiosStats[municipioName] || 0;
    const maxCount = Math.max(...Object.values(municipiosStats), 1);

    if (count === 0) {
      return { fill: "#f3f4f6", stroke: "#d1d5db", strokeWidth: 1 }; // Gray neutral
    }

    const intensity = count / maxCount;

    if (dataView === "participations") {
      // Escala azul para participações
      if (intensity > 0.75) {
        return { fill: "#1e3a8a", stroke: "#0c3a99", strokeWidth: 2 }; // Deep blue
      } else if (intensity > 0.5) {
        return { fill: "#3b82f6", stroke: "#1e40af", strokeWidth: 2 }; // Blue
      } else if (intensity > 0.25) {
        return { fill: "#60a5fa", stroke: "#2563eb", strokeWidth: 1.5 }; // Light blue
      } else {
        return { fill: "#dbeafe", stroke: "#60a5fa", strokeWidth: 1 }; // Very light blue
      }
    } else {
      // Escala roxo para necessidades
      if (intensity > 0.75) {
        return { fill: "#6b21a8", stroke: "#9333ea", strokeWidth: 2 }; // Deep purple
      } else if (intensity > 0.5) {
        return { fill: "#a855f7", stroke: "#7e22ce", strokeWidth: 2 }; // Purple
      } else if (intensity > 0.25) {
        return { fill: "#d8b4fe", stroke: "#a855f7", strokeWidth: 1.5 }; // Light purple
      } else {
        return { fill: "#f3e8ff", stroke: "#d8b4fe", strokeWidth: 1 }; // Very light purple
      }
    }
  };

  // Calcular dimensões do SVG
  const bounds = useMemo(() => getNoroesteBounds(), []);
  const padding = 10000; // ~0.09 graus de padding

  const minLng = bounds.west - padding;
  const maxLng = bounds.east + padding;
  const minLat = bounds.south - padding;
  const maxLat = bounds.north + padding;

  const width = 800;
  const height = 600;

  const scaleX = width / (maxLng - minLng);
  const scaleY = height / (maxLat - minLat);

  const projectPoint = (lng: number, lat: number): [number, number] => {
    const x = (lng - minLng) * scaleX;
    const y = (maxLat - lat) * scaleY;
    return [x, y];
  };

  const polygonToPath = (coordinates: Array<[number, number]>): string => {
    if (coordinates.length === 0) return "";
    const points = coordinates.map((coord) => projectPoint(coord[0], coord[1]));
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";
  };

  const getCentroidLabel = (municipioName: string): [number, number] => {
    const geo = MUNICIPIOS_GEOJSON[municipioName];
    if (!geo) return [0, 0];
    return projectPoint(geo.centroid[0], geo.centroid[1]);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6">
      {/* SVG Map */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-w-full"
        style={{ maxHeight: "600px" }}
        role="img"
        aria-label="Mapa territorial do Noroeste Fluminense"
      >
        {/* Background */}
        <rect width={width} height={height} fill="#ffffff" />

        {/* Municipal borders */}
        {Object.entries(MUNICIPIOS_GEOJSON).map(([municipioName, geo]) => {
          const colors = getColorForMunicipio(municipioName);
          const isSelected = selectedMunicipio === municipioName;
          const isHovered = hoveredMunicipio === municipioName;
          const count = municipiosStats[municipioName] || 0;

          return (
            <g key={municipioName}>
              {/* Municipality polygon */}
              <path
                d={polygonToPath(geo.coordinates)}
                fill={colors.fill}
                stroke={isSelected ? "#0c3a99" : colors.stroke}
                strokeWidth={isSelected ? 3 : colors.strokeWidth}
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                style={{
                  filter: isHovered ? "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" : "none",
                }}
                onMouseEnter={() => setHoveredMunicipio(municipioName)}
                onMouseLeave={() => setHoveredMunicipio(null)}
                onClick={() => {
                  onMunicipioSelect(
                    selectedMunicipio === municipioName ? null : municipioName
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onMunicipioSelect(
                      selectedMunicipio === municipioName ? null : municipioName
                    );
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${municipioName}, ${count} ${getPlural(count, "participação", "participações")}`}
                aria-pressed={isSelected}
              />

              {/* Municipality label */}
              {count > 0 || true && (
                <g>
                  <text
                    x={getCentroidLabel(municipioName)[0]}
                    y={getCentroidLabel(municipioName)[1] - 5}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill={count === 0 ? "#9ca3af" : isSelected ? "#0c3a99" : "#1f2937"}
                    className="pointer-events-none select-none"
                    style={{
                      textShadow: "0 1px 3px rgba(255,255,255,0.8)",
                    }}
                  >
                    {municipioName.split(" ")[0]}
                  </text>
                  {count > 0 && (
                    <text
                      x={getCentroidLabel(municipioName)[0]}
                      y={getCentroidLabel(municipioName)[1] + 8}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill={dataView === "participations" ? "#1e3a8a" : "#6b21a8"}
                      className="pointer-events-none select-none"
                    >
                      {count}
                    </text>
                  )}
                </g>
              )}

              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={getCentroidLabel(municipioName)[0] - 50}
                    y={getCentroidLabel(municipioName)[1] - 40}
                    width="100"
                    height="35"
                    fill="#ffffff"
                    stroke="#1f2937"
                    strokeWidth="1"
                    rx="4"
                    style={{
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  />
                  <text
                    x={getCentroidLabel(municipioName)[0]}
                    y={getCentroidLabel(municipioName)[1] - 25}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#1f2937"
                    className="pointer-events-none select-none"
                  >
                    {municipioName}
                  </text>
                  <text
                    x={getCentroidLabel(municipioName)[0]}
                    y={getCentroidLabel(municipioName)[1] - 12}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#4b5563"
                    className="pointer-events-none select-none"
                  >
                    {count > 0 ? `${count} ${getPlural(count, "participação", "participações")}` : "Sem dados"}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(10, 10)">
          <rect width="180" height="120" fill="#ffffff" stroke="#d1d5db" strokeWidth="1" rx="4" />
          <text x="90" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1f2937">
            Intensidade
          </text>

          {dataView === "participations" ? (
            <>
              <rect x="10" y="30" width="16" height="16" fill="#1e3a8a" />
              <text x="32" y="42" fontSize="10" fill="#4b5563">
                &gt; 75%
              </text>

              <rect x="10" y="50" width="16" height="16" fill="#3b82f6" />
              <text x="32" y="62" fontSize="10" fill="#4b5563">
                50-75%
              </text>

              <rect x="10" y="70" width="16" height="16" fill="#60a5fa" />
              <text x="32" y="82" fontSize="10" fill="#4b5563">
                25-50%
              </text>

              <rect x="100" y="30" width="16" height="16" fill="#dbeafe" />
              <text x="122" y="42" fontSize="10" fill="#4b5563">
                &lt; 25%
              </text>

              <rect x="100" y="50" width="16" height="16" fill="#f3f4f6" stroke="#d1d5db" />
              <text x="122" y="62" fontSize="10" fill="#4b5563">
                Sem dados
              </text>
            </>
          ) : (
            <>
              <rect x="10" y="30" width="16" height="16" fill="#6b21a8" />
              <text x="32" y="42" fontSize="10" fill="#4b5563">
                &gt; 75%
              </text>

              <rect x="10" y="50" width="16" height="16" fill="#a855f7" />
              <text x="32" y="62" fontSize="10" fill="#4b5563">
                50-75%
              </text>

              <rect x="10" y="70" width="16" height="16" fill="#d8b4fe" />
              <text x="32" y="82" fontSize="10" fill="#4b5563">
                25-50%
              </text>

              <rect x="100" y="30" width="16" height="16" fill="#f3e8ff" stroke="#d8b4fe" />
              <text x="122" y="42" fontSize="10" fill="#4b5563">
                &lt; 25%
              </text>

              <rect x="100" y="50" width="16" height="16" fill="#f3f4f6" stroke="#d1d5db" />
              <text x="122" y="62" fontSize="10" fill="#4b5563">
                Sem dados
              </text>
            </>
          )}
        </g>
      </svg>

      {/* Map subtitle */}
      <p className="text-center text-xs text-gray-600 font-semibold mt-4">
        13 municípios do Noroeste Fluminense
      </p>
    </div>
  );
}
