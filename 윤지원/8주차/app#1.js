const express = require("express");
const app = express();
const path = require("path"); // 경로처리

app.set("port", process.env.PORT || 3000); // 서버에 port 속성 심기 -> 전역변수의 개념

app.use(
  (req, res, next) => {
    console.log("모든 요청에 다 실행됩니다");
    next(); // 다음 미들웨어로 넘어가는 함수
  },
  (req, res, next) => {
    try {
      console.log("에러");
    } catch (error) {
      next(error);
    }
  }
);

// 루트 경로("/")에 대한 GET 요청을 처리하는 라우트 핸들러를 정의
// 클라이언트가 루트 경로로 GET 요청을 보낼 때, res.send("hello express");를 실행하여 "hello express"라는 문자열을 응답으로 보냄
app.get("/", (req, res) => {
  res.json({ hello: "geenie" });
  console.log("hi gg");
});

app.post("/", (req, res) => {
  res.send("hello express");
});

app.get("/about", (req, res) => {
  res.send("hello express");
});

// 404 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send("404지롱");
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message); // res.send('에러남');
});

// 애플리케이션이 3000번 포트에서 수신 대기하도록 설정
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
