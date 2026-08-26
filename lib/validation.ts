// Data quality validation utilities
import { MUNICIPIOS_NOROESTE, normalizeMunicipioName } from "@/lib/constants";

export interface ContribuicaoValidation {
  isComplete: boolean;
  isTest: boolean;
  municipioNormalized: string;
  errors: string[];
}

// Check if response is complete (has all required fields with valid values)
export function validateContribuicaoCompleteness(data: {
  municipio?: string;
  estado?: string;
  resposta_categoria?: string;
}): { isComplete: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.municipio || !data.municipio.trim()) {
    errors.push("Município é obrigatório");
  }

  if (!data.estado || !data.estado.trim()) {
    errors.push("Estado é obrigatório");
  }

  if (!data.resposta_categoria || !data.resposta_categoria.trim()) {
    errors.push("Categoria de resposta é obrigatória");
  }

  return {
    isComplete: errors.length === 0,
    errors,
  };
}

// Detect test records (data from dashboard preview, demo mode, etc)
export function isTestRecord(municipio: string, ip?: string): boolean {
  const testMunicipios = ["test", "teste", "demo", "demonstracao"];
  const normalized = normalizeMunicipioName(municipio).toLowerCase();

  if (testMunicipios.some((test) => normalized.includes(test))) {
    return true;
  }

  // Test IPs (localhost, internal networks)
  if (ip && /^(127\.|192\.168\.|10\.|172\.1[6-9]\.|172\.2[0-9]\.|172\.3[01]\.)/.test(ip)) {
    return true;
  }

  return false;
}

// Validate municipality is one of the 13 official Noroeste municipalities
export function isValidNoroesteMunicipio(
  municipio: string,
  estado: string
): boolean {
  if (estado !== "RJ") return false;

  const normalized = normalizeMunicipioName(municipio);
  return MUNICIPIOS_NOROESTE.includes(normalized);
}

// Comprehensive validation function
export function validateContribuicao(data: {
  municipio?: string;
  estado?: string;
  resposta_categoria?: string;
  ip?: string;
}): ContribuicaoValidation {
  const completeness = validateContribuicaoCompleteness(data);
  const municipioNormalized = data.municipio
    ? normalizeMunicipioName(data.municipio)
    : "";

  const validation: ContribuicaoValidation = {
    isComplete: completeness.isComplete,
    isTest: isTestRecord(municipioNormalized, data.ip),
    municipioNormalized,
    errors: completeness.errors,
  };

  // Add warning if from other region but not marked as test
  if (
    completeness.isComplete &&
    data.estado === "RJ" &&
    !isValidNoroesteMunicipio(municipioNormalized, data.estado)
  ) {
    // This is a Noroeste-only project, so this might be a typo
    validation.errors.push(
      `Município "${municipioNormalized}" não está na lista dos 13 municípios do Noroeste`
    );
    validation.isComplete = false;
  }

  return validation;
}

// Generate audit report for a set of records
export interface AuditReport {
  totalRecords: number;
  completeRecords: number;
  incompleteRecords: number;
  testRecords: number;
  validNoroeste: number;
  otherRegions: number;
  completenessPercent: number;
}

export function generateAuditReport(records: Array<{
  is_complete?: boolean;
  is_test?: boolean;
  estado?: string;
  municipio_normalized?: string;
}>): AuditReport {
  const total = records.length;
  const complete = records.filter((r) => r.is_complete === true).length;
  const tests = records.filter((r) => r.is_test === true).length;
  const noroeste = records.filter(
    (r) =>
      r.is_complete === true &&
      r.is_test === false &&
      r.estado === "RJ" &&
      MUNICIPIOS_NOROESTE.includes(r.municipio_normalized || "")
  ).length;
  const other = records.filter(
    (r) => r.is_complete === true && r.is_test === false && r.estado !== "RJ"
  ).length;

  return {
    totalRecords: total,
    completeRecords: complete,
    incompleteRecords: total - complete,
    testRecords: tests,
    validNoroeste: noroeste,
    otherRegions: other,
    completenessPercent: total > 0 ? Math.round((complete / total) * 100 * 100) / 100 : 0,
  };
}
