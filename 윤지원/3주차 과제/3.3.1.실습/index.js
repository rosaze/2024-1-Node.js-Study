const { odd, even } = require("./var");
const CheckNumber = require("/func");
function checkStringOddorEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}
console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
