# React 복습 노트 · TodoApp
> **2026.09.14** · 직접 만든 일정관리 앱에서 질문하고 확인한 개념  
> 읽는 순서: **핵심 요약 → 필터 흐름 → 헷갈린 질문 → 확인 문제**

VS Code에서 이 파일을 열고 **Cmd + Shift + V**를 누르면 Markdown 미리보기로 읽을 수 있어요. 코드 블록, 표, 구분선이 정리되어 표시됩니다.

---

## 1. 오늘 꼭 기억할 다섯 가지

| 개념 | 기억할 문장 |
| :--- | :--- |
| state | 화면에 필요한 값을 React가 기억한다. setter를 호출하면 업데이트를 요청한다. |
| 함수형 업데이트 | `setTodos(prev => ...)`의 `prev`는 React가 전달하는 직전 상태다. |
| props | 값뿐 아니라 함수도 부모에서 자식으로 전달할 수 있다. |
| 필터 | 원본 목록과 선택 조건은 저장하고, 표시할 목록은 계산한다. |
| 렌더링 | 화면 계산 중에는 상태를 변경하지 않는다. 이벤트와 조회를 구분한다. |

## 2. 앱의 역할 지도

| 파일 | 담당하는 일 | 관련 데이터 |
| :--- | :--- | :--- |
| App.tsx | 원본 목록과 선택 조건 관리, 추가·삭제·완료 변경 | `todos`, `valueState` |
| TodoTemplate.tsx | 제목과 본문 배치 | `children` |
| TodoHeader.tsx | 전체·완료·미완료 선택을 부모에게 알림 | `onFilterChange` |
| TodoInsert.tsx | 입력 중인 제목·중요 여부 관리, 제출 | `form`, `onInsert` |
| TodoList.tsx | 전달받은 배열을 반복해서 표시 | `todos.map(...)` |
| TodoListItem.tsx | 항목 하나 표시, 해당 id로 이벤트 전달 | `todo`, `onToggle`, `onDelete` |

**부모는 데이터를 관리하고, 자식은 사용자 행동을 함수 호출로 알린다.**

---

## 3. 가장 많이 고민한 주제: 필터

### 3-1. 저장할 값과 계산할 값

| 구분 | 예 | 별도 state가 필요한가? |
| :--- | :--- | :--- |
| 원본 데이터 | 전체 할 일 `todos` | 필요 |
| 사용자의 선택 | `true`, `false`, `null` | 필요 |
| 위 두 값으로 구할 수 있는 결과 | 필터링한 배열 | 보통 불필요 |

`null`은 이 앱에서 정한 **전체** 표시 값이에요. JavaScript가 자동으로 전체라는 뜻을 부여하는 것은 아닙니다.

### 3-2. 처음 방식에서 추가 항목이 안 보였던 이유

원본 `todos`와 표시용 `filteredTodos`를 각각 state로 저장했어요.

1. 필터 선택 시 원본을 걸러 `filteredTodos`에 저장.
2. 새 항목 추가 시 `todos`만 변경.
3. 화면은 이전 `filteredTodos`를 계속 표시.

두 state는 자동으로 연결되지 않아요. `useState(initialTodos)`도 최초 초기화에 쓰일 뿐, 다른 state가 바뀔 때 재설정되지 않아요.

> 같은 문제는 추가뿐 아니라 삭제와 완료 변경에서도 생길 수 있어요.

### 3-3. 현재 권장 구조

```tsx
const [valueState, setValueState] = useState<boolean | null>(null);

const getTodosByCompleted = (completed: boolean | null) => {
  return completed === null
    ? todos
    : todos.filter((todo) => todo.completed === completed);
};
```

```tsx
<TodoHeader onFilterChange={setValueState} />

<TodoList
  todos={getTodosByCompleted(valueState)}
  onDelete={onDelete}
  onToggle={onToggle}
/>
```

위 예시는 개념 설명용이며, 소스 파일을 수정한 것은 아니에요.

**동작 순서**

