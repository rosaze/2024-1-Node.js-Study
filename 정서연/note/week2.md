# 섹션 1. 알아두어야 할 자바스크립트

---

**호출 스택**

```jsx
function first() {
	second();
	console.log('첫 번째');
}
function second() {
	third();
	console.log('두 번째');
}
function third() {
	console.log('세 번째');
}
```

![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%201%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%83%E1%85%AE%E1%84%8B%E1%85%A5%E1%84%8B%E1%85%A3%20%E1%84%92%E1%85%A1%E1%86%AF%20%E1%84%8C%E1%85%A1%E1%84%87%E1%85%A1%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B8%E1%84%90%E1%85%B3%207b4f39b7bccd48b5b707ce46a558e20c/Untitled.png)

호출 스택(함수의 호출, 자료구조의 스택)

- Anonymous은 가상의 전역 컨텍스트(항상 있다고 생각하는게 좋음)
    - 파일이 시작될 때 생기고 파일이 끝나면 사라짐 → 실행 완료
- 함수 호출 순서대로 쌓이고, 역순으로 실행됨
- 함수 실행이 완료되면 스택에서 빠짐
- LIFO 구조(후입 선출)라서 스택이라고 불림
- 자바스크립트 코드가 동기로 실행되는지 확인할 수 있음

비동기

```jsx
function run() {
	console.log('3초 후 실행');
}
console.log('시작');
setTimeout(run, 3000);
console.log('끝');
```

- 호출 스택(JS)만으로는 설명이 안됨
- 호출 스택 + 이벤트 루프로 설명할 수 있음

**이벤트 루프**

- 백그라운드(c++)에 코드가 있으면 동시에 실행 가능(비동기적)
- 항상 호출 스택이 먼저 실행
- 호출 스택, 백그라운드, 태스크 큐가 모두 비어 있으면 실행 완료

```jsx
function oneMore() {
	console.log('one more');
}
function run() {
	console.log('run run');
	setTimeout(() => {
		console.log('wow');
	}, 0)
	new Promise((resolve) => {
		resolve('hi');
	})
	.then(console.log);
	oneMore();
}

setTimeout(run, 5000);
```

