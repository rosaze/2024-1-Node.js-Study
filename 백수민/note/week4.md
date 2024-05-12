## < 섹션 2. 노드 기본 기능 익히기 >

### 1. 3.5 노드 내장 모듈 사용하기

#### 단방향 암호화(crypto)
- 암호화는 가능하지만 복호화는 불가능
    - 암호화: 평문을 암호로 만듦
    - 복호화: 암호를 평문으로 해독
- CPU를 많이 사용하기 때문에 멀티스레드로 돌아감
- 대표 주자는 **해시(Hash) 기법**
    - 문자열을 고정된 길이의 다른 문자열로 바꾸는 방식
    - 엄밀히 말하면 해시 기법 != 암호화; 해시 기법은 평문을 암호로 만들 수 있지만 암호를 다시 평문으로 되돌리는 건 불가능
    - eg) abcdefgh 문자열 => qvew
    - 비밀번호 또한 해시 기법 사용
    - 비밀번호를 데이터베이스(DB)에 저장 X, 비밀번호를 해시화한 후 DB에 저장 => 안전성 보장
    - Hash 사용하기:
        - createHash(알고리즘): 사용할 해시 알고리즘을 넣어줌 (eg: md5, sha1, sha256, **sha512**)
        - update(문자열): 변환할 문자열을 넣어줌 (eg: password)
        - digest(인코딩): 인코딩할 알고리즘을 넣어줌 (eg: **base64**, hex, latin1)
    - 컴퓨터의 발달로 기존 암호화 알고리즘이 위협받고 있음
        - sha512가 취약해지면 sha3으로 넘어가야함
        - 현재는 pbkdf2나, bcrypt, scrypt 알고리즘으로 비밀번호를 암호화, BUT, Node는 pbkdf2와 scrypt 지원

#### 양방향 암호화
- 대칭형 암호화 (암호화 복호화 가능)
 - Key가 사용됨
 - 암호화할 때와 복호화 할 때 같은 Key를 사용해야 함
 - 단방향 암호화보다 해킹에 취약함; 해커들이 암호 해독이 아닌 키 탈취 시도함
 - 프론트-서버 관계에서는 사용할 수 없음; 동일한 키를 사용해야 하기 때문에 코드가 노출이 되는 프론트에서 해킹 당할 위험이 아주 높음

* 기본 노드의 crypto는 암호학 지식이 있어야 원할하게 사용할 수 있기 때문에 남이 만든 암호화 사용 권장 (eg: crypto.js) *

#### util
- 각종 편의 기능을 모아둔 모듈
- **deprecated**와 **promisify**가 자주 쓰임
- **util.deprecate**:
    - 함수가 deprecated 처리되었음을 알려줌
    - deprecated: 중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될 것이라는 뜻 (주로 새로운 기능이 기존 기능보다 좋을 때 기존 기능을 deprecated 처리 함)
    - deprecated 된 함수를 사용할 때 경고 메시지가 뜸
- **util.promisify**: 콜백 함수를 프로미스 패턴으로 바꿔줌

---

#### worker_threads
- 노드에서 멀티 스레드 방식으로 작업할 수 있게 해주는 모듈
- CPU를 많이 사용하는 암호화, 압축 작업을 직접 구현할 때 제외하고 노드에서 멀티 스레드 방식을 쓰는 건 극히 드묾
- isMainThread: 현재 코드가 메인 스레드에서 실행되는지, 워커 스레드에서 실행되는지 구분
- 메인 스레드 안에서 워커 스레드를 생성하고 워커 스레드한테 일을 분배해줌. 분배한 일을 워커 스레드들이 수행하면 다시 메인 스레드로 워커 스레드가 마친 일을 보내서 합친 후 최종적인 결과물로 반환함
- 워커 스레드가 자동적으로 알아서 일을 나누어 갖는게 아니라 프로그래머가 직접 분배해줘야 함

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img1.png" width="400" height="270"/>

- 메인 스레드에서는 new Worker를 통해 현재 파일(__filename)을 워커 스레드에서 실행시킴
- worker.postMessage로 부모에서 워커로 데이터를 보냄
- parentPort.on(‘message’)로 부모로부터 데이터를 받고, postMessage로 데이터를 보냄

* 노드로는 멀티 스레드 작업을 하지 않는 것을 권장 *

#### child_process
- 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용
    - 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행함.
    - 명령 프롬프트의 명령어인 dir을 노드를 통해 실행(리눅스라면 ls를 대신 적을 것)

```JavaScript
const exec = require('child_process').exec;

var process = exec('dir');

process.stdout.on('data', function(data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
    console.error(data.toString());
}); // 실행 에러
```