1. Header에서 ‘완료’를 선택한다.
2. `onFilterChange(true)`가 실제 `setValueState(true)`를 호출한다.
3. App이 다시 렌더링된다.
4. `getTodosByCompleted(valueState)`가 최신 목록에서 완료 항목을 고른다.
5. TodoList가 반환된 배열을 표시한다.

추가로 `todos`가 바뀌어도 App이 다시 렌더링되므로 같은 조건으로 새 배열이 계산돼요.

### 3-4. 내가 자주 물었던 질문

**“새 할 일은 맨 아래에 넣기만 하면 안 되나?”**

원본 배열에는 그렇게 추가해요. 하지만 표시할 때는 조건을 확인해야 해요. 미완료 항목을 새로 만들었다면 ‘전체’와 ‘미완료’에서는 보이고 ‘완료’에서는 숨겨야 해요.

`filter()`로 배열을 다시 계산하는 것과 화면 전체 DOM을 지우고 다시 만드는 것은 달라요.

**“getTodosByCompleted와 onFilterChange는 같은 함수 아닌가?”**

| 이름 | 역할 | 반환값을 사용하는가? |
| :--- | :--- | :--- |
| onFilterChange | 선택한 조건을 저장하도록 알림 | 아니요 |
| getTodosByCompleted | 조건에 맞는 배열 반환 | 네, TodoList에 전달 |

**“강사님은 completed를 매개변수로 받았는데?”**

그대로 받아도 돼요. 선택을 기억하는 state와 조회 함수의 매개변수는 다른 역할이에요. 호출할 때 `valueState`를 전달하면 함수 안에서 `completed`라는 이름으로 받아요.

**“조회 함수 안에서 setValueState까지 하면 안 되나?”**

이 앱에서는 분리하는 것이 좋아요. JSX에서 그 함수를 호출하면 렌더링 중 상태 변경까지 발생해 반복 렌더링을 일으킬 수 있어요. 조회 함수는 배열만 계산하고, setter는 선택 이벤트에서 호출하세요.

### 3-5. 별도 이벤트 함수 vs setter 직접 전달

| 방식 | 적합한 상황 |
| :--- | :--- |
| `onFilterChange={setValueState}` | 조건 저장만 하면 될 때 |
| 별도 `handleFilterChange` 전달 | 조건 저장 + 페이지 초기화 + 선택 해제 등 여러 처리가 필요할 때 |

둘 다 올바른 방식이에요. **필터 결과 배열을 별도 state에 저장하는 문제와는 구분**하세요.

### 3-6. 전체를 선택해도 빈 목록이 된 이유

```tsx
if (completed === null) {
  setFilteredTodos(todos);
}
// 아래까지 계속 실행되면 전체 결과를 빈 배열로 덮어쓸 수 있음
```

전체 처리 후 `return`으로 끝내거나 `else`로 나누어야 해요. 다만 현재의 ‘조건 저장 + 결과 계산’ 구조라면 표시 배열을 저장할 setter 자체가 필요 없어요.

---

## 4. 문자열을 boolean으로 바꾸는 방법

`select`의 `e.target.value`는 문자열이에요.

| 선택 | 문자열 | 부모에게 전달할 조건 |
| :--- | :--- | :--- |
| 전체 | `""` | `null` |
| 완료 | `"true"` | `true` |
| 미완료 | `"false"` | `false` |

```tsx
const value = e.target.value;
onFilterChange(value === "" ? null : value === "true");
```

- `===`는 값을 변경하지 않고 **타입 변환 없이 같은지 비교**해요.
- `value === "true"`는 선택된 문자열 하나를 비교하는 것이지, 모든 할 일을 완료로 바꾸는 코드가 아니에요.
- `Boolean("false")`는 `true`예요. 비어 있지 않은 문자열이기 때문이에요.
- `Boolean.parseBoolean()`은 Java의 메서드이며 JavaScript에는 없어요.

---

## 5. setTodos의 prevTodos는 어디서 오는가?

```tsx
setTodos((prevTodos) =>
  prevTodos.map((todo) =>
    todo.id === id
      ? { ...todo, completed: !todo.completed, lastModifiedDate: new Date() }
      : todo
  )
);
```

