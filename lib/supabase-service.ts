import { createClient } from "./supabase";
import { CreateContribuicaoRequest, CreateExpansaoRequest } from "@/types/database";
import { MUNICIPIOS_NOROESTE } from "@/lib/constants";

export class SupabaseService {
  private static instance: SupabaseService;

  private constructor() {}

  static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  // Contribuições (Anonymous feedback)
  async createContribuicao(data: CreateContribuicaoRequest) {
    try {
      const client = createClient();

      const { data: result, error } = await client
        .from("mapa_contribuicoes")
        .insert([
          {
            municipio: data.municipio,
            estado: data.estado,
            resposta_categoria: data.resposta_categoria,
            origem: "merco-2026",
          },
        ])
        .select();

      if (error) {
        console.error("Error creating contribuicao:", error);
        return {
          success: false,
          error: "Falha ao salvar sua resposta. Tente novamente.",
        };
      }

      return { success: true, data: result?.[0] };
    } catch (err) {
      console.error("Unexpected error in createContribuicao:", err);
      return {
        success: false,
        error: "Erro inesperado. Tente novamente mais tarde.",
      };
    }
  }

  // Expansão (Territorial expansion - contact info)
  async createExpansao(data: CreateExpansaoRequest) {
    try {
      const client = createClient();

      // Validate at least one contact is provided
      if (!data.contato_whatsapp && !data.contato_email) {
        return {
          success: false,
          error: "Forneça pelo menos WhatsApp ou e-mail.",
        };
      }

      // Validate email format if provided
      if (
        data.contato_email &&
        !data.contato_email.includes("@")
      ) {
        return {
          success: false,
          error: "E-mail inválido.",
        };
      }

      const { data: result, error } = await client
        .from("mapa_expansao")
        .insert([
          {
            nome: data.nome,
            cidade: data.cidade,
            estado: data.estado,
            contato_whatsapp: data.contato_whatsapp || null,
            contato_email: data.contato_email || null,
            tipo_participante: data.tipo_participante || null,
            consentimento_contato: data.consentimento_contato,
            origem: "mapa-cuidado-expansao",
          },
        ])
        .select();

      if (error) {
        console.error("Error creating expansao:", error);
        return {
          success: false,
          error: "Falha ao salvar seu interesse. Tente novamente.",
        };
      }

      return { success: true, data: result?.[0] };
    } catch (err) {
      console.error("Unexpected error in createExpansao:", err);
      return {
        success: false,
        error: "Erro inesperado. Tente novamente mais tarde.",
      };
    }
  }

  // Get aggregated statistics (for dashboard)
  // Only returns aggregated data, no individual records
  async getContribuicoesStats() {
    try {
      const client = createClient();

      // Total contributions
      const { count: totalContributions, error: countError } = await client
        .from("mapa_contribuicoes")
        .select("*", { count: "exact", head: true });

      if (countError) {
        console.error("Error fetching count:", countError);
        return { success: false, error: countError.message };
      }

      // Contributions by state
      const { data: byState, error: stateError } = await client
        .from("mapa_contribuicoes")
        .select("estado, id");

      if (stateError) {
        console.error("Error fetching by state:", stateError);
        return { success: false, error: stateError.message };
      }

      // Contributions by municipality
      const { data: byMunicipio, error: municipioError } = await client
        .from("mapa_contribuicoes")
        .select("municipio, id");

      if (municipioError) {
        console.error("Error fetching by municipality:", municipioError);
        return { success: false, error: municipioError.message };
      }

      // Count by category
      const { data: byCategoryRaw, error: categoryError } = await client
        .from("mapa_contribuicoes")
        .select("resposta_categoria, id");

      if (categoryError) {
        console.error("Error fetching by category:", categoryError);
        return { success: false, error: categoryError.message };
      }

      // Aggregate results
      const statePcts = new Map<string, number>();
      const municipioPcts = new Map<string, number>();
      const categoryPcts = new Map<string, number>();

      if (byState) {
        byState.forEach(({ estado }) => {
          statePcts.set(estado, (statePcts.get(estado) || 0) + 1);
        });
      }

      if (byMunicipio) {
        byMunicipio.forEach(({ municipio }) => {
          municipioPcts.set(municipio, (municipioPcts.get(municipio) || 0) + 1);
        });
      }

      if (byCategoryRaw) {
        byCategoryRaw.forEach(({ resposta_categoria }) => {
          categoryPcts.set(
            resposta_categoria,
            (categoryPcts.get(resposta_categoria) || 0) + 1
          );
        });
      }

      return {
        success: true,
        data: {
          total: totalContributions || 0,
          byState: Object.fromEntries(statePcts),
          byMunicipio: Object.fromEntries(municipioPcts),
          byCategory: Object.fromEntries(categoryPcts),
        },
      };
    } catch (err) {
      console.error("Unexpected error in getContribuicoesStats:", err);
      return {
        success: false,
        error: "Erro ao buscar estatísticas.",
      };
    }
  }

