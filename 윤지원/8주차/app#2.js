//쿠키, 세션, 미들웨어

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const app = express();
app.set("port", process.env.Port || 3000);
app.use(morgan("combined"));
app.use("/", express.static(path.join(__dirname, "public"))); // 요청경로와 실제 경로. public 경로 안에 들어있다
//요청 주소에 따라서 미들웨어가 어디까지 실행되는지 결정됨. 보통 쿠키나 세션 위에 위치한다
//but fh

app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 관련 조작 하기 편해짐
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, //비밀 키
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true면 qs, false 면 querystring

//내 로그인 정보를 지키기 위해 session 사용
app.use((req, res, next) => {
  req.data = "윤지원비번";
  next(); // 다음 미들웨어로 넘어가는 함수
});

// 루트 경로("/")에 대한 GET 요청을 처리하는 라우트 핸들러를 정의
// 클라이언트가 루트 경로로 GET 요청을 보낼 때, res.send("hello express");를 실행하여 "hello express"라는 문자열을 응답으로 보냄
app.get("/", (req, res) => {
  req.data; //윤지원비번 저장됨. 현재 요청일때만 남아있음!
  res.json({ hello: "geenie" });
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
