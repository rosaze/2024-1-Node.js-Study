## 2-1 호출 스택, 이벤트 루프
### 1. 호출 스택

![image](https://github.com/j1m1n-ha/2024-1-Node.js-Study/assets/163178666/0e55c113-8be3-47c5-94b1-54af21fef6f1)

**호출 스택(함수의 호출, 자료구조의 스택)**
- Anonymous은 가상의 전역 컨텍스트(항상 있다고 생각하는게 좋음 파일 실행하는 순간 제일 아래 깔림)
- 함수 호출 순서대로 쌓이고, 역순으로 실행됨
- 함수 실행이 완료되면 스택에서 빠짐
- LIFO 구조라서 스택이라고 불림

### 2. 이벤트 루프
- **이벤트 루프**: 이벤트 발생(setTimeout 등) 시 호출할 콜백 함수들(위의 예제에서는 run)을 관리하고, 호출할 순서를 결정하는 역할
- **태스크 큐**: 이벤트 발생 후 호출되어야 할 콜백 함수들이 순서대로 기다리는 공간
- **백그라운드**: 타이머나 I/O 작업 콜백, 이벤트 리스너들이 대기하는 공간. 여러 작업이 동시에 실행될 수 있음

호출 스택, 백그라운드, 태스크 큐 분석만 하면 다 파악 가능함.
promise.then/catch process.nextTick 태그크큐에서 타이머 새치기함.

## 2-2 ES2015+
### 1. const, let
**E2015 이전에는 var로 변수 선언했었음**
var: 블록 스코프 무시함(다른 언어와는 달리 if나 for, while은 영향을 미치지 못함!
), 함수 스코프는 못빠져나감.
const: 프로그래밍할수록 더 많이 사용함, 상수에 할당한 값은 다른 값으로 변경 불가 값 바꿀 일 생기면 const를 let으로 바꾸는 편
### 2. 템플릿 문자열
띄어쓰기 

### 3. 객체 리터럴
- 동적 속성은 객체 안에 넣을 수 있게됨 
- sayJS 부분 function 뺄 수 있게 간결해짐
- sayNode: sayNode 이렇게 같으면 뒷부분 생략해도됨
- es+6 객체 안에 선언해줄 수 있게 바뀜
### 4. 화살표 함수
- add2: add1을 화살표 함수로 나타낼 수 있음
- add3: 함수의 본문이 return만 있는 경우 return 생략
- add4: return이 생략된 함수의 본문을 소괄호로 감싸줄 수 있음
- not1과 not2도 같은 기능을 함(매개변수 하나일 때 괄호 생략)

객체 return 하는 경우 소괄호가 필수이다.
화살표 함수는 부모의 this를 받음. 자신만의 this를 가지지 않음.
= 화살표 함수가 기존 function() {}을 대체하는 건 아님(this가 달라짐)
- logFriends 메서드의 this 값에 주목
- forEach의 function의 this와 logFriends의 this는 다름
- that이라는 중간 변수를 이용해서 logFriends의 this를 전달

> this를 쓸 거면 function을 쓰고, this를 안쓸 거면 다 화살표 함수로 쓸 것을 추천
>> this를 안쓰는 게 가능하면 제일 좋긴함.

### 5. 구조분해 할당
자바스크립트에 속성이름을 변수로 만드는 상황이 많이 나옴.
구조 분해 문법
배열은 자리가 같아야 하고 객체는 key가 일치해야함. 
![](https://velog.velcdn.com/images/tracygkwlals/post/597c396f-68ac-4a34-8c68-90b91a8908b8/image.png)
> this가 있는 경우 구조 분해 할당 안하는게 좋음.

### 6. 클래스
클래스는 프로토타입, 프로토타입 문법을 깔끔하게 만든 것이 클래스
생성자 함수는 대문자함수로 선언
- Class 내부에 관련된 코드들이 묶임
- Super로 부모 Class 호출
- Static 키워드로 클래스 메서드 생성

### 7. 프로미스
![](https://velog.velcdn.com/images/tracygkwlals/post/4457809e-59d8-4bca-9704-83cd4e77e77d/image.png)

**프로미스**: 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
- Resolve(성공리턴값) -> then으로 연결
- Reject(실패리턴값) -> catch로 연결
- Finally 부분은 무조건 실행됨

- Then을 붙이면 결과를 반환함
- 실행이 완료되지 않았으면 완료된 후에 Then 내부 함수가 실행됨
> 노드 생태계가 콜백에서 프로미스로 전환되고 있어 꼭 익혀둘 것!

Promise.all(배열): 여러 개의 프로미스를 동시에 실행
- 하나라도 실패하면 catch로 감
- allSettled로 실패한 것만 추려낼 수 있음

### 8. async/await
- await이 then 역할을 한다고 보면됨
- then 결과값들을 앞에서 받음
- 순서가 오른쪽에서 왼쪽
- await 쓸 때 함수에 async가 붙어야함.
- async 결국 promise를 간단하게 만든 것.
- resolve만 있고 reject를 처리할 수 없어서 try catch 필요함.

**for await (변수 of 프로미스배열)** 
- resolve된 프로미스가 변수에 담겨 나옴
- await을 사용하기 때문에 async 함수 안에서 해야함

### 9. Map/Set
**Map**: 객체와 유사한 자료구조
Map은 객체와 유사한 자료구조
![](https://velog.velcdn.com/images/tracygkwlals/post/47f57e5d-a108-4d86-b37e-e5472b1625f6/image.png)
**Set**은 배열과 유사한 자료구조
기존 배열의 중복을 제거할 때도 사용
![](https://velog.velcdn.com/images/tracygkwlals/post/faaa680d-2c00-403f-a529-7afd32c84fcf/image.png)
![](https://velog.velcdn.com/images/tracygkwlals/post/3dce74b6-1928-4185-bf1d-d92b00901549/image.png)

### 10. 널 병합, 옵셔널 체이닝
**??**(널 병합, nullish coalescing) 연산자
**||** 대용으로 사용되며, falsy 값 중 null과 undefined만 따로 구분함
![](https://velog.velcdn.com/images/tracygkwlals/post/a5c26da0-b085-4ecd-bd26-14130e14657e/image.png)

?.(옵셔널 체이닝, optional chaining) 연산자
Null이나 undefined의 속성을 조회하는 경우 에러가 발생하는 것을 막음
![](https://velog.velcdn.com/images/tracygkwlals/post/eb11f27e-a06b-4f24-b5ab-35e6ff586013/image.png)
![](https://velog.velcdn.com/images/tracygkwlals/post/98080dd4-5b03-4958-8fd5-2221b33f2cfe/image.png)

## 2-3 프런트엔드 자바스크립트
### 1. AJAX
POST 요청을 하는 코드(데이터를 담아 서버로 보내는 경우)
전체적인 구조는 비슷하나 두 번째 인수로 데이터를 넣어 보냄

### 2. FormData
HTML form 태그에 담긴 데이터를 AJAX 요청으로 보내고 싶은 경우
FormData 객체 이용
<FormData 메서드>
- Append로 데이터를 하나씩 추가
- Has로 데이터 존재 여부 확인
- Get으로 데이터 조회
- getAll로 데이터 모두 조회
- delete로 데이터 삭제
- set으로 데이터 수정

![](https://velog.velcdn.com/images/tracygkwlals/post/d7ed46bf-0dd7-4520-85b8-269a16b662bf/image.png)
![](https://velog.velcdn.com/images/tracygkwlals/post/9846fc3c-20ab-4426-9a67-68896c3661f2/image.png)

FormData POST 요청으로 보내기
Axios의 data 자리에 formData를 넣어서 보내면 됨
![](https://velog.velcdn.com/images/tracygkwlals/post/4830df6a-d95a-4fcc-b3a9-572556da23f9/image.png)

### 3. encodeURIComponent, decodeURIComponent
- 가끔 주소창에 한글 입력하면 서버가 처리하지 못하는 경우 발생
encodeURIComponent로 한글 감싸줘서 처리
- 노드를 encodeURIComponent하면 %EB%85%B8%EB%93%9C가 됨
decodeURIComponent로 서버에서 한글 해석

### 4. data attribute와 dataset
- HTML 태그에 데이터를 저장하는 방법
 	- 서버의 데이터를 프런트엔드로 내려줄 때 사용
 	- 태그 속성으로 data-속성명
- 자바스크립트에서 태그.dataset.속성명으로 접근 가능
	- data-user-job -> dataset.userJob
	- data-id -> dataset.id
- 반대로 자바스크립트 dataset에 값을 넣으면 data-속성이 생김
	- dataset.monthSalary = 10000 -> data-month-salary=“10000”









