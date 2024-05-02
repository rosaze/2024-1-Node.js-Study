## 2.3 프론트엔드 자바스크립트
### AJAX
서버로 요청을 보내는 코드
- GET 요청 보내기
  - axios.get 함수의 인수로 요청을 보낼 주소를 넣으면 됨
  - 프로미스 기반 코드라 async/await 사용 가능
- POST 요청을 하는 코드

### FormData
FormData: HTML form 태그에 담긴 데이터를 AJAX 요청으로 보내고 싶은 경우 > FormData 객체 이용
FormData POST 요청으로 보내기 > Axios의 data 자리에 formData를 넣어서 보내면 됨
![](https://velog.velcdn.com/images/tracygkwlals/post/248605bc-be97-4119-b9c6-311a98aea8f0/image.png)

### encodeURIComponent, decodeURIComponent
- 주소창에 한글 입력하면 서버가 처리하지 못하는 경우 > encodeURIComponent로 한글 감싸줘서 처리
![](https://velog.velcdn.com/images/tracygkwlals/post/8154e2d8-e4cf-4a27-b752-b1d5131c8099/image.png)![](https://velog.velcdn.com/images/tracygkwlals/post/c167617e-f563-46a1-8436-7c8992a72f1a/image.png)

data attribute와 dataset

## 3.1 REPL 사용하기
자바스크립트는 스크립트 언어라서 즉석에서 코드를 실행할 수 있음
![](https://velog.velcdn.com/images/tracygkwlals/post/1255d2db-93fa-40cf-bfc5-bd05ace0c94e/image.png)
입력한 값의 결과값이 바로 출력됨

## 3.2 JS 파일 실행하기
자바스크립트 파일을 만들어 통째로 코드를 실행하는 방법
- node [자바스크립트 파일 경로]로 실행

## 3.3 모듈로 만들기
### 모듈
노드는 자바스크립트 코드를 모듈로 만들 수 있음.
모듈: 특정한 기능을 하는 함수나 변수들의 집합
![](https://velog.velcdn.com/images/tracygkwlals/post/e1b1104a-0ab2-42a7-9b78-1c70df9d1121/image.png)

### 모듈 만들어보기
같은 폴더 내에 var.js, func.js, index.js 만들기
파일 끝에 module.exports로 모듈로 만들 값을 지정
![](https://velog.velcdn.com/images/tracygkwlals/post/9145898a-a0d0-4fe9-9bc9-4e75007fd1d0/image.png)![](https://velog.velcdn.com/images/tracygkwlals/post/fc0a98c8-27f6-4b57-88fd-95a37e4b15b1/image.png)![](https://velog.velcdn.com/images/tracygkwlals/post/753462c5-24ff-4d36-b38e-71e0c3f67a05/image.png)

### 파일 간의 모듈 관계
node.index로 실행

### module, exports
module.exports 외에도 exports로 모듈을 만들 수 있음
- 동일하게 동작함
- 동일한 이유는 module.exports와 exports가 참조 관계이기 때문

### this
this는 global(전역) 객체를 가리킴
![](https://velog.velcdn.com/images/tracygkwlals/post/b7f7db24-769a-44bf-b7d1-d52b43388cc9/image.png)

### require의 특성
require가 제일 위에 올 필요는 없음
![](https://velog.velcdn.com/images/tracygkwlals/post/325e67bf-af3c-488d-a54a-1ec892b3e420/image.png)

### 순환 참조 주의
모듈 A가 B를 require하고, B가 다시 A를 require하는 경우

### ES 모듈
mjs 확장자를 사용하거나 package.json에 type:"module"을 추가해야 함.

### 다이나믹 임포트
Commonjs에서는 require()
ES 모듈에서는 import()

## 3.4 노드 내장 객체 알아보기
### global
노드의 전역 객체, 모든 파일에서 접근 가능, 생략도 가능(console, require도 global의 속성)

### console 객체
console.time, console.timeEnd: 시간 로깅
console.error: 에러 로깅
console.log: 평범한 로그
console.dir: 객체 로깅
console.trace: 호출스택 로깅

### 타이머 메서드
set 메서드의 리턴 값(아이디)을 clear 메서드에 넣어 취소

setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1000분의 1초) 이후에 콜백 함수를 실행합니다.
setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수를 반복 실행합니다.
setImmediate(콜백 함수): 콜백 함수를 즉시 실행합니다.

clearTimeout(아이디): setTimeout을 취소합니다.
clearInterval(아이디): setInterval을 취소합니다.
clearImmediate(아이디): setImmediate를 취소합니다.
![](https://velog.velcdn.com/images/tracygkwlals/post/10732e17-5639-40ed-b470-16130382d761/image.png)

### process
현재 실행중인 노드 프로세스에 대한 정보를 담고 있음
컴퓨터마다 출력값이 PPT와 다를 수 있음

### process.env
시스템 환경 변수들이 들어있는 객체
비밀키(데이터베이스 비밀번호, 서드파티 앱 키 등)를 보관하는 용도로도 쓰임
환경 변수는 process.env로 접근 가능

### process.nextTick(콜백)
이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선적으로 처리함
ex: setImmediate, setTimeout보다 promise와 nextTick이 먼저 실행됨

### 마이크로태스크
Promise, nextTick 등
setImmediate, setTimeout보다 promise와 nextTick이 먼저 실행됨

### process.exit(코드)
현재의 프로세스를 멈춤
코드가 없거나 0이면 정상 종료
이외의 코드는 비정상 종료를 의미함 ex: 괄호 안이 1인 경우

## 3.5 노드 내장 모듈 알아보기
### OS 모듈 메서드
os.arch(): process.arch와 동일합니다.
os.platform(): process.platform과 동일합니다.
os.type(): 운영체제의 종류를 보여줍니다. 
os.uptime(): 운영체제 부팅 이후 흐른 시간(초)을 보여줍니다. process.uptime()은 노드의 실행 시간이었습니다.
os.hostname(): 컴퓨터의 이름을 보여줍니다.
os.release(): 운영체제의 버전을 보여줍니다.
os.homedir(): 홈 디렉터리 경로를 보여줍니다.
os.tmpdir(): 임시 파일 저장 경로를 보여줍니다.
os.cpus(): 컴퓨터의 코어 정보를 보여줍니다.
os.freemem(): 사용 가능한 메모리(RAM)를 보여줍니다.
os.totalmem(): 전체 메모리 용량을 보여줍니다.

### path
경로를 쉽게 조작하도록 경로 처리 도와주는 모듈

join과 resolve의 차이: resolve는 /를 절대경로로 처리, join은 상대경로로 처리
상대 경로: 현재 파일 기준. 같은 경로면 점 하나(.), 한 단계 상위 경로면 점 두 개(..)
 ![](https://velog.velcdn.com/images/tracygkwlals/post/7d06769f-9216-487d-a559-07993c0e22df/image.png) 가 실행되는 위치가 기준

\\와 \ 차이: \는 윈도 경로 구분자, \\는 자바스크립트 문자열 안에서 사용(\가 특수문자라 \\로 이스케이프 해준 것)

윈도에서 POSIX path를 쓰고 싶다면: path.posix 객체 사용
POSIX에서 윈도 path를 쓰고 싶다면: path.win32 객체 사용

### url 모듈
인터넷 주소 조작 쉽게 도와주는 모듈
![](https://velog.velcdn.com/images/tracygkwlals/post/5053723b-4a30-4802-810e-60c4c322375a/image.png)
url은 노드 내장 객체이기도 해서 require할 필요는 없음
WHATWG의 url이며 username, password, origin, searchParams 속성 존재

### searchParams
WHATWG 방식에서 쿼리스트링(search) 부분 처리를 도와주는 객체
getAll(키): 키에 해당하는 모든 값들을 가져옵니다. category 키에는 두 가지 값, 즉 nodejs와 javascript의 값이 들어 있습니다.
get(키): 키에 해당하는 첫 번째 값만 가져옵니다.
has(키): 해당 키가 있는지 없는지를 검사합니다.
keys(): searchParams의 모든 키를 반복기(iterator, ES2015 문법) 객체로 가져옵니다.
values(): searchParams의 모든 값을 반복기 객체로 가져옵니다.
append(키, 값): 해당 키를 추가합니다. 같은 키의 값이 있다면 유지하고 하나 더 추가합니다.
set(키, 값): append와 비슷하지만 같은 키의 값들을 모두 지우고 새로 추가합니다.
delete(키): 해당 키를 제거합니다.
toString(): 조작한 searchParams 객체를 다시 문자열로 만듭니다. 이 문자열을 search에 대입하면 주소 객체에 반영됩니다.
![](https://velog.velcdn.com/images/tracygkwlals/post/1f846d1c-4d30-45e9-9f97-ddb020c020fa/image.png)
