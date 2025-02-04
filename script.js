const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart-btn");

let cards = [];
let flippedCards = [];
let matchedCards = [];

// Create the cards for the game
function createCards() {
  const cardValues = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const cardPairs = [...cardValues, ...cardValues];
  
  cardPairs.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerText = "";
    card.addEventListener("click", flipCard);
    cards.push(card);
  });

  shuffleCards();
}

// Shuffle the cards and append to the game board
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
  cards.forEach(card => gameBoard.appendChild(card));
}

// Flip the card when clicked
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped") && !this.classList.contains("matched")) {
    this.classList.add("flipped");
    this.innerText = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if the two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
    }, 1000);
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert("Congratulations! You won the game!");
    }, 500);
  }
}

// Reset the game
function resetGame() {
  gameBoard.innerHTML = "";
  cards = [];
  flippedCards = [];
  matchedCards = [];
  createCards();
}

// Initialize the game
createCards();

// Add event listener for restart button
restartButton.addEventListener("click", resetGame);
