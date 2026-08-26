// DEMONSTRAÇÃO - Dados fictícios para contingência
// Este arquivo é usado APENAS quando o Supabase está indisponível
// Nunca misturar com dados reais em produção

export const DEMO_STATS = {
  total: 247,
  byState: {
    RJ: 210,
    MG: 15,
    ES: 22,
  },
  byMunicipio: {
    "Itaperuna": 45,
    "Campos dos Goytacazes": 38,
    "São Fidélis": 32,
    "Itaocara": 28,
    "Natividade": 25,
    "Aperibé": 20,
    "Bom Jesus do Itabapoana": 18,
    "Porciúncula": 16,
    "Santo Antônio de Pádua": 14,
    "Laje do Muriaé": 12,
    "Varre-Sai": 10,
    "Cambuci": 8,
    "Italva": 5,
  },
  byCategory: {
    "Dificuldade para continuar o tratamento": 85,
    "Necessidade de mais apoio ao paciente ou à família": 67,
    "Espera por encaminhamento": 45,
    "Falta de orientação": 32,
    "Interrupção do acompanhamento": 15,
    "Outra percepção": 3,
  },
};

export const DEMO_EXPANSION = {
  total: 34,
  uniqueCities: 12,
  byCity: [
    { city: "Nova Friburgo — RJ", count: 8 },
    { city: "Muriaé — MG", count: 6 },
    { city: "Bom Jardim — RJ", count: 5 },
    { city: "Juiz de Fora — MG", count: 4 },
    { city: "Maricá — RJ", count: 3 },
    { city: "Magé — RJ", count: 2 },
    { city: "Rio Pomba — MG", count: 2 },
    { city: "Santa Maria Madalena — RJ", count: 1 },
    { city: "Niterói — RJ", count: 1 },
    { city: "São Gonçalo — RJ", count: 1 },
    { city: "Teresópolis — RJ", count: 1 },
  ],
};
