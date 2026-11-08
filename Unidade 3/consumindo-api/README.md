# Explorador da Pokédex - Consumindo a PokéAPI

## API Utilizada

- **Nome da API:** PokéAPI
- **Link da documentação:** https://pokeapi.co/docs/v2
- **Endpoint utilizado:** `https://pokeapi.co/api/v2/pokemon/{nome_ou_id}`

## O que a página faz

Esta aplicação consulta dados de Pokémon em tempo real através da PokéAPI utilizando `fetch`, `async` e `await`.

- Ao abrir a página, exibe `"Carregando..."` e apresenta os dados do Pokémon inicial (ou da última busca salva no `localStorage`).
- Mostra 6 informações do Pokémon em um cartão criado dinamicamente com `createElement` e `textContent`: imagem (`sprites.front_default`), nome (`name`), número na Pokédex (`id`), tipos (`types`), altura convertida para metros (`height`) e peso convertido para quilogramas (`weight`).
- Permite buscar qualquer Pokémon pelo nome ou número através do formulário ou dos botões de sugestão rápida.
- Trata erros de rede, status HTTP (`resposta.ok`) e buscas não encontradas (erro 404) diretamente na interface com opção de `"Tentar de novo"`.

## Como abrir a página

1. Baixe ou clone este repositório.
2. Navegue até a pasta `Unidade 3/consumindo-api`.
3. Abra o arquivo `index.html` diretamente no navegador (ou utilize a extensão **Live Server** no VS Code).
