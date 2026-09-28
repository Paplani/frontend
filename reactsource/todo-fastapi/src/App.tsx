import { useEffect } from "react";
import { deleteTodo, postTodo, putTodo } from "./apis/todoApi";
import "./App.css";
import Loading from "./components/Loading";
import TodoHeader from "./components/TodoHeader";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import useFetch from "./hooks/useFetch";
import { type TodoCreate } from "./types/todo";

function App() {
  const { todos, loading, fetchData, completedFilter, setCompletedFilter } = useFetch();

  const onInsert = async (todo: TodoCreate) => {
    try {
      const result = await postTodo(todo);
      if (result.message) {
        await fetchData(completedFilter);
      }
    } catch (error) {
      console.error("Todo 등록 실패:", error);
    }
  };

  const onDelete = async (id: number) => {
    const result = await deleteTodo(id);
    if (result.message) {
      console.log(result.message);
      await fetchData(completedFilter);
    }
  };

  // completed 수정하는 토글함수 (completed : boolean)
  const onToggle = async (id: number) => {
    const updateTodo = todos.find((todo) => todo.id === id);
    if (!updateTodo) return;
    const completed = !updateTodo.completed;
    const result = await putTodo(String(id), {
      completed,
    });

    if (result.message) {
      await fetchData(completedFilter);
    }
  };

  // todos 값 확인
  useEffect(() => {
    console.log("todos: ", todos);
  }, [todos]);

  // const [valueState, setValueState] = useState<boolean | null>(null);

  // // 조건에 맞는 목록 추리기
  // const getTodosByCompleted = (completed: string) => {
  //   setCompletedFilter(completed === "" ? null : completed === "true");
  // };

  return (
    <>
      <TodoTemplate>
        <TodoHeader onFilterChange={setCompletedFilter} />
        <TodoInsert onInsert={onInsert} />
        {loading ? (
          <Loading />
        ) : (
          <TodoList todos={todos} onDelete={onDelete} onToggle={onToggle} />
        )}
      </TodoTemplate>
    </>
  );
}

export default App;
