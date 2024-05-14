const calculator = {
    add: function(a, b){
        console.log(a + b);
    },
    minus: function(a, b){
        console.log(a - b);
    },
    times: function(a, b){
        console.log(a * b);
    },
    divide: function(a, b){
        console.log(a / b);
    },
    power: function(a, b){
        console.log(a ** b);
    }
}
calculator.add(1, 2);
calculator.minus(4, 1);
calculator.times(6, 7)
calculator.divide(10, 2);
calculator.power(2, 4);

//하지만 console.log를 사용하면 