'use strict';

/* textarea Coding Challenge #14 */

// This program receiving a list of variable names written in underscore case and converting them to camelCase.

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () => {
	const text = document.querySelector('textarea').value;
	const splitArr = text.toLowerCase().split(/[\n_]/);

	let camalCaseArr = [];
	let camalCase = '';
	for(let i = 0; i < splitArr.length; i++) {
		camalCaseArr[i] = splitArr[i];
		if(i % 2 !== 0) {
			camalCaseArr[i] = splitArr[i].toUpperCase().slice(0, 1) + splitArr[i].slice(1);
			camalCase += camalCaseArr[i-1] + camalCaseArr[i] + ' ';
		}
	}
	let camalCaseAst = camalCase.split(' ');
	camalCaseAst.pop();
	for(let i = 0; i < camalCaseAst.length; i++) {
		console.log(camalCaseAst[i].padEnd(20) + '*'.repeat(i+1) + '\n');
	}
});
/* Values for this algorithm.

underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure

*/