파이썬 프로그램 실행하기 (파이썬3이 설치되어 있어야 함)

```Python
print("hello python")
```

```JavaScript
const exec = require('child_process').exec;

var process = spwan('python', ['test.py']);

process.stdout.on('data', function(data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
    console.error(data.toString());
}); // 실행 에러
```

```
$ node spawn
hello python
```

**파이썬, c++으로 멀티 스레드 방식을 구현하는 것이 노드로 구현하는 것보다 비교적 수월하고 효율적임. 그러므로 다른 언어로 멀티 스레드를 구현하고 child_process를 활용하여 호출하면 됨. 노드가 다른 언어를 대신 실행 해 주는 것이 아니라 다른 언어에게 실행 요청을 하는 것. 그러므로 사용하는 언어의 프로그램이 설치되어 있어야 함**

<br> 

**기타 모듈들:**
- async_hooks: 비동기 코드의 흐름을 추적할 수 있는 실험적인 모듈
- dgram: UPD와 관련된 작업을 할 때 사용
- net: HTTP보다 로우 레벨인 TCP나 IPC 통신을 할 때 사용
- perf_hooks: 성능 측정을 할 때 console.time보다 더 정교하게 측정
- 그 외 존재

---
### 2. 파일 시스템 접근하기

#### 1. fs
- 파일 시스템에 접근하는 모듈:
    - 파일/폴더 생성, 삭제, 읽기, 쓰기 가능
    - 웹 브라우저에서는 제한적이었으나 노드는 권한을 가지고 있음

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img2.png" width="300" height="270"/>

#### 2. fs 프로미스
- 콜백 방식 대신 프로미스 방식으로 사용 가능
    - require(‘fs’).promises
    - 사용하기 훨씬 더 편해서 프로미스 방식을 추천함

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img3.png" width="300" height="270"/>


#### 4. 동기 메서드와 비동기 메서드
- 노드는 대부분의 내장 모듈 메서드를 비동기 방식으로 처리
    - 비동기는 코드의 순서와 실행 순서가 일치하지 않는 것을 의미
    - 일부는 동기 방식으로 사용 가능
    - 동기와 비동기: 백그라운드 작업 완료 확인 여부
    - 블로킹과 논 블로킹: 함수가 바로 return 되는지 여부
    - 노드에서는 대부분 동기-블로킹 방식과 비동기-논 블로킹 방식임
```JavaScript
const fs = require('fs');

fs.readfile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
})

fs.readfile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
})

fs.readfile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
})

fs.readfile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('4번', data.toString());
})
```
=> 실행 순서 예측 불가 (순서대로 실행되지 않음); 매 번 순서가 다르게 실행됨

1. 비동기 함수이기 때문에 콜백 함수들을 백그라운드로 보냄
2. 콜백 함수들이 백그라운드로 넘어가면 동시에 실행 됨
3. 어떤 작업이 먼저 끝나는지 운영체제만 알 수 있음
4. 먼저 끝난 함수를 태스크 큐로 넣어줌
5. Hence, 순서 보장 안됨

동기 메서드 사용:

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img4.png" width="300" height="400"/>

- 동기임으로 순서대로 실행됨
- 사람이 이해하기엔 좋지만 동시에 돌릴 수 없어 매우 비효율적인 방식
- 코드를 한 번만 실행하는 경우 또는 서버 초기화 작업 시 사용 가능
- 비동기 작업을 하면서 순서 유지 권장

비동기 메서드로 순서 유지:
- 콜백 함수 형식 유지 시 콜백 헬 발생함으로 프로미스로 깔끔하게 만드는 거 추천
<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img5.png" width="300" height="400"/>

---
#### 버퍼와 스트림
- **버퍼(Buffer)**: 일정한 크기로 모아두는 데이터
    - 일정한 크기가 되면 한 번에 처리
    - 버퍼링: 버퍼에 데이터가 찰 때까지 모으는 작업

- **스트림(Stream)**: 데이터의 흐름
    - 일정한 크기로 나눠서 여러 번에 걸쳐서 처리
    - 버퍼(또는 청크)의 크기를 작게 만들어서 주기적으로 데이터를 전달
    - 스트리밍: 일정한 크기의 데이터를 지속적으로 전달하는 작업

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img6.png" width="850" height="150"/>

**Buffer의 메서드**:
- from(문자열): 문자열을 버퍼로 바꿀 수 있음, length 속성은 버퍼의 크기를 알려줌, 바이트 단위임
- toString(버퍼): 버퍼를 다시 문자열로 바꿀 수 있음, 이때 base64나 hex를 인자로 넣으면 해당 인코딩으로도 변환할 수 있음
- concat(배열): 배열 안에 든 버퍼들을 하나로 합침
- alloc(바이트): 빈 버퍼를 생성, 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성됨

