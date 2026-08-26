import dynamic from "next/dynamic";

const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

interface NoroestMapProps {
  municipiosStats: Record<string, number>;
}

export default function NoroestMap({ municipiosStats }: NoroestMapProps) {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <MapContent municipiosStats={municipiosStats} />
    </div>
  );
}
