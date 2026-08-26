import dynamic from "next/dynamic";

const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

interface NoroestMapProps {
  municipiosStats: Record<string, number>;
  municipiosCategories?: Record<string, Record<string, number>>;
  selectedMunicipio?: string | null;
  onMunicipioSelect?: (municipio: string | null) => void;
  dataView?: "participations" | "needs";
  height?: string;
}

export default function NoroestMap({
  municipiosStats,
  municipiosCategories,
  selectedMunicipio,
  onMunicipioSelect,
  dataView = "participations",
  height = "h-full",
}: NoroestMapProps) {
  return (
    <div className={`w-full ${height}`} style={{ minHeight: '400px' }}>
      <MapContent
        municipiosStats={municipiosStats}
        municipiosCategories={municipiosCategories}
        selectedMunicipio={selectedMunicipio}
        onMunicipioSelect={onMunicipioSelect}
        dataView={dataView}
      />
    </div>
  );
}
