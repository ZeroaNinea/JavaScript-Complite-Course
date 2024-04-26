'use strict';

/* Soccer Game Event Map */

const gameEvents = new Map([
	[17, 'GOAL'],
	[36, 'Substitution'],
	[47, 'GOAL'],
	[61, 'Substitution'],
	[64, 'Yellow card'],
	[69, 'Red card'],
	[70, 'Substitution'],
	[72, 'Substitution'],
	[76, 'GOAL'],
	[80, 'GOAL'],
	[92, 'Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events); // The array with event types.

gameEvents.delete(64); // Delete the yellow card event from 64 minute.
console.log(gameEvents);

console.log(`An event happened, on average, every ${Array.from(gameEvents.keys()).pop() / gameEvents.size} munutes.`); // Average time of all game events.

for(const [key, value] of gameEvents.entries()) {
	key <= 45 ? console.log(`[FIRST HALF] ${key}: ${value}.`) : console.log(`[SECOND HALF] ${key}: ${value}.`);
} // Log to the console all events.