# 게시판 API·폼·useEffect 복습

> **2026.09.18 · simple-board-app에서 질문한 내용 정리**  
> VS Code에서 **Cmd + Shift + V**로 미리보기를 열어보세요.  
> 함께 읽기: [오늘 로그인 앱 복습](../simple-auth-app2/AUTH_REVIEW_2026-09-18.md) · [useContext 정리](../react05-global-state/USE_CONTEXT_GUIDE.md)

| 표시 | 의미 |
| :--- | :--- |
| 🟦 핵심 | 먼저 이해할 개념 |
| 🟨 질문 | 오늘 질문했던 부분 |
| 🟩 답변 | 코드와 연결한 설명 |
| 🟥 주의 | 자주 혼동하는 역할 |

오늘 질문은 화면 실행 오류, URL 매개변수, 글 작성·삭제·수정, 폼 초기값, useEffect 실행 순서, 댓글 배열과 map까지 이어졌습니다. **아래는 최신 코드를 확인해 정리한 학습 문서이며 앱 코드는 수정하지 않았습니다.** 예시는 필요한 부분을 발췌했습니다.

---

## 1. 오늘의 핵심: 서로 다른 네 가지를 구분하기

| 구분 | 예 | 실제 의미 |
| :--- | :--- | :--- |
| 함수 선언 | `const fetchData = async () => { ... }` | 실행할 내용을 정의 |
| 함수 전달 | `onSubmit={onUpdate}` | 다른 곳에서 호출할 수 있게 전달 |
| 함수 호출 | `fetchData()` | 지금 실행 |
| 실행 예약 | `useEffect(() => { ... }, [id])` | DOM 반영 뒤 Effect 실행하도록 React에 등록 |

> 🟦 **코드가 위에서 아래로 진행해도, 그 안에 정의된 모든 함수의 본문이 즉시 실행되는 것은 아닙니다.**

```tsx
const sayHello = () => console.log("안녕"); // 정의만 함
sayHello();                              // 실행함
```

```tsx
<button onClick={() => onDelete(id)}>삭제</button>
```

위 JSX는 클릭할 함수를 준비합니다. 클릭했을 때 안의 `onDelete(id)`가 실행됩니다.

---

## 2. 현재 파일별 역할과 연결

| 파일 | 주요 함수·요소 | 역할 |
| :--- | :--- | :--- |
| [App.tsx](src/App.tsx) | Route | URL과 페이지 연결 |
| [boardApi.ts](src/apis/boardApi.ts) | getBoard, putBoard, updateBoard, deleteBoard, getComment | Axios 요청과 응답 데이터 반환 |
| [board.ts](src/types/board.ts) | Board, BoardUpSert | 데이터 모양 정의 |
| [useBoard.ts](src/hooks/useBoard.ts) | useState, useEffect, getBoard | 상세 게시글 조회를 재사용하는 커스텀 Hook |
| [BoardDetail.tsx](src/pages/BoardDetail.tsx) | useParams, useBoard, onDelete, getComment | 상세 표시, 삭제, 댓글 조회 |
| [BoardWrite.tsx](src/pages/BoardWrite.tsx) | onSubmit, putBoard, navigate | 새 글 등록 처리 |
| [BoardEdit.tsx](src/pages/BoardEdit.tsx) | useBoard, onUpdate, updateBoard | 기존 글 조회 후 수정 처리 |
| [BoardForm.tsx](src/components/BoardForm.tsx) | useState, handleChange, onSubmit | 작성·수정 공통 입력 화면 |

```text
App.tsx: /boards/:id/edit
          ↓
BoardEdit.tsx
  ├─ useParams() → URL의 id
  ├─ useBoard(id) → getBoard(id) → axios.get → 서버
  │                  ↓ 응답
  │                board 상태
  ├─ board 준비 → BoardForm에 기존 글 전달
  └─ onUpdate 함수를 BoardForm에 전달
                        ↓
BoardForm.tsx
  board로 form 초기화 → 입력할 때 setForm
  제출 → onSubmit(form)
                        ↓
BoardEdit의 onUpdate(targetBoard)
  updateBoard(id, targetBoard) → axios.put → 서버
  성공 → navigate(상세 주소)
```

