## < 섹션 1. 알아두어야 할 자바스크립트 >

### 2.1 호출 스택, 이벤트 루프

- #### 호출 스택 (Call Stack):
    - 자바스크립트 안에서 실행되는 모든 함수의 호출을 기록하고 추적하는 스택 자료구조
    - Anonymous은 가상의 전역 컨텍스트 (항상 있다고 생각하는게 좋음)
        - 파일 실행시 가장 먼저 쌓임
    - 함수 호출 순서대로 쌓이고, 역순으로 실행됨
        - LIFO (후입선출) 구조라서 스택이라고 불림
    - 호출 스택만으론 자바스크립트의 모든 동작 (ex: 비동기 호출) 을 설명할 수 없음
        - 호출 스택 + 이벤트 루프로 설명할 수 있음
</br>  

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week2/img1.png" width="350" height="400"/>

위 코드의 실행 순서:

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week2/img2.png" width="500" height="300"/>


        
- #### 이벤트 루프 (Event Loop):
    - 이벤트 루프: 이벤트 발생(setTimeout 등) 시 호출할 콜백 함수들(위의 예제에서는 run)을 관리하고, 호출할 순서를 결정하는 역할
    - 태스크 큐: 이벤트 발생 후 호출되어야 할 콜백 함수들이 순서대로 기다리는 공간
    - 백그라운드: 타이머나 I/O 작업 콜백, 이벤트 리스너들이 대기하는 공간. 여러 작업이 동시에 실행될 수 있음
 
</br>  

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week2/img4.png" width="370" height="250"/>

<img src="https://raw.githubusercontent.com/suminb99/2024-1-Node.js-Study/main/%EB%B0%B1%EC%88%98%EB%AF%BC/image/week2/img5.png" width="400" height="300"/>

1. anonymous와 setTimeOut()이 순차적으로 호출 스택에 쌓임
2. setTimeOut 실행 시 콜백 run은 백그라운드로 보내짐
3. 호출 스택 실행이 끝나 비워지면 이벤트 루프가 태스크 큐의 콜백을 호출 스택으로 올림
4. run이 호출 스택에서 실행되고 비워지고, 이벤트 루프는 태스크 큐에 콜백이 들어올 때까지 대기
---
- 코드가 백그라운드로 가면 호출 스택과 백그라운드가 동시에 실행됨
- 백그라운드 코드는 다른 스레드가 실행함
- 호출 스택 + 백그라운드 동시에 실행 시 => 멀티 스레드
- 노드에서 백그라운드로 보낼 수 있는 함수들을 제한함 (ex: setTimeOut(), setInterval(), 네트워크 요청 등 => 이 외의 코드는 동기적으로 돌아감)
- 이벤트 루프에 의해서 태스크 큐에 있는 함수가 호출 스택으로 이동할 때 호출 스택은 항상 비어있어야 함
- Promise.then/catch, process.nextTick => 우선순위가 다른 함수보다 높음 
- 백그라운드는 자바스크립트가 아닌 c++ 또는 운영체제 쪽임
- 노드에서는 백그라운드와 테스크 큐를 libuv(C/C++로 구현됨)에서 관리 하므로 멀티 스레드가 가능함
- 자바스크립트는 Worker Thread 또는 브라우저의 Web Worker를 통해 멀티 스레드 가능

---

### 2.2 ES2015+ 문법

- #### var, const, let
    - ES2015 이전에는 var로 변수를 선언, ES2015부터는 const와 let이 대체
    - var은 함수 스코프 But, 블록 스코프({}) 무시
    - const와 let은 블록 스코프({}) 존중
    - var: 해당 범위 내에서 업데이트, 재선언 모두 가능
    - let: 해당 범위 내에서 업데이트 가능 But, 재선언 불가능
    - const: 해당 범위 내에서 업데이트, 재선언 불가능 But, 개체의 속성은 업데이트 가능
        - 변경하고자 할 때는 let으로 변수 선언
        - 상수 선언 시부터 초기화가 필요함
        - 초기화를 하지 않고 선언하면 에러
    
```JavaScript
if (true) {
    const x = 3;
}

console.log(x); //에러 (블록 스코프 존중)
```

```JavaScript
function a() {
    var y = 3;
}
console.log(y); //에러 (함수 스코프 존중)
```

