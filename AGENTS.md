# Guia do Projeto

## Regra obrigatória

Antes de criar ou alterar qualquer benchmark, leia `rules-idea.md` e `rules-design-ui.md`. Eles definem os critérios de produto, medição e interface que todo benchmark deve seguir.

## Arquivos

- `package.json`: configura o projeto Node e o comando `npm run dev`.
- `server.js`: servidor HTTP estático local na porta `3000` (ou `PORT`).
- `index.html`: página inicial com links para os benchmarks disponíveis.
- `rules-idea.md`: princípios para projetar benchmarks úteis, justos e mensuráveis.
- `rules-design-ui.md`: regras de interface mobile-first, acessibilidade e interação dos benchmarks.
- `benchmarks/ordenacao/index.html`: benchmark de ordenação completo; contém layout, lógica de geração/validação do puzzle, timer e drag-and-drop.
- `AGENTS.md`: guia resumido do repositório e instruções para agentes.
