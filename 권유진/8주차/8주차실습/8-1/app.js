const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000); //서버에 속성을 부여하는 것이다. 전역변수 느낌
app.get('/', (req, res) => { //req의 메소드와 url
    res.send('hello express');
});

app.listen(app.get('port'), () => {
   console.log('익스프레스 서버 실행');  
});