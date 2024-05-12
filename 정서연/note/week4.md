# 섹션 2. 노드 기본 기능 익히기 2

---

**단방향 암호화(crypto)**

- 암호화는 가능하지만 복호화는 불가능
    - 암호화: 평문을 암호로 만듦
    - 복호화: 암호를 평문으로 해독
- 단방향 암호화의 대표 주자는 해시 기법
    - 비밀번호는 암호화가 아니라 해시이지만 편의상 암호화라고 부름.
    - 문자열을 고정된 길이의 다른 문자열로 바꾸는 방식
    - abcdefgh 문자열 → qvew(항상 같은 결과가 나옴)
    - 평문을 해시로 만들고 되돌릴 수 없어 비밀번호에 많이 쓰임
- Hash 사용하기(sha512)
    - createHash(알고리즘) → 사용할 해시 알고리즘 넣기
        - md5, sha1, sha256, sha512 등이 가능하지만, md5와 sha1은 이미 취약점이 발견됨
        - 현제는 sha512정도로 충분하지만 나중에 sha512 마저도 취약해지면 더 강화된 알고리즘으로 바꿔야 함
    - update(문자열)
    - digest(인코딩)
        - base64, hex, latin1이 주로 사용되는데 그중 base64가 결과 문자열이 가장 짧아서 애용된다. 결과물로 변환된 문자열을 반환
        
        ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled.png)
        
- pbkdf2
    - 컴퓨터의 발달로 기존 암호화 알고리즘이 위협 받고 있음
        - sha512가 취약해지면 sha3으로 넘어가야 함
        - 현재는 pbkdf2나 bcrypt, scrypt 알고리즘으로 비밀번호를 암호화
        - Node는 pbkdf2와 scrypt 지원
        - crypto.randomBytes로 64바이트 문자열 생성 → salt 역할
        - pbkdf2 인수로 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 알고리즘
        - 반복 횟수를 조정해 암호화하는 데 1초 정도 걸리게 맞추는 것이 권장
        
        ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%201.png)
        
- 양방향 암호화
    - 대칭형 암호화(암호문 복호화 가능)
        - key가 사용됨
        - 암호화할 때와 복호화 할 때 같은 Key를 사용해야 함
        - 해커들이 Key 자체를 훔쳐가려고 하기 때문에 생각보다 취약함
        - 프런트와 서버 중 한 곳이라도 공개되어 있다면 같은 Key를 사용하는 암호화를 하면 안됨
        - 예전에는 createCipher을 사용하였지만 초기화 벡터 공격 때문에 createCipheriv를 사용
        
        ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%202.png)
        
- 양방향 암호화 메서드
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%203.png)
    
    - 비밀번호 관리에 어려움을 겪기 때문에 AWS Key Management Service (KMS)와 같은 서비스를 사용하기도 함
    - 콘솔에 찍히거나 로그에 남지 않게 조심하기

**util**

- 각종 편의 기능을 모아둔 모듈
- deprecated와 promisify가 자주 쓰임
- deprecated
    - 잘못 만들어진 코드가 생겼을 때 그 코드를 기반으로 하는 다른 코드가 있다면 코드를 삭제 할 수 없음(해당 코드를 이미 사용하고 있는 코드가 고장남)
    - deprecated로 잘못 만든 코드를 감싸 메세지를 띄워 사용자들이 다른 코드로 옮겨 갈 수 있도록 함(코드를 옮기지 않아도 작동은 한다)
    - 시간이 지난 후 다음 버전으로 업데이트 할 때 해당 코드를 삭제 함
- promisify
    - callback에서 promise기반으로 옮겨가는 중인데 위와 같은 이유로 callback을 없앨 수 없어 promisfy를 promise 대용을 씀
    - node에서 promise, async등을 지원 안 하는 경우가 가끔 있음
    - 바꿀 함수를 인자로 제공 → async/await 패턴까지 사용할 수 있어 좋음
        - callback이 (error, data) 형식이어야 함

![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%204.png)

**worker_threads**

- 노드에서 멀티 스레드 방식으로 작업할 수 있음
- isMainThread: 현재 코드가 메인 스레드에서 실행되는지, 워커 스레드에서 실행되는지 구분
- 메인 스레드에서는 new Worker를 통해 현재 파일(__filename)을 워커 스레드에서 실행 시킴
- worker.postMessage로 부모에서 워커로 데이터를 보냄
- parentPort.on(’message’)로 부모로부터 데이터를 받고, postMessage로 데이터를 보냄

