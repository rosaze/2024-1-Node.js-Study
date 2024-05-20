//커스텀 이벤트 만들어보기
// 버튼 요소 가져오기
const button = document.getElementById("myButton");

button.addEventListener("click", function () {
  // 사용자가 버튼을 클릭했을 때 메시지 출력
  alert("버튼을 클릭했습니다!");

  const customEvent = new Event("myCustomEvent");

  document.dispatchEvent(customEvent);
});

document.addEventListener("myCustomEvent", function (event) {
  // 커스텀 이벤트가 발생했을 때 메시지 출력
  console.log("사용자가 버튼을 클릭하여 커스텀 이벤트가 발생했습니다!");
});
