export {};

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

let todos: Todo[] = [];

let currentFilter: Filter = "all";

const form = document.querySelector<HTMLFormElement>("#todo-form")!;
const input = document.querySelector<HTMLInputElement>("#todo-input")!;
const todoList = document.querySelector<HTMLUListElement>("#todo-list")!;
const todoCount = document.querySelector<HTMLElement>("#todo-count")!;
const clearCompleted = document.querySelector<HTMLButtonElement>("#clear-completed")!;
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter button");

const savedTodos = localStorage.getItem("todos");

if (savedTodos) {
  todos = JSON.parse(savedTodos);
}

function saveTodos(): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFilteredTodos(): Todo[] {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function renderTodos(): void {
  todoList.innerHTML = "";

  getFilteredTodos().forEach((todo) => {
    const li = document.createElement("li");

    li.className = todo.completed ? "todo-item completed" : "todo-item";

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const title = document.createElement("span");

    title.className = "todo-title";
    title.textContent = todo.title;

    const deleteBtn = document.createElement("button");

    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "삭제";

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    li.append(checkbox, title, deleteBtn);

    todoList.appendChild(li);
  });

  const remaining = todos.filter((todo) => !todo.completed).length;

  todoCount.textContent = `남은 할 일 : ${remaining}개`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = input.value.trim();

  if (!title) return;

  todos.push({
    id: Date.now(),
    title,
    completed: false,
  });

  input.value = "";

  saveTodos();
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter as Filter;
    renderTodos();
  });
});

clearCompleted.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);

  saveTodos();
  renderTodos();
});

renderTodos();
