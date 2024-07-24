const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
// const app = express();
// app.set("port", process.env.PORT || 3000); //터미널에 SET PORT=80 이라고 쓰지 마셈 port 바꾸겠다고 이러면 그 다음부터 다른 프로그램할 때 문제 발생할 수도.
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
// app.use(cookieParser("zerochopassword"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("요청 경로", express.static("실제 경로"));
// localhost:3000/zerocho.html  learn-express/public-3030/zerocho.html
// localhost:3000/hello.css     learn-express/public-3030/hello.css
// app.use('/', express.static(__dirname, 'public-3030'));
app.use(cookieParser(process.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500), send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "빈 포트에서 대기 중");
});
