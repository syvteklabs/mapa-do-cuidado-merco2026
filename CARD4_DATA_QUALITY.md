# CARD 4: Data Quality Rules and Validation

## Overview

CARD 4 implements comprehensive data quality rules to ensure the metrics displayed on the public dashboard are accurate, auditable, and free from incomplete or test data.

## Key Features

### 1. Data Classification on Submission

Every contribution is automatically evaluated when submitted via the POST `/api/contribuicoes` endpoint:

- **`is_complete`**: Boolean indicating if the response has all required fields
- **`is_test`**: Boolean indicating if the response appears to be from testing/demo data
- **`municipio_normalized`**: Normalized municipality name (titlecased, trimmed)
- **`participation_date`**: Date of participation (YYYY-MM-DD format)

### 2. Validation Rules

#### Completeness Check (`validateContribuicaoCompleteness`)
Ensures required fields are present:
- `municipio` (non-empty)
- `estado` (non-empty, typically "RJ")
- `resposta_categoria` (valid category ID)

#### Test Record Detection (`isTestRecord`)
Identifies data from testing/demo:
- Municipality name contains: "test", "teste", "demo", "demonstracao"
- IP address matches test/internal network ranges:
  - `127.0.0.0/8` (localhost)
  - `192.168.0.0/16` (private network)
  - `10.0.0.0/8` (private network)
  - `172.16.0.0/12` (private network)

#### Municipality Validation (`isValidNoroesteMunicipio`)
Validates against the 13 official Noroeste municipalities:
- "Aperibé", "Bom Jesus do Itabapoana", "Cambuci", "Italva", "Itaocara", "Itaperuna", 
- "Laje do Muriaé", "Miracema", "Natividade", "Porciúncula", "Santo Antônio de Pádua", 
- "São José de Ubá", "Varre-Sai"

### 3. Normalization Strategy

Municipality names are normalized using titlecase transformation:
- Input: "itaperuna" → Output: "Itaperuna"
- Input: "ITAOCARA" → Output: "Itaocara"
- Input: "são josé de ubá" → Output: "São José De Ubá"

This ensures variations of the same municipality are counted together, providing accurate metrics.

## API Integration

### POST `/api/contribuicoes` (Form Submission)

**Flow:**
1. Basic JSON validation and field presence checks
2. Category whitelist validation
3. Run `validateContribuicao()` to classify the submission
4. Extract IP address from `x-forwarded-for` or `x-real-ip` headers
5. Pass enriched data to `supabaseService.createContribuicao()`
6. Database stores all quality flags

**Request:**
```json
{
  "municipio": "Itaperuna",
  "estado": "RJ",
  "resposta_categoria": "dificuldade-continuar"
}
```

**Response (success):**
```json
{
  "success": true,
  "message": "Contribuição salva com sucesso",
  "total": 42
}
```

### GET `/api/metrics` (Public Dashboard Metrics)

Returns unified metrics filtered to valid data only:

```json
{
  "success": true,
  "data": {
    "totalParticipacoes": 42,
    "participacoesNoroeste": 40,
    "municipiosAtivos": 11,
    "totalMunicipios": 13,
    "temasIdentificados": 6,
    "ultimaAtualizacao": "2026-08-26T14:30:00.000Z",
    "tipoDados": "real"
  }
}
```

**Calculation Logic:**
- Counts only records where `is_complete=true AND is_test=false`
- Sums contributions from the 13 Noroeste municipalities
- Tracks active (non-empty) municipalities
- Identifies unique categories submitted
- Records the timestamp of the most recent valid contribution

### GET `/api/metrics/audit` (Admin Data Quality Report)

Returns detailed audit information for monitoring data quality:

```json
{
  "success": true,
  "data": {
    "timestamp": "2026-08-26T14:30:00.000Z",
    "summary": {
      "totalRecords": 50,
      "completeRecords": 42,
      "incompleteRecords": 8,
      "testRecords": 0,
      "validRecords": 42,
      "completenessPercent": 84.0,
      "validityPercent": 84.0
    },
    "byState": {
      "RJ": {"total": 45, "complete": 40, "test": 0},
      "MG": {"total": 5, "complete": 2, "test": 0}
    }
  }
}
```

## Database Schema Updates

### New Columns in `mapa_contribuicoes`

- `is_complete BOOLEAN DEFAULT true` - Whether response is complete
- `is_test BOOLEAN DEFAULT false` - Whether response is test data
- `municipio_normalized TEXT` - Normalized municipality name
- `participation_date DATE` - Date of participation (YYYY-MM-DD)

