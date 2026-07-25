# 3. Decisões Técnicas (Stack) — Find People

## Arquitetura Geral

A aplicação é uma **SPA (Single Page Application) 100% client-side**, sem backend próprio. A "camada de dados" é a API pública `randomuser.me`, consumida diretamente do navegador.

```
find-people/
├── .storybook/                 # configuração do Storybook
├── src/
│   ├── app/                    # setup global: rotas, providers (React Query, etc.)
│   ├── pages/                  # telas: Home, UserDetails, NotFound
│   ├── components/             # componentes reutilizáveis (UserList, SearchBar, Pagination, UserCard...)
│   │   └── ComponentName/
│   │       ├── ComponentName.tsx
│   │       ├── ComponentName.module.scss
│   │       ├── ComponentName.stories.tsx
│   │       └── ComponentName.test.tsx
│   ├── hooks/                  # hooks customizados (useUsers, useUserSearch...)
│   ├── services/                # camada de acesso à API (fetch, tipos de resposta)
│   ├── types/                  # tipos TypeScript compartilhados
│   └── styles/                  # variáveis, mixins e reset globais do Sass
```

**Por que essa organização (feature-oriented, cada componente com seus arquivos juntos)?**
Porque cada componente carrega tudo que precisa dele: estilo, teste e story ficam ao lado do código, em vez de espalhados em pastas paralelas (`/styles`, `/tests`, `/stories`). É o padrão mais comum em times React de mercado e reduz o custo de manutenção — quando você mexe num componente, tudo relacionado a ele está a um clique de distância.

## Linguagem Principal — TypeScript

Você está consumindo uma API externa que você não controla e cujo formato de resposta é relativamente complexo (objetos aninhados como `name.first`, `name.last`, `dob.age`, `location.city`). TypeScript resolve dois problemas reais aqui:

1. **Contrato de dados explícito**: você define uma `interface User` uma vez e o autocomplete/erro de compilação te avisa se tentar acessar um campo que não existe ou está com o nome errado — muito mais rápido que descobrir isso em runtime, olhando o console.
2. **Refatoração segura**: como você vai reusar o mesmo tipo `User` em vários componentes (lista, card, detalhe), qualquer mudança no formato é sinalizada pelo compilador em todos os lugares que precisam de ajuste.

Para um dev júnior, o ganho mais imediato é justamente esse: TypeScript "grita" erros de digitação e de estrutura de dados antes de você nem rodar o app.

## Frameworks e Bibliotecas (justificativa por peça da stack obrigatória)

| Tecnologia | Papel no projeto | Por que essa peça e não outra |
|---|---|---|
| **React + Vite** | Base da aplicação e ferramenta de build/dev server | Vite tem cold start e HMR muito mais rápidos que Create React App (hoje descontinuado) por usar ESM nativo no dev; é o padrão atual de mercado para SPAs React novas |
| **TypeScript** | Tipagem estática de todo o projeto | Ver seção acima — segurança de contrato de dados vindos de API externa |
| **Sass** | Pré-processador de CSS | Permite variáveis (cores/espaçamentos do Figma), nesting e mixins — essencial pra reproduzir fielmente um design system com poucas linhas de CSS repetido |
| **React Router** | Navegação entre listagem, detalhe e "não encontrado" | É o requisito RF08/RF09: sem roteamento client-side você não consegue ter uma URL própria (`/user/:id`) para cada perfil, nem uma rota de fallback |
| **Storybook** | Catálogo isolado de componentes | Permite construir e visualizar `UserCard`, `SearchBar`, `Pagination` etc. fora do fluxo da aplicação, comparando lado a lado com o Figma — e é exigido explicitamente na stack |
| **Motion** (ex-Framer Motion) | Animações de transição de página e entrada de itens de lista | Dá micro-interações (fade/slide ao trocar de página, stagger na lista) com uma API declarativa, sem precisar escrever keyframes CSS manuais |
| **React Query (TanStack Query)** | Gerenciamento de estado assíncrono/servidor | É a peça que resolve RNF02 e RNF06 "de graça": cache automático, deduplicação de chamadas repetidas, e os estados `isLoading`/`isError`/`data` prontos — evita reinventar isso com `useEffect` + `useState` manual |
| **Jest** | Test runner e assertions | Executa e reporta os testes; é o requisito RNF03 |
| **React Testing Library** | Testes de componente centrados em comportamento do usuário | Complementa o Jest testando "o que o usuário vê/clica", não detalhes internos de implementação — é o padrão de mercado para testar componentes React hoje |

### Por que React Query em vez de `fetch` direto num `useEffect`?

Essa é provavelmente a decisão mais importante do projeto, então vale destrinchar:

- Sem React Query, cada troca de página ou busca exigiria você controlar manualmente `loading`, `error`, `data`, cancelamento de requisição anterior (para evitar *race condition* quando o usuário digita rápido na busca) e cache.
- Com React Query, você declara `useQuery({ queryKey: ['users', page, filters], queryFn: ... })` e a biblioteca cuida de cache por chave, revalidação e concorrência de chamadas.
- Isso também facilita diretamente o requisito de teste: dá pra mockar o `queryFn` nos testes sem precisar simular `fetch` manualmente em cada teste.

## Banco de Dados

**Não há banco de dados neste projeto.** A fonte de dados é a API pública `randomuser.me`; a aplicação é somente leitura e não precisa persistir nenhuma informação entre sessões para atender aos requisitos do desafio.

Se você quiser ir além no bônus (ver `04-roadmap-commits-prompts-antigravity.md`), o único caso de uso plausível para algum tipo de persistência seria uma lista de "favoritos" salva em `localStorage` — mas isso é opcional e não faz parte do MVP.

## Infraestrutura

- **Versionamento**: Git + GitHub, com commits seguindo Conventional Commits (ver documento 4).
- **Hospedagem/Deploy**: Vercel — mesma plataforma que você já usa nos seus outros projetos de portfólio, com deploy automático a partir do GitHub e zero configuração de servidor, adequado para uma SPA estática.
- **CI (opcional/bônus)**: GitHub Actions rodando `npm test` a cada push/PR, garantindo que a suíte de testes (RNF03) não quebre silenciosamente.

Não há necessidade de infraestrutura de backend (servidor próprio, containers, banco gerenciado) — o app inteiro é estático após o build (`vite build`), o que mantém a complexidade de infraestrutura mínima e alinhada ao escopo real do desafio.
