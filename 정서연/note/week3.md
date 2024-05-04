# 섹션 2. 노드 기본 기능 익히기 1

---

**REPL과 js 파일 실행하기**

- 자바스크립트(=스크립트 언어) → 즉석에서 코드 실행 가능
    - `REPL` 콘솔 제공
        - R(Read), E(Evaluate), P(Print), L(Loop)
            
            → Read, Eval, Print가 Loop
            
    - 명령 프롬프트(윈도우), 터미널(맥, 리눅스)에 node 입력
        
        입력한 값의 결괏값이 바로 출력됨
        
        - 간단한 코드를 테스트하는 용도로 적합
        - 긴 코드를 입력하기에는 부적합
    
    ```jsx
    > const str = 'Hello world, hello node';
    undefined
    
    > console.log(str)
    Hello world, hello node
    undefined // console.log 자체 리턴값
    ```
    
- vscode 터미널 사용시 cmd 설정 확인하기

**CommonJS 모듈 시스템**

- 노드는 자바스크립트 코드를 모듈로 만들 수 있다
    - 모듈: 특정한 기능을 하는 함수나 변수들의 집합
    - 모듈로 만들면 여러 프로그램에서 재사용 가능
- 같은 폴더 내에 var.js, func.js, index.js 만들기
    - 파일 끝에 module exports로 모듈로 만들 값 지정
    - 다른 파일에서 require(파일 경로)로 그 모듈의 내용을 가져올 수 있음
    
    ```jsx
    //var.js
    const odd = '홀수';
    const even = '짝수';
    
    module.exports = {
    	odd,
    	even,
    	};
    	
    // exports.odd = odd;
    // exports.even = even;
    ```
    
    ```jsx
    // func.js
    const { odd, even } = require('./var'); // require('경로')
    
    function checkOddOrEven(num) {
    	if (num % 2) {
    		return odd;
    	}
    	return even;
    }
    
    module.exports = checkOddOrEven;
    ```
    
    ```jsx
    // index.js
    const { odd, even } = require('./var'); // const { odd, even } -> 구조분해 할당
    const checkNumber = require('./fanc');
    
    function checkStringOddOrEven(str) {
    	if (str.lenth % 2) {
    		return odd;
    	}
    	return even;
    }
    
    console.log(checkNoumber(10));
    console.log(checkStringOddOrEven('hello'));
    ```
    

**exports, this, require, 순환참조**

- `this` 사용 주의점
    - 최상위 스코프의 this는 `module.exports`를 가리킴
    - 그 외에는 브라우저의 자바스크립트와 동일
    - 함수 선언문 내부의 this는 `global` 객체를 가리킴
    
    ```jsx
    console.log(this); // !== global
    
    function a() {
    	console.log(this === global);
    }
    
    a();
    ----
    > {} // this === module.exports === exports === {}
    > true
    ```
    
- `require`특성
    - 제일 위에 올 필요 없음
    - `require.cache`에 한 번 require한 모듈에 대한 caching 정보가 들어있음
        - 두 번째로 파일을 불러올 때는 메모리에 저장된 정보를 가져옴
    - `require.main`은 노드 실행 시 첫 모듈을 가리킴
        - 어떤 파일을 실행 했는지 알아낼 수 있음
- 순환참조
    - 두 개의 모듈이 서로 `require`하는 상황을 조심해야 함
        - dep1이 dep2를 require하고, dep2가 dep1을 require 함
        - dep1의 module.exports가 함수가 아니라 **빈 객체가 됨**(무한 반복을 막기 위한 의도)
        - 순환참조하는 상황이 나오지 않도록 하는 게 좋음
        
        ```jsx
        // dep1
        const dep2 = require('./dep2');
        console.log('require dep2', dep2);
        module.exports = () => {
        	console.log('dep2', dep2);
        };
        ```
        
        ```jsx
        // dep2
        const dep1 = require('./dep1');
        console.log('require dep1', dep1);
        module.exports = () => {
        	console.log('dep1', dep1);
        };
        ```
        
        ```jsx
        // dep-run.js
        const dep1 = require('./dep1');
        const dep2 = require('./dep2');
        dep1();
        dep2();
        ```
        
        ```jsx
        // console
        $ node dep-run
        require dep1 {}
        require dep2 [Fuction (anonymous)]
        dep2 [Fuction (anonymous)]
        dep1 {}
        ```
        

