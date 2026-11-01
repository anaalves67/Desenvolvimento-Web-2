// ---------- Seleção de elementos ----------
const form = document.getElementById("formGasto");
const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoCategoria = document.getElementById("categoria");
const mensagem = document.getElementById("mensagem");
const totalGeral = document.getElementById("totalGeral");
const vazio = document.getElementById("vazio");
const listaGastos = document.getElementById("listaGastos");

// Bônus
const campoOrcamento = document.getElementById("orcamento");
const avisoOrcamento = document.getElementById("avisoOrcamento");
const filtroCategoria = document.getElementById("filtroCategoria");
const blocoTotal = totalGeral.parentElement;

// ---------- Dados ----------
const nomesCategorias = {
  alimentacao: "Alimentação",
  transporte: "Transporte",
  lazer: "Lazer",
  estudos: "Estudos",
  outros: "Outros",
};

// Array principal carregado do localStorage (R10)
let gastos = JSON.parse(localStorage.getItem("gastos")) ?? [];
let orcamento = Number(localStorage.getItem("orcamento")) || 0;

// ---------- Funções auxiliares ----------
function formatar(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem";
  if (tipo) {
    mensagem.classList.add(tipo);
  }
}

function salvar() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

function validar(descricao, textoValor, categoria) {
  if (descricao === "") {
    return "Informe a descrição do gasto.";
  }
  if (textoValor === "" || Number.isNaN(Number(textoValor))) {
    return "Informe um valor numérico.";
  }
  if (Number(textoValor) <= 0) {
    return "O valor deve ser maior que zero.";
  }
  if (categoria === "") {
    return "Selecione uma categoria.";
  }
  return "";
}

// ---------- Desenho da tela ----------
function criarLinha(gasto) {
  const tr = document.createElement("tr");
  tr.dataset.id = gasto.id;

  const tdDescricao = document.createElement("td");
  tdDescricao.textContent = gasto.descricao;

  const tdCategoria = document.createElement("td");
  const badge = document.createElement("span");
  badge.classList.add("badge", gasto.categoria);
  badge.textContent = nomesCategorias[gasto.categoria];
  tdCategoria.appendChild(badge);

  const tdValor = document.createElement("td");
  tdValor.classList.add("valor");
  tdValor.textContent = formatar(gasto.valor);

  const tdAcao = document.createElement("td");
  const botao = document.createElement("button");
  botao.type = "button";
  botao.classList.add("remover");
  botao.setAttribute("aria-label", "Remover " + gasto.descricao);
  botao.textContent = "Remover";
  tdAcao.appendChild(botao);

  tr.appendChild(tdDescricao);
  tr.appendChild(tdCategoria);
  tr.appendChild(tdValor);
  tr.appendChild(tdAcao);
  return tr;
}

function atualizarResumo() {
  const totais = {};
  for (const categoria in nomesCategorias) {
    totais[categoria] = 0;
  }

  let geral = 0;
  for (const gasto of gastos) {
    totais[gasto.categoria] += gasto.valor;
    geral += gasto.valor;
  }

  totalGeral.textContent = formatar(geral);
  for (const categoria in totais) {
    document.getElementById("total-" + categoria).textContent = formatar(
      totais[categoria],
    );
  }

  // Bônus B1: alerta de orçamento mensal
  if (orcamento > 0 && geral > orcamento) {
    blocoTotal.classList.add("estourou");
    avisoOrcamento.textContent =
      "Atenção: você ultrapassou o orçamento em " +
      formatar(geral - orcamento) +
      ".";
  } else {
    blocoTotal.classList.remove("estourou");
    avisoOrcamento.textContent = "";
  }
}

function renderizar() {
  listaGastos.textContent = "";

  const filtro = filtroCategoria.value;
  for (const gasto of gastos) {
    if (filtro === "" || gasto.categoria === filtro) {
      listaGastos.appendChild(criarLinha(gasto));
    }
  }

  vazio.classList.toggle("oculto", listaGastos.children.length > 0);
  atualizarResumo();
}

// ---------- Eventos ----------
form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const descricao = campoDescricao.value.trim();
  const textoValor = campoValor.value.trim();
  const categoria = campoCategoria.value;

  const problema = validar(descricao, textoValor, categoria);
  if (problema !== "") {
    mostrarMensagem(problema, "erro");
    return;
  }

  gastos.push({
    id: Date.now(),
    descricao: descricao,
    valor: Math.round(Number(textoValor) * 100) / 100,
    categoria: categoria,
  });

  salvar();
  renderizar();
  form.reset();
  campoDescricao.focus();
  mostrarMensagem("Gasto adicionado com sucesso!", "sucesso");
});

listaGastos.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".remover");
  if (!botao) {
    return;
  }

  const id = Number(botao.closest("tr").dataset.id);
  gastos = gastos.filter(function (gasto) {
    return gasto.id !== id;
  });

  salvar();
  renderizar();
});

filtroCategoria.addEventListener("change", renderizar);

campoOrcamento.addEventListener("input", function () {
  orcamento = Number(campoOrcamento.value) || 0;
  localStorage.setItem("orcamento", orcamento);
  atualizarResumo();
});

// ---------- Inicialização ----------
if (orcamento > 0) {
  campoOrcamento.value = orcamento;
}
renderizar();
