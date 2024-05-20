const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie); // 2.쿠키 읽음
    res.writeHead(200, { "Set-Cookie": "mycookie=test" }); // 1.객체로 전환하면 mycookie=test 속성명, 속성값
    res.end("Hello Cookie");
  })
  .listen(8083, () => {
    console.log("8083번 포트에서 서버 대기 중입니다!");
  });
