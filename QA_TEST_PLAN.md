# QA Test Plan - Card 30: Responsivo e Funcional

## Versão: MVP Merco Noroeste 2026
**Data**: 2026-08-26  
**Framework**: Next.js 16.3.3 + TypeScript + Tailwind CSS  
**Deploy Target**: Vercel

---

## 1. TESTES RESPONSIVOS (Viewports)

### Desktop (1440px)
- [ ] Header não sobrepõe conteúdo
- [ ] Navegação horizontal completa visível
- [ ] Logo e título visíveis lado a lado
- [ ] Mapa ocupa espaço apropriado
- [ ] Tabelas com scroll horizontal (overflow-x-auto)
- [ ] Grid de 3 colunas em cards grandes
- [ ] Botões com espaçamento adequado
- [ ] Sem quebras de layout em 1440px

### Notebook (1366px)
- [ ] Resize gracioso a partir de 1440px
- [ ] Menu responsivo funciona
- [ ] Tabelas mantêm legibilidade
- [ ] Grid de 2-3 colunas
- [ ] Mapa mantém interatividade
- [ ] Nenhum overflow horizontal

### Tablet Horizontal (iPad 1024px)
- [ ] Layout horizontal completo
- [ ] Touch targets ≥ 44×44 px
- [ ] Mapa explorado por toque
- [ ] Botões sem sobreposição
- [ ] Formulário utilizável
- [ ] Teclado virtual não sobrepõe campos
- [ ] Grid ajusta para 2 colunas

### Tablet Vertical (iPad 768px)
- [ ] Layout vertical adaptado
- [ ] Navegação em menu hambúrguer (se aplicável)
- [ ] Touch targets 44×44 px
- [ ] Formulário com padding para teclado virtual
- [ ] Grid 1-2 colunas
- [ ] Mapa scrollável verticalmente

### Celular Horizontal (390px)
- [ ] Navegação em menu compacto
- [ ] Botões empilhados sem sobreposição
- [ ] Nenhum overflow horizontal
- [ ] Texto legível (não cortado)
- [ ] Touch targets 44×44 px
- [ ] Mapa acessível
- [ ] Formulário com um campo por linha

### Celular Vertical (360px)
- [ ] Menor viewport comum
- [ ] Nenhum texto cortado
- [ ] Nenhum overflow horizontal
- [ ] Botões em coluna única
- [ ] Touch targets 44×44 px
- [ ] Scrollable verticalmente
- [ ] Mapa explorado com zoom/pan

---

## 2. TESTES FUNCIONAIS

### 2.1 Fluxo: Acessar Página Inicial
- [ ] Página carrega sem erros
- [ ] Header está fixo (sticky)
- [ ] Logo clicável leva ao home
- [ ] Navegação completa visível
- [ ] Hero section renderizado
- [ ] Imagens carregam (ou placeholder)
- [ ] CTAs visíveis e clicáveis
- [ ] Footer com links corretos
- [ ] Console sem erros

**Critérios de Aceite:**
- ✅ Carrega em < 3 segundos (desktop)
- ✅ Sem console errors
- ✅ Navegação funciona

---

### 2.2 Fluxo: Começar Participação
- [ ] Link "Participar" navega a /participar
- [ ] Tela inicial do formulário carrega
- [ ] Título e instruções visíveis
- [ ] Steps visualization renderiza (4 etapas)
- [ ] Progress bar em 0/4
- [ ] Botão "Começar agora" clicável
- [ ] Privacidade disclosure visível
- [ ] Botão sem mouse (Tab → Enter)

**Critérios de Aceite:**
- ✅ Formulário utilizável sem mouse
- ✅ Focus states visíveis
- ✅ Sem console errors

---

### 2.3 Fluxo: Preencher Formulário
- [ ] **Step 1 - Localização:**
  - [ ] Select de Estado (UF) funciona
  - [ ] Select de Cidade dinamicamente filtrado
  - [ ] Para não-RJ: input de texto aparece
  - [ ] Validação: "selecione município" bloqueado
  - [ ] Botão "Próximo" ativado após seleção
  - [ ] Botão "Voltar" funciona
  