- 호출스택(anonymous, setTimeout(run, 5000)
- 호출스택(anonymous) 백그라운드(타이머(run, 5초))
- 백그라운드(타이머(run, 5초))  → 5초 후
- 태스크 큐(run) → 호출 스택이 비어 있을 때 이벤트 루프에 의해 호출 스택으로 이동
- 호출 스택(run) → console.log(’run run’)
- 호출 스택(run, setTimeout(익명, 0)) 바로 실행 x
- 호출 스택(run, new Promise, resolve(hi)) 백그라운드(타이머(익명, 0))
- 호출 스택(run) 백그라운드(타이머(익명, 0), then console.log(hi))
- 호출 스택(run, oneMore) 백그라운드(타이머(익명, 0), then console.log(hi)) → console.log(one more)
- 호출 스택(run) 백그라운드(타이머(익명, 0), then console.log(hi))
- 백그라운드(타이머(익명, 0), then console.log(hi))
- 태스크 큐(익명, console.log(hi))
- 호출 스택(console.log(hi) 태스크 큐(익명) → console.log(hi)
- 호출 스택(익명) → console.log(wow)
- 실행 완료

콘솔로그: run run → one more → hi → wow (promise가 우선순위)

promise.then/catch, process.nextTick → timeout보다 우선순위 높음

**var, const, let**

var

ES2015 이전에는 var로 변수를 선언

- ES2015부터는 const와 let이 대체
- 가장 큰 차이점: 블록 스코프(var은 함수 스코프)

```jsx
if (true) {
	var x = 3;
}
console.log(x); // 3

if (true) {
	const y = 3;
}
console.log(y); // Uncaught ReferenceError: y is not defined
```

기존: 함수 스코프(function() {}이 스코프의 기준점)

- 다른 언어와는 달리 if나, for, while은 영향을 미치지 못함
- const와 let은 함수 및 블록({})에도 별도의 스코프를 가짐
- var는 함수 스코프를 존중한다

const: 한 번 값을 정하면 변경 불가 

```jsx
const a = 3;
a = '5' // Error

const b = { name: 'Zerocho' };
b.name = 'nerocho';

const c; // Error
```

let: 값 변경 가능 

```jsx
let c = 5;
c = 3;
```

**템플릿 문자열**

```jsx
const result = `이 과자는 ${won}원입니다`;

function a() {}
a();
a``; // 태그드 템플릿 리터럴(최신 문법)
```

**객체 리터럴**

ES5 시절의 객체 표현 방법(속성 표현 방식에 주목)

```jsx
var sayNode = function() {
	console.log('Node');
};
var es = 'ES';
var oldObject = {
	sayJS: function() {
		console.log('JS');
	},
	sayNode: sayNode, 
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject, ES6); // Fantastic
```

훨씬 간결한 문법으로 객체 리터럴 표현 가능

- 객체의 메서드에 :function을 붙이지 않아도 됨
- { sayNode: sayNode }와 같은 것을 {sayNode}로 축약 가능
- [변수 + 값] 등으로 동적 속성명을 객체 속성 명으로 사용 가능

```jsx
const newObject = {
	sayJS() {
		console.log('JS');
	},
	sayNode,
	[es + 6]: 'Fantastic',
};
newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic
```

**화살표 함수**

add1, add2, add3, add4는 같은 기능을 하는 함수

- add2: add1을 화살표 함수로 나타낼 수 있음
- add3: 함수의 본문이 return만 있는 경우 return 생략
- add4: return이 생략된 함수의 본문을 소괄호로 감싸줄 수 있음
- not1과 not2도 같은 기능을 함(매개변수 하나일 때 괄호 생략)

```jsx
function add1(x, y) {
	return x + y;
}

const add2 = (x, y) => {
	return x + y;
}

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
	return !x;
}

const not2 = x => !x;

// 많이 하는 실수
const obj = (x, y) => {
	return {x, y};
}
->
const obj = (x, y) => {x, y}; // 잘못 된 생략, 소괄화 필수 ({x, y})
```

화살표 함수가 기존 function() {}을 대체하는 건 아님(this가 달라짐)

- logFriends 메서드의 this 값에 주목
- forEach의 function의 this와 logFriends의 this는 다름
- that이라는 중간 변수를 이용해서 logFriends의 this를 전달

```jsx
var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        var that = this; // relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function (friend){ console.log (that.name, friend) });
    },
};
relationship1.logFriends();
```

```jsx
button.addEventListener('click', function() {
    console.log(this.textContent);
}); // 자기만의 this를 가짐
```

- this를 안 쓰면 다 화살표 함수로 하는게 좋음

**구조분해 할당**

```jsx
// 객체 
const example = {a:123, b: { c: 135, d: 146 }};
const a = example.a;
const d = example.b.d;

const {a, b: {d}} = example;
console.log(a); //123
console.log(d); //146

// 배열 
arr = [1, 2, 3, 4, 5];
const x = arr[0];
const y = arr[1];
const z = arr[4];

const [x, y, , , z] = arr;
```

this는 함수를 호출할 때 어떻게 호출되었냐에 따라 결정되기 때문에 this가 있을때 구조분해 할당이 안됨 

const{ 변수 } = 객체;로 객체 안의 속성을 변수명으로 사용가능

- 단, getCandy()를 실행했을 때 결과가 candyMachine.getCandy()와 달라짐

count처럼 속성 안의 속성도 변수명으로 사용 가능

```jsx
const candyMachine = {
	status: {
		name: 'node',
		count: 5,
	},
	getCandy() {
		this.status.count--;
		return this.state.count;
	},
};
const { getCandy, status: { count } } = candyMachine;
```

**클래스**

프로토타입 문법을 깔끔하게 작성할 수 있는 Class 문법 도입

- Constructor(생성자), Extends(상속) 등을 깔금하게 처리할 수 있음
- 코드가 그룹화되어 가독성이 향상됨

```jsx
var Human = function(type){ //생성자 대문자 선언
    this.type = type || 'human';
};

Human.isHuman = function(human){ //static method, 생성자 메서드
    return human instanceof Human;
}

Human.prototype.breathe = function(){ //instance method, 프로토타입 메서드
    console.log('h-a-a-a-m');
}
var Zero = function(type, firstName, lastName){
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}
Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Minju; //상속하는 부분
Zero.prototype.sayName = function(){
    console.log(this.firstName + ' ' + this.lastName);
}
var oldZero = new Minju('human', 'Zero', 'Cho');
Human.isHuman(oldZero);;
```

old → new(그룹화가 잘 되어 있음)

```jsx
class Human{
    constructor(type = 'human'){
        this.type = type;
    }
    static isHuman(human){
        return human instanceof Human;
    }
    breathe(){
        console.log('h-a-a-a-m');
    }
}

class Zero extends Human{
    constructor (type, firstName, lastName){
        super(type); // 부모 함수 실행
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayName(){
        super.breathe();
        console.log(`${this.firstName} ${this.lastName}`);
    }
}

const oldZero = new Minju('human', 'Zero', 'Cho');
Human.isHuman(oldZero);
oldZero.breathe();
```

**Promise**

: 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체(콜백 헬이라고 불리는 지저분한 자바스크립트 코드의 해결책)

- then을 붙이면 결과를 반환함
- 실행이 완료되지 않았으면 완료된 후에 then 내부 함수가 실행됨
- resolve(성공리턴값) → then으로 연결
- reject(실패리턴값) → catch로 연결
- Finally 부분은 무조건 실행됨

```jsx
const condition = true;
const promise = new Promise((resolve, reject)=>{
     if (condition){
         resolve('성공');
     } else {
         reject('실패');
     }
}); // 동기로 실행

// 다른 코드가 들어갈 수 있음
promise
    .then((message)=>{
        console.log(message); // 성공(resolve)한 경우 실행
    })
    .catch((error)=>{
        console.error(error); // 실패(reject)한 경우 실행
    })
```

코드를 분리할 수 있고(필요할 때 사용가능) 가독성이 좋아짐 

노드 생태계가 콜백 → 프로미스로 전환 중 

콜백 패턴(3중첩)을 피로미스로 바꾸는 예제

```jsx
function findAndSaveUser(Users) {
	Users.findOne({}, (err, user) => { // 첫 번재 콜백
		if (err) {
			return console.error(err);
		}
	}
	user.name = 'zero';
	user.save((err) => { // 두 번째 콜백
		if (err) {
			return console.error(err);
		}
		Users.findOne({ gender: 'm' }, (err, user) => { // 세 번째 콜백
			// 생략
		});
	});
```

→ findOne, save 메서드가 프로미스를 지원한다고 가정

```jsx
function findAndSaveUser(Users) {
	Users.findOne({})
		.then((user) => {
			user.name = 'zero';
			return user.save();
		})
		.then((user) => {
			return Users.findOne({ gender: 'm' });
		})
		.then((user) => {
			// 생략
		})
		.catch(err => {
		...
```

Promise.resolve(성공리턴값): 바로 resolve하는 프로미스

Promise.reject(실패리턴값): 바로 reject하는 프로미스

Promise.all(배열): 여러 개의 프룀스를 동시에 실행

- 하나라도 실패하면 catch로 감
- allSettled로 실패한 것만 추려내기 가능(더 많이 사용)

```jsx
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.error(error);
    });
```

**async/await**

이전 챕터의 프로미스 패턴 코드

- async/await으로 한 번 더 축약 가능
- async function의 도입
    - 변수 = await 프로미스;인 경우 프로미스가 resolve된 값이 변수에 저장
    - 변수 await 값;인 경우 그 값이 변수에 저장
    - 실행순서 오른쪽 → 왼쪽 (then 대신 await 사용)

```jsx
async funciton findAndSaveUser(Users){
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gener: 'm'});
    // 생략
}
```

예전에는 await은 항상 async 함수 안에 있어야 했음(top level await가 생겨서 사라짐)

reject를 처리할 수 없어서 try catch문을 사용해야 함 

화살표 함수도 async/await 가능

async 함수는 항상 promise를 반환(return)

- then이나 await을 붙일 수 있음

**for await of**

노드 10부터 지원

for await(변수 of 프로미스 배열)

- resolve된 프로미스가 변수에 담겨 나옴
- await을 사용하기 때문에 async 함수 안에서 해야함

```jsx
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

(async () => {
    for await (promise of [promise1, promise2]){
        console.log(promise);
    }
})();
```

**Map/Set**

ES2015에는 새로운 자료구조들이 추가되었으며 map과 set이 자주 쓰임

map은 객체와 유사, set은 배열과 유사 

**Map**

```jsx
const m = new Map();
m.set('a', 'b'); // set(키, 값)으로 Map에 속성 추가
m.set(3, 'c');  // 문자열이 아닌 것을 키로 사용 가능
const d = {};
m.set(d, 'e'); // 객체도 가능

m.get(d); // get(키)로 속성값 조회
// key를 객체로 쓸 수 있지만 같은 참조값을 가져야 같은 값이 나옴
console.log(m.get(d)); // e

m.size; // size로 속성 개수 조회
console.log(m.size); // 3

for (const [key,value] of m){ // 반복문에 바로 넣어 사용 가능
    console.log(k,v); // 'a', 'b', 3, 'c', {}, 'e'
} // 속성 간의 순서도 보정

m.forEach((v,k)=> { // forEach도 사용 가능
    console.log(k,v); // 결과 동일
})

m.has(d); // 키를 has에 입력해서 존재 여부 확인
console.log(m.has(d)); // true

m.delete(d); // 키를 delete에 입력해서 속성 삭제
m.clear(); // 속성 전부 제거
console.log(m.size); // 0
```

**Set**

배열을 완전히 대체하기엔 어려움, 중족을 허용하지 않는 것이 큰 특징 

```jsx
const s = new Set();

s.add(false); // add(요소)로 set에 추가
s.add(1);
s.add('1');
s.add(1); // 중복 무시
s.add(2);

console.log(s.size); // 4 (중복 제거)
```

map과 비슷한 부가기능

```jsx
s.has(1); // has(요소)로 요소 존재 여부 확인
console.log(s.has(1)); // true

for (cosnt a of s){
    console.log(a); // false 1 '1' 2
}

s.forEach((a) => {
    console.log(a); // false 1 '1' 2
})

s.delete(1); // delete(요소)로 요소를 제거
s.clear(); // 전부 제거
```

중복을 제거 하고 싶을 때 set 사용

```jsx
const arr = [1,3,2,7,2,6,3,5];

const s = new Set(arr);
const result = Array.from(s);
console.log(result); // 1, 3, 2, 7, 6, 5
```

set에서 다시 array로 돌리고 싶을때는 Array.from(s); 

**WeakMap / WeakSet**

가비지컬렉팅이 잘 됨(메모리 정리가 빠름)

```jsx
const wm = new WeakMap();
let obj3 = {};
wm.set(obj3, '123');

obj3 = null;
```

추가적인 정보 저장

```jsx
const user = { name: 'zerocho', age: 29 };
user.married = false;

const userObj = {
	user,
	married: false,
}

wm.set(user, {married: false}) // 객체를 수정하지 않으면서 추가 정보 저장 
user = null; // 부가 정보도 같이 가비지컬렉팅 됨
```

**널 병합 / 옵셔널 체이닝**

- ES2020에 추가된 ??(널 병합, nullish collecting)연산자와 ?.(옵셔널 체이닝, optional chaining) 연산자
- 널 병합 연산자는 주로 || 연산자 대용으로 사용
- falsy 값(0, ‘’, false, NaN, null, undefined) 중 undefined만 따로 구분

```jsx
const a = 0;
const b = a || 3; // || 연산자는 falsy 값이면 뒤로 넘어감
console.log(b); // 3

const c = 0;
const d = c ?? 3; // || 연산자는 null과 undefined일 때만 뒤로 넘어감
console.log(d); // 0

const e = null;
const f = e ?? 3;
console.log(f); // 3

const g = 0;
const h = g ?? 3;
console.log(h); // 3
```

|| 연산자가 있으며 뒤로 넘어간다고 생각

c = a || b →  a가 falsy 값이 아니라면 a값 나옴, a가 falsy 값이라면 b값이 나옴

|| 연산자는 null/undefined이랑 0을 구분을 안 해 문제가 생기는데

→ ??(nullish coalescing) 사용(0일때는 a를 반환하고 다른 falsy값일때만 뒤로 넘어감) 

옵셔널 체이닝 연산자는 null이나 undefined의 속성을 조회하는 경우 에러가 발생하는 것을 방지

```jsx
const a = {}
a.b; // a가 객체이므로 문제없음

const c = null;
try {
    c.d;
} catch(e){
    console.error(e); // TypeError: Cannot read properties of null (reading 'd') c가 null
}

// 예전에는 이를 해결하기 위해 아래와 같이 함
if (c) {
    c.d;
}

// 현재
console.log(c?.d);

try {
	c.f();
} catch (e) {
	console.error(e); // TypeError: Cannot read properties of null (reading 'f')
}
c?.f(); // 문제없음

try {
	c[0];
} catch (e) {
	console.error(e); // TypeError: Cannot read properties of null (reading '0')
}
c?.[0]; // 문제 없음
```

if 남발을 줄일 수 있음

**프런트엔드 자바스크립트**

서버로 요청을 보내는 코드

- 라이브러리 없이는 브라우저가 지원하는 XMLHttpRequest 객체 이용
- AJAX 요청 시 Axios 라이브러리를 사용하는 게 편함.
- HTML에 아래 스크립트를 추가하면 사용할 수 있음.

GET 요청 보내기

- axios.get 함수의 인수로 요청을 보낼 주소를 넣으면 됨
- 프로미스 기반 코드라 async/await 사용 가능

```jsx
    axios.get("https://www.zerocho.com/api/get")
        .then((result)=>{
            console.log(result);
            console.log(result.data);
        })
        
        .catch((error)=>{ // 비동기가 실패 할 경우 대
            console.error(error);
        })
        
	   (async () => {
        try{
            const result = await axios.get("https://www.zerocho.com/api/get");
            console.log(result);
            console.log(result.data);
        } catch (error){
            console.error(error);
        }
    })();
```

POST 요청을 하는 코드(데이터를 담아 서버로 보내는 경우)

- 전체적인 구조는 비슷하나 두 번째 인수로 데이터를 넣어 보냄

```jsx
(async () => {
    try {
        const result = await axios.post("https://www.zerocho.com/api/post/json", {
            name: 'zerocho',
            birth: 1954,
        });
        console.log(result);
        console.log(result.data);
    } catch(error){
        console.error(error);
    }
})();
```

FormData

- HTML form 태그에 담긴 데이터를 AJAX 요청으로 보내고 싶은 경우
    - FormData 객체 이용
- FormData 메서드
    - Append로 데이터를 하나씩 추가
    - Has로 데이터 존재 여부 확인
    - Get으로 데이터 조회
    - getAll로 데이터 모두 조회
    - delete로 데이터 삭제
    - set으로 데이터 수정

FormData POST 요청으로 보내기

- Axios의 data 자리에 formData를 넣어서 보내면 됨

```jsx
(async ()=>{
    try{
        const formData = new FormData();
        formData.append('name', 'image.jpg');
        formData.append('birdth', 1974);
        const result = await axios.post("https://www.zerocho.com/api/post/formData", formData);
        console.log(result);
        console.log(result.data);
    } catch (error) {
	    console.error(error);
	  }
})();
```

encodeURIComponent, decodeURIComponent(한글 처리기)

가끔 주소창에 한글을 입력하면 서버가 처리하지 못하는 경우 발생

- encodeURIComponent

```jsx
(async () => {
    try{
        const result = await axios.get(`https://www.zerocho.com/api/${encodeURIComponent('노드')}`);
        console.log(result);
        console.log(result.data); // {}
    } catch (error){
        console.error(error);
    }
})();
```

노드를 encodeURIComponent하면 %EB%85%B8%EB%93%9C 됨

- decodeURIComponent로 서버에서 한글 해석

```jsx
decodeURIComponent('%EB%85%B8%EB%93%9C'); // 노드
```

HTML 태그에 데이터를 저장하는 방법

- 서버의 데이터를 프런트엔드로 내려줄 때 사용
- 태그 속성으로 data-속성명
- 자바스크립트에서 태그.dataset.속성명으로 접근 가능
    - data-user-job → dataset.user.job
    - data-id → dataset.id
- 반대로 자바스크립트 dataset에 값을 넣으면 data-속성이 생김
    - dataset.monthSalary = 10000 → data-month-salary = “10000”
    
    ![Untitled](%E1%84%89%E1%85%A6%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB%201%20%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%83%E1%85%AE%E1%84%8B%E1%85%A5%E1%84%8B%E1%85%A3%20%E1%84%92%E1%85%A1%E1%86%AF%20%E1%84%8C%E1%85%A1%E1%84%87%E1%85%A1%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B8%E1%84%90%E1%85%B3%207b4f39b7bccd48b5b707ce46a558e20c/Untitled%201.png)