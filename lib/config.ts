// Data mode configuration
// Controls whether to show real data, demo data, or empty state

import type { PublicMapMetrics } from "@/lib/hooks/usePublicMapMetrics";

export type DataMode = "real" | "demo" | "empty";

// Get data mode from environment variable
// NEXT_PUBLIC_DATA_MODE can be: "real" | "demo" | "empty"
// Default: "real" (use actual Supabase data)
export function getDataMode(): DataMode {
  const mode = process.env.NEXT_PUBLIC_DATA_MODE?.toLowerCase();

  if (mode === "demo" || mode === "demonstracao") {
    return "demo";
  }

  if (mode === "empty" || mode === "vazio") {
    return "empty";
  }

  // Default to real mode
  return "real";
}

// Demo data for demonstration mode
export const DEMO_METRICS: PublicMapMetrics = {
  totalParticipacoes: 287,
  participacoesNoroeste: 287,
  municipiosAtivos: 11,
  totalMunicipios: 13,
  temasIdentificados: 6,
  ultimaAtualizacao: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
  tipoDados: "demonstracao",
};

// Demo data: contributions by municipality (sample ranking)
export const DEMO_BY_MUNICIPIO: Record<string, number> = {
  "Itaperuna": 52,
  "Itaocara": 48,
  "Santo Antônio de Pádua": 45,
  "Porciúncula": 38,
  "Cambuci": 35,
  "Italva": 28,
  "Miracema": 22,
  "Bom Jesus do Itabapoana": 12,
  "Aperibé": 3,
};

// Demo data: contributions by category
export const DEMO_BY_CATEGORIA: Record<string, number> = {
  "dificuldade-continuar": 65,
  "falta-orientacao": 58,
  "espera-encaminhamento": 48,
  "interrupcao-acompanhamento": 42,
  "mais-apoio": 41,
  "outra-percepcao": 33,
};

// Demo data: contributions by state (only RJ for Noroeste)
export const DEMO_BY_ESTADO: Record<string, number> = {
  "RJ": 287,
};
