import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addTodo, clearTodo, deleteTodo, updateTodo } from "./todoSlice";

const TodoApp = () => {
  const todos = useAppSelector((state) => state.myTodo.todos);
  const dispatch = useAppDispatch();

  const [contents, setContents] = useState("");

  return (
    <div>
      <div>
        <div className="flex flex-col mx-6">
          <h2 className="text-3xl mt-3">Todos Redux 적용</h2>
          <ul className="border-b-2 my-2 p-2">
            {todos.map((todo) => (
              <li key={todo.idx}>
                <input
                  type="checkbox"
                  name="done"
                  checked={todo.done}
                  onChange={() => dispatch(updateTodo(todo.idx))}
                />
                <span className={`mr-3 ${todo.done ? "line-through" : ""}`}>
                  {todo.contents}
                </span>
                <button
                  className="bg-red-200 p-2 mx-1 text-white"
                  onClick={() => {
                    dispatch(deleteTodo(todo.idx));
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>

          <textarea
            name="contents"
            rows={10}
            className="border p-4"
            placeholder="할 일을 입력해주세요"
            autoFocus
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          ></textarea>
          <div className="flex justify-center [&_button]:border [&_button]:rounded-xl [&_button]:shadow-xm">
            <button
              className="bg-gray-400 p-2 mx-1"
              onClick={() => {
                dispatch(addTodo(contents));
                setContents("");
              }}
            >
              추가
            </button>
            <button
              className="bg-violet-400 p-2 mx-1"
              onClick={() => {
                dispatch(clearTodo());
              }}
            >
              전체삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
