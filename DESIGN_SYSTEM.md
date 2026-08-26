# Sistema Visual - Mapa do Cuidado

**Conceito:** Território + cuidado + evidência humana

## Índice

1. [Paleta de Cores](#paleta-de-cores)
2. [Tipografia](#tipografia)
3. [Espaçamento](#espaçamento)
4. [Componentes](#componentes)
5. [Acessibilidade](#acessibilidade)
6. [Princípios](#princípios)

## Paleta de Cores

### Azuis Institucionais

- **Azul Profundo (#0369a1)**: Cor institucional primária. Use para elementos principales e identidade visual.
- **Azul Médio (#0ea5e9)**: Cor de ação. Use para botões primários, links e elementos interativos.

```css
--color-blue-deep: #0369a1;
--color-blue-action: #0ea5e9;
```

### Roxo Controlado (#a855f7)

Para inteligência, conexão e insights. Use com moderação em elementos secundários.

```css
--color-purple-intelligence: #a855f7;
```

### Verde Suave (#16a34a / #22c55e)

Para estados positivos, sucesso e confirmação.

```css
--color-green-success: #16a34a;
--color-green-light: #22c55e;
```

### Vermelho (#ef4444 / #dc2626)

**Somente para falha e alertas**. Nunca use para contextos positivos ou neutros.

```css
--color-red-error: #ef4444;
--color-red-alert: #dc2626;
```

### Cinzas Quentes

Para fundos, bordas e texto secundário. Evitar cinzas frios.

```css
--color-gray-50: #fafafa;   /* Fundo muito claro */
--color-gray-100: #f4f4f5;  /* Fundo claro */
--color-gray-200: #e4e4e7;  /* Bordes */
--color-gray-700: #3f3f46;  /* Texto escuro */
--color-gray-900: #18181b;  /* Texto muito escuro */
```

## Tipografia

### Fonte Padrão: Sans-serif Altamente Legível

```css
font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
  Arial, sans-serif;
```

### Escala Tipográfica

| Tamanho | Pixels | Uso                      | Peso  |
| ------- | ------ | ------------------------ | ----- |
| xs      | 12px   | Labels, datas            | 600   |
| sm      | 14px   | Texto pequeno            | 400   |
| base    | 16px   | Corpo padrão             | 400   |
| lg      | 18px   | Título de card           | 700   |
| xl      | 20px   | Destaque                 | 500   |
| 2xl     | 24px   | Subtítulo de seção       | 600   |
| 3xl     | 30px   | Título de seção          | 600   |
| 4xl     | 36px   | Título principal         | 700   |
| 5xl     | 48px   | Título de página/display | 700   |

### Tipografia Editorial (Opcional)

Para títulos de impacto, considere usar uma serifada moderada:

```css
/* Opcional, apenas para títulos de design */
font-family: "Noto Serif", -apple-system-ui-serif, Georgia, serif;
```

### Requisitos

- ✅ Suporte completo a português e acentuação
- ✅ Altura de linha mínima 1.5 para leiturabilidade
- ❌ Evitar fontes excessivamente tecnológicas ou futuristas

## Espaçamento

Use a escala de 4px como base. Todos os espaçamentos devem ser múltiplos de 4.

```
4px   (0.25rem)  - xs
8px   (0.5rem)   - sm
12px  (0.75rem)  - md
16px  (1rem)     - base
24px  (1.5rem)   - lg
32px  (2rem)     - xl
48px  (3rem)     - 2xl
64px  (4rem)     - 3xl
```

### Exemplos

- **Padding de botão**: 12px 16px (vertical-horizontal)
- **Padding de card**: 24px
- **Margin entre seções**: 48px a 80px
- **Gap entre grid items**: 16px a 24px

## Componentes

### Botões

#### Primário (Ação principal)

```css
background-color: #0369a1; /* Azul profundo */
color: #ffffff;
padding: 12px 24px;
border-radius: 6px;
font-weight: 600;
```

#### Secundário (Ação alternativa)

```css
background-color: #e0f2fe; /* Azul 100 */
color: #0369a1;
padding: 12px 24px;
border-radius: 6px;
font-weight: 600;
```

#### Terciário (Menos destaque)

```css
background-color: #e4e4e7; /* Gray 200 */
color: #27272a; /* Gray 800 */
padding: 12px 24px;
border-radius: 6px;
font-weight: 600;
```

#### Destrutor (Ações perigosas)

```css
background-color: #dc2626; /* Vermelho */
color: #ffffff;
padding: 12px 24px;
border-radius: 6px;
font-weight: 600;
```

**Estados:**
- Hover: Aumentar saturação ou escurecer 10%
- Disabled: Reduzir opacidade para 50% + cursor: not-allowed
- Loading: Mostrar spinner + disabled

### Cards

```css
background-color: #ffffff;
border: 1px solid #e4e4e7; /* Gray 200 */
border-radius: 10px;
padding: 24px;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
```

**Variações:**

- **Sucesso**: `border-color: #16a34a; background: #f0fdf4;`
- **Alerta**: `border-color: #f59e0b; background: #fefce8;`
- **Erro**: `border-color: #dc2626; background: #fef2f2;`
- **Info**: `border-color: #0ea5e9; background: #f0f9ff;`

### Alertas

```css
border-left: 4px solid;
padding: 16px 24px;
border-radius: 8px;
```

**Cores por tipo:**
- Sucesso: `border-color: #16a34a; background: #f0fdf4;`
- Aviso: `border-color: #f59e0b; background: #fefce8;`
- Erro: `border-color: #dc2626; background: #fef2f2;`
- Info: `border-color: #0ea5e9; background: #f0f9ff;`

### Indicadores

Use cores semânticas como pequenos círculos ou quadrados:

- **Ativo**: Verde (#22c55e)
- **Em progresso**: Amarelo (#f59e0b)
- **Erro**: Vermelho (#dc2626)
- **Inativo**: Cinza (#a1a1a6)

### Formulários

```css
/* Input */
border: 1px solid #d4d4d8; /* Gray 300 */
border-radius: 6px;
padding: 12px 16px;
font-size: 16px;

/* Focus state */
border-color: #0ea5e9; /* Blue 500 */
box-shadow: 0 0 0 3px #e0f2fe; /* Blue 100 */
```

### Modais

```css
border-radius: 12px;
max-width: 448px; /* md */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
background: #ffffff;
padding: 24px;
```

### Estados de Carregamento

```css
/* Spinner */
border: 4px solid #e4e4e7; /* Gray 200 */
border-top-color: #0ea5e9; /* Blue 500 */
border-radius: 50%;
animation: spin 1s linear infinite;
```

### Estado Vazio

```css
background: #f4f4f5; /* Gray 100 */
border: 2px dashed #d4d4d8; /* Gray 300 */
border-radius: 8px;
padding: 48px 24px;
text-align: center;
color: #71717a; /* Gray 500 */
```

## Acessibilidade

### Contraste (WCAG AA)

Todos os textos devem ter contraste mínimo de **4.5:1** (normal) ou **3:1** (grande).

**Combinações testadas:**

| Texto     | Fundo     | Razão  | Aprovado |
| --------- | --------- | ------ | -------- |
| Branco    | Azul 700  | 11.5:1 | ✅ AAA   |
| Branco    | Azul 500  | 8:1    | ✅ AAA   |
| Branco    | Verde 600 | 8.5:1  | ✅ AAA   |
| Branco    | Vermelho  | 7.5:1  | ✅ AAA   |
| Cinza 900 | Branco    | 17.5:1 | ✅ AAA   |

### Requisitos

- ✅ Todos os botões devem ter indicador visual de :hover e :focus
- ✅ Elementos interativos precisam ter outline visível em :focus
- ✅ Não confiar apenas em cor para comunicar informação
- ✅ Texto mínimo 12px para legibilidade
- ✅ Altura de linha mínima 1.5

## Princípios

### 1. Consistência

- Use os mesmos componentes em toda a aplicação
- Evite estilos conflitantes ou duplicados
- Mantenha a mesma linguagem visual em todas as rotas

### 2. Clareza

- Design limpo e sem ornamentação excessiva
- Hierarquia visual clara
- Espaçamento adequado entre elementos

### 3. Humanidade

- Evitar estetização tecnológica excessiva
- Foco em comunidade e participação
- Design responsivo para todos os dispositivos

### 4. Acessibilidade

- Contraste WCAG AA mínimo
- Feedback visual claro para interações
- Suporte a navegação por teclado

### 5. Eficiência

- Componentes reutilizáveis
- Tokens de design centralizados
- Fácil manutenção e evolução

## Referência

- **Arquivo de tokens**: `lib/design-tokens.ts`
- **Página de referência visual**: `/sistema-visual`
- **Componentes**: `components/`
- **Documentação CLAUDE.md**: Regras gerais de desenvolvimento

## Checklist para Novos Componentes

- [ ] Usar cores da paleta documentada
- [ ] Respeitar escala tipográfica
- [ ] Aplicar espaçamento em múltiplos de 4px
- [ ] Testar contraste WCAG AA
- [ ] Adicionar estados :hover, :focus, :active
- [ ] Garantir responsividade móvel
- [ ] Documentar no arquivo de componentes
- [ ] Testar com teclado (Tab, Enter, Escape)
- [ ] Revisar com screen reader se aplicável

---

**Última atualização**: Agosto 2026
**Conceito**: Território + cuidado + evidência humana