**파일 읽는 스트림 & 파일 쓰는 스트림:**
- fs.createReadStream:
    - createReadStream에 인자로 파일 경로와 옵션 객체 전달
    - highWaterMark 옵션은 버퍼의 크기(바이트 단위, 기본값 64KB)
    - data(chunk 전달), end(전달 완료), error(에러 발생) 이벤트 리스너와 같이 사용

- fs.createWriteStream
    - createReadStream에 인자로 파일 경로 전달
    - write로 chunk 입력, end로 스트림 종료
    - 스트림 종료 시 finish 이벤트 발생

**Pipe:**
- pipe로 여러 개의 스트림을 이을 수 있음
- 파일 압축 가능
    - 압축에는 zlib 내장 모듈 사용 (createGzip으로 .gz 파일 생성)
<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img7.png" width="300" height="270"/>

**기타 fs 메서드:**
- fs.existsSync
- fs.stat
- fs.access(경로, 옵션, 콜백): 폴더나 파일에 접근할 수 있는지 체크
- fs.mkdir(경로, 콜백): 폴더를 만드는 메서드
- fs.open(경로, 옵션, 콜백): 파일의 아이디를 가져오는 메서드
- fs.rename(기존 경로, 새 경로, 콜백): 파일의 이름을 바꾸는 메서드
- fs.readdir(경로, 콜백): 폴더 안의 내용물을 확인해줌
- fs.unlink(경로, 콜백): 파일 지워줌
- fs.rmdir(경로, 콜백): 폴더 지워줌
- fs.copyFile: 파일 복사

**스레드풀(Thread_pool)**
- fs, crypto, zlib 모듈의 메서드를 실행할 때는 백그라운드에서 동시에 실행됨
- 스레드풀이 동시에 처리해줌
- 스레드풀을 직접 컨트롤할 수는 없지만 개수 조절은 가능
    - 윈도우라면 터미널에 SET UV_THREADPOOL_SIZE=개수
    - 맥, 리눅스라면 UV_THREADPOOL_SIZE=개수

**events 모듈**
- events 모듈로 커스텀 이벤트를 만들 수 있음
    - on(이벤트명, 콜백): 이벤트 이름과 이벤트 발생 시의 콜백을 연결해줌 (이벤트 리스닝); 이벤트 하나에 여러개의 이벤트를 달아줄 수 있음
    - addListener(이벤트명, 콜백): on과 기능이 같음
    - emit(이벤트명): 이벤트를 호출하는 메서드; 이벤트 이름을 인자로 넣어주면 미리 등록해뒀던 이벤트 콜백이 실행됨
    - once(이벤트명, 콜백): 한 번만 실행되는 이벤트
    - removeAllListeners(이벤트명): 이벤트에 연결된 모든 이벤트 리스너를 제거
    - removeListener(이벤트명, 리스너): 이벤트에 연결된 리스너를 하나씩 제거
    - off(이벤트명, 콜백): 노드 10 버전에서 추가된 메서드로, removeListener와 기능이 같음
    - listenerCount(이벤트명): 현재 리스너가 몇 개 연결되어 있는지 확인함

#### 예외(Exception):
- 처리하지 못한 에러
- 노드 프로세스/스레드를 멈춤
- 노드는 기본적으로 스글 스레드이므로, 스레드가 멈춘다는 것은 프로세스가 멈추는 것
- 에러 처리는 필수
- 기본적으로 try-catch문으로 예외를 처리; 에러가 발생할 만한 곳을 try catch로 감쌈
<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img8.png" width="350" height="370"/>

- 노드 비동기 메서드의 에러는 따로 처리하지 않아도 됨; 콜백 함수에서 에러 객체 제공
<img src="https://github.com/suminb99/2024-1-Node.js-Study/blob/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img9.png" width="350" height="370"/>

- 프로미스의 에러는 따로 처리하지 않아도 됨; 경고 메시지가 뜨지만 프로세스는 멈추지 않음
<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img10.png" width="350" height="370"/>

- 예측 불가능한 에러 처리하는 방법: 'uncaughtException' 사용
    - 최후의 수단으로 사용
    - 콜백 함수의 동작이 보장되지 않음
    - 따라서 복구 작업용으로 쓰는 것은 부적합
    - **에러 내용 기록 용으로만 쓰는 게 좋음**
    
<img src="https://github.com/suminb99/2024-1-Node.js-Study/blob/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week4/img11.png" width="350" height="370"/>

