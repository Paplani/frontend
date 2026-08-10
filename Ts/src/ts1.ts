export {};

// 타입지정
// string, number, boolean, array, null, undefined

const car: string = "BMW";
let car2: string = "BMW";

// 선언된 타입과 다른 타입 대입시 오류
// car2 = 3;

let age: number = 23;
let isAudult: boolean = false;
let n: null = null;
let u: undefined = undefined;

let fruits: string[] = ["사과", "바나나", "딸기"];
// fruits.push(95);
let scores1: number[] = [95, 67, 33];
let mixed: (string | number)[] = ["사과", "딸기", 100, 43];

// 타입 추론
let fruits2 = ["사과", "바나나", "딸기"];

const vegetables: ReadonlyArray<string> = ["carrot", "broccoli", "spinach"];
const vegetables2: readonly string[] = ["carrot", "broccoli", "spinach"];
// vegetables.push("potato");   readonly라 푸쉬안됨

let scores2: readonly number[] = [95, 67, 33];

// ...
const newArray = [...scores2, 85];
console.log(newArray);

// 타입스크립트에서 추가된 데이터 타입!
// 튜플 : 배열인데 요소의 개수와 각 위치의 타입을 미리 정해놓은 배열
const person: [string, number] = ["Alice", 25];
console.log(person[0].toLowerCase());

person[0] = "Tiger";
person[1] = 26;
console.log(person);

function getUserInfo(): [string, number, boolean] {
  return ["Bob", 30, true];
}
// console.log(getUserInfo());
const [username, age1, isUserAudlt] = getUserInfo();

// 추론을 이용한 튜플 선언
// 상수처럼
const person2 = ["Alice", 25] as const;
// person[0] = "three";   불가능함. 변경 불가능

// 배열 선언
const array1: number[] = [];
// 튜플선언
const tuple1: [number, string] = [25, ""];

// any : js와 같은 개념 (거의 자주 사용하지 않음)
// any : 타입검사를 하지 않음
let num;
num = 95;
num = "Nine";

let randomValue: any = 10;
randomValue = "hello";
console.log(randomValue.length); //any는 자유롭게 활용가능함
randomValue = true;

// unknown : 무슨 타입인지 모르니까 매서드를 사용불가능한 상태임
// 확인후 사용
let unknownValue: unknown = 10;
unknownValue = "Hello";
console.log(unknownValue);

// let strLength:number = unknownValue.length;      이거 안됨. unknownValue는 unknown임
if (typeof unknownValue === "string") {
  let strLength: number = unknownValue.length;
  console.log(strLength);
}

// void : 반환값이 없는 함수
function message(msg: string): void {
  // return msg;
  console.log(msg);
}

const print1 = (): void => {
  console.log(print1);
};

// printLength()
// 파라메터로 text => string or null
function printLength(text: string | null): void {
  if (text === null) {
    console.log("No text");
    return;
  }
  console.log(`${text.length}`);
}

const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num): void => {
  console.log(num);
});

// never : 에러를 반환하거나 절대 종료되지 않는 함수의 타입으로 사용
// never : 절대로 발생할 수 없는 값의 타입
// x 파라메터 : string, number, boolean
function handleValue(x: string | number | boolean | object): void {
  if (typeof x === "string") {
  } else if (typeof x === "number") {
  } else if (typeof x === "boolean") {
  } else if (typeof x === "object") {
  } else {
    const unreachable: never = x;
    throw new Error("Unhandled type : " + unreachable);
  }
}
handleValue("Hello");
handleValue(42);
handleValue(true);
handleValue({ name: "John" });

// 열거형 : 관련있는 상수들을 하나의 이름으로 묶어놓은 타입
enum Color {
  Red = 1,
  Green,
  Blue,
}

console.log("enum");
console.log(Color.Green); // 1 나옴.     앞에서부터 0,1,2...     이것처럼 red = 1을 주면 순서대로 1,2,3...
let favoriteColor: Color = Color.Green;

// type : 원하는 타입을 하나 만든 후 이름을 붙일 때 사용!!!

// 주소 변수 선언 : 문자, 숫자 허용
// let userAddr:string|number    이것도 가능하지만 아래것도 가능
type Addr = string | number;
let userAddr: Addr;

//  | 은 union 연산자
type status = "idle" | "loading" | "success" | "error";
let currentStatus: status;
currentStatus = "loading";

type Point = {
  x: number;
  y: number;
};

let point: Point = { x: 10, y: 20 };

