# 📁 Documentação — Desafio Frontend "Find People"

Esse pacote de documentos foi feito para você conduzir o desafio técnico da Union Developers Group do início ao fim, sem se perder, e já deixando pronto o material que normalmente pesa positivamente numa avaliação técnica (documentação de decisão, requisitos rastreáveis, histórico de commits organizado).

## Como usar esse material

1. **Leia `01-documento-concepcao.md`** — alinha o que o produto é e por quê, antes de tocar em código.
2. **Leia `02-levantamento-requisitos.md`** — transforma o checklist do desafio em requisitos rastreáveis (RF/RNF), escopo e regras de negócio.
3. **Leia `03-decisoes-tecnicas-stack.md`** — entende o *porquê* de cada peça da stack obrigatória, não só o *que*.
4. **Siga `04-roadmap-commits-prompts-antigravity.md`** durante a implementação — é o guia dia a dia, com prompt pronto pra colar no Antigravity, checklist de validação manual e o commit (Conventional Commits, em inglês) esperado ao final de cada etapa.

## Ordem sugerida de trabalho

```
Dia 1 → Setup do projeto + stack + arquitetura de pastas + rotas base
Dia 2 → Listagem de usuários (API + paginação)
Dia 3 → Busca (primeiro nome, último nome, idade) + estado "não encontrado"
Dia 4 → Página de detalhes do usuário + Motion (animações) + Storybook
Dia 5 → Testes completos + responsividade + polimento + deploy + bônus
```

## Antes de começar: um ponto de atenção sobre o Figma

Os prints que você me passou mostram o wireframe geral (Home desktop/mobile, resultado de busca, estado "não encontrado" e detalhes do usuário), mas em baixa resolução — não dá pra garantir 100% os nomes exatos de cada campo da tabela (ex: se a coluna "Title" é nacionalidade, gênero ou outra coisa do `randomuser.me`). **Antes do Dia 1**, abra o Figma direto e confirme:

- Nome exato de cada coluna da listagem e de cada campo da tela de detalhes.
- Os *design tokens* (cores, espaçamentos, tipografia) — isso vai direto pras variáveis do Sass.
- Os estados de tabs na tela de detalhes (a wireframe mostra 2-3 abas — confirme o conteúdo de cada uma).
- Breakpoints mobile x desktop.

Isso evita retrabalho no Dia 4, quando você for montar o componente de detalhes.

## Checklist de entrega (requisitos do desafio)

Use isso como o "board" final antes de entregar:

- [ ] Lista usuários buscando da API `randomuser.me`
- [ ] Visualização de perfil de um usuário específico
- [ ] Paginação da lista
- [ ] 10 usuários por página
- [ ] Busca por primeiro nome
- [ ] Busca por último nome
- [ ] Busca por idade
- [ ] Teste de todos os componentes
- [ ] Stack: React + Vite, TypeScript, Sass, React Router, Storybook, Motion, React Query, Jest, React Testing Library
