const snakes = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78
};

const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100
};

const players = [
  { name: "Red", color: "#ff5a5a", position: 0 },
  { name: "Blue", color: "#4da3ff", position: 0 },
  { name: "Green", color: "#41d67a", position: 0 },
  { name: "Yellow", color: "#f9d85c", position: 0 }
];

let currentPlayerIndex = 0;
let gameOver = false;

const boardEl = document.getElementById("board");
const turnEl = document.getElementById("turn");
const diceEl = document.getElementById("dice");
const messageEl = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const newGameBtn = document.getElementById("newGameBtn");

function buildBoard() {
  const rows = [];

  for (let row = 9; row >= 0; row--) {
    const values = [];
    const start = row * 10 + 1;
    const end = start + 9;

    if ((9 - row) % 2 === 0) {
      for (let n = end; n >= start; n--) {
        values.push(n);
      }
    } else {
      for (let n = start; n <= end; n++) {
        values.push(n);
      }
    }

    rows.push(values);
  }

  boardEl.innerHTML = "";

  rows.flat().forEach((cellNumber) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.cell = cellNumber;

    if (snakes[cellNumber]) cell.classList.add("snake-cell");
    if (ladders[cellNumber]) cell.classList.add("ladder-cell");

    const number = document.createElement("span");
    number.className = "cell-number";
    number.textContent = cellNumber;

    cell.appendChild(number);
    boardEl.appendChild(cell);
  });
}

function updateTurnDisplay() {
  turnEl.textContent = `Turn: ${players[currentPlayerIndex].name}`;
}

function renderTokens() {
  boardEl.querySelectorAll(".token").forEach((token) => token.remove());

  players.forEach((player) => {
    if (player.position <= 0) return;

    const cell = boardEl.querySelector(`[data-cell="${player.position}"]`);
    if (!cell) return;

    const token = document.createElement("div");
    token.className = "token";
    token.style.background = player.color;
    token.title = player.name;
    cell.appendChild(token);
  });
}

function movePlayer(player, steps) {
  const oldPosition = player.position;

  if (player.position + steps > 100) {
    return {
      success: false,
      message: `${player.name} rolled ${steps}, but needs an exact move to reach 100.`
    };
  }

  player.position += steps;

  if (player.position === 100) {
    gameOver = true;
    rollBtn.disabled = true;
    return {
      success: true,
      message: `${player.name} reached 100 and wins the game!`
    };
  }

  if (ladders[player.position]) {
    const next = ladders[player.position];
    player.position = next;
    return {
      success: true,
      message: `${player.name} climbed a ladder from ${oldPosition + steps} to ${next}!`
    };
  }

  if (snakes[player.position]) {
    const next = snakes[player.position];
    player.position = next;
    return {
      success: true,
      message: `${player.name} slid down a snake from ${oldPosition + steps} to ${next}!`
    };
  }

  return {
    success: true,
    message: `${player.name} moved from ${oldPosition || "start"} to ${player.position}.`
  };
}

function rollDice() {
  if (gameOver) return;

  const player = players[currentPlayerIndex];
  const roll = Math.floor(Math.random() * 6) + 1;
  diceEl.textContent = roll;

  const result = movePlayer(player, roll);
  renderTokens();

  if (!result.success) {
    messageEl.textContent = result.message;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateTurnDisplay();
    return;
  }

  if (gameOver) {
    messageEl.textContent = result.message;
    return;
  }

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  updateTurnDisplay();
  messageEl.textContent = `${result.message} ${players[currentPlayerIndex].name}'s turn.`;
}

function resetGame() {
  gameOver = false;
  players.forEach((player) => {
    player.position = 0;
  });

  currentPlayerIndex = 0;
  diceEl.textContent = "-";
  rollBtn.disabled = false;

  buildBoard();
  renderTokens();
  updateTurnDisplay();
  messageEl.textContent = "Red starts the game.";
}

newGameBtn.addEventListener("click", resetGame);
rollBtn.addEventListener("click", rollDice);

buildBoard();
renderTokens();
updateTurnDisplay();
