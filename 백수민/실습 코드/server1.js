const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello ZeroCho</p>');
})
    .listen(8080);

server.on('listening', () => { // 프로세스로 올리기
    console.log('8080번 포트에서 서버 대기 중입니다.'); // 8080포트에 연결
});

server.on('error', (error) => {
    console.error(error);
});
