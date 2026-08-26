# Estados de Dados - Mapa do Cuidado

## Visão Geral

A aplicação pode ser configurada para exibir três estados distintos de dados:
1. **Real** — Dados recebidos de participações reais
2. **Demonstração** — Dados fictícios para demonstrar funcionamento
3. **Vazio** — Convite para primeira participação

## Configuração

Use a variável de ambiente `NEXT_PUBLIC_DATA_MODE`:

```bash
# Produção - dados reais (padrão)
NEXT_PUBLIC_DATA_MODE=real

# Demonstração - dados fictícios
NEXT_PUBLIC_DATA_MODE=demo

# Vazio - convida primeira participação
NEXT_PUBLIC_DATA_MODE=empty
```

### Onde Configurar

**Local (.env.local):**
```
NEXT_PUBLIC_DATA_MODE=demo
```

**Vercel:**
- Settings → Environment Variables
- Add `NEXT_PUBLIC_DATA_MODE`
- Set value for each environment (Production, Preview, Development)

## Estado 1: Real (Padrão)

Exibe dados agregados do Supabase em tempo real.

**Indicadores:**
- 🔄 Ícone de sincronização
- "Escuta participativa — atualizado a cada 30 segundos"
- Sem marca d'água
- Sem banner de demonstração

**Dados Mostrados:**
- Total de contribuições (todas as regiões)
- Participações Noroeste
- Municípios ativos (com ≥1 resposta)
- Temas identificados (categorias com respostas)
- Última atualização (timestamp real)

**Exemplo:**
```
Contribuições: 287
Municípios: 11 de 13
Temas: 6
```

## Estado 2: Demonstração

Exibe dados fictícios com avisos claros sobre não serem reais.

**Avisos Visuais:**
1. **Banner Superior** (laranja/âmbar)
   - 🎭 Ícone de máscara
   - "Visualização demonstrativa"
   - "Os dados apresentados nesta tela são fictícios e servem exclusivamente para demonstrar o funcionamento do mapa."

2. **Marca d'água** (fundo)
   - "DEMONSTRAÇÃO"
   - "DADOS FICTÍCIOS"
   - Opacidade 5% (não interfere com leitura)

3. **Indicador** (em lugar de "ao vivo")
   - 🎭 "Visualização demonstrativa"

**Regras Críticas:**
- ❌ NÃO usar "ao vivo", "tempo real", "histórias já mapearam"
- ❌ NÃO esconder avisos de demonstração
- ✅ SIM deixar claro que dados são fictícios
- ✅ SIM manter mesma UX do modo real para demonstrar funcionamento

**Dados Demo (Fixos):**
- 287 contribuições
- 287 Noroeste
- 11 municípios ativos
- 6 temas
- Timestamp de 5 minutos atrás

**Ranking Demo:**
```
Itaperuna: 52
Itaocara: 48
Santo Antônio de Pádua: 45
Porciúncula: 38
Cambuci: 35
... (mais 6 municípios)
```

**Categorias Demo:**
```
Dificuldade continuar: 65
Falta orientação: 58
Espera encaminhamento: 48
Interrupção acompanhamento: 42
Mais apoio: 41
Outra percepção: 33
```

## Estado 3: Vazio

Aparece quando nenhuma participação foi recebida ainda.

**Componente: EmptyMapState**

**Conteúdo:**
```
🗺️

O mapa começa com você

As primeiras respostas aparecerão aqui de forma 
agregada, preservando a identidade dos participantes.

[Cartão 1] 🔒 Anônimo - Sua privacidade é respeitada
[Cartão 2] 📊 Agregado - Apenas dados coletivos aparecem

[Botão CTA] Compartilhar minha experiência
```

**Regras:**
- ✅ Convida à participação
- ✅ Explica preservação de privacidade
- ✅ Mostra como dados serão agregados
- ❌ NÃO parece erro ou falha
- ❌ NÃO assusta ou desestimula

## Componentes Afetados

### ProofOfMovement (Prova de Movimento)
- Mostra estado real com métricas
- Mostra estado demo com avisos
- Mostra estado vazio com EmptyMapState

### DemoBanner
- Aparece no topo da página em modo demo
- Fixo, sempre visível
- Laranja para chamar atenção
- Desaparece em modo real/vazio

### DemoWatermark
- Marca d'água diagonal
- Aparece em fundo opaco
- Apenas em modo demo
- Não interfere com interação

### DashboardPreview (quando implementado)
- Deve mostrar dados demo no modo de demonstração
- Deve mostrar estado vazio quando apropriado
- Deve respeitar configuração NEXT_PUBLIC_DATA_MODE

## Fluxo de Dados

```
NEXT_PUBLIC_DATA_MODE env var
           ↓
getDataMode() function (lib/config.ts)
           ↓
usePublicMapMetrics hook
           ├─→ demo: retorna DEMO_METRICS (fixos)
           ├─→ empty: retorna null (mostra EmptyMapState)
           └─→ real: busca /api/metrics (dados live)
           ↓
Componentes (ProofOfMovement, etc)
           ↓
UI com avisos/indicadores apropriados
```

## Exemplo de Uso

### Verificar Modo Atual

```typescript
import { getDataMode } from "@/lib/config";

const mode = getDataMode(); // "real" | "demo" | "empty"

if (mode === "demo") {
  // Mostrar avisos demo
}
```

### Usar Dados Demo em Componente

```typescript
import { usePublicMapMetrics } from "@/lib/hooks/usePublicMapMetrics";

export function MyComponent() {
  const { metrics, loading } = usePublicMapMetrics();

  // Mesmo componente funciona em todos os modos!
  // - Real mode: metrics vem do Supabase
  // - Demo mode: metrics = DEMO_METRICS
  // - Empty mode: metrics = null
}
```

## Aceitação

Antes de marcar como pronto:

✅ **Real Mode:**
- [ ] Números vêm do Supabase
- [ ] Atualiza a cada 30 segundos
- [ ] Sem banners ou marcas d'água
- [ ] Diz "Escuta participativa"

✅ **Demo Mode:**
- [ ] Banner laranja no topo
- [ ] Números fixos (287, 11, 6)
- [ ] Marca d'água "DEMONSTRAÇÃO"
- [ ] NÃO diz "ao vivo"
- [ ] NÃO mistura dados reais

✅ **Empty Mode:**
- [ ] Mostra componente EmptyMapState
- [ ] Convida à primeira participação
- [ ] Não parece erro

✅ **Configuração:**
- [ ] NEXT_PUBLIC_DATA_MODE=real (padrão)
- [ ] NEXT_PUBLIC_DATA_MODE=demo (avisos totais)
- [ ] NEXT_PUBLIC_DATA_MODE=empty (estado vazio)

✅ **Segurança:**
- [ ] Nenhum dado fictício como real em produção
- [ ] Demo mode requer configuração explícita
- [ ] Avisos claros e visíveis

## Referências

- [lib/config.ts](./lib/config.ts) — Configuração e dados demo
- [lib/hooks/usePublicMapMetrics.ts](./lib/hooks/usePublicMapMetrics.ts) — Hook que respeita modos
- [components/DemoBanner.tsx](./components/DemoBanner.tsx) — Banner de aviso
- [components/DemoWatermark.tsx](./components/DemoWatermark.tsx) — Marca d'água
- [components/EmptyMapState.tsx](./components/EmptyMapState.tsx) — Estado vazio
- [components/ProofOfMovement.tsx](./components/ProofOfMovement.tsx) — Usa todos os três estados
