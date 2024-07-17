// express server 실행 
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname, 'public'));
app.use(morgan('dev')); // 요청과 응답을 기록하는 라우터
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.session.data = 'zerocho비번';
});

app.get('/', (req, res, next) => {
    req.session.data // zerocho비번 
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/about', (req, res, next) => { // about에서만 실행
    console.log('모든 요청에 실행하고싶어요.');
    next(); // next에 의해 다음 라우터에서 일치하는 곳을 찾아간다
});

app.get('/', (req, res, next) => {
    req.session.data // zerocho비번 
    res.sendFile(path.join(__dirname, 'index.html'));
});

/*
app.use((req, res, next) => {
    console.log('1 모든 요청에 실행하고싶어요.');
    next(); // next에 의해 다음 라우터에서 일치하는 곳을 찾아간다
}, (req, res, next) => {
    console.log('2 모든 요청에 실행하고싶어요.');
    next(); // next에 의해 다음 라우터에서 일치하는 곳을 찾아간다
}, (req, res, next) => {
    console.log('3 모든 요청에 실행하고싶어요.');
    next(); // next에 의해 다음 라우터에서 일치하는 곳을 찾아간다
});
*/


/*
app.use((req, res, next) => {
    console.log('모든 요청에 실행하고싶어요.');
    next(); // next에 의해 다음 라우터에서 일치하는 곳을 찾아간다
});
*/

/*
app.get('/', (req, res) => {
    //console.log('모든 요청에 실해하고싶어요')
    req.cookies // { mycookie: 'test' }
    req.signedCookies;
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly: true,
        path: '/',
    })
    //res.sendFile(path.join(__dirname, 'index.html'));
    //res.setHeader('Content-Type', 'text/html');
    res.status(200).send('안녕하세요!');
}, (req, res, next) => {
    throw new Error('에러가 났어요');
});

*/

app.post('/', (req, res) => {
    res.sendFile('hello express');
});

app.get ('/category/Javascript', (req, res) => { //wildcard
    res.send(`hello Javascript`);
});

app.get ('/category/:name', (req, res) => { //wildcard
    //res.send(`hello wildcard`);
    res.send(`hello ${req.params.name}`);
});

/*
app.get ('/category/Javascript', (req, res) => { //wildcard
    res.send(`hello Javascript`);
});
*/

app.get('/about', (req, res) => {
    res.send('hello express');
});

/*
app.get('*', (req, res, next) => { // wildcard
    res.send(`hello everybody`);
});
*/

app.use((req, res, next) => {
    res.send('404지롱'); // 404처리; 에러 미들웨어 아님; 모든 라우터를 검색했지만 요청이 어디로 가는지 모를 때
});

app.use((req, res, next) => {
    // == res.status(200).send('404지롱');
    res.send('404지롱'); // status == 200 (중간에 생략된거임)
});

/*
app.use((req, res, next) => {
    res.status(400).send('404지롱'); // status == 400
});
*/

app.use((err, req, res, next) => { // error 미들웨어는 next까지 꼭 4개의 매개변수 필요
    console.error(err); // next 변수가 없을 경우 다른 함수로 취급
    res.send('에러났지롱. 근데 안얄랴줌.')
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행')
});