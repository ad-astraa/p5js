let board;
let cellSize;
let currentPlayer;
let winner;
let gameOver;
let restartButton;

function setup() {
  createCanvas(300, 300);
  cellSize = width / 3;
  resetGame();
}

function draw() {
  background(255);
  drawBoard();
  drawSymbols();
  checkWinner();
  if (gameOver && !restartButton) {
    createRestartButton();
  }
}

function drawBoard() {
  strokeWeight(4);
  stroke(0); // Set stroke color for board lines
  for (let i = 1; i < 3; i++) {
    line(i * cellSize, 0, i * cellSize, height);
    line(0, i * cellSize, width, i * cellSize);
  }
}

function drawSymbols() {
  textSize(32);
  strokeWeight(4);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = i * cellSize + cellSize / 2;
      let y = j * cellSize + cellSize / 2;
      let spot = board[i][j];
      let r = cellSize / 4;
      if (spot == 'X') {
        stroke(getRandomColor()); // Set random color for X
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      } else if (spot == 'O') {
        stroke(getRandomColor()); // Set random color for O
        noFill();
        ellipse(x, y, r * 2);
      }
    }
  }
}

function mousePressed() {
  if (gameOver) return;
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);
  if (board[i][j] == '') {
    board[i][j] = currentPlayer;
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    checkWinner();
  }
}

function checkWinner() {
  let result = null;
  for (let i = 0; i < 3; i++) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '') {
      result = board[i][0];
    }
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '') {
      result = board[0][i];
    }
  }

  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
    result = board[0][0];
  }
  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != '') {
    result = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (result == null && openSpots == 0) {
    result = 'tie';
    gameOver = true;
  } else if (result != null) {
    winner = result;
    gameOver = true;
  }
}

function createRestartButton() {
  restartButton = createButton('Restart Game');
  restartButton.position(width / 2 - restartButton.width / 2, height + 20);
  restartButton.mousePressed(resetGame);
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer = 'X';
  winner = null;
  gameOver = false;
  if (restartButton) {
    restartButton.remove();
    restartButton = null;
  }
  loop();
}

function getRandomColor() {
  return color(random(255), random(255), random(255));
}
