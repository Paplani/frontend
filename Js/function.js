// 함수
function add(a, b) {
  return a + b;
}
let result = add(5, 3);
console.log(result);
// NAN : Not a Number
console.log(add());
console.log(add(3));

// 익명함수
const myFunc = function (a, b) {
  return a + b;
};
console.log(myFunc(3, 4));

// name() 내부용
const myFunc2 = function name(a, b) {
  return a + b;
};
// console.log(name(3, 4)); // ReferenceError: name is not defined
console.log(myFunc2(3, 4));

// 함수안에 함수가 들어갈 수 있음
function a() {
  function b() {
    console.log("b");
  }
  if (ture) {
    function c() {}
  }
  b();
  c();
}

// --------------------------------
// 호이스팅 (hoisting) : 끌어올려서 실행
// functino 함수 가능함
// 익명함수는 불가능함
// -----------------------------

console.log(multiply(4, 6));
function multiply(x, y) {
  return x * y;
}

// console.log(myFunc3(7, 3)); //ReferenceError: Cannot access 'myFunc3' before initialization
const myFunc3 = function (x, y) {
  return x - y;
};

// 매개변수 초기화
function test(a, b = 52, c = 13, d) {
  d = d | 65;
  console.log(`a = ${a}, b = ${b}, c = ${c}, d = ${d}`);
}
test(12, 31);

// ----------------------------------------
// 화살표 함수
// ----------------------------------------

const myFunc4 = (a, b) => {
  return a + b;
};
console.log(myFunc4(3, 4));

// 화살표 함수 안에 실행할 구문이 한줄이라면 {} 생략가능
// return 생략 가능
const myFunc5 = (a, b) => a + b;

console.log(myFunc5(3, 4));

// 배열
const array1 = [];
array1.forEach(() => {});
array1.forEach(function () {});

const array2 = [15, 6, 9, 13, 22, 27];
// array2 에서 20보다 큰 요소 찾기
// find는 가장 먼저 걸리는 요소 단 한개만 찾아줌
// 여러개 찾고 싶으면 filter!
console.log(array2.find((item) => item > 20));
console.log(array2.findIndex((item) => item > 20));

// map, filter
const result2 = array2.map((x) => x * 2);
console.log(result2);

const result3 = array2.filter((item) => item > 20);
console.log(result3);

// async function name(params) {

// }

// async (params) => {

// }

// ---------------------
// 내장함수
// ---------------------
console.log(encodeURI("http://localhost:8080/basic/info.html?name=홍길동"));
// http://localhost:8080/basic/info.html?name=%ED%99%8D%EA%B8%B8%EB%8F%99

console.log(encodeURIComponent("http://localhost:8080/basic/info.html?name=홍길동"));
// http%3A%2F%2Flocalhost%3A8080%2Fbasic%2Finfo.html%3Fname%3D%ED%99%8D%EA%B8%B8%EB%8F%99

console.log(decodeURI("http://localhost:8080/basic/info.html?name=%ED%99%8D%EA%B8%B8%EB%8F%99"));
console.log(
  decodeURIComponent("http%3A%2F%2Flocalhost%3A8080%2Fbasic%2Finfo.html%3Fname%3D%ED%99%8D%EA%B8%B8%EB%8F%99"),
);

// parseInt() / parseFloat()  / number()
console.log(parseInt("123"));
console.log(parseInt("123px"));
console.log(parseFloat("3.14"));
console.log(parseFloat("3.14abc"));

console.log(Number("123"));
console.log(Number("123.12"));
console.log(Number(true));
console.log(Number(false));
console.log(Number("123ab"));

// isNaN()
console.log(isNaN("123"));
console.log(isNaN("abc"));

// setTimeout()
const timer = setTimeout(() => console.log("3초후"), 3000);
console.log("마무리");
clearTimeout(timer);

// setInterval(() => {}, interval);

let count = 0;
const id = setInterval(() => {
  console.log(++count);

  if (count === 5) {
    clearInterval(id);
  }
}, 1000);
