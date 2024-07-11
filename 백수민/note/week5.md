## < 섹션 3. http 모듈로 서버 만들기 >

### 3.1 HTTP 서버 만들기
- 서버와 클라이언트:
    - 클라이언트가 서버로 요청(request)을 보냄
    - 서버는 요청을 처리
    - 처리 후 클라이언트로 응답(response)을 보냄
    - eg) 클라이언트(브라우저) - 서버(네이버 서버)

- 요청과 응답은 HTTP protocol(규약)로 처리됨
- localhost는 컴퓨터 내부 주소 (외부에서는 접근 불가능)
- 기본적으로 HTTPS: 443 포트 사용, HTTP: 80 포트 사용(포트번호 생략 가능)
- eg) www.naver.com:443 -> www.naver.com
- 다른 포트로 데이터베이스나 다른 서버 동시에 연결 가능
- 한 번에 여러 개의 서버 실행 가능 (createServer 여러 번 호출하면 됨 BUT, 포트는 다르게 지정)

--- 
### 3.2 fs로 HTML파일 읽어 제공하기

- res 메소드로 응답 보냄 - (write: 응답 내용 적기 & end: 응답 마무리 (내용 넣어도 됨))
- listen(포트) 메소드로 특정 포트에 연결
- BUT, write와 end에 문자열을 넣는 것은 비효율적 => 대신 fs모듈로 html을 읽어서 전송

--- 
### 3.3 REST API 서버 만들기 ~ 3.4 POST, PUT, DELETE 요청 보내기

- **REST API (주소 정하는 규칙):**
    - Representational State Transfer
        - 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
        - /user이면 사용자 정보에 관한 정보를 요청하는 것
        - /post면 게시글에 관련된 자원을 요청하는 것
    - 서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현
        - /index.html -> index.html을 보내달라는 뜻
        - 서버가 이해하기 쉬운 주소가 좋음
    - HTTP 요청 메서드
        - GET: 서버 자원을 가져오려고 할 때 사용
        - POST: 서버에 자원을 새로 등록할 때 사용 (또는 어떤 것을 사용할지 애매할 때 사용)
        - PUT: 서버의 자원을 요청에 들어있는 자원으로 치환할 때
        - PATCH: 서버 자원의 일부만 수정할 때
        - DELETE: 서버의 자원을 삭제할 때
        -  PUT: 전체 수정, PATCH: 부분 수정
    - 유추하기 너무 쉬우면 해킹에 더 취약해진다는 단점이 있음
    - 200: 요청 성공
    - 201: 성공적으로 생성됨

- **HTTP 프로토콜:**
    - 클라이언트가 누구든 서버와 HTTP 프로토콜로 소통 가능
    - ios, android, web이 모두 같은 주소로 요청 보낼 수 있음
    - 서버와 클라이언트 분리

- **RESTful:**
    - REST API를 사용한 주소 체계를 이용하는 서버
    - GET /user는 사용자를 조회하는 요청 
    - POST /user는 사용자를 등록하는 요청

|HTTP 메서드|주소|역할|
|---|---|---|
| GET | / | restFront.html 파일 제공 |
| GET | /about | about.html 파일 제공 |
| GET | /users | 사용자 목록 제공 |
| GET | 기타 | 기타 정적 파일 제공 |
| POST | /users | 사용자 등록 | 
| PUT | /users/사용자id | 해당 id의 사용자 수정 |
| DELETE | /users/사용자id | 해당 id의 사용자 제거 |

**개발자도구(Developer Tools) Network 탭에서 요청 내용 확인 가능:-**
- Name: 요청 주소
- Method: 요청 메서드
- Status: HTTP 응답 코드
- Protocol: HTTP 프로토콜
- Type: 요청 종류