- [ ] **Step 2 - Categoria:**
  - [ ] Botões de categoria clicáveis
  - [ ] Seleção visual clara (cor + border)
  - [ ] Opção "Prefiro não responder"
  - [ ] Seleção por teclado (Tab + Space/Enter)
  - [ ] aria-selected atualiza
  
- [ ] **Navegação entre steps:**
  - [ ] Progress bar atualiza (25% → 50% → 75%)
  - [ ] Focus move para novo h2
  - [ ] Scroll suave até o topo do step
  - [ ] Sem perda de dados ao navegar

**Critérios de Aceite:**
- ✅ Formulário preserva respostas
- ✅ Nenhuma mensagem de erro excessiva

---

### 2.4 Fluxo: Voltar Uma Etapa
- [ ] Botão "Voltar" navegação backward
- [ ] Dados anteriores preservados
- [ ] Step counter reduz
- [ ] Progress bar reverte
- [ ] Focus gerenciado adequadamente
- [ ] De volta ao home: botão Voltar vai a /

**Critérios de Aceite:**
- ✅ Dados não são perdidos
- ✅ Navegação fluida

---

### 2.5 Fluxo: Recarregar Página
- [ ] localStorage preserva estado parcial (se implementado)
- [ ] Ou: volta ao início do formulário
- [ ] Sem crash ao recarregar
- [ ] Sem console errors
- [ ] Dados anteriores não enviados novamente

**Critérios de Aceite:**
- ✅ Nenhum console error ao reload
- ✅ Sem erros críticos

---

### 2.6 Fluxo: Enviar Participação
- [ ] Preenchimento até "Salvar resposta"
- [ ] Spinner aparece
- [ ] Mensagem "Salvando..." visível
- [ ] API call feito sem dados pessoais
- [ ] Response: "Sua participação agora faz parte..."
- [ ] Número de participação exibido
- [ ] CTAs: "Ver mapa", "Compartilhar", "Voltar ao início"
- [ ] Cada CTA funciona

**Critérios de Aceite:**
- ✅ Formulário preserva respostas durante falha
- ✅ Envio bem-sucedido sem erro

---

### 2.7 Fluxo: Simular Ausência de Internet
- [ ] Desabilitar rede no DevTools
- [ ] Tentar enviar participação
- [ ] Erro capturado e exibido
- [ ] ErrorContingency modal aparece
- [ ] Botão "Tentar Novamente" ativo
- [ ] Botão "Voltar" retorna ao formulário
- [ ] Dados não perdidos
- [ ] Reconectar rede e reenviar

**Critérios de Aceite:**
- ✅ Offline handling gracioso
- ✅ Dados preservados

---

### 2.8 Fluxo: Tentar Enviar Duas Vezes
- [ ] Primeiro envio: sucesso
- [ ] Segundo envio: validação no frontend
- [ ] Botão desabilitado durante loading
- [ ] Spinner indica "Salvando..."
- [ ] Duplo-clique não causa dupla submissão
- [ ] Cada submitForm() é atômico

**Critérios de Aceite:**
- ✅ Nenhum console error
- ✅ Uma única submissão

---

### 2.9 Fluxo: Explorar Mapa
- [ ] Página /mapa carrega
- [ ] Mapa Leaflet renderizado
- [ ] Marcadores visíveis por município
- [ ] Cores representam intensidade
- [ ] Clique em marcador: popup com dados
- [ ] Seta para navegar próximo/anterior
- [ ] ESC para desselecionar
- [ ] Legenda visível e clara
- [ ] Zoom +/- funciona
- [ ] Pan/drag funciona

**Critérios de Aceite:**
- ✅ Mapa utilizável por toque
- ✅ Nenhum console error no mapa

---

### 2.10 Fluxo: Aplicar e Remover Filtros
- [ ] Aba "Participação por município": tabela
  - [ ] Ordenação: maior → menor count
  - [ ] % relativo calculado
  - [ ] Stats card: Total, Com dados, Média
  - [ ] Overflow-x em mobile
  
- [ ] Aba "Temas percebidos": tabela
  - [ ] Agregação por tema
  - [ ] Ordenação por frequência
  - [ ] Percentual total = 100%
  
- [ ] Trocar abas
  - [ ] Tab navigation funciona
  - [ ] Conteúdo não se sobreposição
  - [ ] Focus manage adequado

**Critérios de Aceite:**
- ✅ Nenhuma sobreposição
- ✅ Dados coerentes

