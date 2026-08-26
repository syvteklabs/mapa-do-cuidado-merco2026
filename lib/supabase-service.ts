import { createClient } from "./supabase";
import { CreateContribuicaoRequest, CreateExpansaoRequest } from "@/types/database";

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
}

export const supabaseService = SupabaseService.getInstance();
