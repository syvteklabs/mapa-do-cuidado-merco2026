/**
 * Dicionário central que mapeia códigos internos para textos públicos.
 * Nenhum slug deve aparecer diretamente na interface - sempre usar este dicionário.
 */

export const CATEGORY_LABELS: Record<string, string> = {
  "dificuldade-continuar": "Dificuldade para continuar o tratamento",
  "falta-orientacao": "Falta de orientação",
  "espera-encaminhamento": "Espera por encaminhamento",
  "interrupcao-acompanhamento": "Acompanhamento interrompido",
  "mais-apoio": "Necessidade de mais apoio",
  "outra-percepcao": "Outra percepção",
};

export const CATEGORY_HUMAN_LABELS: Record<string, string> = {
  "dificuldade-continuar": "Achei difícil continuar o tratamento",
  "falta-orientacao": "Faltou orientação sobre como buscar ajuda",
  "espera-encaminhamento": "Esperei muito por um encaminhamento",
  "interrupcao-acompanhamento": "Perdi o acompanhamento no caminho",
  "mais-apoio": "Precisei de mais apoio para mim ou minha família",
  "outra-percepcao": "Outra coisa marcou essa experiência",
};

export const SENTIMENT_LABELS: Record<string, { label: string; emoji: string }> = {
  acolhido: { label: "Acolhido", emoji: "🤗" },
  seguro: { label: "Seguro", emoji: "🛡️" },
  confuso: { label: "Confuso", emoji: "😕" },
  cansado: { label: "Cansado", emoji: "😴" },
  preocupado: { label: "Preocupado", emoji: "😟" },
  desamparado: { label: "Desamparado", emoji: "😔" },
  esperancoso: { label: "Esperançoso", emoji: "🌟" },
  "prefiro-nao": { label: "Prefiro não responder", emoji: "🤐" },
};

/**
 * Obtém o label público de uma categoria interna
 */
export function getCategoryLabel(categoryId: string): string {
  return CATEGORY_LABELS[categoryId] || categoryId;
}

/**
 * Obtém o label humano de uma categoria interna
 */
export function getCategoryHumanLabel(categoryId: string): string {
  return CATEGORY_HUMAN_LABELS[categoryId] || CATEGORY_LABELS[categoryId] || categoryId;
}

/**
 * Obtém o label e emoji de um sentimento
 */
export function getSentimentLabel(sentimentId: string): { label: string; emoji: string } {
  return SENTIMENT_LABELS[sentimentId] || { label: sentimentId, emoji: "💭" };
}

/**
 * Normaliza um ID de sentimento para o formato correto (com hífen)
 */
export function normalizeSentimentId(id: string): string {
  return id.replace(/_/g, "-");
}
