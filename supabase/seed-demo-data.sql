-- ⚠️ DEMONSTRATION DATA ONLY
-- This file contains sample data for local development and testing.
-- DO NOT use this in production without review.
-- All entries are clearly marked as DEMO data.

-- Insert sample contributions (DEMO)
INSERT INTO mapa_contribuicoes (municipio, estado, resposta_categoria, origem)
VALUES
  ('Campos dos Goytacazes', 'RJ', 'DEMO - Cuidado Preventivo', 'merco-2026'),
  ('São Fidélis', 'RJ', 'DEMO - Acesso a Medicamentos', 'merco-2026'),
  ('Conceição de Macabu', 'RJ', 'DEMO - Atendimento Especializado', 'merco-2026'),
  ('Carapebus', 'RJ', 'DEMO - Cuidado Preventivo', 'merco-2026'),
  ('Quissamã', 'RJ', 'DEMO - Saúde Mental', 'merco-2026'),
  ('Macaé', 'RJ', 'DEMO - Acesso a Medicamentos', 'merco-2026'),
  ('Rio das Ostras', 'RJ', 'DEMO - Atendimento Especializado', 'merco-2026'),
  ('Cardoso Moreira', 'RJ', 'DEMO - Cuidado Preventivo', 'merco-2026');

-- Insert sample expansion interests (DEMO)
-- These are marked DEMO and should not be contacted
INSERT INTO mapa_expansao (nome, cidade, estado, contato_whatsapp, contato_email, tipo_participante, consentimento_contato, origem)
VALUES
  ('DEMO - João Silva', 'Campos dos Goytacazes', 'RJ', '+55 24 99999-0001', NULL, 'Profissional de Saúde', TRUE, 'mapa-cuidado-expansao'),
  ('DEMO - Maria Santos', 'São Fidélis', 'RJ', NULL, 'demo@example.com', 'Gestor Público', TRUE, 'mapa-cuidado-expansao'),
  ('DEMO - Carlos Oliveira', 'Macaé', 'RJ', '+55 24 99999-0002', 'demo2@example.com', 'Organização Social', TRUE, 'mapa-cuidado-expansao');

-- Note: These are synthetic data for testing purposes only.
-- All names and contact information are fictional.
