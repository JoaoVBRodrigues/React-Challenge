# 4. Roadmap de Implementação — Commits e Prompts para o Antigravity

Este é o seu guia de execução dia a dia. Para cada etapa você vai encontrar:

- **Objetivo** — o que essa etapa entrega.
- **Requisitos cobertos** — referência aos RF/RNF do documento 2.
- **Prompt para o Antigravity** — cole (adaptando se quiser) para gerar o código dessa etapa.
- **Checklist de validação manual** — o que testar com seus próprios olhos antes de seguir em frente.
- **Commit esperado** — mensagem em inglês, no padrão Conventional Commits, para você usar depois de validar.

> Regra de ouro: **não acumule etapas sem validar.** Depois de cada prompt, rode o app, veja se o resultado bate com o Figma, só então faça o commit e siga pra próxima etapa. Isso é o que te permite corrigir o Antigravity cedo, quando o erro é pequeno.

---

## DIA 1 — Setup do Projeto, Stack e Arquitetura

### Etapa 1.1 — Inicialização do projeto

**Objetivo:** projeto rodando localmente com Vite + React + TypeScript.

**Prompt:**
```
Crie um projeto novo com Vite usando o template "react-ts". Configure o projeto para
rodar na porta 5173. Adicione um .gitignore adequado para projetos Node/Vite/React
(node_modules, dist, .env, arquivos de editor). Não adicione nenhuma dependência
além da gerada pelo template ainda.
```

**Validação manual:** `npm run dev` sobe sem erro e a tela padrão do Vite aparece no navegador.

**Commit:**
```
chore: initialize project with vite, react and typescript
```

---

### Etapa 1.2 — Estrutura de pastas e configuração de qualidade de código

**Objetivo:** esqueleto de pastas do projeto (conforme documento 3) e ESLint/Prettier configurados.

**Prompt:**
```
Crie a seguinte estrutura de pastas dentro de src/: app, pages, components, hooks,
services, types, styles. Configure ESLint com as regras recomendadas para
React + TypeScript, e Prettier integrado ao ESLint para não haver conflito de
formatação. Adicione os scripts "lint" e "format" no package.json.
```

**Validação manual:** rodar `npm run lint` sem erros na base recém-criada.

**Commit:**
```
chore: setup project folder structure, eslint and prettier
```

---

### Etapa 1.3 — Sass

**Objetivo:** arquitetura de estilos com variáveis globais baseadas no Figma.

**Prompt:**
```
Instale sass e configure o projeto para usar arquivos .module.scss em componentes
React (CSS Modules). Crie em src/styles um arquivo _variables.scss com variáveis
para cores, espaçamentos e breakpoints (mobile e desktop), e um _reset.scss básico.
Importe esses arquivos globalmente conforme a configuração recomendada do Vite
para Sass.
```

**Ação sua antes de rodar esse prompt:** copie as cores, fontes e espaçamentos exatos do Figma para dentro do prompt (ex: "cor primária #7C5CFF, fonte Inter"), assim o Antigravity já gera as variáveis certas em vez de valores genéricos.

**Validação manual:** criar um componente de teste simples usando uma variável do Sass e confirmar que o estilo é aplicado.

**Commit:**
```
chore: setup sass architecture with global variables and reset
```

---

### Etapa 1.4 — React Router e páginas base

**Objetivo:** roteamento entre Home, UserDetails e NotFound.

**Prompt:**
```
Instale react-router-dom. Crie três páginas em src/pages: Home (rota "/"),
UserDetails (rota "/user/:id") e NotFound (rota curinga "*"). Configure o roteador
em src/app usando createBrowserRouter, com um layout simples que renderiza a
página atual. Cada página por enquanto deve só exibir um título com seu próprio
nome, para validarmos a navegação antes de implementar a lógica.
```

**Validação manual:** navegar manualmente para `/`, `/user/1` e uma rota inválida (`/xyz`) e confirmar que cada uma exibe a página correta.

**Commit:**
```
feat: setup react router with base pages
```

---

### Etapa 1.5 — React Query

**Objetivo:** provider de React Query configurado, pronto para os hooks de dados.

