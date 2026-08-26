# Mapa do Cuidado - MVP Merco Noroeste 2026

## Regras de Desenvolvimento

- Trabalhar um card por vez
- Não remover funcionalidades concluídas
- Não trocar a stack (Next.js + TypeScript + Tailwind + Supabase)
- Priorizar mobile-first
- Preservar privacidade dos participantes
- Não coletar dados clínicos identificáveis
- Não expor credenciais no código
- Executar build ao final de cada card
- Manter textos em português do Brasil
- Não fazer merge na `main` sem autorização
- Não fazer deploy sem autorização
- Não reduzir gráficos ou detalhes visuais aprovados
- Registrar claramente dados de demonstração

## Stack

- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deploy**: Vercel-ready

## Rotas

- `/` - Página inicial
- `/participar` - Formulário de participação
- `/mapa` - Mapa e painel
- `/expansao` - Lista de expansão

## Estrutura

```
app/                 # Rotas Next.js
components/          # Componentes React
lib/                 # Utilitários
types/               # Tipos TypeScript
supabase/            # Configuração Supabase
  migrations/        # Scripts de migração
public/              # Arquivos estáticos
```

## Identidade Visual

- Visual claro, sem dark mode neste MVP
- Mobile-first, otimizado para tablets e TV
- Contraste acessível
- Componentes com cantos suaves (rounded-lg)
- Uso equilibrado de branco
- Hierarquia tipográfica forte
- Aparência institucional e humana
- Sem estética hospitalar fria
- Sem aparência genérica de dashboard
- Sem excesso de gradientes
- Sem imagens artificiais

## Próximos Cards

- Card 2: Formulário de participação e banco de dados
- Card 3: Mapa interativo
- Card 4: Painel com análises
- Card 5: Lista de expansão
- Card 6: Testes, otimizações e deploy
