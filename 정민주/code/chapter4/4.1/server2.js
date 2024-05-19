const http = require('http')
const fs = require('fs').promises

const server = http.createServer(async (reqest, response)=>{
    try{
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        const data = await fs.readFile('./server2.html')
        response.end(data)
    } catch(err){
        console.error(err)
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        response.end(err.message)
    }
    
})
.listen(8080)

server.on('listening', ()=>{
    console.log('server: 8080번 포트에서 서버 대기중입니다.')
})
server.on('error', (error)=>{
    console.error(error)
})
