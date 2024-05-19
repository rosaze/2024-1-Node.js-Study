const http = require('http')
const fs = require('fs').promises
const path = require('path')

http.createServer(async (req,res)=>{
    try{
        if (req.method=='GET'){
            if (req.url=='/'){
                const data = await fs.readFile(path.join(__dirname, 'cookie.html'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8','Set-Cookie':'userName=nailbeauty' });
                return res.end(data);
            }
            try{
                const data = await fs.readFile(path.join(__dirname, req.url))
                return res.end(data)
            } catch(err){
                console.error(err)
            }
        }
    }catch(err){
        console.error(err)
    }
    console.log(req.url, req.headers.cookie)
    res.end('Hello Cookie');
})
.listen(8083, ()=>{
    console.log('8083번 포트에서 서버 대기 중입니다.')
})