- #### 템플릿 문자열
    - ES2015부터는 ` (백틱) 사용 가능
    - 백틱 문자열 안에 ${변수}처럼 사용
    
```JavaScript
const num1 = 1;
const num2 = 2;
const result = 3;
const string1 = `${num1} 더하기 ${num2}는 '${result}'`;
console.log(string1);
```

- #### 객체 리터럴
    - ES2015부터 훨씬 간결한 문법으로 객체 리터럴 표현 가능

```JavaScript
var sayNode = function() {
    console.log('Node');
};
var es = 'ES';
<br/>
const newObject = {
    sayJS() {
        console.log('JS');
    }, // 객체의 메서드에 :function 붙이지 않아도 됨
    sayNode, // { sayNode : sayNode } => { sayNode } 축약
    [es + 6]: 'Fantastic' // [변수 + 값] 동적 속성명을 객체 속성 명으로 사용 가능
}

newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic
```

- #### 화살표 함수
    - add1, add2, add3, add4는 같은 기능을 하는 함수
        
```JavaScript
function add1 (x, y) {
    return x + y;
}

const add2 = (x, y) => { // add1을 화살표 함수로 나타낼 수 있음
    return x + y;
}

const add3 = (x, y) => x + y; // 함수의 본문이 return만 있는 경우 return 생략

const add4 = (x, y) => (x + y); // return이 생략된 함수의 본문을 소괄호로 감싸줄 수 있음

function not1(x) {
    return !x;
}

const not2 = x => !x; // not1과 같은 기능을 함(매개변수 하나일 때 괄호 생략)
```
```JavaScript
const relationship = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};

relationship.logFriends();
```
- forEach의 인자로 화살표 함수가 들어간 것에 주목
    - forEach의 화살표함수의 this와 logFriends의 this가 같아짐
    - 화살표 함수는 자신을 포함하는 함수의 this를 물려받음
    - 물려받고 싶지 않을 때: function() {}을 사용
- 객체를 리턴하는 경우 소괄호 필수 

- #### 구조분해 할당
    - this를 사용하고 있는 경우엔 구조분해 할당 X

```JavaScript
const example = { a: 123, b: { c: 135, d: 146 } }
const a = example.a;
const b = example.b.d;

const { a, b: { d } } = example; // 구조분해 할당
console.log(a); // 123
console.log(d); // 146
```

```JavaScript
const array = ['nodejs', {}, 10, true];
const [node, obj, , bool] = array
console.log(node); // 'nodejs'
```  

- #### 클래스
    - 프로토타입 문법을 깔끔하게 작성할 수 있는 Class 문법 도입
        - Constructor(생성자), Extends(상속) 등을 깔끔하게 처리할 수 있음
        - 코드가 그룹화되어 가독성이 향상됨
    - 전반적으로 코드 구성이 깔끔해짐
        - Class 내부에 관련된 코드들이 묶임
        - Super로 부모 Class 호출
        - Static 키워드로 클래스 메서드 생성
        
```JavaScript
class Human {
    constructor(type = 'human') {
        this.type = type;
    }
}

static isHuman(human) {
    return human instanceof Human;
}

breathe() {
    alert('h-a-a-a-m');
}

class Zero extends Huma {
    constructor(type, firstName, lastName) {
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
    }
}

const newZero = new Zero('human', 'Zero', 'teacher');
Human.isHuman(newZero); // true
``` 

- #### 프로미스
    - 콜백 헬이라고 불리는 지저분한 자바스크립트의 코드의 해결책 => 노드 생태계가 콜백에서 프로미스 함수로 전환되고 있음
    - 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
    - Then을 붙이면 결과를 반환함
    - 실행이 완료되지 않았으면 완료된 후에 Then 내부 함수가 실행됨
    - Resolve(성공리턴값) -> then으로 연결
    - Reject(실패리턴값) -> catch로 연결
    - Finally 부분은 무조건 실행됨
    - 프로미스의 then 연달아 사용 가능 (프로미스 체이닝)
    
```JavaScript
const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    
    } else {
        reject('실패');
    }
});

promise
    .then((message) => {
        console.log(message); // 성공(resolve)한 경우 실행
    }) 
    .catch((error) => {
        console.error(error); // 실패(reject)한 경우 실행
    })
    .finally(() => { // 끝나고 무조건 실행
        console.log('무조건');
    });