```jsx
const {Worker, isMainThread, parentPort} = require('worker_threads')

if (isMainThread){ //메인 스레드
    const worker = new Worker(__filename)

    // 워커 스레드에서 받아오기
    worker.on('message', (value)=>{console.log('워커로부터', value)})

    // parentPort.close()를 인식
    worker.on('exit', ()=> console.log('워커 끝'))

    // 워커 스레드로 전달하기
    worker.postMessage('ping');
} else{ // 워커 스레드
    parentPort.on('message', (value)=>{
        // 메인 스레드에서 받아오기
        console.log('부모로부터', value)
        // 메인 스레드로 전달하기
        parentPort.postMessage('pong')
        parentPort.close()
    })
}
----
부모로부터 ping
워커로부터 pong
워커 끝
```

```jsx
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')

if (isMainThread){
    const threads = new Set()
    threads.add(new Worker(__filename,{
        workerData: {start:1}
    }))
    threads.add(new Worker(__filename,{
        workerData: {start:2}
    }))
    for (let worker of threads){
        worker.on('message', (value)=>{console.log('워커로부터', value)})
        worker.on('exit', ()=> {
            threads.delete(worker)   
            if (threads.size===0){
                console.log('워커 끝')
            }
        })
    }    
} else{
    const data = workerData
    parentPort.postMessage(data.start + 100)

----
워커로부터 101
워커로부터 102
워커 
```

- 2~10,000,000 사 소수 찾기
    - 싱글 스레드
        
        ```jsx
        const min = 2;
        const max = 1000_0000
        const primes = []
        
        function generatePrimes(start, range){
            let isPrime = true;
            const end = start + range
            for (let i = start; i < end; i++){
                for(let j = min; j<Math.sqrt(end); j++){
                    if (i!==j&&i%j===0){
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime){
                    primes.push(i)
                }
                isPrime = true;
            }
        }
        console.time('prime')
        generatePrimes(min, max)
        console.timeEnd('prime')
        console.log(primes.length)
        ----
        prime: 10.680s
        664579
        ```
        
    - 멀티 스레드
        
        ```jsx
        const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
        
        const min = 2;
        let primes = [];
        
        function findPrimes(start, end) {
          let isPrime = true;
          for (let i = start; i <= end; i++) {
            for (let j = min; j < Math.sqrt(end); j++) {
              if (i !== j && i % j === 0) {
                isPrime = false;
                break;
              }
            }
            if (isPrime) {
              primes.push(i);
            }
            isPrime = true;
          }
        }
        
        if (isMainThread) {
          const max = 10000000;
          const threadCount = 8;
          const threads = new Set();
          const range = Math.floor((max - min) / threadCount);
          let start = min;
          console.time('prime');
          for (let i = 0; i < threadCount - 1; i++) {
            const end = start + range - 1;
            threads.add(new Worker(__filename, { workerData: { start, range: end } }));
            start += range;
          }
          threads.add(new Worker(__filename, { workerData: { start, range: max } }));
          for (let worker of threads) {
            worker.on('error', (err) => {
              throw err;
            });
            worker.on('exit', () => {
              threads.delete(worker);
              if (threads.size === 0) {
                console.timeEnd('prime');
                console.log(primes.length);
              }
            });
            worker.on('message', (msg) => {
              primes = primes.concat(msg);
            });
          }
        } else {
          findPrimes(workerData.start, workerData.range);
          parentPort.postMessage(primes);
        }
        ----
        primes: 2.030s
        664579
        ```
        
    - 워커 스레드 수와 속도가 비례하지 않음
    - 노드에서 워커 스레드는 비추, 다른 언어는 추천

**child_process**

- 노드 내에서 다른 언어 사용하기
    
    ```jsx
    // dir을 노드에서 사용하기
    const exec = require('child_process').exec;
    
    var process = exec('dir')
    
    process.stdout.on('data', function (data){
        console.log(data.toString('utf8'))
    })
    process.stderr.on('data', function(data){
        console.error(data.toString('utf8'))
    })
    ```
    
    - 워커 스레드만 다른 언어로 만들자
        
        ```jsx
        const spawn = require('child_process').spawn
        const process = spawn('python', ['test.py'])
        
        process.stdout.on('data', function (data){
            console.log(data.toString('utf8'))
        })
        process.stderr.on('data', function(data){
            console.error(data.toString('utf8'))
        })
        ```
        
        ```python
        print('hello python')
        ```
        
