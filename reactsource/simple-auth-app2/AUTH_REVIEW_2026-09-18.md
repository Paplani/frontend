# Redux 로그인 앱 복습

> **2026.09.18 · simple-auth-app2에서 질문한 내용과 연결 개념**  
> VS Code에서 **Cmd + Shift + V**로 미리보기를 열어보세요.  
> 이어서 읽기: [Redux 정리](../react06-redux-toolkit/REDUX_GUIDE.md) · [오늘 게시판 복습](../simple-board-app/BOARD_REVIEW_2026-09-18.md)

| 표시 | 의미 |
| :--- | :--- |
| 🟦 핵심 | 먼저 이해할 개념 |
| 🟨 질문 | 오늘 질문과 그 배경 |
| 🟩 답변 | 코드와 연결한 설명 |
| 🟥 주의 | 비슷해 보여도 다른 역할 |

오늘 이 프로젝트에서는 **“현재 문제가 무엇인지”** 확인했습니다. 당시 TypeScript와 ESLint 검사는 통과했고, Redux의 로그인 연결도 맞았습니다. 아래는 그 구조를 이해하기 위한 복습입니다. 앱 코드는 수정하지 않았습니다.

---

## 1. 함수 이름보다 입력·동작·결과 보기

> 🟦 **함수를 볼 때는 “누가 호출하는가 → 무엇을 받는가 → 무엇을 하는가 → 무엇을 반환하는가” 순서로 읽으세요.**

함수는 실행 가능한 코드이고, 객체의 속성으로 들어 있는 함수는 보통 메서드라고 부릅니다. React Hook은 React의 규칙에 따라 호출하는 함수입니다. 모두 같은 역할은 아닙니다.

```tsx
const dispatch = useAppDispatch();
const action = login({ id: "hong", password: "1234" });
dispatch(action);
```

| 코드 | 받은 것 | 결과·역할 |
| :--- | :--- | :--- |
| `useAppDispatch()` | 없음 | Provider의 store에 요청할 dispatch 함수를 반환 |
| `login({ id, password })` | 객체 하나 | 로그인 액션 객체 생성 |
| `dispatch(action)` | 액션 객체 | store에 액션 전달, reducer를 통한 상태 갱신 |

**login 함수 이름이 같아도 구현에 따라 역할이 다릅니다.**

| 이전 Context 예제 | 현재 Redux 예제 |
| :--- | :--- |
| `login(id, password)` | `dispatch(login({ id, password }))` |
| Provider에서 직접 만든 상태 변경 함수 | slice에서 생성한 액션 생성 함수 |
| 문자열 인자 두 개 | 객체 인자 하나 |

현재 login을 호출하기만 하면 요청 객체가 만들어집니다. store를 바꾸려면 dispatch까지 해야 합니다.

---

## 2. 파일 연결 지도

```text
authSlice.ts
  createSlice: 초기 상태 + login/logout 규칙
  ├─ reducer ─────────→ store.ts의 configureStore
  │                       ├─ store ──→ main.tsx의 Provider
  │                       └─ 타입 ───→ hooks.ts
  └─ login/logout ───────────────────→ 각 화면의 이벤트

main.tsx
  Provider → BrowserRouter → App
                              ├─ Navigation
                              ├─ LoginForm
                              ├─ Signup
                              └─ ProtectedRouter → MyPage

각 화면
  useAppSelector → 상태 읽기
  useAppDispatch → dispatch 함수 가져오기
  이벤트 → dispatch(login(...)) 또는 dispatch(logout())
```

| 파일 | 핵심 함수·요소 | 담당 역할 |
| :--- | :--- | :--- |
| [authSlice.ts](src/authSlice.ts) | createSlice, login, logout | 상태 모양과 변경 규칙 |
| [store.ts](src/store.ts) | configureStore | auth 키에 reducer 등록 |
| [hooks.ts](src/hooks.ts) | useAppSelector, useAppDispatch | store 타입을 적용한 Hook |
| [main.tsx](src/main.tsx) | Provider, BrowserRouter | Redux와 라우터 기능 제공 |
| [LoginForm.tsx](src/components/LoginForm.tsx) | handleChange, handleLogin | 입력 관리, 로그인 요청, 이동 |
| [Navigation.tsx](src/components/Navigation.tsx) | selector, dispatch, navigate | 상태별 메뉴 표시와 로그아웃 |
| [ProtectedRouter.tsx](src/common/ProtectedRouter.tsx) | Navigate, Outlet | 비로그인 사용자의 보호 화면 접근 제한 |
| [MyPage.tsx](src/components/MyPage.tsx) | selector, logout | 사용자 표시와 로그아웃 |
| [Signup.tsx](src/components/Signup.tsx) | handleSignup | 빈 입력 검사 후 로그인 화면 이동 |

---

## 3. form과 auth를 구분하기

```tsx
const [form, setForm] = useState<LoginFormState>({
  id: "",
  password: "",
});

const auth = useAppSelector((state) => state.auth);
```

| 값 | 의미 | 바뀌는 순간 |
| :--- | :--- | :--- |
| form | 지금 입력창에서 편집 중인 값 | onChange에서 setForm 호출 |
| auth | Redux에 반영된 로그인 정보 | login/logout 액션 dispatch |

```text
타이핑 → handleChange → setForm → 입력 화면 갱신
제출   → handleLogin → dispatch(login(form)) → Redux 상태 갱신
```

타이핑만으로 로그인되는 것은 아닙니다. 또한 현재 login 규칙은 id/password를 저장할 뿐, 계정의 일치 여부를 서버에서 검증하지 않습니다.

