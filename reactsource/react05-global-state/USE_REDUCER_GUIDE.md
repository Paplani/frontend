# useReducer 이해하기
> **2026.09.15 · 내 이름·출생년도 입력 예제로 배우는 상태 관리**  
> VS Code에서 **Cmd + Shift + V**로 미리보기를 열어 읽어보세요.  
> 이 문서는 현재 코드의 설명과 개선 아이디어입니다. 앱 코드는 변경하지 않았습니다.

## 1. 먼저 알아둘 핵심

**useReducer는 현재 상태를 저장하면서, 상태를 바꾸는 규칙을 reducer 함수에 모아두는 React 훅이에요.**

- 컴포넌트: 사용자가 무엇을 했는지 알린다.
- action: 무슨 일이 일어났는지와 필요한 데이터를 담는다.
- reducer: 기존 상태와 action으로 다음 상태를 계산한다.
- React: 계산된 상태를 보관하고 화면에 반영한다.

useState로 할 수 없던 기능이 생기는 것은 아니에요. **변경 규칙을 어디에 정리하느냐가 달라지는 것**이에요.

---

## 2. 지금 내 코드에서 등장하는 네 가지 이름

```tsx
const [user, userDispatch] = useReducer(UserReducer, initUser);
```

| 이름 | 정체 | 역할 |
| :--- | :--- | :--- |
| useReducer | React가 제공하는 훅 | 상태와 dispatch를 연결 |
| UserReducer | 내가 만든 일반 함수 | action에 따른 다음 상태 계산 |
| initUser | 초기 상태 객체 | 첫 상태의 기본값 |
| user | 현재 상태 | JSX에 표시할 값 |
| userDispatch | React가 제공하는 함수 | action을 전달해 업데이트 요청 |

**useReducer와 UserReducer는 다른 함수예요.** 앞은 React의 기능이고, 뒤는 내가 작성한 변경 규칙이에요. 둘을 같은 함수로 생각해서 직접 `UserReducer(UserReducer, initUser)`를 호출하면 안 됩니다.

userDispatch라는 이름도 내가 붙인 변수 이름이에요. dispatch라고 이름 붙여도 동작은 같아요.

---

## 3. 전체 흐름

```text
사용자가 input에 입력
        ↓
handleChange가 입력 항목과 값을 읽음
        ↓
userDispatch(action)
        ↓
React가 UserReducer(직전 user 상태, action)를 호출
        ↓
reducer가 새 상태 객체를 return
        ↓
React가 새 user로 컴포넌트를 렌더링
        ↓
input과 아래 출력 문구가 변경됨
```

dispatch는 reducer의 계산 결과를 반환받는 조회 함수가 아니에요. 상태 변경을 요청하는 함수입니다.

`setTodos(prevTodos => ...)`에서 React가 이전 상태를 전달했던 것과 비슷하게, 여기서는 React가 reducer에 **이전 상태와 action 두 개**를 전달해요.

---

## 4. 파일별 역할

| 파일 | 읽을 부분 | 담당 역할 |
| :--- | :--- | :--- |
| [user.types.ts](src/components/01-useState/user.types.ts) | UserType, UserAction, initUser | 데이터 모양, 허용할 요청, 초기값 |
| [user.reducer.ts](src/components/02-useReducer/user.reducer.ts) | UserReducer | 상태 변경 규칙 |
| [UseReducerExam1.tsx](src/components/02-useReducer/UseReducerExam1.tsx) | useReducer, handleChange, JSX | 이벤트 전달과 화면 표시 |
| [UseStateExam.tsx](src/components/01-useState/UseStateExam.tsx) | handleChange, resetValue | 기존 방식과 비교 |

타입 파일이 01-useState 폴더에 있어도 import해서 공유할 수 있어요. 폴더 이름이 해당 파일을 useState 전용으로 만드는 것은 아니에요.

---

## 5. 타입과 초기 상태 읽기

