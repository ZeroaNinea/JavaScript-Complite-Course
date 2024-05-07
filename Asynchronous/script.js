'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = '') {
	const html = `
		<article class="country ${className}">
			<img class="country__img" src="${data.flags.svg}"/>
			<div class="country__data">
				<h3 class="country__name">${Object.values(data.name.nativeName)[0].official}</h3>
				<h4 class="country__region">${data.region}</h4>
				<p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)} people</p>
				<p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
				<p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
			</div>
		</article>
	`;

	countriesContainer.insertAdjacentHTML('beforeend', html);
}

const renderError = function(msg) {
	countriesContainer.insertAdjacentText('beforeend', msg);
}

///////////////////////////////////////

// const getCountryData = function(country) {
// 	const request = new XMLHttpRequest();
// 	request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// 	request.send();

// 	request.addEventListener('load', function() {
// 		const [data] = JSON.parse(this.responseText);
// 		console.log(data);

// 		const html = `
// 			<article class="country">
// 				<img class="country__img" src="${data.flags.svg}"/>
// 				<div class="country__data">
// 					<h3 class="country__name">${Object.values(data.name.nativeName)[0].official}</h3>
// 					<h4 class="country__region">${data.region}</h4>
// 					<p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)} people</p>
// 					<p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
// 					<p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
// 				</div>
// 			</article>
// 		`;

// 		countriesContainer.insertAdjacentHTML('beforeend', html);
// 		countriesContainer.style.opacity = 1;
// 	});
// }

// const getCountryAndNeighbour = function(country) {
// 	// Ajax call country 1
// 	const request = new XMLHttpRequest();
// 	request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// 	request.send();

// 	request.addEventListener('load', function() {
// 		const [data] = JSON.parse(this.responseText);
// 		console.log(data);

// 		// Render country 1
// 		renderCountry(data);

// 		// Get neighbour country (2)
// 		const [neighbour] = data.borders;

// 		if(!neighbour) return;

// 		// Ajax call country 2
// 		const request2 = new XMLHttpRequest();
// 		request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
// 		request2.send();

// 		request2.addEventListener('load', function() {
// 			const [data2] = JSON.parse(this.responseText);
// 			console.log(data2);

// 			renderCountry(data2, 'neighbour');
// 		});
// 	});
// }

// getCountryAndNeighbour('portugal');

// const getCountryData = function(country) {
// 	const request = fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response) {
// 		console.log(response);
// 		return response.json();
// 	}).then(function(data) {
// 		renderCountry(data[0]);
// 	});
// }

const getJSON = function(url, errorMsg = 'Something went wrong') {
	return fetch(url).then(response => {
		if(!response.ok) throw new Error(`${errorMsg}`);

		return response.json();
	});
};

// const getCountryData = function(country) {
// 	// Country 1
// 	fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => {
// 		console.log(response);

// 		if(!response.ok)
// 			throw new Error(`Country not found ${response.status}.`);

// 		return response.json()
// 	}).then(data => {
// 		renderCountry(data[0]);
// 		const neighbour = Object.values(data[0].borders)[0];

// 		if(!neighbour) return;

// 		// Country 2
// 		return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
// 	}).then(response => {
// 		if(!response.ok)
// 			throw new Error(`Country not found(${response.status})`);

// 		return response.json();
// 	}).then(data => renderCountry(data[0], 'neighbour')).catch(err => renderError(`Something went wrong💥💥💥${err.message}. Try again!`)).finally(() => countriesContainer.style.opacity = 1);
// }

// const getCountryData = function(country) {
// 	// Country 1
// 	getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found').then(data => {
// 		renderCountry(data[0]);
// 		if(!data[0].borders) throw new Error('No neighbour found!');
// 		const neighbour = Object.values(data[0].borders)[0];
// 		// Country 2
// 		return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
// 	}).then(data => {
// 		const neighbour = data[0].borders[0];
// 		renderCountry(data[0], 'neighbour');
// 	}).catch(err => renderError(`Something went wrong💥💥💥${err.message}. Try again!`)).finally(() => countriesContainer.style.opacity = 1);
// }

let prohibit = false;

btn.addEventListener('click', function() {
	if(!prohibit) {
		// getCountryData('portugal');
		// whereAmI(52.508, 13.381);
		whereAmI(19.037, 72.873);
		whereAmI(-33.933, 18.474);
		whereAmI(59695, 654);
		whereAmI(39.019444, 125.738052);
		prohibit = true;
	} else {
		return;
	}
});

