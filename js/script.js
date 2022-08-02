const figures = [
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

let sort = [];

let action = "start";

let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", () => {
  console.log(action);
  if (action == "start") {
    startGame();
    startBtn.textContent = "Finish";
  } else if (action == "finish") {
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

prepareGame();
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
    coincidences = false;

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
                <div class='card' id="${f.name}">
                    <div class="cardFace cardFaceFront" style="color: ${f.color}">${f.figure}</div>
                    <div class="cardFace cardFaceBack"></div>
                </div>
            </div>
        `;
  });
}

function startGame() {
  action = "finish";
  cards = document.querySelectorAll(".card");

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

  cards.forEach((card) => {
    card.classList.remove("flipped");

    card.classList.add("p-events-none");
  });

  startBtn.textContent = "Restart";
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

    cards.forEach((card) => {
      card.classList.add("p-events-none");
    });

    setTimeout(() => {
      checkTry();
    }, 700);
  }
}

function checkTry() {
  if (firstCard.id == secondCard.id) {
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
  if (successfulAttempts == 5) {
    successfulAttempts = 0;
    winMessage.style.display = "flex";
  }
}

function restartGame() {
  action = "start";

  startBtn.textContent = "Start";

  winMessage.style.display = "none";

  prepareGame();
}
