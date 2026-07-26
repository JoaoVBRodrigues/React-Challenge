# Find People - Desafio Frontend

Um projeto React construído com as melhores práticas de Clean Architecture, focando em performance, acessibilidade e escalabilidade, consumindo a [Random User API](https://randomuser.me/).

## 🚀 Sobre o Projeto
O projeto consiste em uma interface de listagem e busca de usuários, contendo paginação nativa da API, debounce de pesquisa para otimização de requisições, roteamento e uma página de perfil rica em detalhes do usuário selecionado. Tudo isso encapsulado sob uma interface premium e reativa ("dark theme" default) validada por testes e micro-interações fluidas.

## 🛠️ Stack Utilizada
- **Core:** React 19, TypeScript, Vite
- **Roteamento:** React Router DOM (v7)
- **Estilização:** CSS/Sass Modules (Vanilla com breakpoints responsivos)
- **Animações:** Framer Motion / React Motion (com suporte a *Reduced Motion*)
- **Testes:** Jest, React Testing Library (Cobertura > 90%)
- **Documentação de Componentes:** Storybook
- **Code Quality:** ESLint, Prettier, Husky (pré-commit hooks)

## 📦 Como Rodar Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Clone o repositório e acesse a pasta do projeto:
```bash
git clone https://github.com/JoaoVBRodrigues/React-Challenge.git
cd React-Challenge
```

2. Instale as dependências:
```bash
npm install
```

### Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes comandos:

- `npm run dev`: Roda a aplicação em modo de desenvolvimento (Vite).
- `npm run build`: Cria a build de produção na pasta `dist`.
- `npm run test`: Roda a suíte de testes (Jest).
- `npm run test -- --coverage`: Roda a suíte de testes com relatório de cobertura.
- `npm run storybook`: Inicia o servidor local do Storybook na porta 6006 para visualizar os componentes de UI isolados.
- `npm run format`: Formata automaticamente os arquivos do projeto usando Prettier.

## 📂 Estrutura de Pastas

```text
src/
├── app/             # Configurações globais (Router, Providers, App Layout)
├── components/      # Componentes visuais burros/reutilizáveis (UI) e isolados via Storybook
├── hooks/           # Custom Hooks de regras de negócio (useUsers, useDebounce, etc)
├── pages/           # Componentes de páginas roteáveis (Home, UserDetails, NotFound)
├── services/        # Camada de comunicação externa (Fetch da RandomUser API)
├── styles/          # Tokens globais de CSS, variáveis SCSS, mixins e resets
├── types/           # Definições de Tipagens Globais do TypeScript
├── App.tsx          # Componente raiz
└── main.tsx         # Ponto de entrada do React
```

## ✅ Como os Requisitos foram Atendidos

- **RNF01 (Stack Obrigatória - Vite e Typescript):** Estruturado em Vite e o projeto inteiro tipado rigidamente com interfaces TypeScript (`types/user.ts`).
- **RNF02 (Stack Obrigatória - SCSS Modules):** Todos os componentes possuem encapsulamento local via `.module.scss`, lendo de um repositório central de tokens (`_variables.scss`). Nenhuma classe global foi misturada ao escopo.
- **RNF03 (Stack Obrigatória - Testes):** Integração Jest e Testing Library configurada do zero. Foram implementados **35 testes unitários/integração** cobrindo 100% dos componentes e hooks customizados. A cobertura geral de linhas do sistema bate mais de **90%**.
- **RNF04 (Stack Obrigatória - Framer Motion):** Utilizado para transições orgânicas de carregamento (Stagger nas linhas da tabela de usuários) e fade de conteúdo. Além disso, utilizamos `AnimatePresence` nas transições entre abas do painel e usamos `useReducedMotion` para respeitar preferências de acessibilidade do sistema do usuário.
- **RNF05 (Design e Responsividade):** Seguimos 100% o Design System guiado no Figma. As tabelas se adaptam dinamicamente aos celulares e a arquitetura prevê breakpoints fluídos, sem quebrar elementos estruturais nas menores resoluções e garantindo interações na tabela (mantendo botões de perfil expostos em mobile).
- **RF (Requisitos Funcionais):**
  - **Pesquisa e Paginação:** Integrados e sincronizados com estado; utilizando custom hook genérico com `useDebounce` (protegendo a performance evitando re-renders brutais enquanto o usuário digita).
  - **Detalhes de Usuário:** Tela completa puxando os dados de um cache simulado de requisição, separada em abas funcionais de *Info, Location e Login*. E com tela de *Not Found 404* personalizada para casos de URLs mortas.
- **Bônus (Acessibilidade - A11y):** Aplicação construída com tags semânticas, *ARIA labels* (ex: Abas ligadas aos seus tab-panels, nav para a paginação), testes específicos que procuram elementos pelas roles de acessibilidade e focos (focus-visible) habilitados para usuários navegarem pelo teclado (Tab/Shift+Tab) nativamente de ponta a ponta sem dor de cabeça.