현재 프로젝트는 **useState + 커스텀 Hook + Axios**로 작성되어 있습니다. Redux 액션을 보내는 방식과 API 함수 호출은 서로 다른 작업입니다.

---

## 3. 메서드 사용법: 입력과 결과를 먼저 보기

| 코드 | 무엇을 받나? | 무엇을 돌려주거나 처리하나? |
| :--- | :--- | :--- |
| `useParams()` | 인자 없음 | URL 경로 매개변수 객체 |
| `useNavigate()` | 인자 없음 | navigate 함수 |
| `useBoard(id)` | string 또는 undefined | `{ board, loading }` |
| `getBoard(id)` | id 문자열 | 게시글 데이터로 완료되는 Promise |
| `updateBoard(id, board)` | id와 수정 데이터 | 수정 응답 데이터로 완료되는 Promise |
| `axios.get(url)` | 요청 주소 | 응답 객체로 완료되는 Promise |
| `axios.post(url, data)` | 주소, 새 데이터 | 등록 응답 객체로 완료되는 Promise |
| `axios.put(url, data)` | 주소, 수정 데이터 | 수정 응답 객체로 완료되는 Promise |
| `axios.delete(url)` | 삭제 대상 주소 | 삭제 응답 객체로 완료되는 Promise |
| `setBoard(data)` | 새 상태 | React에 상태 업데이트 요청 |
| `array.map(fn)` | 각 항목을 변환할 함수 | 반환값들을 모은 새 배열 |

```tsx
const response = await axios.get(`${url}/${id}`);
return response.data;
```

`response`에는 상태 코드, 헤더, 데이터 등이 들어 있습니다. `response.data`는 응답 본문입니다. 현재 API 함수가 data만 반환하므로, 호출한 페이지에서는 바로 `setBoard(serverData)`를 할 수 있습니다.

### fetch와 Axios의 차이도 연결해서 보기

오늘 js 폴더에서 다룬 fetch는 다음과 같았습니다.

```tsx
const response = await fetch(url);
const data = await response.json();
```

fetch의 응답은 `json()`으로 본문을 읽습니다. 현재 Axios 코드는 `response.data`에서 JSON 데이터를 사용합니다. **Axios 응답에 response.json()을 호출하는 구조가 아닙니다.** fetch는 HTTP 오류 상태에서도 응답을 반환할 수 있어 `response.ok` 검사가 필요하고, Axios는 기본적으로 성공 범위 밖의 HTTP 상태를 오류로 처리합니다.

---

## 4. URL의 id와 클릭 이벤트는 다르다

> 🟨 **Q. 삭제 버튼을 누르면 자동으로 그 게시글 id가 선택되나요?**
>
> 🟩 **A. URL에서 꺼낸 id를 내가 직접 삭제 함수에 전달합니다.** onClick이 자동으로 넘기는 것은 이벤트 객체입니다.

```tsx
const { id } = useParams(); // /boards/3이면 "3"

onClick={() => {
  if (!id) return;
  onDelete(id);
}}
```

```text
/boards/3 → useParams → id = "3"
삭제 클릭 → onDelete("3") → deleteBoard("3") → DELETE /posts/3
```

`id`는 `string | undefined`입니다. 숫자로 보이는 URL이어도 문자열이고, 값이 없을 가능성도 타입에 포함됩니다.

> 🟨 **Q. getBoard에 stringify(id)를 넣으면 되나요?**
>
> 🟩 **A. 현재 getBoard는 문자열을 받으므로 변환이 필요 없습니다.** `if (!id) return` 다음에 `getBoard(id)`를 호출하면 됩니다. querystring.stringify는 객체를 쿼리 문자열로 만드는 다른 목적의 함수입니다. `String(undefined)`도 "undefined"라는 문자열이 될 뿐 유효한 id를 만들지는 않습니다.

어떤 함수 안에서 id가 있는지 검사했다고 다른 이벤트 함수에서도 타입이 자동 보장되지는 않습니다. 사용하는 함수의 흐름에서 검사하세요.

