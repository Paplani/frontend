# React 월–수 학습 정리

작성일: 2026-09-10  
학습 범위: `hello-react-project`, `react01-basic`, `js/basic.js`, `tictoc`  
목표: 이벤트, state, props, 렌더링, 참조와 복사를 하나의 흐름으로 이해하기

이 문서는 실습 파일과 주석을 검토한 설명을 정리한 복습 자료다. 마지막 틱택토 코드는 설명용 개선 예시이며, 기존 실습 소스를 변경한 것은 아니다.

## 목차

1. [현재 학습 상태와 보완할 개념](#1-현재-학습-상태와-보완할-개념)
2. [React가 화면을 만드는 원리](#2-react가-화면을-만드는-원리)
3. [처음 렌더링과 클릭 이후의 흐름](#3-처음-렌더링과-클릭-이후의-흐름)
4. [렌더링·커밋·페인트의 차이](#4-렌더링커밋페인트의-차이)
5. [state는 각 렌더링의 스냅샷](#5-state는-각-렌더링의-스냅샷)
6. [참조 비교·얕은 비교·깊은 비교](#6-참조-비교얕은-비교깊은-비교)
7. [상태를 복사해서 변경하는 이유](#7-상태를-복사해서-변경하는-이유)
8. [자주 사용하는 메서드와 문법](#8-자주-사용하는-메서드와-문법)
9. [틱택토 전체 복습 코드](#9-틱택토-전체-복습-코드)
10. [이해도 확인 질문](#10-이해도-확인-질문)
11. [공식 참고 자료](#11-공식-참고-자료)

## 1. 현재 학습 상태와 보완할 개념

컴포넌트, props, 이벤트, state를 각각 사용하는 실습은 진행됐다. 지금의 핵심은 이 개념들을 하나의 실행 흐름으로 연결하는 것이다.

특히 다음 세 쌍을 구분해야 한다.

- 함수를 **전달하는 것**과 **실행하는 것**
- 상태 변경을 **요청하는 것**과 화면에 **반영되는 것**
- 객체의 **내용이 같은 것**과 **같은 객체를 가리키는 것**

| 실습 파일 | 잘 사용하고 있는 내용 | 보완할 이해 |
|---|---|---|
| `react01-basic/src/props/FrontComp.tsx` | props, 구조 분해, 목록 만들기 | props는 부모가 이번 렌더링에서 전달하는 값 |
| `react01-basic/src/State/MyApp.tsx`, `MyButton.tsx` | 상태와 함수 전달 | 자식의 클릭 → 부모 함수 → 부모 상태 → 자식 props |
| `react01-basic/src/State/Counter.tsx` | useState, setter | 상태 요청과 실제 화면 반영의 구분 |
| `react01-basic/src/State/MyComp.tsx` | 객체·배열 복사 | 참조 비교와 얕은 비교의 정확한 차이 |
| `react01-basic/src/State/InputMultipleSample.tsx` | 객체 상태와 입력값 변경 | 이전 객체를 보존하는 이유 |
| `tictoc` | 클릭, 승리·무승부 판정 | 저장할 상태와 상태에서 계산할 값 구분 |

### 주석에서 바로잡을 부분

**`js/basic.js`의 “같은 배열 = 얕은 복사”**

배열을 다른 변수에 그대로 대입하는 것은 복사가 아니다. 두 변수가 같은 배열을 가리키는 것이다.

**`State/Counter.tsx`의 “set 함수는 변수값 변경, 화면 리페인팅”**

중간 과정이 생략된 설명이다. setter는 다음 상태를 요청한다. 이후 React가 새 화면을 계산하고 DOM에 반영하면 브라우저가 그린다.

**`State/UserProfile.tsx`의 “부모 상태가 자식에게 전달되지 않으면 부모만 렌더링”**

일반적인 기본 규칙은 아니다. 기본적으로 부모의 재렌더링은 자식 렌더링으로 이어질 수 있다. 최적화가 적용되면 일부 작업을 생략할 수 있다.

**`State/MyComp.tsx`의 “React는 참조만 비교 = 얕은 비교”**

학습용 축약 표현이다. 정확하게는 useState의 상태 비교와 memo의 props 비교를 구분해야 한다. 6장에서 설명한다.

## 2. React가 화면을 만드는 원리

React에서는 현재 데이터에 맞는 화면을 JSX로 설명한다.

```text
squares[1]이 null → 1번 버튼은 빈칸
squares[1]이 "X"  → 1번 버튼에 X 표시
squares[1]이 "O"  → 1번 버튼에 O 표시
```

```tsx
<button>{value}</button>
```

위 JSX는 “버튼의 내용은 value여야 한다”는 설명이다. React는 컴포넌트 함수를 실행해서 이 설명을 얻고, 실제 화면이 그 설명에 맞도록 필요한 부분을 바꾼다.

**컴포넌트가 렌더링된다는 것은 우선 React가 컴포넌트 함수를 실행해서 이번 화면을 계산한다는 뜻이다.**

JSX는 그 자체로 실제 DOM이 아니다. DOM은 브라우저가 관리하는 실제 버튼, div, 텍스트 등의 구조다.

## 3. 처음 렌더링과 클릭 이후의 흐름

### 처음 화면이 만들어질 때

```text
main.tsx에서 최초 렌더링 요청
          ↓
App 실행
          ↓
Board 실행 — 최초 state 준비
          ↓
Square에 값과 함수 전달
          ↓
버튼들의 화면 구조 계산
          ↓
React가 실제 DOM에 반영
          ↓
브라우저가 화면을 그림
```

처음 squares는 null 9개가 들어 있는 배열이다. 각 값이 Square에 전달되므로 빈 버튼 9개가 보인다.

### 함수를 전달하는 시점

```tsx
<Square
  value={squares[1]}
  handleClick={() => handleClick(1)}
/>
```

여기서 1은 배열 인덱스이므로 화면의 두 번째 칸이다.

이 JSX를 계산하는 시점에는 부모의 handleClick(1)을 실행하지 않는다. **나중에 실행되면 handleClick(1)을 호출할 함수를 전달**한다.

| 표현 | 의미 |
|---|---|
| `handleClick` | 함수 자체 |
| `handleClick(1)` | 지금 함수를 호출하는 식 |
| `() => handleClick(1)` | 나중에 호출할 함수를 만드는 식 |

### 클릭한 뒤

```text
자식 Square의 버튼 클릭
          ↓
자식의 onClick에 연결된 함수 실행
          ↓
부모의 handleClick(1) 실행
          ↓
새 배열에 이번 수를 기록
          ↓
setSquares로 상태 변경 요청
          ↓
React가 새 상태로 Board를 다시 실행
          ↓
새 squares[1]을 자식의 value로 전달
          ↓
필요한 DOM 변경
          ↓
브라우저가 X 또는 O를 표시
```

부모 함수의 반환값이 자동으로 자식 props가 되는 것은 아니다. **부모 함수가 상태를 변경하고, 다음 렌더링에서 그 상태가 props로 내려간다.**

이것은 DOM 이벤트 버블링과 별개다. 자식이 전달받은 함수를 호출하기 때문에 부모의 로직이 실행된다.

## 4. 렌더링·커밋·페인트의 차이

| 단계 | 하는 일 | 틱택토 예 |
|---|---|---|
| 렌더링 | 컴포넌트 함수를 실행해 새 화면 계산 | 새 squares로 버튼 내용 계산 |
| 커밋 | 필요한 변경을 실제 DOM에 반영 | 빈 버튼의 내용을 X로 변경 |
| 페인트 | 브라우저가 화면을 그림 | 사용자가 X를 보게 됨 |

컴포넌트가 다시 실행돼도 계산 결과가 이전과 같으면 DOM 변경이 없을 수 있다. Board가 다시 렌더링됐다는 말은 버튼 9개를 모두 삭제하고 새로 만들었다는 뜻이 아니다.

또한 클릭 이벤트 자체가 반드시 React 리렌더링을 일으키는 것은 아니다. 핸들러가 콘솔 출력만 한다면 그 클릭은 상태 변경을 요청하지 않는다.

### 부모·자식 렌더링

- 부모가 리렌더링되면 기본적으로 그 아래 자식도 렌더링 과정에 포함된다.
- 자식 자신의 상태 변경이 부모 함수의 재실행을 자동으로 요구하지는 않는다.
- memo나 React Compiler 등의 최적화가 적용되면 불필요한 작업을 생략할 수 있다.

### 현재 실습 환경에서 유의할 점

`react01-basic/vite.config.ts`와 `tictoc/vite.config.ts`에는 React Compiler 설정이 있다. 최적화 때문에 콘솔에서 관찰한 실행 횟수가 기본 설명과 다르게 보일 수 있다. “props가 같으면 자식은 원래 절대 실행되지 않는다”라고 외우면 안 된다.

틱택토의 main.tsx에는 StrictMode도 있다. 개발 중 순수성 검사 등을 위해 컴포넌트가 추가 실행될 수 있다. 이것은 사용자가 버튼을 두 번 클릭했다는 뜻이 아니다.

## 5. state는 각 렌더링의 스냅샷

state는 각 렌더링 시점의 값이다. 지금 렌더링에서 count가 0이라면 다음 핸들러는 0을 읽는다.

```tsx
setCount(count + 1);
console.log(count); // 이 핸들러에서는 여전히 0
```

setCount는 현재 함수의 count 변수에 1을 대입하지 않는다. 다음 렌더링에 사용할 상태를 요청한다. 다음 실행에서 useState가 변경된 값을 제공한다.

### 틱택토에서 이전 배열과 새 배열

```tsx
const copySquares = squares.slice();
copySquares[1] = "X";
setSquares(copySquares);
```

현재 핸들러 안에서는 다음과 같다.

- squares: 이번 클릭 이전 배열
- copySquares: 이번 클릭을 반영한 새 배열

따라서 **현재 핸들러 안에서 이번 수를 판정하려면 copySquares를 검사**해야 한다. 다음 렌더링에서는 squares가 새 배열을 가리킨다.

컴포넌트가 다시 실행돼도 state가 매번 초기값으로 돌아가지는 않는다. React가 컴포넌트의 상태를 보관하고 다음 실행에 제공한다. 단, 컴포넌트가 제거된 뒤 새로 마운트되는 경우 등은 별개다.

### 배칭과 alert

같은 이벤트 안의 여러 상태 변경 요청은 보통 묶어서 반영된다. 이를 배칭이라고 한다. setter를 세 번 호출했다고 중간 화면 세 개가 반드시 따로 보이는 것은 아니다.

핸들러 중간의 alert는 알림을 닫을 때까지 실행을 멈춘다. 브라우저가 마지막 수를 그리기 전에 alert가 뜰 수 있다. setSquares를 alert 앞으로 옮기는 것만으로 화면 표시를 보장하지는 못한다.

승리 문구를 JSX에 표시하면 마지막 칸과 결과를 같은 상태에 맞춰 화면에 반영할 수 있다.

### 이전 값으로 업데이트할 때

```tsx
setCount((prev) => prev + 1);
```

이는 React가 업데이트를 처리할 때 제공하는 이전 값을 기준으로 다음 값을 계산한다.

같은 핸들러에서 count가 0일 때 `setCount(count + 1)`을 세 번 호출하면 모두 1로 바꾸라는 요청이다. 반면 `setCount((prev) => prev + 1)`을 세 번 호출하면 0 → 1 → 2 → 3으로 누적된다.

## 6. 참조 비교·얕은 비교·깊은 비교

비교와 복사는 다른 개념이다.

- 비교: 두 값이 같은지 판단
- 복사: 별도의 값을 생성

### 원시 값과 객체의 차이

```ts
"X" === "X"; // true
3 === 3;     // true

const a = [1, 2];
const b = [1, 2];
const c = a;

a === b; // false
a === c; // true
```

a와 b는 내용이 같아도 별도로 만든 배열이다. c는 새 배열이 아니라 a와 같은 배열을 가리킨다. 이 연결을 참조라고 한다.

| 비교 | 확인하는 범위 |
|---|---|
| 참조 비교 | 같은 객체 자체를 가리키는가? |
| 얕은 비교 | 첫 단계 속성이 같은가? 중첩 객체는 참조 비교 |
| 깊은 비교 | 중첩 구조 내부까지 들어가 내용이 같은가? |

```ts
const a = { score: 1 };
const b = { score: 1 };
```

이 경우 참조 비교는 다르지만, 일반적인 얕은 속성 비교와 깊은 비교에서는 같다.

```ts
const a = { player: { name: "X" } };
const b = { player: { name: "X" } };
```

이 경우 참조 비교와 얕은 비교는 다르다. player가 각각 별도의 객체이기 때문이다. 깊은 비교에서는 안쪽 name 값까지 같으므로 같다.

**객체에 사용하는 ===가 속성을 하나씩 얕게 비교해 주는 것은 아니다.** 얕은 비교는 속성들을 별도로 확인하는 비교 방식을 뜻한다. 깊은 비교도 ===가 자동으로 수행해 주지 않는다.

### React에서 사용하는 비교

| 상황 | 기본 방식 |
|---|---|
| useState의 이전 상태와 다음 상태 | Object.is |
| React.memo의 이전 props와 다음 props | 각 prop을 Object.is로 비교 |

객체와 배열을 Object.is로 비교하면 같은 참조인지 판단한다. useState가 배열의 9칸을 하나씩 검사하는 것은 아니다.

Object.is는 일반적인 값에서 ===와 비슷하지만 NaN, 양의 0과 음의 0 처리에 차이가 있다. 지금은 객체·배열의 경우 참조를 비교한다는 점이 우선이다.

React.memo도 자식 자신의 state 변경까지 막는 기능은 아니다. 부모로부터 전달된 props가 같을 때 불필요한 렌더링을 줄이는 최적화다.

## 7. 상태를 복사해서 변경하는 이유

### 기존 상태를 직접 수정하는 경우

```tsx
squares[1] = "X";
setSquares(squares);
```

내용은 바뀌었지만 같은 배열을 전달했다. React가 같은 상태로 판단해 업데이트를 생략할 수 있고, 이전 상태 자체도 이미 바뀌었다.

### 새 배열로 교체하는 경우

```tsx
const copySquares = squares.slice();
copySquares[1] = "X";
setSquares(copySquares);
```

| 단계 | 기존 squares | 새 copySquares |
|---|---|---|
| 복사 직후 | 1번 칸 null | 1번 칸 null |
| 새 배열 수정 후 | 1번 칸 null | 1번 칸 X |

이것이 불변 업데이트다. 상태를 바꾸지 말라는 뜻이 아니라, 기존 값을 직접 수정하지 않고 다음 값을 만들어 교체한다는 뜻이다.

### 얕은 복사는 어디까지 복사할까?

```ts
const before = [{ name: "X" }];
const after = [...before];

before === after;      // false: 바깥 배열은 새 배열
before[0] === after[0]; // true: 안쪽 객체는 공유
```

after[0].name을 직접 수정하면 before[0].name도 바뀐다. 같은 객체이기 때문이다. slice와 스프레드는 얕은 복사다.

틱택토는 문자열과 null만 담으므로 바깥 배열을 복사하는 것으로 충분하다.

### 이미 실습한 중첩 업데이트

`react01-basic/src/State/MyComp.tsx`의 예:

```tsx
setMyData((prev) => ({
  ...prev,
  frontData: [...prev.frontData, "TypeScript"],
}));
```

이 코드는 바깥 객체와 변경되는 frontData 배열을 새로 만든다. 변경되지 않는 backData는 공유한다.

모든 데이터를 매번 깊은 복사할 필요는 없다. **변경되는 부분과 그것을 감싸는 객체·배열을 새로 만드는 방식**이면 된다.

중첩 데이터 전체를 매번 깊게 비교하는 대신, 바뀐 부분의 참조를 새로 만들면 변경을 빠르게 구분할 수 있다. 이것이 React에서 참조와 불변 업데이트가 중요한 이유다.

## 8. 자주 사용하는 메서드와 문법

filter, map, slice는 React 전용이 아니라 JavaScript 배열 메서드다.

| 메서드 | 목적 | 반환값 | 원본 배열 변경 |
|---|---|---|---|
| map | 각 요소를 다른 값으로 변환 | 새 배열 | 안 함¹ |
| filter | 조건에 맞는 요소 선택 | 새 배열 | 안 함¹ |
| find | 조건에 맞는 첫 요소 찾기 | 요소 또는 undefined | 안 함¹ |
| findIndex | 조건에 맞는 첫 위치 찾기 | 인덱스 또는 -1 | 안 함¹ |
| includes | 특정 값 포함 여부 | boolean | 안 함 |
| indexOf | 특정 값의 첫 위치 | 인덱스 또는 -1 | 안 함 |
| slice | 일부 또는 전체 복사 | 새 배열 | 안 함 |
| forEach | 각 요소에 작업 수행 | undefined | 안 함¹ |
| some | 하나라도 조건을 만족하는가? | boolean | 안 함¹ |
| every | 모두 조건을 만족하는가? | boolean | 안 함¹ |
| reduce | 누적 결과 계산 | 누적 결과 | 안 함¹ |
| join | 요소를 문자열로 연결 | 문자열 | 안 함 |

¹ 메서드 자체는 원본 배열을 변경하지 않지만, 콜백 안에서 직접 객체나 배열을 수정하면 원본이 바뀔 수 있다.

우선 map, filter, slice를 확실히 이해한다. 나머지를 한꺼번에 외울 필요는 없다.

```ts
const numbers = [1, 2, 3];

numbers.map((n) => n * 2);      // [2, 4, 6]
numbers.filter((n) => n >= 2);  // [2, 3]
numbers.slice();               // [1, 2, 3]인 새 배열
```

### 콜백 반환값의 의미

- map: 반환한 값을 새 배열에 넣는다.
- filter: 반환값이 참인 원래 요소를 새 배열에 남긴다.
- forEach: 콜백 반환값으로 새 배열을 만들지 않는다.

```tsx
squares.filter((square) => square === null)
```

“각 칸을 확인해서 빈칸인 요소만 모아 새 배열을 만들어라”라는 뜻이다. 그 결과의 length가 0이면 빈칸이 없다. length는 메서드가 아니라 속성이다.

push, pop, splice, sort, reverse, fill은 원본 배열을 변경한다. 기존 React 상태 배열에 직접 적용하지 않도록 한다. Array(9).fill(null)은 방금 만든 배열의 초기화이므로 괜찮다.

### React 기능과 JavaScript 문법 구분

| 이름 | 분류 | 역할 |
|---|---|---|
| useState | React Hook | 컴포넌트 상태 보관 |
| setSquares 등 | useState가 반환한 함수 | 다음 상태 요청 |
| onClick, onChange | 이벤트 prop | 이벤트 때 실행할 함수 연결 |
| preventDefault() | 이벤트 메서드 | 폼 제출 등의 브라우저 기본 동작 방지 |
| ... | JavaScript 문법 | 배열·객체 펼치기 |
| 구조 분해 | JavaScript 문법 | 배열·객체에서 값 꺼내기 |

## 9. 틱택토 전체 복습 코드

### 게임 규칙과 판정 순서

- X와 O가 번갈아 빈칸에 둔다.
- 가로 3개, 세로 3개, 대각선 2개의 승리 조합을 확인한다.
- 같은 기호가 한 줄을 완성하면 즉시 승리한다.
- 승자가 없고 빈칸도 없으면 무승부다.
- 승리 또는 무승부 이후에는 추가 수를 받지 않는다.

```text
0 | 1 | 2
---------
3 | 4 | 5
---------
6 | 7 | 8
```

9개 중 임의의 3개를 고르는 84개 조합은 필요 없다. 승리 가능한 8개 조합만 검사한다.

승자 함수의 return null은 반복문 밖에 둬야 전체 조합을 검사할 수 있다. if는 함수를 끝내지 않는다. return이 실행되어야 함수가 종료된다.

### 현재 코드와 달라진 설계

복습 코드는 결과 문구를 별도 state로 저장하지 않고 현재 squares와 isNext에서 계산한다. 현재 실습 방식도 동작하지만, 보드에서 알 수 있는 정보를 중복 저장하지 않으면 보드와 결과 문구를 따로 맞출 필요가 없다.

```text
이벤트 핸들러: 다음 보드 상태 만들기
렌더링: 현재 보드에서 승자·무승부·표시 문구 계산하기
```

기존 프로젝트의 main.tsx와 index.css는 그대로 사용하는 예시다. 아래 파일을 학습용으로 제시하며 실습 파일에 자동 적용하지 않았다.

### src/types/types.ts

```ts
// 한 칸에 들어갈 수 있는 값
export type SquareValue = "X" | "O" | null;

// 칸의 값들을 담는 배열
export type Squares = SquareValue[];
```

이 배열 타입은 요소의 종류를 제한한다. 길이 9까지 타입으로 강제하지는 않는다. 이 예시에서는 초기화와 클릭 위치를 통해 9칸을 유지한다.

### src/utils/util.ts

```ts
import type { Squares, SquareValue } from "../types/types";

export function calculateWinner(squares: Squares): SquareValue {
  const corrects = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [i1, i2, i3] of corrects) {
    const first = squares[i1];

    // 빈칸이 아니고 세 칸이 같으면 승자 반환
    if (
      first !== null &&
      first === squares[i2] &&
      first === squares[i3]
    ) {
      return first;
    }
  }

  // 모든 조합을 확인했지만 승자가 없음
  return null;
}
```

이 함수는 유효한 9칸 보드를 입력받는 것을 전제로 한다. 받은 보드를 읽고 결과만 반환하며 상태나 화면을 변경하지 않는다.

### src/Components/Square.tsx

```tsx
import type { SquareValue } from "../types/types";

type SquareProp = {
  value: SquareValue;
  handleClick: () => void;
};

const Square = ({ value, handleClick }: SquareProp) => {
  return (
    <button
      type="button"
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Square;
```

Square는 받은 값을 표시하고, 클릭하면 받은 함수를 실행한다. X인지 O인지 직접 결정하지 않는다.

### src/Components/Board.tsx

```tsx
import { useState } from "react";
import type { Squares } from "../types/types";
import { calculateWinner } from "../utils/util";
import Square from "./Square";

const Board = () => {
  // React가 보관할 상태
  const [squares, setSquares] = useState<Squares>(
    Array(9).fill(null),
  );
  const [isNext, setIsNext] = useState(true);

  // 이번 렌더링의 상태를 기준으로 계산
  const winner = calculateWinner(squares);
  const emptySquares = squares.filter(
    (square) => square === null,
  );
  const isDraw =
    winner === null && emptySquares.length === 0;

  // 상태에서 계산할 수 있으므로 별도의 state가 필요 없음
  let resultSentence: string;

  if (winner !== null) {
    resultSentence = `${winner}가 이겼습니다!`;
  } else if (isDraw) {
    resultSentence = "무승부입니다!";
  } else {
    resultSentence = `다음 차례: ${isNext ? "X" : "O"}`;
  }

  // 버튼을 클릭했을 때만 실행
  const handleClick = (idx: number) => {
    // 종료된 게임 또는 이미 선택한 칸은 처리하지 않음
    if (winner !== null || isDraw || squares[idx] !== null) {
      return;
    }

    // 기존 상태 배열을 보존하고 새 배열을 만듦
    const copySquares = squares.slice();

    if (isNext) {
      copySquares[idx] = "X";
    } else {
      copySquares[idx] = "O";
    }

    // 다음 렌더링에서 사용할 상태를 요청
    setSquares(copySquares);
    setIsNext(!isNext);
  };

  return (
    <div className="game">
      <div className="status">{resultSentence}</div>

      <div className="board-row">
        <Square
          value={squares[0]}
          handleClick={() => handleClick(0)}
        />
        <Square
          value={squares[1]}
          handleClick={() => handleClick(1)}
        />
        <Square
          value={squares[2]}
          handleClick={() => handleClick(2)}
        />
      </div>

      <div className="board-row">
        <Square
          value={squares[3]}
          handleClick={() => handleClick(3)}
        />
        <Square
          value={squares[4]}
          handleClick={() => handleClick(4)}
        />
        <Square
          value={squares[5]}
          handleClick={() => handleClick(5)}
        />
      </div>

      <div className="board-row">
        <Square
          value={squares[6]}
          handleClick={() => handleClick(6)}
        />
        <Square
          value={squares[7]}
          handleClick={() => handleClick(7)}
        />
        <Square
          value={squares[8]}
          handleClick={() => handleClick(8)}
        />
      </div>
    </div>
  );
};

export default Board;
```

winner와 resultSentence는 일반 변수여도 된다. 보관할 데이터는 squares와 isNext이며, 나머지는 다음 렌더링에서 다시 계산한다.

렌더링 중에는 handleClick 함수를 준비할 뿐 그 본문까지 실행하지 않는다. 클릭했을 때 본문이 실행되고, 상태 변경이 다음 렌더링을 요청한다.

### src/App.tsx

```tsx
import "./App.css";
import Board from "./Components/Board";

const App = () => {
  return <Board />;
};

export default App;
```

### src/App.css

```css
.game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
}

.status {
  margin-bottom: 16px;
  text-align: center;
  font-weight: bold;
}

.board-row {
  display: flex;
}

.square {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 0;
  margin-right: -1px;
  margin-top: -1px;
  border: 1px solid #999;
  background-color: white;
  font-size: 24px;
  font-weight: bold;
}
```

## 10. 이해도 확인 질문

답을 보기 전에 직접 설명해 본다.

1. JSX에서 함수를 전달할 때와 클릭했을 때 각각 무엇이 실행되는가?
2. setSquares를 호출한 바로 다음 줄에서 squares는 어떤 배열인가?
3. Board가 리렌더링되면 모든 버튼 DOM을 다시 만드는가?
4. 같은 내용을 가진 배열 두 개를 ===로 비교하면 왜 false인가?
5. 배열 안에 객체가 있을 때 스프레드만으로 객체까지 복사되는가?
6. calculateWinner가 null을 반환하면 무조건 무승부인가?
7. 결과 문구를 별도 state로 저장하지 않아도 되는 이유는 무엇인가?
8. filter 콜백의 반환값과 map 콜백의 반환값은 어떻게 쓰이는가?

### 답 확인

1. JSX에서는 클릭할 함수를 전달한다. 클릭하면 전달된 함수가 실행되어 부모 핸들러를 호출한다.
2. 해당 렌더링에서 받은 이전 배열이다. 새 배열은 다음 렌더링의 squares로 제공된다.
3. 아니다. 새 화면을 계산한 뒤 필요한 DOM 변경을 적용한다.
4. 객체·배열의 ===는 내용이 아니라 같은 객체인지 비교한다.
5. 아니다. 바깥 배열만 새로 만들며 안쪽 객체는 공유된다.
6. 아니다. 승자가 없다는 뜻이다. 빈칸까지 없을 때 무승부다.
7. squares와 isNext에서 계산할 수 있기 때문이다.
8. filter는 반환값으로 포함 여부를 정하고, map은 반환값을 새 배열의 요소로 사용한다.

복습할 때는 “1번 칸 클릭 후 지금 어떤 함수가 실행 중이고, 어떤 배열을 읽고 있는가?”를 따라가 본다. 새 배열 생성, setter 호출, 다음 Board 실행을 구분할 수 있으면 핵심 흐름을 이해한 것이다.

## 11. 공식 참고 자료

- [React: Render and Commit](https://react.dev/learn/render-and-commit) — 렌더링, 커밋, 브라우저 페인트
- [React: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) — 렌더링별 state와 이벤트 핸들러
- [React: useState](https://react.dev/reference/react/useState) — 초기 상태, setter, Object.is
- [React: Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) — 배칭과 함수형 업데이트
- [React: memo](https://react.dev/reference/react/memo) — props 비교와 렌더링 최적화
- [React: Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state) — 배열의 불변 업데이트
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure) — 중복 state 줄이기
- [React Compiler 소개](https://react.dev/learn/react-compiler/introduction) — 자동 최적화
- [React: Tic-Tac-Toe 튜토리얼](https://react.dev/learn/tutorial-tic-tac-toe) — 틱택토 학습 원문
- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) — 배열 메서드
- [MDN: Shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) — 얕은 복사
- [MDN: Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) — 값과 참조 비교
