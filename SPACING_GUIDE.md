# Guia de Espaçamento, Grids e Hierarquia - Mapa do Cuidado

## Visão Geral

Este guia estabelece um sistema consistente de espaçamento, grids e hierarquia visual para garantir que:
- A página não pareça uma sequência de cards independentes
- Conteúdos relacionados formam grupos visuais claros
- Nenhum texto extenso ocupa toda a largura da tela
- O ritmo visual é consistente em todas as plataformas

---

## Container e Largura Máxima

### max-w-7xl (80rem / 1280px) - Padrão
Usado para a maioria das seções principais do Mapa do Cuidado.

```tsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
  {/* Conteúdo */}
</section>
```

**Quando usar:**
- Seções de herói
- Grids de cards
- Conteúdo com múltiplas colunas

### max-w-3xl (48rem / 768px) - Textos Longos
Limite de largura para parágrafos, listas e conteúdos narrativos.

```tsx
<p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
  Seu parágrafo longo aqui...
</p>
```

**Quando usar:**
- Parágrafos explicativos
- Descrições de projetos
- Conteúdo narrativo
- Seções "Sobre"

### max-w-2xl (42rem / 672px) - Muito Estreito
Para seções que precisam de ainda mais foco.

```tsx
<div className="max-w-2xl">
  {/* Conteúdo muito focado */}
</div>
```

---

## Espaçamento Vertical (Section Spacing)

Implementar o "ritmo de respiração" entre seções.

### Desktop: 96–128px
```tsx
<section className="py-16 sm:py-20 lg:py-24">  {/* 64px → 80px → 96px */}
<section className="py-20 sm:py-24 lg:py-32">  {/* 80px → 96px → 128px */}
```

### Tablet: 72–96px
```tsx
<section className="py-12 sm:py-16">  {/* 48px → 64px */}
```

### Mobile: 56–72px
```tsx
<section className="py-8 sm:py-12">  {/* 32px → 48px */}
```

### Padrões Rápidos

```tsx
// Standard rhythm (recomendado para maioria)
<section className="py-8 sm:py-12 lg:py-16">

// Generous rhythm (seções de destaque)
<section className="py-12 sm:py-16 lg:py-20">

// Spacious rhythm (transições principais)
<section className="py-16 sm:py-20 lg:py-24">
```

---

## Sistemas de Grid

### Grid Responsivo de 3 Colunas
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* 1 col mobile → 2 cols tablet → 3 cols desktop */}
</div>
```

### Grid Responsivo de 2 Colunas
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
  {/* 1 col mobile → 2 cols desktop */}
</div>
```

### Grid Responsivo de 4 Colunas
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
  {/* 1 col mobile → 2 cols tablet → 4 cols desktop */}
</div>
```

### Gaps Padronizados
- **Compact**: `gap-4` (16px)
- **Base**: `gap-6` (24px)
- **Loose**: `gap-8` (32px)

---

## Cards e Componentes Conteiner

### Card Padrão
```tsx
<div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-lg font-bold text-gray-900 mb-3">Título</h3>
  <p className="text-gray-700 text-sm leading-relaxed">Conteúdo do card</p>
</div>
```

**Propriedades:**
- Borda: `border-gray-200` (sutil)
- Sombra: `shadow-sm` (mínima)
- Hover: `hover:shadow-md` (aumenta levemente)
- Padding: `p-6 sm:p-8` (24px → 32px)
- Radius: `rounded-lg` (10px)

### Card com Cor de Fundo
```tsx
<div className="bg-green-50 border border-green-200 rounded-lg p-6 sm:p-8">
  <h3 className="text-lg font-bold text-green-900 mb-3">Sucesso</h3>
  <p className="text-green-800 text-sm">Mensagem positiva</p>
</div>
```

### Reduzir Repetição de Caixas Azuis
❌ **Evitar:**
```tsx
{/* Múltiplos cards com border-blue, background-blue */}
<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">...</div>
<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">...</div>
<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">...</div>
```

✅ **Fazer:**
```tsx
{/* Agrupar informações relacionadas ou usar alternância */}
<section className="bg-blue-50 border border-blue-200 rounded-lg p-8 space-y-6">
  <div className="border-l-4 border-blue-600 pl-4">
    <p className="font-semibold text-blue-900">Informação 1</p>
  </div>
  <div className="border-l-4 border-blue-600 pl-4">
    <p className="font-semibold text-blue-900">Informação 2</p>
  </div>
