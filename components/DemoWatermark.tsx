"use client";

import { getDataMode } from "@/lib/config";

export default function DemoWatermark() {
  const dataMode = getDataMode();
  const isDemo = dataMode === "demo";

  if (!isDemo) return null;

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-10 opacity-5">
      <div className="text-center transform -rotate-45">
        <p className="text-9xl font-bold text-gray-900 tracking-widest">
          DEMONSTRAÇÃO
        </p>
        <p className="text-4xl font-bold text-gray-700 tracking-wide mt-4">
          DADOS FICTÍCIOS
        </p>
      </div>
    </div>
  );
}