---

## 5. 글 작성: 제출 이벤트와 부모 함수 연결

현재 입력 상태는 BoardForm에서 관리합니다. BoardWrite가 API 등록을 담당합니다.

```tsx
// BoardWrite
<BoardForm onSubmit={onSubmit} />
```

```tsx
// BoardForm
<form onSubmit={(e) => {
  e.preventDefault();
  onSubmit(form);
}}>
```

| 같은 이름처럼 보이는 것 | 실제로 받는 인자 |
| :--- | :--- |
| HTML form의 onSubmit 이벤트 처리 함수 | 제출 이벤트 e |
| props로 받은 onSubmit 함수 | 게시글 객체 form |

**사용자 정의 props 이름이 onSubmit이라고 해서 이벤트 객체를 자동으로 받는 것은 아닙니다.** BoardForm이 `onSubmit(form)`으로 직접 호출하기 때문에 부모 함수는 form 데이터를 받습니다.

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};
```

`name="title"`이면 title을, `name="body"`이면 body를 변경합니다. 타입의 `|`는 input 또는 textarea라는 뜻입니다.

---

## 6. 등록 후 페이지가 이동하지 않았던 이유

> 🟨 **Q. 작성 버튼을 눌러도 이동하지 않았던 이유는?**
>
> 🟩 **A. 제출 연결은 맞았지만 새 글 등록에 PUT /posts를 사용했습니다.** 현재는 POST로 수정되어 있습니다.

| 작업 | 현재 API 호출 |
| :--- | :--- |
| 목록 조회 | GET /posts |
| 한 글 조회 | GET /posts/:id |
| 새 글 등록 | POST /posts |
| 기존 글 수정 | PUT /posts/:id |
| 삭제 | DELETE /posts/:id |
| 댓글 조회 | GET /posts/:id/comments |

현재 `putBoard`라는 **함수 이름과 달리 내부 요청은 axios.post**입니다. 동작은 함수 이름이 아니라 내부 코드로 결정됩니다. 이후 이름을 정리한다면 createBoard가 목적을 더 잘 드러냅니다.

```tsx
try {
  await putBoard(board);
  navigate("/boards");
} catch (error) {
  console.log(error);
}
```

요청이 실패하면 await에서 오류가 전달되어 catch로 이동합니다. 그러면 navigate 줄은 실행하지 않습니다. console.log만 있으면 화면에는 실패 이유가 안 보이므로, 필요하면 오류 메시지도 표시하세요.

> 🟥 **JSONPlaceholder는 등록·수정·삭제 응답을 흉내 내고 실제 데이터를 영구 변경하지 않습니다.** 요청이 성공해도 다시 조회하면 기존 데이터가 나옵니다. 이동 실패와 데이터가 다시 나타나는 현상은 구분해야 합니다. [공식 API 안내](https://jsonplaceholder.typicode.com/guide/)

---

## 7. 수정 요청과 기존 글 조회는 별개

| 작업 | 함수 | 실행 시점 |
| :--- | :--- | :--- |
| 기존 내용 가져오기 | getBoard | useBoard의 Effect 실행 시 |
| 입력 내용 편집 | handleChange → setForm | 타이핑할 때 |
| 수정 내용 보내기 | onUpdate → updateBoard | 폼 제출할 때 |

```tsx
const onUpdate = async (targetBoard: BoardUpSert) => {
  if (!id) return;

  try {
    await updateBoard(id, targetBoard);
    navigate(`/boards/${id}`);
  } catch (error) {
    console.log(error);
  }
};
```

> 🟨 **Q. updateBoard가 함수가 아니라는 타입 오류는 왜 났나요?**
>
> 🟩 **A. 매개변수 객체에도 updateBoard라는 이름을 붙여 객체를 함수처럼 호출했기 때문입니다.** 현재는 API 함수 updateBoard와 데이터 targetBoard를 구분하고 있습니다.

```tsx
// 잘못된 예
const onUpdate = async (updateBoard: BoardUpSert) => {
  // updateBoard(id, updateBoard); // 여기의 updateBoard는 객체
};
```

`Board`는 서버에서 가져온 게시글 타입입니다. `BoardUpSert`는 `Omit<Board, "id"> & { id?: number }`로, id를 선택 속성으로 바꾼 입력용 타입입니다. `board?` 같은 props 타입 선언은 해당 값을 생략할 수 있다는 뜻입니다.

---

## 8. 가장 중요한 질문: 위에서 아래로 실행되는데 왜 빈 폼이 먼저 보일까?

> 🟨 **Q. id가 있으니 useEffect가 바로 데이터를 가져와야 하는 것 아닌가요?**
>
> 🟩 **A. id를 아는 것과 서버 데이터가 준비된 것은 다릅니다. Effect는 렌더링 결과가 DOM에 반영된 뒤 실행됩니다.**

React에서 렌더링은 컴포넌트를 호출해 JSX를 계산하는 과정이고, 그 결과를 DOM에 반영하는 과정은 커밋이라고 부릅니다. useEffect는 커밋 뒤 실행됩니다. 브라우저가 픽셀을 그리는 시점과는 구분하므로, “항상 눈에 화면이 그려진 뒤”라고 외우기보다는 **DOM 반영 후 Effect**라고 기억하세요.

```text
① BoardEdit 호출
   id = "3", board = null
