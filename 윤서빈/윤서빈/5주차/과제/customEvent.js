const EventEmitter = require("events");

// 이벤트 생성
const myEvent = new EventEmitter();

// 'new_message' 이벤트에 대한 리스너 등록
myEvent.on("new_message", (data) => {
  console.log(`새로운 메시지 도착: ${data}`);

  if (data.includes("urgent")) {
    console.log("긴급 메시지입니다!");
  }
});

// 'new_message' 이벤트 발생
myEvent.emit("new_message", "안녕하세요!");
myEvent.emit("new_message", "긴급한 연락이 있습니다!");
