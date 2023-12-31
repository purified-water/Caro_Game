
let squares = Array.from(document.getElementsByClassName("square"));
let result = document.getElementById("result");
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const winningPos3x3 = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let isGameEnd = false;

const startGame = () => {
  squares.forEach((box) => box.addEventListener("click", squareClicked));
};

function squareClicked(e) {
  if (isGameEnd) {
    return;
  }
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    e.target.classList.add("active");

    if (playerWon() !== false) {
      result.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerWon();
      winning_blocks.map(
        (box) => (squares[box].style.backgroundColor = winnerIndicator)
      );
      isGameEnd = true;
      return;
    }
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}



function playerWon() {
  for (const condition of winningPos3x3) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}


// 
startGame();