  // Get unified public map metrics (single source of truth)
  async getPublicMapMetrics() {
    try {
      const client = createClient();

      // Fetch all contributions
      const { data: allContributions, error: fetchError } = await client
        .from("mapa_contribuicoes")
        .select("municipio, estado, resposta_categoria, created_at");

      if (fetchError) {
        console.error("Error fetching contributions:", fetchError);
        return { success: false, error: fetchError.message };
      }

      if (!allContributions || allContributions.length === 0) {
        return {
          success: true,
          data: {
            totalParticipacoes: 0,
            participacoesNoroeste: 0,
            municipiosAtivos: 0,
            totalMunicipios: 13,
            temasIdentificados: 0,
            ultimaAtualizacao: new Date().toISOString(),
            tipoDados: "indisponivel" as const,
          },
        };
      }

      // Calculate metrics
      let participacoesNoroeste = 0;
      const municipiosAtivosSet = new Set<string>();
      const categoriasSet = new Set<string>();
      let latestDate = new Date(0);

      allContributions.forEach((contrib) => {
        // Count Noroeste participations
        if (
          contrib.estado === "RJ" &&
          MUNICIPIOS_NOROESTE.includes(contrib.municipio)
        ) {
          participacoesNoroeste += 1;
        }

        // Track active municipalities in Noroeste
        if (
          contrib.estado === "RJ" &&
          MUNICIPIOS_NOROESTE.includes(contrib.municipio)
        ) {
          municipiosAtivosSet.add(contrib.municipio);
        }

        // Track unique categories
        if (contrib.resposta_categoria) {
          categoriasSet.add(contrib.resposta_categoria);
        }

        // Track latest update
        if (contrib.created_at) {
          const date = new Date(contrib.created_at);
          if (date > latestDate) {
            latestDate = date;
          }
        }
      });

      return {
        success: true,
        data: {
          totalParticipacoes: allContributions.length,
          participacoesNoroeste,
          municipiosAtivos: municipiosAtivosSet.size,
          totalMunicipios: 13,
          temasIdentificados: categoriasSet.size,
          ultimaAtualizacao: latestDate > new Date(0) ? latestDate.toISOString() : new Date().toISOString(),
          tipoDados: "real" as const,
        },
      };
    } catch (err) {
      console.error("Unexpected error in getPublicMapMetrics:", err);
      return {
        success: false,
        error: "Erro ao buscar métricas do mapa.",
      };
    }
  }

  // Get aggregated expansion statistics (no personal data)
  async getExpansaoStats() {
    try {
      const client = createClient();

      // Total expansion interests
      const { count: totalInterests, error: countError } = await client
        .from("mapa_expansao")
        .select("*", { count: "exact", head: true });

      if (countError) {
        console.error("Error fetching expansion count:", countError);
        return { success: false, error: countError.message };
      }

      // Expansion interests by city
      const { data: byCity, error: cityError } = await client
        .from("mapa_expansao")
        .select("cidade, estado, id");

      if (cityError) {
        console.error("Error fetching expansion by city:", cityError);
        return { success: false, error: cityError.message };
      }

      // Aggregate by city and state
      const cityStats = new Map<string, number>();
      const cityStateMap = new Map<string, string>();

      if (byCity) {
        byCity.forEach(({ cidade, estado }) => {
          const key = `${cidade} — ${estado}`;
          cityStats.set(key, (cityStats.get(key) || 0) + 1);
          cityStateMap.set(key, estado);
        });
      }

      // Sort by count descending
      const sortedCities = Array.from(cityStats.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([city, count]) => ({
          city,
          count,
        }));

      return {
        success: true,
        data: {
          total: totalInterests || 0,
          uniqueCities: cityStats.size,
          byCity: sortedCities,
        },
      };
    } catch (err) {
      console.error("Unexpected error in getExpansaoStats:", err);
      return {
        success: false,
        error: "Erro ao buscar estatísticas de expansão.",
      };
    }
  }
}

export const supabaseService = SupabaseService.getInstance();
