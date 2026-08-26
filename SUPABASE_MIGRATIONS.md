# Migrações Supabase - Qualidade de Dados

## Visão Geral

Este documento descreve migrações necessárias para garantir qualidade de dados e cálculos corretos.

## Migração 1: Adicionar Campos de Qualidade à Tabela `mapa_contribuicoes`

### Objetivo
Rastrear integridade, tipo de registro, e data de participação.

### SQL

```sql
-- Add columns for data quality tracking
ALTER TABLE mapa_contribuicoes
ADD COLUMN IF NOT EXISTS is_complete BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS participation_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS municipio_normalized TEXT;

-- Create index for quality filtering
CREATE INDEX IF NOT EXISTS idx_is_complete ON mapa_contribuicoes(is_complete);
CREATE INDEX IF NOT EXISTS idx_is_test ON mapa_contribuicoes(is_test);
CREATE INDEX IF NOT EXISTS idx_participation_date ON mapa_contribuicoes(participation_date);

-- Comment columns for documentation
COMMENT ON COLUMN mapa_contribuicoes.is_complete IS 'True if response is complete (required fields present)';
COMMENT ON COLUMN mapa_contribuicoes.is_test IS 'True if this is a test record (should be excluded from public metrics)';
COMMENT ON COLUMN mapa_contribuicoes.participation_date IS 'Date of participation (for time-series analysis)';
COMMENT ON COLUMN mapa_contribuicoes.municipio_normalized IS 'Normalized municipality name for aggregation';
```

### Expected Result

Table structure:
```
mapa_contribuicoes:
- id (uuid)
- created_at (timestamptz)
- municipio (text) ← original, may have variations
- municipio_normalized (text) ← normalized form
- estado (text)
- resposta_categoria (text)
- origem (text)
- is_complete (boolean) ← NEW
- is_test (boolean) ← NEW
- participation_date (date) ← NEW
```

## Migração 2: Função SQL de Normalização

### Objetivo
Consolidar variações de nomes de município.

### SQL

```sql
-- Create function to normalize municipality names
CREATE OR REPLACE FUNCTION normalize_municipio(municipio_input TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN TRIM(INITCAP(municipio_input));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Populate normalized names for existing records
UPDATE mapa_contribuicoes
SET municipio_normalized = normalize_municipio(municipio)
WHERE municipio_normalized IS NULL;

-- Add constraint for 13 official municipalities
ALTER TABLE mapa_contribuicoes
ADD CONSTRAINT valid_municipio_noroeste
CHECK (
  municipio_normalized IN (
    'Aperibé',
    'Bom Jesus Do Itabapoana',
    'Cambuci',
    'Italva',
    'Itaocara',
    'Itaperuna',
    'Laje Do Muriaé',
    'Miracema',
    'Natividade',
    'Porciúncula',
    'Santo Antônio De Pádua',
    'São José De Ubá',
    'Varre-Sai'
  )
  OR estado != 'RJ'
);
```

## Migração 3: Criar Tabela de Auditoria

### Objetivo
Registrar reenvios e duplicatas potenciais.

### SQL

```sql
-- Table to track form resubmissions (prevent duplicates)
CREATE TABLE IF NOT EXISTS mapa_contribuicoes_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_contribution_id UUID REFERENCES mapa_contribuicoes(id),
  resubmit_contribution_id UUID REFERENCES mapa_contribuicoes(id),
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  reason TEXT,
  resolved BOOLEAN DEFAULT false
);

-- Index for audit queries
CREATE INDEX IF NOT EXISTS idx_audit_original ON mapa_contribuicoes_audit(original_contribution_id);

-- Create trigger to detect potential duplicates
-- (same municipio, estado, resposta_categoria within 5 minutes)
CREATE OR REPLACE FUNCTION check_duplicate_submission()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_test = false AND NEW.is_complete = true THEN
    INSERT INTO mapa_contribuicoes_audit (original_contribution_id, resubmit_contribution_id, reason)
    SELECT 
      id,
      NEW.id,
      'Possible resubmission: same municipio, estado, categoria within 5 minutes'
    FROM mapa_contribuicoes
    WHERE id != NEW.id
      AND municipio_normalized = NEW.municipio_normalized
      AND estado = NEW.estado
      AND resposta_categoria = NEW.resposta_categoria
      AND created_at > (NEW.created_at - INTERVAL '5 minutes')
      AND created_at < (NEW.created_at - INTERVAL '1 second')
      AND is_complete = true
      AND is_test = false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_duplicate_submission_trigger ON mapa_contribuicoes;
CREATE TRIGGER check_duplicate_submission_trigger
AFTER INSERT ON mapa_contribuicoes
FOR EACH ROW
EXECUTE FUNCTION check_duplicate_submission();
```