- 기타 모듈들
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%205.png)
    

**파일 시스템 사용하기**

- `fs`
    - 파일 시스템에 접근하는 모듈
    - 파일/폴더 생성, 삭제, 읽기, 쓰기 가능
    - 웹 브라우저에서는 제한적이었으나 노드는 권한을 가지고 있음
    - 보안 조심
    - 파일 읽기 예제
        
        ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%206.png)
        
        - callback에서 promise로 전환하기
            
            ```jsx
            const fs = require('fs').promises;
            
            fs.readFile('./readMe.txt')
                .then ((data)=>{
                    console.log(data)
                    console.log(data.toString())
                })
                .catch((err)=>{
                    throw err;
                })
            ```
            
        - write 파일
            
            ```jsx
            const fs = require('fs').promises;
            
            fs.writeFile('./writeme.txt', '글이 입력됩니다.')
                .then (()=>{
                })
                .catch((err)=>{
                    throw err;
                })
            ```
            
            ```jsx
            const fs = require('fs').promises;
            
            fs.writeFile('./writeme.txt', '글이 입력됩니다.')
                .then (()=>{
                    return fs.readFile(('./writeme.txt'))
                })
                .then((data)=>{
                    console.log(data.toString())
                })
                .catch((err)=>{
                    throw err;
                })
            ```
            
    - promise는 비동기이기 때문에 어떤 것이 먼저 실행되는지 모름
        
        ```jsx
        const fs = require('fs')
        
        fs.readFile('./readme.txt', (err, data)=>{
            if (err){
                throw err
            }
            console.log('1번: ', data.toString())
        })
        fs.readFile('./readme.txt', (err, data)=>{
            if (err){
                throw err
            }
            console.log('2번: ', data.toString())
        })
        fs.readFile('./readme.txt', (err, data)=>{
            if (err){
                throw err
            }
            console.log('3번: ', data.toString())
        })
        ```
        
- 동기 메서드와 비동기 메서드
    - 순서에 맞게 실행하려면
        - 동기과 비동기: 백그라운드 작업 완료 확인 여부
        - 블로킹과 논 블로킹: 함수가 바로 return 되는지 여부
        - 노드에서는 대부분 동기-블로킹 방식과 비동기-논블로킹 방식
        
        ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%207.png)
        
        - 딱 한번만 사용하거나, 시작에 초기화할 때 동기-블로킹을 사용하는 것이 좋음
        - 서버 시작 후에는 웬만하면 동기 안 쓰는 것이 좋음 (비동기-논블로킹 사용하기)
        - callback hell이 발생하면 promise 또는 async await 사

**버퍼와 스트림 이해하기**

- 버퍼: 일정한 크기로 모아두는 데이터
    - 일정한 크기가 되면 한 번에 처리
    - 버퍼링: 버퍼에 데이터가 찰 때까지 모으는 작업
- 스트림: 데이터의 호출
    - 일정한 크기로 나눠서 여러 번에 걸쳐서 처리
    - 버퍼(또는 청크)의 크기를 작게 만들어서 주기적으로 데이터를 전달
    - 스트리밍: 일정한 크기의 데이터를 지속적으로 전달하는 작업
- 예제
    
    ```jsx
    const buffer = Buffer.from('저를 버퍼로 바꿔보세요')
    console.log(buffer)
    console.log(buffer.length)
    console.log(buffer.toString())
    
    const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')]
    // Buffer.concat으로 Buffer.from을 합쳐주기
    console.log(Buffer.concat(array).toString())
    
    // 5byte 버퍼 만들기
    console.log(Buffer.alloc(5))
    ```
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%208.png)
    
    ```jsx
    const fs = require('fs')
    const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16})
    // createReadStream이 한번에 읽는 크기는 64KByte
    // 일반 텍스트를 넣으면 그냥 한번에 읽힘 -> highWaterMark를 이용해 16byte로 줄이기
    
    const data = []
    // 나누기 
    readStream.on('data', (chunk)=>{
        data.push(chunk)
        console.log('data: ', chunk, chunk.length)
    })
    // 합치기 
    readStream.on('end', ()=>{
        console.log('end: ', Buffer.concat(data).toString())
    })
    readStream.on('error', (err)=>{
        console.log('error: ', err)
    })
    ```
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%209.png)
    
    ```jsx
    // 스트림으로 write 하기 
    const fs = require('fs')
    
    const writeStream = fs.createWriteStream('./writeme2.txt')
    writeStream.on('finish',()=>{
        console.log('파일 쓰기 완료')
    })
    writeStream.write('이 글을 씁니다.\n')
    writeStream.write('한번 더 씁니다.\n')
    writeStream.end()
    ```
    
