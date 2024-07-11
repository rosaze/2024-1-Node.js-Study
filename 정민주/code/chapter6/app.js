const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();

app.set('port', process.env.PORT||8000);

app.use(morgan('combined'));
app.use(cookieParser('thingToCodify'));
app.use(multer().array());

app.use('/',(req, res, next)=>{
    console.log('모든 요청에 실행하고 싶습니다.');
    next();
})
app.get('/', (req, res)=>{
    req.cookies //{mycookie: 'text'}
    req.signedCookies; //쿠키가 암호화됨/서명됨
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name),{
        httpOnly: true,
        path:'/',
    })
    res.sendFile(path.join(__dirname,'index.html'));
})
app.post('/', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('hello express');
})
app.get('/about', (req, res)=>{
    res.send('hello express about');
})
app.get('/category/:name', (req, res)=>{
    res.send(`hello ${req.params.name}`);
})
app.use((req, res, next)=>{
    res.status(200).send('404이지만 200이라 뻥을 쳐볼까?');
})
app.use((err,req,res,next)=>{
    console.error(err);
    res.send('에러났지롱, 근데 안 알려줄꺼지롱');
})
app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행');
});