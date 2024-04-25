'use strict';

/* Destructuring and Logical Asignment Operators */

function printGoals(players, goals) {
	console.log(`These players: ${players};\n scored so many goals: ${players.length}.`);
}

const game = {
	team1: 'Bayern Munich',
	team2: 'Borrussia Dortmund',
	players: [
		[
			'Neuer',
			'Pavard',
			'Martinez',
			'Alaba',
			'Davies',
			'Kimmich',
			'Goretzka',
			'Coman',
			'Muller',
			'Gnarby',
			'Lewandowski',
		],
		[
			'Burki',
			'Schulz',
			'Hummels',
			'Akanji',
			'Hakimi',
			'Weigl',
			'Witsel',
			'Hazard',
			'Brandt',
			'Sancho',
			'Gotze',
		],
	],
	score: '4:0',
	scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
	date: 'Nov 9th, 2037',
	odds: {
		team1: 1.33,
		x: 3.25,
		team2: 6.5,
	},
};

const [[...player1], [...player2]] = game.players;
const [[gk, ...fieldPlayers], []] = game.players;
const [...allPlayers] = game.players;
const playersFinal = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
const {team1, x: draw, team2} = game.odds;

console.log('First team: ', player1);
console.log('Second team: ', player2);
console.log(`Goal-keeper: ${gk}.`, 'All another players: ', fieldPlayers);
console.log('The all players of the each team: ', allPlayers);
console.log(playersFinal);
console.log(team1, draw, team2);
printGoals(game.scored, game.scored);
/* This is very similar to the formal logic and the discrete math. */
team1 < team2 && console.log('Team 1 will win.');
team1 > team2 && console.log('Team 2 will win.');