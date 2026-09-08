# React 1일차 치트시트 (2026-09-07)

"왜"는 전부 아티팩트에 있음 → **React 선언 방식 도감**
https://claude.ai/code/artifact/0a0a2eec-fa0d-4ec0-88fc-90437da3cabf

---

## 프로젝트 명령어

```bash
npm create vite@latest 프로젝트명   # 생성
npm install                        # 패키지 설치
npm run dev                        # 개발 서버 (저장 시 즉시 반영)
npm run build                      # dist/ 생성
npm run preview                    # localhost:4173
```
dev 서버 키: `r` 재시작 / `u` URL / `o` 브라우저 / `c` 콘솔 지움 / `q` 종료
에디터: `Shift+Option+O` import 정리 / `rsc` 컴포넌트 스니펫

## 컴포넌트 선언 (2)

```tsx
function App() { return <></>; }          // 함수 선언식 - vite 템플릿
export default App;

const MyComp = () => { return <div/>; };  // 화살표 - rsc, 직접 쓴 건 전부 이쪽
export default MyComp;
```

## props 받기 (3)

```tsx
(props: { frTitle: string }) => props.frTitle              // A 통째로
({ name, price }: { name: string; price: number }) => {}   // B 구조분해 + 인라인 타입
({ frontData, frTitle }: FrontCompProps) => {}             // C 구조분해 + 이름 붙인 타입
```

## 타입 선언 (2)

```tsx
type FrontCompProps = { frontData: string[]; frTitle: string };  // 그 파일 안에서만
export interface CardType { idx?: number; title: string; }       // 내보내서 재사용

import InfoCard, { type CardType } from "./InfoCard";  // 값 + 타입 같이 import
const cards: CardType[] = [ ... ];
```
`?` 선택적 · `=` 기본값 → `({ content = "(No Content)" }: CardType)`

## 리스트 렌더링 (2) — key 필수

```tsx
const liRows = data.map((name) => <li key={name}>{name}</li>);   // map

const liRows = [];                                                // for + push
for (let i = 0; i < data.length; i++) liRows.push(<li key={i}>{data[i]}</li>);
```
map 안: `(...)` = return 생략 / `{...}` = return 직접

## props로 넘길 수 있는 것 (4)

```tsx
frTitle={"프론트엔드"}                               // 문자열/배열
onClick={handleClick}                                // 이벤트 함수
formatPrice={(p) => `$${p.toFixed(2)}`}              // 가공 함수
<CardLayout><p>내용</p></CardLayout>                 // children: ReactNode
```

```tsx
const handleClick = (e: React.MouseEvent<HTMLLIElement>) =>
  alert((e.target as HTMLLIElement).innerHTML);
```

## CSS Module

```tsx
import styles from "./Card.module.css";
<div className={styles.card}>   // class 아님, className
```

## useState

```tsx
import { useState } from "react";
const [count, setCount] = useState(0);
setCount(count + 1);          // 이 줄 아래 count는 아직 옛 값
setCount((prev) => prev + 1); // 이전 값 기준이면 이 형태
```

## JS 기초 (js/basic.js)

```js
arr.forEach((item) => {});         arr.filter((u) => u.id !== 3);
arr.map((n) => n * 2);
const copy = { ...user, age: 21 }; const arrCopy = [...numbers];  // 스프레드 복사 필수
const { name, age } = user;        const [n1, ...rest] = numbers; // 구조 분해
age >= 20 ? "성인" : "미성년자";
```

---

## 남은 것

- `props/Card.tsx` — 마지막 카드에 `idx` 없음 → `key={card.idx}`가 undefined
- `State/Counter.tsx` — `(e)` 타입 없음(암묵적 any), 안 쓰면 삭제
- `props/BackComp.tsx` — `<div>`로 감쌈, FrontComp처럼 `<li>` 구조로. 끝의 `;` 삭제
- `main.tsx` — 현재 `<Counter />`만 렌더, `<StrictMode>` 빠져 있음
