const cards = document.querySelectorAll('.memory');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = cards.length / 2; // Assuming pairs of cards

let timer; // Timer variable
let timeLeft = 90; // 1 minute 30 seconds
const timerDisplay = document.getElementById('timer'); 

function startTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(false); // Time up
        }
    }, 1000);
    
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first card flip
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // second card flip
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;

    resetBoard();

    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            endGame(true); // Win condition is met
        }, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function endGame(win) {
    alert(win ? "You won! All pairs matched!" : "Time's up! You lost!");
    location.reload();
}

(function shuffle() {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * cards.length);
        card.style.order = random;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
startTimer();