**Prompt:**
```
Instale @tanstack/react-query. Crie um QueryClient e envolva a aplicação com
QueryClientProvider em src/app. Adicione o React Query Devtools apenas em modo
de desenvolvimento.
```

**Validação manual:** abrir o React Query Devtools no navegador e confirmar que aparece (mesmo sem nenhuma query ainda).

**Commit:**
```
chore: setup react query provider
```

---

### Etapa 1.6 — Storybook

**Objetivo:** Storybook configurado e rodando.

**Prompt:**
```
Configure o Storybook nesse projeto Vite + React + TypeScript, usando o builder
do Vite. Adicione os addons essenciais: essentials e a11y (acessibilidade).
Configure para reconhecer arquivos "*.stories.tsx" dentro de src/components.
```

**Validação manual:** `npm run storybook` sobe sem erro (mesmo sem nenhuma story ainda além da de exemplo gerada).

**Commit:**
```
chore: setup storybook with vite builder and a11y addon
```

---

### Etapa 1.7 — Jest e React Testing Library

**Objetivo:** ambiente de testes funcionando.

**Prompt:**
```
Configure Jest e React Testing Library nesse projeto Vite + React + TypeScript.
Use ts-jest ou babel-jest (o que for mais compatível com o setup do Vite) e
jsdom como ambiente de teste. Adicione @testing-library/jest-dom para matchers
extras. Crie um teste simples de exemplo (ex: renderizar um <h1> e verificar o
texto) só para validar que a configuração funciona. Adicione o script "test" no
package.json.
```

**Validação manual:** `npm run test` roda e o teste de exemplo passa.

**Commit:**
```
chore: setup jest and react testing library
```

---

### Etapa 1.8 — Motion

**Objetivo:** biblioteca de animação instalada e testada com um exemplo mínimo.

**Prompt:**
```
Instale a biblioteca "motion" (motion.dev, antiga framer-motion). Crie um
componente de exemplo com uma div que faz fade-in ao montar, usando motion,
só para validar que a instalação funciona corretamente com Vite + React.
Remova esse componente de exemplo depois de validar.
```

**Validação manual:** ver a animação de fade funcionando na tela.

**Commit:**
```
chore: install and validate motion animation library
```

> Fim do Dia 1: se todas as 8 etapas acima foram commitadas, você tem o esqueleto completo da stack obrigatória funcionando. É um ótimo ponto para dar push no repositório remoto e continuar no Dia 2.

---

## DIA 2 — Listagem de Usuários

### Etapa 2.1 — Tipos e serviço de acesso à API

**Requisitos cobertos:** RF01, RNF01, RN03

**Prompt:**
```
Crie em src/types um arquivo user.ts com uma interface User tipando o formato de
resposta da API randomuser.me (campos: name.first, name.last, email, cell,
picture.large/medium/thumbnail, dob.age, registered.date, location.city,
location.country, login.uuid, nat). Crie em src/services um arquivo userService.ts
com uma função getUsers(page: number, resultsPerPage: number) que chama
"https://randomuser.me/api/?page={page}&results={resultsPerPage}&seed=findpeople"
usando fetch, tipando o retorno com a interface criada. Use sempre o parâmetro
seed=findpeople fixo para garantir que a mesma página sempre retorne os mesmos
usuários.
```

**Validação manual:** chamar a função manualmente no console do navegador (ou num console.log temporário) e conferir que o retorno tem o formato esperado.

**Commit:**
```
feat(api): add randomuser api service and user types
```

---

### Etapa 2.2 — Hook de listagem com React Query

**Requisitos cobertos:** RF01, RF03, RNF06

**Prompt:**
```
Crie em src/hooks um hook useUsers(page: number) que usa useQuery do React Query
para chamar getUsers(page, 10), com queryKey ["users", page]. Retorne os dados,
isLoading e isError do useQuery.
```

**Validação manual:** usar esse hook temporariamente na Home e exibir `JSON.stringify(data)` na tela, confirmando que os dados chegam.

**Commit:**
```
feat(hooks): add useUsers hook with react query
```

---

### Etapa 2.3 — Componente de listagem (UserList)

**Requisitos cobertos:** RF01