</section>
```

---

## Tipografia e Hierarquia

### Títulos Próximos ao Conteúdo

✅ **Correto:**
```tsx
<div>
  <h2 className="text-3xl font-bold text-gray-900 mb-4">Título</h2>  {/* 16px gap */}
  <p className="text-gray-700">Conteúdo comienza aqui...</p>
</div>
```

❌ **Evitar:**
```tsx
<div>
  <h2 className="text-3xl font-bold text-gray-900 mb-12">Título</h2>  {/* Longe demais */}
  <p className="text-gray-700">Conteúdo muito afastado...</p>
</div>
```

### Limitar Largura de Parágrafos
```tsx
<p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
  Parágrafo com largura limitada para legibilidade ideal.
  Comprimento de linha ideal é 50-75 caracteres por linha.
</p>
```

### Subtítulos
```tsx
<div>
  <h1 className="text-5xl font-bold text-gray-900 mb-2">Título</h1>
  <p className="text-xl text-gray-600 max-w-3xl">Subtítulo ou descrição breve</p>
</div>
```

---

## Alternância de Fundos (Subtle)

```tsx
{/* Seção 1: Branco */}
<section className="bg-white py-16 sm:py-20 lg:py-24">
  {/* Conteúdo */}
</section>

{/* Seção 2: Cinza muito claro */}
<section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
  {/* Conteúdo */}
</section>

{/* Seção 3: Branco novamente */}
<section className="bg-white py-16 sm:py-20 lg:py-24">
  {/* Conteúdo */}
</section>
```

Cores permitidas:
- `bg-white` - Padrão
- `bg-gray-50` - Alternância leve
- `bg-gray-100` - Raro (muito escuro)
- `bg-[color]-50` - Cor de estado (blue, green, yellow)

---

## Agrupamento Visual

### Conteúdos Relacionados
```tsx
<section className="space-y-12">  {/* 48px entre grupos */}
  {/* Grupo 1 */}
  <div className="space-y-3">  {/* 12px entre itens */}
    <h3 className="text-xl font-bold">Ponto 1</h3>
    <p className="text-gray-700">Descrição</p>
  </div>

  {/* Grupo 2 - Separado pelo espaçamento */}
  <div className="space-y-3">
    <h3 className="text-xl font-bold">Ponto 2</h3>
    <p className="text-gray-700">Descrição</p>
  </div>
</section>
```

---

## Evitar Seções Excessivamente Compactas

❌ **Muito compacto:**
```tsx
<div className="space-y-1">
  <h3 className="text-lg font-bold">Título</h3>
  <p className="text-sm">Descrição curta</p>
</div>
```

✅ **Respiração adequada:**
```tsx
<div className="space-y-4">
  <h3 className="text-lg font-bold text-gray-900 mb-2">Título</h3>
  <p className="text-gray-700 leading-relaxed">Descrição com espaço</p>
</div>
```

---

## Checklist de Implementação

- [ ] Todas as seções usam `max-w-7xl`
- [ ] Textos longos limitados a `max-w-3xl`
- [ ] Espaçamento vertical segue padrão responsivo (py-8 sm:py-12 lg:py-16, etc)
- [ ] Cards usam `shadow-sm` e `hover:shadow-md`
- [ ] Títulos estão pertos de seu conteúdo (mb-3 ou mb-4)
- [ ] Grids usam gap-6 ou gap-8
- [ ] Não há repetição excessiva de cards azuis
- [ ] Backgrounds alternam sutilmente (white/gray-50)
- [ ] Nenhum parágrafo ocupa 100% da largura
- [ ] Seções não parecem independentes (agrupadas visualmente)

---

## Referência de Código

Importar constantes de `lib/spacing.ts`:

```tsx
import { containers, sectionSpacing, elementSpacing, cardStyles, grids } from "@/lib/spacing";
```

Usar em componentes:

```tsx
export default function MyComponent() {
  return (
    <section className={`${sectionSpacing.spacious} ${elementSpacing.padding.spacious}`}>
      <div className={`${containers.maxWidth} mx-auto`}>
        <div className={`${grids.responsive["3col"]}`}>
          {/* Conteúdo */}
        </div>
      </div>
    </section>
  );
}
```

---

**Última atualização:** Agosto 2026
**Guia visual:** `/guia-espacamento`
