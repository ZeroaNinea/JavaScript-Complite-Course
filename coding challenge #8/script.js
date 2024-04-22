const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 85, 52];
let tips = [];
let totals = [];

function calcTip(calcBills) {
	let calcTips;
	calcBills >= 50 && calcBills <= 300 ? tips.push(calcTips = calcBills * 0.15) : tips.push(calcTips = calcBills * 0.2);
	totals.push(calcTips + calcBills);
}
function calcAverage(arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}

	return sum / arr.length;
}

for(let i = 0; i < bills.length; i++) {
	result = calcTip(bills[i]);
}

console.log(bills);
console.log(tips);
console.log(totals);
console.log(calcAverage(totals));