// console.log의 문제점 파악
const age = 96;
function calculateKrAfe(ageOfFreugner){
    ageOfFreugner + 2;
    return "hello!"
}
const KrAge = calculateKrAfe(99); //return한 값이 hello!이므로 hello가 나온다. 
console.log(KrAge);

// return을 사용한 calculator 

const calculator = {
    add: function(a, b){
        return a + b; //function은 return하면 작동이 중단된다. 
        console.log("bye!"); //실행되지 않는다. 
    },
    minus: function(a, b){
        return a - b;
    },
    times: function(a, b){
        return a * b;
    },
    divide: function(a, b){
        return a / b;
    },
    power: function(a, b){
        return a ** b;
    }
}
const plusResult = calculator.add(10, 2); //add function안의 a, b는 10, 2로 대체되고 결국에는 계산결과로 plusResult를 대체할 것이다.
const minusResult = calculator.minus(plusResult, 10);
const timesResult = calculator.times(minusResult, plusResult)
const divideResult = calculator.divide(timesResult, minusResult);
const powerResult = calculator.power(divideResult, timesResult);
