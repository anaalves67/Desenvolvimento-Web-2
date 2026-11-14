const express = require("express");
const app = express();
const PORTA = 3000;

// Array de dados com 10 receitas (id, nome, categoria, tempoPreparo e porcoes)
const receitas = [
  {
    id: 1,
    nome: "Baião de dois",
    categoria: "prato-principal",
    tempoPreparo: 50,
    porcoes: 6,
  },
  {
    id: 2,
    nome: "Tapioca com queijo coalho",
    categoria: "lanche",
    tempoPreparo: 10,
    porcoes: 1,
  },
  {
    id: 3,
    nome: "Pudim de leite condensado",
    categoria: "sobremesa",
    tempoPreparo: 60,
    porcoes: 8,
  },
  {
    id: 4,
    nome: "Carne de sol com macaxeira",
    categoria: "prato-principal",
    tempoPreparo: 40,
    porcoes: 4,
  },
  {
    id: 5,
    nome: "Bolo de rolo",
    categoria: "sobremesa",
    tempoPreparo: 45,
    porcoes: 10,
  },
  {
    id: 6,
    nome: "Cuscuz nordestino recheado",
    categoria: "lanche",
    tempoPreparo: 15,
    porcoes: 2,
  },
  {
    id: 7,
    nome: "Moqueca de arraia",
    categoria: "prato-principal",
    tempoPreparo: 55,
    porcoes: 5,
  },
  {
    id: 8,
    nome: "Cocada cremosa de forno",
    categoria: "sobremesa",
    tempoPreparo: 35,
    porcoes: 6,
  },
  {
    id: 9,
    nome: "Pão de queijo caseiro",
    categoria: "lanche",
    tempoPreparo: 30,
    porcoes: 12,
  },
  {
    id: 10,
    nome: "Caldo de feijão verde",
    categoria: "entrada",
    tempoPreparo: 25,
    porcoes: 4,
  },
];

// Middleware global de log registrado antes de todas as rotas
app.use((req, res, next) => {
  const horario = new Date().toLocaleTimeString("pt-BR");
  console.log(`[${horario}] ${req.method} ${req.url}`);
  next();
});

// Rota GET / - Mensagem de boas-vindas citando o nome da API
app.get("/", (req, res) => {
  res.send(
    "Bem-vindo(a) à API de Receitas Culinárias! Acesse /receitas para consultar o catálogo.",
  );
});

// Rota GET /receitas - Lista completa ou filtrada via query string
app.get("/receitas", (req, res) => {
  let resultado = [...receitas];

  // Filtro por categoria (Bônus: aceita maiúsculas e minúsculas)
  if (req.query.categoria) {
    const categoriaBuscada = req.query.categoria.toLowerCase();
    resultado = resultado.filter(
      (r) => r.categoria.toLowerCase() === categoriaBuscada,
    );
  }

  // Filtro numérico por tempo máximo de preparo (?tempoMax=30)
  if (req.query.tempoMax !== undefined) {
    const tempoMax = parseInt(req.query.tempoMax);
    if (isNaN(tempoMax) || tempoMax <= 0) {
      return res.status(400).json({
        erro: "O parâmetro tempoMax deve ser um número válido maior que zero",
      });
    }
    resultado = resultado.filter((r) => r.tempoPreparo <= tempoMax);
  }

  // Filtro numérico para limitar a quantidade de resultados (?limite=3)
  if (req.query.limite !== undefined) {
    const limite = parseInt(req.query.limite);
    if (isNaN(limite) || limite <= 0) {
      return res.status(400).json({
        erro: "O parâmetro limite deve ser um número válido maior que zero",
      });
    }
    resultado = resultado.slice(0, limite);
  }

  res.json(resultado);
});

// Requisito próprio: Rota extra para exibir o total de receitas cadastradas
app.get("/receitas/total", (req, res) => {
  res.json({ totalReceitas: receitas.length });
});

// Requisito próprio: Rota extra para sortear uma receita aleatória
app.get("/receitas/aleatoria", (req, res) => {
  const indiceSorteado = Math.floor(Math.random() * receitas.length);
  res.json(receitas[indiceSorteado]);
});

// Rota GET /receitas/:id - Busca uma receita específica pelo parâmetro de rota
app.get("/receitas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "O id informado deve ser um número" });
  }

  const receitaEncontrada = receitas.find((r) => r.id === id);

  if (!receitaEncontrada) {
    return res.status(404).json({ erro: "Receita não encontrada" });
  }

  res.json(receitaEncontrada);
});

// Inicialização do servidor na porta 3000
app.listen(PORTA, () => {
  console.log(`API de Receitas rodando em http://localhost:${PORTA}`);
});
