import { useEffect, useReducer, useRef, useState } from "react";
import TodoHeader from "./TodoHeader";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import TodoTemplate from "./TodoTemplate";
import { initialTodos, type TodoCreate } from "./todo";
import { todoReducer } from "./todo.reducer";

function TodoMain() {
  //   const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // id 값 하나씩 자동으로 증가되게
  const nextId = useRef(4);

  const onInsert = (todo: TodoCreate) => {
    const now = new Date();
    const newTodo = {
      id: nextId.current,
      title: todo.title,
      completed: todo.completed,
      important: todo.important,
      createDate: now,
      lastModifiedDate: now,
    };
    console.log("newTodo:", newTodo);
    // todos 변경
    dispatch({ type: "INSERT", payload: newTodo });
    // 재렌더링이 되어도 값을 유지함
    nextId.current += 1;
  };

  // completed 수정하는 토글함수 (completed : boolean)
  const onToggle = (id: number) => {
    dispatch({
      type: "UPDATE",
      payload: id,
    });
  };

  // todos 값 확인
  useEffect(() => {
    console.log("todos: ", todos);
  }, [todos]);

  const onDelete = (id: number) => {
    // todos 에서 삭제된 id와 동일한 todo가 아닌걸 찾아서 setTodos()변경
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  // 처음에 작성한 전체/완료/미완료 코드 => 이 경우 다른 건 다 잘 되지만 할일을 추가 할때 업데이트가 안되는 문제.
  // const [filteredTodos, setFilteredTodos] = useState(initialTodos);

  // const getTodosByCompleted = (completed: boolean | null) => {
  //   if (completed === null) {
  //     setFilteredTodos(todos);
  //   } else {
  //     const selectedTodos = todos.filter((todo) => todo.completed === completed);
  //     setFilteredTodos(selectedTodos);
  //   }
  // };

  // 71 ~ 90 번째 줄은 2번째로 작성한 것
  // const [valueState, setValueState] = useState<boolean | null>(null);
  // const getTodosByCompleted = (completed: boolean | null) => {
  //   if (completed === null) {
  //     setValueState(null);
  //   } else {
  //     setValueState(completed);
  //   }
  // };

  // const getFilteredTodos = () => {
  //   if (valueState === null) {
  //     return todos;
  //   } else {
  //     const filteredTodos = todos.filter((todo) => todo.completed === valueState);
  //     return filteredTodos;
  //   }
  // };

  const [valueState, setValueState] = useState<boolean | null>(null);

  // 조건에 맞는 목록 추리기
  const getTodosByCompleted = (completed: boolean | null) => {
    return valueState === null
      ? todos
      : todos.filter((todo) => todo.completed === completed);
  };

  const bottomRef = useRef<HTMLDivElement>(null);
  const previousCountRef = useRef(todos.length);

  useEffect(() => {
    if (todos.length > previousCountRef.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    previousCountRef.current = todos.length;
  }, [todos.length]);

  return (
    <>
      <TodoTemplate>
        <TodoHeader onFilterChange={setValueState} />
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={getTodosByCompleted(valueState)}
          onDelete={onDelete}
          onToggle={onToggle}
        />
        <div ref={bottomRef} aria-hidden="true" />
      </TodoTemplate>
    </>
  );
}

export default TodoMain;
