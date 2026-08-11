"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// | : 유니온
// 리터럴
const userName1 = "Bob";
let userName2 = "Tom";
// userName2 = 3;          이거 안됨
let userName3 = "Tom";
userName3 = 3;
const person1 = {
    name: "Alice",
    job: "manager",
};
const student1 = {
    name: "James",
    grade: 1,
};
const getGift = (gift) => {
    console.log(gift.color);
    if (gift.type === "Car") {
        gift.start();
    }
    else {
        gift.call();
    }
};
// interface Devmanager extends Developer, Manager{}
const person2 = {
    name: "Luke",
    age: 30,
    skills: ["computer", "Database"],
    manage() {
        console.log("Todo");
    },
};
// 제네릭 : T
const getSize = (arr) => {
    return arr.length;
};
const arr1 = [1, 2, 3, 4, 5];
console.log(getSize(arr1));
const arr2 = ["a", "b", "c"];
console.log(getSize(arr2));
// boolean[], Date[]...
const getGenericSize = (arr) => {
    return arr.length;
};
function getGenericSize2(arr) {
    return arr.length;
}
console.log(getGenericSize2(arr1));
console.log(getGenericSize2(arr2));
const arr3 = [true, false, true];
console.log(getGenericSize2(arr3));
const myPhone = {
    name: "galaxy",
    price: 100000,
    option: { color: "black", coupon: true },
};
const myTablet = {
    name: "Ipad",
    price: 100000,
    option: ["pen", "cover"],
};
// 함수
// 2개의 숫자를 받아서 더한 결과를 출력하는 함수
// function add1(num1: number, num2: number) {
//   return num1 + num2;
// }
const add1 = (num1, num2) => {
    return num1 + num2;
};
// isAdult 함수 작성 age 값을 받아서 19보다 큰지 true, false 반환하는 함수
function isAdult(age) {
    if (age > 19) {
        return true;
    }
    else {
        return false;
    }
}
const hello = (name) => {
    console.log(`Hello, ${name || "Guest"}`);
};
hello();
const hello2 = (name = "Guest") => {
    console.log(`Hello, ${name}`);
};
hello2();
hello2("Sam");
// ... : 함수에 들어오는 여러개의 인자를 모두 nums라는 배열로 모아주는것
const sum = (...nums) => {
    return nums.length;
};
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4, 5, 6, 7));
const uk = "id";
const pUser1 = {};
const pUser2 = { id: 1 };
const pUser3 = { id: 1, name: "James" };
const rUser1 = { id: 3, name: "Yuna", age: 20, gender: "F" };
const reUser = { id: 3, name: "Yuna", age: 20, gender: "F" };
