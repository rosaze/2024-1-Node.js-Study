async function getUser() {
  try {
    const res = await axios.get("/users");
    const users = res.data;
    const list = document.getElementById("list");
    list.innerHTML = "";
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      const dday = users[key].dday;
      let message = `자료구조 시험까지 ${dday}일 남았습니다! 어서 공부하세용!`;
      if (dday < 10) {
        message += " 이제 정말 공부해야..";
      }
      span.textContent = message;
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        const date = prompt("바꿀 날짜를 입력하세요 (YYYY-MM-DD)");
        if (!date) {
          return alert("날짜를 반드시 입력하셔야 합니다");
        }
        try {
          await axios.put("/user/" + key, { date });
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser;

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const date = e.target.date.value;
  if (!date) {
    return alert("날짜를 입력하세요");
  }
  try {
    await axios.post("/user", { date });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.date.value = "";
});