---

### 2.11 Fluxo: Registrar Interesse em Outra Região
- [ ] Página /expansao carrega
- [ ] Formulário de expansão visível
- [ ] Campos: Nome, Município, Estado, Contato
- [ ] Validações funcionam
- [ ] Envio bem-sucedido
- [ ] Confirmação exibida

**Critérios de Aceite:**
- ✅ Formulário funcionável
- ✅ Sem console errors

---

### 2.12 Fluxo: Recusar Cookies
- [ ] Banner de cookies aparece (se implementado)
- [ ] Ou: verificar localStorage/sessionStorage
- [ ] Botão "Recusar" funciona
- [ ] Formulário de participação ainda funciona
- [ ] Nenhum analytics enviado
- [ ] Console sem warnings de cookies

**Critérios de Aceite:**
- ✅ Recusar cookies não impede participação
- ✅ Sem console warnings

---

### 2.13 Fluxo: Navegar por Teclado
- [ ] Tab percorre todos elementos
- [ ] Shift + Tab navega backward
- [ ] Enter ativa links/botões
- [ ] Space ativa checkboxes/radio
- [ ] Seta ↑↓ em dropdowns
- [ ] Seta ↑↓ no mapa (municípios)
- [ ] ESC fecha modals/popovers
- [ ] Focus visível em todos elementos
- [ ] Nenhum elemento "preso"

**Critérios de Aceite:**
- ✅ Formulário utilizável sem mouse
- ✅ Leitor de tela navega corretamente

---

## 3. CRITÉRIOS DE ACEITE GLOBAIS

### Layout & Rendering
- [ ] Nenhum overflow horizontal em nenhum viewport
- [ ] Nenhum texto cortado (text overflow clipped)
- [ ] Nenhum botão sobreposto
- [ ] Padding/margin respeitados em todos breakpoints
- [ ] Max-width containers funcionam (max-w-7xl, max-w-4xl)

### Performance
- [ ] Mapa carrega em < 2s (sem dados)
- [ ] Formulário carrega em < 1s
- [ ] Transição entre steps: < 300ms
- [ ] Página home: < 2s (First Contentful Paint)

### Acessibilidade
- [ ] Mapa utilizável por toque (44×44 px targets)
- [ ] Contraste ≥ 4.5:1 (WCAG AA)
- [ ] Zoom 200% não quebra layout
- [ ] Leitor de tela funciona
- [ ] Sem console warnings de a11y

### Dados & Estado
- [ ] Formulário preserva respostas durante falha de rede
- [ ] Offline handling gracioso
- [ ] Nenhuma informação pessoal coletada/enviada
- [ ] API returns anônimo (sem IP/ID pessoal)
- [ ] localStorage limpo após envio

### Erros & Logging
- [ ] Console sem erros críticos
- [ ] Erros de rede capturados
- [ ] Mensagens de erro user-friendly
- [ ] ErrorBoundary pega crashes
- [ ] Sem undefined/null errors visíveis

---

## 4. DEVICE-SPECIFIC CHECKS

### iOS (iPhone)
- [ ] Zoom não dispara involuntariamente
- [ ] Input 16px+ font (previne auto-zoom)
- [ ] Teclado virtual não sobrepõe form
- [ ] Safe area respeitado (notch/Dynamic Island)
- [ ] Gestos de back funcionam

### Android
- [ ] Teclado virtual responsivo
- [ ] Back button funciona
- [ ] Overflow behavior consistente
- [ ] Scrolling suave

### Desktop Browsers
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] DevTools responsive mode

---

## 5. RELATÓRIO DE RESULTADOS

### Checklists Completos
```
Responsivos:    [ ] 6/6
Funcionais:     [ ] 13/13
Globais:        [ ] 5/5
Device-Specific: [ ] 3/3
```

### Issues Encontrados
| ID | Severity | Titulo | Status |
|----|----------|--------|--------|
| ... | ... | ... | ... |

### Recomendações
- [ ] ...
- [ ] ...

---

## 6. SIGN-OFF

**Testador**: Claude Code
**Data**: 2026-08-26
**Resultado**: ✅ PASSED / ❌ FAILED / 🟡 CONDITIONAL

**Assinatura**:  
_____________________

