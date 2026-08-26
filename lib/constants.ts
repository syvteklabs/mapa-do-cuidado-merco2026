// Noroeste Fluminense region municipalities (13 municipalities)
export const MUNICIPIOS_NOROESTE = [
  "Aperibé",
  "Bom Jesus do Itabapoana",
  "Cambuci",
  "Italva",
  "Itaocara",
  "Itaperuna",
  "Laje do Muriaé",
  "Miracema",
  "Natividade",
  "Porciúncula",
  "Santo Antônio de Pádua",
  "São José de Ubá",
  "Varre-Sai",
];

export const TOTAL_MUNICIPIOS_NOROESTE = 13;

// Helper function to check if a municipality is in Noroeste
export function isFromNoroeste(estado: string, municipio: string): boolean {
  if (estado !== "RJ") return false;
  return MUNICIPIOS_NOROESTE.includes(municipio);
}

// Category IDs (must match database)
export const CATEGORIA_IDS = {
  DIFICULDADE_CONTINUAR: "dificuldade-continuar",
  FALTA_ORIENTACAO: "falta-orientacao",
  ESPERA_ENCAMINHAMENTO: "espera-encaminhamento",
  INTERRUPCAO_ACOMPANHAMENTO: "interrupcao-acompanhamento",
  MAIS_APOIO: "mais-apoio",
  OUTRA_PERCEPCAO: "outra-percepcao",
} as const;

export const CATEGORIAS = [
  {
    id: CATEGORIA_IDS.DIFICULDADE_CONTINUAR,
    label: "Dificuldade para continuar o tratamento",
  },
  {
    id: CATEGORIA_IDS.FALTA_ORIENTACAO,
    label: "Falta de orientação",
  },
  {
    id: CATEGORIA_IDS.ESPERA_ENCAMINHAMENTO,
    label: "Espera por encaminhamento",
  },
  {
    id: CATEGORIA_IDS.INTERRUPCAO_ACOMPANHAMENTO,
    label: "Interrupção do acompanhamento",
  },
  {
    id: CATEGORIA_IDS.MAIS_APOIO,
    label: "Necessidade de mais apoio ao paciente ou à família",
  },
  {
    id: CATEGORIA_IDS.OUTRA_PERCEPCAO,
    label: "Outra percepção",
  },
];
