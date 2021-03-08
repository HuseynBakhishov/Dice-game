`use strict`;

let dice = document.querySelector(`.dice`);
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const scores = [0, 0];
const player0 = document.querySelector(`.player-0`);
const player1 = document.querySelector(`.player-1`);
const btnNew = document.querySelector(`.btn-new`);
const btnRoll = document.querySelector(`.btn-roll`);
const btnHold = document.querySelector(`.btn-hold`);

btnNew.addEventListener(`click`, resetGame);
btnRoll.addEventListener(`click`, diceRoll);
btnHold.addEventListener(`click`, holdScore);

function diceRoll() {
  if (playing) {
    //Generate random dice
    let randomDice = Math.floor(Math.random() * 6) + 1;

    //Display dice
    dice.classList.remove(`hidden`);
    dice.src = `dice-${randomDice}.png`;

    //Check if it is 1
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch to other player
      switchPlayer();
    }
  }
}

function holdScore() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      playing = false;
      dice.classList.add(`hidden`);
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add(`player-winner`);
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove(`player-active`);
    } else {
      switchPlayer();
    }
  }
}

function resetGame() {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  dice.classList.add(`hidden`);
  document.querySelector(`#score-0`).textContent = 0;
  document.querySelector(`#score-1`).textContent = 0;
  document.querySelector(`#current-0`).textContent = 0;
  document.querySelector(`#current-1`).textContent = 0;
  document.querySelector(`.player-0`).classList.add(`player-active`);
  document.querySelector(`.player-1`).classList.remove(`player-active`);
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove(`player-winner`);
}

function switchPlayer() {
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle(`player-active`);
  player1.classList.toggle(`player-active`);
}
