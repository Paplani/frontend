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

// async function name(params) {

// }

// async (params) => {

// }
