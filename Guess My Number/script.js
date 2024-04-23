'use strict';

function scoreDecrement() {
	scoreCount -= 1;
	score.textContent = scoreCount;
}

const check = document.getElementsByClassName('check')[0];
const guess = document.getElementsByClassName('guess')[0];
const message = document.getElementsByClassName('message')[0];
const number = document.getElementsByClassName('number')[0];
const score = document.getElementsByClassName('score')[0];
const again = document.getElementsByClassName('again')[0];
const highScore = document.getElementsByClassName('highscore')[0];

const body = document.getElementsByTagName('body')[0];

let scoreCount = 20;
let highScoreCount = 0;
let secretNumber = Math.floor(Math.random() * 20) + 1;

check.addEventListener('click', function() {
	if(!guess.value) {
		message.textContent = 'No Number!';
	} else if(Number(guess.value) === secretNumber) {
		message.textContent = 'Correct Number!';
		number.textContent = secretNumber;
		body.style.backgroundColor = '#60b347';
		number.style.width = '30rem';
		if(scoreCount > highScoreCount) {
			highScoreCount = scoreCount;
			highScore.textContent = highScoreCount;
		}
	} else if(Number(guess.value) !== secretNumber) {
		if(scoreCount > 1) {
			message.textContent = Number(guess.value) > secretNumber ? 'Too high!' : 'Too low!';
			scoreDecrement();
		} else {
			message.textContent = 'You lost the game!';
			score.textContent = 0;
		}
	}
});
again.addEventListener('click', function() {
	scoreCount = 20;
	score.textContent = scoreCount;
	number.style.width = '15rem';
	number.textContent = '?';
	secretNumber = Math.floor(Math.random() * 20) + 1;
	body.style.backgroundColor = '#222';
	guess.value = null;
	message.textContent = 'Start guessing...';
});