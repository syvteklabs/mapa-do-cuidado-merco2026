# Mapa do Cuidado

MVP de escuta participativa para a Merco Noroeste 2026 - SyVtek Care.

Uma plataforma para coletar experiências sobre os caminhos do cuidado de forma anônima e voluntária.

## Stack

- **Framework**: Next.js 16+ (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deploy**: Vercel

## Instalação

```bash
npm install
```

## Configuração de Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Adicione suas credenciais do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Lint

Verifique erros de código:

```bash
npm run lint
```

## Build

Crie uma build de produção:

```bash
npm run build
```

## Rotas

- `/` - Página inicial
- `/participar` - Formulário de participação
- `/mapa` - Mapa e painel
- `/expansao` - Lista de expansão

## Documentação

### Desenvolvimento
- `CLAUDE.md` - Regras e padrões de desenvolvimento
- `TESTING.md` - Checklist completo de testes (15 categorias)

### Deployment
- `DEPLOYMENT.md` - Guia de deploy para Vercel e outros serviços
- `ENV_SETUP.md` - Configuração de variáveis de ambiente
- `OPERATION.md` - Guia rápido para operadores durante evento

### Estrutura
- `app/` - Rotas e páginas Next.js
- `components/` - Componentes React reutilizáveis
- `lib/` - Utilitários e hooks customizados
- `supabase/` - Migrações de banco de dados
- `public/` - Arquivos estáticos

## Verificações de Qualidade

```bash
# Lint (eslint)
npm run lint

# TypeScript
npm run build

# Desenvolvimento
npm run dev
```

Todas as verificações devem passar antes de deploy em produção.

---

© 2026 SyVtek Care. Todos os direitos reservados.