```
    
Promise.all(배열): 여려 개의 프로미스를 동시에 실행
    - 하나라도 실패하면 catch로 감
    - allSettled로 실패한 것만 추려낼 수 있음  

- #### async / await
    - 프로미스의 문법을 간단하게 만든 것 => 고로 프로미스의 성질을 그대로 가진다
    - async function의 도입:
        - 변수 = await 프로미스;인 경우 프로미스가 resolve된 값이 변수에 저장
        - 변수 await 값;인 경우 그 값이 변수에 저장
    - 에러 처리를 위해 try-catch로 감싸주어야 함
    - 화살표 함수도 async/await 가능
    - Async 함수는 항상 promise를 반환(return)
    - for await of 
        - 노드 10부터 지원
        - for await (변수 of 프로미스배열)
         - resolve된 프로미스가 변수에 담겨 나옴
         -await을 사용하기 때문에 async 함수 안에서 해야함
         
```JavaScript
// 프로미스 패턴 코드
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then ((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .catch(err => {
            console.error(err)
        });
    }
// async function 코드
async function findAndSaveUser(Users) {
    let user = await Users.findOne({});
    user.naem = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm; });
    // 생략
```   

- #### Map/Set         
    - Map은 객체와 유사한 자료구조
    - Set은 배열과 유사한 자료구조
        - 기존 배열의 중복을 제거할 때도 사용  

- #### 널 병합, 옵셔널 체이닝
  - ??(널 병합, nullish coalescing) 연산자 => || 대용으로 사용되며, falsy 값 중 null과 undefined만 따로 구분함
  - ?.(옵셔널 체이닝, optional chaining) 연산자 => Null이나 undefined의 속성을 조회하는 경우 에러가 발생하는 것을 막음
 
```JavaScript
const a = 0;
const b = a || 3; // || 연산자는 falsy 값이면 뒤로 넘어감
console.log(b); // 3

const c = 0;
const d = c ?? 3; // ?? 연사자는 null과 undeined일 때만 뒤로 넘어감
console.log(d); // 0

c = null
c?.[0] ?? '123' // '123'

d = [1, 2, 3]
d?.[0] ?? '123' // 1
```

---  

### 2.3 프론트엔드 자바스크립트

- #### AJAX
    - 서버로 요청을 보내는 코드
        - 라이브러리 없이는 브라우저가 지원하는 XMLHttpRequest 객체 이용
        - AJAX 요청 시 Axios 라이브러리를 사용하는 게 편함.
        - HTML에 아래 스크립트를 추가하면 사용할 수 있음.
    - GET 요청 보내기
        - axios.get 함수의 인수로 요청을 보낼 주소를 넣으면 됨
        - 프로미스 기반 코드라 async/await 사용 가능.
    - POST 요청을 하는 코드(데이터를 담아 서버로 보내는 경우)
        - 전체적인 구조는 비슷하나 두 번째 인수로 데이터를 넣어 보냄
        
- #### FormData
    - HTML form 태그에 담긴 데이터를 AJAX 요청으로 보내고 싶은 경우 => FormData 객체 이용
    - FormData 메서드
        - Append로 데이터를 하나씩 추가
        - Has로 데이터 존재 여부 확인
        - Get으로 데이터 조회
        - getAll로 데이터 모두 조회
        - delete로 데이터 삭제
        - set으로 데이터 수정
    - FormData POST 요청으로 보내기
        - Axios의 data 자리에 formData를 넣어서 보내면 됨
        
- #### encodeURIComponent, decodeURIComponent
    - 가끔 주소창에 한글 입력하면 서버가 처리하지 못하는 경우 발생 => encodeURIComponent로 한글 감싸줘서 처리 => decodeURIComponent로 서버에서 한글 해석

- #### data attribute와 dataset
    - HTML 태그에 데이터를 저장하는 방법
        - 서버의 데이터를 프런트엔드로 내려줄 때 사용
        - 태그 속성으로 data-속성명
        - 자바스크립트에서 태그.dataset.속성명으로 접근 가능
            - data-user-job -> dataset.userJob
            - data-id -> dataset.id
        - 반대로 자바스크립트 dataset에 값을 넣으면 data-속성이 생김
            - dataset.monthSalary = 10000 -> data-month-salary=“10000”
