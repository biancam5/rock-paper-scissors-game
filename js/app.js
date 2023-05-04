const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resultText = document.querySelector(".result-message");
const resetBtn = document.getElementById("reset");
const eraseUserScoreBtn = document.getElementById("erase-user-score");
const eraseComputerScoreBtn = document.getElementById("erase-computer-score");

let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateScore() {
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
}

function checkWin(userChoice) {
  const computerChoice = getComputerChoice();

  switch (userChoice + computerChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      win(userChoice, computerChoice);
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      lose(userChoice, computerChoice);
      break;
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      draw(userChoice, computerChoice);
      break;
  }
}

function win(userChoice, computerChoice) {
  userScore++;
  updateScore();
  resultText.textContent = `${userChoice} beats ${computerChoice}. You Win!`;
  localStorage.setItem("resultMessage", resultText.textContent);
}

function lose(userChoice, computerChoice) {
  computerScore++;
  updateScore();
  resultText.textContent = `${computerChoice} beats ${userChoice}. You Lose!`;
  localStorage.setItem("resultMessage", resultText.textContent);
}

function draw(userChoice, computerChoice) {
  resultText.textContent = `${userChoice} equals ${computerChoice}. It's a Draw!`;
  localStorage.setItem("resultMessage", resultText.textContent);
}


function draw(userChoice, computerChoice) {
  resultText.textContent = `${userChoice} equals ${computerChoice}. It's a Draw!`;
}

choices.forEach((choice) => {
  const choiceEl = document.getElementById(choice);
  if (choiceEl) {
    choiceEl.addEventListener("click", () => {
      checkWin(choice);
    });
  }
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("userScore");
  localStorage.removeItem("computerScore");
  userScore = 0;
  computerScore = 0;
  updateScore();
  resultText.textContent = "Make your move!";
});

if (eraseUserScoreBtn) {
  eraseUserScoreBtn.addEventListener("click", () => {
    if (localStorage.getItem("userScore")) {
      localStorage.removeItem("userScore");
      userScore = 0;
      updateScore();
    }
  });
}

if (eraseComputerScoreBtn) {
  eraseComputerScoreBtn.addEventListener("click", () => {
    if (localStorage.getItem("computerScore")) {
      localStorage.removeItem("computerScore");
      computerScore = 0;
      updateScore();
    }
  });
}

window.addEventListener("load", () => {
  resultText.textContent = localStorage.getItem("resultMessage") || "Make your move!";
});

updateScore();
