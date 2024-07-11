# 섹션 3. http 서버로 모듈 만들기 1

---

**HTTP 서버 만들기**

- 서버와 클라이언트의 관계
    - 클라이언트가 서버로 요청(request)을 보냄 → 서버는 요청을 처리 → 처리 후 클라이언트로 응답(response)을 보냄
- http 요청에 응답하는 노드 서버
    - `createServer`로 요청 이벤트에 대기
    - `req` 객체는 요청에 관한 정보가, `res` 객체는 응답에 관한 정보가 담겨 있음
    
    ```jsx
    // createServer.js
    const http = require('http');
    http.createServer((req, res) => {
    	// 어떻게 응답할지 적기
    });
    ```
    
- 서버 만들기
    - 8080 포트에 프로세스를 띄우고 클라이언트에게 요청을 보내서 응답을 받을 수 있음
    
    ```jsx
    // server1.js
    const http = require("http");
    
    http
      .createServer((req, res) => {
        res.write("<h1>Hello Node!</h1>");
        res.write("<p>Hello server</p>");
        res.write("<p>Hello seoyeon</p>");
      })
      .listen(8080, () => {
        console.log("8080번 포트에서 서버 대기 중입니다.");
      });
    ```
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%203%20http%20%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5%E1%84%85%E1%85%A9%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%B2%E1%86%AF%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%201%209a84cd586fd14f01b355e9dceef513dd/Untitled.png)
    
- localhost와 포트
    - localhost는 컴퓨터 내부 주소
        - 외부에서 접근 불가능
    - 포트는 서버 내에서 프로세스를 구분하는 번호
        - 기본적으로 http 서버는 80번 포트 사용(생략 가능, https는 443)
        - 다른 포트로 데이터베이스나 다른 서버 동시에 연결 가
        - 포트 번호만 달리하면 한 가지 도메인으로 여러 페이지를 사용 할 수 있음
- 에러 처리
    
    ```jsx
    const http = require("http");
    
    const server = http
      .createServer((req, res) => {
        res.write("<h1>Hello Node!</h1>");
        res.write("<p>Hello server</p>");
        res.write("<p>Hello seoyeon</p>");
      })
      .listen(8080);
    server.on("listening", () => {
      console.log("8080번 포트에서 서버 대기 중입니다.");
    });
    server.on("error", (error) => {
      console.error(error);
    });
    ```
    

**fs로 HTML파일 읽어 제공하기** 

```jsx
// server2.html
<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>Node.js 웹 서버</title>
</head>
<body>
    <h1>Node.js 웹 서버</h1>
    <p>만들 준비되셨나요?</p>
</body>
</html>
```

```jsx
// server2.js
const http = require("http");
const fs = require("fs").promises;

const server = http
  .createServer(async (req, res) => { // async 쓰면 try, catch 필수
    try {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      const data = await fs.readFile("./server2.html"); // html 파일 읽어서 전송
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" }); // 일반 문자열
      res.end(err.message);
    }
  })
  .listen(8080);
server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중입니다.");
});
server.on("error", (error) => {
  console.error(error);
});

```

![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%203%20http%20%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5%E1%84%85%E1%85%A9%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%B2%E1%86%AF%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%201%209a84cd586fd14f01b355e9dceef513dd/Untitled%201.png)

**REST API 서버 만들기**

- 서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현
    - /index.html이면 index.html을 보내달라는 뜻
    - 항상 html을 요구할 필요는 없음
    - 서버가 이해하기 쉬운 구조가 좋음
- REST API(Representational State Transfer)
    - 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
    - /user이면 사용자 정보에 관한 정보를 요청하는 것
    - /post면 게시글에 관련된 자원을 요청하는 것
    - 예측 가능하다는 것은 보안에 위협이 된다는 것
- HTTP 요청 메서드
    - GET: 서버 자원을 가져오려고 할 때 사용
    - POST: 서버에 자원을 새로 등록하고자 할 때 사용(또는 뭘 써야 할 지 애매할 때)
    - PUT: 서버의 자원을 요청에 들어있는 자원으로 치환하고자 할 때 사용
    - PATCH: 서버 자원의 일부만 수정하고자 할 때 사용
    - DELETE: 서버의 자원을 삭제하고자 할 때 사용
- HTTP 프로토콜
    - 클라이언트가 누구든 서버와 HTTP 프로토콜로 소통 가능
        - ios, 안드로이드, 웹이 모두 같은 주소로 요청 보낼 수 있음
        - 서버와 클라이언트의 분리
    - RESTful
        - REST API를 사용한 주소 체계를 이용하는 서버
        - GET /user는 사용자를 조회하는 요청, POST /user는 사용자를 등록하는 요청

**POST, PUT, DELETE 요청 보내기**

```jsx
// about.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>RESTful SERVER</title>
    <link rel="stylesheet" href="./restFront.css" />
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
    <div>
      <h2>소개 페이지입니다.</h2>
      <p>사용자 이름을 등록하세요!</p>
    </div>
  </body>
</html>
```

```jsx
// restFront.html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>RESTful SERVER</title>
    <link rel="stylesheet" href="./restFront.css" />
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
    <div>
      <form id="form">
        <input type="text" id="username" />
        <button type="submit">등록</button>
      </form>
    </div>
    <div id="list"></div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="./restFront.js"></script>
  </body>
</html>
```

```jsx
// restFornt.js
async function getUser() {
  // 로딩 시 사용자 가져오는 함수
  try {
    const res = await axios.get("/users");
    const users = res.data;
    const list = document.getElementById("list");
    list.innerHTML = "";
    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key];
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        // 수정 버튼 클릭
        const name = prompt("바꿀 이름을 입력하세요");
        if (!name) {
          return alert("이름을 반드시 입력하셔야 합니다");
        }
        try {
          await axios.put("/user/" + key, { name });
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        // 삭제 버튼 클릭
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert("이름을 입력하세요");
  }
  try {
    await axios.post("/user", { name });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = "";
});
```

```jsx
// restserver.js
const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    // req: 요청 객체 res: 응답 객체
    try {
      if (req.method === "GET") {
        // 30초 안에 응답해야 함
        if (req.url === "/") {
          const data = await fs.readFile(
            path.join(__dirname, "restFront.html")
          );
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // 200: 성공적으로 응답
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          return res.end(JSON.stringify(users));
        }
        // /도 /about도 /users도 아니면
        try {
          const data = await fs.readFile(path.join(__dirname, req.url));
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        }
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(Body):", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      }
      res.writeHead(404); // 서버가 요청을 찾지 못했을 때 
      return res.end("NOT FOUND");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8082, () => {
    console.log("8082번 포트에서 서버 대기 중입니다");
  });
```

![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%203%20http%20%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5%E1%84%85%E1%85%A9%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%B2%E1%86%AF%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%201%209a84cd586fd14f01b355e9dceef513dd/Untitled%202.png)

![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%203%20http%20%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5%E1%84%85%E1%85%A9%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%B2%E1%86%AF%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%201%209a84cd586fd14f01b355e9dceef513dd/Untitled%203.png)

![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%203%20http%20%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5%E1%84%85%E1%85%A9%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%B2%E1%86%AF%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%201%209a84cd586fd14f01b355e9dceef513dd/Untitled%204.png)

Request Payload: 요청 데이터 위치

Response: 응답 데이터 위치 

[HTTP 성공 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)