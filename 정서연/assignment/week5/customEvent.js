const EventEmitter = require("events");

// 새로운 이벤트 클래스
class DataEmitter extends EventEmitter {}

// 새로운 이벤트 객체
const dataEmitter = new DataEmitter();

// 사용자 정보
const user = {
  id: 1,
  username: "seoyeon",
  email: "seoyeon@google.com",
};

// userData(커스텀 이벤트)정의 -> 사용자 정보 출력
dataEmitter.on("userData", (userData) => {
  console.log("Received user data:");
  console.log(userData);
});

// 이벤트를 발생, 사용자 정보 전달
dataEmitter.emit("userData", user);