type PointTuple = [number, number];
const tuple2: PointTuple = [10, 20];

type Name = {
  firstName: string;
  lastName: string;
};

// Employee => firstName, lastName, employeeId

// & : 이미 선언된 타입 사용할때 사용됨
type Employee = Name & {
  employeeId: number;
};

let Employee: Employee = {
  firstName: "John",
  lastName: "Doe",
  employeeId: 1234,
};

// type 선언시 모든 키(어떤 key가 들어올지 모르는 객체)에 대한 value가 string일때
// index signature라는 개념
type Member = {
  [key: string]: string;
};

let menber: Member = {
  id: "user01",
  name: "alice",
};

let menber2: Member = {
  id: "user01",
  name: "alice",
  addr: "seoul",
};

// 선언된 타입에서 특정 키만 제거하고 사용하고 싶을때
type Menu = {
  name: string;
  category: string;
  price: string;
};

// BestMenu => name, category 만 필요
// 여러개 고를때 | 사용 : Omit<Menu, "price"|"name">
type BestMenu = Omit<Menu, "price">;
let menu: Menu = {
  name: "피자",
  category: "",
  price: "35000",
};
let best: BestMenu = {
  name: "피자",
  category: "",
};

// 선언된 타입에서 특정 키만 가져오기 : Pick
type MenuOnlyCategory = Pick<Menu, "category">;

// interface : 객체 타입 지정 시 주로 사용
// let user1 = {name:"Alice", age:25}
let user1: object;
user1 = { name: "Alice", age: 25 };
console.log(user1);
// console.log(user1.name) : user1.name 이 안됨

// interface를 사용하면 User라는 객체에 name이 string이고 age가 number라고 명시해줌!
interface User {
  name: string;
  age: number;
}
let user: User = { name: "David", age: 30 };
console.log(user.name);
// interface로 객체를 선언하면 기존에 해온 것처럼 user.name이 가능해짐

// gender => 선택적인 속성
// ? : 선택자 속성. 들어올수도 있고 아닐수도 있음!!!
interface User2 {
  name: string;
  age: number;
  gender?: string;
}
let user2: User2 = { name: "David", age: 30 };
let user3: User2 = { name: "David", age: 30, gender: "Male" };
user3.name = "Teddy";

interface Car {
  readonly model: string;
  year: number;
}
let car1: Car = { model: "Toyota", year: 2026 };
// car1.model = "현대";   불가능함

interface Menber2 {
  [key: string]: string;
}

interface Student {
  name: string;
  id: number;
  [key: number]: string;
}
let student: Student = {
  name: "John",
  id: 12345,
  1: "A",
  2: "B",
  3: "C",
};

// type + interface
type Score = "A+" | "A" | "B" | "C" | "D" | "E" | "F";
interface Student2 {
  name: string;
  id: number;
  [key: number]: Score;
}

// 함수 타입 정의
type Func1 = {
  (a: number, b: number): number;
};

interface Add {
  (a: number, b: number): number;
}

const add: Add = function (a, b) {
  return a + b;
};
console.log(add(5, 7));

// 인라인 지정
function sub(a: number, b: number): number {
  return a - b;
}

// interface 확장. (type & )와 같은 개념임
interface Car2 {
  color: string;
  wheels: number;
  start(): void;
}

// Car2 속성 그대로 구현
// class 일때는 implements로 가져옴
class Truck implements Car2 {
  color: string;
  wheels: number;
  constructor(color: string, wheels: number) {
    this.color = color;
    this.wheels = wheels;
  }
  start(): void {
    console.log("Truck started");
  }
  // 본인만의 메서드 추가 가능
  drive(): void {
    console.log("Truck is driving");
  }
}

const myTruck = new Truck("red", 6);
myTruck.start();

interface Person {
  name: string;
  age: number;
}

// interface때는 extends로 가져옴
interface Employee2 extends Person {
  employeeId: number;
  department: string;
}

let employee2: Employee2 = {
  name: "",
  age: 30,
  employeeId: 1001,
  department: "HR",
};

// type으로 지정된 것도 extends 가능하다
interface BestMenu2 extends Menu {
  rank: number;
}

const best2: BestMenu2 = {
  name: "americano",
  category: "coffee",
  price: "4500",
  rank: 3,
};

interface Menu2 {
  name: string;
  category: string;
  price: string;
}

// type에서 interface 사용
type BestMenu3 = Menu2 & { rank: number };

// as 타입 : type assertion
let someValue: unknown = "This is a string";
let someValueLength = (someValue as string).length;