② useBoard 안에서 useEffect 등록
   Effect 본문을 기다리지 않고 계속 진행
③ BoardEdit이 JSX 반환 → 자식 렌더링 → DOM 반영
④ Effect 실행 → 서버 요청
⑤ 응답 도착 → setBoard(데이터)
⑥ 상태 업데이트로 다시 렌더링
```

### await가 기다리는 범위

```tsx
const fetchData = async () => {
  const serverData = await getBoard(id);
  setBoard(serverData);
};
```

await는 **이 async 함수 안의 다음 작업을 기다리게 합니다.** 브라우저나 React 전체를 멈추는 명령이 아닙니다. async 함수는 Promise를 반환합니다. Effect 콜백 자체를 async로 만들기보다는, 지금처럼 내부에 async 함수를 만들고 호출하세요.

### 의존성 배열

| 코드 | Effect 실행 조건 |
| :--- | :--- |
| `useEffect(fn, [])` | 마운트 후. 재마운트하면 다시 실행 |
| `useEffect(fn, [id])` | 마운트 후 + 이전 렌더링과 id가 달라진 커밋 후 |
| `useEffect(fn)` | 매 커밋 후 |

`[id]`는 함수 인자 목록이 아닙니다. Effect의 재실행 조건입니다. `setBoard`로 다시 렌더링해도 id가 같으면 이 Effect는 다시 실행되지 않습니다. 개발 Strict Mode에서는 점검을 위해 setup/cleanup이 추가로 실행될 수 있습니다.

---

## 9. 왜 if (!board)가 기존 내용을 보이게 할까?

BoardEdit의 board와 BoardForm의 form은 **서로 다른 상태**입니다.

```tsx
// BoardForm
const [form, setForm] = useState(board ?? {
  title: "",
  body: "",
  userId: 1,
});
```

`??`는 왼쪽이 null 또는 undefined일 때 오른쪽 값을 사용합니다. 그리고 **useState 초기값은 컴포넌트가 처음 만들어질 때 적용**됩니다. props가 바뀔 때마다 초기 상태로 다시 설정하는 명령이 아닙니다.

| 단계 | if가 없으면 | if가 있으면 |
| :--- | :--- | :--- |
| 첫 렌더링, board=null | BoardForm이 빈 상태로 처음 생성 | 로딩 문구 표시. BoardForm은 없음 |
| 조회 완료, board=객체 | 기존 BoardForm에 props만 새로 전달 | BoardForm을 처음 생성 |
| form 상태 | 이미 초기화된 빈 값 유지 | 기존 글로 초기화 |

```tsx
// BoardEdit: Hook을 모두 호출한 다음
if (!board) {
  return <p>게시글을 불러오는 중입니다.</p>;
}

