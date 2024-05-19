function sayHello(){
    console.log("Hi Everyone")
}
function sayBye(){
    console.log("Goodbye Everyone")
}

const bye = setTimeout(sayBye, 2000)
setTimeout(()=>{clearTimeout(bye)}, 100)
//clearTimeout(bye);

const hello = setInterval(sayHello, 5000)
setTimeout(()=>{clearInterval(hello)}, 15000)

const immediateBye = setImmediate(sayBye)
clearImmediate(immediateBye)