const emojis = ['❤️', '🌹', '🧸', '✨', '🌸', '🐻', '💐', '💞'];
const gameBoard = document.getElementById('memory-game');
let cards = [];
let flippedCard = null;
let matchedPairs = 0;

function createBoard() {
  const doubled = [...emojis, ...emojis];
  const shuffled = doubled.sort(() => 0.5 - Math.random());
  shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.emoji = emoji;
    card.innerHTML = '❓';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

function flipCard() {
  if (this.classList.contains('flip') || flippedCard === this) return;
  this.classList.add('flip');
  this.innerHTML = this.dataset.emoji;

  if (!flippedCard) {
    flippedCard = this;
  } else {
    if (flippedCard.dataset.emoji === this.dataset.emoji) {
      flippedCard = null;
      matchedPairs++;
      if (matchedPairs === emojis.length) {
        setTimeout(() => showFinalPage(), 1000);
      }
    } else {
      setTimeout(() => {
        flippedCard.classList.remove('flip');
        this.classList.remove('flip');
        flippedCard.innerHTML = '❓';
        this.innerHTML = '❓';
        flippedCard = null;
      }, 800);
    }
  }
}

function startSurprise() {
  document.getElementById('landing').classList.remove('active');
  document.getElementById('game').classList.add('active');
  createBoard();
}

function showFinalPage() {
  document.getElementById('game').classList.remove('active');
  document.getElementById('final').classList.add('active');
}
