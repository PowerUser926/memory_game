const easyLevel = [
  { name: "star", figure: "&#9733;", color: "#f9db04" },
  { name: "star", figure: "&#9733;", color: "#f9db04" },
  { name: "square", figure: "&#9632;", color: "#41a541" },
  { name: "square", figure: "&#9632;", color: "#41a541" },
  { name: "heart", figure: "&#9829;", color: "#fb5050" },
  { name: "heart", figure: "&#9829;", color: "#fb5050" },
  { name: "circle", figure: "&#9679;", color: "#138cf3" },
  { name: "circle", figure: "&#9679;", color: "#138cf3" },
  { name: "triangle", figure: "&#9650;", color: "#d17283" },
  { name: "triangle", figure: "&#9650;", color: "#d17283" },
];

const hardLevel = [
  { name: "star", figure: "&#9733;", color: "#f9db04" },
  { name: "star", figure: "&#9733;", color: "#f9db04" },
  { name: "square", figure: "&#9632;", color: "#41a541" },
  { name: "square", figure: "&#9632;", color: "#41a541" },
  { name: "heart", figure: "&#9829;", color: "#fb5050" },
  { name: "heart", figure: "&#9829;", color: "#fb5050" },
  { name: "circle", figure: "&#9679;", color: "#138cf3" },
  { name: "circle", figure: "&#9679;", color: "#138cf3" },
  { name: "triangle", figure: "&#9650;", color: "#d17283" },
  { name: "triangle", figure: "&#9650;", color: "#d17283" },
  { name: "spades", figure: "&#9824;", color: "#461a24" },
  { name: "spades", figure: "&#9824;", color: "#461a24" },
  { name: "clubs", figure: "&#9827;", color: "#28908b" },
  { name: "clubs", figure: "&#9827;", color: "#28908b" },
  { name: "diams", figure: "&#9830;", color: "#e69a49" },
  { name: "diams", figure: "&#9830;", color: "#e69a49" },
  { name: "horse", figure: "&#9822;", color: "#000000" },
  { name: "horse", figure: "&#9822;", color: "#000000" },
  { name: "umbrella", figure: "&#9730;", color: "#651acd" },
  { name: "umbrella", figure: "&#9730;", color: "#651acd" },
];

let figures = [];

let sort = [];

let action = "start";

let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", () => {
  if (action === "start") {
    startGame();
    startBtn.textContent = "Finish";
  } else if (action === "finish") {
    finishGame();
    startBtn.textContent = "Restart";
  } else {
    restartGame();
  }
});

let cards;

let firstCard = "";
let secondCard = "";

let successfulAttempts = 0;

let winMessage = document.querySelector(".winMessage");
let loseMessage = document.querySelector(".loseMessage");

let difficultyBlock = document.querySelector(".difficulty");
let difficultSwitcher = document.querySelector(".switcherPoint");

let selectDifficult = "";

setDifficult("easy");
function setDifficult(difficult) {
  if (selectDifficult != difficult) {
    selectDifficult = difficult;
  } else {
    return;
  }

  if (difficult === "easy") {
    difficultSwitcher.classList.remove("diffHard");
    figures = easyLevel;
    prepareGame();
  } else if (difficult === "hard") {
    difficultSwitcher.classList.add("diffHard");
    figures = hardLevel;
    prepareGame();
  }
}

function prepareGame() {
  sort = [];
  firstCard = "";
  secondCard = "";
  successfulAttempts = 0;

  do {
    getRandomNumber();
  } while (sort.length < figures.length);
  {
    renderCards();
  }
}

function getRandomNumber() {
  if (sort.length < figures.length) {
    let n = Math.round(Math.random() * (figures.length - 1));
    sortCards(n);
  }
}

function sortCards(n) {
  if (sort.length === 0) {
    sort.push(n);
  } else {
    let coincidences = false;

    sort.forEach((s) => {
      if (s === n) {
        coincidences = true;
      }
    });

    if (!coincidences) {
      sort.push(n);
    } else {
      getRandomNumber();
    }
  }
}

function renderCards() {
  let playField = document.querySelector(".playField");
  playField.innerHTML = "";

  sort.forEach((i) => {
    let f = figures[i];

    playField.innerHTML += `
            <div class="cardWrap">
                <div class='card flipped' id="${f.name}">
                    <div class="cardFace cardFaceFront" style="color: ${f.color}">${f.figure}</div>
                    <div class="cardFace cardFaceBack"></div>
                </div>
            </div>
        `;
  });

  setTimeout(() => {
    cards = document.querySelectorAll(".card");

    cards.forEach((c) => {
      c.classList.remove("flipped");
    });
  }, 200);
}

function startGame() {
  action = "finish";
  cards = document.querySelectorAll(".card");

  difficultyBlock.classList.add("p-events-none");

  cards.forEach((card) => {
    card.classList.add("flipped");

    card.addEventListener("click", () => {
      showCard(card);
    });
  });
}

function finishGame() {
  action = "restart";
  cards = document.querySelectorAll(".card");

  setTimeout(() => {
    loseMessage.style.display = "flex";
  }, 300);
  setTimeout(() => {
    loseMessage.style.display = "none";

    cards.forEach((card) => {
      card.classList.remove("flipped");

      card.classList.add("p-events-none");
    });

    startBtn.textContent = "Restart";
  }, 2300);
}

function showCard(card) {
  card.classList.remove("flipped");

  gameTry(card);
}

function gameTry(card) {
  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;

    cards.forEach((c) => {
      c.classList.add("p-events-none");
    });

    setTimeout(() => {
      checkTry();
    }, 700);
  }
}

function checkTry() {
  if (firstCard.id === secondCard.id) {
    successfulTry();
  } else {
    failedTry();
  }
}

function successfulTry() {
  successfulAttempts += 1;
  checkSuccessfulAttempts();

  cards.forEach((card) => {
    card.classList.remove("p-events-none");
  });

  firstCard.classList.add("p-events-none");
  secondCard.classList.add("p-events-none");

  firstCard = "";
  secondCard = "";
}

function failedTry() {
  cards.forEach((card) => {
    card.classList.remove("p-events-none");
  });

  firstCard.classList.add("flipped");
  secondCard.classList.add("flipped");

  firstCard = "";
  secondCard = "";
}

function checkSuccessfulAttempts() {
  if (successfulAttempts === figures.length / 2) {
    successfulAttempts = 0;
    setTimeout(() => {
      winMessage.style.display = "flex";
    }, 500);
  }
}

function restartGame() {
  action = "start";

  startBtn.textContent = "Start";

  difficultyBlock.classList.remove("p-events-none");

  winMessage.style.display = "none";

  prepareGame();
}
