/* Amplitude Lesson 54 */
const temperature1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperature2 = [6, -9, 6, 20, 9, 6, 'error', -20, 5, 6, 8, 30, 1];

function calcAmplitude(temperature1, temperature2) {
	for(let i = 0; i < temperature2.length; i++) {
		temperature1[i+temperature1.length] = temperature2[i];
	} // Merge arrays. I could do this by the method ".concat()", but I decided do this by an algorithm. I think that the method ".concat()" works like this.

	let temperatures = temperature1; // Merge arrays.
	let maxTemperature = 0;
	let minTemperature = 0;
	let amplitude;

	if(temperatures.length <= 1) {
		return temperatures; // If array is too small.
	}

	for(let i = 0; i < temperatures.length; i++) {
		if(typeof temperatures[i] !== 'number') {
			continue; // Ignore error.
		}
		if(temperatures[i] < minTemperature) {
			minTemperature = temperatures[i]; // Find minimal value.
		}
		if(temperatures[i] > maxTemperature) {
			maxTemperature = temperatures[i]; // Find maximal value.
		}
	}

	return maxTemperature - minTemperature; // Return amplitude.
}

console.log('Tempelature amplitude: ' + calcAmplitude(temperature1, temperature2) + '.');