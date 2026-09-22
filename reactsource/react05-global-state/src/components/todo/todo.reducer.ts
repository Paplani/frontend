// action type : INSERT, DELETE, UPDATE

import type { Todo } from "./todo";

export type TodoActionType =
  | { type: "INSERT"; payload: Todo }
  | { type: "DELETE"; payload: number }
  | { type: "UPDATE"; payload: number };

export function todoReducer(todos: Todo[], action: TodoActionType) {
  switch (action.type) {
    case "INSERT":
      return [...todos, action.payload];
    case "DELETE":
      return todos.filter((todo) => todo.id !== action.payload);
    case "UPDATE":
      return todos.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
              lastModifiedDate: new Date(),
            }
          : todo,
      );
    default:
      return todos;
  }
}
