// ---------- Constantes e seleção de elementos ----------
const URL_BASE = "https://pokeapi.co/api/v2/pokemon/";
const formBusca = document.getElementById("formBusca");
const campoPokemon = document.getElementById("campoPokemon");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");
const botoesSugestao = document.querySelectorAll(".chip");

// Bônus: recupera a última busca salva no localStorage ou usa "pikachu"
let ultimoTermoBuscado = localStorage.getItem("ultimoPokemon") || "pikachu";

// ---------- 1. Buscar os dados na API com async/await ----------
async function buscarPokemonNaApi(nomeOuId) {
  const termoFormatado = nomeOuId.trim().toLowerCase();
  const resposta = await fetch(URL_BASE + encodeURIComponent(termoFormatado));

  if (!resposta.ok) {
    if (resposta.status === 404) {
      throw new Error(
        `Pokémon "${nomeOuId}" não encontrado. Verifique o nome ou número digitado.`,
      );
    }
    throw new Error("Erro HTTP " + resposta.status);
  }

  return await resposta.json();
}

// ---------- 2. Criar os elementos do cartão com createElement ----------
function criarBlocoDetalhe(rotulo, valorTexto) {
  const div = document.createElement("div");
  div.classList.add("item-info");

  const span = document.createElement("span");
  span.textContent = rotulo;

  const strong = document.createElement("strong");
  strong.textContent = valorTexto;

  div.appendChild(span);
  div.appendChild(strong);
  return div;
}

function criarCartaoPokemon(dados) {
  const artigo = document.createElement("article");
  artigo.classList.add("cartao-pokemon");

  // 1ª Informação: Imagem do Pokémon
  const imagem = document.createElement("img");
  imagem.src = dados.sprites.front_default || "";
  imagem.alt = "Imagem de " + dados.name;

  // 2ª Informação: Nome do Pokémon
  const tituloNome = document.createElement("h2");
  tituloNome.classList.add("pokemon-nome");
  tituloNome.textContent = dados.name;

  // 3ª Informação: Número (ID) na Pokédex
  const paragrafoId = document.createElement("p");
  paragrafoId.classList.add("pokemon-id");
  paragrafoId.textContent = "Nº na Pokédex: #" + dados.id;

  // 4ª Informação: Tipos do Pokémon
  const containerTipos = document.createElement("div");
  containerTipos.classList.add("lista-tipos");
  for (const item of dados.types) {
    const spanTipo = document.createElement("span");
    spanTipo.classList.add("badge-tipo");
    spanTipo.textContent = item.type.name;
    containerTipos.appendChild(spanTipo);
  }

  // 5ª e 6ª Informações: Altura (em metros) e Peso (em kg)
  const gradeInfo = document.createElement("div");
  gradeInfo.classList.add("grade-info");

  const alturaMetros = (dados.height / 10).toFixed(1) + " m";
  const pesoQuilos = (dados.weight / 10).toFixed(1) + " kg";

  gradeInfo.appendChild(criarBlocoDetalhe("Altura", alturaMetros));
  gradeInfo.appendChild(criarBlocoDetalhe("Peso", pesoQuilos));

  artigo.appendChild(imagem);
  artigo.appendChild(tituloNome);
  artigo.appendChild(paragrafoId);
  artigo.appendChild(containerTipos);
  artigo.appendChild(gradeInfo);

  return artigo;
}

// ---------- 3. Mostrar estados e atualizar a tela ----------
function mostrarErroComBotaoTentar(textoErro) {
  mensagem.textContent = textoErro + " ";
  mensagem.classList.add("erro");

  const botaoTentar = document.createElement("button");
  botaoTentar.type = "button";
  botaoTentar.classList.add("botao-tentar");
  botaoTentar.textContent = "Tentar de novo";
  botaoTentar.addEventListener("click", function () {
    carregarPokemon(ultimoTermoBuscado);
  });

  mensagem.appendChild(botaoTentar);
}

async function carregarPokemon(termo) {
  const buscaLimpa = termo.trim();

  if (buscaLimpa === "") {
    mensagem.textContent =
      "Por favor, digite o nome ou o número de um Pokémon antes de buscar.";
    mensagem.classList.add("erro");
    return;
  }

  ultimoTermoBuscado = buscaLimpa;
  mensagem.textContent = "Carregando...";
  mensagem.classList.remove("erro");
  resultado.textContent = "";

  try {
    const dadosPokemon = await buscarPokemonNaApi(buscaLimpa);
    const cartao = criarCartaoPokemon(dadosPokemon);
    resultado.appendChild(cartao);

    localStorage.setItem("ultimoPokemon", buscaLimpa.toLowerCase());
    mensagem.textContent = `Dados de ${dadosPokemon.name.toUpperCase()} carregados com sucesso.`;
  } catch (erro) {
    mostrarErroComBotaoTentar(
      "Não foi possível carregar os dados: " + erro.message,
    );
  }
}

// ---------- 4. Eventos de interação ----------
formBusca.addEventListener("submit", function (evento) {
  evento.preventDefault();
  carregarPokemon(campoPokemon.value);
});

for (const botao of botoesSugestao) {
  botao.addEventListener("click", function () {
    const nomeSugerido = botao.dataset.nome;
    campoPokemon.value = nomeSugerido;
    carregarPokemon(nomeSugerido);
  });
}

// ---------- Inicialização ----------
campoPokemon.value = ultimoTermoBuscado;
carregarPokemon(ultimoTermoBuscado);
