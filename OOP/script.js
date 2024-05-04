'use strict';

{ // Log to the console cars' speed using function constructor. Coding Challenge #21
const Car = function(make, speed) {
	this.make = make;
	this.speed = speed;
}
Car.prototype.accelerate = function() {
	this.speed = this.speed + 10;
}
Car.prototype.brake = function() {
	this.speed = this.speed - 5;
	this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' speed:`, this.speed + 'km/h.') : console.log(`${this.make}'s speed:`, this.speed + 'km/h.');
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
console.log('BMW\'s speed: ', bmw.speed + 'km/h.');
bmw.brake();

mercedes.accelerate();
console.log(`${mercedes.make}\' speed: `, mercedes.speed + 'km/h.');
mercedes.brake();
}
{ // Coding Challenge #22 Getters, Setters and ES6 Classes
class Car {
	constructor(make, speed) {
		this.make = make;
		this.speed = speed;
	}

	showSpeed() {
		this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' speed:`, this.speed + 'km/h.') : console.log(`${this.make}'s speed:`, this.speed + 'km/h.');
	}
	showSpeedUS() {
		this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' speed:`, this.speedUS + 'mi/h.') : console.log(`${this.make}'s speed:`, this.speedUS + 'mi/h.');
	}
	accelerate() {
		this.speed = this.speed + 10;
		this.showSpeed();
	}
	brake() {
		this.speed = this.speed - 5;
		this.showSpeed();
	}

	get speedUS() {
		return this.speed / 1.609344;
	}
	set speedUS(miph) {
		this.speed = miph * 1.609344;
	}
}

const ford = new Car('Ford', 120);
ford.showSpeedUS();

ford.accelerate();
ford.brake();

const mercedes = Object.create(ford);
mercedes.make = 'Mersedes';
mercedes.speed = 95;

mercedes.showSpeedUS();

mercedes.speedUS = 60;
mercedes.showSpeed();
}
{ // Coding Challenge #23 Inheretance and Functional Constructor
const Car = function(make, speed) {
	this.make = make;
	this.speed = speed;
}
Car.prototype.showSpeed = function() {
	this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' speed:`, this.speed + 'km/h.') : console.log(`${this.make}'s speed:`, this.speed + 'km/h.');
}
Car.prototype.accelerate = function() {
	this.speed = this.speed + 10;
	this.showSpeed();
};
Car.prototype.brake = function() {
	this.speed = this.speed - 5;
	this.showSpeed();
};
const EV = function(make, speed, charge) {
	Car.call(this, make, speed);
	this.charge = charge;
}
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo) {
	this.charge = chargeTo;
	this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' charge is ${this.charge}%.`) : console.log(`${this.make}'s charge is ${this.charge}%.`);
};
EV.prototype.accelerate = function() {
	this.speed += 20;
	this.charge -= 1;
	console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%.`);
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
tesla.showSpeed();
}
{ // Coding Challenge #24 ES6 Classes, Private Fields and Chining Methods
class Car {
	constructor(make, speed) {
		this.make = make;
		this.speed = speed;
	}

	showSpeed() {
		this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' speed:`, this.speed + 'km/h.') : console.log(`${this.make}'s speed:`, this.speed + 'km/h.');

		return this;
	}
	showSpeedUS() {
		this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' speed:`, this.speedUS + 'mi/h.') : console.log(`${this.make}'s speed:`, this.speedUS + 'mi/h.');

		return this;
	}
	accelerate() {
		this.speed = this.speed + 10;
		this.showSpeed();

		return this;
	}
	brake() {
		this.speed = this.speed - 5;
		this.showSpeed();

		return this;
	}

	get speedUS() {
		return this.speed / 1.609344;
	}
	set speedUS(miph) {
		this.speed = miph * 1.609344;
	}
}
class EV extends Car {
	#charge;

	constructor(make, speed, charge) {
		super(make, speed);
		this.#charge = charge;
	}
	
	accelerate() {
		this.speed += 20;
		this.charge -= 1;
		console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%.`);

		return this;
	}

	chargeBattery(chargeTo) {
		this.#charge = chargeTo;
		this.make.charAt(this.make.length - 1) === 's' ? console.log(`${this.make}' charge is ${this.#charge}%.`) : console.log(`${this.make}'s charge is ${this.#charge}%.`);

		return this;
	}
}

const rivian = new EV('Rivian', 120, 23);

rivian.accelerate().chargeBattery(90).brake();
}