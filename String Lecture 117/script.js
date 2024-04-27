'use strict';

/* String Lecture 117 */

// I failed this task. At first I tried to do this in very strange ways, but already I understand that for working with strings better to use destructuring and "for of" loop.

const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for(const flight of flights.split('+')) {
	const [type, from, to, time] = flight.split(';');
	const output = `${type.startsWith('_Delayed') ? ' * ' : ''}${type.replaceAll('_', ' ')} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
	console.log(output);
}

// const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30'.split(/[_+;]/);

// console.log(flights);

// for(let i = 0; i < flights.length; i++) {
// 	if(flights[i] === '') {
// 		flights.splice(i, 1);
// 	}
// 	if(/\d/.test(flights[i]) && !flights[i].includes(':')) {
// 		flights[i] = flights[i].replace(/[0-9]/g, '').toUpperCase();
// 	} else if(/\d/.test(flights[i]) && flights[i].includes(':')) {
// 		flights[i] = '(' + flights[i].replace(':', 'h') + ')';
// 	} else if(flights[i] === 'Delayed') {
// 		flights[i] = ' * ' + flights[i];
// 	}
// }
// for(let i = 0; i < flights.length; i++) {
// 	if(flights.length === '') {
// 		flights.splice(i, 1);
// 	}
// }
// for(let i = 0; i < flights.length; i++) {
// 	if(flights[i].includes('(')) {
// 		flights.splice(i-1, 0, 'to');
// 	}
// }
// console.log(flights);

/*
* Delayed Departure from FAO to TXL (11h25)
			Arrival from BRU to FAO (11h45)
* Delayed Arrival from HEL to FAO (12h05)
			Departure from FAO to LIS (12h30)
*/