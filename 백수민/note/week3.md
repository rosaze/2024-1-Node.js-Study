## < 섹션 2. 노드 기본 기능 익히기 >

### 1. REPL 

자바스크립트는 스크립트 언어이므로 미리 컴파일하지 않아도 즉석에서 코드를 실행할 수 있다. 노드도 비슷한 REPL이라는 큰솔을 제공한다.

R: Read => 입력한 코드를 읽고
E: Eval => 해석하고
P: Print => 결과물을 반환하고
L: Loop => 종료할 때까지 반환하다

사용방법: 윈도우에서는 명령 프롬프트, 맥/리눅스는 터미널에서 node 입력

### 2. exports, this, require, 순환참조

```JavaScript
// var.js
const odd = "홀수입니다";
const even = "짝수입니다";

module.exports = { odd, even }; // module.exports에 변수들을 담은 객체 대입
```
=> var.js 파일 모듈로서 기능 가능

```JavaScript
// func.js (var.js 참조)
const { odd, even } = require('./var'); // require 함수 안에 불러올 모듈의 경로를 적음

function checkOddOrEven(num) {
    if (num % 2) {
        return odd; // 홀수
    }
    return even;
}

module.exports = checkOddOrEven; // module.exports에는 객체뿐만 아니라 함수, 변수 대입 가능
```
=> 다른 모듈(var.js)을 사용하는 파일(func.js)을 다시 모듈로 만들 수 있음

```JavaScript
// index.js (var.js & func.js 참조)
const { odd, even } = require('./var');
const checkNumber = require('./func'); // 모듈로부터 값을 불러올 때 변수 이름 다르게 지정할 수 있음

function checkStringOddOrEven(str) {
  if (str.length % 2) { // 홀수
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
```
=> 모듈 하나가 여러 개의 모듈을 사용할 수 있음

노드에서의 this != 브라우저의 this
최상위 스코프에 존재하는 this는 module.exports(exports 객체)를 가르킴

### 3. ECMAScript 모듈, 다이나믹 임포트, top level await

ECMAScript 모듈 (ES 모듈): 공식적인 자바스크립트 모듈 형식
=> 노드에서 현재까지는 commonJs모듈을 많이 쓰지만, ES 모듈이 자바스크립트 표준으로 정해지면서 ES 모듈 사용 비율이 늘어남. 장기적으로 봤을 때 commonJs 모듈이 ES 모듈로 전환될 것임. 

CommonJs 모듈과 ECMAScript 모듈의 차이:
<br>
<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week3/img1.png" width="600" height="570"/>

다이나믹 임포트: 
 - 코드 중간에 동적으로 불러올 수 있음
 - CommonJs: require(), ES module: import()

 top level await:
 - mjs 파일에서 최상위 스코프에선 async 없이 await할 수 있음
 <img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week3/img2.png" width="800" height="270"/>


### 4. global, console, 타이머

#### 1.global
- 노드의 전역 객체
- 브라우저의 window 같은 역할
- 모든 파일에서 접근 가능
- window처럼 생략도 가능함 (console, require => global의 속성) 

#### 2.console 객체
- console.time, console.timeEnd: 시간 로딩
- console.error: 에러 로깅
- console.log: 평범한 로그
- console.dir: 객체 로깅
- console.trace: 호출스택 로깅

#### 3.타이머 메서드
- set 메서드에 clear 메서드가 대응됨
  - set 메서드의 리턴 값(아이디)을 clear 메서드에 넣어 취소

  - setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1000분의 1초) 이후에 콜백 함수 실행.
  - setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수 반복 실행.
  - setImmediate(콜백 함수): 콜백 함수 즉시 실행.

  - clearTimeout(아이디): setTimeout 취소.
  - clearInterval(아이디): setInterval 취소.
  - clearImmediate(아이디): setImmediate 취소.

### 5. process
- 노드는 운영체제 접근 가능
- #### process: 현재 실행중인 노드 프로세스에 대한 정보를 담고 있음

- #### process.env: 시스템 환경 변수들이 들어있는 객체
  - 비밀키(데이터베이스 비밀번호, 서드파티 앱 키 등)를 보관하는 용도로 쓰임
  - 환경 변수는 process.env로 접근 가능
  - 일부 환경 변수는 노드 실행 시 영향을 미침

- #### process.nextTick(콜백): 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선적으로 처리함
  - 너무 남용하면 다른 콜백 함수들 실행이 늦어짐
  - 비슷한 경우로 promise가 있음(nextTick처럼 우선순위가 높음)
  - 아래 예제에서 setImmediate, setTimeout보다 promise와 nextTick이 먼저 실행됨 

- #### process.exit(코드): 현재의 프로세스를 멈춤
  - 코드가 없거나 0이면 정상 종료
  - 이외의 코드는 비정상 종료를 의미함

### 6. os, path, url, searchParams, dns
=> 모듈은 require로 가져옴 (내장 모듈이므로 경로 대신 이름만 적어도 됨)

##### 1. os: 운영체제의 정보를 담고 있음
##### 2. path: 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
          - join: 상대경로 처리
          - resolve: 절대경로 처리
##### 3. url: 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
          - url 처리에 두 가지 방식 있음: 기존 노드 방식 vs WHATWG 방식 (요즘은 WHATWG 방식만 사용)
          - searchParams: WHATWG 방식에서 쿼리스트링(search) 부분 처리를 도와주는 객체
##### 4. dns: DNS를 다룰 때 사용하는 모듈
          - 도메인을 통해 IP나 DNS 레코드를 얻고자 할 때 사용