`prevTodos`는 **React가 업데이트 함수에 전달하는 직전 상태 배열**이에요. 이름은 바꿔도 돼요. 화살표 함수의 매개변수로 이미 선언된 거예요.

1. React가 현재 보관하는 상태를 함수에 전달한다.
2. 함수가 새 배열을 반환한다.
3. React가 그 배열을 다음 상태로 사용한다.
4. 다음 업데이트 함수에는 앞선 변경이 반영된 상태가 전달된다.

**주의:** 같은 이벤트 안에서 setter를 호출해도 현재 실행 중인 함수의 state 변수가 즉시 바뀌지는 않아요.

업데이트 함수는 계산만 하도록 두세요. id 증가, 네트워크 요청 같은 별도 동작을 넣지 않는 편이 좋아요.

---

## 6. 배열 변경과 객체 복사

| 목적 | 방법 | 결과 |
| :--- | :--- | :--- |
| 추가 | `[...todos, newTodo]` | 기존 순서 뒤에 새 항목 |
| 수정·토글 | `todos.map(...)` | 대상 자리만 새 객체로 교체 |
| 삭제 | `todos.filter(...)` | 조건에 맞는 항목만 남김 |
| 객체 일부 수정 | `{ ...todo, completed: false }` | 다른 속성 유지, 지정 속성 덮어쓰기 |

`map()`은 기존 순서대로 결과를 만들어요. 특정 객체를 교체해도 항목 순서가 바뀌지 않아요.

### 생성 날짜와 수정 날짜

```tsx
const now = new Date();
```

추가할 때는 `createDate`와 `lastModifiedDate`에 같은 `now`를 넣어요.
수정할 때는 생성 날짜를 유지하고 마지막 수정 날짜만 갱신해요.
`Date`에는 날짜뿐 아니라 시각도 포함됩니다.

---

## 7. form 하나로 제목과 체크박스 관리하기

```tsx
const [form, setForm] = useState({
  title: "",
  important: false,
});
```

```tsx
const { name, value, type, checked } = e.target;

setForm({
  ...form,
  [name]: type === "checkbox" ? checked : value,
});
```

| 표현 | 의미 |
| :--- | :--- |
| `...form` | 기존 속성 복사 |
| `[name]` | name 변수의 값을 객체 속성 이름으로 사용 |
| `checked` | 체크 여부인 boolean |
| `value` | 입력한 문자열 |

`name="title"`인 입력은 제목을, `name="important"`인 체크박스는 중요 여부를 바꿔요.
객체 안의 `[name]`은 배열 선언이 아니라 **계산된 속성 이름**이에요.

### Enter로 추가하기

입력과 Add 버튼을 `form`으로 묶고, 추가 처리를 `onSubmit` 한 곳에서 실행해요.
버튼은 `type="submit"`으로 지정합니다.

제출 처리 순서: **preventDefault → 빈 입력 검사 → 부모 추가 함수 호출 → 입력 초기화**

`action`이 필요 없는 이유는 로컬 파일 때문이 아니라, 기본 서버 제출 대신 React 상태로 처리하기 때문이에요.

### 빈 문자열과 공백

- `""`: 길이 0
- `"   "`: 스페이스 3개
- `text.trim() === ""`: 두 경우 모두 확인

`trim()`은 새 문자열을 반환해요. 원래 state를 자동으로 바꾸지는 않아요.

---

## 8. 함수 props와 TypeScript

```tsx
onFilterChange: (completed: boolean | null) => void;
```

| 부분 | 뜻 |
| :--- | :--- |
| onFilterChange | props 이름 |
| completed | 호출할 때 전달받을 매개변수 이름 |
| boolean \| null | true, false, null 허용 |
| void | 호출한 반환값을 사용하지 않는 계약 |

`setValueState`도 함수이므로 props로 전달할 수 있어요.
실제 setter는 이전 상태를 받아 계산하는 함수도 받지만, Header가 선택값만 보낸다면 위처럼 좁은 타입으로 표현해도 충분해요.