**Prompt:**
```
Crie um componente UserList em src/components/UserList que recebe uma lista de
usuários (tipo User[]) e exibe cada um em formato de tabela/lista, seguindo essa
estrutura de colunas: foto, primeiro nome, último nome, [confirmar no Figma o
significado exato da coluna "title"], data de registro, telefone, idade, e um
link "Ver mais" que leva para /user/:id usando o uuid do usuário. Use CSS Modules
com Sass para o estilo, seguindo as variáveis já criadas em src/styles. Crie
também os estados de carregamento (skeleton ou texto "Carregando...") e de erro
("Não foi possível carregar os usuários.").
```

**Ação sua antes desse prompt:** confirme no Figma o nome real da coluna "Title" e ajuste o prompt antes de rodar — isso evita ter que refazer o componente depois.

**Validação manual:** a Home exibe 10 usuários reais da API, com foto e dados corretos.

**Commit:**
```
feat(list): implement user list component
```

---

### Etapa 2.4 — Storybook do UserList

**Prompt:**
```
Crie um arquivo UserList.stories.tsx para o componente UserList, com pelo menos
três stories: "Default" (com uma lista mockada de usuários), "Loading" e "Empty"
(lista vazia).
```

**Validação manual:** abrir o Storybook e conferir visualmente as três stories.

**Commit:**
```
docs(storybook): add stories for user list component
```

---

### Etapa 2.5 — Paginação

**Requisitos cobertos:** RF02, RF03, RN03

**Prompt:**
```
Crie um componente Pagination em src/components/Pagination que recebe
currentPage, totalPages e uma função onPageChange, exibindo números de página
clicáveis (com destaque visual na página atual) seguindo o estilo do Figma.
Integre esse componente na Home, controlando o estado de página atual com
useState e passando esse valor para o hook useUsers.
```

**Validação manual:** clicar entre páginas diferentes e confirmar que a lista muda para usuários diferentes, sem repetir os mesmos da página anterior.

**Commit:**
```
feat(pagination): implement pagination component and integrate with user list
```

---

### Etapa 2.6 — Testes da listagem e paginação

**Requisitos cobertos:** RNF03

**Prompt:**
```
Crie testes com Jest e React Testing Library para o componente UserList,
cobrindo: renderização correta da lista com dados mockados, exibição do estado
de carregamento, e exibição do estado de erro. Crie também testes para o
componente Pagination, cobrindo: renderização do número correto de páginas,
destaque da página atual, e chamada da função onPageChange ao clicar em um
número diferente.
```

**Validação manual:** `npm run test` — todos os testes passam.

**Commit:**
```
test: add tests for user list and pagination components
```

> Fim do Dia 2: RF01, RF02, RF03 e RNF06 cobertos e testados.

---

## DIA 3 — Busca (Primeiro Nome, Último Nome e Idade)

### Etapa 3.1 — Componente de busca (SearchBar)

**Requisitos cobertos:** RF04, RF05, RF06

**Prompt:**
```
Crie um componente SearchBar em src/components/SearchBar com três campos de
entrada controlados: primeiro nome (texto), último nome (texto) e idade
(número), seguindo o layout do Figma. O componente deve expor os valores
digitados através de uma função onSearch(filters) chamada a cada mudança,
com debounce de 400ms para os campos de texto.
```

**Validação manual:** digitar em cada campo e conferir no console (temporariamente) que os valores chegam corretamente e com o delay do debounce.

**Commit:**
```
feat(search): add search bar component with debounced inputs
```

---

### Etapa 3.2 — Lógica de filtro combinado

**Requisitos cobertos:** RF04, RF05, RF06, RN02, RN04

**Prompt:**
```
Crie um hook useUserSearch que recebe os filtros da SearchBar (primeiro nome,
último nome, idade) e a lista de usuários já carregada da página atual,
retornando apenas os usuários que atendem a TODOS os filtros preenchidos
simultaneamente (comparação de nome deve ser case-insensitive e por
"contém", idade deve ser comparação exata). Integre esse hook na Home,
combinando com o resultado de useUsers.
```

**Validação manual:** testar busca só por primeiro nome, só por idade, e combinações de dois ou três filtros ao mesmo tempo, confirmando que a lógica é "E" e não "OU".

