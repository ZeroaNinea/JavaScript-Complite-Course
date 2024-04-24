'use strict';

// Selecting elemnts
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.getElementsByClassName('dice')[0];
const btnNew = document.getElementsByClassName('btn--new')[0];
const btnRoll = document.getElementsByClassName('btn--roll')[0];
const btnHold = document.getElementsByClassName('btn--hold')[0];
const player0El = document.getElementsByClassName('player--0')[0];
const player1El = document.getElementsByClassName('player--1')[0];

// Starting conditions

const init = function() {
	scores = [0, 0];
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	playing = true;
	currentScore = 0;

	diceEl.classList.add('hidden');

	for(let i = 0; i < scores.length; i++) {
		scores[i] = 0;
	}

	if(player0El.classList.contains('player--winner')) {
		player0El.classList.remove('player--winner');
	} else {
		player1El.classList.remove('player--winner');
	}

	activePlayer = Math.trunc(Math.random() * 2);
	if(activePlayer === 0) {
		player0El.classList.add('player--active');
		player1El.classList.remove('player--active');
	} else {
		player1El.classList.add('player--active');
		player0El.classList.remove('player--active');
	}
	// I just want to do this with the method "random".
	// document.getElementsByClassName(`player--${activePlayer}`)[0].classList.toggle('player--active');
}

let scores, currentScore, activePlayer, playing;
init();

const switchPlayer = function() {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
	if(playing) {
		// Generating a random dice roll.
		const dice = Math.floor(Math.random() * 6) + 1;

		// Display dice.
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		// Check for rolled 1.
		if(dice !== 1) {
			// Add dice to current score.
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		} else {
			// Switch to next player.
			switchPlayer();
		}
	}
});
btnHold.addEventListener('click', function() {
	if(document.getElementById(`current--${activePlayer}`).textContent != 0) {
		if(playing) {
			// Add current score to active player's score.
			scores[activePlayer] += currentScore;
			// Scores[1] = scores[1] + currentScore.
			document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

			// Check if player's score is >= 100.
			if(scores[activePlayer] >= 100) {
				// Finish the game.
				playing = false;
				diceEl.classList.add('hidden');

				document.getElementsByClassName(`player--${activePlayer}`)[0].classList.add('player--winner');
				document.getElementsByClassName(`player--${activePlayer}`)[0].classList.remove('player--active');
			} else {
				// Switch to the next player.
				switchPlayer();
			}
		}
	}
});
// Rest the Game
btnNew.addEventListener('click', init);