// 1. 두개의 숫자를 받아서 더한 결과를 반환하는 함수 작성

function sum() {
  const a = parseFloat(prompt("숫자 입력해주세요."));
  const b = parseFloat(prompt("다른 숫자를 입력해주세요."));
  return a + b;
}

// 2. 함수 안에서 1 ~ 10까지 더한 결과를 출력하는 함수 작성

const addResult = function () {
  let a = 0;
  for (let i = 0; i < 11; i++) {
    a += i;
  }
  return a;
};

// 3. multiple(num) 정의 - num이 3의 배수라면 "박수" 출력 / "통과" 출력

function multiple(num) {
  if (num % 3 == 0) {
    console.log("박수");
  } else {
    console.log("통과");
  }
}

// 4. multiple2(num) - 3의 배수 "박수" / 9의 배수 "박수2"

function multiple2(num) {
  if (num % 9 == 0) {
    console.log("박수2");
  } else if (num % 3 == 0) {
    console.log("박수1");
  } else {
    return num;
  }
}

// 5. pass(outline, law) - 두 과목 합해서 120점 이상이면 합격!
// 단, 한 과목이라도 40점 미만이면 불합격

function pass(outline, law) {
  if (outline < 40 || law < 40) {
    console.log("불합격");
  } else if (outline + law >= 120) {
    console.log("합격");
  } else {
    console.log("불합격");
  }
}