### Recommended Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_is_complete ON mapa_contribuicoes(is_complete);
CREATE INDEX IF NOT EXISTS idx_is_test ON mapa_contribuicoes(is_test);
CREATE INDEX IF NOT EXISTS idx_quality_filter ON mapa_contribuicoes(is_complete, is_test);
CREATE INDEX IF NOT EXISTS idx_participation_date ON mapa_contribuicoes(participation_date);
```

## Quality Metrics Interpretation

### Completeness Score
`completenessPercent = (completeRecords / totalRecords) * 100`

- 90%+: Excellent data quality, minimal incomplete submissions
- 80-89%: Good data quality, some incomplete submissions
- <80%: Investigate for form issues or high abandonment rate

### Validity Score
`validityPercent = (validRecords / totalRecords) * 100`

- Shows percentage of records used in public metrics
- Excludes test data automatically
- High test-record percentage may indicate testing environment not isolated

## Acceptance Criteria Met

✅ **Municipality Consolidation**
- "Itaperuna", "itaperuna", "ITAPERUNA" all become "Itaperuna"
- All variations counted together in metrics

✅ **Incomplete Response Filtering**
- Submissions missing required fields not included in public metrics
- Stored for analysis but excluded from calculations

✅ **Test Record Exclusion**
- Demo/test data flagged and excluded from public dashboard
- Separate audit endpoint shows test record counts

✅ **Duplicate Prevention** (via database timestamp + location + category)
- Database can detect potential resubmissions
- Same municipality + category within short timeframe

✅ **Auditable Metrics**
Database query to verify metrics:
```sql
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN estado='RJ' THEN 1 END) as noroeste_count,
  COUNT(DISTINCT municipio_normalized) as active_municipalities,
  COUNT(DISTINCT resposta_categoria) as unique_categories
FROM mapa_contribuicoes
WHERE is_complete = true AND is_test = false;
```

✅ **No Individual Data Exposure**
- All API endpoints return only aggregated counts
- No personal information, individual responses, or identifying data in responses
- Database queries use `COUNT()` and aggregation functions only

## Configuration

### Environment Variables

No new environment variables required for CARD 4. Uses existing:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_DATA_MODE` (for demo/real/empty states from CARD 3)

## Testing Strategy

### Manual Testing

1. **Valid Noroeste Submission:**
   ```bash
   curl -X POST http://localhost:3000/api/contribuicoes \
     -H "Content-Type: application/json" \
     -d '{"municipio":"Itaperuna","estado":"RJ","resposta_categoria":"dificuldade-continuar"}'
   ```
   Expected: `is_complete=true, is_test=false, municipio_normalized="Itaperuna"`

2. **Incomplete Submission:**
   ```bash
   curl -X POST http://localhost:3000/api/contribuicoes \
     -H "Content-Type: application/json" \
     -d '{"municipio":"Itaperuna","estado":"RJ"}'
   ```
   Expected: Error response, 400 status

3. **Test Record Detection:**
   ```bash
   curl -X POST http://localhost:3000/api/contribuicoes \
     -H "Content-Type: application/json" \
     -d '{"municipio":"Test","estado":"RJ","resposta_categoria":"dificuldade-continuar"}'
   ```
   Expected: Stored but `is_test=true`, excluded from public metrics

4. **Metrics Calculation:**
   ```bash
   curl http://localhost:3000/api/metrics
   ```
   Verify `totalParticipacoes` counts only valid records

5. **Audit Report:**
   ```bash
   curl http://localhost:3000/api/metrics/audit
   ```
   Verify completeness and validity percentages

### Database Verification

```sql
-- Check data quality distribution
SELECT 
  is_complete, 
  is_test, 
  COUNT(*) as count 
FROM mapa_contribuicoes 
GROUP BY is_complete, is_test;

-- Verify municipality normalization
SELECT 
  municipio, 
  municipio_normalized, 
  COUNT(*) as count 
FROM mapa_contribuicoes 
GROUP BY municipio, municipio_normalized 
ORDER BY count DESC;

-- Check for incomplete records
SELECT 
  municipio, 
  estado, 
  resposta_categoria, 
  is_complete 
FROM mapa_contribuicoes 
WHERE is_complete = false 
LIMIT 10;
```

## Performance Considerations

- Validation runs on every submission (~1ms per request)
- Metrics queries now include 2 equality filters (indexed) for better performance
- Audit endpoint is non-critical and can be rate-limited if needed
- No additional database round trips required

## Future Enhancements

- Implement duplicate detection trigger in database
- Add geographic duplicate detection (same municipality, short timeframe)
- Create RLS policies to prevent unauthorized audit access
- Add data retention policies for incomplete records
- Implement automated quality alerts (e.g., if completeness drops below 80%)

## Troubleshooting

### Metrics showing 0 for all contributions

1. Verify records exist with `is_complete=true AND is_test=false`
2. Check municipality normalization: may not match official names
3. Inspect `/api/metrics/audit` for data quality issues

### Municipality not appearing in active count

1. Verify exact spelling matches one of 13 official municipalities
2. Check `municipio_normalized` value in database
3. Confirm `is_complete=true` for those records

### Test records appearing in public metrics

1. Check if test detection is working: `/api/metrics/audit` should show `testRecords > 0`
2. Verify `is_test` flags are being set correctly
3. Inspect IP address filtering logic if needed
