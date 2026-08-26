-- Migration: 001_create_base_tables.sql
-- Purpose: Create base tables for Mapa do Cuidado MVP
-- Date: 2026-08-26
-- Tables:
--   1. mapa_contribuicoes - Anonymous care pathway feedback
--   2. mapa_expansao - Territorial expansion interests and contacts

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Mapa Contribuições (Anonymous Feedback)
-- Stores anonymous responses about care pathways
CREATE TABLE IF NOT EXISTS mapa_contribuicoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  municipio VARCHAR(255) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  resposta_categoria VARCHAR(255) NOT NULL,
  origem VARCHAR(50) NOT NULL DEFAULT 'merco-2026',
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Indexes for common queries
  CONSTRAINT estado_valid CHECK (LENGTH(estado) = 2)
);

CREATE INDEX idx_mapa_contribuicoes_municipio ON mapa_contribuicoes(municipio);
CREATE INDEX idx_mapa_contribuicoes_estado ON mapa_contribuicoes(estado);
CREATE INDEX idx_mapa_contribuicoes_categoria ON mapa_contribuicoes(resposta_categoria);
CREATE INDEX idx_mapa_contribuicoes_origem ON mapa_contribuicoes(origem);
CREATE INDEX idx_mapa_contribuicoes_data ON mapa_contribuicoes(criado_em DESC);

-- Table 2: Mapa Expansão (Territorial Expansion Contacts)
-- Stores contact information for territorial expansion
CREATE TABLE IF NOT EXISTS mapa_expansao (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  contato_whatsapp VARCHAR(20),
  contato_email VARCHAR(255),
  tipo_participante VARCHAR(100),
  consentimento_contato BOOLEAN NOT NULL DEFAULT FALSE,
  origem VARCHAR(50) NOT NULL DEFAULT 'mapa-cuidado-expansao',
  criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  CONSTRAINT estado_valid CHECK (LENGTH(estado) = 2),
  CONSTRAINT at_least_one_contact CHECK (
    (contato_whatsapp IS NOT NULL AND LENGTH(contato_whatsapp) > 0) OR
    (contato_email IS NOT NULL AND LENGTH(contato_email) > 0)
  ),
  CONSTRAINT email_format CHECK (
    contato_email IS NULL OR contato_email LIKE '%@%'
  )
);

CREATE INDEX idx_mapa_expansao_cidade ON mapa_expansao(cidade);
CREATE INDEX idx_mapa_expansao_estado ON mapa_expansao(estado);
CREATE INDEX idx_mapa_expansao_origem ON mapa_expansao(origem);
CREATE INDEX idx_mapa_expansao_data ON mapa_expansao(criado_em DESC);

-- Enable RLS
ALTER TABLE mapa_contribuicoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mapa_expansao ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mapa_contribuicoes (Anonymous, read-only for aggregated data)
-- Anonymous users can INSERT new contributions
CREATE POLICY "allow_insert_contributions_anonymous"
  ON mapa_contribuicoes
  FOR INSERT
  WITH CHECK (true);

-- Anonymous users can only see aggregated/non-identifying data
-- In practice, the dashboard will query aggregates, not individual rows
CREATE POLICY "allow_select_contributions_aggregated"
  ON mapa_contribuicoes
  FOR SELECT
  USING (true);

-- RLS Policies for mapa_expansao (Contacts hidden from public)
-- Anonymous users can INSERT expansion interests
CREATE POLICY "allow_insert_expansion_anonymous"
  ON mapa_expansao
  FOR INSERT
  WITH CHECK (true);

-- Anonymous users CANNOT read expansion contacts (privacy protection)
CREATE POLICY "block_select_expansion_public"
  ON mapa_expansao
  FOR SELECT
  USING (false);

-- Future: authenticated admin users can read with:
-- CREATE POLICY "allow_select_expansion_admin"
--   ON mapa_expansao
--   FOR SELECT
--   USING (auth.jwt() ->> 'role' = 'admin');

-- Add comments for documentation
COMMENT ON TABLE mapa_contribuicoes IS 'Anonymous feedback about care pathways in Noroeste Fluminense region. No personally identifiable information is stored.';
COMMENT ON TABLE mapa_expansao IS 'Contact information for territorial expansion interests. Contacts are private and not accessible to public queries.';