### UserType: 상태가 가져야 할 모양

```tsx
export type UserType = {
  name: string;
  year: number;
  warning: string;
};
```

세 속성을 가진 객체 하나가 현재 상태예요. reducer가 반환하는 상태도 이 모양을 유지해야 합니다.

### initUser: 첫 화면과 Reset의 기준

```tsx
export const initUser: UserType = {
  name: "",
  year: 0,
  warning: "",
};
```

- 이름은 빈 문자열.
- 출생년도는 0으로 미입력을 표현.
- 경고 문구도 빈 문자열.

초기값은 매 렌더링마다 상태를 되돌리는 값이 아니에요. 이후에는 React가 변경된 상태를 유지합니다.

### UserAction: 어떤 요청을 허용할지

```tsx
export type UserAction =
  | { type: "SET_NAME"; name: string }
  | { type: "SET_YEAR"; year: number }
  | { type: "RESET" };
```

`|`는 셋 중 하나의 모양이라는 뜻이에요. 모든 속성을 한꺼번에 갖는다는 뜻이 아닙니다.

| 요청 | 필요한 데이터 | 예 |
| :--- | :--- | :--- |
| SET_NAME | name 문자열 | 이름 입력 |
| SET_YEAR | year 숫자 | 출생년도 입력 |
| RESET | 추가 데이터 없음 | 초기화 버튼 |

`type: "SET_NAME"`의 따옴표는 정확히 그 문자열만 허용하려는 의도예요. 반면 `name: string`은 어떤 문자열이든 받기 위한 타입이에요. `name: "string"`이라고 쓰면 글자 “string”만 허용하게 돼요.

action의 type은 **HTML input의 type과 별개**입니다.

---

## 6. 컴포넌트 코드 해설

### 현재 상태 연결

```tsx
const [user, userDispatch] = useReducer(UserReducer, initUser);
const { name, year, warning } = user;
```

첫 줄은 상태 관리 연결이고, 둘째 줄은 user 객체의 속성을 꺼내는 구조 분해예요. 각각의 state를 새로 만드는 것이 아니에요.

### 이벤트의 입력값 읽기

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  // ...
};
```

이 함수 안의 name은 input의 `name="name"` 또는 `name="year"`에서 온 값이에요. 바깥에서 꺼낸 사용자 이름과 변수 이름은 같지만 범위가 달라요.

| 이벤트 정보 | 이름 입력창 | 출생년도 입력창 |
| :--- | :--- | :--- |
| e.target.name | "name" | "year" |
| e.target.value 예 | "Alice" | "2010" |
| input type | "text" | "number" |

숫자 input이어도 value는 문자열이에요.

### 이름 변경 요청

```tsx
userDispatch({
  type: "SET_NAME",
  name: value,
});
```

“이 이름으로 변경해줘”라는 요청을 보내요. 이 객체가 reducer의 action 매개변수에 전달됩니다. 컴포넌트에서 다음 user 전체를 만들 필요가 없어요.

### 출생년도 변경 요청

```tsx
userDispatch({
  type: "SET_YEAR",
  year: Number(value),
});
```

문자열을 숫자로 바꿔 요청합니다. 빈 문자열에 `Number("")`를 적용하면 0이므로, 현재 초기값과 연결됩니다.

현재 코드는 이름이 아니면 모두 년도라고 판단해요. 입력 종류가 늘어나면 분기도 명확하게 나눠야 합니다.

### 입력값과 화면 연결

```tsx
value={name}
value={year === 0 ? "" : year}
```

입력창은 현재 상태를 보여줘요. 년도는 state가 0이어도 input에는 빈칸을 표시하도록 정한 거예요. 상태의 타입을 문자열로 바꾼 것은 아닙니다.

### Reset 버튼

```tsx
onClick={() => userDispatch({ type: "RESET" })}
```

클릭할 때 RESET 요청을 보냅니다. 클릭 전에 실행되지 않도록 함수로 감싸요. RESET은 데이터가 필요 없으므로 type만 전달해요.

---

## 7. reducer 코드 해설

### 함수의 두 매개변수

```tsx
export function UserReducer(user: UserType, action: UserAction) {
  switch (action.type) {
    // ...
  }
}
```

- user: 변경을 적용하기 직전의 상태. React가 전달해요.
- action: dispatch로 보낸 객체.
- switch: action.type에 따라 처리 분기를 선택.

명확성을 위해 반환 타입을 `: UserType`으로 표시할 수도 있어요. 현재는 반환하는 객체들로 TypeScript가 추론해요.

### SET_NAME

```tsx
case "SET_NAME":
  return {
    ...user,
    name: action.name.trim(),
  };
