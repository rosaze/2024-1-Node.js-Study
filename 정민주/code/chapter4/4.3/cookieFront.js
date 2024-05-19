let x = document.cookie
let cookies = x.split(';')

let cookieList = []
for (cookie of cookies){
    cookieList.push(cookie.split('='))
}
console.log(cookieList)
console.log(cookieList[0][1])

document.querySelector('#cookieVal').innerText = cookieList[0][1]