// express server 실행 
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');

const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const { urlencoded } = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

// template engine 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev')); // 요청과 응답을 기록하는 라우터
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express,urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
})); 

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
