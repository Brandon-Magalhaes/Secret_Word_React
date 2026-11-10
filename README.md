# Secret Word

Jogo de adivinhação de palavras em React. A cada partida o app sorteia uma palavra e uma categoria, e o jogador tem **3 tentativas** para descobrir as letras.

## Como funciona

- Três estágios controlados em `src/App.js`: `start`, `game` e `end`.
- Cada partida sorteia uma palavra e uma categoria a partir de `src/data/words.js`.
- Letra certa aparece na posição da palavra; letra errada entra na lista de erros.
- Ao errar 3 letras a partida termina; ao completar a palavra, o jogador vence.
- A tela final mostra a palavra sorteada e permite iniciar outra partida.

## Stack

React 18 · Create React App

## Como rodar

```bash
npm install
npm start
```

Abra `http://localhost:3000`.

## Scripts

| Comando | O que faz |
|---|---|
| `npm start` | servidor de desenvolvimento |
| `npm run build` | build de produção em `build/` |
| `npm test` | testes (apenas o teste padrão do Create React App) |
