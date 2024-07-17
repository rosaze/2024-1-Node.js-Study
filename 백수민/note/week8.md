## < 섹션 5. 익스프레스 웹 서버 만들기 >

### 1. express 서버 사용해보기

- [npmtrends](https://npmtrends.com/) 에서 다운로드 수를 비교해서 유명하고 유용한 패키지를 찾을 수 있다
- 다운로드 수가 많을수록 더 안전하고 최근에 활동이 있었던 패키지가 좋다 (1년 넘으면 의심)

- express server 실행하기: node app
- node app 실행이 안 될 때는 port number를 바꿔보자

**nodemon**
- nodemon에서 서버 실행: nodemon app
- nodemon app 실행이 안되는 경우 npx nodemon app 사용
- 개발할 때는 nodemon 서버를 더 많이 사용한다 
- nodemon 실행시 get으로 설정하지 않은 부분은 (ex: app.get('/abouta', ...) X) 알아서 404를 띄워준다 (에러 처리해줌)
- 서버측에서 에러가 생길 경우 500를 띄워준다 
- if문을 쓰지 않아도 되게끔 분기처리가 돼 있다
- 소스코드가 바뀌면 알아서 재시작을 해준다 (종료했다 재시작할 필요 없음)
- package.json에서 "start": "nodemon app"이 돼 있으면 npm start으로 nodemon app을 대신할 수 있음

```JavaScript

app.set('port', process.env.PORT || 3000); // 전역 변수의 느낌; 서버에 속성을 심는다; port == 8080

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행')
});

```

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week8/img1.png" width="400" height="400"/>

---

### 2. express로 HTML 서빙하기

- index.html 서빙하는 법: res.sendFile 사용 (알아서 fs module을 사용해서 index.html을 읽어서 부른다)
- 내 프로젝트에서 특정 패키지가 쓰이는지 확인하는 법: npm (**ls** or **ll**) 패키지명 (dependency의 dependency도 검색 가능)
- nodemon은 html을 감시하지 않음, res.sendFile할 때 index.html을 읽어서 전송함; index.html을 수정하고 새로고침하면 수정사항이 반영됨
- node app.js는 소스코드를 수정해도 노드에서 cache하고 있는 cache 파일 (require.cache 안에 들어있음?) 을 사용하기 때문에 새로고침을 해도 바뀌지 않는다
- 바꾸기 위해서는 require.cache를 직접 지워져야한다, But, 이것은 위험하기 때문에 서버를 껐다가 재시작한다 (메모리가 날아가니까)

---
### 3. 미들웨어 사용하기 

**미들웨어**
- 요청과 응답의 중간에 위치하여 미들웨어
- method + 주소 => 라우터(router)
- 위에서 아래로 순서대로 실행됨
- 와일드카드 또는 범위가 넓은 라우터들은 밑에다 넣어주어야 한다.
- app.use가 아닌 아래 함수가 미들웨어 (app.use(미들웨어)로 장착)
- 미들웨어는 req, res, next가 매개변수인 함수
- **next()**로 다음 미들웨어로 넘어감 
- error 미들웨어는 next까지 꼭 4개의 매개변수 필요

| 라우터 | 실행 범위 |
|---|---|
| app.use(미들웨어) | 모든 요청에서 미들웨어 실행 |
| app.use('/abc', 미들웨어) | abc로 시작하는요청에서 미들웨어 실행 |
| app.post('/abc', 미들웨어) | abc로 시작하는 POST 요청에서 미들웨어 실행 |

- .status(번호)로 임의로 지정 가능
- 실무에서는 400번대 500번대 쓰는 것을 자제함 (해킹에 취약할 수 있음)
- 응답은 한 번밖에 보내지 못함 (ex: res.json 두 번 작성 불가)
- res.json
- res.send
- res.sendFile
- res.render

---
### 4. morgan, bodyParser, cookieParser

- npm i morgan cookie-parser express-session

**morgan**

```javaScript

const morgan = require('morgan');

app. use(morgan('dev')); // client에서 어떤 요청이 왔는지 서버에 기록됨 (터미널) (개발할 때 사용)
app.use(morgan('combined')); // 더 자세한 정보가 뜬다 (베포할 때 사용)

```
<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week8/img2.png" width="500" height="200"/>

**cookieParser**

```javaScript
const cookieParser = require('cookie-parser');
app.use(cookieParser('zerochopassword'));

app.get('/', (req, res) => {
    req.cookies // { mycookie: 'test' }
    req.signedCookies; // 쿠키 암호화하기 
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name), { // 쿠키 지우기
        httpOnly: true,
        path: '/',
    })
    //res.sendFile(path.join(__dirname, 'index.html'));
    //res.setHeader('Content-Type', 'text/html');
    res.status(200).send('안녕하세요!');
}, (req, res, next) => {
    throw new Error('에러가 났어요');
});

```

**bodyParser**

```javaScript
//알아서 data가 parsing 된다

app.use(express.json()); // client에서 json data 보냈을 때 json data를 파싱해서 req.body로 넣어줌
app.use(express.urlencoded({ extended: true })); // client에서 form submit할 때; true면 qs, false면 querystring
app.use(bodyParser.raw()); // binary data
app.use(bodyParser.text()); // 문자열

app.get('/', (req, res, next) => {
    req.body.name // 가능
    res.sendFile(path.join(__dirname, 'index.html'));
})
```

---
### 5-6. static 미들웨어 & express-session 미들웨어

**static**

```JavaScript

app.use('요청 경로', express.static('실제 경로'));

// 요청 경로 != 실제 경로
// localhost:3000/zerocho.html  ||  learn-express/public-3030/zerocho.html
// localhost:3000/zerocho.css  ||  learn-express/public-3030/zerocho.css

app.use('/', express.static(__dirname, 'public-3030'));

```
- static을 사용하면 정적 파일들, 이미지, 동영상, pdf 파일 등을 제공할 수 있고, 요청 경로와 실제 경로가 다르기 때문에 보안에 많은 도움이 된다
- morgan, cookie-parser 등 대부분의 미들웨어에서 내부적으로 next()를 실행함
- But, static의 경우 원하는 파일을 찾으면 next() 실행 안함
- 고로, 요청 주소에 따라서 미들웨어가 어디까지 실행되는냐가 달라질 수 있다
- ??static 미들웨어의 순서 중요?? + ??정적 파일을 어디에 저장하는지 중요??
- 미들웨어간의 순서가 성능이랑 연결될 수 있음

**express-session**

```JavaScript
const session = require('express-session'); // 요청마다 개인의 저장공간을 만들어줌
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'zerochopassword',
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid', // 기본값
}));

app.get('/', (req, res, next) => {
    req.session // 사용에 대한 고유한 session
    res.sendFile(path.join(__dirname, 'index.html'));
});
```
**미들웨어간 데이터 전송 방법**

```JavaScript
// 1. 단점은 session에 저장하므로 다음 요청에도 data가 남아있음 But, 나에 한해서 data 계속 유지됨
app.use((req, res, next) => {
    req.session.data = 'zerocho비번';
});

app.get('/', (req, res, next) => {
    req.session.data // zerocho비번 
    res.sendFile(path.join(__dirname, 'index.html'));
});

//2. 일회성 데이터 (한 번의 요청에서만 데이터를 남기고 싶을 때)
app.use((req, res, next) => {
    req.data = 'zerocho비번';
});
// req == req
app.get('/', (req, res, next) => {
    req.data // zerocho비번 
    res.sendFile(path.join(__dirname, 'index.html'));
});
```

**미들웨어 확장법**
- 미들웨어 안에 미들웨어 넣는 방법
- ex: 로그인한 사람한테만 사진 접근 권한 주기 (google drive, icloud 등등)
- 알아두면 편리함!!
```JavaScript
app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(__dirname, 'public')(req, res, next)
    } else {
        next();
    }
})
// 다음 미들웨어
//      .
//      .
```

---
### 7. multer 사용하기

- npm i multer

---
### 8. dotenv 사용하기

- npm i dotenv
- 비밀키 관리하는 패키지
- 비밀키 = zerochopassward (쿠키를 서명하는 키)
- 소스코드에 키가 그대로 작성돼 있으면 안됨
- dotenv 미들웨어는 process.env를 쓰는 패키지보다 위에 위치해 있어야한다
- dotenv는 github 또는 cloud에 올리면 안된다 (절대 유출되면 안됨!!)

```JavaScript
const dotenv = require('dotenv');
dotenv.config();
app.use(cookieParser('zerochopassword'));
// 소스코드가 털리더라도 비밀키는 세이프
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
})); 
```

---
### 9. 라우터 분리하기

**express.Router**

- app.js가 길어지는 것을 막을 수 있음
- ??routes 폴더를 만들어 라우터를 분리해서 관리한다??
- shift + 8 => * (wildcard)
- 라우트 매개변수:
    - :id를 넣으면 req.params.id로 받을 수 있음

```JavaScript
// 동적으로 변하는 부분을 라우트 매개변수로 만듦
router.get('/user/:id', function(req, res) {
    console.log(req.params, req.query);
});

// 일반 라우터보다 뒤에 위치해야 함
router.get('/user/:id', function(req, res) {
    console.log('얘만 실행됩니다');
});

router.get('/user/like', function(req, res) {
    console.log('전혀 실행되지 않습니다.');
});

// 주소에 querystring이 붙는경우 (req.query로 간다)
// ex: /users/123?limit=5&skip=10 주소 요청
// { id: '123' } { limit: '5', skip: '10' } req.params.id , req.query.limit, req.query.skip
```

- 라우터 그룹화화기
    - 주소는 같지만 메서드가 다른 코드가 있을 때 router.route로 묶을 수 있음

```JavaScript
router.get('/abc', (req, res) => {
    res.send('GET /abc');
});
router.post('/abc', (req, res) => {
    res.send('POST /abc');
});

router.route('/abc')
    .get((req, res) => {
        res.send('GET /abc');
    });
    .post((req, res) => {
        res.send('POST /abc');
    });
```

**res**

- 한 번의 요청만 가능: res.end(), res.json(JSON), res.redirect(주소), res.render(뷰, 데이터), res.send(데이터), res.sendFile(경로)

---
### 10. Pug 템플릿 엔진
- HTML의 정적인 단점을 개선
  - 반복문, 조건문, 변수 등을 사용할 수 있음 (HTML은 X)
  - 동적인 페이지 작성 가능
  - PHP, JSP와 유사함
- 문법이 Ruby와 비슷해 코드 양이 많이 줄어듦
- HTML과 많이 달라 호불호가 갈림
- 익스페스에 app.set으로 퍼그 연결

---
### 11. 넌적스 템플릿 엔진
- npm i nunjucks

```JavaScript
const nunjuscks = require('nunjucks');

app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

```