const whereAmI = function(lat, lng) {
	fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=1013834862828061595x76431`).then(response => {
		if(!response) {
			throw new Error('Error! Geocode API didn\'t response.', response.status);
		}

		return response.json();
	}).then(data => {
		if(!data.city || !data.country) {
			throw new Error('Error! There is no data about "city" or "country".', data.status);
		}
		console.log(`You are in ${data.city} ${data.country}.`);

		return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
	}).then(response => {
		if(!response.ok) {
			throw new Error('Error. Restcountries didn\'t response!', response.status);
		}

		return response.json();
	}).then(data => renderCountry(data[0])).catch(err => console.error(err)).finally(() => countriesContainer.style.opacity = 1);
}

const latteryPromise = new Promise(function(resolve, reject) {
	console.log('Lotter draw is happening 🔮');
	setTimeout(function() {
		if(Math.random() >= 0.5) {
			resolve('You WIN 💰');
		} else {
			reject(new Error('You lost your money 💩'));
		}
	}, 2000);
});

latteryPromise.then(res => console.log(res)).catch(err => console.error(err));

{ // Promisifying setTimeout
// const wait = function(seconds) {
// 	return new Promise(function(resolve) {
// 		setTimeout(resolve, seconds * 1000);
// 	});
// }
// wait(2).then(() => {
// 	console.log('I waited for 2 seconds');

// 	return wait(1);
// }).then(() => console.log('I waited for 1 second'));
}
{ // Promisifying the Geolocation API Lecture 244
const getPosition = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}
const whereAmI2 = function() {
	getPosition().then(pos => {
		const { latitude: lat, longitude: lng } = pos.coords;

		return fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=1013834862828061595x76431`);
	}).then(response => {
		if(!response.ok) {
			throw new Error('Error! Geocode API didn\'t response.', response.status);
		}

		return response.json();
	}).then(data => {
		if(!data.city.ok || !data.country.ok) {
			throw new Error('Error! There is no data about "city" or "country".', data.status);
		}
		console.log(`You are in ${data.city} ${data.country}.`);

		return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
	}).then(response => {
		if(!response.ok) {
			throw new Error('Error. Restcountries didn\'t response!', response.status);
		}

		return response.json();
	}).then(data => renderCountry(data[0])).catch(err => console.error(err)).finally(() => countriesContainer.style.opacity = 1);
}

// whereAmI2();

// getPosition().then(pos => console.log(pos));
}
{ // Coding Challenge #26 Show Images
// function wait(t) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, 1000 * t);
// 	});
// }

// const createImage = function(imgPath) {
// 	return new Promise((resolve, reject) => {
// 		const img = document.createElement('img');
// 		img.setAttribute('src', imgPath);

// 		img.addEventListener('load', function() {
// 			document.querySelector('div.images').appendChild(img);
// 			resolve(img);
// 		});

// 		img.addEventListener('error', function() {
// 			reject(new Error('There is no image'));
// 		});
// 	});
// }

// let currentImg;

// createImage('https://images.freeimages.com/images/large-previews/c31/colors-1383652.jpg?fmt=webp&h=350').then(img => {
// 	currentImg = img;
// 	console.log('Image 1 loaded');

// 	return wait(2);
// }).then(() => {
// 	currentImg.style.display = 'none';

// 	return createImage('img/img-2.jpg');
// }).then(img => {
// 	currentImg = img;
// 	console.log('Image 2 loaded');

// 	return wait(2);
// }).then(() => {
// 	currentImg.style.display = 'none';
// }).catch(err => console.log(err));
}
{ // Asysc Await
// const getPosition = function() {
// 	return new Promise(function(resolve, reject) {
// 		navigator.geolocation.getCurrentPosition(resolve, reject);
// 	});
// }

// const whereAmI = async function(country) {
// 	// Geolocation
// 	const pos = await getPosition();
// 	const { latitude: lat, longitude: lng } = pos.coords;

// 	// Reverse geocoding
// 	const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=1013834862828061595x76431`);
// 	const dataGeo = await resGeo.json();
// 	console.log(dataGeo);

// 	// Country data
// 	const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
// 	const data = await res.json();
// 	console.log(data);
// 	renderCountry(data[0]);
// }
// whereAmI();
// console.log('first');
}
{ // Coding Challenge #27 Loading Images by an Async Function
const createImage = function(imgPath) {
	return new Promise((resolve, reject) => {
		const img = document.createElement('img');
		img.setAttribute('src', imgPath);

		img.addEventListener('load', function() {
			document.querySelector('div.images').appendChild(img);
			resolve(img);
		});

		img.addEventListener('error', function() {
			reject(new Error('There is no image'));
		});
	});
}

const loadAll = async function(imgArr) {
	try {
		const imgs = imgArr.map(async img => await createImage(img));
		const imgsEl = await Promise.all(imgs);
		console.log(imgsEl);
		imgsEl.map(img => img.classList.add('paralell'));
	} catch(err) {
		console.error(err);
	}
}
loadAll(['/img/img-1.jpg', '/img/img-2.jpg', '/img/img-3.jpg']);
}
