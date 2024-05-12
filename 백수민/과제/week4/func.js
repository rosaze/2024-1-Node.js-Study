const {isPrime, isNotPrime } = require('./var');

function checkPrime(number) {
    if (number == 2 || number == 3) {
        return isPrime;
    } else {
        for (let i = 2; i < Math.sqrt(number); i++) {
            if (number % i == 0) { 
                return isNotPrime;
            }
        }
        return isPrime;
    }
}

module.exports = checkPrime;