### 함수 전달과 호출 구분

| 코드 | 의미 |
| :--- | :--- |
| `onClick={onSave}` | 클릭할 때 호출할 함수 전달 |
| `onClick={() => onToggle(id)}` | 클릭할 때 id를 넣어 호출 |
| `onClick={onToggle(id)}` | 렌더링 중 즉시 실행하므로 여기서는 잘못된 연결 |
| `todos={getTodosByCompleted(valueState)}` | 순수 조회 함수를 실행해 배열 전달 |

**괄호 유무만 외우기보다, props가 함수와 배열 중 무엇을 요구하는지 확인하세요.**

### 공통 props 타입 확장

`TodosProps`에 `onToggle: (id: number) => void`를 추가하면,
`Omit<TodosProps, "todos">`로 만든 항목 props에도 함수 타입이 포함돼요.

`children: ReactNode`는 컴포넌트, 글자 등 React가 렌더링할 수 있는 내용을 받는 타입이에요.
타입 지정은 CSS 배치를 바꾸지는 않아요.

---

## 9. 완료 체크가 일부 항목에서만 바뀐 이유

부모의 `completed`와 자식의 `isCompleted`를 동시에 사용하면서 표시 기준이 섞였어요.

`useState(completed)`는 처음 값을 넣는 것이지, 부모 props와 자동 동기화하는 연결이 아니에요.
부모에서 `onToggle`로 완료 여부를 바꾸기로 했다면 아이콘도 부모의 `completed`를 기준으로 정하세요.

> **한 가지 완료 상태의 기준은 한 곳에 둔다.**

입력 중인 내용을 Save 전까지 보관하는 ‘임시 입력 state’는 별도 목적이 있으므로 이와 구분해요.

---

## 10. 편집 UI와 코드 가독성

- `isEditing`: input/일반 글자, Save/Edit 중 무엇을 보여줄지 결정.
- `listText`: 아직 저장하지 않은 입력 내용.
- Edit: 편집 시작. 빈 입력을 원한다면 입력 state만 비우기.
- Save: 새 내용을 부모에 전달한 다음 편집 종료.
- `value=""`로 고정하면 입력할 수 없으니, `value`는 입력 state에 연결.
- `autoFocus`는 입력 포커스를 주는 속성이지 내용을 지우는 기능이 아님.

Save/Edit는 공통 버튼 하나에 문구와 함수를 조건부로 연결할 수 있어요.

```tsx
onClick={isEditing ? onSave : startEditing}
```

긴 이벤트 처리는 이름 붙인 함수로 꺼내면 JSX에서 화면 구조를 읽기 쉬워져요.

**포맷 설정:** 오늘 VS Code 사용자 설정을 저장 시 자동 포맷 켜기, Prettier 줄 너비 90으로 정리했어요.
90은 포맷의 기준이며 엄격한 최대 길이가 아니에요. 삼항연산자의 정확한 배치는 포매터 규칙에 따라 달라질 수 있어요.

---

## 11. useRef와 자동 스크롤

| 질문 | 답 |
| :--- | :--- |
| current는 왜 붙이나? | ref 객체가 보관하는 값에 접근하는 속성이기 때문 |
| bottomRef.current에는 무엇이 있나? | ref로 연결된 실제 DOM 요소 |
| previousCountRef.current에는? | 이전 할 일 개수 |
| ref 변경도 재렌더링하나? | 아니요 |
| 빈 div는 가상인가? | 실제 DOM 요소이며 스크롤 도착 지점 |
| aria-hidden은 화면을 숨기나? | 아니요. 보조 기술에 의미 없는 요소임을 표시 |

`setTodos` 직후에는 새 항목의 DOM이 아직 반영되지 않았을 수 있어요.
렌더링 후 effect에서 개수 증가 여부를 확인해 `scrollIntoView()`를 호출해요.

- `behavior: "smooth"`: 부드러운 이동
- `block: "end"`: 요소 끝을 스크롤 영역의 아래쪽에 맞춤
- `?.`: 아직 요소가 없으면 호출 생략

