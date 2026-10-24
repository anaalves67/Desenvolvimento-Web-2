// Importação do módulo prompt-sync para leitura de dados no terminal (Node.js)
const prompt = require("prompt-sync")();

console.log("====================================================");
console.log("   ATIVIDADE 1 - DESENVOLVIMENTO WEB 2 (IFCE)       ");
console.log("====================================================\n");

// ============================================================================
// 1. AVALIAÇÃO DE RISCO DE CRÉDITO
// ============================================================================
console.log("--- 1. Avaliação de Risco de Crédito ---");

function avaliarRiscoDeCredito(rendaMensal, dividaAtual) {
  // 1. Converter ambos os parâmetros recebidos (strings) para números usando parseFloat
  const renda = parseFloat(rendaMensal);
  const divida = parseFloat(dividaAtual);

  // 2 e 3. Calcular a Taxa de Endividamento (TE): TE = (dividaAtual / rendaMensal) * 100
  const TE = (divida / renda) * 100;

  // 4 e 5. Retornar a mensagem de classificação de risco conforme a tabela
  if (TE < 10) {
    return "Risco Baixo";
  } else if (TE >= 10 && TE < 30) {
    return "Risco Moderado";
  } else {
    return "Risco Alto";
  }
}

// Solicita os valores de renda mensal e dívida atual diretamente do usuário no terminal
const rendaInput = prompt("Informe a sua renda mensal (ex: 3500.00): ");
const dividaInput = prompt("Informe a sua dívida atual (ex: 700.00): ");

// Chama a função e exibe o resultado utilizando Template Literals (crase e ${})
const classificacaoRisco = avaliarRiscoDeCredito(rendaInput, dividaInput);
console.log(`Resultado da análise: ${classificacaoRisco}\n`);

// ============================================================================
// 2. MANIPULAÇÃO DE ARRAY COM MÉTODOS DE ARRAY
// ============================================================================
console.log("--- 2. Manipulação de Array ---");

const numeros = [];
let continuar = true;

// Recebe do usuário quantos números ele quiser
while (continuar) {
  const entrada = prompt(
    "Digite um número para adicionar ao array (ou 'parar' para encerrar): ",
  );

  if (entrada.toLowerCase() === "parar" || entrada.trim() === "") {
    if (numeros.length === 0) {
      console.log("Adicione pelo menos um número antes de encerrar!");
      continue;
    }
    continuar = false;
  } else {
    const numeroConvertido = parseFloat(entrada);
    if (!isNaN(numeroConvertido)) {
      numeros.push(numeroConvertido);
    } else {
      console.log("Entrada inválida! Por favor, digite um número válido.");
    }
  }
}

console.log(`Array original: [${numeros.join(", ")}]`);

// a) Exiba o maior e o menor valor do array (usando Math.max(...array) e Math.min(...array))
const maiorValor = Math.max(...numeros);
const menorValor = Math.min(...numeros);
console.log(`a) Maior valor: ${maiorValor} | Menor valor: ${menorValor}`);

// b) Crie um novo array chamado dobro com o dobro de cada número (usando map())
const dobro = numeros.map((num) => num * 2);
console.log(`b) Array dobro: [${dobro.join(", ")}]`);

// c) Filtre e exiba apenas os números maiores que 5 do array original (usando filter())
const maioresQueCinco = numeros.filter((num) => num > 5);
console.log(`c) Números maiores que 5: [${maioresQueCinco.join(", ")}]\n`);

// ============================================================================
// 3. CRIAÇÃO E MANIPULAÇÃO DE OBJETO (SEM CLASSE)
// ============================================================================
console.log("--- 3. Criação e Manipulação de Objeto (Literal) ---");

const carro = {
  marca: "Ford",
  modelo: "Fiesta",
  ano: 2011,
  exibirInfo: function () {
    console.log(
      `Marca: ${this.marca} | Modelo: ${this.modelo} | Ano: ${this.ano}`,
    );
  },
};

// a) Chame o método exibirInfo()
console.log("a) Chamando carro.exibirInfo():");
carro.exibirInfo();

// b) Adicione dinamicamente uma nova propriedade chamada cor com o valor "Preto"
carro.cor = "Preto";

// c) Atualize o valor de ano para o ano atual (2025)
carro.ano = 2025;

// d) Exiba o objeto completo no console para verificar as alterações
console.log("d) Objeto carro atualizado:");
console.log(carro);
console.log("");

// ============================================================================
// 4. ORIENTAÇÃO A OBJETOS (COM CLASSE E INSTÂNCIA) - NÃO OBRIGATÓRIO
// ============================================================================
console.log("--- 4. Orientação a Objetos (Classe Livro) ---");

class Livro {
  constructor(titulo, autor, ano) {
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
  }

  detalhes() {
    console.log(
      `Livro: ${this.titulo} | Autor: ${this.autor} | Ano: ${this.ano}`,
    );
  }
}

// a) Crie duas instâncias da classe Livro, com dados diferentes
const livro1 = new Livro(
  "JavaScript: O Guia Definitivo",
  "David Flanagan",
  2012,
);
const livro2 = new Livro(
  "Programação Web com Node e Express",
  "Ethan Brown",
  2020,
);

// b) Chame o método detalhes() para ambos os livros
livro1.detalhes();
livro2.detalhes();
console.log("");

// ============================================================================
// 5. LAÇOS, CONDICIONAIS E MANIPULAÇÃO DE STRING
// ============================================================================
console.log("--- 5. Manipulação de String e Palíndromo ---");

// Peça ao usuário que informe uma palavra
const palavra = prompt("Informe uma palavra: ");

// a) Exiba a quantidade de caracteres da palavra
console.log(`a) A palavra "${palavra}" possui ${palavra.length} caracteres.`);

// b) Verifique se a palavra é um palíndromo usando split(''), reverse() e join('')
const palavraLimpa = palavra.trim().toLowerCase();
const palavraInvertida = palavraLimpa.split("").reverse().join("");

if (palavraLimpa === palavraInvertida && palavraLimpa.length > 0) {
  console.log(`b) A palavra "${palavra}" É um palíndromo!`);
} else {
  console.log(
    `b) A palavra "${palavra}" NÃO é um palíndromo (ao contrário fica "${palavraInvertida}").`,
  );
}
