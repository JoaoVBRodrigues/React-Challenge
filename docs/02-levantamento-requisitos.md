# 2. Levantamento de Requisitos — Find People

## Escopo

### Incluído no MVP

- Consumo da API `randomuser.me` para listagem de usuários.
- Paginação client-driven (10 usuários por página).
- Busca/filtro por primeiro nome, último nome e idade.
- Tela de detalhes de um usuário específico.
- Estados de carregamento, erro e "nenhum resultado encontrado".
- Roteamento entre listagem e detalhes via React Router.
- Testes automatizados de todos os componentes.
- Documentação de componentes no Storybook.
- Animações de transição com Motion.

### Excluído do MVP (fora do escopo do desafio)

- Autenticação e controle de sessão (a API é pública, sem login).
- Persistência de dados própria (banco de dados, backend próprio).
- Edição ou exclusão de usuários (a API do randomuser.me é somente leitura).
- Internacionalização (i18n) — a menos que você queira usar como diferencial no bônus.
- Deploy com CI/CD robusto — pode entrar como bônus, não é obrigatório.

> Definir o que **não** vai ser feito é tão importante quanto definir o que vai — isso evita você "inventar" escopo (ex: criar tela de login) que não estava pedido e vai consumir tempo do seu prazo de 5 dias.

## Requisitos Funcionais (RF)

| ID | Requisito | Critério de aceite |
|---|---|---|
| RF01 | O sistema deve listar usuários buscando da API `randomuser.me` | A tela inicial exibe uma tabela/lista de usuários vindos da API, sem dados mockados |
| RF02 | O sistema deve paginar a listagem | Existem controles de navegação entre páginas (ex: 1, 2, 3...) |
| RF03 | Cada página deve exibir exatamente 10 usuários | A requisição à API usa `results=10` e a página nunca exibe mais nem menos que isso |
| RF04 | O usuário deve poder pesquisar por primeiro nome | Ao digitar um primeiro nome, a lista é filtrada para exibir apenas correspondências |
| RF05 | O usuário deve poder pesquisar por último nome | Ao digitar um sobrenome, a lista é filtrada para exibir apenas correspondências |
| RF06 | O usuário deve poder pesquisar por idade | Ao informar uma idade, a lista é filtrada para exibir apenas usuários com aquela idade |
| RF07 | O sistema deve exibir um estado de "nenhum resultado encontrado" | Quando a busca não retorna nenhum item, uma mensagem clara é exibida (conforme wireframe "Não encontrado") |
| RF08 | O usuário deve poder visualizar o perfil detalhado de um usuário específico | Ao clicar em "Ver mais"/no item da lista, o sistema navega para uma rota de detalhe (`/user/:id`) exibindo os dados completos daquele usuário |
| RF09 | O sistema deve ter uma rota de fallback para IDs inválidos | Acessar `/user/:id` com um id inexistente exibe estado de não encontrado, sem quebrar a aplicação |

## Requisitos Não Funcionais (RNF)

| ID | Requisito | Justificativa |
|---|---|---|
| RNF01 | A aplicação deve ser escrita em TypeScript com tipagem estrita | Evita erros de contrato de dados vindos de uma API externa que você não controla |
| RNF02 | Toda chamada assíncrona deve ter estado de loading e de erro tratados | Requisito de qualidade — sem isso, a UI quebra silenciosamente se a API cair ou demorar |
| RNF03 | Todos os componentes devem ter cobertura de testes automatizados | Requisito explícito do desafio |
| RNF04 | Todos os componentes visuais relevantes devem ter uma story no Storybook | Facilita revisão visual isolada, sem precisar rodar a app inteira |
| RNF05 | O layout deve ser responsivo (desktop e mobile) | O Figma do desafio já traz variantes desktop/mobile — é parte do critério de avaliação |
| RNF06 | As chamadas à API devem ser cacheadas/deduplicadas | É o motivo de usar React Query em vez de `fetch` + `useState` manual |
| RNF07 | O código deve seguir convenção de commits (Conventional Commits) | Facilita histórico de revisão e é boa prática de mercado |
| RNF08 | A aplicação deve tratar corretamente o parâmetro de nacionalidade/seed da API | O `randomuser.me` retorna dados diferentes a cada chamada sem seed fixa — isso precisa ser controlado para que a paginação não "embaralhe" resultados já vistos (ver Regra de Negócio RN03) |

## Regras de Negócio e Permissões

Esse projeto não tem sistema de permissões (não há login, papéis de usuário ou dados sensíveis) — mas tem **regras de comportamento** que precisam estar bem definidas para não gerar bugs sutis:

- **RN01 — Tamanho de página fixo**: a página sempre exibe 10 resultados, sem opção do usuário mudar esse número (não pedido no desafio, não deve ser implementado para não gerar escopo extra).
- **RN02 — Combinação de filtros**: se o usuário preencher mais de um campo de busca (ex: primeiro nome + idade), o sistema deve aplicar os filtros em conjunto (lógica **E**, não **OU**) — ou seja, retornar apenas quem atende a todos os critérios preenchidos simultaneamente.
- **RN03 — Consistência de dados na paginação**: como o `randomuser.me` gera dados aleatórios a cada chamada, é **obrigatório** fixar uma `seed` fixa na URL da API (parâmetro `seed=findpeople`) para que a mesma página sempre retorne os mesmos usuários, e a paginação (`page=`) não gere pessoas diferentes a cada re-render. Sem isso, a navegação entre páginas parece "quebrada" para quem testa.
- **RN04 — Escopo da busca**: a busca é aplicada sobre o conjunto de dados já carregado/paginado, ou refeita como nova chamada à API — essa decisão fica registrada e justificada no documento `03-decisoes-tecnicas-stack.md`, pois impacta diretamente como o React Query vai ser usado.
- **RN05 — Estado de detalhe não encontrado**: se o usuário acessar diretamente uma URL de detalhe com um identificador que não existe na base carregada, o sistema deve exibir o estado de "não encontrado" em vez de tela em branco ou erro não tratado.
- **RN06 — Dados somente leitura**: nenhuma ação de escrita (criar, editar, excluir usuário) deve ser exposta na UI, pois a API não suporta isso.
