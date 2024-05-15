import {odd, even} from './var.mjs'
import numCheck from './func.mjs'

function checkStringEvenOrOdd(str){
    if (str.length%2){
        return odd
    }
    return even
}
console.log(numCheck(10))
console.log(checkStringEvenOrOdd('hello'))