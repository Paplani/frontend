// 자료형
// number : 정수, 실수
// boolean : true, false
// string : 문자
// undefined, null
// 숫자, 문자, 불리언

let a, b, c, d, e, f;

console.log(typeof a); // undefined (변수 선언 후 값을 할당하지 않은 경우)

a = 2;
b = "안녕하세요";
c = 3.14;
d = new Date();
e = { name: "hong", age: 20 };
f = null; // 값이 없다고 고의적으로 선언
e = 1 > 2; // true, false

console.log("a 타입?", typeof a);
console.log("b 타입?", typeof b);
console.log("c 타입?", typeof c);
console.log("d 타입?", typeof d);
console.log("e 타입?", typeof e);
console.log("f 타입?", typeof f); // object
console.log("e 타입?", typeof e); // boolean

// 연산자
// 산술 (+ - * / %)
// 비교 (==, ===, !=, !==, >, >=, <, <=)
// ==, != (값만 비교)
// ===, !== (비교할때 타입과 값을 같이 비교)
// 단항 (++, --)
// a = a + 1 => a   ++
// 복합대입 (+=, -=, *=, /= ...)
// &&(== and) ||(== or)
// 삼항연산자 : 조건 ? 참일때 : 거짓일때

let z = 14;
let result = (z > 10 && z <= 20) || z % 3 === 0;
console.log(result);

let bool1 = true;
result = bool1 ? "참" : "거짓";
console.log(result);

console.log(z % 2 === 0 ? "짝수" : "홀수");