```

1. ...user로 기존 name, year, warning을 복사.
2. 새 이름의 양끝 공백을 제거.
3. name만 덮어쓴 새 객체 반환.

원본 user를 직접 수정하지 않아요. year와 warning은 유지돼요.

### SET_YEAR

```tsx
case "SET_YEAR": {
  const age = new Date().getFullYear() - action.year;

  return {
    ...user,
    year: action.year,
    warning: action.year !== 0 && age < 18
      ? "18세 이상이여야 합니다."
      : "",
  };
}
```

위 문구는 현재 소스 그대로이며, 맞춤법은 “18세 이상이어야 합니다.”가 자연스러워요.

| 부분 | 의미 |
| :--- | :--- |
| 현재 연도 - 입력 연도 | 연도 차이로 나이 계산 |
| year: action.year | 출생년도 변경 |
| action.year !== 0 | 미입력이 아닌 경우 |
| age < 18 | 연도 차이가 18 미만 |
| 두 조건이 모두 참 | 경고 표시 |
| 그 외 | 경고 제거 |

출생년도와 경고가 **하나의 새 상태 객체로 함께 반환**돼요. 여러 관련 속성을 일관된 규칙으로 바꾸는 부분이 reducer의 장점을 보여줍니다. useState로도 같은 처리는 가능합니다.

case 뒤의 중괄호는 const age를 위한 독립된 블록이에요. case만으로는 블록 범위가 생기지 않아 ESLint의 no-case-declarations 규칙에 걸렸던 거예요.

이 계산은 생일을 고려하지 않는 연도 차이예요. 정확한 만 나이를 판단하려면 월·일까지 필요합니다.

### RESET과 default

```tsx
case "RESET":
  return initUser;
default:
  return user;
