'use strict';

/* Poll Coding Challenge #15 */

// This algorithm moves a selected object to the start of the array.

function displayResults(arr) {
	console.log('Results:\n', arr);
}

const poll = {
	question: 'What is your favourite programming language?',
	options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
	answers: new Array(4).fill(0),

	registerNewAnswer () {
		let question = this.question + '\n';
		for(const [key, value] of this.options.entries()) { // Create a question.
			if(key === this.options.length - 1) {
				question += value + '\n(Write option number)';
			} else {
				question += value + '\n';
			}
		}
		this.answers = prompt(question); // Show the question by a prompt.

		if(/^\d+$/.test(this.answers) && this.answers <= this.options.length - 1 && this.answers >= 0) { // Check if answer is valid.
			this.options.unshift(this.options[this.answers]); // Add selected element to the start of the array.
			this.options.splice(Number(this.answers) + 1, 1); // Delete old element.

			for(const [key, value] of this.options.entries()) { // Change the numbers in the start of the strings.
				this.options[key] = this.options[key].replace(this.options[key].charAt(0), key);
			}
			this.results = this.options;

			displayResults.call(this, this.results); // Show changed array.
		} else {
			console.error('Invalid input!'); // If input is invalid.
		}
	}
}

document.querySelector('[data-prompt-btn]').addEventListener('click', function() { // Event handler for button.
	poll.registerNewAnswer(); // Show results.
});

displayResults.call(poll, {answers: [5, 2, 3]});
displayResults.call(poll, {answers: [1, 5, 3, 9, 6, 1]});
