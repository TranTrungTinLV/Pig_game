"use strict"
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //nhanh hơn 1 chút so với querySelector
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
let scores, currentScore, activePlayer, playing;

const init = function () {

    diceEl.classList.add('hidden');
    scores = [0, 0]; //điểm số hiện tại của 2 player

    currentScore = 0
    activePlayer = 0
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}


//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //Generally dice random
        const dice = Math.trunc(Math.random() * 6) + 1; // 1-6

        //display dice;
        diceEl.classList.remove('hidden');
        diceEl.src = `./images/dice-${dice}.png`;
        console.log(diceEl)

        //check for roll 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            document.querySelector('body').classList.add('backgournd');
          
            setTimeout(function () {
                document.querySelector('body').classList.remove("backgournd")
            }, 900)
            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function () {
    if (playing) {
        //Add current score to activePlayer score
        scores[activePlayer] += currentScore;
        //scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        //check player winner
        if (scores[activePlayer] >= 50) {
            playing = false;

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            //Switch player
            switchPlayer();
        }
    }



})
btnNew.addEventListener('click', init)