**ECMAScript 모듈, 다이나믹 임포트, top level await**

- **ECMAScript 모듈(표준 모듈)**
    
    ```jsx
    //var.mjs
    exports const odd = 'MJS 홀수';
    exports const even = 'MJS 짝수';
    ```
    
    ```jsx
    // func.mjs
    import { odd, even } from './var.mjs';
    
    function checkOddOrEven(num) {
    	if (num % 2) {
    		return odd;
    	}
    	return even;
    }
    
    exports default checkOddOrEven;
    ```
    
    ```jsx
    // index.js
    import { odd, even } from './var.mjs';
    import checkNumber from './fanc.mjs';
    
    function checkStringOddOrEven(str) {
    	if (str.lenth % 2) {
    		return odd;
    	}
    	return even;
    }
    
    console.log(checkNoumber(10));
    console.log(checkStringOddOrEven('hello'));
    ```
    
    ```jsx
    // console
    $ node index.mjs
    MJS 홀수
    MJS 짝수
    ```
    
    - `import`, `exports default`는 require, module처럼 함수나 객체가 아니라 문법 그 자체
    - mjs 확장자 대신 js 확장자를 사용하려면 package.json에 type: “module” 속성 넣기
    - import 시 파일 경로에 확장자는 생략 불가능( + 폴더 내부에서도 index.js 생략 불가)
    
    | 차이점 | CommonJS 모듈 | ECMAScript 모듈 |
    | --- | --- | --- |
    | 문법 | require(’./a’);
    module.exports = A;
    const A = require(’./a’);
    exports.C = D;
    const E = F; exports.E = E;
    const { C, E } = require(’./b’); | import ‘./a.mjs’;
    export default A;
    import A form ‘./a.mjs’;
    export const C = D;
    const E = F; export { E };
    import { C, E } form ‘./b.mjs’; |
    | 확장자 | js
    cjs | js(package.json에 type: “module” 필요)
    mjs |
    | 확장자 생략 | 가능 | 불가능 |
    | 다이나믹 임포트 | 가능 | 불가능 |
    | 인덱스 생략 | 가능(require(’./folder’)) | 불가능(import ‘./folder/index.mjs’) |
    | top level await | 불가능 | 가능 |
    | __filename,
    __dirname,
    require, module.exports,
    exports | 사용 가능 | 사용 불가능
    (__filename 대신 import.meta.url 사용) |
    | 서로 간 호출 | 가능 | 가능 |

**노드 내장 객체**

- `global`
    - 노드 전역 객체, 브라우저의 window 같은 역할
    - 모든 파일에서 접근 가능
    - window처럼 생략도 가능(console, require도 global 속성)
    - global 속성에 값을 대입하면 다른 파일에서도 사용 가능
    
    ```jsx
    // globalA.js
    module.exports = () => global.message;
    ```
    
    ```jsx
    // globalB.js
    const A = require('./globalA');
    
    global.message = '안녕하세요';
    console.log(A());
    ----
    $ node globalB
    안녕하세요
    ```
    
- `console`
    - 브라우저의 console 객체와 매우 유사
    - `console.time`, `console.timeEnd`: 시간 로깅
    - `console.error`: 에러 로깅
    - `console.log`: 평범한 로그
    - `console.dir`: 객체 로깅
        
        ```jsx
        console.dir({ hello: ‘hello’ })
        ----
        { hello: ‘hello’ }
        ```
        
    - `console.trace`: 호출스택 로깅
    - `console.table`: 표 로깅