- 서버의 메모리를 적게 차지하면서 효율적으로 데이터를 전달하기 때문에 대부분 스트림이 효율적(요청 응답도 대부분 스트림)

**pipe**

- 파이프 연결
    - 1메가씩 전달하는 스트림끼리 파이프로 연결할 수 있음
    - 1메가 데이터 조각에 조작을 가할 수 있음
    
    ```jsx
    const fs = require('fs');
    const zlib = require('zlib');
    
    const readStream = fs.createRedStream('./readme3.txt', { highWaterMark: 16 });
    const zlibStream = zlib.createGzip();
    const writeStream = fs.createWriteStream('./writeme3.txt.gz');
    readStream.pipe(zlibStream).pipe(writeStream);
    ```
    

**스트림 메모리 효율 확인**

- 버퍼 방식
    
    ![19메가바이트 → 1기가바이트 (1기가 기준)](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%2010.png)
    
    19메가바이트 → 1기가바이트 (1기가 기준)
    
- 스트림 방식
    
    ![19메가바이트 → 31메가바이트 (1기가 기준)](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%2011.png)
    
    19메가바이트 → 31메가바이트 (1기가 기준)
    
- 파일 및 폴더 생성, 삭제
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%2012.png)
    

**스레드풀**

- fs, crypto, zlib 모듈의 메서드를 실행할 때는 백그라운드에서 동시에 실행됨
    - 스레드풀이 동시에 처리해줌
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%2013.png)
    
    - 자신의 코어 수에 맞게 실행되게 하는 명령어
        - `SET UV_THREADPOOL_SIZE=코어 수`

**커스텀 이벤트**

- 예제
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%202%20%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%A8%E1%84%92%E1%85%B5%E1%84%80%E1%85%B5%202%20ddacacf8730d4f6680256dbc240dc32d/Untitled%2014.png)
    

**에러 처리하기** 

- 예외(Exception): 처리하지 못한 에러
    - 노드 스레드를 멈춤
    - 노드는 기본적으로 싱글 스레드라 스레드가 멈춘다는 것은 프로세스가 멈추는 것
    - 에러 처리는 필수
- 기본적으로 try catch문으로 예외 처리
    - 에러가 발생할 만한 곳을 try catch로 감쌈
    
    ```jsx
    setInterval(() => {
      console.log('시작');
      try {
        throw new Error('서버를 고장내주마!');
      } catch (err) {
        console.error(err);
      }
    }, 1000);
    ```
    
- 노드 비동기 메서드의 에러는 따로 처리하지 않아도 됨
    - 콜백 함수에서 에러 객체 제공
    
    ```jsx
    const fs = require('fs');
    
    setInterval(() => {
      fs.unlink('./abcdefg.js', (err) => {
        if (err) {
          console.error(err);
        }
      });
    }, 1000);
    ```
    
- 프로미스의 에러는 따로 처리하지 않아도 됨
    - 버전이 올라가면 동작이 바뀔 수 있음
    
    ```jsx
    const fs = require('fs').promises;
    
    setInterval(() => {
      fs.unlink('./abcdefg.js').catch(console.error);
    }, 1000);
    ```
    
- 최후의 수단으로 사용
    - 콜백 함수의 동작이 보장되지 않음
    - 따라서 복구 작업용으로 쓰는 것은 부적합
    - 에러 내용 기록용으로만 쓰는 게 좋음
    
    ```jsx
    process.on('uncaughtException', (err) => {
      console.error('예기치 못한 에러', err);
    });
    
    setInterval(() => {
      throw new Error('서버를 고장내주마!');
    }, 1000);
    
    setTimeout(() => {
      console.log('실행됩니다');
    }, 2000);
    ```