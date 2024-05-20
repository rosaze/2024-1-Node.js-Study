const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
//객체를 반환시켜 문자열을 쓸 수 있게끔 하는 코드
http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    // 주소가 /login으로 시작하는 경우 응답받는 코드
    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8084");
      const name = url.searchParams.get("name");
      const expires = new Date();

      //쿠키 유효 시간을 현재시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        // 302: redirection. 응답을 받으면서 /주소로 리다이렉트 되는 것
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      }); // 직접 쿠키 만료시간을 적어주는 부분. 이부분 안 적어주면 세션 쿠키 되는 것
      //HTTpOnly: 자바스크립트로 접근하면 위험하기 떄문에
      res.end();
      // 경우 1: name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`); //경우 1
    } else {
      try {
        //경우 2: 쿠키가 존재하지 않을 때
        // 경우 3: 쿠키가 삭제되면 이부분이 실행되어 다시 로그인 화면이 뜰 거임
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      } // 로그인도 아니고 쿠키도 아니고 아무거나 들어가 있을 때
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다!");
  });
