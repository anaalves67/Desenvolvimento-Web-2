// Passo 3: Selecionar os elementos e definir a URL da API
const URL_API = "https://picsum.photos/v2/list?limit=12";
const galeria = document.getElementById("galeria");
const mensagem = document.getElementById("mensagem");

// Passo 4: Buscar as fotos com async e await
async function buscarFotos() {
  const resposta = await fetch(URL_API);
  if (!resposta.ok) {
    throw new Error("Erro HTTP " + resposta.status);
  }
  return await resposta.json();
}

// Passo 5: Criar o cartão de uma foto
function criarCartao(foto) {
  const cartao = document.createElement("figure");
  cartao.classList.add("cartao");

  const imagem = document.createElement("img");
  imagem.src = "https://picsum.photos/id/" + foto.id + "/400/300";
  imagem.alt = "Foto de " + foto.author;
  imagem.loading = "lazy";

  const legenda = document.createElement("figcaption");
  legenda.textContent = foto.author;

  cartao.appendChild(imagem);
  cartao.appendChild(legenda);
  return cartao;
}

// Passo 6: Carregar a galeria com tratamento de erros
async function carregarGaleria() {
  mensagem.textContent = "Carregando...";
  mensagem.classList.remove("erro");

  try {
    const fotos = await buscarFotos();

    for (const foto of fotos) {
      galeria.appendChild(criarCartao(foto));
    }

    mensagem.textContent = fotos.length + " fotos carregadas.";
  } catch (erro) {
    mensagem.textContent =
      "Não foi possível carregar as fotos: " + erro.message;
    mensagem.classList.add("erro");
  }
}

carregarGaleria();
