// Database type definitions for Mapa do Cuidado MVP

export interface MapaContribuicao {
  id: string;
  municipio: string;
  estado: string;
  resposta_categoria: string;
  origem: string;
  criado_em: string;
}

export interface MapaExpansao {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  contato_whatsapp?: string | null;
  contato_email?: string | null;
  tipo_participante?: string | null;
  consentimento_contato: boolean;
  origem: string;
  criado_em: string;
}

// Request/Response types
export interface CreateContribuicaoRequest {
  municipio: string;
  estado: string;
  resposta_categoria: string;
}

export interface CreateExpansaoRequest {
  nome: string;
  cidade: string;
  estado: string;
  contato_whatsapp?: string;
  contato_email?: string;
  tipo_participante?: string;
  consentimento_contato: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface DashboardStats {
  total: number;
  byState: Record<string, number>;
  byMunicipio: Record<string, number>;
  byCategory: Record<string, number>;
  bySentiment?: Record<string, number>;
}
