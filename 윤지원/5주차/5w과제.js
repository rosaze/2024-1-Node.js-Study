//폼 제출 커스텀 이벤트 설계하기

document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("myForm");

  form.addEventListener("submit", function (event) {
    const name = document.getElementById("name").value;
    // 커스텀 이벤트 생성하기
    const formSubmittedEvent = new CustomEvent("formSubmitted", {
      detail: {
        name: name,
        time: new Date(),
      },
    });

    //dispatchEvent
    form.dispatchEvent(formSubmittedEvent);
  });

  form.addEventListener("formSubmitted", function (event) {
    console.log("폼 제출 이벤트를 사용자가 발생시킴");
    console.log("event 데이터 (객체)", event.detail);
    alert(` 입력 이름: ${event.detail.name}`);
  });
});
