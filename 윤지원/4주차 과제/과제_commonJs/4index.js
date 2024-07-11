const { ly, ry } = require("./4var");
const LeapYear = require("./4func");

function gcd(a, b) {
  while (b != 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
console.log(LeapYear(2080));
console.log(gcd(10, 15));
