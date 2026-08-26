# Métricas Unificadas do Mapa do Cuidado

## Visão Geral

Este documento descreve a estrutura de métricas unificada que garante consistência de dados em toda a plataforma.

## Problema Resolvido

Anteriormente, diferentes partes da aplicação exibiam números incompatíveis:
- Total geral: 201, 210, 240+, 247 participações
- Rankings descasados com totais
- Escopo das participações confuso (Noroeste vs. todas as regiões)

## Solução: PublicMapMetrics

Agora existe uma **única fonte de verdade** para todos os indicadores:

```typescript
interface PublicMapMetrics {
  totalParticipacoes: number;           // Total de todas as participações
  participacoesNoroeste: number;         // Total de participações na região Noroeste
  municipiosAtivos: number;              // Municípios da Noroeste com ≥1 resposta
  totalMunicipios: 13;                   // Total de municípios no Noroeste
  temasIdentificados: number;            // Quantidade de categorias com respostas
  ultimaAtualizacao: string;             // ISO timestamp da última contribuição
  tipoDados: "real" | "demonstracao" | "indisponivel";
}
```

## Arquitetura

### 1. Servidor (Backend)

**Arquivo:** `lib/supabase-service.ts`

Método: `getPublicMapMetrics()`

- Busca todas as contribuições do Supabase
- Calcula métricas em tempo real
- Diferencia participações Noroeste de outras regiões
- Conta categorias únicas com respostas
- Registra timestamp da última atualização

### 2. API Route

**Arquivo:** `app/api/metrics/route.ts`

- Endpoint: `GET /api/metrics`
- Timeout: 15 segundos
- Retorna `PublicMapMetrics` como JSON
- Status 503 em caso de indisponibilidade

### 3. Hook de Cliente

**Arquivo:** `lib/hooks/usePublicMapMetrics.ts`

- Fetch automático com 8s timeout
- Retry lógico: máx 2 tentativas com backoff exponencial
- Polling a cada 30 segundos
- Mensagens amigáveis ao usuário (sem detalhes técnicos)

## Constantes Compartilhadas

**Arquivo:** `lib/constants.ts`

Define globalmente:
- `MUNICIPIOS_NOROESTE` - lista dos 13 municípios
- `TOTAL_MUNICIPIOS_NOROESTE` - constante 13
- `isFromNoroeste()` - função helper
- `CATEGORIAS` - array de categorias válidas

## Componentes que Usam as Métricas

### ProofOfMovement

**Arquivo:** `components/ProofOfMovement.tsx`

Exibe:
- Total de contribuições
- Municípios ativos (Noroeste)
- Temas identificados
- Insight dinâmico baseado no total

Usa: `usePublicMapMetrics()`

### Componentes Futuros

Os seguintes componentes devem ser atualizados para usar `usePublicMapMetrics`:

1. **HeroMap** - contador "Em tempo real"
2. **DashboardPreview** - cards de indicadores
3. **MunicipalitiesRanking** - soma deve igualar `participacoesNoroeste`
4. **Footer** - estatísticas gerais
5. **ScopeSection** - explicação Noroeste vs. outras regiões
6. **Home Hero** - contador principal

## Regras de Consistência

### ✅ DEVE ser respeitado

1. Todos os indicadores visíveis na UI vêm de `PublicMapMetrics`
2. Nenhum número é hardcoded em componentes
3. A soma do ranking municipal = `participacoesNoroeste`
4. Escopo distingue claramente Noroeste de fora da região
5. Números atualizam sem novo deploy (via API)

### ❌ NÃO é permitido

- Números diferentes em places diferentes
- Rankings que somam diferente do total
- Categorias fixas em vez de calculadas
- Municípios fora do Noroeste no ranking
- Mensagens ambíguas sobre escopo regional

## Fluxo de Dados

```
Supabase mapa_contribuicoes
           ↓
supabaseService.getPublicMapMetrics()
           ↓
/api/metrics (GET)
           ↓
usePublicMapMetrics (React Hook)
           ↓
Componentes (ProofOfMovement, etc.)
           ↓
UI exibe métricas unificadas
```

## Exemplo de Uso em Componente

```typescript
import { usePublicMapMetrics } from "@/lib/hooks/usePublicMapMetrics";

export function MyComponent() {
  const { metrics, loading, error, retryFetch } = usePublicMapMetrics();

  if (loading) return <div>Carregando...</div>;
  if (error || !metrics) return <div>Erro ao carregar dados</div>;

  return (
    <div>
      <p>Total: {metrics.totalParticipacoes}</p>
      <p>Noroeste: {metrics.participacoesNoroeste}</p>
      <p>Municípios: {metrics.municipiosAtivos}/{metrics.totalMunicipios}</p>
      <p>Temas: {metrics.temasIdentificados}</p>
    </div>
  );
}
```

## Testes de Consistência

Antes de marcar como pronto:

1. ✅ Mesmo total aparece em todas as áreas
2. ✅ Soma do ranking = total Noroeste
3. ✅ Escopo mostra corretamente Noroeste vs. outras regiões
4. ✅ Números atualizam a cada 30 segundos sem novo deploy
5. ✅ Erros de API não quebram a UI (mensagens amigáveis)

## Troubleshooting

### Números não atualizam

- Verificar se `/api/metrics` está respondendo: `curl https://<app>/api/metrics`
- Verificar logs do Supabase para erros de conexão
- Verificar se as tabelas têm dados

### Números inconsistentes

- Limpar cache do navegador (Ctrl+Shift+R)
- Verificar se `MUNICIPIOS_NOROESTE` em `lib/constants.ts` está completo
- Verificar se banco tem registros com `estado='RJ'` e municípios válidos

### Categorias contando errado

- Verificar se `resposta_categoria` no banco tem valores válidos
- Confirmar que nenhum registro tem valor nulo/vazio

## Referências

- [API Route Handler](./app/api/metrics/route.ts)
- [Supabase Service](./lib/supabase-service.ts)
- [Hook de Métricas](./lib/hooks/usePublicMapMetrics.ts)
- [Constantes](./lib/constants.ts)
- [ProofOfMovement Component](./components/ProofOfMovement.tsx)