필터에 가려진 항목은 추가돼도 화면에 표시되지 않을 수 있어요. ‘데이터 추가’와 ‘표시 항목 증가’는 구분해야 해요.

---

## 12. 화면이 안 나올 때 확인 순서

1. **실행 오류:** 초기값 없는 `form`을 객체 분해하고 있지 않은가?
2. **선언:** JSX에서 사용하는 변수와 아이콘이 정의돼 있는가?
3. **연결:** 컴포넌트가 주석 처리되거나 props 전달이 빠지지 않았는가?
4. **타입:** 배열을 받는 곳에 함수·객체를 전달하지 않았는가?
5. **이벤트:** `onChange=""`처럼 문자열을 넣거나 함수를 즉시 호출하지 않았는가?
6. **표시 기준:** 원본 state와 복사한 state가 어긋나지 않았는가?
7. **레이아웃:** children이 제목용 색상·글자 크기를 상속하는 영역에 들어가 있지 않은가?

컴파일 오류, 실행 오류, CSS 배치 문제는 원인이 달라요. 화면이 이상하다는 이유만으로 children 타입이 원인이라고 단정하지 마세요.

### 다크모드 아이디어

부모에서 배경과 글자색을 바꿔도 자식의 명시적인 배경색까지 자동으로 바뀌지는 않아요.
부모의 하위 선택자로 덮어쓰는 방법도 있지만 자식 클래스에 의존하게 됩니다.
일반적으로 각 요소의 다크 스타일을 정의하고 상위에서 모드를 전환하는 방식이 관리하기 쉬워요.

---

## 13. 직접 답해보는 확인 문제

- [ ] `prevTodos`는 누가 전달하는 값인가?
- [ ] `setValueState`를 호출한 다음 줄에서 state가 바로 바뀌는가?
- [ ] `"false"`와 `false`의 차이를 설명할 수 있는가?
- [ ] `onFilterChange`와 `getTodosByCompleted`의 역할 차이는?
- [ ] `filteredTodos`를 별도 state로 저장하면 어떤 동기화 문제가 생기는가?
- [ ] 미완료 항목을 추가했는데 완료 필터에서 안 보이는 것은 오류인가?
- [ ] `[name]`과 `...form`은 각각 무엇을 하는가?
- [ ] 부모의 completed를 쓰면서 자식에 복사한 상태가 왜 필요 없을 수 있는가?

<details>
<summary>답 확인하기</summary>

1. React가 업데이트 함수에 직전 상태를 전달합니다.
2. 아닙니다. 현재 실행 중인 코드에서는 기존 렌더링의 값을 읽습니다.
3. 앞은 문자열, 뒤는 boolean입니다. 비어 있지 않은 문자열을 Boolean으로 변환하면 true입니다.
4. 앞은 조건 변경 알림, 뒤는 배열 조회입니다.
5. 원본의 추가·삭제·변경이 표시 배열에 자동 반영되지 않을 수 있습니다.
6. 아닙니다. 필터 조건에 맞지 않으므로 숨겨지는 것이 정상입니다.
7. 변수 값을 속성 이름으로 사용하고, 기존 객체 속성을 복사합니다.
8. 같은 정보를 두 곳에서 관리하면 서로 달라질 수 있기 때문입니다.

</details>

## 14. 문서 작성 시점의 코드에서 별도로 확인할 점

아래는 복습 중 발견한 점이며 **앱 소스는 수정하지 않았습니다.**

- TodoHeader.tsx의 옵션 배열 시작 부분에 `[A`가 보여요. 의도치 않은 `A`라면 제거해야 하는 문법 오류입니다.
- App.tsx의 조회 함수는 매개변수로 `completed`를 받지만 전체 여부를 `valueState === null`로 검사하고 있어요. 지금처럼 같은 값을 전달할 때는 결과가 같지만, 함수가 받은 조건에 일관되게 의존하도록 `completed === null`로 비교하는 편이 명확합니다.

---

**복습의 중심 문장:** 사용자의 선택은 기억하고, 그 선택으로 구할 수 있는 화면 데이터는 계산한다.