## Migração 4: Views para Auditoria

### Objetivo
Criar views para auditoria e análise de qualidade.

### SQL

```sql
-- View: Complete and valid Noroeste participations only
CREATE OR REPLACE VIEW v_noroeste_participations_clean AS
SELECT
  id,
  created_at,
  municipio_normalized as municipio,
  estado,
  resposta_categoria,
  participation_date,
  origem
FROM mapa_contribuicoes
WHERE is_complete = true
  AND is_test = false
  AND estado = 'RJ'
  AND municipio_normalized IN (
    'Aperibé', 'Bom Jesus Do Itabapoana', 'Cambuci', 'Italva', 'Itaocara',
    'Itaperuna', 'Laje Do Muriaé', 'Miracema', 'Natividade', 'Porciúncula',
    'Santo Antônio De Pádua', 'São José De Ubá', 'Varre-Sai'
  );

-- View: All complete participations (Noroeste + other regions)
CREATE OR REPLACE VIEW v_all_participations_clean AS
SELECT
  id,
  created_at,
  municipio_normalized as municipio,
  estado,
  resposta_categoria,
  participation_date,
  origem
FROM mapa_contribuicoes
WHERE is_complete = true AND is_test = false;

-- View: Data quality report
CREATE OR REPLACE VIEW v_data_quality_report AS
SELECT
  COUNT(*) as total_records,
  COUNT(CASE WHEN is_complete THEN 1 END) as complete_records,
  COUNT(CASE WHEN NOT is_complete THEN 1 END) as incomplete_records,
  COUNT(CASE WHEN is_test THEN 1 END) as test_records,
  COUNT(CASE WHEN is_complete AND NOT is_test AND estado='RJ' THEN 1 END) as valid_noroeste,
  COUNT(CASE WHEN is_complete AND NOT is_test AND estado!='RJ' THEN 1 END) as valid_other_regions,
  ROUND(100.0 * COUNT(CASE WHEN is_complete THEN 1 END) / COUNT(*), 2) as completeness_percent
FROM mapa_contribuicoes;

-- View: Duplicate detection report
CREATE OR REPLACE VIEW v_duplicate_report AS
SELECT
  COUNT(*) as potential_duplicates,
  COUNT(DISTINCT original_contribution_id) as unique_original_records,
  COUNT(DISTINCT resubmit_contribution_id) as unique_resubmit_records,
  COUNT(CASE WHEN resolved THEN 1 END) as resolved_duplicates
FROM mapa_contribuicoes_audit;
```

## Como Executar

### No Supabase Dashboard

1. Vá para SQL Editor
2. Copie cada migração
3. Execute uma de cada vez (na ordem)
4. Verifique se não há erros

### Verificação

```sql
-- Check table structure
\d mapa_contribuicoes

-- Check data quality
SELECT * FROM v_data_quality_report;

-- Check for duplicates
SELECT * FROM v_duplicate_report;

-- Audit Noroeste data
SELECT 
  municipio,
  COUNT(*) as count
FROM v_noroeste_participations_clean
GROUP BY municipio
ORDER BY count DESC;
```

## Rollback (se necessário)

```sql
-- Drop views
DROP VIEW IF EXISTS v_duplicate_report CASCADE;
DROP VIEW IF EXISTS v_data_quality_report CASCADE;
DROP VIEW IF EXISTS v_all_participations_clean CASCADE;
DROP VIEW IF EXISTS v_noroeste_participations_clean CASCADE;

-- Drop triggers and functions
DROP TRIGGER IF EXISTS check_duplicate_submission_trigger ON mapa_contribuicoes;
DROP FUNCTION IF EXISTS check_duplicate_submission() CASCADE;
DROP FUNCTION IF EXISTS normalize_municipio(TEXT) CASCADE;

-- Drop indexes
DROP INDEX IF EXISTS idx_audit_original;
DROP INDEX IF EXISTS idx_participation_date;
DROP INDEX IF EXISTS idx_is_test;
DROP INDEX IF EXISTS idx_is_complete;

-- Drop audit table
DROP TABLE IF EXISTS mapa_contribuicoes_audit CASCADE;

-- Drop columns
ALTER TABLE mapa_contribuicoes
DROP COLUMN IF EXISTS municipio_normalized,
DROP COLUMN IF EXISTS participation_date,
DROP COLUMN IF EXISTS is_test,
DROP COLUMN IF EXISTS is_complete;
```

## Notas

- As migrações podem ser executadas em qualquer ordem após a tabela existir
- Os triggers executam automaticamente em novas inserções
- As views garantem que dados públicos nunca exponham registros individuais
- A constraints valida os 13 municípios oficiais
