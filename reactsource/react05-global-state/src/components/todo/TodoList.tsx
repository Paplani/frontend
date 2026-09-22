import type { TodosProps } from "./todo";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onDelete, onToggle }: TodosProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}       
        />
      ))}
    </div>
  );
};

export default TodoList;
