export {};

// | : 유니온
// 리터럴
const userName1 = "Bob";
let userName2 = "Tom";
// userName2 = 3;          이거 안됨

let userName3: string | number = "Tom";
userName3 = 3;

type Job = "developer" | "designer" | "manager";
interface Person {
  name: string;
  job: Job;
}

const person1: Person = {
  name: "Alice",
  job: "manager",
};

interface HighSchoolStudent {
  name: string;
  grade: 1 | 2 | 3;
}

const student1: HighSchoolStudent = {
  name: "James",
  grade: 1,
};

interface Car {
  type: "Car";
  color: "string";
  start(): void;
}

interface Mobile {
  type: "mobile";
  color: "string";
  call(): void;
}

const getGift = (gift: Car | Mobile) => {
  console.log(gift.color);
  if (gift.type === "Car") {
    gift.start();
  } else {
    gift.call();
  }
};

interface Developer {
  name: string;
  skills: string[];
}

interface Manager {
  name: string;
  age: number;
  manage(): void;
}

type DevManager = Developer & Manager;
// interface Devmanager extends Developer, Manager{}

const person2: DevManager = {
  name: "Luke",
  age: 30,
  skills: ["computer", "Database"],
  manage() {
    console.log("Todo");
  },
};

// 제네릭 : T
const getSize = (arr: number[] | string[]): number => {
  return arr.length;
};

const arr1 = [1, 2, 3, 4, 5];
console.log(getSize(arr1));

const arr2 = ["a", "b", "c"];
console.log(getSize(arr2));

// boolean[], Date[]...
const getGenericSize = <T>(arr: T[]): number => {
  return arr.length;
};

function getGenericSize2<T>(arr: T[]) {
  return arr.length;
}
console.log(getGenericSize2(arr1));
console.log(getGenericSize2(arr2));

const arr3 = [true, false, true];
console.log(getGenericSize2(arr3));

// 제네릭 매개변수는 여러 개 선언이 가능하다!
interface Mobile2<T, U> {
  name: T;
  price: number;
  option: U;
}

const myPhone: Mobile2<string, { color: string; coupon: boolean }> = {
  name: "galaxy",
  price: 100000,
  option: { color: "black", coupon: true },
};

interface Mobile3<T> {
  name: string;
  price: number;
  option: T;
}

const myTablet: Mobile3<string[]> = {
  name: "Ipad",
  price: 100000,
  option: ["pen", "cover"],
};

// 함수
// 2개의 숫자를 받아서 더한 결과를 출력하는 함수
// function add1(num1: number, num2: number) {
//   return num1 + num2;
// }
const add1 = (num1: number, num2: number): number => {
  return num1 + num2;
};

// isAdult 함수 작성 age 값을 받아서 19보다 큰지 true, false 반환하는 함수
function isAdult(age: number): boolean {
  if (age > 19) {
    return true;
  } else {
    return false;
  }
}

const hello = (name?: string): void => {
  console.log(`Hello, ${name || "Guest"}`);
};
hello();

const hello2 = (name: string = "Guest"): void => {
  console.log(`Hello, ${name}`);
};
hello2();
hello2("Sam");

// ... : 함수에 들어오는 여러개의 인자를 모두 nums라는 배열로 모아주는것
const sum = (...nums: number[]): number => {
  return nums.length;
};
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4, 5, 6, 7));

// 유틸리티
// Pick<>, Omit<>
// keyof : 객체 타입에서 key 의 이름들을 타입으로 가져옴
interface User {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F";
}

type UserKey = keyof User;
const uk: UserKey = "id";

// Partial<T> : T의 모든 속성을 선택적으로 만들기

type PartialUser = Partial<User>;
const pUser1: PartialUser = {};
const pUser2: PartialUser = { id: 1 };
const pUser3: PartialUser = { id: 1, name: "James" };

// Required<T> : T의 모든 속성을 필수로 만들기
type RequiredUser = Required<PartialUser>;
const rUser1: PartialUser = { id: 3, name: "Yuna", age: 20, gender: "F" };

// Readonly<T> : T의 모든 속성을 읽기 전용으로 만들기
type ReadUser = Readonly<User>;
const reUser: ReadUser = { id: 3, name: "Yuna", age: 20, gender: "F" };
// reUser.name = "";   readonly라 수정 불가능

// Exclude<T1, T2> : T1에서 T2 제외
type T1 = string | number | boolean;
type T2 = Exclude<T1, number>;