**Commit:**
```
feat(search): implement combined filter logic by name and age
```

---

### Etapa 3.3 — Estado de "nenhum resultado encontrado"

**Requisitos cobertos:** RF07

**Prompt:**
```
Crie um componente EmptyState em src/components/EmptyState que exibe uma
mensagem "Nenhum resultado encontrado" com o texto de apoio do Figma. Integre
esse componente na Home para ser exibido quando a busca não retorna nenhum
usuário.
```

**Validação manual:** buscar por um nome que certamente não existe e confirmar que o EmptyState aparece, seguindo o wireframe "Not found result".

**Commit:**
```
feat(search): add empty state for no search results
```

---

### Etapa 3.4 — Testes de busca

**Requisitos cobertos:** RNF03

**Prompt:**
```
Crie testes com Jest e React Testing Library para o componente SearchBar
(digitação e disparo do onSearch com debounce) e para o hook useUserSearch
(filtro por nome, por idade, filtros combinados, e caso sem resultados).
Crie também um teste para o componente EmptyState.
```

**Validação manual:** `npm run test` — todos os testes passam.

**Commit:**
```
test: add tests for search bar, user search hook and empty state
```

> Fim do Dia 3: RF04, RF05, RF06 e RF07 cobertos e testados. Nesse ponto, todos os requisitos funcionais obrigatórios de listagem/busca estão prontos.

---

## DIA 4 — Página de Detalhes + Motion + Storybook

### Etapa 4.1 — Serviço e hook de usuário único

**Requisitos cobertos:** RF08

**Prompt:**
```
Adicione em userService.ts uma função getUserById(uuid: string) — como a API
randomuser.me não tem endpoint de busca por id, essa função deve buscar dentro
do cache já carregado pelo React Query (usando queryClient.getQueryData) em vez
de fazer uma nova chamada de rede. Crie um hook useUser(uuid) que usa essa
função.
```

**Validação manual:** navegar da listagem até um usuário específico e confirmar que os dados batem com os que apareciam na tabela.

**Commit:**
```
feat(api): add get user by id from cached query data
```

---

### Etapa 4.2 — Página/Componente de detalhes

**Requisitos cobertos:** RF08, RN05

**Prompt:**
```
Implemente a página UserDetails seguindo o layout do Figma: foto grande,
nome completo, e os campos primeiro nome, último nome, [confirmar campo
"title" no Figma], data de registro e idade. Se o usuário não for encontrado
no cache, exiba o componente NotFound em vez de quebrar a página.
```

**Validação manual:** acessar `/user/:id` de um usuário válido (via clique na listagem) e de um id inválido direto na URL, conferindo os dois comportamentos.

**Commit:**
```
feat(details): implement user details page
```

---

### Etapa 4.3 — Storybook da página de detalhes

**Prompt:**
```
Crie stories para os componentes usados na UserDetails (ex: o card de perfil),
cobrindo o estado com dados completos e o estado "não encontrado".
```

**Commit:**
```
docs(storybook): add stories for user details components
```

---

### Etapa 4.4 — Animações com Motion

**Requisitos cobertos:** stack obrigatória (Motion)

**Prompt:**
```
Usando a biblioteca motion, adicione: (1) uma transição de fade/slide ao trocar
de rota entre Home e UserDetails, usando AnimatePresence; (2) uma animação de
entrada em stagger (itens aparecendo em sequência) nos itens da UserList
quando a página carrega ou muda de página. As animações devem respeitar a
preferência de "reduced motion" do sistema operacional do usuário.
```

**Validação manual:** navegar entre as telas e trocar de página na listagem, observando as animações; testar também com "reduzir movimento" ativado no sistema operacional para confirmar que a animação é reduzida/desativada.

**Commit:**
```
feat(motion): add page transitions and list stagger animation
```

> Fim do Dia 4: RF08 e RN05 cobertos, Storybook completo para os principais componentes, e o diferencial de animação implementado.

---

## DIA 5 — Testes Finais, Responsividade, Bônus e Deploy

### Etapa 5.1 — Cobertura de testes final

**Requisitos cobertos:** RNF03

