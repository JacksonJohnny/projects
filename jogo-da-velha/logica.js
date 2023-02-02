// Obtem referência ao tabuleiro e as células da tabela
const board = document.querySelector("#board");
const cells = document.querySelectorAll("td");

// Obtem referência ao botão de reinício
const restartButton = document.querySelector("#restart");

// Variável para armazenar o jogador atual
let currentPlayer = "X";

// Adiciona um ouvinte de eventos de clique na tabela
board.addEventListener("click", (event) => {
  // Obtem a célula que foi clicada
  const target = event.target;

  // Verifica se a célula clicada é uma célula válida (TD) e está vazia
  if (target.tagName === "TD" && target.textContent === "") {
    // Preenche a célula com o jogador atual
    target.textContent = currentPlayer;

    // Verifica se há um vencedor
    if (checkForWinner()) {
      // Mostra mensagem de alerta de vencedor e reinicia o jogo
      alert(`Player ${currentPlayer} wins!`);
      restart();
    } else if (checkForDraw()) {
      // Mostra mensagem de alerta de empate e reinicia o jogo
      alert("Draw!");
      restart();
    } else {
      // Alterna para o próximo jogador
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
});

// Adiciona um ouvinte de eventos de clique no botão de reinício
restartButton.addEventListener("click", restart);

// Função para verificar se há um vencedor
function checkForWinner() {
  // Array com as combinações vitoriosas
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Verifica cada combinação
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    // Verifica se as células da combinação estão preenchidas pelo mesmo jogador
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      // Se sim, há um vencedor
      return true;
    }
  }

  // Se não houver nenhuma combinação vitoriosa, não há vencedor
  return false;
}

// Função para verificar se há empate
function checkForDraw() {
  // Percorre todas as células
  for (let i = 0; i < cells.length; i++) {
    // Se ainda houver uma célula vazia, não há empate
    if (cells[i].textContent === "") {
      return false;
    }
  }

  // Se não houver nenhuma célula vazia, há empate
  return true;
}

// Função para reiniciar o jogo
function restart() {
  // Limpa o conteúdo de todas as células
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }

  // Define o jogador inicial como "X"
  currentPlayer = "X";
}