"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// todo 배열
// 화면에 보이는 모든 할 일의 "원본 데이터"를 담는 바구니.
// 화면(li 태그들)은 이 배열을 기준으로 매번 새로 그려진다.
let todos = [];
// 현재 필터 저장 변수
// 사용자가 "전체/진행중/완료" 중 어떤 버튼을 눌렀는지 기억해두는 값.
// 기본값은 "all"(전체 보기).
let currentFilter = "all";
// dom 요소 가져오기
// form, input, todo-list, todo-count, filter button들
// todo.html에 있는 id/class를 이용해 실제 화면 요소를 찾아서 상수에 담아둔다.
// 이렇게 한 번만 찾아두면, 이후 코드에서는 매번 다시 찾을 필요 없이 이 변수만 재사용하면 된다.
const form = document.querySelector("#todo-form"); // 할 일 입력 폼 (제출 이벤트 감지용)
const input = document.querySelector("#todo-input"); // 할 일 텍스트 입력창
const todoList = document.querySelector("#todo-list"); // 할 일 목록을 채워 넣을 <ul>
const todoCount = document.querySelector("#todo-count"); // "남은 할 일 : N개" 글자를 표시할 요소
const clearCompleted = document.querySelector("#clear-completed"); // 완료된 항목을 한번에 지우는 버튼
const filterButtons = document.querySelectorAll(".filter button"); // 전체/진행중/완료 버튼 3개를 한꺼번에 선택
// 페이지가 처음 열릴 때, localStorage(브라우저 저장소)에 저장된 이전 기록이 있는지 확인한다.
// 있다면 문자열(JSON) 형태로 저장돼 있던 것을 다시 배열/객체 형태로 되돌려서 todos에 채운다.
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
    todos = JSON.parse(savedTodos);
}
// todos 브라우저 닫아도 유지 localStorage에 추가
// localStorage.setItem("todos", JSON.stringify(todos))
// localStorage.getItem("todos")
// 현재 todos 배열 상태를 localStorage에 저장하는 함수.
// 할 일이 추가/삭제/완료 처리될 때마다 호출해서, 새로고침하거나 브라우저를 다시 켜도
// 데이터가 사라지지 않도록 한다. localStorage는 문자열만 저장할 수 있어서
// JSON.stringify로 배열을 문자열로 변환해서 저장한다.
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// 현재 선택된 필터(currentFilter)에 맞는 할 일만 골라서 반환하는 함수.
// 화면을 그릴 때(renderTodos) 전체 todos가 아니라 이 함수의 결과를 사용한다.
function getFilteredTodos() {
    if (currentFilter === "active") {
        // "진행중" 필터: 아직 완료되지 않은(completed가 false인) 항목만
        return todos.filter((todo) => !todo.completed);
    }
    if (currentFilter === "completed") {
        // "완료" 필터: 완료된(completed가 true인) 항목만
        return todos.filter((todo) => todo.completed);
    }
    // "전체" 필터(또는 그 외): 모든 항목 그대로 반환
    return todos;
}
// 현재 데이터(todos)를 기준으로 화면(#todo-list, #todo-count)을 처음부터 다시 그리는 함수.
// 할 일이 추가/삭제/완료 처리되는 등 데이터가 바뀔 때마다 이 함수를 다시 호출해서
// "데이터가 바뀌면 화면 전체를 새로 그린다"는 방식으로 동작을 단순하게 유지한다.
function renderTodos() {
    // 목록을 통째로 비운다 (이전에 그렸던 <li>들을 모두 제거)
    todoList.innerHTML = "";
    // 필터링된 할 일 목록을 하나씩 순회하며 화면 요소(li)를 새로 만든다.
    getFilteredTodos().forEach((todo) => {
        // 할 일 한 줄을 담을 <li> 요소 생성
        const li = document.createElement("li");
        // 완료된 항목이면 "completed" class를 추가로 붙인다.
        // todo.css에 이 class에 대한 취소선/흐린 색 스타일이 이미 정의돼 있어서
        // class 이름만 붙여주면 화면에 자동으로 반영된다.
        li.className = todo.completed ? "todo-item completed" : "todo-item";
        // 완료 여부를 표시/변경하는 체크박스
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed; // 현재 완료 상태를 체크박스에 반영
        // 체크박스를 클릭(상태 변경)하면 해당 할 일의 completed 값을 바꾸고
        // 저장 후 화면을 다시 그린다 (진행중 <-> 완료 전환)
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });
        // 할 일 내용을 보여주는 글자 영역
        const title = document.createElement("span");
        title.className = "todo-title";
        title.textContent = todo.title;
        // 해당 할 일을 삭제하는 버튼
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "삭제";
        // 삭제 버튼을 클릭하면, id가 같은 항목만 배열에서 제외한 새 배열로 교체한다.
        // (== 해당 할 일 하나만 todos에서 빠지는 효과)
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });
        // 체크박스 + 글자 + 삭제버튼을 한 줄(li) 안에 순서대로 넣고
        li.append(checkbox, title, deleteBtn);
        // 완성된 줄을 목록(ul)에 추가한다.
        todoList.appendChild(li);
    });
    // 전체 todos 중 완료되지 않은 개수를 세어서 "남은 할 일 : N개"로 표시
    // (필터와 상관없이 항상 "진짜 남은 할 일 개수"를 보여준다)
    const remaining = todos.filter((todo) => !todo.completed).length;
    todoCount.textContent = `남은 할 일 : ${remaining}개`;
}
// 추가버튼 클릭시 => submit 이벤트
// 입력창에 글을 쓰고 "추가" 버튼을 누르거나 Enter를 치면 폼이 제출(submit)되며 실행된다.
form.addEventListener("submit", (e) => {
    // 폼이 기본적으로 하는 "페이지 새로고침" 동작을 막는다.
    // 이걸 막지 않으면 페이지가 새로고침되면서 방금 쓴 데이터가 다 날아간다.
    e.preventDefault();
    // 입력창의 글자를 읽어오되, 앞뒤 공백은 제거한다.
    const title = input.value.trim();
    // 아무 글자도 없으면(공백만 입력 등) 추가하지 않고 함수를 종료한다.
    if (!title)
        return;
    // 새 할 일 객체를 만들어 todos 배열 맨 뒤에 추가한다.
    // id는 현재 시각(밀리초)을 이용해 서로 겹치지 않는 고유 번호로 사용한다.
    todos.push({ id: Date.now(), title, completed: false });
    // 입력창을 비워서 바로 다음 할 일을 입력할 수 있게 한다.
    input.value = "";
    // 바뀐 데이터를 저장하고 화면을 다시 그린다.
    saveTodos();
    renderTodos();
});
// 필터버튼 클릭
// "전체/진행중/완료" 버튼 3개 각각에 클릭 이벤트를 등록한다.
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // 클릭한 버튼의 data-filter 속성값(all/active/completed)을 읽어와
        // currentFilter에 저장한다. (todo.html에 data-filter="all" 등으로 정의돼 있음)
        currentFilter = button.dataset.filter;
        // 필터가 바뀌었으니 그 기준으로 화면을 다시 그린다.
        renderTodos();
    });
});
// "완료된 목록 삭제" 버튼: 완료되지 않은 항목만 남기는 방식으로
// 결과적으로 완료된 항목들을 한 번에 모두 제거한다.
clearCompleted.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    renderTodos();
});
// 페이지가 처음 열렸을 때도 (localStorage에서 불러온) 기존 할 일 목록을
// 화면에 한 번은 표시해줘야 하므로, 스크립트 로드 시점에 한 번 직접 호출한다.
renderTodos();