**Prompt:**
```
Revise todos os componentes em src/components e src/pages e garanta que cada
um tem um arquivo de teste correspondente. Rode a cobertura de testes com
"jest --coverage" e liste quais componentes ainda não têm testes, para eu
decidir quais complementar.
```

**Validação manual:** relatório de cobertura sem componentes "órfãos" de teste.

**Commit:**
```
test: complete test coverage for remaining components
```

---

### Etapa 5.2 — Responsividade

**Requisitos cobertos:** RNF05

**Prompt:**
```
Revise os componentes UserList, SearchBar, Pagination e UserDetails para
garantir que seguem fielmente as variantes mobile do Figma (breakpoint definido
em src/styles/_variables.scss). Ajuste onde necessário usando media queries
do Sass.
```

**Validação manual:** testar em DevTools no modo responsivo (mobile e desktop) comparando lado a lado com o Figma.

**Commit:**
```
style: adjust responsive layout for mobile breakpoints
```

---

### Etapa 5.3 — Acessibilidade

**Prompt:**
```
Revise os componentes interativos (SearchBar, Pagination, links "Ver mais")
garantindo labels acessíveis, foco visível no teclado e uso correto de
elementos semânticos (nav para paginação, table ou lista semântica para o
UserList). Use o addon de acessibilidade do Storybook para identificar
problemas.
```

**Commit:**
```
fix(a11y): improve keyboard navigation and semantic markup
```

---

### Etapa 5.4 — README final do projeto

**Prompt:**
```
Escreva um README.md para este repositório contendo: descrição do projeto,
stack utilizada, como rodar localmente (instalação e scripts disponíveis:
dev, build, test, storybook), estrutura de pastas, e uma seção descrevendo
como os requisitos do desafio foram atendidos.
```

**Commit:**
```
docs: add project readme with setup instructions
```

---

### Etapa 5.5 — Bônus (opcional, só depois de tudo acima estar pronto)

Nenhum bônus foi listado explicitamente no enunciado do desafio — os itens abaixo são sugestões de diferencial, apenas se sobrar tempo dentro do prazo de 5 dias. **Não comece o bônus se o MVP acima ainda não estiver 100% completo e testado.**

| Bônus sugerido | Prompt | Commit |
|---|---|---|
| Persistir filtros e página atual na URL (link compartilhável) | `Sincronize os filtros de busca e a página atual com os query params da URL usando react-router-dom, para que a URL reflita o estado atual e possa ser compartilhada/recarregada sem perder o filtro aplicado.` | `feat(bonus): persist search filters and pagination in url query params` |
| CI com GitHub Actions | `Crie um workflow do GitHub Actions em .github/workflows/ci.yml que roda npm ci, npm run lint e npm run test em cada push e pull request.` | `ci: add github actions workflow for lint and tests` |
| Deploy | (feito direto na Vercel, sem prompt necessário — importar o repositório do GitHub e configurar o build command "vite build") | `chore: configure production deploy on vercel` |

---

## Resumo do histórico de commits (visão geral do projeto do início ao fim)

```
chore: initialize project with vite, react and typescript
chore: setup project folder structure, eslint and prettier
chore: setup sass architecture with global variables and reset
feat: setup react router with base pages
chore: setup react query provider
chore: setup storybook with vite builder and a11y addon
chore: setup jest and react testing library
chore: install and validate motion animation library
feat(api): add randomuser api service and user types
feat(hooks): add useUsers hook with react query
feat(list): implement user list component
docs(storybook): add stories for user list component
feat(pagination): implement pagination component and integrate with user list
test: add tests for user list and pagination components
feat(search): add search bar component with debounced inputs
feat(search): implement combined filter logic by name and age
feat(search): add empty state for no search results
test: add tests for search bar, user search hook and empty state
feat(api): add get user by id from cached query data
feat(details): implement user details page
docs(storybook): add stories for user details components
feat(motion): add page transitions and list stagger animation
test: complete test coverage for remaining components
style: adjust responsive layout for mobile breakpoints
fix(a11y): improve keyboard navigation and semantic markup
docs: add project readme with setup instructions
```

Esse histórico, sozinho, já conta a história do projeto para quem for revisar seu repositório — é um bom sinal de organização mesmo antes de olhar o código.