return <BoardForm onSubmit={onUpdate} board={board} />;
```

> 🟦 **if는 조회 기능을 바꾸는 것이 아니라 자식 폼이 처음 만들어지는 시점을 늦춥니다.**

현재 코드는 이 방식으로 연결되어 있습니다. 단, 조회 실패도 board가 null로 남으므로 오류 상태를 별도로 표시할 필요가 있습니다. 같은 수정 컴포넌트가 유지된 채 다른 id로 바뀌는 경우에는 데이터 초기화·폼 재생성 등 추가 처리가 필요합니다. 이 패턴이 모든 props 변경을 자동으로 동기화하는 것은 아닙니다.

---

## 10. useBoard 커스텀 Hook은 무엇을 해줄까?

```tsx
const { board, loading } = useBoard(id);
```

이 함수는 내부에 게시글 상태, 로딩 상태, Effect를 묶어서 상세·수정 페이지가 재사용하게 합니다. **호출 즉시 완성된 서버 데이터를 반환하는 함수가 아닙니다.** 첫 호출에서는 초기 상태를 반환하고, 응답 후 업데이트로 다시 렌더링되면 새 상태를 반환합니다.

각 컴포넌트에서 useBoard를 호출하면 각각의 Hook 상태가 생깁니다. 커스텀 Hook으로 코드를 공유하는 것과 Redux처럼 하나의 상태를 공유하는 것은 다릅니다.

현재 useBoard는 loading 초기값이 true이고 요청 종료 때 false로 바꿉니다. id가 바뀔 때의 재로딩 상태 초기화, 이전 요청이 늦게 도착하는 상황 처리, 오류 표시 등은 추가 개선 사항입니다.

---

## 11. 댓글 코드에서 배운 배열과 Hook 규칙

### 배열 상태는 배열로 시작

```tsx
const [comments, setComments] = useState<CommentType[]>([]);
```

현재 파일은 `CommentType[] | null`을 사용하고 있어 `comments?.map`으로 표시합니다. null을 상태로 쓰지 않는다면 위처럼 배열 타입만 두어도 됩니다.

### 선언한 함수를 같은 이름으로 호출

```tsx
useEffect(() => {
  const fetchData = async () => {
    if (!id) return;
    try {
      const serverData = await getComment(id);
      setComments(serverData);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [id]);
```

이전에 fetchData를 선언하고 fetchComments를 호출해서 이름이 맞지 않았습니다. 함수 선언만으로는 요청하지 않습니다.

댓글 응답은 배열이므로 `setComments(serverData)`로 저장합니다.

```text
serverData             → [댓글1, 댓글2]
[serverData]           → [[댓글1, 댓글2]]  ← 불필요한 중첩 배열
```

### 모든 Hook을 조건부 return보다 위에

```tsx
const { board, loading } = useBoard(id);
const [comments, setComments] = useState<CommentType[]>([]);
useEffect(/* 댓글 조회 */);

if (loading) return <p>Loading...</p>;
```

위 코드는 순서를 보여주는 개념 예시입니다. 실제 Effect에는 앞의 콜백과 의존성 배열을 넣습니다. Hook은 매 렌더링마다 같은 순서로 호출되어야 합니다. 로딩 여부에 따라 일부 Hook 호출을 건너뛰면 안 됩니다.

---

## 12. map은 반드시 값을 반환해야 한다

```tsx
comments.map((comment) => (
  <li key={comment.id}>{comment.body}</li>
))
```

소괄호는 표현식 결과를 바로 반환하는 형태입니다. 중괄호를 쓰려면 return이 필요합니다.

```tsx
comments.map((comment) => {
  return <li key={comment.id}>{comment.body}</li>;
})
```

중괄호 안에 JSX만 쓰고 return을 생략하면 각 결과가 undefined가 되어 표시할 항목이 없습니다. `key`는 React가 목록 항목을 구분하는 식별자이고 화면에 출력되는 값은 아닙니다.

### map을 유지한 간단한 스타일

```tsx
<ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
  {comments.map((comment) => (
    <li key={comment.id} className="px-5 py-4">
      <p className="mb-2 text-sm font-semibold text-indigo-600">
        댓글 제목: {comment.name}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
        {comment.body}
      </p>
    </li>
  ))}
</ul>
```

배열 전용 상태를 가정한 예시입니다. 현재 nullable 타입을 유지하면 `comments?.map`을 사용하세요.

| 클래스 | 역할 |
| :--- | :--- |
| divide-y | 자식 댓글 사이 구분선 |
| px-5 py-4 | 댓글 안쪽 가로·세로 여백 |
| whitespace-pre-wrap | 본문의 줄바꿈과 공백 유지 |
| leading-6 | 본문 줄 간격 |

현재 기능은 댓글 **조회·표시**입니다. 서버에 새 댓글을 등록하는 기능과는 다릅니다.

---

## 13. 처음 앱이 안 나왔던 이유

> 🟨 **Q. simple-board-app의 첫 화면이 안 나왔던 이유는?**
>
> 🟩 **A. main.tsx에서 존재하지 않는 store를 Provider에 전달했기 때문입니다.** 당시 `Cannot find name 'store'`가 확인되었습니다. Redux를 사용하지 않는 단계에서는 BrowserRouter로 앱을 감싸면 되고, Redux Provider는 실제 store를 만들고 연결할 때 필요합니다.

같은 모양의 프로젝트를 복사했더라도 import와 설정이 새 프로젝트에 맞는지 확인해야 합니다.

---

## 14. 스스로 문제를 찾는 순서

1. **함수가 선언되어 있나?** import가 있는지, 철자가 일치하는지 확인.
2. **누가 호출하나?** 이벤트·Effect·다른 함수 중 호출 지점을 찾기.
3. **무엇을 받나?** 이벤트 객체, id 문자열, 게시글 객체를 구분.
4. **무엇을 반환하나?** JSX, 데이터, Promise, undefined를 구분.
5. **데이터 모양이 맞나?** 객체인지 배열인지, null 가능성이 있는지 확인.
6. **언제 값이 준비되나?** 첫 렌더링인지 서버 응답 이후인지 구분.
7. **실패하면 어디로 가나?** return이나 catch 때문에 다음 줄이 생략되는지 확인.

## 15. 복습 질문

- [ ] `onSubmit={onUpdate}`와 `onSubmit(form)`의 차이를 말할 수 있다.
- [ ] id가 있어도 board는 아직 null일 수 있는 이유를 안다.
- [ ] useEffect 등록과 콜백 실행의 시점을 구분한다.
- [ ] await가 React 전체를 멈추는 것이 아님을 안다.
- [ ] useState 초기값이 props 변경마다 다시 적용되지 않음을 안다.
- [ ] if (!board)가 폼의 첫 렌더링을 늦추는 이유를 안다.
- [ ] 조회 getBoard와 수정 updateBoard의 역할을 구분한다.
- [ ] 댓글 배열을 다시 []로 감싸면 왜 문제인지 안다.
- [ ] map에서 중괄호를 쓰면 return이 필요한 이유를 안다.

<details>
<summary>🟩 답 확인하기</summary>

1. 함수 참조 전달과 실제 함수 호출입니다.
2. id는 URL에 있지만 본문은 서버 응답으로 받기 때문입니다.
3. 렌더링 중 Effect를 등록하고, DOM 반영 뒤 본문이 실행됩니다.
4. 해당 async 함수의 뒤 작업만 Promise 완료를 기다립니다.
5. 이미 만들어진 컴포넌트의 상태는 유지됩니다. 새 props와 별개입니다.
6. 데이터가 없으면 자식 JSX 대신 로딩 문구를 반환하기 때문입니다.
7. GET은 기존 데이터 조회, PUT은 수정 데이터 전송입니다.
8. 댓글 배열이 중첩 배열로 바뀝니다.
9. 중괄호 함수 본문에는 명시적인 반환이 필요하기 때문입니다.

</details>

> 🟦 **코드를 볼 때 “지금 가진 값의 모양”과 “이 코드가 실행되는 시점”을 함께 확인하세요. 오늘 오류 대부분은 이 두 가지로 설명할 수 있습니다.**
