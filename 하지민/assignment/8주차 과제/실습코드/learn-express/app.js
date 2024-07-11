const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000); //터미널에 SET PORT=80 이라고 쓰지 마셈 port 바꾸겠다고 이러면 그 다음부터 다른 프로그램할 때 문제 발생할 수도.

app.use(
  (req, res, next) => {
    console.log("1 요청에 실행하고 싶어요");
    next();
  },
  (req, res, next) => {
    console.log("3 요청에 실행하고 싶어요");
    next();
  }
);
app.get("/", (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, "index.html")); //get 요청 들어오면 이 부분 실행
});

app.post("/", (req, res) => {
  res.sendFile("hello express!");
});

app.get("/category/:name", (req, res) => {
  res.send("hello wildcard");
});

app.get("/category/:name", (req, res) => {
  res.send("hello wildcard");
});
app.get("/about", (req, res) => {
  res.send("hello express");
});
app.get("*", (req, res) => {
  res.send("hello everybody");
});

app.use((err, req, res, next) => {
  console.error(err);
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
