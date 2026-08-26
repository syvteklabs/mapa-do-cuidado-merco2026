# Configuração Supabase - Mapa do Cuidado

## Variáveis Necessárias

```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
```

### Obter as Credenciais

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione o projeto do Mapa do Cuidado
3. Vá para **Settings** → **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Configuração por Ambiente

### 1. Development (.env.local)

Arquivo local que **NÃO deve ser versionado**:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
```

Para rodar localmente:
```bash
cp .env.example .env.local
# Editar com suas credenciais
npm run dev
```

### 2. Preview (Vercel - Preview Deployments)

Configurar em **Vercel Project Settings**:

1. Acesse [Vercel Dashboard](https://vercel.com)
2. Selecione projeto: `mapa-do-cuidado-merco2026`
3. Vá para **Settings** → **Environment Variables**
4. Adicione com scope **Preview**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Nota:** Preview usa dados de staging/development do Supabase

### 3. Production (Vercel - Main Branch)

Configurar em **Vercel Project Settings**:

1. Acesse [Vercel Dashboard](https://vercel.com)
2. Selecione projeto: `mapa-do-cuidado-merco2026`
3. Vá para **Settings** → **Environment Variables**
4. Adicione com scope **Production**:
   - `NEXT_PUBLIC_SUPABASE_URL` (production project)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (production key)

**Importante:** Use chaves de produção para o banco de dados de produção

---

## Verificação de Configuração

### Teste Local

```bash
# Rodar em modo debug
NEXT_PUBLIC_SUPABASE_URL=https://test.supabase.co \
NEXT_PUBLIC_SUPABASE_ANON_KEY=test-key \
npm run dev
```

### Verificar no Vercel

```bash
# Ver variáveis configuradas (sem expor valores)
vercel env list

# Inspecionar logs de deployment
vercel logs --follow
```

---

## Tabelas Necessárias no Supabase

### Tabela: `mapa_contribuicoes`

| Campo | Tipo | Nullable | Descrição |
|-------|------|----------|-----------|
| id | uuid | false | Primary key (auto-generated) |
| created_at | timestamptz | false | Timestamp de criação (auto) |
| municipio | text | false | Nome do município |
| estado | text | false | Sigla do estado (2 chars) |
| resposta_categoria | text | false | ID da categoria de experiência |
| origem | text | false | Origem da contribuição (ex: "merco-2026") |

**Row Level Security (RLS):**
- ✅ Enable RLS
- ✅ Policy: `allow insert (any)` - Qualquer um pode inserir
- ✅ Policy: `allow select (aggregated)` - Apenas leitura agregada

**Índices:**
```sql
CREATE INDEX idx_municipio ON mapa_contribuicoes(municipio);
CREATE INDEX idx_estado ON mapa_contribuicoes(estado);
CREATE INDEX idx_categoria ON mapa_contribuicoes(resposta_categoria);
CREATE INDEX idx_created ON mapa_contribuicoes(created_at);
```

### Tabela: `mapa_expansao`

| Campo | Tipo | Nullable | Descrição |
|-------|------|----------|-----------|
| id | uuid | false | Primary key (auto-generated) |
| created_at | timestamptz | false | Timestamp de criação (auto) |
| nome | text | true | Nome do contato (opcional) |
| cidade | text | false | Cidade de interesse |
| estado | text | false | Estado (sigla) |
| contato_whatsapp | text | true | WhatsApp para contato |
| contato_email | text | true | Email para contato |
| tipo_participante | text | true | Tipo (gestor, profissional, etc) |
| consentimento_contato | boolean | false | Consentimento para contato |
| origem | text | false | Origem (ex: "mapa-cuidado-expansao") |

**Row Level Security (RLS):**
- ✅ Enable RLS
- ✅ Policy: `allow insert (any)` - Qualquer um pode registrar interesse
- ✅ Policy: `allow select (aggregated)` - Apenas contagem agregada

---

## Políticas RLS - SQL

### Contribuições

```sql
-- Policy: Allow INSERT for anonymous users
CREATE POLICY "allow_anon_insert"
ON mapa_contribuicoes FOR INSERT
WITH CHECK (true);

-- Policy: Allow SELECT only aggregated data (no personal data)
CREATE POLICY "allow_aggregated_select"
ON mapa_contribuicoes FOR SELECT
USING (current_user = 'anon');
```

### Expansão

```sql
-- Policy: Allow INSERT for anyone
CREATE POLICY "allow_anon_insert"
ON mapa_expansao FOR INSERT
WITH CHECK (true);

-- Policy: Allow SELECT only aggregated data
CREATE POLICY "allow_aggregated_select"
ON mapa_expansao FOR SELECT
USING (true);
```

---

## Checklist de Configuração

- [ ] Variáveis configuradas em Development (.env.local)
- [ ] Variáveis configuradas em Vercel Preview
- [ ] Variáveis configuradas em Vercel Production
- [ ] Tabelas criadas no Supabase
- [ ] Índices criados para performance
- [ ] RLS habilitado em ambas as tabelas
- [ ] Políticas RLS configuradas
- [ ] Teste de inserção funcionando
- [ ] Teste de leitura agregada funcionando
- [ ] Sem chaves sensíveis no código (apenas env vars)

---

## Troubleshooting

### Erro: "Credentials not configured"

**Solução:** Verificar se env vars estão definidas:
```bash
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Erro: "Policy violation"

**Solução:** Verificar RLS policies no Supabase:
1. Vai para **Table → mapa_contribuicoes → RLS Policies**
2. Confirme que policies estão habilitadas
3. Teste inserção com Supabase SQL editor

### Erro: "Timeout loading data"

**Solução:** Verificar performance:
1. Confirme que índices foram criados
2. Teste query no SQL editor do Supabase
3. Verificar quantidade de registros (pode precisar de paginação)

### Production funcionando, Preview não

**Solução:** Variáveis de Preview não configuradas em Vercel
1. Voltar para **Vercel → Settings → Environment Variables**
2. Confirmar que Preview vars existem
3. Verificar scope (deve incluir Preview)

---

## Referências

- [Supabase Documentation](https://supabase.com/docs)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
