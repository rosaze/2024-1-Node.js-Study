const http = require('http')

const server1 = http.createServer((reqest, response)=>{
    response.write('<h1>Hello Node!</h1>')
    response.write('<p>Hello Server1!</p>')
    response.end('<p>Hello Minju!</p>')
    //이 전체가 stream이라서 write도 되고 end도 된다.
})
.listen(8080)
const server2 = http.createServer((reqest, response)=>{
    response.write('<h1>Hello Node!</h1>')
    response.write('<p>Hello Server2!</p>')
    response.end('<p>Hello Minju!</p>')
    //이 전체가 stream이라서 write도 되고 end도 된다.
})
.listen(8081)

server1.on('listening', ()=>{
    console.log('server1: 8080번 포트에서 서버 대기중입니다.')
})
server2.on('listening', ()=>{
    console.log('server2: 8080번 포트에서 서버 대기중입니다.')
})
server1.on('error', (error)=>{
    console.error(error)
})
server2.on('error',(error)=>{
    console.error(error)
})