- 타이머 메서드
    - `set` 메서드에 `clear` 메서드가 대응
        - set 메서드의 리턴 값(아이디)을 clear 메서드에 넣어 취소
        - setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1/1000초) 이후에 콜백 함수를 실행
        - setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수 반복 실행
        - setImmediate(콜백 함수): 콜백 함수를 즉시 실행
        - clearTimeout(아이디): setTimeout을 취소
        - clearInterval(아이디): setInterval을 취소
        - clearImmediate(아이디): clearImmediate를 취소

**process**

- 현재 실행중인 노드 프로세스에 대한 정보를 담고 있음
    - `process.version`: 설치된 노드 버전
    - `process.arch`: 프로세서 아키텍처 정보
    - `process.platform`: 운영체제 플랫폼 정보
    - `process.pid`: 현재 프로세스의 아이디(프로세스를 여러 개 가질 때 구분 가능)
    - `process.uptime()`: 프로세스가 시작된 후 흐른 시간(초 단위)
    - `process.evecPath`: 노드의 경로
    - `process.cwd()`: 현재 프로세스가 실행되는 위치
    - `process.cpuUsage()`: 현재 cpu 사용량
    - `process.env`: 시스템 환경 변수들이 들어있는 객체
        - 비밀키(데이터베이스 비밀번호, 서드파티 앱 키 등)를 보관하는 용도
        - 환경 변수는 process.env로 접근 가능
            
            ```jsx
            const secretID = process.env.SECRET_ID;
            const secretCode = process.env.SECRET_CODE;
            ```
            
        - 일부 환경 변수는 노드 실행 시 영향을 미침
            
            ex) NODE_OPTIONS(노드 실행 옵션), UV_THREADPOOL_SIZE(스레드풀 갯수)
            
            - max-old-space-size는 노드가 사용할 수 있는 메모리를 지정하는 옵션
    - `process.nextTick`(콜백)
        - 이벤트 루프가 다른 콜백 함수보다 nextTick의 콜백 함수를 우선적으로 처리
        - 남용하면 다른 콜백 함수 실행이 늦어짐
        - 비슷한 경우로 `promise`가 있음(nextTick처럼 우선순위가 높음)
    - `process.exit(코드)`: 현재 프로세스 멈춤
        - 코드가 없거나 0이면 정상 종료
        - 이외의 코드(1)는 비정상 종료(에러)를 의미

**os**

- 운영체제의 정보를 담고 있음
    - 모듈은 require로 가져옴(내장 모듈이라 경로 대신 이름만 적음)

**path**

- 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
    - 운영체제별로 경로 구분자가 다름(Windows: ‘\’, POSIX:’/’)
        
        mac + linux → posix
        
- join과 resolve의 차이: resolve는 /를 절대경로로 처리, join은 상대경로로 처리
    - 상대 경로: 현재 파일 기준. 같은 경로면 (.), 한 단계 상위 경로면 (..)
    - 절대 경로는 루트 폴더나 노드 프로세스가 실행되는 위치가 기준
- \\와 \차이: \는 윈도 경로 구분자, \\는 자바스크립트 문자열 안에서 사용(\를 \\로 이스케이프)
- 윈도에서 POSIX path를 쓰고 싶다면: path.posix 객체 사용
    - POSIX에서 윈도 path를 쓰고 싶다면: path.win32 객체 사용

**url**

- 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
    - WHATWG 방식 사용
        
        ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%201%20427b922bcfe548978e69490f94c4f2d6/Untitled.png)
        
    - 노드 내장 객체

**dns**

- DNS를 다룰 때 사용하는 모듈
    - 주로 도메인을 통해 IP나 기타 DNS 정보를 얻고자 할 때 사용

**searchParams**

- 다른 프로퍼티와 달리, 직접 조회나 수정이 안 되고 메서드로 조작해야 하는 프로퍼티