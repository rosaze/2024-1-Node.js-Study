const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const people = {}; // 데이터 저장용

http.createServer(async (req, res)=>{
    try{
        if (req.method==='GET'){
            if (req.url === '/') {
                const data = await fs.readFile(path.join(__dirname, 'businessCard.html'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            }if (req.url === '/people'){
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
                return res.end(JSON.stringify(people))
            }
            try{
                const data = await fs.readFile(path.join(__dirname, req.url));
                return res.end(data);
            } catch(err){

            }
        } else if (req.method=="POST"){
            if (req.url === '/peoples'){
                let body = ''
                req.on('data', (data)=>{
                    body += data
                })
                return req.on('end', ()=>{
                    const {name, business, position} = JSON.parse(body)
                    people[name] = {business, position}
                    res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' })
                    res.end('등록 성공')    
                })
            }
        } else if (req.method=="DELETE"){
            if (req.url.startsWith('/peoples/')){
                const key = req.url.split('/')[2]
                delete people[key]
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
                return res.end(JSON.stringify(people))
            }

        } else {
            res.writeHead(404)
            return res.end("Not Found")
        }

    } catch (err){
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end(err.message)
    }
}).listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });