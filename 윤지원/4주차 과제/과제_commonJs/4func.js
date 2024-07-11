const { ly, ry } = require("./4var.js");

function LeapYear(year) {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    return ly;
  } else {
    return ry;
  }
}
module.exports = LeapYear;
