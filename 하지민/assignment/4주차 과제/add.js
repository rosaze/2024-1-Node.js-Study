function add(a, b) {
  return a + b;
}

module.exports = add;

// commonjs: 자바스크립트의 공식 스펙=브라우저만 지원, 이를 서버사이드 및 데스크탑 어플리케이션에서 지원하기 위해 만든 그룹
// 다른 모듈을 사용할 때는 require를, 모듈을 해당 스코프 밖으로 보낼 때에는 module.exports를 사용하는 방식으로
