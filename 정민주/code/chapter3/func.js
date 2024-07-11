const {odd, even} = require('./var');
console.log('This is func.js');

function checkEvenOrOdd(num){
    if (num%2){
        return odd
    } 
    return even
}
exports.checkEvenOrOdd = checkEvenOrOdd;