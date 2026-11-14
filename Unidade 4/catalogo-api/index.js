const express = require("express");
const app = express();

// Dados do catálogo de produtos
const produtos = [
  { id: 1, nome: "Teclado mecânico", categoria: "eletronicos", preco: 250 },
  { id: 2, nome: "Mouse sem fio", categoria: "eletronicos", preco: 90 },
  { id: 3, nome: "Monitor 24 polegadas", categoria: "eletronicos", preco: 900 },
  { id: 4, nome: "Cadeira gamer", categoria: "moveis", preco: 1200 },
  { id: 5, nome: "Mesa de escritório", categoria: "moveis", preco: 650 },
  { id: 6, nome: "Livro de JavaScript", categoria: "livros", preco: 80 },
  { id: 7, nome: "Livro de Node.js", categoria: "livros", preco: 95 },
  { id: 8, nome: "Fone de ouvido", categoria: "eletronicos", preco: 150 },
];

// Middleware de registro de requisições (antes de todas as rotas)
app.use((req, res, next) => {
  const hora = new Date().toLocaleTimeString("pt-BR");
  console.log("[" + hora + "] " + req.method + " " + req.url);
  next();
});

// Rota fixa de boas-vindas
app.get("/", (req, res) => {
  res.send("Catálogo no ar!");
});

// Rota de listagem de produtos com filtros via query string
app.get("/produtos", (req, res) => {
  let resultado = produtos;

  const categoria = req.query.categoria;
  if (categoria) {
    resultado = resultado.filter((p) => p.categoria === categoria);
  }

  if (req.query.limite !== undefined) {
    const limite = parseInt(req.query.limite);
    if (isNaN(limite) || limite < 1) {
      return res
        .status(400)
        .json({ erro: "O limite deve ser um número maior que zero" });
    }
    resultado = resultado.slice(0, limite);
  }

  res.json(resultado);
});

// Rota com parâmetro de rota para buscar um produto pelo id
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O id deve ser um número" });
  }

  const produto = produtos.find((p) => p.id === id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.json(produto);
});

// Inicialização do servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
