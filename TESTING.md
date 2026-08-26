# Checklist de Testes - Mapa do Cuidado MVP

## Testes Funcionais Obrigatórios

### 1. Tela Inicial
- [ ] Logo e título "Mapa do Cuidado" exibem corretamente
- [ ] Descrição "Noroeste Fluminense - Merco 2026" visível
- [ ] Botão "Começar" funciona
- [ ] Rodapé com atribuição SyVtek Care presente

### 2. Seleção dos 13 Municípios
- [ ] Estado pré-selecionado como "RJ"
- [ ] Lista de municípios exibe todos os 13
- [ ] Nenhuma cidade externa aparece na lista
- [ ] Seleção de município atualiza o formulário
- [ ] Todos os nomes com acentuação aparecem corretamente

### 3. Seleção de Cidade Externa
- [ ] Ao selecionar estado fora de RJ, campo muda para input de texto
- [ ] Mensagem "A SyVtek Care está começando pelo Noroeste..." exibe
- [ ] Dois botões disponíveis: "Registrar interesse" e "Continuar minha participação"
- [ ] Ambos os CTAs funcionam sem bloquear a participação

### 4. Envio da Contribuição
- [ ] Formulário solicita: estado, cidade, categoria
- [ ] Campos obrigatórios estão marcados
- [ ] Categoria se atualiza ao clicar em opção
- [ ] Botão "Enviar" desabilita até preencher tudo
- [ ] Mensagem de sucesso aparece com número de participação
- [ ] Painel atualiza com nova contribuição

### 5. Bloqueio de Múltiplos Envios
- [ ] Após envio, usuário não consegue enviar novamente sem reiniciar
- [ ] Botão "Nova Participação" reinicia o fluxo
- [ ] Página /mapa funciona após nova participação

### 6. Abertura da Lista de Expansão
- [ ] Modal de expansão abre ao clicar em "Registrar interesse"
- [ ] Formulário pré-preenche cidade e estado selecionados
- [ ] Botão "Quero o Mapa do Cuidado na minha região" (abaixo do mapa) abre o formulário
- [ ] Link /expansao abre página dedicada

### 7. Consentimento Obrigatório
- [ ] Checkbox de consentimento é obrigatório
- [ ] Texto completo visível: "Autorizo a SyVtek Care..."
- [ ] Botão de envio desabilita se checkbox não marcado
- [ ] Erro claro se tentar enviar sem consentimento

### 8. Envio do Interesse
- [ ] Nome, cidade e estado obrigatórios
- [ ] Pelo menos WhatsApp OU email obrigatório
- [ ] Email validado (contém @)
- [ ] Mensagem de sucesso clara
- [ ] Redireciona para painel com highlight de 5 segundos

### 9. Atualização do Painel
- [ ] Total de participações atualiza
- [ ] Indicadores mostram: total, municípios, top município, categoria predominante
- [ ] Ranking de cidades de interesse aparece
- [ ] Notificação temporal "O Mapa recebeu..." exibe por ~5 segundos
- [ ] Sem mistura de dados reais com fictícios

### 10. Estado Sem Dados
- [ ] Ao iniciar, painel mostra estado apropriado
- [ ] Sem zero fictício exibido como real

### 11. Falha de Rede
- [ ] Modal de erro exibe mensagem amigável
- [ ] Botão "Tentar Novamente" funciona
- [ ] Dados do formulário preservados (localStorage)
- [ ] Modo demonstração inicia com dados claramente marcados

### 12. Funcionamento em Celular
- [ ] Todos os elementos redimensionam
- [ ] Botões têm tamanho adequado (>44px)
- [ ] Formulário preenche a tela sem scroll excessivo
- [ ] Teclado não oculta campos críticos
- [ ] Links e botões clicáveis sem confundir gestos

### 13. Funcionamento em Tablet
- [ ] Layout usa espaço horizontal disponível
- [ ] Campos lado a lado ou empilhados apropriadamente
- [ ] Painel de indicadores em grid responsivo
- [ ] Ranking de cidades legível

### 14. Visualização em Tela Grande (TV/Monitor)
- [ ] Textos dimensionados para leitura à distância
- [ ] Números grandes e legíveis
- [ ] Indicadores com cores contrastadas
- [ ] Sem densidade excessiva de informação
- [ ] Atualiza sem necessidade de scroll

### 15. Reinício para Próximo Participante
- [ ] Botão "Nova Participação" limpa formulário
- [ ] Retorna ao início do fluxo
- [ ] Estado anterior não aparece
- [ ] Pronto para novo participante

## Testes de Qualidade

### Lint
- [ ] `npm run lint` passa sem erros
- [ ] Zero warnings de eslint

### TypeScript
- [ ] `npm run build` compila sem erros de tipo
- [ ] Nenhum `any` não justificado

### Build de Produção
- [ ] `npm run build` sucesso
- [ ] Todos os arquivos estáticos compilados
- [ ] Tamanho do bundle aceitável

### Console
- [ ] Sem erros em vermelho (no navegador DevTools)
- [ ] Sem warnings não esperados
- [ ] Sem falhas de fetch para recursos estáticos

### Textos
- [ ] Português brasileiro consistente
- [ ] Sem typos ou erros gramaticais
- [ ] Mensagens de erro amigáveis
- [ ] Acentuação correta em todos os nomes

### Variáveis de Ambiente
- [ ] `.env.local` contém: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Variáveis não hardcoded em código
- [ ] Deploy pronto sem expor secrets

### Rotas Principais
- [ ] GET `/` - Home carrega
- [ ] GET `/participar` - Formulário carrega
- [ ] GET `/mapa` - Painel carrega
- [ ] GET `/expansao` - Página de expansão carrega
- [ ] POST `/api/contribuicoes` - Salva contribuição
- [ ] POST `/api/expansao` - Salva interesse
- [ ] GET `/api/expansao-stats` - Retorna estatísticas

## Testes de Segurança & Privacidade

- [ ] API pública não retorna nomes ou telefones
- [ ] Dados de contato isolados em tabela separada
- [ ] Sem console.log de dados sensíveis
- [ ] Consentimento registrado antes de salvar
- [ ] URLs não expõem IDs de registros individuais

## Testes de Contingência

- [ ] Sem Supabase: painel exibe dados de demonstração
- [ ] Banner "MODO DEMONSTRAÇÃO" bem visível
- [ ] Erro amigável ao falhar envio
- [ ] Dados salvos em localStorage para recuperação
- [ ] Botão "Tentar Novamente" ativa retry

---

**Status:** [ ] Todos os testes passaram
**Data:** _______________
**Operador:** _______________
**Notas:** 
