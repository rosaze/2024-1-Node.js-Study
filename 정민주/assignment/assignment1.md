### 1. 널 병합 연산자와 옵셔널 체이닝 연산자의 차이점은?

널 병합 연산자는 주로 || 연산자 대용으로 사용된다.

|| 연산자는 "뒤로 넘어간다"의 개념이다.
c = a || b일때
a가 falsy 값이 아니라면 그냥 a값 그대로 나오고
a가 falsy 값이라면 b값이 나온다.

근데 문제가 뭐냐면, 
0도 나름의 값이니까 a가 0일때는 그냥 a 나오게 하고 싶은데
(null이랑 undefined는 여전히 b 나오게 하고)

근데 || 연산자는 null/undefined이랑 0을 구분안하니까 문제가 생긴다.

이럴때 nullish coalescing(??)을 쓴다.

---

반면에 optional chaining (?.)연산자는 언제 쓰이나면
null이나 undefined 속성을 조회하는 경우 에러가 발생하는 것을 막을 때 사용한다.      
-> null이 될지 아닐지 긴가민가할때 사용하자!

### 2. 널 병합 연산자와 옵셔널 체이닝 연산자의 사용 사례는?
어떤 객체의 속성을 정의하는데,     
만약에 그 속성이 존재하지 않다면 (null하다면) 바로 초기화 해줄 수 있는 코드를 짤 수 있다.  
"The null coalescing operator replaces null pointers with a default value."   
```js
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);
// Expected output: 50

a.speed ??= 25;
console.log(a.speed);
// Expected output: 25
```

optional chaning 연산자는     
반복적인 null check을 줄임으로서 더 깔끔하고 가독성 높은 코드를 만든다고 한다.      
null check을 여러번 해야하는 코드에서 유용하게 쓰이는 모양이다.

### 3. 옵셔널 체이닝 연산자 사용 예시 코드 짜기
```js
const a1 = 1;
const b1 = 10;
console.log(a1||b1); //1
console.log(a1??b1); //1

const a2 = 0;
const b2 = 10;
console.log(a2||b2); //10
console.log(a2??b2); //0

const a3 = null;
const b3 = 10;
console.log(a3||b3); //10
console.log(a3??b3); //10
```

### 4. 널 병합 연산자 사용 예시 코드 짜기
```js
const a = {}
console.log(a.b);

const c = null;
try {
    console.log(c.d);
} catch(e){
    console.error(e); //TypeError: Cannot read properties of null
}

//예전에는 그래서 c가 null이 아님을 보장받기 위해서 
if (c) {
    console.log(c.d);
}
//이런 형식으로 썼다

//근데 optional chaining을 쓰면
console.log(c?.d); //그냥 undefined나옴
```