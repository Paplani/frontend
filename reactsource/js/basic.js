// 변수 선언
const users = [
  { id: 1, name: "철수", age: 20 },
  { id: 2, name: "영희", age: 17 },
  { id: 3, name: "민수", age: 25 },
];

let numbers = [1, 2, 3];

// 배열요소 접근
users.forEach((item) => {
  console.log(item.name);
});

// filter()
// users 에서 id가 3번이 아닌 user만 추출해서 새로운 배열 생성

console.log(users.filter((user) => user.id !== 3));

// map() : 각 요소에 특정 연산을 하거나, 그냥 하나씩 가지고 나옴
const result = numbers.map((num) => num * 2);
console.log(result); // [2,4,6]

// 자바스크립트 객체 {key:value, }
const obj1 = { name: "철수" };
// obj1, obj2는 같은 객체를 가르킨다
const obj2 = obj1;

obj1.name = "영희";
console.log(`obj1 ${obj1.name}, obj2 ${obj2.name}`);

const user = {
  name: "철수",
  age: 20,
};

// user 복사  (age만 21로 변경) => 무조건 ...  스프렉드 연산자로 복사해야함!
const newUser = {
  ...user,
  age: 21,
};

user.name = "영희";
console.log(newUser);

// numbers 를 복사
// const newArr = numbers;   // 같은 배열 = 얕은 복사

const newArr = [...numbers];
numbers[1] = 5;
console.log(numbers); // 변경한 numbers 만 변경되고 복사한 newArr은 그대로임
console.log(newArr);

// 구조 분해 할당
// user.name, user.age
const { name, age } = user;
console.log(`${name} : ${age}`);

// ...num2를 하면 나머지 숫자들이 전부 num2로 선언됨
const [num1, ...num2] = numbers;
console.log(`${num1} , ${num2}`);

// 삼항연산자 : 조건 ? 참일때 : 거짓일때
// age가 20이상이면 성인 / 미성년자
const result2 = age >= 20 ? "성인" : "미성년자";
console.log(result2);

// &&

// 콜백함수
// fetch()
