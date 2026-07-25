# 1. Documento de Concepção — Find People

## Título do Projeto

**Find People** — Aplicação web de listagem e visualização de perfis de usuários

## Descrição Geral da Ideia

Find People é uma Single Page Application (SPA) construída em React que consome a API pública [randomuser.me](https://randomuser.me/) para listar pessoas geradas aleatoriamente, permitir a busca por critérios específicos (primeiro nome, último nome e idade) e exibir o perfil detalhado de qualquer usuário selecionado na lista.

O projeto não possui backend próprio nem persistência de dados — toda a informação exibida vem diretamente da API pública em tempo de requisição. Isso muda o foco do desafio: a nota alta aqui não vem de "ter dados", vem de **como você organiza estado assíncrono, paginação, busca e testes** em cima de dados que você não controla.

## Objetivos

**Objetivos do produto (o que a aplicação entrega para quem usa):**
- Permitir navegar por uma base de usuários de forma paginada e performática.
- Permitir localizar rapidamente uma pessoa específica por nome ou idade.
- Permitir visualizar os detalhes completos de qualquer usuário da lista.

**Objetivos do desafio (o que isso precisa provar tecnicamente):**
- Demonstrar domínio de busca e cache de dados assíncronos com React Query.
- Demonstrar organização de componentes reutilizáveis e documentados via Storybook.
- Demonstrar cobertura de testes automatizados (Jest + React Testing Library) em todos os componentes.
- Demonstrar roteamento client-side (listagem → detalhe → não encontrado).
- Demonstrar uso de animações (Motion) sem comprometer performance ou acessibilidade.
- Entregar em TypeScript com tipagem correta do contrato de dados da API.

## Público-Alvo e Contexto de Uso

Esse projeto tem dois "públicos", e vale ter os dois em mente ao tomar decisões:

1. **Usuário final fictício do produto**: alguém que quer navegar/pesquisar uma base de contatos/pessoas — o contexto de uso é uma tela de "diretório de pessoas", parecida com um CRM simples ou uma lista de funcionários.
2. **Usuário real do seu trabalho (avaliador técnico)**: quem vai revisar o repositório, rodar `npm install && npm run dev`, olhar o Storybook e rodar os testes. Isso significa que **README claro, código organizado e testes passando** valem tanto quanto a tela em si.

## Principais Funcionalidades

| # | Funcionalidade | Relacionada ao requisito do desafio |
|---|---|---|
| 1 | Listagem paginada de usuários (10 por página) | Listar da API + paginar + 10 por página |
| 2 | Busca por primeiro nome | Pesquisar por primeiro nome |
| 3 | Busca por último nome | Pesquisar por último nome |
| 4 | Busca por idade | Pesquisar por idade |
| 5 | Estado de "nenhum resultado encontrado" | Implícito no fluxo de busca (presente no Figma) |
| 6 | Página de detalhes de um usuário específico | Visualizar perfil de um usuário específico |
| 7 | Estados de carregamento e erro na listagem/busca | Requisito não funcional (boa prática obrigatória) |
| 8 | Documentação de componentes via Storybook | Facilita revisão e é parte da stack obrigatória |
| 9 | Testes automatizados de todos os componentes | Deve conter teste de todos os componentes |
| 10 | Transições/animações de entrada de página e lista | Stack obrigatória inclui Motion |

Essa tabela é a ponte entre o que está escrito no desafio e o que vai virar código — no próximo documento (`02-levantamento-requisitos.md`) cada uma dessas linhas vira um Requisito Funcional (RF) rastreável.
