// for (let index = 0; index < array.length; index++) {
//     const element = array[index];

// }

// for (const key in object) {
//     if (!Object.hasOwn(object, key)) continue;

//     const element = object[key];

// }

// for (const element of object) {

// }

// while (condition) {

// }

// do {

// } while (condition);

let arr2 = ["a", "b", 1, 2, 1.5, true];

for (let index = 0; index < arr2.length; index++) {
  const element = arr2[index];
  console.log(element);
}

let i = 0;
while (i < arr2.length) {
  console.log(arr2[i]);
  i++;
}

// index 사용하지 않고 요소 자체를 바로 사용
for (const element of arr2) {
  console.log(element);
}

arr2.forEach((i) => console.log(i));

i = 1;
do {
  console.log(i);
  i++;
} while (i <= 5);
