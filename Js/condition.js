// 조건문
// if, if~else, if~else if~else
// 참 : 0 제외숫자, '문자', [], {}
// 거짓 : 0, '', null, undefined, NaN

let date = new Date();
console.log(date); // 2026-08-04T02:42:21.657Z (ISO 8601 형식의 날짜/시간)

let hour = date.getHours();
console.log(hour);

if (hour < 12) {
  console.log("오전");
} else {
  console.log("오후");
}

const x = 10;
if (x % 4) {
  if (x % 2) {
    console.log("홀수입니다.");
  } else {
    console.log("짝수입니다");
  }
} else {
  console.log("4의 배수입니다");
}

const a = 1;
const b = 2;

if (a < b) {
  console.log("b가 큼");
} else if (a > b) {
  console.log("a가 큼");
} else {
  console.log("둘이 같음");
}

// switch
// if ~ else  if ~ else 대체용
// switch (key) {
//     case value:

//         break;

//     default:
//         break;
// }

const firePower = 1;

switch (firePower) {
  case 1:
    console.log("레어");
    break;
  case 2:
    console.log("미디움");
    break;
  case 3:
    console.log("웰던");
  default:
    console.log("오류");
    break;
}

const yootThrow = "도";

switch (yootThrow) {
  case "도":
    console.log("1칸 전진");
    break;
  case "개":
    console.log("2칸 전진");
    break;
  case "걸":
    console.log("3칸 전진");
    break;
  case "윷":
    console.log("4칸 전진");
    break;
  case "모":
    console.log("5칸 전진");
    break;
  default:
    console.log("무효");
    break;
}

// 월~목 : 6시 퇴근
// 금 : 12시 퇴근
// 토, 일 : 휴무

dayOfWeek = "화";

switch (dayOfWeek) {
  case "월":
  case "화":
  case "수":
  case "목":
    console.log("6시 퇴근");
    break;
  case " 금":
    console.log("12시 퇴근");
    break;
  case " 토":
  case " 일":
    console.log("휴무");
    break;
  default:
    console.log("잘못된 요일");
    break;
}
