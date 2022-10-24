"use strict";

// Global variables
const MAX_POINT = 100;
let totalScore = 0;
let currentScore = 0;
let currentPlayer = 0;

// Select elements
const imgDice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const getPlayerElement = (player) => document.querySelector(`.player--${player}`);
const getTotalScoreElement = (player) => document.querySelector(`#score--${player}`);
const getCurrentScoreElement = (player) => document.querySelector(`#current--${player}`);

// Switch player
const switchPlayer = () => {
  const currentActivePlayer = getPlayerElement(currentPlayer);
  currentPlayer = currentPlayer ? 0 : 1;
  const nextActivePlayer = getPlayerElement(currentPlayer);
  currentActivePlayer.classList.remove("player--active");
  nextActivePlayer.classList.add("player--active");
};

// Set score to 0
const resetCurrentScore = () => {
  currentScore = 0;
  getCurrentScoreElement(0).innerText = 0;
  getCurrentScoreElement(1).innerText = 0;
};

const resetTotalScore = () => {
  totalScore = 0;
  getTotalScoreElement(0).innerText = 0;
  getTotalScoreElement(1).innerText = 0;
};

// Starting conditions
const resetGame = () => {
  resetTotalScore();
  resetCurrentScore();
  imgDice.classList.add("hidden");
  // Set currentPlayer to 1 so that we can switch to player 0 as the starting conditions
  currentPlayer = 1;
  switchPlayer();
  document.querySelector("#name--0").innerText = "Player 1";
  document.querySelector("#name--1").innerText = "Player 2";
  btnHold.disabled = false;
  btnRoll.disabled = false;
};

// Set the game to starting state at the first time launching the web
resetGame();

// Reset game
btnNew.addEventListener("click", () => {
  getPlayerElement(currentPlayer).classList.remove("player--winner");
  resetGame();
});

// Roll the dice and display it
const getRandomNumber = () => Math.floor(Math.random() * 6 + 1);
btnRoll.addEventListener("click", () => {
  // Generate random number for dice
  const dice = getRandomNumber();
  // Display the dice image corresponding to the dice number
  imgDice.src = `./dice-${dice}.png`;
  imgDice.classList.remove("hidden");
  // Check switch player condition
  if (dice === 1) {
    resetCurrentScore();
    switchPlayer();
  }
  // Otherwise, add to current score
  else {
    currentScore += dice;
    getCurrentScoreElement(currentPlayer).innerText = currentScore;
  }
});

// Hold score
btnHold.addEventListener("click", () => {
  // Add to current score
  const currentPlayerTotalScore = getTotalScoreElement(currentPlayer);
  totalScore = Number(currentPlayerTotalScore.innerText);
  totalScore += currentScore;
  currentPlayerTotalScore.innerText = totalScore;
  // Check if total score is >= 100. If so, finish the game
  if (totalScore >= MAX_POINT) {
    document.querySelector(`#name--${currentPlayer}`).innerText = `Wins!`;
    getPlayerElement(currentPlayer).classList.add("player--winner");
    imgDice.classList.add("hidden");
    btnHold.disabled = true;
    btnRoll.disabled = true;
  }
  // Otherwise, switch player
  else {
    switchPlayer();
  }
  // No matter which condition matches, we will reset the current score to 0
  resetCurrentScore();
});
