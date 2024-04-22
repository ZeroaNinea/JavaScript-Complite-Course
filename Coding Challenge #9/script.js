/* Coding Challenge #9 */
// In this task I just need to print the array elements to the console as a string.
const dataTemp1 = [];
const dataTemp2 = [];

function randomFillArray(arr) {
	for (var i = 0; i <= Math.floor(Math.random() * 15) + 1; i++) {
		let negPos = Math.floor(Math.random() * 2);
		if(negPos === 1) {
			arr[i] = Math.floor(Math.random() * 10) - 10;
		} else {
			arr[i] = Math.floor(Math.random() * 10);
		}
	}

	return arr;
}

randomFillArray(dataTemp1);
randomFillArray(dataTemp2);

function printForecast(dataTemp) {
	let dataString = '';

	for(let i = 0; i < dataTemp.length; i++) {
		if(i === 0) {
			dataString += `${dataTemp[i]}°C in ${i+1} day ... `;
		} else if(i === dataTemp.length - 1) {
			dataString += `${dataTemp[i]}°C in ${i+1} days.`;
		} else {
			dataString += `${dataTemp[i]}°C in ${i+1} days ... `;
		}
	}

	return dataString;
}

console.log(printForecast(dataTemp1));
console.log(printForecast(dataTemp2));