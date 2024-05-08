1. 널 병합 연산자와 옵셔널 체이닝 연산자의 차이점은?

널 병합 연산자는 falsy 값(0, '', false, NaN, null, undefined) 중 null과 undefined만 따로 구분합니다. 옵셔널 체이닝 연산자는 null이나 undefined의 속성을 조회하는 경우 에러가 발생하는 것을 막습니다.

2. 널 병합 연산자와 옵셔널 체이닝 연산자의 사용 사례는?

널 병합 연산자는 주로 || 연산자 대용으로 사용되고 일반적인 속성뿐만 아니라 함수 호출이나 배열 요소 접근에 대해서도 에러가 발생하는 것을 방지합니다. 옵셔널 체이닝 연산자는 자바스크립트 프로그래밍을 할 때 발생하는 TypeError: Cannot read properties of undefined 또는 null 에러의 발생 빈도를 낮추는 데에 사용됩니다.

3. 옵셔널 체이닝 연산자 사용 예시 코드 짜기

``` node.js
//옵셔널 체이닝 연산자
const a = {}
a.b; // a가 객체이므로 문제없음

const c = null;
try {
  c.d;
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'd')
}
c?.d; 
```
4. 널 병합 연산자 사용 예시 코드 짜기
```node.js
//널 병합 연산자
const c = 0;
const d = c ?? 3; // ?? 연산자는 null과 undefined일 때만 뒤로 넘어감
console.log(d); // 0;
```
