'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int, i, arr) => int >= 1).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}

const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}
createUsernames(accounts);

const updateUI = function(acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
}

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent form from submiting.
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Update UI.
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer.
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI.
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(currentAccount.pin === Number(inputClosePin.value) && currentAccount.username === inputCloseUsername.value) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

{ // Coding Challenge #17 Check Dogs Age.
  const dogsJulia = [3, 5, 2, 12, 7];
  const dogsKate = [4, 1, 15, 8, 3];

  function checkDogs(dogsJulia, dogsKate) {
    dogsJulia.shift(); // These elements were deleted because they was cats.
    dogsJulia.splice(dogsJulia.length - 2); // These elements were deleted because they was cats.

    const dogsArr = dogsKate.concat(dogsJulia);

    for(const [key, value] of dogsArr.entries()) {
      if(value < 3) {
        console.log(`Dog number ${key} is sill a puppy, and is ${value} years old.`);
      } else {
        console.log(`Dog number ${key} is an adult, and is ${value} years old.`);
      }
    }
  }
  checkDogs(dogsJulia, dogsKate);
}
{ // Method Map Lecture 140
  const eurToUsd = 1.1;

  const movementsUSD = movements.map(function(mov) {
    // return mov * eurToUsd;
    return mov * eurToUsd;
  });
  console.log(movements);
  console.log(movementsUSD);

  const movementsUSDfor = [];
  for(const mov of movements) {
    movementsUSDfor.push(mov * eurToUsd);
  }
  console.log(movementsUSDfor);
}
{ // Method Filter Lecture 142
  const deposits = movements.filter(function(mov) {
    return mov > 0;
  });
  console.log(movements);
  console.log(deposits);

  const withdrawals = movements.filter(mov => mov < 0);
  console.log(withdrawals);
}
{ // Method Reduce Lecture 143
  const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
  console.log(balance);

  const max = movements.reduce((acc, mov) => {
    if(acc > mov)
      return acc;
    else
      return mov;
  }, movements[0]);
  console.log(max);
}
{ // Coding Challenge #18 Dog Age to Human Age (And Also Coding Challenge #19)
  // It was weird. I completed this challenge before saw the video about it. I mean the challenge with arrow functions.
  const dogAges0 = [5, 2, 4, 1, 15, 8, 3];
  const dogAges1 = [16, 6, 10, 5, 6, 1, 4];

  const calcAverageHumanAge = function(ages) {
    const toHumanAge = ages.map(age => age <= 2 ? age * 2 : 16 + age * 4);
    // const toHumanAge = ages.map(function(age) {
    //   if(age <= 2) {
    //     return age * 2;
    //   } else if(age > 2) {
    //     return 16 + age * 4;
    //   }
    // });

    console.log('To human age:\n', toHumanAge);

    const adultOnly = toHumanAge.filter(el => el >= 18);
    // const adultOnly = toHumanAge.filter(function(el) {
    //   return el >= 18;
    // });

    console.log('Adult only:\n', adultOnly);

    const adultAvg = adultOnly.reduce((acc, cur, _, adultOnly) => acc + cur / adultOnly.length, 0);
    // const adultAvg = adultOnly.reduce(function(acc, cur, i, adultOnly) {
    //   return acc + cur / adultOnly.length;
    // }, 0);

    console.log('Adult age averege:\n', adultAvg);
  }
  calcAverageHumanAge(dogAges0);
  calcAverageHumanAge(dogAges1);
}
{ // Filter Method
  const eurToUsd = 1.1;

  // PIPELINE
  const totalDepositsUSD = movements.filter(mov => mov < 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);

  console.log(totalDepositsUSD);
}
{ // Find Method
  const firstWithdrawal = movements.find(mov => mov < 0);

  console.log(firstWithdrawal);

  const account = accounts.find(acc => acc.owner === 'Jessica Davis');

  console.log(account);
}
{ // Some and Every Methods
  // Some
  const anyDeposits = movements.some(mov => mov > 0);

  console.log(anyDeposits);

  // Every
  console.log(movements.every(mov => mov > 0));
}
{ // Flat and FlatMap Methods
  // Flat
  const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
  console.log(arr.flat());

  // const accountMovements = accounts.map(acc => acc.movements);
  // console.log(accountMovements);
  // const allMovements = accountMovements.flat();
  // console.log(allMovements);
  // const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
  // console.log(overalBalance);

  // const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
  // console.log(overalBalance);
  const overalBalance = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
  console.log(overalBalance);
}
{ // Sorting Arrays
  const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
  console.log(owners.sort());

  // movements.sort((a, b) => a > b ? 1 : -1);
  // movements.sort((a, b) => {
  //   if(a > b) {
  //     return 1;
  //   } else if(b > a) {
  //     return -1;
  //   }
  // });
  // console.log(movements);
}
{ // More Ways of Creating and Filling Arrays
  const arr = new Array(7);

  arr.fill(1, 3, 5);
  arr.fill(23, 2, 6);

  console.log(arr);

  // labelBalance.addEventListener('mouseover', function() {
  //   const labelBalanceStyles = {
  //     cursor: 'pointer',
  //     opacity: '0.8',
  //   }

  //   Object.assign(labelBalance.style, labelBalanceStyles);
  // });
  // labelBalance.addEventListener('mouseout', function() {
  //   const labelBalanceStyles = {
  //     opacity: '1',
  //   }

  //   Object.assign(labelBalance.style, labelBalanceStyles);
  // });

  labelBalance.addEventListener('click', function() {
    const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));

    console.log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  });
}
{ // Array Methods Practice Lecture #156
  // 1.
  const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0);

  console.log(bankDepositSum);

  // 2.
  // const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov > 1000).length;

  // console.log(numDeposits1000);

  const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

  console.log(accounts.flatMap(acc => acc.movements));
  console.log(numDeposits1000);

  // 3.
  const { deposits, withdrawals } = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
    // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
    sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;

    return sums;
  }, { deposits: 0, withdrawals: 0 });

  console.log(deposits, withdrawals);

  // 4.
  const convertTitleCase = function(title) {
    const capitalize = str => str[0].toUpperCase() + str.slice(1);

    const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

    const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ');

    return capitalize(titleCase);
  }

  console.log(convertTitleCase('this is a nice title'));
  console.log(convertTitleCase('this is a LONG title but not too long'));
  console.log(convertTitleCase('and here is another title with an EXAMPLE'));
}
{ // Coding Challenge #20 Check how much dogs eat.
  function checkPortion(curFood, recFood, owners, createArr) {
    if(createArr === true) {
      if(recFood > curFood) {
        Array.prototype.push.apply(ownerEatTooLittle, owners);
      } else {
        Array.prototype.push.apply(ownerEatTooMuch, owners);
      }
    } else {
      recFood > curFood ? console.log(`${owners}\'s dog eat too little.`) : console.log(`${owners}\'s dog eat too much.`);
    }
  }

  const ownerEatTooMuch = [];
  const ownerEatTooLittle = [];

  const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
  ];
  dogs.map(dog => dog.recFood = dog.weight ** 0.75 * 28); // Create a "recFood" key for each dog.
  dogs.map(dog => dog.owners.some(owner => owner === 'Sarah' && checkPortion(dog.curFood, dog.recFood, owner))); // Find the Sarah's dog and check how much they eats.
  dogs.filter(dog => dog.recFood > checkPortion(dog.curFood, dog.recFood, dog.owners, true));
  const ownerEatTooLittleStr = ownerEatTooLittle.reduce((ownerEatTooLittleStr, owner, i) => i < ownerEatTooLittle.length - 1 ? ownerEatTooLittleStr += `, ${owner}` : ownerEatTooLittleStr + ` and ${owner}'s dogs eat too little!`, '').slice(2); // Reduce the arrays with owners to the single string.
  const ownerEatTooMuchStr = ownerEatTooMuch.reduce((ownerEatTooMuchStr, owner, i) => i < ownerEatTooMuch.length - 1 ? ownerEatTooMuchStr += `, ${owner}` : ownerEatTooMuchStr + ` and ${owner}'s dogs eat too much!`, '').slice(2); // Reduce the arrays with owners to the single string.
  const eatAsNeed = dogs.some(dog => dog.curFood === dog.recFood); // Check if there is a dog who eats how much as recommended.
  const sortedDogs = dogs.sort((a, b) => a.recFood - b.recFood); // Sort the array with dogs in ascending order of recommended food portions.

  console.log(dogs);
  console.log(ownerEatTooLittleStr);
  console.log(ownerEatTooMuchStr);
  console.log(eatAsNeed);
  console.log(sortedDogs);
}
/////////////////////////////////////////////////