```

RESET은 초기 객체를 다음 상태로 반환해요. 원본과 초기 객체를 직접 변경하지 않는다는 전제에서 사용할 수 있어요.

default는 처리하지 않는 action에 대해 기존 상태를 반환합니다. TypeScript 타입이 잘 정의된 현재 호출에서는 정해진 action을 사용하게 돼요. 설계에 따라 알 수 없는 요청에 오류를 던지는 방식도 있어요.

---

## 8. 실제 숫자로 따라가기

현재 연도가 **2026년인 경우의 예시**예요.

| 단계 | action | 다음 상태 |
| :--- | :--- | :--- |
| 첫 화면 | 없음 | name: "", year: 0, warning: "" |
| Alice 입력 | SET_NAME, name: "Alice" | name: "Alice", year: 0, warning: "" |
| 2010 입력 | SET_YEAR, year: 2010 | year: 2010, 경고 있음 — 연도 차이 16 |
| 2000으로 변경 | SET_YEAR, year: 2000 | year: 2000, 경고 없음 — 연도 차이 26 |
| Reset | RESET | 이름·년도·경고 초기화 |

년도 변경 요청에는 name이 없지만, reducer의 ...user가 기존 이름을 유지해요.

---

## 9. useState와 비교하면 얻는 효과

| 비교 | 기존 useState 방식 | 현재 useReducer 방식 |
| :--- | :--- | :--- |
| 입력 이벤트 | 이벤트 함수 안에서 변경 규칙까지 처리 | action을 만들어 전달 |
| 다음 상태 계산 | setUser에 전달할 객체/함수에서 계산 | reducer에 모음 |
| 초기화 | 초기화 함수에서 값 지정 | RESET 분기에서 처리 |
| 관련 속성 변경 | 여러 이벤트에 흩어질 수 있음 | 변경 종류별로 한곳에서 확인 |
| 규칙 확인 | 이벤트 코드와 함께 읽음 | reducer만 읽어도 변경 규칙 파악 가능 |
| 테스트 | UI와 로직이 섞이기 쉬움 | 상태와 action으로 반환값 확인 가능 |
| 코드 양 | 작은 폼에서는 짧음 | action 타입과 분기가 추가됨 |

**지금 얻는 주된 효과는 성능 향상이 아니라 변경 로직의 정리예요.**

useReducer 자체가 재렌더링을 줄이거나, 계산 결과를 캐시하거나, state를 전역으로 만드는 것은 아니에요. 서로 다른 컴포넌트에서 각각 useReducer를 호출하면 각각 별도 상태를 가집니다.

---

## 10. 어떤 경우에 쓰면 좋은가?

### useState로 충분한 경우

- 모달 열기/닫기.
- 독립된 입력값 한두 개.
- 간단한 카운터.
- 변경 규칙이 짧고 분명한 작은 컴포넌트.

### useReducer가 도움이 되는 경우

- 여러 필드가 연관되어 함께 바뀌는 폼.
- 추가·수정·삭제·완료 등 변경 종류가 많은 목록.
- 다음·이전·답변 변경·초기화가 있는 다단계 설문.
- 요청 시작·성공·실패처럼 상태 전환을 명확하게 관리하고 싶을 때.
- 이벤트마다 흩어진 변경 규칙을 한곳에 모으고 싶을 때.

여행 스타일 테스트라면 SELECT_ANSWER, NEXT, PREVIOUS, RESET 같은 요청으로 정리할 수 있어요. 처음부터 반드시 도입해야 하는 것은 아닙니다.

**상태가 몇 개 이상이면 반드시 useReducer라는 기준은 없어요. 변경 규칙의 복잡성과 읽기 쉬운 구조를 보고 선택해요.**

---

## 11. 자주 헷갈리는 질문

### dispatch를 하면 user가 바로 바뀌나?

현재 실행 중인 이벤트 함수의 user 변수는 그 렌더링의 값이에요. dispatch 다음 줄에서 읽어도 즉시 새 값으로 바뀌지는 않아요. 새 상태는 다음 렌더링에서 읽습니다.

### reducer에서 setUser를 호출하나?

아니요. **새 상태를 return**해요. React가 그 반환값을 다음 상태로 처리합니다.

### reducer를 useEffect에서 실행해야 하나?

아니요. 훅에 reducer를 전달해두고 이벤트에서 dispatch하면 됩니다. 화면 표시를 위해 effect로 중간 상태를 다시 만드는 과정은 필요 없어요.

### useReducer가 useMemo처럼 계산을 줄이나?

아니요. useMemo는 계산 결과 재사용, useReducer는 상태 변경 규칙 관리예요.

### reducer는 왜 user를 복사하나?

기존 상태를 직접 수정하지 않고 다음 상태를 만들어 반환하기 위해서예요. ...user 뒤의 같은 속성이 이전 값을 덮어씁니다.

### 함수 이름에 Reducer가 있어야 하나?

꼭 그렇지는 않아요. 이름은 개발자가 정하지만 역할이 드러나는 이름을 사용합니다. 지금 대문자로 시작하는 UserReducer도 JSX 컴포넌트가 아니라 reducer로 전달하는 일반 함수예요.

---

## 12. 현재 코드에서 알아두면 좋은 차이와 한계

### 이전 예제와 완전히 같은 동작은 아님

- useState 예제는 이름 저장 시 소문자로 변환했어요.
- 현재 reducer는 trim만 하고, 아래 JSX의 name.toLowerCase()가 표시할 때만 소문자로 바꿔요.
- 따라서 대문자를 입력하면 input의 상태 값과 아래 출력 글자가 다를 수 있어요.
- 기존 useState의 미래 연도 차단 alert는 현재 reducer 예제에 옮겨져 있지 않아요. 미래 연도가 들어오면 현재 규칙에서는 나이가 음수가 되어 경고가 나옵니다.
- 이 차이는 훅의 기능 차이가 아니라 작성한 변경 규칙의 차이예요.

### reducer는 순수한 계산 함수로 두기

동일한 상태와 action에는 동일한 결과를 반환하도록 설계하는 것이 원칙이에요.
네트워크 요청, alert, DOM 조작, 원본 객체 수정은 reducer 밖에서 처리하세요.

현재 reducer는 new Date().getFullYear()로 현재 시간을 읽어요. 수업 예제로는 이해하기 쉽지만, 같은 입력도 해가 바뀌면 결과가 달라져 엄밀히는 결정적인 계산이 아니에요.
시간까지 정확하게 통제하고 테스트하려면 현재 연도를 action 등에 명시적으로 전달해 계산하도록 개선할 수 있어요. 이 문서는 현재 구현을 설명하며 소스를 바꾸지는 않았습니다.

개발 환경의 Strict Mode에서는 순수성 확인을 위해 reducer가 추가로 호출될 수 있어요. 실제 변경이 두 번 적용되도록 부수 효과를 넣으면 안 됩니다.

### 입력 처리 시 주의

매 입력마다 trim을 하면 이름 끝에 공백을 입력하려고 해도 바로 제거돼요. 띄어쓰기가 필요한 이름을 자연스럽게 편집하려면 저장/검증 시점에 정리하는 설계도 생각해볼 수 있어요.

warning은 year와 기준 연도로 다시 계산할 수도 있는 값이에요. 이번 예제는 관련 필드를 reducer에서 함께 갱신하는 연습이지만, 모든 계산 결과를 별도 state에 저장해야 한다는 뜻은 아니에요.

---

## 13. 스스로 설명해보는 체크리스트

- [ ] useReducer와 UserReducer의 차이를 말할 수 있다.
- [ ] user와 action은 누가 reducer에 전달하는지 설명할 수 있다.
- [ ] 이름을 입력한 뒤 화면이 바뀌는 과정을 순서대로 말할 수 있다.
- [ ] SET_YEAR의 action에 name이 아니라 year를 넣는 이유를 안다.
- [ ] reducer가 return해야 하는 값이 무엇인지 안다.
- [ ] ...user를 생략하면 어떤 속성이 사라지는지 설명할 수 있다.
- [ ] useReducer가 성능 최적화 훅이나 자동 전역 상태가 아닌 이유를 안다.
- [ ] 이전 useState 예제와 현재 이름 표시 방식의 차이를 안다.

<details>
<summary>빠른 답 확인</summary>

1. React 훅과 개발자가 작성한 변경 규칙 함수입니다.
2. React가 직전 상태와 dispatch로 전달한 action을 넣습니다.
3. 입력 → 이벤트 → dispatch → reducer → 새 상태 → 렌더링입니다.
4. UserAction의 SET_YEAR가 year 숫자를 받도록 정의되어 있습니다.
5. 다음 UserType 상태 전체를 반환해야 합니다.
6. 이름만 반환하면 year와 warning이 유지되지 않습니다.
7. 상태 관리 구조를 바꾸는 기능이며, 캐시나 전역 공유를 자동 제공하지 않습니다.
8. 현재 reducer는 원래 대소문자로 저장하고 JSX에서 소문자로 표시합니다.

</details>

---

> **기억할 문장:** 컴포넌트는 “무슨 일이 일어났는지” 보내고, reducer는 “상태를 어떻게 바꿀지” 결정한다.

