// variable
const a = 5;
let myAge = 20;
myAge = 21;
console.log(myAge); //21

const toBuy = ["tomato", "potato", "pizza"];
console.log(toBuy);
toBuy[2] = "water";
console.log(toBuy); //["tomato", "potato", "water"]
toBuy.push("egg"); //[""tomato", "potato", "water", "egg"]

// property
const player = {
    name: "yujin",
    age: 21
};
console.log(player, console); //출력시 f라는 건 function을 나타낸다. 
console.log(player.name);
player.name = "eugine"; //object의 item을 수정한다. 
player.glasses = "yes";
console.log(player)