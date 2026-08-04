// 배열 (== 파이선 리스트)
// 배열의 값으로는 제한이 없다
let arr1 = [];
let arr2 = ["a", "b", 1, 2, 1.5, true];
console.log(arr1, arr1.length);
console.log(arr2, arr2.length);
console.log(arr2[1]);

// 배열 함수
// 1. push()
arr1.push(25);
arr1.push(23);
arr1.push(26);
console.log(arr1, arr1.length);

// 2. unshift()  : 앞에 추가
arr1.unshift("복숭아");
console.log(arr1, arr1.length);

arr1[1] = "사과";
console.log(arr1, arr1.length);

// 3. pop() : 마지막 요소 제거
arr1.pop();
console.log(arr1, arr1.length);

// 4. shift() : 맨 앞 요소 제거
arr1.shift();
console.log(arr1, arr1.length);

// 5. join("연결문자열")
console.log(arr2.join("-"));

// 6. concat() : 다른 배열과 합치기
console.log(arr2.concat(arr1));

// 7. slice(시작, 끝) : 끝 위치 포함 안함
console.log(arr2.slice(1, 3));

// 8. sort() : 배열 정렬하기
console.log(arr2.sort());

// 9. indexOf(찾고자 하는 요소) : 요소가 있으면 index 번호 반환 / 없으면 -1
console.log("c 위치 찾기", arr2.indexOf("c"));

console.log("------ 얕은 복사 ---------");

// 복사 (얕은 복사, 깊은 복사)
let arr3 = arr2;
console.log("arr2", arr2);
console.log("arr3", arr3);

arr3[1] = 33; // 원본인 a2도 값이 변함
console.log("arr2", arr2);
console.log("arr3", arr3);

console.log("------ 깊은 복사 (값 복사) ---------");
// ...  : spread operator
arr3 = [...arr2];
arr3[2] = 42;
console.log("arr2", arr2);
console.log("arr3", arr3);

let varArr1 = ["num1", "num2"];
let varArr2 = ["num3", "num4"];

let sumLetArr = [...varArr1, ...varArr2];
console.log(sumLetArr);

const fruits = new Array("사과", "망고", "바나나", "수박");
fruits.forEach((i) => console.log(i));
