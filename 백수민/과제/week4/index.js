const { isPrime, isNotPrime } = require('./var');
const checkPrime = require('./func');

const numList = [3, 45, 63, 71, 53, 146, 5, 678];

for (let i=0; i<numList.length; i++) {
    let num = numList[i];
    console.log(num + ':', checkPrime(num));
}