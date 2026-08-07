// fetch() : 서버와 네트워크 요청을 보낼때 사용하는 함수
//           기본값은 GET

// setTimeout(() => {}, 3000);    => 비동기식!

// 비동기식으로 서버에서 데이터 가져오기
// 1. fetch()
// 2. axios() : 설치 필요

//   .catch("오류 발생 처리 구문 작성")
//   .finally("무조건 실행")

// 비동기식 : 오래 걸리는 작업은 맡겨두고 다음 코드를 먼저 실행함. 결과가 준비되면 나중에 처리
//  = 콜백함수
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

// async/await 비동기식이긴하지만 동기식처럼 읽기 쉽게 작성하는 문법이다.
async function load() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/10");
  const data = await response.json();
  console.log(data);
}
load();

const load2 = async (params) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
};

load2();