### handleChange의 각 표현

```tsx
const { name, value } = e.target;
setForm({ ...form, [name]: value });
```

- `e.target`: 값이 바뀐 input.
- `name`: input의 `name="id"` 또는 `name="password"`.
- `value`: 입력한 문자열.
- `...form`: 나머지 필드를 유지.
- `[name]`: name 변수의 값으로 객체의 속성 이름을 결정.

`[name]` 대신 `name: value`를 쓰면 id/password가 아니라 이름이 name인 속성을 만들게 됩니다.

---

## 4. 제출 함수에서 일어나는 일

```tsx
const handleLogin = (e: React.SubmitEvent) => {
  e.preventDefault();

  if (!id.trim() || !password.trim()) {
    alert("아이디나 비밀번호를 확인해주세요");
    return;
  }

  dispatch(login({ id, password }));
  navigate("/mypage");
};
```

| 표현 | 사용법과 효과 |
| :--- | :--- |
| `e.preventDefault()` | 브라우저의 기본 폼 제출 동작 취소 |
| `id.trim()` | 양끝 공백을 제거한 새 문자열 반환. 원래 id 자체를 변경하지 않음 |
| `!id.trim()` | 빈 문자열인지 검사 |
| `return` | 이 이벤트 함수 실행 종료. 뒤의 dispatch와 navigate를 실행하지 않음 |
| `login({ id, password })` | payload가 로그인 정보인 액션 생성 |
| `dispatch(...)` | 액션을 store에 전달 |
| `navigate("/mypage")` | 라우터의 현재 주소 변경 |

> 🟨 **Q. login을 하면 자동으로 페이지가 바뀌나요?**
>
> 🟩 **A. 아닙니다. 상태 변경과 페이지 이동은 별도입니다.** 이 코드에서는 두 함수를 순서대로 호출합니다.

---

## 5. useNavigate, Navigate, Link 구분

| 표현 | 언제 쓰나? | 예 |
| :--- | :--- | :--- |
| `useNavigate()` | 이동 함수를 준비할 때, 컴포넌트 최상위 | `const navigate = useNavigate()` |
| `navigate("/")` | 이벤트 처리 후 이동 | 로그아웃 후 홈 이동 |
| `<Navigate to="/login" replace />` | 렌더링 조건에 따라 다른 주소로 보낼 때 | 비로그인 접근 차단 |
| `<Link to="/login">` | 사용자가 누를 이동 링크 | 로그인 메뉴 |
| `<Outlet />` | 일치하는 자식 Route 화면 표시 | 보호 조건을 통과한 MyPage |

```tsx
const auth = useAppSelector((state) => state.auth);
if (!auth.id) return <Navigate to="/login" replace />;
return <Outlet />;
```

id가 빈 문자열이면 비로그인으로 판단합니다. `replace`는 현재 방문 기록을 이동할 주소로 대체합니다.

> 🟥 **Hook은 이벤트 안에서 호출하지 않습니다.** `useNavigate()`로 함수를 준비하고 이벤트에서는 `navigate()`를 호출하세요. useAppDispatch와 dispatch도 같은 구분입니다.

---

## 6. 오늘 “문제가 있나?” 확인했던 결과

> 🟨 **Q. 현재 앱의 Redux 연결이 잘못되었나요?**
>
> 🟩 **A. 당시 검사에서 TypeScript와 ESLint 오류는 없었고, login → 상태 변경 → 페이지 이동 연결도 맞았습니다.** 정적 검사가 통과했다는 것이 브라우저의 모든 동작까지 검증했다는 뜻은 아닙니다.

| 현상 | 이유 |
| :--- | :--- |
| 새로고침 후 로그인 해제 | Redux 메모리 상태가 초기화됨. 별도 유지 기능 없음 |
| 회원가입한 계정과 비교하지 않음 | Signup은 화면 이동만 하는 현재 연습 범위 |
| 회원가입 후 로그인 페이지 표시 | handleSignup에서 navigate('/login') 실행 |
| 화면에 Context 설명이 보임 | 이전 프로젝트의 설명 문구가 남음. 상태 구현은 Redux |

**오류, 미구현 기능, 예제의 의도된 범위를 구분**하면 어디를 수정해야 하는지 판단하기 쉬워집니다.

---

## 7. 코드를 읽는 연습

다음 코드를 스스로 한 줄씩 말해보세요.

```tsx
onClick={() => {
  dispatch(logout());
  navigate("/");
}}
```

<details>
<summary>🟩 해설 보기</summary>

1. 렌더링 중 로그아웃하는 것이 아니라 클릭할 때 실행할 함수를 전달한다.
2. 클릭하면 logout()으로 로그아웃 액션 객체를 만든다.
3. dispatch가 액션을 보내면 reducer가 id/password를 빈 값으로 바꾼다.
4. navigate로 홈 주소로 이동한다.
5. auth를 읽는 메뉴도 새 상태를 반영한다.

</details>

### 복습 체크리스트

- [ ] 함수 선언, 함수 전달, 함수 호출을 구분할 수 있다.
- [ ] Context의 login과 Redux 액션 생성 함수 login의 차이를 설명할 수 있다.
- [ ] form과 auth가 언제 갱신되는지 말할 수 있다.
- [ ] Provider, selector, dispatch, reducer의 역할을 구분한다.
- [ ] navigate와 Navigate를 쓰는 위치를 구분한다.

> 🟦 **코드를 읽을 때 “이 함수가 무엇을 받으며, 누가 언제 호출하는가?”를 먼저 확인하세요.**
