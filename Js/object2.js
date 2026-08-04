// 자바스크립트 내장 객체

// 1. 날짜/시간
const now = new Date();
console.log(now);
console.log("연도", now.getFullYear());
// 월은 0부터 시작
console.log("월", now.getMonth() + 1);
console.log("일", now.getDate());
console.log("시", now.getHours());
console.log("분", now.getMinutes());
console.log("초", now.getSeconds());
console.log("날짜타입 => 문자열", now.toLocaleString());

// 2. 문자열
const msg = "hello javascript";
// const msg = new String("hello javascript");
console.log("특정 위치 문자 반환", msg.charAt(4));
console.log("문자 찾기", msg.match("ja"));
console.log("문자 찾기", msg.search("ja"));
console.log("문자 찾기", msg.indexOf("ja"));
console.log("특정 문자 변경", msg.replace("hello", "hi"));
console.log("특정 위치 문자 추출", msg.substring(6, 10));
console.log("대문자 변경", msg.toUpperCase());
console.log("소문자 변경", msg.toLowerCase());

// 3. 수학
console.log(Math.PI);
console.log(Math.floor(3.141592));
console.log(Math.ceil(3.141592));
console.log(Math.abs(-3.141592));
console.log(Math.max(5, 7, 2, 8, 6, 13));
console.log(Math.min(5, 7, 2, 8, 6, 13));
// 0 ~ 1 사이 임의의 수
console.log(Math.random());
console.log(Math.floor(Math.random() * 11));

// 두개의 주사위를 던져서 나오는 눈의 합이 5일때 실행을 멈추기

// let count = 0;
// let c = 0;
// do {
//   const a = Math.floor(Math.random() * 6) + 1;
//   const b = Math.floor(Math.random() * 6) + 1;
//   c = a + b;
//   count++;
//   console.log(a, b, count);
// } while (c !== 5);

// 로또 번호 6개를 추출한 후 배열에 담은 후 출력
// push() => 단 동일한 숫자가 있는지 확인하고 담기

let lotto = [];

while (lotto.length < 6) {
  const a = Math.floor(Math.random() * 45) + 1;
  if (lotto.indexOf(a) === -1) {
    lotto.push(a);
  }
}
console.log(lotto);
